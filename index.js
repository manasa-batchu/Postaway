import express from 'express';
import { connectToMongoose } from './src/config/mongooseConfig.js';
import userAuthRouter from './src/features/user/userAuthentication/userRoutes.js';
import mongoose from 'mongoose';
import { ApplicationError } from './src/errorHandler/errorHandler.js';
import postRouter from './src/features/post/postRoutes.js';
import jwAuth from './src/middleware/jwtMiddleware.js';
import cookieParser from 'cookie-parser';
import commentRouter from './src/features/comment/commentRoutes.js';
import likeRouter from './src/features/like/likeRouter.js';
import userProfileRouter from './src/features/user/userProfile/userProfileRoutes.js';
import friendRequest from './src/features/friendship/friendshipRoutes.js';
import otpRouter from './src/features/otp/otpRoutes.js';
import loggerMiddleware from './src/middleware/loggerMiddleware.js';

const app=express();
app.use(cookieParser());
app.use(express.json());


app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userAuthRouter)
app.use('/api/users',userProfileRouter)
app.use('/api/posts',jwAuth,postRouter)
app.use('/api/comments',jwAuth,commentRouter)
app.use('/api/likes',jwAuth,likeRouter)
app.use('/api/friends',jwAuth,friendRequest)
app.use('/api/otp',jwAuth,otpRouter)

app.use((err,req,res,next)=>{
   if(err instanceof mongoose.Error.ValidationError){
      return res.status(400).send(err.message);
   }
   if(err instanceof ApplicationError){
      return res.status(err.code).send(err.message)
   }

   res.status(500).send('Something went wrong')
})
 
app.listen(8000,()=>{
   connectToMongoose()
})