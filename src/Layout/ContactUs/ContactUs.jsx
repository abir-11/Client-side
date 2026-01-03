import React from 'react';
import { Link } from 'react-router';
const ContactUs = () => {
    
  return (
    <section className="bg-green-100 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-10">
        
        {/* Top Bar */}
        <div className="flex items-center justify-center mb-12 text-sm">

          <div className="text-center font-semibold text-green-800">
            KRISHILINK
            <p className="text-xs font-normal text-gray-500">
              Smart Agriculture Platform
            </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Contact us</h1>
            <p className="text-gray-600 text-sm">
              Get in touch with us for farming support, partnerships,
              or any agricultural-related inquiries.
            </p>
          </div>

          {/* Middle Section */}
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-gray-500">general inquiries</p>
              <p className="font-medium">support@krishilink.com</p>
              <p className="font-medium">+880 1712-345678</p>
            </div>

            <div>
              <p className="text-gray-500">collaborations</p>
              <p className="font-medium">partners@krishilink.com</p>
              <p className="font-medium">+880 1812-987654</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-gray-500">careers</p>
              <p className="font-medium">careers@krishilink.com</p>
            </div>

            <div>
              <p className="text-gray-500">address</p>
              <p className="font-medium">
                Dhaka, Bangladesh <br />
                Agricultural Innovation Hub
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mt-12">
          <img
            src="https://i.ibb.co.com/d04mnhH6/tbi-featured-image-2025-12-26-07-41-57.webp"
            alt="Agriculture"
            className="rounded-xl w-full h-[450px] object-cover"
          />
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 mt-10 text-sm font-medium">
          <Link to='https://www.facebook.com/arafatalom.abir.1' className="cursor-pointer hover:text-green-700">Facebook</Link>
          <Link to='https://www.instagram.com/abir_._who/' className="cursor-pointer hover:text-green-700">Instagram</Link>
          <Link to='https://wa.me/8801857465024' className="cursor-pointer hover:text-green-700">WhatsApp</Link>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
