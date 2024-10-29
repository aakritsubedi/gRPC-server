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
import { ChatResponse, ChatServiceClient } from "./proto-generated/chat";

const PORT = 4000;

const app: Express = express();
app.use(bodyParser.json());

// Load the protobuf
// const protoPath = path.resolve(__dirname, "../proto/arithmetic.proto");
// const packageDefinition = protoLoader.loadSync(protoPath, {});

// const arithmeticProto = grpc.loadPackageDefinition(packageDefinition);

// const client = new (arithmeticProto as any).Arithmetic(
//   "localhost:50051",
//   grpc.credentials.createInsecure()
// );

// gRPC Client
const arithmeticClient = new ArithmeticClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const greetClient = new GreetServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const chatClient = new ChatServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Server is working");
});

// Arithmetic operations
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

app.get("/subtract", async (req: Request, res: Response) => {
  try {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
      throw new Error("Please provide both numbers");
    }

    arithmeticClient.subtract(
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
          message: `The difference of ${num1} and ${num2} is ${response.result}`,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/multiply", async (req: Request, res: Response) => {
  try {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
      throw new Error("Please provide both numbers");
    }

    arithmeticClient.multiply(
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
          message: `The product of ${num1} and ${num2} is ${response.result}`,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/divide", async (req: Request, res: Response) => {
  try {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
      throw new Error("Please provide both numbers");
    }

    arithmeticClient.divide(
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
          message: `The division of ${num1} and ${num2} is ${response.result}`,
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Greet
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
      } as GreetRequest,
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

// Chat
app.get("/chat", async (req: Request, res: Response) => {
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
      question: question as string,
    });

    call.on("data", (response: ChatResponse) => {
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
      res.write(
        `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`
      );
      res.end(); // End the response on error
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(
    `🚀 [Backend Server Started] Server is running on http://localhost:${PORT}`
  );
});
