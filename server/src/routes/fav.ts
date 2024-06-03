import { prisma } from '../app.js';
import { Prisma } from '@prisma/client';
import { Request , Response } from 'express';


export const addtofav = async (req:Request,res:Response):Promise<void> =>{

    const id = req.body.id as string | undefined;
    const uid: number | null = id ? parseInt(id, 10): null;
    const videoid = req.body.vid as string | undefined;
    const vid : number | null = videoid ? parseInt(videoid , 10) : null;
    
  
    console.log(`this is the videoid ${vid}`)
    console.log(uid);
  
    if (uid === null || isNaN(uid)) {
       res.status(400).json({ error: 'Invalid user ID' });
       return;
    }
    if(vid === null){
      res.status(400).json({ error: 'Invalid user vid' });
      return;
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: uid }
    });
    console.log(user); 
    const favourites: number[] = Array.isArray(user?.favourites)
    ? (user?.favourites as number[])
    : [];
  if (favourites.includes(vid)) {
    res.status(400).json({ error: 'Video already in favourites' });
    return;
  }
  let updatedFavourites;
  if(favourites.length > 0){
     updatedFavourites = [...favourites , vid]
  }else{
    updatedFavourites = [vid]
  }
  const dbUpdate = await prisma.user.update({
  where: {id : uid},
  data: {favourites : updatedFavourites as Prisma.JsonArray}
  })
  res.status(200).json('add tof avourite ')
  } catch (error) {
      res.status(500).json(`An error occured ${error}`)
    }
  }

export const getFav = async (req:Request,res:Response):Promise<void>=>{
    const id = req.headers['id'] as string | undefined;
    const uid: number | null = id ? parseInt(id, 10) : null;
  
    console.log(uid);
    if (uid === null || isNaN(uid)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    if(!id){
      res.status(500).json('Id is required')
    }
    try {
      const user= await prisma.user.findUnique({
        where: { id: uid }
      });
      if (!user) {
         res.status(404).json({ error: 'User not found' });
         return;
      }
      const favourties = user.favourites as number[]
      if(!Array.isArray(favourties) || favourties.some(isNaN)){
        res.json('favourites array has problems')
        return;
      }
     const favouriteVideos = await prisma.video.findMany({
      where:  {
        id : { 
          in : favourties
        }
      }
     })

    console.log(favouriteVideos)
    res.json({ message: 'Request from fav received', favouriteVideos });
      
    } catch (error) {
      res.status(500).json(`An error occured ${error}`)
    }
  }