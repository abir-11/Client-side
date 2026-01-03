import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthProvider from './Context/AuthProvider/AuthProvider';

import Root from './Root/Root.jsx';
import Home from './Layout/Home/Home.jsx';
import Register from './Layout/Register/Register.jsx';
import Login from './Layout/Login/Login.jsx';
import AllCrops from './Layout/All-Crops/AllCrops.jsx';
import CropsDetails from './Layout/CropsDetails/CropsDetails.jsx';
import Error from './Layout/All-Crops/Error.jsx';
import ErrorPage from './Layout/ErrorPage/ErrorPage.jsx';
import Profile from './Layout/MyProfile/Profile.jsx';
import AddCrop from './Layout/AddCrop/AddCrop.jsx';
import Myposts from './Layout/MyPosts/Myposts.jsx';
import MyInterests from './Layout/MyInterests/MyInterests.jsx';

import Services from './Layout/Services/Services.jsx';
import Branding from './Layout/Services/Branding.jsx';
import Design from './Layout/Services/Design.jsx';
import Marketing from './Layout/Services/Marketing.jsx';
import Advertiesment from './Layout/Services/Advertiesment.jsx';
import AboutUs from './Layout/AboutUs/AboutUs.jsx';
import ContactUs from './Layout/ContactUs/ContactUs.jsx';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy.jsx';
import CookiePolicy from './Layout/CookiePolicy/CookiePolicy.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: 'allCrops', 
        Component: AllCrops 
      },
      { path: 'register', 
        Component: Register 
      },
      { path: 'login', 
        Component: Login 
      },
      { path: 'cropsDetails/:id', 
        loader: ({ params }) => fetch(`https://my-krishilink.vercel.app/krishiCard/${params.id}`), 
        element: <CropsDetails /> 
      },
      { path: 'error', 
        Component: Error 
      },
      { path: 'profile', 
        Component: Profile 
      },
      { path: 'addCrop', 
        Component: AddCrop 
      },
      { path: 'my-posts', 
        loader: () => fetch('https://my-krishilink.vercel.app/krishiCard'), 
        Component: Myposts 
      },
      { path: 'myinterests', 
        element: <MyInterests /> 
      },

      {
        path: 'services',
        Component: Services,
        children: [
          { path: 'branding',
             Component: Branding
           },
          { path: 'design',
            Component: Design 
          },
          { path: 'marketing', 
            Component: Marketing 
          },
          { path: 'advertisement', 
            Component: Advertiesment 
          }
        ]
      },
      {
        path:'about-us',
        Component:AboutUs
      },
      {
        path:'contact',
        Component:ContactUs
      },
      {
        path:'privacy-policy',
        Component:PrivacyPolicy
      },
      {
        path:'cookie-policy',
        Component:CookiePolicy
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
