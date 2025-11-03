import express, {} from 'express';
import { registerUser } from '../controllers/authController.js';
const authRouter = express.Router();
// User Registration Route
authRouter.post('/register', registerUser);
export default authRouter;
//# sourceMappingURL=userRoutes.js.map