import axios from "axios";
import { useEffect , useState } from "react";
import Card from '../components/card';
import { video } from "../redux/videoslice";
import { url } from "../redux/videoslice";

const Favourites = () => {

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [ favVid  , setFavVid] = useState<video[]>([]);



  useEffect(() => { 
    const getFav = async () => {
      try {
        const res = await axios.post(`${url}/fav`, {}, {
          headers: {
            'id': id,
            'token': token,
          }
        });
        console.log(res.data.favouriteVideos);
        setFavVid(res.data.favouriteVideos);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    }
    getFav();
  }, [id, token]);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
     {favVid.length > 0 ? (
        favVid.map((vid) => (
          <Card key={vid.id} movie={vid} /> 
        ))
      ) : (
        <div>No video</div>
      )}
  </div>
  )
}

export default Favourites;
