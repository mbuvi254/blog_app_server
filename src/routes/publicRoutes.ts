import {
  getPublicBlogs,
  getPublicBlog,
  getBlogComments,
} from "../controllers/publicController.js";
import express, { type Request, type Response, type Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const publicRouter: Router = express.Router();

publicRouter.get("/blogs", getPublicBlogs);
publicRouter.get("/blogs/:id", getPublicBlog);
publicRouter.get("/comments/:blogId",getBlogComments);

export default publicRouter;
