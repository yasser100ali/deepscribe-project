import os
import json
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from openai import OpenAI

from .utils.prompt import ClientMessage  

load_dotenv()

app = FastAPI()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class Request(BaseModel):
    messages: List[ClientMessage]

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

If they ask about material not related to patient records or anything medical related, tell them that you are an assistant designed specifically for patient medical data, and steer them back to the main topics.
""".strip()

def sanitize_for_responses(messages: List[ClientMessage]) -> List[dict]:
    """
    Keep only 'user' and 'assistant' messages for Responses `input`.
    Drop 'system' and 'tool' (system goes in `instructions`).
    """
    out = []
    for m in messages:
        if m.role not in ("user", "assistant"):
            continue
        # If you have attachments you want to merge, do it here.
        text = (m.content or "").strip()
        out.append({"role": m.role, "content": text})
    return out

def stream_text(messages: List[dict], protocol: str = "data"):
    model_name = "gpt-4.1-mini"

    with client.responses.stream(
        model=model_name,
        instructions=SYSTEM_PROMPT,  # <-- the ONLY place for your system prompt
        input=messages,              # <-- user/assistant only
    ) as stream:
        for event in stream:
            et = getattr(event, "type", None)

            if et == "response.output_text.delta":
                # event.delta is already a string chunk
                yield f'0:{json.dumps(event.delta)}\n'

            elif et == "response.error":  # singular
                err = getattr(event, "error", {}) or {}
                msg = err.get("message", "unknown error")
                payload = {"finishReason": "error", "message": msg}
                yield f'e:{json.dumps(payload)}\n'

        # Final response / usage
        final = stream.get_final_response()
        usage = getattr(final, "usage", None)
        prompt_tokens = getattr(usage, "input_tokens", None) if usage else None
        completion_tokens = getattr(usage, "output_tokens", None) if usage else None

        tail = {
            "finishReason": "stop",
            "usage": {"promptTokens": prompt_tokens, "completionTokens": completion_tokens},
            "isContinued": False,
        }
        yield f'e:{json.dumps(tail)}\n'

@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    # CRITICAL: filter out 'system'/'tool' from input
    openai_messages = sanitize_for_responses(request.messages)

    response = StreamingResponse(stream_text(openai_messages, protocol))
    response.headers["x-vercel-ai-data-stream"] = "v1"

    return response  # <-- no trailing comma
