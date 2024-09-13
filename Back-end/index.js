import express from'express';
import router from './routes/index.js';
import cors from 'cors';
import connection from './config/db.js';
import cookieParser from 'cookie-parser';

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });


const Port = process.env.PORT
const app=express()


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname,"dist")))



app.use('/',router)



connection().then(() => {

    app.listen(Port, () => console.log(`server is listen on Port ${Port}`))
})
.catch(err=>console.log(err.message))


