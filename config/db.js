 const mongoose = require('mongoose')
 const url =process.env.DB_URI

 mongoose.connect(url,{
   dbName:"auth"
 })
 .then((res)=>{
    console.log(" mongoose connected...")
 })
 .catch((err)=>{

    console.log("Error in mongoose connect",err)

 })