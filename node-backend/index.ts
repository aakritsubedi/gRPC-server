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

app.listen(PORT, () => {
  console.log(
    `🚀 [Backend Server Started] Server is running on http://localhost:${PORT}`
  );
});
