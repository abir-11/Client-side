import React from 'react';
import { use } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const CropsDetails = () => {
    const Crops=useLoaderData();
    console.log(Crops);
    const {_id:CropId}=Crops;
    const {user,loading}=use(AuthContext);
    const [data,setData]=useState([]);
    useEffect(()=>{

    })
   
  
     
 

  if (loading) {
    return <p className='text-center text-lg text-green-600'>Loading...</p>;
  }
const handleForm=(event)=>{
    event.preventDefault();
     event.target.reset()
}
const buttonClick=()=>{
    toast('Your form Successfully submit')
}

  return (
    <div className='max-w-11/12 mx-auto my-5 sm:my-10'>
      <div className='flex gap-10 flex-col sm:flex-row justify-center sm:items-center border-b border-gray-300 pb-10'>
        <div>
          <img
            src={Crops.image}
            alt={Crops.name}
            className='w-[316px] mx-auto h-[316px] overflow-hidden object-cover rounded-2xl bg-[#F1F5E8]'
          />
        </div>

        <div>
          <div className='border-b border-gray-300'>
            <h1 className='font-bold text-2xl sm:text-3xl text-[#001931]'>{Crops.name}</h1>
          </div>

          <div className='my-4 sm:my-7 flex gap-10 items-center'>
            <div>
              <ul>
                <li className='text-[#001931]'>pricePerUnit</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931] '>{Crops.pricePerUnit}kg</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className='text-[#001931]'>Quantity</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]'>{Crops.quantity}</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className='text-[#001931]'>Type</li>
                <li className='font-extrabold text-xl sm:text-2xl md:text-4xl text-[#001931]'>{Crops.type}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='my-5'>
        <h3 className='text-xl sm:text-2xl font-semibold text-[#001931] mb-4'>Description</h3>
        <p className='text-base sm:text-xl sm:leading-8 text-[#627382] py-4'>{Crops.description}</p>
      </div>

      <div>
        <div>
            <h1 className=' text-3xl text-center mt-4 font-bold'>Book Consulation</h1>
            <div className='mt-4 flex justify-center'>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  
  <form onSubmit={handleForm}>
  <label className="label">Name</label>
  <input type="text" className="input" placeholder="Enter you name" />

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="email" />

  <button onClick={buttonClick} className="btn w-full btn-outline border-green-800 hover:bg-green-800 hover:text-white mt-4">Book Now</button>
  </form>

</fieldset>
            </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
    );
};

export default CropsDetails;