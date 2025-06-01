import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRouter from "./router/messageRouter.js";
import noticeRouter from "./router/noticeRouter.js";

const app = express();
config({path: "./config/config.env"});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use("/message", messageRouter);
app.use("/notice", noticeRouter);

dbConnection();

export default app;