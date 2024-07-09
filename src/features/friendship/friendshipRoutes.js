import express from 'express';
import friendController from './friendshipController.js';



const friendcontroller=new friendController();
const friendRequest=express.Router();

friendRequest.get('/get-friends/:userId',(req,res,next)=>{friendcontroller.getFriends(req,res,next)});
friendRequest.get('/get-pending-requests',(req,res,next)=>{friendcontroller.getPendingRequests(req,res,next)});
friendRequest.get('/toggle-friendship/:friendId',(req,res,next)=>{friendcontroller.toggleFriendship(req,res,next)});
friendRequest.get('/response-to-request/:friendId',(req,res,next)=>{friendcontroller.acceptRejectFriendship(req,res,next)});

export default friendRequest;
