//blogRouter
import { createNewBlog, getAllBlogs, getBlog, updateBlog, restoreBlog, deleteBlog, trashBlog } from "../controllers/blogsController.js";
import express, {} from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
const blogRouter = express.Router();
blogRouter.post("/", verifyToken, createNewBlog);
blogRouter.get("/", verifyToken, getAllBlogs);
blogRouter.get("/:id", verifyToken, getBlog);
blogRouter.delete("/:id", verifyToken, deleteBlog);
blogRouter.patch("/:id", verifyToken, updateBlog);
blogRouter.patch("/restore/:id", verifyToken, restoreBlog);
blogRouter.patch("/trash/:id", verifyToken, trashBlog);
export default blogRouter;
//# sourceMappingURL=blogRoutes.js.map