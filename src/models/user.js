import mongoose from "mongoose";
import validator from "validator";

const userSchema =new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address"+value);
      }
    }
  },
  password: {
    type: String,
    required:true,
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("noot valid gender");
      }
    }

  },
  photoUrl:{
    default:"https::weoifhoie2hf",
    type:String,
  },
  about:{
    type:String,
    default:"hey hai bros",
    
  },
  skills:{
  type:[String],
  }

},{timestamps:true});

// userSchema.methods.getJWT = async function (){
//   const user = this;

//   const token = await jwt.sign({_id:user._id},"secretkey",{expiresIn:"1d"})
//   return token;
// }

 export const User = mongoose.model("User",userSchema);

