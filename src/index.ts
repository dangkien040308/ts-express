import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { UserRouter } from "./routes/userRouter";
import { AuthRouter } from "./routes/authRouter";

import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cookieParser())
app.use(cors({
  origin : ['http://localhost:3001'],
  methods : ['GET','POST','PUT','DELETE','PATCH'],
  credentials: true // Cho phép gửi cookie cùng request
}))

app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/user',UserRouter)
app.use('/auth',AuthRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});