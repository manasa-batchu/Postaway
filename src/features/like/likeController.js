import likeRepository from "./likeRepository.js";

export default class likeController{
    constructor(){
        this.likeRepository=new likeRepository()
    }
    async getLikes(req,res,next){
        const { id } = req.params;

        try {
            const likes = await this.likeRepository.getLikes(id);
            if(likes.length>0){
                return res.status(200).send(likes);
            }else{
                return res.status(400).send('Likes not found');
            }
           
        }catch(err){
            console.log(err);
            next(err)
        }
    }
    async toggleLikes(req,res,next){
        const { id } = req.params;
        const userId = req.userId;
        const {type}= req.query;
        try{
            const likes = await this.likeRepository.toggleLikes(id,userId,type);
            if(likes){
                if(likes.success == true){
                    return res.status(200).send(likes.message);
                }else{
                    return res.status(400).send(likes.message);
                }
                
            }else{
                return res.status(400).send('Likes not found');
            }
        }catch(err){
            console.log(err);
            next(err)
        }
    }
}






