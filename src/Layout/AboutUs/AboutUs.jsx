import React from 'react';
import { Link } from 'react-router';
const AboutUs = () => {
  return (
    <section className="max-w-7xl min-h-screen mx-auto px-6 py-5">
      {/* Top Navbar */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <span className="cursor-pointer hover:text-green-700">About</span>
        </div>

        <div className="font-bold text-green-800 ">
          KrishiLink
        </div>

        <Link to='/contact' className="px-5 py-2 rounded-full bg-green-700 text-white text-sm hover:bg-green-800">
          Contact Us
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Content */}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            ABOUT <br /> US
          </h1>

          <p className="text-sm font-semibold mb-3">
            Smart Farming & Sustainable Agriculture
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            Empowering farmers through modern agricultural solutions,
            smart technology, and sustainable farming practices to ensure
            better productivity and growth.
          </p>
        </div>

        {/* Center Image */}
        <div className="lg:col-span-1">
          <img
            src="https://i.ibb.co.com/NcNN46X/1229-W1-1365-1800x1012.webp"
            alt="Farming Field"
            className="rounded-2xl w-full h-[380px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6">
          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
            alt="Farmer"
            className="rounded-2xl w-full h-[160px] object-cover"
          />

          <div>
            <h3 className="text-lg font-bold mb-2 text-green-800">
              Our Philosophy
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We believe in supporting farmers with knowledge, technology,
              and resources that promote sustainable agriculture, food
              security, and rural development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;



