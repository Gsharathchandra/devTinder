const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
     toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum :{
            values:["ignored","intrested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{timestamps:true})


connectionRequestSchema.index({fromUserId:1,toUserId:1});

// connectionRequestSchema.pre("save",function (){
//     const connectionRequest = this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error("from and to cant be the same");
//     }
//     next();
// })


const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;