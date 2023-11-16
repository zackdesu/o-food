import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const app: Express = express();

dotenv.config({
  path: `.env.${app.get("env")}`,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is online!");
});

export default app;
