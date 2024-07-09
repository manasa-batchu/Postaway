import { ApplicationError } from "../../errorHandler/errorHandler.js";
import UserModel from "../user/userSchema.js";
import otpModel from "./otpSchema.js";
import nodemailer from 'nodemailer'

export default class otpRepository{
    async sendOtp(email){
        try{
        const userDetail=await UserModel.findOne({
            email : email
        })
        
        const otpValue = Math.floor(100000 + Math.random() * 900000).toString(); 
        const expiresAt = new Date(Date.now() + 600000);
        const otp = new otpModel({
            userId: userDetail._id,
            otp: otpValue,
            expiresAt: expiresAt
        });
        await otp.save();
        return otpValue;
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with database',500)
        }
    }
    async verifyotp(email,otp){    
        try {
            const user=await UserModel.findOne({
                email : email
            })

            const otpRecord = await otpModel.findOne({
                userId: user._id,
                otp: otp,
                expiresAt: { $gt: new Date() }
            });
    
            if (otpRecord) {
                return true;
            } else {
                return false;
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with database',500)
        }
    }

    async resetPassword(userId,hashedPassword,otp){
        try{
            const user = await UserModel.findById(userId);
            const result=await this.verifyotp(user.email,otp);

            if(!result){
                return {success:false,msg:'Invalid otp'}
            }
            
            user.password=hashedPassword;
            await user.save();

            await otpModel.deleteOne({ userId: userId });

            await this.sendEmailNotification(user.email);

            return {success:true,msg:'Password reset successfully'};
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with database',500)
        }
    }

    async sendEmailNotification(email){
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: "codingninjas2k16@gmail.com",
                pass: "slwvvlczduktvhdj",
            }
        });
        const mailOptions = {
            from: "codingninjas2k16@gmail.com",
            to: email,
            subject: "Password Reset",
            text: "Password is reset Succesfully",
        };

        try{
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        }catch(err){
            console.log('Email send failer with error: '+ err);
        }
    }
}