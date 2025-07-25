
// const express = require("express");
// const connectDB = require("./config/database");
// const app = express();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// app.use(cors({
//   origin: "http://localhost:5173", // or "*" for development
//   credentials: true,               // allow cookies/credentials
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // important!
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());//completed 
// app.use(cookieParser());

// const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile");
// const requestRouter = require("./routes/request");
// const userRouter = require("./routes/user");

// app.use("/",authRouter);
// app.use("/",profileRouter);
// app.use("/",requestRouter);
// app.use("/",userRouter);





// connectDB().then(()=>{
//     console.log("database has been connected");
//     app.listen(3000, () => {
//   console.log("sucessfully running on port 3000"); // 🟡 Spelling mistake: consider changing to "Successfully running"
// });
// }).catch((err)=>{
//     console.log("database cannot be connected");
// });



// grok
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Explicitly handle preflight requests
// app.options("*", cors());

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Test route
app.get("/test", (req, res) => res.json({ message: "Server is up" }));

connectDB()
    .then(() => {
        console.log("Database has been connected");
        app.listen(3000, () => {
            console.log("Successfully running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected:", err);
    });
