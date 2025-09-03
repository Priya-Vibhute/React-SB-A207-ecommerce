import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import AllProducts from './components/products/AllProducts'
import ProductDetail from './components/products/ProductDetail'
import AddProduct from './components/products/AddProduct'

const routes=createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Home/>

      },
      {
        path:"products",
        element:<AllProducts/>
      },
      {
        path:"products/:id",
        element:<ProductDetail/>
      },
      {
        path:"add-product",
        element:<AddProduct/>
      }
    ]
  }
])

function App() {

  return (
    <>
       <RouterProvider router={routes}/>
    </>
  )
}

export default App
