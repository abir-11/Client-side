import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import AllCropsShow from './AllCropsShow';
import { use } from 'react';

const AllCrops = () => {
  const [card, setCard] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCrop, setSearchCrop] = useState([]);
  const { loading } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/krishiCard')
      .then(res => res.json())
      .then(data => {
        setCard(data);
        setSearchCrop(data);
      })
      .catch(err => console.error(err));
  }, []);
  
 
  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (term) {
      const filtered = card.filter(crop =>
        crop.name.toLowerCase().includes(term)
      );
      setSearchCrop(filtered);
    } else {
      setSearchCrop(card);
    }
  }, [search, card]);

  useEffect(() => {
    if (search && searchCrop.length === 0) {
      navigate("/error");
    }
  }, [searchCrop, search, navigate]);

  if (loading) {
    return (
      <p className="flex justify-center items-center text-center text-blue-500 text-3xl">
        <span className="loading loading-spinner text-success"></span>
      </p>
    );
  }

  return (
    <div>
      <div className='w-11/12 mx-auto'>
        <h3 className='text-center text-xl sm:text-4xl text-gray-600'>
          We Are Different From Other Farming
        </h3>
        <p className='text-center text-base sm:text-xl text-gray-400'>
          We have 15 years of agriculture & eco farming experience globally, work with professionals
        </p>
      </div>

      <Marquee className='border-t-2 border-b-2 border-gray-300 py-3 mt-4'>
        <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-center text-gray-500'>
          Be Healthy Fresh Organic Vegetable
        </h1>
      </Marquee>

      <div className='mt-5 flex justify-between items-center w-11/12 mx-auto'>
        <div className='flex items-center gap-2 font-semibold text-xl sm:text-2xl text-[#001931] sm:leading-8'>
          <span>({searchCrop.length})</span><span>Crops Found</span>
        </div>

        <div>
          <label className="input flex items-center gap-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={e => setSearch(e.target.value)}
              value={search}
              type="search"
              placeholder="Search Crops"
              className="outline-none"
            />
          </label>
        </div>
      </div>
      <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 sm:mt-15 mb-5'>
          {
            searchCrop.map(datas=><AllCropsShow key={datas._id} datas={datas}></AllCropsShow>)
          }
      </div>
    </div>
  );
};

export default AllCrops;
