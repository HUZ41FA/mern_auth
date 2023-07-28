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
        res.status(401);
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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message:"User Logged Out"})
});

const getUserProfile = asyncHandler(async(req, res)=>{
    const data = {
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email,
    }
    res.status(200).json({user: data})
});

const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            name : updatedUser.name,
            email : updatedUser.email,
        })

    }else{
        res.status(404)
        throw new Error("User not found");
    }


});

export {
    authUser,
    registerNewUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}