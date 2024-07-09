import express from 'express';
import otpController from './otpController.js';


const otpcontroller=new otpController();
const otpRouter=express.Router();

otpRouter.post('/send',(req,res,next)=>otpcontroller.sendOtp(req,res,next))
otpRouter.post('/verify',(req,res,next)=>otpcontroller.verifyOtp(req,res,next))
otpRouter.post('/reset-password',(req,res,next)=>otpcontroller.resetPassword(req,res,next))


export default otpRouter;