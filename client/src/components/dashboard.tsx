import { Outlet , Link } from 'react-router-dom'

const Dashboard = () => {
  
  const token : string | null = localStorage.getItem('token')

  return (
    <div className="flex flex-row bg-white py-4 min-h-screen max-h-screen ">
    <div className="flex flex-col w-48 min-h-full  bg-gray-800 rounded-lg ml-3 pl-2 pt-2 ">
      <h1 className="text-white text-lg font-bold">Dashboard</h1>
      <nav className="flex flex-col gap-2">
        <Link className="text-white hover:bg-gray-700 px-4 py-2 rounded-md" to={'/'}>
          Home
        </Link>
        {token && (
          <>
            <Link className="text-white hover:bg-gray-700 px-4 py-2 rounded-md" to={'/fav'}>
              Favourites
            </Link>
            <Link className="text-white hover:bg-gray-700 px-4 py-2 rounded-md" to={'/upload'}>
              Upload
            </Link>
          </>
        )}
        <Link className="text-white hover:bg-gray-700 px-4 py-2 rounded-md" to={'/register'}>
          Register
        </Link>
        <Link className="text-white hover:bg-gray-700 px-4 py-2 rounded-md" to={'/login'}>
          Login
        </Link>
      </nav>
    </div>
    <div className=' flex flex-grow'>
    <Outlet />
    </div>
  </div>
  )
}

export default Dashboard
