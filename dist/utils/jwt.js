import "dotenv/config";
import jwt from "jsonwebtoken";
//I load from .env
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not found");
}
// Generate JWT Token
export function generateToken(id, username) {
    const payload = { id, username };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}
//# sourceMappingURL=jwt.js.map