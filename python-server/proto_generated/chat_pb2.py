# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: chat.proto
# Protobuf Python Version: 5.27.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    27,
    2,
    '',
    'chat.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nchat.proto\"\x1f\n\x0b\x43hatRequest\x12\x10\n\x08question\x18\x01 \x01(\t\"-\n\x0c\x43hatResponse\x12\x0f\n\x07message\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t24\n\x0b\x43hatService\x12%\n\x04\x63hat\x12\x0c.ChatRequest\x1a\r.ChatResponse0\x01\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'chat_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_CHATREQUEST']._serialized_start=14
  _globals['_CHATREQUEST']._serialized_end=45
  _globals['_CHATRESPONSE']._serialized_start=47
  _globals['_CHATRESPONSE']._serialized_end=92
  _globals['_CHATSERVICE']._serialized_start=94
  _globals['_CHATSERVICE']._serialized_end=146
# @@protoc_insertion_point(module_scope)
