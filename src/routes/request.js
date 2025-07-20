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
    message:"sucessfull connection request",
    data

})

    
} catch (error) {
    res.send("the error messqage is"+error.message);
}
})

 module.exports = requestRouter;