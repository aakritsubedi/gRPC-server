"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const grpc = __importStar(require("@grpc/grpc-js"));
// import * as protoLoader from "@grpc/proto-loader";
// import path from "path";
const arithmetic_1 = require("./proto-generated/arithmetic");
const greet_1 = require("./proto-generated/greet");
const chat_1 = require("./proto-generated/chat");
const PORT = 4000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Load the protobuf
// const protoPath = path.resolve(__dirname, "../proto/arithmetic.proto");
// const packageDefinition = protoLoader.loadSync(protoPath, {});
// const arithmeticProto = grpc.loadPackageDefinition(packageDefinition);
// const client = new (arithmeticProto as any).Arithmetic(
//   "localhost:50051",
//   grpc.credentials.createInsecure()
// );
// gRPC Client
const arithmeticClient = new arithmetic_1.ArithmeticClient("localhost:50051", grpc.credentials.createInsecure());
const greetClient = new greet_1.GreetServiceClient("localhost:50051", grpc.credentials.createInsecure());
const chatClient = new chat_1.ChatServiceClient("localhost:50051", grpc.credentials.createInsecure());
// Health check
app.get("/", (req, res) => {
    res.send("Server is working");
});
// Arithmetic operations
app.get("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num1, num2 } = req.query;
        if (!num1 || !num2) {
            throw new Error("Please provide both numbers");
        }
        arithmeticClient.add({
            num1: Number(num1),
            num2: Number(num2),
        }, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({
                firstNo: num1,
                secondNo: num2,
                result: response.result,
                message: `The sum of ${num1} and ${num2} is ${response.result}`,
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get("/subtract", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num1, num2 } = req.query;
        if (!num1 || !num2) {
            throw new Error("Please provide both numbers");
        }
        arithmeticClient.subtract({
            num1: Number(num1),
            num2: Number(num2),
        }, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({
                firstNo: num1,
                secondNo: num2,
                result: response.result,
                message: `The difference of ${num1} and ${num2} is ${response.result}`,
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get("/multiply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num1, num2 } = req.query;
        if (!num1 || !num2) {
            throw new Error("Please provide both numbers");
        }
        arithmeticClient.multiply({
            num1: Number(num1),
            num2: Number(num2),
        }, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({
                firstNo: num1,
                secondNo: num2,
                result: response.result,
                message: `The product of ${num1} and ${num2} is ${response.result}`,
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get("/divide", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { num1, num2 } = req.query;
        if (!num1 || !num2) {
            throw new Error("Please provide both numbers");
        }
        arithmeticClient.divide({
            num1: Number(num1),
            num2: Number(num2),
        }, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({
                firstNo: num1,
                secondNo: num2,
                result: response.result,
                message: `The division of ${num1} and ${num2} is ${response.result}`,
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Greet
app.get("/greet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, age } = req.query;
        if (!firstName || !lastName || !age) {
            throw new Error("Please provide all the details");
        }
        greetClient.greet({
            firstName: firstName,
            lastName: lastName,
            age: parseInt(age),
        }, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({ message: response.result });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Chat
app.get("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set headers for SSE
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
        const { question } = req.query;
        if (!question) {
            throw new Error("Please provide a question");
        }
        const call = chatClient.chat({
            question: question,
        });
        call.on("data", (response) => {
            console.log(`Received message: ${response.message}`);
            // Send the message to the client
            // res.write(`event: ping\n`);
            res.write(`data: ${JSON.stringify({ message: response.message })}\n\n`);
        });
        call.on("end", () => {
            console.log("Streaming ended.");
            res.end();
        });
        call.on("error", (error) => {
            console.error(`Error: ${error.message}`);
            res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end(); // End the response on error
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}));
app.listen(PORT, () => {
    console.log(`🚀 [Backend Server Started] Server is running on http://localhost:${PORT}`);
});
