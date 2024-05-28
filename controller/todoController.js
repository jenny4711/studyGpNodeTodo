const todoController={}
const Todo=require('../model/Todo')
const User=require('../model/User')
todoController.addTodo=async(req,res)=>{
  try{
    const {task,isCompleted,category,email}=req.body;
    const {userId}=req;
    if(!userId)throw new Error('User not authenticated')
    const newTodo= new Todo({
      task,
      isCompleted,
      category,
      userId ,
      email
    })
    console.log(newTodo,'newTodo!!!')
    await newTodo.save();
   
   
    res.status(200).json({status:'success',newTodo})
  }catch(error){
    console.log(error.message,'addTodofail')
    res.status(500).json({status:'fail',message:error.message})
  }
}

todoController.getTodo=async(req,res)=>{
  try{
    const {email}=req.params;
    const userId=req.userId;
    const todos= await Todo.find({email}).populate('userId');
    if(!todos)throw new Error('No todos list found')
      
    res.status(200).json({status:'success',todos})
  }catch(error){
    res.status(500).json({status:'fail',message:error.message})
  }
}

todoController.updateTodo=async(req,res)=>{
  try{
    const {id}=req.params;
    const {isComplete}=req.body;
   
    const updated = await Todo.findByIdAndUpdate(
      {_id:id},
      {isComplete},
     
      {new:true}
    );
    if(!updated)throw new Error('No todo found')
    res.status(200).json({status:'success',updated})


  }catch(error){
    res.status(400).json({status:'fail',message:error.message})
  }
}

todoController.deltedTodo=async(req,res)=>{
  try{
    const {id}=req.params;
    const deleted=await Todo.findByIdAndDelete({_id:id});
    res.status(200).json({status:'success',deleted})
}catch(error){
  res.status(400).json({status:'fail',message:error.message})
}
}
module.exports=todoController