const userController={};
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userController.signup = async (req, res) => {
  try{
    const { name,email, password } = req.body;
    
    const user = await User.findOne({email: email});
  
    if(user) throw new Error('User already exists');
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      const newUser= new User({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();
      res.status(200).json({status:'success-signup',newUser});

      

    

  }catch(error){
    res.status(400).json({status:'fail-signup',message:error.message});
  }
}

userController.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user)throw new Error('Please signup first!');
    const checkPwd = await bcrypt.compareSync(password,user.password);
    if(!checkPwd)throw new Error('Invalid password');
    const token = await user.generateToken();
    return res.status(200).json({status:'success-login',user,token});
  }catch(error){
    res.status(400).json({status:'fail-login',message:error.message});
  }
}

module.exports = userController;