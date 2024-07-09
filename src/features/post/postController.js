
import postRepository from "./postRepository.js";


export default class postController{

    constructor(){
        this.postRepository=new postRepository()
    }
    async addpost(req,res,next){
        try{
            const newPost={
                imageUrl:req.file.filename,
                caption:req.body.caption,
                userId:req.userId
            };
            const result=await this.postRepository.addPost(newPost);
            return res.status(201).send(result)
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async getPostsByUserId(req,res,next){
        try{
            const posts=await this.postRepository.getPostByUserId(req.userId)
            if (posts.length>0){
                return res.status(200).send(posts)
            }
           return res.status(200).send('No posts')
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async getallPosts(req,res,next){
        try{
            const posts=await this.postRepository.getAllPosts();
            if (posts.length>0){
                return res.status(200).send(posts)
            }
           return res.status(200).send('No posts')
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async getPostById(req,res,next){
        try{
            const id=req.params.postId;
            const post=await this.postRepository.getPostById(id);
            return res.status(200).send(post)
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async updatePostById(req,res,next){
        try{
            const id=req.params.postId;
            const updatedPost={
                imageUrl:req.file.filename,
                caption:req.body.caption,
            };
            const userId=req.userId
            const post=await this.postRepository.updatePostById(id,updatedPost,userId);
            if(post.modifiedCount>0){
                return res.status(200).send('post updated succesfully')
            }else{
                return res.status(200).send('Post cannot be updated. Post owner can only update the post')
            }
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async deletePostById(req,res,next){
        try{
            const id=req.params.postId;
            const userId=req.userId
            const post=await this.postRepository.deletePostById(id,userId);
            if(post.deletedCount>0){
                return res.status(200).send('post deleted succesfully')
            }else{
                return res.status(200).send('Post cannot be deleted. Post owner can only delete the post')
            }
        }catch(err){
            console.log(err);
            next(err)
        }
    }
}