import "dotenv/config";
import cors from "cors";
import express,{type Express,type Request,type Response} from 'express';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/usersRoutes.js"; 
import cookieParser from "cookie-parser";

const app: Express= express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5000", // your frontend URL
  credentials: true
}));



app.use('/auth',authRouter);
app.use('/users',userRouter);




const PORT:number= Number(process.env.PORT);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});