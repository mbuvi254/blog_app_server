//blogRouter.ts
import { createNewBlog, getAllBlogs, getBlog, updateBlog, restoreBlog, deleteBlog, trashBlog, getUserBlogs, getTrashedBlogs, getBlogDrafts, publishBlog, getPublishedBlogs, unpublishBlog, createComment, getBlogComments, } from "../controllers/blogsController.js";
import express, {} from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
const blogRouter = express.Router();
// Create
blogRouter.post("/", verifyToken, createNewBlog);
// Read
blogRouter.get("/all", verifyToken, getAllBlogs);
blogRouter.get("/", verifyToken, getUserBlogs);
blogRouter.get("/published", verifyToken, getPublishedBlogs);
blogRouter.get("/draft", verifyToken, getBlogDrafts);
blogRouter.get("/trash", verifyToken, getTrashedBlogs);
blogRouter.get("/:id", verifyToken, getBlog);
// Update
blogRouter.patch("/:id", verifyToken, updateBlog);
// State Changes
blogRouter.patch("/publish/:id", verifyToken, publishBlog);
blogRouter.patch("/unpublish/:id", verifyToken, unpublishBlog);
blogRouter.patch("/trash/:id", verifyToken, trashBlog);
blogRouter.patch("/restore/:id", verifyToken, restoreBlog);
// Delete
blogRouter.delete("/:id", verifyToken, deleteBlog);
// Comment
blogRouter.post("/comments", verifyToken, createComment);
blogRouter.get("/comments/:blogId", verifyToken, getBlogComments);
export default blogRouter;
//# sourceMappingURL=blogRoutes.js.map