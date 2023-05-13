require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userroutes}=require("./routes/user.route")
const { connection}=require("./config/db")
const cors=require("cors")
const app=express()
const {blogroute}=require("./routes/blog.route")

app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("WElCOME TO HOME PAGE OF BLOCG API")


})


app.use("/api",userroutes)
app.use("/api/blogs",blogroute)

app.listen(process.env.port,async()=>{
try {
    await connection;
    console.log("Conection Establish Sucsessfully ...")
} catch (error) {
    console.log(error)
    console.log("Unable To connect DB")
}



})