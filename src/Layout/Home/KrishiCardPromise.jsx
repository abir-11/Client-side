import React from 'react';
import { use } from 'react';
import KrishiCardShow from './KrishiCardShow';

const KrishiCardPromise = ({krishiPromise}) => {
    const data=use(krishiPromise)
   // console.log(data);
    return (
       <div>
        <div >
             <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-center  mt-10 sm:mt-20">Latest Organic & Healthy Food</h1>
             <p className='text-center text-base sm:text-xl text-gray-400'>We are a vertically integrated agro-industrial holding in Agrile, a public European company that runs a socially responsible business and produces food products with a focus on global markets.</p>
        </div>
         <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 sm:mt-15'>
            {
               data.map(datas=><KrishiCardShow key={datas._id} datas={datas}></KrishiCardShow>) 
            }
        </div>
       </div>
    );
};

export default KrishiCardPromise;