from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse

from .utils.prompt import ClientMessage
from .orchestrator import stream_text

app = FastAPI()

class Request(BaseModel):
    messages: List[ClientMessage]


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

@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    # CRITICAL: filter out 'system'/'tool' from input
    openai_messages = sanitize_for_responses(request.messages)

    response = StreamingResponse(stream_text(openai_messages, protocol))
    response.headers["x-vercel-ai-data-stream"] = "v1"

    return response  # <-- no trailing comma
