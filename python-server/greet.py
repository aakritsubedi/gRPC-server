import proto_generated.greet_pb2 as greet_pb2
import proto_generated.greet_pb2_grpc as greet_pb2_grpc


class GreetService(greet_pb2_grpc.GreetService):
    def greet(self, request, context):
        return greet_pb2.GreetResponse(
            result=f"Hello, {request.firstName}! you are {request.age} years old 🚀"
        )
