import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected with DB: ${conn.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;