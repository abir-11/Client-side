import React from 'react';
import { use } from 'react';

import { Outlet } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Services = () => {
    const {loading}=use(AuthContext);
    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <p className="max-w-xl mx-auto text-green-800">Loading...</p>
        </div>
    }
    return (
        <div className='min-h-screen'>
            
            <section className="py-16 ">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
                        Our Services
                    </h2>

                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            🌱
                            <h3 className="text-xl font-semibold mt-4">Organic Marketplace</h3>
                            <p className="text-gray-600 mt-2">
                                Buy and sell fresh organic crops directly from farmers.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            📊
                            <h3 className="text-xl font-semibold mt-4">Smart Farming Guide</h3>
                            <p className="text-gray-600 mt-2">
                                Learn modern farming techniques to increase productivity.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            🚚
                            <h3 className="text-xl font-semibold mt-4">Home Delivery</h3>
                            <p className="text-gray-600 mt-2">
                                Safe and fast delivery of fresh agricultural products.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
             <div className='my-10 max-w-6/12 mx-auto'>  
                <Outlet></Outlet>
             </div>
        </div>
    );
};

export default Services;