import os
import json
from typing import List, Dict
from openai import OpenAI
from dotenv import load_dotenv

from .utils.get_patient_info import get_patient_info, get_patient_names

load_dotenv()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Define tools for OpenAI Responses API
tools = [
    {
        "type": "function",
        "name": "get_patient_names",
        "description": "Retrieve all patient names and their patient IDs. Use this first to find the patient_id for a specific patient name before calling get_patient_info.",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "type": "function",
        "name": "get_patient_info",
        "description": "Retrieve a specific patient record by patient_id. Use get_patient_names first to find the patient_id from a patient name.",
        "parameters": {
            "type": "object",
            "properties": {
                "patient_id": {
                    "type": "string",
                    "description": "Required patient ID (e.g., 'jordan_carter', 'emily_chen'). Get this from get_patient_names function first.",
                },
                "age": {
                    "type": "array",
                    "items": {"type": "integer"},
                    "minItems": 2,
                    "maxItems": 2,
                    "description": "Optional tuple of [start_age, end_age] to filter patients within age range (upper limit capped at 100)",
                },
                "gender": {
                    "type": "string",
                    "description": "Optional gender to filter by (M, F, or variations like Male, Female)",
                },
            },
            "required": ["patient_id"],
        },
    }
]

SYSTEM_PROMPT = """
You are DeepScribe Assistant, an AI medical scribe designed to help healthcare providers
capture, organize, and summarize clinical encounters accurately and empathetically.

Core directives:
1. Listen carefully to the patient's description of their symptoms.
2. Ask clarifying questions only if necessary to capture key details.
3. Summarize findings in structured sections such as:
   - Chief Complaint
   - History of Present Illness
   - Past Medical History
   - Medications
   - Assessment / Plan (if applicable)
4. Maintain a neutral, professional tone appropriate for clinical documentation.
5. Never make diagnostic claims or prescribe treatments — only restate information.
6. When unsure, clearly state uncertainty ("The patient reports...", "It is unclear if...").
7. Keep documentation concise and medically precise.

Your goal: Produce a note that a physician could easily review and use for official documentation.

You have access to patient data through two functions and automatic file search:

1. **get_patient_names()**: Returns all patient names and their IDs. Use this FIRST when a user asks about a specific patient by name.
2. **get_patient_info(patient_id)**: Returns detailed patient record. Use the patient_id from get_patient_names() result.

If they ask which tools you have describe only these 2. 


If they ask about material not related to patient records or anything medical related, tell them that you are an assistant designed specifically for patient medical data, and steer them back to the main topics.

Be concise with your words and to the point. 

When the user asks you to tell them about a particular patient, usually make a table for that patient and list out their information there. 
""".strip()


def execute_function_call(function_name: str, arguments: str) -> str:
    """
    Execute a function call and return the JSON-serialized result.
    
    Args:
        function_name: Name of the function to execute
        arguments: JSON string of function arguments
        
    Returns:
        JSON string of the function result
    """
    if function_name == "get_patient_names":
        result = get_patient_names()
        return json.dumps(result)
    
    elif function_name == "get_patient_info":
        args = json.loads(arguments)
        # Convert age array to tuple if present
        if "age" in args and args["age"]:
            args["age"] = tuple(args["age"])
        result = get_patient_info(**args)
        return json.dumps(result)
    
    
    
    return json.dumps({"error": f"Unknown function: {function_name}"})


def stream_text(messages: List[dict], protocol: str = "data"):
    """
    Stream text responses from OpenAI with function calling support.
    
    Args:
        messages: List of conversation messages
        protocol: Protocol type (default "data")
        
    Yields:
        Formatted response chunks for streaming
    """

    
    model_name = "gpt-4.1-mini"
    input_list = messages.copy()
    
    max_iterations = 5  # Prevent infinite loops
    iteration = 0
    final_response = None
    
    while iteration < max_iterations:
        iteration += 1
        has_function_calls = False
        
        # Make streaming request with tools
        with client.responses.stream(
            model=model_name,
            instructions=SYSTEM_PROMPT,
            input=input_list,
            tools=tools,
        ) as stream:
            for event in stream:
                et = getattr(event, "type", None)
                
                if et == "response.output_text.delta":
                    # Stream text tokens immediately as they arrive
                    yield f'0:{json.dumps(event.delta)}\n'
                    
                elif et == "response.error":
                    err = getattr(event, "error", {}) or {}
                    msg = err.get("message", "unknown error")
                    payload = {"finishReason": "error", "message": msg}
                    yield f'e:{json.dumps(payload)}\n'
                    return

            # Get final response to check for function calls
            final_response = stream.get_final_response()
            
            # Add output to input list
            input_list += final_response.output
            
            # Check if there are function calls to handle
            for item in final_response.output:
                if item.type == "function_call":
                    has_function_calls = True
                    
                    # Execute the function and add result to input
                    result_output = execute_function_call(item.name, item.arguments)
                    input_list.append({
                        "type": "function_call_output",
                        "call_id": item.call_id,
                        "output": result_output
                    })
            
            # If no function calls, we're done
            if not has_function_calls:
                break
    
    # Send final metadata
    if final_response:
        usage = getattr(final_response, "usage", None)
        prompt_tokens = getattr(usage, "input_tokens", None) if usage else None
        completion_tokens = getattr(usage, "output_tokens", None) if usage else None

        tail = {
            "finishReason": "stop",
            "usage": {"promptTokens": prompt_tokens, "completionTokens": completion_tokens},
            "isContinued": False,
        }
        yield f'e:{json.dumps(tail)}\n'

