import express from "express";
const app = express();
app.listen(3000,()=>{
    console.log("sucessfully runn");
});
app.use("/hello",(req,res)=>{
    res.send("hello from the server ");
})