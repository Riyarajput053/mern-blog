import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/techBlog')
.then(()=>{ 
    console.log("database is connected")
})
.catch ((err)=>{
    console.log(err);
})

app.listen(5000, ()=>{
    console.log('Server is running on port 5000 !!');
});
    

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})


