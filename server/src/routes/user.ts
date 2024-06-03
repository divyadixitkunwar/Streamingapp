import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../app.js';
import { Request, Response } from 'express';


const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
} 

export const userLogin = async(req:Request, res:Response):Promise<void>=>{
  
    const name:string = req.body.name;
    const password:string = req.body.password;

    if(!name || !password){
    res.status(400).json('Name and Password are required')
    return;
    }
    
   try {
    const user = await prisma.user.findFirst({
      where: {name}
    })
    if(!user){
      res.status(500).json('user not found')
      return
    }
    const userPassword = user?.password
    const passwordValid = bcrypt.compareSync(password , userPassword)
    if(!passwordValid){
      res.status(500).json('wrong password')
      return
    }
    console.log(user)
    console.log(passwordValid)
    const token = jwt.sign(password , SECRET_KEY)
  
    res.json({token,user})
    
   } catch (error) {
    res.status(500).json(`An error occured ${error}`)
   } 
  }


export const userSignUp = async (req:Request,res:Response):Promise<void>=>{

  try {
    const password = await bcrypt.hash(req.body.userPassword , 8);
    console.log(req.body)
    const newUser = await prisma.user.create({
      data:{
        name : req.body.userName,
        email : req.body.userEmail,
        password : password
      }
    })
    res.status(200).json('signed up')
    
  } catch (error) {
    res.status(500).json(`An error occured ${error}`)  
  }
  }