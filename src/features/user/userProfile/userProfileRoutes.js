import express from 'express';
import UserProfileController from './userProfileController.js';
import { upload } from '../../../middleware/multer.js';
import jwAuth from '../../../middleware/jwtMiddleware.js';


const userProfileController=new UserProfileController();
const userProfileRouter=express.Router();

userProfileRouter.get('/get-details/:userId',(req,res,next)=>{userProfileController.getDetails(req,res,next)});
userProfileRouter.get('/get-all-details',(req,res,next)=>{userProfileController.getAllDetails(req,res,next)});
userProfileRouter.put('/update-details/:userId',jwAuth,upload.single('avatar'),(req,res,next)=>{userProfileController.updateDetails(req,res,next)});

export default userProfileRouter;
