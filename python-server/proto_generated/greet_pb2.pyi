from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class GreetRequest(_message.Message):
    __slots__ = ("firstName", "lastName", "age")
    FIRSTNAME_FIELD_NUMBER: _ClassVar[int]
    LASTNAME_FIELD_NUMBER: _ClassVar[int]
    AGE_FIELD_NUMBER: _ClassVar[int]
    firstName: str
    lastName: str
    age: int
    def __init__(self, firstName: _Optional[str] = ..., lastName: _Optional[str] = ..., age: _Optional[int] = ...) -> None: ...

class GreetResponse(_message.Message):
    __slots__ = ("result",)
    RESULT_FIELD_NUMBER: _ClassVar[int]
    result: str
    def __init__(self, result: _Optional[str] = ...) -> None: ...
