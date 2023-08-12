const mongoose = require("mongoose");


const ConnectDB =async()=>{
  try {
     await mongoose.connect(process.env.DATABASE_URL,()=>{
        console.log('databse connected');
    })
  } catch (error) {
    console.log(error);
  }
}
module.exports = ConnectDB;