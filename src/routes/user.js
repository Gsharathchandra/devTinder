const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/recieved",userAuth,async (req,res)=>{
    try {
        const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"intrested",
    })
    if(!connectionRequests){
        throw new Error("no requests exists");
    }
    res.send(connectionRequests);

    } catch (error) {
        res.send("error is"+error.message)
    }

})

module.exports = userRouter;