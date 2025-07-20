const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
try {
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

if(fromUserId ==  toUserId){
     throw new Error("the fromuserid and touser are same");
}

const toUser = await User.findById(toUserId);
if(!toUser){
    throw new Error("the touser doesnt exist");
}
const allowedStatus = ["ignored","intrested"];
if(!allowedStatus.includes(status)){
    return res.status(400).json({
        message : "invalid status type"+status
    })
}

const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ]
})
if(existingConnectionRequest){
    res.send("request already exists");
}


const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
})

const data = await connectionRequest.save();
res.json({
    message:req.user.firstName+" is "+status+" in "+toUser.firstName,
    data

})

    
} catch (error) {
    res.send("the error messqage is"+error.message);
}
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params.status;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
          return res.status(400).json({message:"status not allowed"});
        }
        
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"intrested"

        })
        if(!connectionRequest){
            return res.status(400).json({message:"connection request not found"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
         res.json({message:"connection request is"+status,data});
        
        
    } catch (error) {
        res.send("the error is"+error.message)
    }
})

 module.exports = requestRouter;