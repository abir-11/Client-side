import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='w-11/12 mx-auto py-20'>
          
           <div className='my-4 flex flex-col justify-center text-center '>
            <h1 className=' text-2xl sm:text-3xl md:text-5xl font-semibold pb-1 sm:leading-14 text-[#001931]'>OPPS!! Crops NOT FOUND</h1>
             <p className=' text-sm sm:text-xl text-[#627382]'>The Crops you are requesting is not found on our system.  please try another Crops</p>
           </div>
           <div className='flex justify-center p-2'>
            <Link className=" flex justify-center btn  items-center gap-2  btn-success text-white " to='/allCrops'> <button>Go Back!</button></Link>
           </div>
        </div>
    );
};

export default Error;