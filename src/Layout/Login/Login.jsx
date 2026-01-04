import React, { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import farmingImg from "../../assets/photo-1486754735734-325b5831c3ad.avif";

const Login = () => {
  const { SingInUser, signInWithGoogle } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  // Email & Password Login
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    SingInUser(email, password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Forgot Password
  const handleForgetPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-5xl my-10 w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left Image Section */}
        <div className=" relative">
          <img
            src={farmingImg}
            alt="Agriculture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/40 flex items-end p-6">
            <p className="text-white text-lg font-semibold">
              Smart Login for Smarter Farming 🌾
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-green-700 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">
            Login to continue your agriculture journey
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div
              onClick={handleForgetPass}
              className="text-sm text-green-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-3"
          >
            <FaGoogle className="text-green-500" />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            New here?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
