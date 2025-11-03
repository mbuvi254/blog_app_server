// userRoutes.ts
import express, {} from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/usersController.js';
const userRouter = express.Router();
//User CRUD
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete('/:id', deleteUser);
export default userRouter;
//# sourceMappingURL=usersRoutes.js.map