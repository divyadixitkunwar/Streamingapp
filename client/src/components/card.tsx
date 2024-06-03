import { video } from "../redux/videoslice";
import { useNavigate } from "react-router";
import axios from "axios";

const Card = ({ movie }: { movie: video }) => {

  const {id , thumbnail} = movie;
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const uid = localStorage.getItem('id');

  const handleButtonClick = (id:number) =>{
    navigate(`/${id}`);
  }

  const addtofavourite = async (vid : number) =>{

    const favData = {
      vid : vid,
      id : uid
    }

    const res = await axios.post('http://localhost:8080/addtofav',favData,{
      headers : {
        'token' : token,
      }
    })
    

   console.log(res)
  }

  
  return (
    <div className="rounded-lg h-72 w-64 overflow-hidden relative ">
    <img src={`http://localhost:8080/${thumbnail}`} alt="Move Card Background" className="w-full h-full object-cover" />
    <button
      className="absolute inset-x-0 bottom-0 py-4 px-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white font-bold focus:outline-none"
      onClick={()=>handleButtonClick(id)}
    >Watch</button>
  </div>
  )
}

export default Card
