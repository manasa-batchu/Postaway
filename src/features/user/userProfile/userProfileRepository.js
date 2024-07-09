import mongoose from "mongoose";
import { ApplicationError } from "../../../errorHandler/errorHandler.js";
import UserModel from "../userSchema.js";

export default class UserProfileRepository{

    async getDetails(id){
        try{
            const userDetails=await UserModel.findById(id).select("-password -loginTokens")
            return userDetails;            
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

   async getAllDetails(){
        try{
            const userDetails=await UserModel.find().select("-password -loginTokens")
            return userDetails;
        }catch(err){
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    
    async updateDetails(id,avatar,name,gender){
        try{
            const updates = {};
            if (avatar) updates.avatar = avatar;
            if (name) updates.name = name;
            if (gender) updates.gender = gender;
            const user = await UserModel.findByIdAndUpdate(
                id,
                { $set: updates },
                { new: true } 
            ).select('-password -loginTokens');
            if(!user){
                return ({success:false,msg:'No user found'})
            }else{
                return ({success:true,res:user});
            }
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}


