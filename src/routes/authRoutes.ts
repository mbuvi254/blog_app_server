import express, { type Request, type Response, type Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const authRouter: Router = express.Router();

// User Registration Route
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.patch("/password", verifyToken, updateUserPassword);
authRouter.get("/me", verifyToken, getCurrentUser);

export default authRouter;
