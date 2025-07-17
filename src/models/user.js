import mongoose from "mongoose";

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
  },
  password: {
    type: String,
    required:true,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

 export const User = mongoose.model("User",userSchema);

