// userRoutes.ts
import express,{type Request,type Response,type Router} from 'express';
import { getAllUsers, getUser, updateUser, deleteUser} from '../controllers/usersController.js';
   

const userRouter:Router = express.Router();


//User CRUD
userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUser);
userRouter.patch("/:id",updateUser);
userRouter.delete('/:id',deleteUser);


export default userRouter;

