
import { ApplicationError } from "../../errorHandler/errorHandler.js";
import UserModel from "../user/userSchema.js";


export default class friendRequests{
    async getFriends(userId){
        try{
            const userDetails=await UserModel.findById(userId).populate('friends','id name email');
            return userDetails.friends;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async getPendingRequests(userId){
        try{
            const userDetails=await UserModel.findById(userId).populate('pendingRequests','id name email');
            return userDetails.pendingRequests;
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }
    async toggleFriendship(userId,friendId){
        try{
            const user=await UserModel.findById(userId);
            const friend=await UserModel.findById(friendId)
           
            if (!user) {
                return { success: false, msg: 'User not found' };
            }
            if (!friend) {
                return { success: false, msg: 'Friend not found' };
            }

            if (user.pendingRequests.includes(friendId) || user.friends.includes(friendId)) {
                return { success: false, msg: 'Friend request already sent or already friends' };
            }

            user.pendingRequests.push(friendId);

            await user.save();

            return {success:true, msg: 'Friend Request sent' };
           
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async acceptRejectFriendship(userId,friendId,action){
        try{
            const user=await UserModel.findById(userId);
            const friend=await UserModel.findById(friendId);


            if (!user) {
                return { success: false, msg: 'User not found' };
            }
            if (!friend) {
                return { success: false, msg: 'Friend not found' };
            }

            if(action === 'accept'){
                user.friends.push(friendId);
                friend.friends.push(userId)
                user.pendingRequests.pull(friendId)
            }else if(action === 'reject'){
                user.pendingRequests.pull(friendId)
            }else{
                return {success:false,msg:'Invalid action type'}
            }

            await user.save();
            await friend.save();

            return {success:true, msg: `Friendship Request ${action}ed` };
           
        }catch(err){
            console.log(err)
            throw new ApplicationError("Something went wrong with database", 500); 
        }
    }
}