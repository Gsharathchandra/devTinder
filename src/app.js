
import express from "express"; 
import { userauth } from "./middleware/auth.js"; // ✅ Make sure this path and file exist
import { connectDB } from "./config/database.js";
const app = express();

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
