import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    content:{
        type:String,required:[true,'Content is required']
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const commentModel=mongoose.model('Comment',commentSchema)
export default commentModel;