import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './Pages/Home'
import {Toaster} from 'sonner'
import Login from './Pages/Login'
import Registor from './Pages/Registor'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import { OrderConfirmationPage } from './Pages/OrderConfirmationPage'
import { OrderDetails } from './Pages/OrderDetails'
import MyOrder from './Pages/MyOrder'
import { AdminLayout } from './components/Admin/AdminLayout'
import AdminHomePage from './Pages/AdminHomePage'
import { UserManagement } from './components/Admin/UserManagement'
import { ProductManagement } from './components/Admin/ProductManagement'
import { EditProductPage } from './components/Admin/EditProductPage'
import { OrderManagement } from './components/Admin/OrderManagement'

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
          <Route path='collections/:collection' element={<CollectionPage/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
          <Route path='order/:id' element={<OrderDetails/>}/>
          <Route path='my-orders' element={<MyOrder/>}/>
         </Route>
        <Route path='/admin' element={<AdminLayout/>}>{/*Admin Layout*/}
          <Route index element ={<AdminHomePage/>}/>
          <Route path='users' element={<UserManagement/>}/>
          <Route path='products' element={<ProductManagement/>}/>
          <Route path='products/:id/edit' element={<EditProductPage/>}/>
          <Route path='orders' element={<OrderManagement/>}/>

          

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
