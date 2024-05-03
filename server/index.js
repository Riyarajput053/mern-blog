import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/User')
.then(()=>{
    console.log("database is connected")
})
.catch ((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000 !!');
})