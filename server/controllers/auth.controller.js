import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { customError } from '../utils/error.js';

export const signup = async(req,res,next)=>{
    const {username, email, password} = req.body;

    if(!username || !password || !email || username == '' || email == '' || password == ''){
        next(customError(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync('password', 10);

    const newUser = User({
        username,
        email,
        password : hashedPassword
    })
    try{
        await newUser.save();
        res.json("Signup successfull")
    }
    catch(error){
        next(error);
    }
}