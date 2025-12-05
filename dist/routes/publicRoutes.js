import { getPublicBlogs, getPublicBlog, } from "../controllers/publicController.js";
import express, {} from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
const publicRouter = express.Router();
publicRouter.get("/blogs", getPublicBlogs);
publicRouter.get("/blogs/:id", getPublicBlog);
export default publicRouter;
//# sourceMappingURL=publicRoutes.js.map