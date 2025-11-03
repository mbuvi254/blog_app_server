import "dotenv/config";
import jwt from "jsonwebtoken";
import express,{type Request,type Response,type NextFunction} from "express";
;



//I load from .env
const SECRET_KEY:string = process.env.JWT_SECRET as string;
if(!SECRET_KEY){
    throw new Error("JWT_SECRET is not found");
}

// Generate JWT Token
export function generateToken(id:string,username :string) {
    const payload = {id,username};
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h"}); 
};

// Verify JWT Token Middleware
export  function verifyToken(req:Request,res:Response,next:NextFunction) {
    try{
        const access_token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
        if(!access_token){
            return res.status(401).json({
                status:"Error",
                message:"Access Token not available"
            });
        }
        const decoded = jwt.verify(access_token, SECRET_KEY) as { id: string; username: string };
        (req as any).user = decoded;
        next();
    }catch(error){
        console.error("Invalid Access Token");
        res.status(401).json({
            status:"Error",
            message:"Invalid Access Token"
        });
        return null;
    }
};


