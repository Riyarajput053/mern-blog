import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async(req,res)=>{
    const {username, email, password} = req.body;

    if(!username || !password || !email || username == '' || email == '' || password == ''){
        res.status(400).json({message:"All field are required !!"});
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
        res.status(500).json({message: error.message})
    }
}