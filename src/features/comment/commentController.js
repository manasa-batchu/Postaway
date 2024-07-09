import commentRepository from "./commentRepository.js";


export default class commentController{
    constructor(){
        this.commentRepository=new commentRepository();
    }

    async getCommentsByPost(req,res,next){
        try{
            const postId=req.params.postId;
            const userId=req.userId;
            const comments=await this.commentRepository.getCommentsByPost(postId,userId)
            if(!comments.success){
                return res.status(400).send(comments.msg)
            }
            return res.status(200).send(comments.res)
            
        }
        catch(err){
            console.log(err);
            next(err)
        }

    }
    async addCommentByPost(req,res,next){
        try{
            const postId=req.params.postId;
            const content=req.body.content;
            const userId=req.userId;

            const comment=await this.commentRepository.addCommentByPost(postId,userId,content);
            if(!comment.success){
                return res.status(400).send(comment.msg)
            }
            return res.status(200).send(comment.res)
            
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async updateCommentById(req,res,next){
        try{
            const commentId=req.params.commentId;
            const content=req.body.content;
            const userId=req.userId;
            const comments=await this.commentRepository.updateCommentById(commentId,content,userId)
            if(!comments.success){
                return res.status(400).send(comments.msg)
            }
            return res.status(200).send(comments.res)
        }
        catch(err){
            console.log(err);
            next(err)
        }
    }

    async deleteComment(req,res,next){
        try{
            const commentId=req.params.commentId;
            const userId=req.userId;
            const comments=await this.commentRepository.deleteComment(commentId,userId)
            if(!comments.success){
                return res.status(400).send(comments.msg)
            }
            return res.status(200).send(comments.res)
        }
        catch(err){
            console.log(err);
            next(err)
        }
    }
}