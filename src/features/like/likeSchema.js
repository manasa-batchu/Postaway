import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post'
    // },
    // commentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }
    postCommentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    on_model: { type: String, required: true, enum: ['Post', 'Comment'] }
}, {
    timestamps: true
});

const LikeModel = mongoose.model('Like', likeSchema);
export default LikeModel;
