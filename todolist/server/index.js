const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv= require("dotenv").config();
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes")



//dn connect 
mongoose.connect(process.env.MONGO_DB_URL)
    .then((res)=>{console.log("db is connected succeddfully")})
    .catch((err)=>{console.log(err)})

//



//middlewar
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/todo",todoRoutes)
app.get("/",(req,res)=>{
    console.log("hi")
    res.send("hello");
    
})





const PORT = process.env.PORT||8000

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})