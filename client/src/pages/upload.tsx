import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, fileType: string) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (fileType === 'video') {
      setVideo(file);
    } else if (fileType === 'thumbnail') {
      setThumbnail(file);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0] || null;
    if (fileType === 'video') {
      setVideo(file);
    } else if (fileType === 'thumbnail') {
      setThumbnail(file);
    }
  }

  const handleDropAreaClick = (fileType: string) => {
    if (fileType === 'video' && videoInputRef.current) {
      videoInputRef.current.click();
    } else if (fileType === 'thumbnail' && thumbnailInputRef.current) {
      thumbnailInputRef.current.click();
    }
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!video || !thumbnail || !name || !description) {
      console.log('Name, description, video, and thumbnail are required');
      return;
    }

    const allData = new FormData();
    allData.append('name', name);
    allData.append('description', description);
    allData.append('video', video);
    allData.append('thumbnail', thumbnail);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:8080/upload', allData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          'token': token || ''
        },
      });
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log(`data didn't get posted ${error}`);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-full flex-grow">
      <div className="bg-white rounded-md w-full h-full flex items-center md:flex-row gap-4 ">
        <div className="flex flex-col items-center h-full justify-center gap-4 w-1/2 mx-10 p-12">
          <div
            className="text-black cursor-pointer border-dashed border-2 border-gray-400 w-full h-1/2 flex items-center justify-center"
            onDrop={(e) => handleDrop(e, 'video')}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleDropAreaClick('video')}
          >
            Drop Video Here
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, 'video')}
            />
          </div>

          <div
            className="text-black cursor-pointer border-dashed border-2 border-gray-400 w-full h-1/2 flex items-center justify-center"
            onDrop={(e) => handleDrop(e, 'thumbnail')}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleDropAreaClick('thumbnail')}
          >
            Drop Thumbnail Here
            <input
              type="file"
              accept="image/*"
              ref={thumbnailInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, 'thumbnail')}
            />
          </div>
        </div>
        <form className="flex flex-col justify-center items-center h-full gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start w-80">
            <label htmlFor="name" className="text-black">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleName}
              className="w-full border-black border-2 rounded focus:outline-none focus:border-blue-950 placeholder-gray-400 mt-2 px-3 py-2"
            />
          </div>
          <div className="flex flex-col items-start w-80">
            <label htmlFor="description" className="text-black">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Enter your description"
              value={description}
              onChange={handleDescription}
              className="w-full border-black border-2 rounded focus:outline-none focus:border-blue-950 placeholder-gray-400 mt-2 px-3 py-2"
            />
          </div>
          <button type='submit' className="w-80 bg-blue-950 text-white py-2 rounded hover:bg-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
