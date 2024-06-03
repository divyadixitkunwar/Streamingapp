import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { video } from '../redux/videoslice';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Movie = () => {
  const [movie, setMovie] = useState<video | null>(() => {
    const storedMovie = localStorage.getItem('movie');
    return storedMovie ? JSON.parse(storedMovie) : null;
  });
  const videos = useSelector((state: RootState) => state.video.videos);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      console.log('id is undefined');
      return;
    }

    const Vid: number = parseInt(id, 10);
    console.log('Vid:', Vid);

    const filteredVideo = videos.find((vid) => vid.id === Vid);
    console.log('filteredVideo:', filteredVideo);

    if (filteredVideo) {
      setMovie(filteredVideo);
      localStorage.setItem('movie', JSON.stringify(filteredVideo));
      console.log('movie set:', filteredVideo);
    }
  }, [id, videos]);

  console.log('movie:', movie);

  return (
    <div className="text-white">
      {movie ? (
        <div>
          <h1>{movie.name}</h1>
          <p>{movie.description}</p>
        </div>
      ) : (
        'no video'
      )}
    </div>
  );
};

export default Movie;
