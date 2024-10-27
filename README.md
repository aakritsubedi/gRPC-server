# gRPC Calculator

This project demonstrates a gRPC-based calculator service implemented in both Python and Node.js. The service supports basic arithmetic operations such as addition, subtraction, multiplication, and division.

## Overview

The project is structured into two main parts:

1. **Node.js Backend**: This part of the project serves as the client that interacts with the gRPC service.
2. **Python Server**: This part of the project serves as the gRPC server that performs the arithmetic operations.

## Project Structure

```
.
├── .gitignore
├── README.md
├── node-backend
│   ├── dist
│   ├── index.ts
│   ├── node_modules
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── proto-generated
│   └── tsconfig.json
├── proto
│   ├── arithmetic.proto
│   └── greet.proto
├── python-server
│   ├── __pycache__
│   ├── arithmetic.py
│   ├── greet.py
│   ├── proto_generated
│   ├── requirements.txt
│   └── server.py
└── venv
    ├── .gitignore
    ├── bin
    ├── lib
    └── pyvenv.cfg
```

## Steps to Follow

### 1. Define a Proto Buffer File

Define your gRPC service and messages in a proto file. For example, `proto/arithmetic.proto`:

```proto
syntax = "proto3";

service Arithmetic {
  rpc Add (ArithmeticRequest) returns (ArithmeticResponse);
  rpc Subtract (ArithmeticRequest) returns (ArithmeticResponse);
  rpc Multiply (ArithmeticRequest) returns (ArithmeticResponse);
  rpc Divide (ArithmeticRequest) returns (ArithmeticResponse);
}

message ArithmeticRequest {
  double num1 = 1;
  double num2 = 2;
}

message ArithmeticResponse {
  double result = 1;
}
```

### 2. Python Server Setup

a. Python Virtual Environment

```sh
$ python -m pip install virtualenv
$ virtualenv venv
$ source venv/bin/activate
$ python -m pip install --upgrade pip
```

b. Install gRPC

```sh
$ python -m pip install grpcio
```

c. Install gRPC Tools

```sh
$ python -m pip install grpcio-tools
```

d. Generate gRPC Code

```sh
$ python -m grpc_tools.protoc -I./proto --python_out=./python-server/proto_generated --pyi_out=./python-server/proto_generated --grpc_python_out=./python-server/proto_generated ./proto/*.proto
```

e. Implement functionality

```python
# Import from the generated file
import proto_generated.arithmetic_pb2 as arithmetic_pb2
import proto_generated.arithmetic_pb2_grpc as arithmetic_pb2_grpc


class ArithmeticService(arithmetic_pb2_grpc.ArithmeticServicer):
   def add(self, request, context):
      return arithmetic_pb2.ArithmeticResponse(result=request.num1 + request.num2)

   def subtract(self, request, context):
      return arithmetic_pb2.ArithmeticResponse(result=request.num2 - request.num1)

   def multiply(self, request, context):
      return arithmetic_pb2.ArithmeticResponse(result=request.num1 * request.num2)

   def divide(self, request, context):
      return arithmetic_pb2.ArithmeticResponse(result=request.num1 / request.num2)
```

f. Define Server

```python
# Core gRPC
import grpc
from concurrent import futures

# Greet Service
from greet import GreetService
import proto_generated.greet_pb2_grpc as greet_pb2_grpc

# Arithmetic Service
from arithmetic import ArithmeticService
import proto_generated.arithmetic_pb2_grpc as arithmetic_pb2_grpc

# Server
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
```

g. Run Server

```sh
$ python python-server/server.py
```

### 3. Node Backend

The Node.js backend server acts as an intermediary between the user and the Python gRPC server. It receives user data through API endpoints, forwards these inputs as arguments to the remote Python functions, and returns the computed results back to the user.

a. Implement gRPC client

```js
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import path from "path";
import {
  ArithmeticClient,
  ArithmeticRequest,
  ArithmeticResponse,
} from "./proto-generated/arithmetic";
import {
  GreetServiceClient,
  GreetResponse,
  GreetRequest,
} from "./proto-generated/greet";
// Generated using proto:gen command in package.json file

const PORT = 4000;

const app: Express = express();
app.use(bodyParser.json());

// Way 1: Implementing gRPC client
// Load the protobuf
// const protoPath = path.resolve(__dirname, "../proto/arithmetic.proto");
// const packageDefinition = protoLoader.loadSync(protoPath, {});

// const arithmeticProto = grpc.loadPackageDefinition(packageDefinition);

// const client = new (arithmeticProto as any).Arithmetic(
//   "localhost:50051",
//   grpc.credentials.createInsecure()
// );

const arithmeticClient = new ArithmeticClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const greetClient = new GreetServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is working");
});

app.get("/add", async (req: Request, res: Response) => {
  try {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
      throw new Error("Please provide both numbers");
    }

    arithmeticClient.add(
      {
        num1: Number(num1),
        num2: Number(num2),
      } as ArithmeticRequest,
      (err: any, response: ArithmeticResponse) => {
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
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/greet", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age } = req.query;

    if (!firstName || !lastName || !age) {
      throw new Error("Please provide all the details");
    }

    greetClient.greet(
      {
        firstName: firstName as string,
        lastName: lastName as string,
        age: parseInt(age as string),
      } as GreetRequest,,
      (err: any, response: GreetResponse) => {
        if (err) {
          console.error(err);
          return;
        }

        res.json({ message: response.result });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(
    `🚀 [Backend Server Started] Server is running on http://localhost:${PORT}`
  );
});
```

b. Run the node backend server

```sh
$ npm run dev # start application in dev mode
```

### 4. Testing

You can test the service by sending a GET request to the Node.js backend:

```sh
$ curl "http://localhost:4000/add?num1=10&num2=20"

## Output:
{
  "firstNo": "100",
  "secondNo": "200",
  "result": 300,
  "message": "The sum of 100 and 200 is 300"
}
```

```sh
$ curl "http://localhost:4000/greet?firstName=aakrit&lastName=subedi&age=27"

## Output
{
  "message": "Hello, aakrit! you are 27 years old 🚀"
}
```
