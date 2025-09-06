import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import AuthRoute from './routes/AuthRoute.js';

const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());


app.use('/api/auth', AuthRoute);





app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});