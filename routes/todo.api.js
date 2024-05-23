const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const authController = require('../controller/authController');
router.post('/',authController.authenticate,todoController.addTodo)
router.get('/:email',todoController.getTodo)
router.put('/:id',todoController.updateTodo)
router.delete('/:id',todoController.deltedTodo)




module.exports = router;