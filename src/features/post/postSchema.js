import mongoose from 'mongoose';


const postSchema=new mongoose.Schema({
    imageUrl:{type:String,required:true},
    caption:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
})

const postModel=mongoose.model('Post',postSchema);
export default postModel;