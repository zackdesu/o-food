import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { food } from "./route";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({
  path: `.env.${app.get("env")}`,
});

app.use(food);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online!");
});

export default app;
