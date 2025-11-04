import "dotenv/config";
import cors from "cors";
import express, {} from 'express';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/blogs', blogRouter);
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map