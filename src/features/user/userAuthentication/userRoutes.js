import express from 'express';
import UserController from './userController.js';
import jwAuth from '../../../middleware/jwtMiddleware.js';

const userController=new UserController();
const userAuthRouter=express.Router();

userAuthRouter.post('/signup',(req,res,next)=>{userController.signup(req,res,next)});
userAuthRouter.post('/signin',(req,res,next)=>{userController.signin(req,res,next)});
userAuthRouter.get('/logout',jwAuth,(req,res,next)=>{userController.logout(req,res,next)});
userAuthRouter.get('/logout-all-devices',jwAuth,(req,res,next)=>{userController.logout_all_devices(req,res,next)});

export default userAuthRouter;
