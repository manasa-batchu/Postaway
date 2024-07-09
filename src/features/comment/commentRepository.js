import mongoose from "mongoose"
import postModel from "../post/postSchema.js"
import commentModel from "./commentSchema.js";
import { ApplicationError } from "../../errorHandler/errorHandler.js";

export default class commentRepository{
    async getCommentsByPost(postId,userId){
        try{
            const comments=await commentModel.find({postId:postId});
            if(comments.length==0){
                return {success:false, msg:'No comments for this post'}
            }else{
                return {success:true, res:comments} ;
            }

        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async addCommentByPost(postId,userId,content){
        try{
            const post=await postModel.findOne({_id:postId});
            if(!post){
                return {success:false, msg:'Post not found'} ;
            }
            else{
                const newComment=new commentModel({content:content,postId:postId,userId:userId})
                await newComment.save();

                post.comments.push(newComment.id)
                await post.save();
                return {success:true, res:newComment} ;
            }
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

    async updateCommentById(commentId,content,userId){
        try{
            const updatedComment=await commentModel.updateOne({_id:commentId,userId:userId},{$set:{content:content}})
            if(updatedComment.modifiedCount>0){
                return {success:true, res:'Updated succesfully'} ;
            }else{
                return {success:false, msg:'Comment cannot be updated.Comment owner can only update the comment'}
            }
            
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async deleteComment(commentId,userId){
        try{
            const deleteComment=await commentModel.deleteOne({_id:commentId,userId:userId})
            if(deleteComment.deletedCount>0){
                return {success:true, res:'Deleted succesfully'} ;
               
            }else{
                return {success:false, msg:'Comment cannot be deleted.Comment owner can only delete the comment'}
            }
            
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}