import { ApplicationError } from "../../errorHandler/errorHandler.js";
import commentModel from "../comment/commentSchema.js";
import postModel from "../post/postSchema.js";
import LikeModel from "./likeSchema.js";



export default class likeRepository{
    async getLikes(id){
        try{
        const likes=await LikeModel.find({
            postCommentId : id
        }).populate('userId', 'id name email');
        
        return likes;
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with database',500)
        }
    }
    async toggleLikes(id,userId,type){    
        try {
            if(type !== 'Post' && type!=='Comment'){
                return ({success:false,message:'Invalid Type. Please enter Post valid Type'})
            }


            let isValid = false;
            if (type === 'Post') {
                isValid = await postModel.exists({ _id: id });
            } else if (type === 'Comment') {
                isValid = await commentModel.exists({ _id: id });
            }

            
            if(!isValid){
                return ({success:false,message:`No ${type} found with given id`})
            }

            const like=await LikeModel.findOne({ userId: userId,postCommentId: id, on_model:type})
            if(like){
                await LikeModel.deleteOne({userId: userId,postCommentId: id});
                return ({success:true,message: 'Like removed' });
            }else{
                const newLike = new LikeModel({userId: userId,postCommentId: id, on_model: type });
                await newLike.save();
                return ({ success:true,message: 'Like added' });
            }

        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with database',500)
        }
    }
}