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
    status : 'idle' | 'loading' | 'sucess' | 'fail';
    error: null | string
}

const initialState : videoState = {
    videos : [],
    status : 'idle',
    error: null
}


export const fetchVideos = createAsyncThunk('video/fetchVideo', async ()=>{
    const res = await axios.get('http://localhost:8080/')
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
            state.status = 'sucess';
            state.videos = action.payload;
          })
          .addCase(fetchVideos.rejected, (state, action) => {
            state.status = 'fail';
            state.error = action.error.message || 'Failed to fetch videos';
          });
      },
})


export default videoSlice.reducer