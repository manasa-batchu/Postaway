import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url=process.env.DB_URL;


export const connectToMongoose=async()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('MongoDB Connected with mongoose')
    }catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }

}