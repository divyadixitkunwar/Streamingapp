import express, { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const SECRET_KEY = 'messagingapp'

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}

export const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  console.log('verification started')
    const token = req.headers['token'] as string;
    console.log(`THIS IS THE TOKEN  ${token}`)
    if (!token) {
      console.log('error here ')
      res.status(403).send({ auth: false, message: 'No token provided.' });
      return;
    }
  
    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        console.log('this is where error is coming from')
        res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        return;
      }
      
      req.userId = (decoded as { id: number }).id;
      console.log('verification successfull')
      next();
    });
  }
