
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const userauth = async (req, res, next) => {
  //read a token from the cookie
  try {
      const cookie = req.cookies;
  const {token} = cookie;
    if(!token){
       throw new Error("its invalid token");
    }
  
  //validate the user
  const decodedmessage = await jwt.verify(token,"secretkey");
  const {_id} = decodedmessage;
 
  //find the user id and the user
   const user = await User.findById(_id );
   if(!user){
     throw new Error("user not found");
   }
  else{
    req.user = user;
    next();
  }
    
  } catch (error) {
    res.status(400).send("error is"+error.message)
  }
};
