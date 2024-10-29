import os
from openai import OpenAI

import proto_generated.chat_pb2 as chat_pb2
import proto_generated.chat_pb2_grpc as chat_pb2_grpc

OPEN_API_KEY = os.getenv("OPEN_API_KEY")
client = OpenAI(
    # This is the default and can be omitted
    api_key=OPEN_API_KEY,
)


class ChatService(chat_pb2_grpc.ChatService):
    def chat(self, request, context):
        yield chat_pb2.ChatResponse(message="Streaming started...", type="start")
        stream = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": request.question}],
            stream=True,
        )
        for chunk in stream:
            yield chat_pb2.ChatResponse(
                message=chunk.choices[0].delta.content or "", type="stream"
            )

        yield chat_pb2.ChatResponse(message="Streaming ended.", type="end")
