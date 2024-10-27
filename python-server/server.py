import grpc
from concurrent import futures

from greet import GreetService
import proto_generated.greet_pb2_grpc as greet_pb2_grpc

from arithmetic import ArithmeticService
import proto_generated.arithmetic_pb2_grpc as arithmetic_pb2_grpc


def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    greet_pb2_grpc.add_GreetServiceServicer_to_server(GreetService(), server)
    arithmetic_pb2_grpc.add_ArithmeticServicer_to_server(ArithmeticService(), server)

    server.add_insecure_port("[::]:50051")
    print(f"🚀 [Server Started] Server is running on port 50051")

    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    main()
