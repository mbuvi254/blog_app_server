import express, {} from "express";
import { registerUser, loginUser, logoutUser, updateUserPassword, getCurrentUser, } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const authRouter = express.Router();
// User Registration Route
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.patch("/password", verifyToken, updateUserPassword);
authRouter.get("/me", verifyToken, getCurrentUser);
export default authRouter;
//# sourceMappingURL=authRoutes.js.map