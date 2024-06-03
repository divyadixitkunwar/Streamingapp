import { Outlet } from "react-router"
import registerImage from '../assets/_ (2).jpeg'
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className=" flex min-h-svh bg-cover">
        <div className="w-1/2 h-screen">
        <Link to={'/'} className="absolute top-4 left-4 text-white z-10">Home</Link>
        <img src={registerImage} alt="register" className="h-full w-full object-center object-cover" />
      </div>
      <div className=" w-1/2" >
        <Outlet />
      </div>
    </div>
  )
}

export default Register
