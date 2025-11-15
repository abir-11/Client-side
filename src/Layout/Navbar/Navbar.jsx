import React from 'react';
import { NavLink } from 'react-router';
import './Navbar.css'
import { use } from 'react';

import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import logo from '../../assets/images.png'


const Navbar = () => {
  const {user,singOutUser}=use(AuthContext);
  const handleSingOut=()=>{
    singOutUser()
    .then(()=>{
      //console.log("logout succsefull")
    }).catch((error)=>{
      //console.log(error.message)
    })
  }
    const links=<>
     <NavLink to="/">Home</NavLink>
        <NavLink to="/allCrops">All Crops</NavLink>

        {user && (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/addCrop">Add Crop</NavLink>
            <NavLink to="/my-posts">My Posts</NavLink>
            <NavLink to="/myinterests">My Interests</NavLink>
           
          </>
        )}
     
    </>
    return (
         <div className="navbar  bg-base-100 shadow-sm sticky top-0 z-50  ">
  <div className="navbar-start">
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
    <a className=" text-xl"><img src={logo} alt="" className='w-12 rounded-full' /></a>
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
          <div className='flex gap-2 items-center'>
            <div>
                
                <button onClick={handleSingOut} className="btn btn-outline border-green-800 hover:bg-green-800 hover:text-white">Logout</button>
              
            </div>
          </div>  
          
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-outline border-green-800 hover:bg-green-800 hover:text-white">
              Login
            </Link>
            <Link to="/register" className="btn bg-green-800 text-white">
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

