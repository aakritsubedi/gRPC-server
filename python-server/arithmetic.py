import proto_generated.arithmetic_pb2 as arithmetic_pb2
import proto_generated.arithmetic_pb2_grpc as arithmetic_pb2_grpc


# This class is the implementation of the service defined in the proto file
class ArithmeticService(arithmetic_pb2_grpc.ArithmeticServicer):
    def add(self, request, context):
        return arithmetic_pb2.ArithmeticResponse(result=request.num1 + request.num2)

    def subtract(self, request, context):
        return arithmetic_pb2.ArithmeticResponse(result=request.num2 - request.num1)

    def multiply(self, request, context):
        return arithmetic_pb2.ArithmeticResponse(result=request.num1 * request.num2)

    def divide(self, request, context):
        return arithmetic_pb2.ArithmeticResponse(result=request.num1 / request.num2)
