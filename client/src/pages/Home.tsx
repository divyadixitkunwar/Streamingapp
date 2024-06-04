import { useEffect } from 'react'
import { RootState,AppDispatch } from '../redux/store';
import { useSelector , useDispatch } from 'react-redux';
import { fetchVideos } from '../redux/videoslice';
import Card from '../components/card';

const Home = () => {

 const token = localStorage.getItem('token')
 const dispatch:AppDispatch= useDispatch();
 const videos = useSelector((state : RootState)=> state.video.videos);
 const status = useSelector((state : RootState)=> state.video.status);
 const error = useSelector((state : RootState)=> state.video.error);

useEffect(()=>{
  if (status === 'idle'){
    dispatch(fetchVideos())
  }
},[token , dispatch , status])


  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'success') {
    content = (
      videos?.map((vid) => (
       <Card movie={vid}/>
      ))
    );
  } else if (status === 'fail') {
    content = <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 px-4  h-screen bg-white flex-grow">
    {content}
   </div>

  )
}

export default Home
