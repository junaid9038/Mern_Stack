import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './Pages/Home'
import {Toaster} from 'sonner'
import Login from './Pages/Login'
import Registor from './Pages/Registor'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <BrowserRouter 
     future = {{v7_startTransition : true, v7_reletiveSplatpath:true}}
    >
    <Toaster position="top-right"/>
      <Routes>
        <Route path='/' element={<UserLayout/>}>
         {/*User Layout*/}
         <Route index element ={<Home/>}/>
         <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Registor/>}/>
          <Route path='profile' element={<Profile/>}/>
         </Route>
        <Route>{/*Admin Layout*/}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
