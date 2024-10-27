"use strict";
// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.3
// source: arithmetic.proto
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArithmeticClient = exports.ArithmeticService = exports.ArithmeticResponse = exports.ArithmeticRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const wire_1 = require("@bufbuild/protobuf/wire");
const grpc_js_1 = require("@grpc/grpc-js");
exports.protobufPackage = "";
function createBaseArithmeticRequest() {
    return { num1: 0, num2: 0 };
}
exports.ArithmeticRequest = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.num1 !== 0) {
            writer.uint32(9).double(message.num1);
        }
        if (message.num2 !== 0) {
            writer.uint32(17).double(message.num2);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseArithmeticRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 9) {
                        break;
                    }
                    message.num1 = reader.double();
                    continue;
                }
                case 2: {
                    if (tag !== 17) {
                        break;
                    }
                    message.num2 = reader.double();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            num1: isSet(object.num1) ? globalThis.Number(object.num1) : 0,
            num2: isSet(object.num2) ? globalThis.Number(object.num2) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.num1 !== 0) {
            obj.num1 = message.num1;
        }
        if (message.num2 !== 0) {
            obj.num2 = message.num2;
        }
        return obj;
    },
    create(base) {
        return exports.ArithmeticRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseArithmeticRequest();
        message.num1 = (_a = object.num1) !== null && _a !== void 0 ? _a : 0;
        message.num2 = (_b = object.num2) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseArithmeticResponse() {
    return { result: 0 };
}
exports.ArithmeticResponse = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.result !== 0) {
            writer.uint32(9).double(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseArithmeticResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 9) {
                        break;
                    }
                    message.result = reader.double();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { result: isSet(object.result) ? globalThis.Number(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = message.result;
        }
        return obj;
    },
    create(base) {
        return exports.ArithmeticResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseArithmeticResponse();
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
exports.ArithmeticService = {
    add: {
        path: "/Arithmetic/add",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.ArithmeticRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.ArithmeticRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.ArithmeticResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.ArithmeticResponse.decode(value),
    },
    subtract: {
        path: "/Arithmetic/subtract",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.ArithmeticRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.ArithmeticRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.ArithmeticResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.ArithmeticResponse.decode(value),
    },
    multiply: {
        path: "/Arithmetic/multiply",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.ArithmeticRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.ArithmeticRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.ArithmeticResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.ArithmeticResponse.decode(value),
    },
    divide: {
        path: "/Arithmetic/divide",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.ArithmeticRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.ArithmeticRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.ArithmeticResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.ArithmeticResponse.decode(value),
    },
};
exports.ArithmeticClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.ArithmeticService, "Arithmetic");
function isSet(value) {
    return value !== null && value !== undefined;
}