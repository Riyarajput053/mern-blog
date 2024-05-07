import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/techBlog')
.then(()=>{ 
    console.log("database is connected")
})
.catch ((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000 !!');
});
    

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


