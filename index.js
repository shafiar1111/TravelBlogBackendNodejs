const express=require('express');
const dotenv=require('dotenv').config({path:'./config.env'});
const cors=require('cors');
const connect=require('./database/database.js');
const register=require('./views/register.js');
const cookieParser=require('cookie-parser');

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:`http://localhost:3000`,
    credentials:true,
}));



app.use("/",register);

//Connect the database;
connect();

app.listen(process.env.PORT,()=>`Connection established on port ${process.env.PORT}`);

