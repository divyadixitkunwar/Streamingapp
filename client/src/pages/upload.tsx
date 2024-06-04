import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../redux/videoslice";

const Upload = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!video || !thumbnail || !name || !description) {
      console.log(`Name, description, video, and thumbnail are required THIS IS NAME ${name} THIS IS THUMBNAIL ${thumbnail} AND THIS IS DESCRIPTION ${description} and last video ${video}`);
      return;
    }

    const allData = new FormData();
    allData.append('name', name);
    allData.append('description', description);
    allData.append('video', video);
    allData.append('thumbnail', thumbnail);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${url}/upload`, allData, {
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
      <div className="bg-white rounded-md w-full h-full flex items-center md:flex-row gap-4">
        <form className="flex flex-col justify-center items-center h-full gap-6 w-full p-12" onSubmit={handleSubmit}>
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
          <div className="flex flex-col items-start w-80">
            <label htmlFor="video" className="text-black">Upload Video</label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full border-black border-2 rounded focus:outline-none focus:border-blue-950 placeholder-gray-400 mt-2 px-3 py-2"
            />
          </div>
          <div className="flex flex-col items-start w-80">
            <label htmlFor="thumbnail" className="text-black">Upload Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
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
