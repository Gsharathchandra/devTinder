
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // or "*" for development
  credentials: true,               // allow cookies/credentials
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // important!
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());//completed 
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);





connectDB().then(()=>{
    console.log("database has been connected");
    app.listen(3000, () => {
  console.log("sucessfully running on port 3000"); // 🟡 Spelling mistake: consider changing to "Successfully running"
});
}).catch((err)=>{
    console.log("database cannot be connected");
});




