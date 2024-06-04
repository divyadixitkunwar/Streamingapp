import { Prisma, PrismaClient } from '@prisma/client'
import { Request , Response } from 'express';
import { prisma } from '../app.js';
import bucket from '../firebase.config.js';
import multer from 'multer';


interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}


export const getVideo = async( req:Request ,res:Response):Promise<void>=>{
    try {
      const videoData = await prisma.video.findMany();
      res.json(videoData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching video data' });
    } 
  }

  export const uploadVideos = async (req: Request, res: Response): Promise<void> => {

    console.log('upload started')
    const name: string = req.body.name;
    const description: string = req.body.description;
    const video = (req as MulterRequest).files?.['video']?.[0];
    const thumbnail = (req as MulterRequest).files?.['thumbnail']?.[0];
  
    console.log(`This is the file name ${req.body.name}`);
    console.log(`This is the description ${req.body.description}`);
    console.log(`This is the video original name ${video?.originalname}`);
    console.log(`This is the thumbnail original name ${thumbnail?.originalname}`);
  
    if (!name || !description || !video) {
      res.status(400).json('name, description and filename required');
      return;
    }
  
    try {
      console.log("Starting to upload video to Firebase Storage...");
      const videoBlob = bucket.file(`videos/${video.originalname}`);
      const thumbnailBlob = thumbnail ? bucket.file(`thumbnails/${thumbnail.originalname}`) : null;
  
      await new Promise<void>((resolve, reject) => {
        const blobStream = videoBlob.createWriteStream({
          metadata: {
            contentType: video.mimetype,
          },
        });
  
        blobStream.on('error', (err: Error) => {
          console.error('Error uploading video:', err);
          reject(err);
        });
  
        blobStream.on('finish', () => {
          console.log("Video uploaded successfully.");
          resolve();
        });
  
        blobStream.end(video.buffer);
      });
  
      if (thumbnailBlob) {
        console.log("Starting to upload thumbnail to Firebase Storage...");
        await new Promise<void>((resolve, reject) => {
          const blobStream = thumbnailBlob.createWriteStream({
            metadata: {
              contentType: thumbnail?.mimetype,
            },
          });
  
          blobStream.on('error', (err: Error) => {
            console.error('Error uploading thumbnail:', err);
            reject(err);
          });
  
          blobStream.on('finish', () => {
            console.log("Thumbnail uploaded successfully.");
            resolve();
          });
  
          blobStream.end(thumbnail?.buffer);
        });
      }
  
      const videoUrl = `https://storage.googleapis.com/${bucket.name}/videos/${video.originalname}`;
      const thumbnailUrl = thumbnailBlob ? `https://storage.googleapis.com/${bucket.name}/thumbnails/${thumbnail?.originalname}` : null;
  
      const newVideo = await prisma.video.create({
        data: {
          name,
          description,
          filename: videoUrl,
          thumbnail: thumbnailUrl,
        },
      });
  
      console.log("New video record created in the database:", newVideo);
      res.status(200).json(`Video uploaded successfully: ${newVideo}`);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json(`An error occurred: ${error}`);
    }
  };