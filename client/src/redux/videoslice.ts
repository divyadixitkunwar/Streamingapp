import { createSlice , createAsyncThunk , PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export interface video{
    id : number;    
    name:string;
    description? :string;
    filename:string;
    thumbnail:string;
    like:number;    
    dislike:number;    
    views:number;   
    createdAt:Date;
}

interface videoState{
    videos : video[];
    status : 'idle' | 'loading' | 'success' | 'fail';
    error: null | string
}

const initialState : videoState = {
    videos : [],
    status : 'idle',
    error: null
}

export const url = import.meta.env.VITE_APP_URL
? import.meta.env.VITE_APP_URL
: null;


export const fetchVideos = createAsyncThunk('video/fetchVideo', async ()=>{
  if (!url) {
    throw new Error("URL is not defined in the environment variables.");
  }
    console.log(`This is the env ${url}`)
    const res = await axios.get(`${url}/`)
    return res.data;
})


const videoSlice = createSlice({
    name:'video',
    initialState,
    reducers : {},
    extraReducers :(builder) => {
        builder
          .addCase(fetchVideos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<video[]>) => {
            state.status = 'success';
            state.videos = action.payload;
          })
          .addCase(fetchVideos.rejected, (state, action) => {
            state.status = 'fail';
            state.error = action.error.message || 'Failed to fetch videos';
          });
      },
})


export default videoSlice.reducer