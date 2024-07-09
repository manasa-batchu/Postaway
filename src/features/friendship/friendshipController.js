
import friendRequests from "./friendshipRep.js";


export default class friendController{
    constructor(){
        this.friendRequest=new friendRequests()
    }
    async getFriends(req,res,next){
        try{
            const userId=req.params.userId;
            const friends=await this.friendRequest.getFriends(userId)
            if(friends.length>0){
                return res.status(200).send(friends)
            }else{
                return res.status(400).send('No friends')
            }

        }catch(err){
            console.log(err);
            next(err)
        }
    }
    async getPendingRequests(req,res,next){
        try{
            const userId=req.userId;
            const pendingRequests=await this.friendRequest.getPendingRequests(userId)
            if(pendingRequests.length>0){
                return res.status(200).send(pendingRequests)
            }else{
                return res.status(400).send('No pending Requests')
            }
        }catch(err){
            console.log(err);
            next(err)
        }
    }
    async toggleFriendship(req,res,next){
        try{
            const userId=req.userId;
            const friendId=req.params.friendId;
            const result=await this.friendRequest.toggleFriendship(userId,friendId)
            if(result.success){
                return res.status(200).send(result.msg)
            }else{
                return res.status(400).send(result.msg)
            }
        }catch(err){
            console.log(err);
            next(err)
        }

    }
    async acceptRejectFriendship(req,res,next){
        try{
            const userId=req.userId;
            const friendId=req.params.friendId;
            const action=req.query.action;
            const result=await this.friendRequest.acceptRejectFriendship(userId,friendId,action)
            if(result.success){
                return res.status(200).send(result.msg)
            }else{
                return res.status(400).send(result.msg)
            }
        }catch(err){
            console.log(err);
            next(err)
        }

    }
}