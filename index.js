import express from "express"; 
import cors from "cors"; 
import multer from "multer";
import dotenv from "dotenv"
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import userRoute from "./routers/users.js"
import authRoute from "./routers/auth.js"
import postRoute from "./routers/post.js"
import path from "node:path"
const app = express();
dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    // Place your code that relies on the MongoDB connection here
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use (helmet());
// jo bhi chez hoti hai vo app.use se guzarti hai 

// share.jsx form work
const storage = multer.diskStorage({destination: (req, file, cb)=> {
  cb(null, "public/images");
},
filename: (req, file, cb) => {
  cb(null, file.originalname);
},})
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req,res)=>{
  try{
    return res.status(200).json("file uploaded successfully")
  }catch(err){
    console.log(err)
  }
} )
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
// server setup
const port = 4000;
app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`);
})
