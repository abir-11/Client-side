import React from 'react';
import { NavLink } from 'react-router';
import './Navbar.css'
import { use } from 'react';

import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import logo from '../../assets/images.png'


const Navbar = () => {
  const { user, singOutUser,loading } = use(AuthContext);
  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        //console.log("logout succsefull")
      }).catch((error) => {
        //console.log(error.message)
      })
  }
  const links = <>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `px-4 py-2  rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/allCrops"
      className={({ isActive }) =>
        `px-4 py-2 rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
        }`
      }
    >
      All Crops
    </NavLink>
    <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          }
        >
          About Us
        </NavLink>

    {user && (
      <>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          }
        >
         Contact Us
        </NavLink>

        <NavLink
          to="/privacy-policy"
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          }
        >
          Privacy Policy
        </NavLink>

        

       
      </>
    )}

  </>
  if(loading){
    return <div className='flex justify-center items-center min-h-screen'>
        <p className="max-w-xl mx-auto text-green-800">Loading...</p>
    </div>
  }
  return (
    <div className="navbar  bg-base-100 shadow-sm sticky top-0 z-50  lg:px-10 ">
      <div className="navbar-start ">
        <div className="dropdown  relative z-50">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow font-bold  text-green-800 ">
            {
              links
            }
          </ul>
        </div>
        <Link to='/' className=" text-xl"><img src={logo} alt="" className='w-12 rounded-full' /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-lg gap-5 text-green-800">
          {
            links
          }
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          {user ? (
            
              
              <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                
                <div className="w-10 rounded-full">
                  
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <NavLink
        
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${!isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          }
        >
          {user.displayName}
        </NavLink>
               <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          }
        >
          Dashboard
        </NavLink>
            
         <NavLink className={({ isActive }) =>
            `px-4 py-2 rounded-2xl transition-colors duration-300 ${!isActive ? "bg-green-800 text-white" : "text-gray-700 hover:bg-green-100"
            }`
          } onClick={handleSingOut}>Logout</NavLink>
       
              </ul>
            </div>
           

          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn btn-outline border-green-800 hover:from-green-700 hover:bg-green-700 font-medium rounded-sm shadow hover:shadow-xl hover:text-white">
                Login
              </Link>
              <Link to="/register" className="btn  text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-medium rounded-sm shadow hover:shadow-xl">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

