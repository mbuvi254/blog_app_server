import express,{type Request,type Response,type Router} from 'express';
import {registerUser,loginUser,logoutUser,getUserProfile} from '../controllers/authController.js';
import { verifyToken } from '../controllers/tokenHelpers.js';

const authRouter:Router =express.Router();

// User Registration Route
authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)
authRouter.post('/logout',logoutUser)

// User Profile
authRouter.get('/profile', verifyToken, getUserProfile);




export default authRouter;