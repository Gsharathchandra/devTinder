
import express from "express"; 
import { userauth } from "./middleware/auth.js"; // ✅ Make sure this path and file exist
import { connectDB } from "./config/database.js";
const app = express();
import { User } from "./models/user.js";
app.use(express.json());
import bcrypt from "bcrypt";

//get all the users from the database with particular email
app.get("/user",async(req,res)=>{
  const useremail = req.body.emailId;

  try {
    const users = await User.findOne({emailId:useremail})
    if(users.length === 0){
      res.send("no user found bro");
    }
    else{
      res.send(users);
    }
  } catch (error) {
    res.send("cant find the user");
  }

})


//fetch all the users
app.get("/feed",async(req,res)=>{
  try {
    const users = await User.find({})
   
      res.send(users);
    
  } 
  catch (error) {
    res.send("cant find the users bro");
  }

})


//delete a user
app.delete("/user",async (req,res)=>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("deleted bro");
  } catch (error) {
    res.send("cant delete bro");
  }
})


// post users into the database
app.post("/signup", async (req,res)=>{

  
  try {
    const{password,firstName,lastName,emailId} = req.body;
  const hashedpassword = await bcrypt.hash(password,10);
  //console.log(hashedpassword);
  
 
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:hashedpassword,
  });
    await user.save();
  res.send("user added sucessfully")
    
  } catch (err) {
    res.status(400).send("something went bad"+err.message);
  }
  
})

//update the data of the user
app.patch("/update",async(req,res)=>{
  
  const userId = req.body.userId;
  const data = req.body
  try {
    const user =await User.findByIdAndUpdate(userId,data,{runValidators:true,});
    //const user =await User.findByIdAndUpdate({_id:userId},data);
    console.log("sucessfully updated");
    res.send(user);
  } catch (err) {
    res.send("cant update bro"+err.message);
  }
})

connectDB().then(()=>{
    console.log("database has been connected");
    app.listen(3000, () => {
  console.log("sucessfully running on port 3000"); // 🟡 Spelling mistake: consider changing to "Successfully running"
});
}).catch((err)=>{
    console.log("database cannot be connected");
});




// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("something went wrong");
//     }
// })

// // ✅ Route 1
// app.get(
//   "/user/modifydata", userauth, // ✅ Middleware is applied correctly
//   (req, res, next) => {          // 🟡 `next` is not used → should be removed
//     res.send("hello i can modify"); 
//     // 🟥 ERROR: `res.send` ends the response; do not call `next()` after this
//   }
// );

// // ✅ Route 2
// app.delete(
//   "/user/deletedata", userauth,  // ✅ Same as above
//   (req, res, next) => {          // 🟡 Again, `next` is unused → remove it
//     res.send("hello i can delete");
//   }
// );



//route  handler middleware response handler

//query
// app.get("/query",(req,res)=>{
//     console.log(req.query);
//     res.send({
//         firstname:"sharath",
//         lastname:"gumastha"
//     })
// })
//params
// app.get("/user/:userid/:name",(req,res)=>{
//     console.log(req.params);
//     res.send({
//         firstname:"sharath",
//         lastname:"gumastha"
//     })
// })

// app.use("/hello",(req,res)=>{
//     res.send("hello from the server ");
// })
