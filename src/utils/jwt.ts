import "dotenv/config";
import jwt from "jsonwebtoken";

//I load from .env
const SECRET_KEY: string = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not found");
}

// Generate JWT Token
export function generateToken(id: string, username: string) {
  const payload = { id, username };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}
