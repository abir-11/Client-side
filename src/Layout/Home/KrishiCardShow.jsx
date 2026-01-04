import React from 'react';
import { use } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { FaMapLocationDot } from 'react-icons/fa6';

const KrishiCardShow = ({ datas }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const isOwner = user?.email === datas.owner?.ownerEmail;

  const handleViewDetails = () => {
    if (!user) {
      navigate(`/cropsDetails/${datas._id}`);
    } else {
      navigate(`/cropsDetails/${datas._id}`);
    }
  };

  return (
    <div className="group relative">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex flex-col rounded-2xl bg-white shadow-md hover:shadow-2xl border border-gray-100 hover:border-green-200 overflow-hidden h-full transform hover:scale-[1.02] transition-all duration-500 pb-4 z-10">

        {/* Image Section with Professional Badge */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={datas.image}
            alt={datas.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>

          {/* Professional Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-sm">🌿</span>
                <span className="text-xs font-semibold text-gray-700 tracking-wide">{datas.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 flex flex-col flex-grow">
          {/* title location */}
          <div className='flex justify-between my-1'>
            <div className="font-bold text-xl text-gray-900  line-clamp-1 group-hover:text-green-800 transition-colors">
              {/* Title */}

              {datas.name}

            </div>
            <div className="font-bold text-xl flex items-center gap-2 text-gray-900  line-clamp-1 group-hover:text-green-800 transition-colors">
              <span><FaMapLocationDot /></span> <span>{datas.location}</span>
            </div>
          </div>
            <div>
                {isOwner ? (
              <span className="inline-block  text-green-800 text-sm px-2  mb-2 rounded ">
                Your Crop
              </span>
            ) : <span className=" flex  justify-between  text-green-800 text-sm px-2 my-2 rounded mt-2">
              <span>{datas?.owner?.ownerName || "Unknown Owner"} </span>
              <span>{datas?.owner?.ownerEmail || "No Email Available"}</span>
            </span>}
            </div>
          {/* Stats Container */}
          <div className="space-y-4 mb-6">
            {/* Price Row */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Unit Price</p>
                  <p className="text-gray-900 font-semibold">${datas.pricePerUnit}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{datas.unit}</span>
            </div>

            {/* Quantity Row */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Available Stock</p>
                  <p className="text-gray-900 font-semibold">{datas.quantity}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{datas.unit}s</span>
            </div>
          </div>

          {/* Button with Professional Style */}
          <div className="mt-auto">
            <button
              onClick={handleViewDetails}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow hover:shadow-xl "
            >

              <div className="relative flex items-center justify-center gap-3">
                <span className="text-sm font-semibold tracking-wide">VIEW PRODUCT</span>
                <svg
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrishiCardShow;