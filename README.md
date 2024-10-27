# gRPC Calculator

### 3. Node Backend

The Node.js backend server acts as an intermediary between the user and the Python gRPC server. It receives user data through API endpoints, forwards these inputs as arguments to the remote Python functions, and returns the computed results back to the user.

a. Implement gRPC client

```node
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const PORT = 4000;

const app: Express = express();
app.use(bodyParser.json());

// Load the protobuf
const protoPath = path.resolve(__dirname, "../proto/arithmetic.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {});
const ArithmeticPackage = grpc.loadPackageDefinition(packageDefinition) as any;

// Create gRPC client
const client = new ArithmeticPackage.Arithmetic(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is working");
});

app.get("/add", (req: Request, res: Response) => {
  const { num1, num2 } = req.query;
  client.Add(
    { num1: parseFloat(num1 as string), num2: parseFloat(num2 as string) },
    (error: any, response: any) => {
      if (!error) {
        res.json(response);
      } else {
        res.status(500).json({ error: error.details });
      }
    }
  );
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
```

```sh
$ curl "http://localhost:4000/greet?firstName=aakrit&lastName=subedi&age=27"
```
