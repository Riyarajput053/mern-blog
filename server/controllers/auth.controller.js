import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { customError } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async(req,res,next)=>{
    const {username, email, password} = req.body;

    if(!username || !password || !email || username == '' || email == '' || password == ''){
        next(customError(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

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

export const signin = async(req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(customError(400,'All fields are required!'));
    }

    try{
    const validUser = await User.findOne({email});
    if(!validUser){
        return next(customError(400,'Invalid email'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if(!validPassword){
        return next(customError(400,'Invalid password'));
    }

    const token = jwt.sign({
        id:validUser._id
    }, process.env.JWT_SECRET)

    const {password:pass, ...rest} = validUser._doc

    res.status(200).cookie('access_token',token ,{
        httpOnly:true,
    }).json(rest)

}
catch(error){
    next(error);
}
}