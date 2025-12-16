import { getPublicBlogs, getPublicBlog, getBlogComments, } from "../controllers/publicController.js";
import express, {} from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
const publicRouter = express.Router();
publicRouter.get("/blogs", getPublicBlogs);
publicRouter.get("/blogs/:id", getPublicBlog);
publicRouter.get("/comments/:blogId", getBlogComments);
export default publicRouter;
//# sourceMappingURL=publicRoutes.js.map