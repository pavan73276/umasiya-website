import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import noticeRouter from "./router/noticeRouter.js";
import formRouter from "./router/formRouter.js";
import {cloudinaryConnect} from "./config/cloudinary.js";

const app = express();
config({ path: "./config/config.env" });

const allowedOrigins = [
  "https://flourishing-custard-43e0ba.netlify.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO, process.env.FRONTEND_URL_THREE],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use("/notice", noticeRouter);
app.use("/form", formRouter);

dbConnection();
cloudinaryConnect();

app.use(errorMiddleware);

export default app;
