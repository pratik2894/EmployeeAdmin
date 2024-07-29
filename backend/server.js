import dotenv from 'dotenv';
import express from 'express'
import cookieParser from 'cookie-parser';
import Database from './db/db.js';
import app from './app.js';
import isAuthenticated from './middleware/Auth.js';

dotenv.config();

app.listen(process.env.PORT , ()=>{
    console.log(`app is listening on port: ${process.env.PORT}`)
})

Database();