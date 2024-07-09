import jwt from "jsonwebtoken";


function jwAuth(req,res,next){
    
    // const token=req.headers['Authorization']
    const {jwtToken}=req.cookies;
    if(!jwtToken){
        return res.status(401).send('Unauthorized !login to continue!');
    }
    try{
        const payload=jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.userId=payload.userId;
    }catch(err){
        if (!jwtToken) {
            return res.status(401).send('Unauthorized !login to continue!');
          }
    }
    next()
}

export default jwAuth;