import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import globalErrorMiddleware from "./app/middlewares/globalErrorMiddleware";
import notFound from "./app/middlewares/notFound";
const app = express();

//parser
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorMiddleware);
app.use(notFound);

export default app;
