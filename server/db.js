const mongoose=require('mongoose');
require('dotenv').config();
const DB=process.env.DB;

mongoose.connect(DB)
.then(()=>console.log('Connected to database'))
.catch((e)=>console.log('Error while connecting to database '+e))