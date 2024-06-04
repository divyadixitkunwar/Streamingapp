import { video } from "../redux/videoslice";
import { useNavigate } from "react-router";


const Card = ({ movie }: { movie: video }) => {

  const {id , thumbnail} = movie;
  console.log(thumbnail)
  const navigate = useNavigate();

  const handleButtonClick = (id:number) =>{
    navigate(`/${id}`);
  }

  
  return (
    <div className="rounded-lg h-72 w-64 overflow-hidden relative " key={id}>
    <img src={`${thumbnail}`} alt="Move Card Background" className="w-full h-full object-cover" />
    <button
      className="absolute inset-x-0 bottom-0 py-4 px-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white font-bold focus:outline-none"
      onClick={()=>handleButtonClick(id)}
    >Watch</button>
  </div>
  )
}

export default Card
