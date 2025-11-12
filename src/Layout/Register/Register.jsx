import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { use } from 'react';
const Register = () => {
    const [error,setError]=useState('')
  const [showpassword,setShowpassword]=useState(false);
  const {createUser}=use(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const handleSignup=(event)=>{
    event.preventDefault();
    const name=event.target.name.value;
    const email=event.target.email.value;
    const password=event.target.password.value;
    const photoURL=event.target.photoURL.value;
    const passWord=/^(?=.*[a-z])(?=.*[A-Z]).+$/;
     if(!passWord.test(password)){
      setError("use:/^(?=.*[a-z])(?=.*[A-Z]).+$/");
      return;
     }
     setError('');
    createUser(email,password,name,photoURL)
    .then((result)=>{
      console.log(result.user)
      navigate(location?.state || '/')
    })
    .catch(error=>{
      console.log(error.message);
      setError(error.message)
    })
  }
  
  const handleShowPassWorded=(e)=>{
      e.preventDefault();
      setShowpassword(!showpassword); 
     }
    return (
       <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold flex justify-center">Regiter now!</h1>
      <p className="py-6 flex text-center">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
       <form onSubmit={handleSignup}>
         <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" name="name" placeholder="Name" />
           <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" />
           <label className="label">Photo-URL</label>
          <input type="text" name='photoURL' className="input" placeholder="Photo-URL" />
          <label className="label">Password</label>
           <div className='relative'>
            <input type={showpassword?"text":"password"}  className="input" name='password' placeholder="Password" />
            <button onClick={handleShowPassWorded} className="  absolute right-4 top-3 px-4  ">{showpassword?<FaEyeSlash/>:<FaEye/>}</button>
          </div>
          
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
         {
          error && <p className='text-red-500'>{error}</p>
        }
       </form>
       <p>Alrady haven account <Link className='text-blue-500 underline' to='/login'>Login</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;