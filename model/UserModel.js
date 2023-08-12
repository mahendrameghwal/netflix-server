const  mongoose  = require("mongoose");

const UserSchema =  mongoose.Schema({
    name:String,
    email:String,
    password:String
    

})
const Usermodel = mongoose.model("Users",UserSchema);
module.exports= Usermodel;