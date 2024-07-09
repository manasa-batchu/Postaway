import mongoose from 'mongoose'
import { ApplicationError } from '../../errorHandler/errorHandler.js';
import postModel from './postSchema.js';



export default class postRepository{
    async addPost(post){
        try{
            const newPost=await postModel.create(post);
            await newPost.save();
            return newPost;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

    async getPostByUserId(userId){
        try{
            const posts=await postModel.find({userId})
            return posts
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAllPosts(){
        try{
            const posts=await postModel.find();
            return posts;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getPostById(id){
        try{
            const post=await postModel.findById(id);
            return post;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async updatePostById(id,updatedPost,userId){
        try{
            const post=await postModel.updateOne({_id:id,userId:userId},{$set:updatedPost});
            return post;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async deletePostById(id,userId){
        try{
            const post=await postModel.deleteOne({_id:id,userId:userId});
            return post;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }



}