import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRouter from "./router/messageRouter.js";
import noticeRouter from "./router/noticeRouter.js";

const app = express();
config({ path: "./config/config.env" });

const allowedOrigins = [
  "https://fantastic-melba-68f6b8.netlify.app/",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/message", messageRouter);
app.use("/notice", noticeRouter);

dbConnection();

export default app;
