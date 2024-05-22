
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema=Schema({
    task:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,
        required:true,
        default:'general'
    }
},{timestamps:true});
todoSchema.methods.toJSON = function(){
  const obj = this._doc;
  delete obj.__v;
  return obj;
}
const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;