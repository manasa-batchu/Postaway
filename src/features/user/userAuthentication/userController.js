import UserRepository from "./userRepository.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export default class UserController{

    constructor(){
        this.userRepository=new UserRepository();
    }

    async signup(req,res,next){
        try{
            const hashedPassword=await bcrypt.hash(req.body.password,12)
            
            const userDetails={
                name : req.body.name,
                email : req.body.email,
                password: hashedPassword,
                gender:req.body.gender
            }
            const result=await this.userRepository.signUp(userDetails)
            res.status(201).send(result)
        }catch(err){
            console.log(err)
            next(err)
        }
    
    }

   async signin(req,res,next){
        try{
            const {email,password}=req.body;
            const result=await this.userRepository.signIn(email,password)
            if(!result){
                return res.status(400).send('Incorrect Credentials');
            }
            else{
                const passwordResult=await bcrypt.compare(password,result.password);
                if(passwordResult){
                    const payload={userId:result._id,email:result.email}
                    const token=jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' })
                    await this.userRepository.updateLoginToken(result._id, token);
                    return res.cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true }).send({email:result.email,token:token})
                }else{
                    return res.status(400).send('Incorrect Credentials');
                }
            }

        }catch(err){
            console.log(err)
            next(err)
        }
    }
    
    async logout(req,res,next){
        try{
            res.clearCookie('jwtToken').send('Logout Succesful')
        }catch(err){
            next(err)
        }
    }
    
    async logout_all_devices(req,res,next){
        try{
            const userId = req.userId;
            const logoutResult = await this.userRepository.logout_All_Devices(userId);
            if (logoutResult) {
                res.clearCookie('jwtToken').send('Logout from all devices successful');
            } else {
                res.status(404).send('User not found');
            }
        }catch(err){
            next(err)
        }
    }
}


