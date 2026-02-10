import React, { useEffect, useState, useContext } from 'react';
import Marquee from "react-fast-marquee";
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import AllCropsShow from './AllCropsShow';

const AllCrops = () => {
  const [card, setCard] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchCrop, setSearchCrop] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [quantities, setQuantities] = useState(['all']);

  const [filteredInterests, setFilteredInterests] = useState([]);
  const [sorted, setSorted] = useState('high');
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://my-krishilink.vercel.app/krishiCard')
      .then(res => res.json())
      .then(data => {
        setCard(data);
        setSearchCrop(data);

        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(data.map((item) => item?.type).filter(Boolean))];
        setCategories(uniqueCategories);

        // Extract unique quantities
        const uniqueQuantities = ['all', ...new Set(data.map((item) => item?.location).filter(Boolean))];
        setQuantities(uniqueQuantities);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter crops based on search, category, and quantity
  useEffect(() => {
    let filtered = [...card];

    // Apply search filter
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(crop =>
        crop.name?.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(crop =>
        crop.type === categoryFilter
      );
    }

    // Apply quantity filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(crop =>
        crop.location === locationFilter
      );
    }
    //Sorting By Quantity
    filtered.sort((a, b) =>
      sorted === 'high' ? b.quantity - a.quantity : a.quantity - b.quantity
    )

    setSearchCrop(filtered);

    // Navigate to error page if no results after search
    if (search.trim() && filtered.length === 0) {
      navigate("/error");
    }
  }, [search, categoryFilter, locationFilter, sorted, card, navigate]);

  if (loading) {
    return (
      <p className="flex justify-center items-center text-center text-blue-500 text-3xl">
        <span className="loading loading-spinner text-success"></span>
      </p>
    );
  };
  return (
    <div className='min-h-screen'>
      <div className="w-11/12 mx-auto mt-5 text-center">

      

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-green-900 leading-tight">
          Explore Our Fresh & Organic Crops
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
          With over <span className="font-semibold text-green-700">15+ years of eco-farming experience</span>,
          we cultivate healthy, chemical-free crops using sustainable agriculture methods.
          Discover our wide variety of fresh organic vegetables grown with care.
        </p>
      {/* Badge */}
        <div className="flex justify-center my-2">
          <span className="px-4 py-1 text-sm font-semibold tracking-wide text-green-800 bg-green-100 rounded-full shadow-sm">
            🌱 100% Organic Farming
          </span>
        </div>
        {/* Divider */}
        <div className="flex justify-center mt-6">
          <div className="w-24 h-1 bg-green-600 rounded-full"></div>
        </div>

         

      </div>

         
      {/* Professional Marquee */}
      <Marquee
        speed={60}
        pauseOnHover={true}
        gradient={false}
        className="border-y border-green-200 py-4 mt-10 bg-green-50"
      >
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-wide text-green-800 px-6">
          🌿 Fresh • Organic • Healthy • Sustainable Farming 🌿
        </h1>
      </Marquee>

      <div className='mt-5 flex flex-col md:flex-row justify-between items-start md:items-center w-11/12 mx-auto gap-4'>
        <div className='flex items-center gap-2 font-semibold text-xl sm:text-2xl text-[#001931] sm:leading-8'>
          <span>Crops Found</span><span>({searchCrop.length})</span>
        </div>

        {/* Search Input */}
        <div className='w-full md:w-64'>
          <label className="input input-bordered flex items-center gap-2">
            <svg className="w-4 h-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              onChange={e => setSearch(e.target.value)}
              value={search}
              type="search"
              placeholder="Search Crops"
              className="grow outline-none"
            />
          </label>
        </div>

        {/* Filters */}
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Category Filter */}
          <div className='w-full sm:w-48'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category?.charAt(0).toUpperCase() + category?.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Filter */}
          <div className='w-full sm:w-48'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {quantities.map((location, index) => (
                <option key={index} value={location}>
                  {location === "all"
                    ? "All Quantities"
                    : location}
                </option>
              ))}
            </select>
          </div>
          {/* sorted */}
          <div className='w-full sm:w-48'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sorting by Quantity
            </label>
            <select defaultValue="Sorted Option" onChange={(e) => setSorted(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option disabled={true}>Sorted Quantity</option>
              <option value='high'>High Qantity</option>
              <option value='low'>Low Qantity</option>
            </select>
          </div>

        </div>

      </div>

      <div className='w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-5'>
        {searchCrop.length > 0 ? (
          searchCrop.map(datas => <AllCropsShow key={datas._id} datas={datas} />)
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500">No crops found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCrops;