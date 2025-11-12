import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import Root from './Root/Root.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthProvider/AuthProvider';
import Register from './Layout/Register/Register.jsx'
import Login from './Layout/Login/Login.jsx'
import Home from './Layout/Home/Home.jsx'
import AllCrops from './Layout/All-Crops/AllCrops.jsx';
import CropsDetails from './Layout/CropsDetails/CropsDetails.jsx';
import Error from './Layout/All-Crops/Error.jsx';



const router=createBrowserRouter([
  {
    path:'/',
    Component:Root,
    children:[
      {
       index:true,
        Component:Home
      },
      {
        path:'/allCrops',
        Component:AllCrops

      },
      {
        path:'/register',
        Component:Register
        
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/cropsDetails/:id',
        element:<CropsDetails />
      },
      {
        path:'/error',
        Component:Error
      }
      
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
     <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
  </StrictMode>
)
