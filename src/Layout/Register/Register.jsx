import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import farmingImg from "../../assets/photo-1495107334309-fcf20504a5ab.avif";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase and one lowercase letter.");
      return;
    }

    try {
      await createUser(email, password, name, photoURL);
      navigate(location?.state || "/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate(location?.state || "/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white my-10 rounded-2xl  shadow-xl grid  grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left Image */}
        <div className="  relative">
          <img
            src={farmingImg}
            alt="Agriculture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/40 flex items-end p-6">
            <p className="text-white text-lg font-semibold">
              Empowering Farmers with Smart Digital Agriculture 🌾
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-green-700 mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join our agriculture platform today
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full"
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-3"
          >
            <FaGoogle className="text-green-500" />
            Continue with Google
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
