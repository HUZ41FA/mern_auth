import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next)=>{
    const token = req.cookies.jwt; // We are allowed to this because of the cookie-parser package

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch{
            res.status(401);
            throw new Error("Unauthorized, invalid token")
        }
    }else{
        res.status(401);
        throw new Error("Unauthorized, no token found")
    }
})


export default protect;