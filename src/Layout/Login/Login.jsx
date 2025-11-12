import React from 'react';
import { use } from 'react';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRef } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { auth } from './../../Firebase/Firebase.init';

const Login = () => {
    const {SingInUser, signInWithGoogle}=use(AuthContext);
    const [showpassword,setShowpassword]=useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    const emailRef=useRef();
    //handlesign in with google
    const handleGoogle=()=>{
      signInWithGoogle()
      .then((result)=>{
        console.log(result.user)
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
      }).catch(error=>
      {
        console.log(error.message)
      }
      )
    }
    const handleSingIn=(event)=>{
           event.preventDefault();
    const email=event.target.email.value;
    const password=event.target.password.value;
    SingInUser(email,password)
    .then((result)=>{
      console.log(result.user)
      //event.target.reset()
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    })
    .catch(error=>{
      console.log(error.message);
    })
    }
     const handleShowPassWorded=(e)=>{
      e.preventDefault();
      setShowpassword(!showpassword); 
     }
     const handleForgetPass=()=>{
      const email=emailRef.current.value;
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert('please check your email');
      })
      .catch((error)=>{
        console.log(error.message)
      })
     }
    return (
       <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold flex justify-center">Login now!</h1>
      <p className="py-6 flex text-center">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSingIn}>
            <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" />
          <label className="label">Password</label>
           <div className='relative'>
                      <input type={showpassword?"text":"password"}  className="input" name='password' placeholder="Password" />
                      <button onClick={handleShowPassWorded} className="  absolute right-4 top-3 px-4  ">{showpassword?<FaEyeSlash/>:<FaEye/>}</button>
                    </div>
          <div onClick={handleForgetPass}><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        </form>
        <div>
          {/* google sign in */}
          <button onClick={handleGoogle} className="btn w-full bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
        </div>
        <p>New to our website ? please <Link to='/signup' className='text-blue-500 underline'>Sign-Up</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;