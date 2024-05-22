
const express = require('express');
const router = express.Router();
const todoApi = require('./todo.api');
const userApi = require('./user.api');
router.use('/tasks',todoApi);
router.use('/users',userApi);





module.exports = router;