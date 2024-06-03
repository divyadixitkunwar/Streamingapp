import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dashboard from './components/dashboard'
import Favourites from './pages/favourites'
import Home from './pages/Home'
import Upload from './pages/upload'
import { createBrowserRouter 
  , createRoutesFromElements 
  , Route 
  , RouterProvider } 
  from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Movie from './pages/moviePage'
import Register from './pages/register'
import NotFound from './pages/Notfound'



 const routes = createBrowserRouter(createRoutesFromElements(
<>
<Route path='/' element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/fav' element={<Favourites />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='*' element={<NotFound />} /> {/* Catch-all for Dashboard paths */}
      </Route>
      <Route path='/register' element={<Register />}>
        <Route index element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} /> {/* Catch-all for Register paths */}
      </Route>
      <Route path='*' element={<NotFound />} /> {/* Catch-all for all other paths */}

  </>
 ))





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={routes} />
   </Provider>
  </React.StrictMode>,
)
