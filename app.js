const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter=require('./routes/index');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo',indexRouter);
const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch((err)=>console.log('DB connection fail',err));


app.listen(process.envPORT || 5000,()=>{
    console.log('Server is running on port 5000');
})


