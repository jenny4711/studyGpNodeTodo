const authController={}
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
authController.authenticate = (req, res,next) => {
  try{
    const tokenString = req.headers.authorization
    if(!tokenString) throw new Error('No token provided');
    const token = tokenString.split(' ')[1];
    jwt.verify(token,JWT_SECRET_KEY,(error,payload)=>{
      if(error) throw new Error('Invalid token');
      console.log(payload,'payload!!!!!!!!!')
      req.userId = payload._id;
     next();
    
    });



  }catch(error){
    res.status(400).json({status:'fail-authenticate',message:error.message});
  }
}

module.exports = authController;