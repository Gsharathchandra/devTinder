const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
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
            values:["ignore","intrested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{timestamps:true})

connectionRequestSchema.pre("save",function (){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("from and to cant be the same");
    }
    next();
})


const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;