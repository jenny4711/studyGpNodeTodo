
const express = require('express');
const router = express.Router();
const todoApi = require('./todo.api');
router.use('/tasks',todoApi);





module.exports = router;