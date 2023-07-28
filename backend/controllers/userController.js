import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(200).json({
            _id : user._id,
            email : user.email
        })
    }else{
        res.status(403);
        throw new Error("Invalid email or password")
    }

});

const registerNewUser = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email:email})

    if(userExists != null){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email
        });
    }else{
        res.status(400)
        throw new Error("Invalid User Data");
    }
});

const logoutUser = asyncHandler(async(req, res)=>{
    res.status(200).json({success:true, message:"User Logged Out"})
});

const getUserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({success:true, message:"User Profile"})
});

const updateUserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({success:true, message:"User Profile Updated"})
});

export {
    authUser,
    registerNewUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}