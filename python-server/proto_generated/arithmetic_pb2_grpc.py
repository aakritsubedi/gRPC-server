# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

import arithmetic_pb2 as arithmetic__pb2

GRPC_GENERATED_VERSION = '1.67.0'
GRPC_VERSION = grpc.__version__
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    raise RuntimeError(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in arithmetic_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
    )


class ArithmeticStub(object):
    """Server Methods Schema
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.add = channel.unary_unary(
                '/Arithmetic/add',
                request_serializer=arithmetic__pb2.ArithmeticRequest.SerializeToString,
                response_deserializer=arithmetic__pb2.ArithmeticResponse.FromString,
                _registered_method=True)
        self.subtract = channel.unary_unary(
                '/Arithmetic/subtract',
                request_serializer=arithmetic__pb2.ArithmeticRequest.SerializeToString,
                response_deserializer=arithmetic__pb2.ArithmeticResponse.FromString,
                _registered_method=True)
        self.multiply = channel.unary_unary(
                '/Arithmetic/multiply',
                request_serializer=arithmetic__pb2.ArithmeticRequest.SerializeToString,
                response_deserializer=arithmetic__pb2.ArithmeticResponse.FromString,
                _registered_method=True)
        self.divide = channel.unary_unary(
                '/Arithmetic/divide',
                request_serializer=arithmetic__pb2.ArithmeticRequest.SerializeToString,
                response_deserializer=arithmetic__pb2.ArithmeticResponse.FromString,
                _registered_method=True)


class ArithmeticServicer(object):
    """Server Methods Schema
    """

    def add(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def subtract(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def multiply(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def divide(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ArithmeticServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'add': grpc.unary_unary_rpc_method_handler(
                    servicer.add,
                    request_deserializer=arithmetic__pb2.ArithmeticRequest.FromString,
                    response_serializer=arithmetic__pb2.ArithmeticResponse.SerializeToString,
            ),
            'subtract': grpc.unary_unary_rpc_method_handler(
                    servicer.subtract,
                    request_deserializer=arithmetic__pb2.ArithmeticRequest.FromString,
                    response_serializer=arithmetic__pb2.ArithmeticResponse.SerializeToString,
            ),
            'multiply': grpc.unary_unary_rpc_method_handler(
                    servicer.multiply,
                    request_deserializer=arithmetic__pb2.ArithmeticRequest.FromString,
                    response_serializer=arithmetic__pb2.ArithmeticResponse.SerializeToString,
            ),
            'divide': grpc.unary_unary_rpc_method_handler(
                    servicer.divide,
                    request_deserializer=arithmetic__pb2.ArithmeticRequest.FromString,
                    response_serializer=arithmetic__pb2.ArithmeticResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'Arithmetic', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('Arithmetic', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class Arithmetic(object):
    """Server Methods Schema
    """

    @staticmethod
    def add(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/Arithmetic/add',
            arithmetic__pb2.ArithmeticRequest.SerializeToString,
            arithmetic__pb2.ArithmeticResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def subtract(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/Arithmetic/subtract',
            arithmetic__pb2.ArithmeticRequest.SerializeToString,
            arithmetic__pb2.ArithmeticResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def multiply(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/Arithmetic/multiply',
            arithmetic__pb2.ArithmeticRequest.SerializeToString,
            arithmetic__pb2.ArithmeticResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def divide(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/Arithmetic/divide',
            arithmetic__pb2.ArithmeticRequest.SerializeToString,
            arithmetic__pb2.ArithmeticResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)