import jwt, {} from "jsonwebtoken";
import express, {} from "express";
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not found");
}
// Verify JWT Token Middleware Make sure my users have valid token 
export function verifyToken(req, res, next) {
    try {
        //I Get Token from cookies or headers
        const access_token = req.cookies.accessToken ||
            req.headers.authorization?.split(" ")[1];
        console.log("Access Token:", access_token);
        if (!access_token) {
            return res.status(401).json({
                status: "Error",
                message: "Access Token not available"
            });
        }
        const decoded = jwt.verify(access_token, SECRET_KEY);
        //add the decoded data to the request 
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Invalid Access Token");
        res.status(401).json({
            status: "Error",
            message: "Invalid Access Token"
        });
        // return null;
    }
}
;
//# sourceMappingURL=authMiddleware.js.map