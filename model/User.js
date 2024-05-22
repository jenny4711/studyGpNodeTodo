const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const userSchema=Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
userSchema.methods.toJSON = function(){
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

userSchema.methods.generateToken =async function(){
  const token = jwt.sign({_id:this._id},JWT_SECRET_KEY,{expiresIn:'1d'});
  return token;
  

}

const User = mongoose.model('User',userSchema);
module.exports = User;