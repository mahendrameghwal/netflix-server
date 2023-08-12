// routes.js
const express = require("express");
const router = express.Router();
const Usermodel = require("./model/UserModel");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (name && email && password) {
        const EXistUser = await Usermodel.findOne({ email: email.toLowerCase() });
        const ExistUserName = await Usermodel.findOne({
          name: name.toLowerCase(),
        });
        if (EXistUser) {
          res.send({ success: false, message: "User Already exist" });
        } else if (ExistUserName) {
          res.send({ success: false, message: "username already taken try other..!!"  });
        } else {
          const newUser = await Usermodel.create({  name: name,email: email, password: password});
          res.send({  success: true,  message: "signup successfully",  data: newUser });
        }
      } else {
        res.send({ success: false, message: "All fields are required..!!" });
      }
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email&& password) {
        const IsAlreadyUser = await Usermodel.findOne({ email: email.toLowerCase().trim()});
        
        if(IsAlreadyUser){
          
          if (password === IsAlreadyUser.password) {
            
            const token = jwt.sign(
              { email:email},
              process.env.SECERET_KEY,
              {
                expiresIn: "2h",
              }
            );
          
         res.send({ token,  success: true,   message: "loggedin Sucessfully", data: IsAlreadyUser, })
          } 
       else { 
         res.send({ success: false, message: "Password not match" }) 
          }
        }
        else{
          res.send({ success: false, message: "user not found" });
  
      }
      } else  {
        res.send({ success: false, message: "all fields required" });
      }
    } catch (error) {
      res.send({ success: false, message: error.message});
  
    }
});

router.get("/", async (req, res) => {
    const alldata =await Usermodel.find()
    res.send({data:alldata});

});

module.exports = router;
