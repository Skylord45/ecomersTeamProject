//validation for all type of users for accesing the protected routes


import express from 'express';
const router = express();

export const demoMiddleware = async(req,res,next)=>{
    console.log("Middleware ");
    next()
}

//validation for all type of users for accesing the protected routes
