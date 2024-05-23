const userController={};
const User = require('../model/User');
const bcrypt = require('bcryptjs');


userController.signup = async (req, res) => {
  try{
    const { name,email, password } = req.body;
    
    const user = await User.findOne({email: email});
  
    if(user) throw new Error('User already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      const newUser= new User({
        name,
        email,
        password: hashedPassword
      });
      await newUser.save();
      const token = await newUser.generateToken();
      res.status(200).json({status:'success-signup',newUser,token});

      

    

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

userController.getUser=async(req,res) =>{
  try{
    const {userId}=req
    const user = User.findById(userId)
    if(!user)throw new Error('User not found')
    res.status(200).json({status:'success-getUser',user})
  }catch(error){}
}


module.exports = userController;