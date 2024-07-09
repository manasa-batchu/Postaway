import express from 'express';
import likeController from './likeController.js';

const likecontroller=new likeController();
const likeRouter=express.Router();

likeRouter.get('/:id',(req,res,next)=>likecontroller.getLikes(req,res,next))
likeRouter.get('/toggle/:id',(req,res,next)=>likecontroller.toggleLikes(req,res,next))


export default likeRouter;