import jwt, { type JwtPayload } from "jsonwebtoken";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import client from "../config/database.js";

const SECRET_KEY: string = process.env.JWT_SECRET as string;
if (!SECRET_KEY) throw new Error("JWT_SECRET is not found");

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res
        .status(401)
        .json({ status: "Error", message: "Access Token not available" });
    }

    // Decode token
    const decoded = jwt.verify(accessToken, SECRET_KEY) as JwtPayload & {
      id: string;
      username: string;
    };

    // Fetch full user from DB
    const user = await client.user.findUnique({ where: { id: decoded.id } });
    if (!user)
      return res
        .status(401)
        .json({ status: "Error", message: "User not found" });

    // Attach full user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Invalid Access Token", error);
    return res
      .status(401)
      .json({ status: "Error", message: "Invalid Access Token" });
  }
}
