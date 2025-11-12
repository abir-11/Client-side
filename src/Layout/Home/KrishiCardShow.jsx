import React from 'react';
import { use } from 'react';

import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';

const KrishiCardShow = ({datas}) => {
   const {user}=use(AuthContext);
   const navigate=useNavigate();
   const handleViewDetails=()=>{
    if(!user){
        navigate('/login',{ state: { from: `/cropsDetails/${datas._id}` } })
    }
    else{
        navigate(`/cropsDetails/${datas._id}`)
    }
   }

    return (
        <div>
             <div className='max-w-11/12 mx-auto flex flex-col  flex-1  rounded-2xl hover:scale-105 transition duration-300 ease-in-out bg-gray-100'>
           <div className='p-4 mx-auto'>
                <div>
                    <img src={datas.image} alt="" className='w-[316px]  h-[316px] overflow-hidden object-cover  rounded-2xl bg-[#F1F5E8]'/>
              
                </div>
                <div className='px-4  pt-2'>
             <h3 className='font-medium text-xl text-[#001931]'>{datas.name}</h3>
             <p>Type: {datas.type}</p>
            </div> 

            <div  className='px-4  py-1 flex justify-between items-center'>
                <p className="flex gap-1 items-center text-lg ">pricePerUnit: <span>{datas.pricePerUnit}</span><span>{datas.unit}</span></p>
                <p  className="flex gap-1 items-center text-lg ">Quantity:<span>{datas.quantity}</span></p>
            </div>
            <div>
                
                 <button  onClick={handleViewDetails}  className="btn bg-green-800 text-white w-full " >View Details</button>
                
            </div>
            </div>
          
          
        </div>
        </div>
    );
};

export default KrishiCardShow;