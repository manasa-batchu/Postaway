import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    otp :{type:String,required:true},
    expiresAt:{type:Date,required:true,expires:0}
});

const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;
