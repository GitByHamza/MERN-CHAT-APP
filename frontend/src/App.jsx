import './App.css'
import { Navigate, Route, Routes  } from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';


function App() {
  const {authUser,setAuthUser} =   useAuthContext()

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'> 
        <Routes>
          <Route  path='/' element={authUser ? <Home/> : <Navigate to='/login' />}/>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
          <Route path='/SignUp' element={authUser ? <Navigate to='/' /> : <Signup/>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App