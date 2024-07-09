import express from 'express';
import postController from './postController.js';
import { upload } from '../../middleware/multer.js';

const postRouter=express.Router();
const postcontroller=new postController();

postRouter.post('/',upload.single('imageUrl'),(req,res,next)=>{
    postcontroller.addpost(req,res,next)
});

postRouter.get('/',(req,res,next)=>{
    postcontroller.getPostsByUserId(req,res,next)
})

postRouter.get('/all',(req,res,next)=>{
    postcontroller.getallPosts(req,res,next)
})

postRouter.get('/:postId',(req,res,next)=>{
    postcontroller.getPostById(req,res,next)
})

postRouter.put('/:postId',upload.single('imageUrl'),(req,res,next)=>{
    postcontroller.updatePostById(req,res,next)
})

postRouter.delete('/:postId',(req,res,next)=>{
    postcontroller.deletePostById(req,res,next)
})


export default postRouter;