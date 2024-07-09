import bcrypt from 'bcrypt'
import otpRepository from "./otpRepository.js";

export default class otpController{
    constructor(){
        this.otpRepository=new otpRepository()
    }
    async sendOtp(req,res,next){
        const { email } = req.body;
        try {
            const otp = await this.otpRepository.sendOtp(email);
            return res.status(200).json({"otp":otp});
        }catch(err){
            console.log(err);
            next(err)
        }
    }
    async verifyOtp(req,res,next){
        try{
            const { email,otp } = req.body;
            try {
                const result= await this.otpRepository.verifyotp(email,otp);
                if(result){
                    return res.status(200).send('Valid otp');
                   
                }else{
                    return res.status(400).send('Invalid otp');
                }
                
            }catch(err){
                console.log(err);
                next(err)
            }
           
        }catch(err){
            console.log(err);
            next(err)
        }
    }

    async resetPassword (req, res,next){
        try {
            const { newPassword ,otp} = req.body;
            const userId=req.userId;

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const result=await this.otpRepository.resetPassword(userId,hashedPassword,otp)
            if(result.success){
                return res.status(200).json({ success: true, message: result.msg });
            }
            return res.status(400).json({ success: false, message: result.msg});
        } catch (err) {
            console.log(err);
            next(err)
        }
    };
}






