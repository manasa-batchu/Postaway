import express from 'express';
import commentController from './commentController.js';

const commentRouter=express.Router();
const commentcontroller=new commentController();

commentRouter.get('/:postId',(req,res,next)=>commentcontroller.getCommentsByPost(req,res,next))
commentRouter.post('/:postId',(req,res,next)=>commentcontroller.addCommentByPost(req,res,next))
commentRouter.put('/:commentId',(req,res,next)=>commentcontroller.updateCommentById(req,res,next))
commentRouter.delete('/:commentId',(req,res,next)=>commentcontroller.deleteComment(req,res,next))



export default commentRouter;