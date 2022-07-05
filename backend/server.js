require('dotenv').config();
const express= require("express");
const router= require("./routes");
const app=express();
const cors =require("cors");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(router);

app.listen(process.env.PORT, ()=> console.log("Listening on Port", process.env.PORT));

// app.listen(