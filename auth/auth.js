const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader && authHeader.split(" ")[1];
 
  if (!token) {
    res.json({sucess: false, message: "unauthorized token provided"});
  } else {
    jwt.verify(token, process.env.SECERET_KEY, (err, decoded) => {
      if (err) {
        res.json({ error: err.message });
      } else {
  
        next();
      }
    });
  }
};

module.exports = authenticateUser;
