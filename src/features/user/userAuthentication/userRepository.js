import mongoose from "mongoose";
import { ApplicationError } from "../../../errorHandler/errorHandler.js";
import UserModel from "../userSchema.js";

export default class UserRepository{

    async signUp(user){
        try{
            const newUser=new UserModel(user);
            await newUser.save();
            return newUser;            
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

   async signIn(email,password){
        try{
           const emailResult= await UserModel.findOne({email:email})
           return emailResult;
        }catch(err){
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    
    
    async logout_All_Devices(userId){
        try{
                const user = await UserModel.findById(userId);
                if (!user) {
                    return false; 
                }
                user.loginTokens = [];
                await user.save();
                return true; 
        }catch(err){
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async updateLoginToken(userId, token) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return false; 
            }
            user.loginTokens.push(token);
            await user.save();
            return true; 
        } catch (error) {
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}


