import express, {request ,response , NextFunction} from 'express';
import multer from 'multer';
import cors from 'cors';
import { Prisma, PrismaClient } from '@prisma/client'
import { verifyToken } from './controllers/auth.js';
import { addtofav , getFav } from './routes/fav.js';
import { userLogin , userSignUp } from './routes/user.js';
import { getVideo , uploadVideos} from './routes/video.js';
import { errorHandler } from './controllers/error.js';


export const app = express();
const uploadDir = '/home/kunwar/videoFiles'
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
export const prisma = new PrismaClient()
export const SECRET_KEY = process.env.SECRET_KEY;


app.use(express.static('/home/kunwar/videoFiles/'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.get('/',getVideo)
app.post('/upload', verifyToken ,upload.fields([{name:'video', maxCount: 1},{name:'thumbnail', maxCount:1}]), uploadVideos)
app.post('/signup', userSignUp)
app.post('/login',userLogin)
app.post('/fav',getFav)
app.post('/addtofav',verifyToken, addtofav)

app.use(errorHandler)


const shutdown = async () =>{
  await prisma.$disconnect()
  process.exit(0);
}


process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown)