
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserProfileRepository from './userProfileRepository.js';
export default class UserProfileController{

    constructor(){
        this.userProfileRepository=new UserProfileRepository();
    }

    async getDetails(req,res,next){
        try{
            const id=req.params.userId;
            const userDetails=await this.userProfileRepository.getDetails(id);
            res.status(200).send(userDetails)
        }catch(err){
            console.log(err)
            next(err)
        }
    }

   async getAllDetails(req,res,next){
        try{
            const userDetails=await this.userProfileRepository.getAllDetails();
            return res.status(200).send(userDetails)
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    
    async updateDetails(req,res,next){
        try{
                const id=req.params.userId;
                const avatar=req.file.filename;
                const {name,gender}=req.body;
                const user=await this.userProfileRepository.updateDetails(id,avatar,name,gender);
                if(user.success){
                    return res.status(200).send('user updated succesfully')
                }else{
                    return res.status(400).send(user.msg)
                }
        }catch(err){
            next(err)
        }
    }
    
}


