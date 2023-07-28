import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const apiVersion = process.env.API_VERSION

connectDB();
const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use(cookieParser());

app.use(`/api/${apiVersion}/users`, userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{console.log(`Sever listening @ ${PORT}`)})

/*
POST => /api/users ------ Register a user
POST => /api/users/auth ------ Authenticate the user and get token
POST => /api/users/logout ----- Logout and clear the cookie
GET  => /api/users/profile ----- Get the user profile
PUT  => /api/users/profile ----- Update user profile
*/