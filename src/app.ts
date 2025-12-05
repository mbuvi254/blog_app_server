import "dotenv/config";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import publicRouter from "./routes/publicRoutes.js";

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
const app: Express = express();
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   // origin: "http://localhost:5000",
//   origin:"*",
//   credentials: true
// }));

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/auth", authRouter);
app.use("/profile", userRouter);
app.use("/blogs", blogRouter);
app.use("/public", publicRouter);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
