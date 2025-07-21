const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender about skills photoUrl"

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "gender",
      "about",
      "skills",
    ]);

    if (!connectionRequests) {
      throw new Error("no requests exists");
    }

    res.json({
      message: "data fetched sucessfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.send("error is" + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {toUserId: loggedInUser._id},
        
        {fromUserId:loggedInUser._id},

     ],
      status: "accepted",
    }).populate("fromUserId",USER_SAFE_DATA ).populate("toUserId",USER_SAFE_DATA );

    const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
            return row.toUserId;
        }
        else{
            return row.fromUserId;
        }
    });

    if (!connectionRequests) {
      throw new Error("no connection exists");
    }

    res.json({
      message: "data fetched sucessfully",
      data
    });
  } catch (error) {
    res.send("error is" + error.message);
  }
});

module.exports = userRouter;
