import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { url } from "../redux/videoslice";

const Login = () => {
  
    const[userName , setUserName] = useState<string>('');
    const[userPassword, setUserPassword] = useState<string>('');
    const navigate = useNavigate();
    
  
    const handleName = (e : React.ChangeEvent<HTMLInputElement>) =>{
      setUserName(e.target.value)
    }
  
    const handlePassword = (e : React.ChangeEvent<HTMLInputElement>) =>{
      setUserPassword(e.target.value)
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>)=>{
      e.preventDefault();

      const LoginData = {
        name : userName,
        password : userPassword
      }

      try {
        const res = await axios.post(`${url}/login`,LoginData)
        console.log(res.data)
        console.log(res.data.user.id)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem( 'id',res.data.user.id);
        navigate('/');
        
      } catch (error) {
        console.log(error)
      }
    }
  
  
  
    return (
      <div className="flex flex-col h-full">
         <div className="flex ml-auto p-4">
          <div className="flex">
            <Link to={'/register'} className="flex-1 bg-white text-black py-2 px-4 focus:outline-none hover:bg-gray-200 rounded-l-xl">Register</Link>
           <Link to={'/register/login'} className="flex-1 bg-blue-950 text-white py-2 px-4  focus:outline-none  rounded-r-xl">Login</Link>
         </div>
      </div>

      <form className="flex flex-col justify-center items-center flex-grow gap-6" onSubmit={handleSubmit}>
        <div className="w-80">
          <label htmlFor="username" className="text-left block text-sm font-medium text-gray-700">Username</label>
          <input 
            id="username"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={handleName}
            className=" w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-950 placeholder-gray-400 mt-4"
          />
      
        </div>
        <div className="w-80">
          <label htmlFor="password" className="text-left block text-sm font-medium text-gray-700">Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Enter your password"
            value={userPassword}
            onChange={handlePassword}
            className=" w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-950 placeholder-gray-400 mt-4"
          />
         
        </div>
        <button type='submit' className="w-80 bg-blue-950 text-white py-2 rounded hover:bg-blue-800">Create account</button>
      </form>

    </div>
    )
  
}

export default Login
