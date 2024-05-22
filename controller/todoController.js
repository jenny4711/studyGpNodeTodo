const todoController={}
const Todo=require('../model/Todo')
todoController.addTodo=async(req,res)=>{
  try{
    const {task,isCompleted,category}=req.body;
    const newTodo=new Todo({
      task,
      isCompleted,
      category
    })
    await newTodo.save();
    res.status(200).json({status:'success',newTodo})
  }catch(error){
    res.status(500).json({status:'fail',message:error.message})
  }
}

todoController.getTodo=async(req,res)=>{
  try{
    const todos=await Todo.find({});
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
    console.log(isComplete)
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