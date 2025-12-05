// userRoutes.ts
import express, { type Request, type Response, type Router } from "express";
// import { getAllUsers, getUser, updateUser, deleteUser} from '../services/userServices.js';
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUserBlogs,
  getTrashedBlogs,
} from "../controllers/blogsController.js";

const userRouter: Router = express.Router();

// User Profile
//userRouter.get('/', verifyToken, getUserProfile);
userRouter.patch("/", verifyToken, updateUserProfile);
userRouter.get("/blogs", verifyToken, getUserBlogs);
userRouter.get("/trash", verifyToken, getTrashedBlogs);

// User Profile
userRouter.get("/", verifyToken, getUserProfile);

export default userRouter;
