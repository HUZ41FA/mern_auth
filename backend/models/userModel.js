import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name : {
        type:String, 
        required:true
    },

    email : {
        type : String,
        required: true,
        unique: true,
    },

    password : {
        type : String,
        required : true,
    }

}, {
    timestamps: true,
})

// We are not using arrow functions because we will be using the "this" keyword
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(16);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function(rawPassword){
    return await bcrypt.compare(rawPassword, this.password);
}

const User = mongoose.model('user',userSchema);

export default User;