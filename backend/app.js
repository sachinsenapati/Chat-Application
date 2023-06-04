require('dotenv').config();
const express=require("express");
const connectDB=require("./config/db")
const { chats } = require("./data/data.js");
const userRoutes=require('./routes/userRoute')
const chatRoutes=require('./routes/chatRoute')
const messageRoutes=require('./routes/messageRoute')
const cors=require("cors")

connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is running");
})
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes);
app.use("/api/message", messageRoutes);

// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// })
// app.get('/api/chat/:id',(req,res)=>{
//     // console.log(req.params.id);

//     const singleChat=chats.find(c=>c._id==req.params.id)
//     res.send(singleChat);
// })

const PORT=process.env.PORT||8000;
app.listen(5000,console.log(`Server started on port ${PORT}`));