import mongoose from "mongoose";


export const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minLength:[3,'Name should be atleast 3 Characters']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        // validate: {
        //     validator: function (value){
        //         console.log(`Password validation for "${value}"`);
        //         return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
        //     },
        //     message:"Password should be between 8-12 charachetrs and have a special character"
        // }
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:[true,'Gender is required. It must be either Male or Female or Other']
    },
    avatar:{type:String},
    friends:[{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }],
    pendingRequests:[{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }],
    loginTokens: [{ type: String }]
})

const UserModel = mongoose.model('User',UserSchema);
export default UserModel;

