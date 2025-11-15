import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyInterests = () => {
  const { user, loading } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sorted, setSorted] = useState('high');



  useEffect(() => {
    if (user?.email) {
      fetchInterests();
    }
  }, [user?.email]);

  const fetchInterests = () => {
    fetch(`https://my-krishilink.vercel.app/interests/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        setFilteredInterests(data);
      })

  };

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredInterests(interests);
    } else {
      setFilteredInterests(interests.filter(interest => interest.status === statusFilter));
    }
  }, [statusFilter, interests]);

  useEffect(()=>{
    const sortedItems = [...filteredInterests].sort((a, b) => {
    if (sorted === 'high') {
      return b.quantity - a.quantity;
    } else {
      return a.quantity - b.quantity;
    }
  });
  setFilteredInterests(sortedItems);

  },[sorted, interests])

  const statusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'badge badge-success text-white text-xs';
      case 'rejected':
        return 'badge badge-error text-white text-xs';
      case 'pending':
        return 'badge badge-warning text-white text-xs';
      default:
        return 'badge badge-ghost text-xs';
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  if (loading) {
    return <p className="text-center text-lg text-green-600 mt-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Interests</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 px-2">
          <button
            onClick={() => handleStatusFilter('all')}
            className={`btn btn-xs sm:btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All ({interests.length})
          </button>
          <button
            onClick={() => handleStatusFilter('pending')}
            className={`btn btn-xs sm:btn-sm ${statusFilter === 'pending' ? 'btn-warning' : 'btn-outline'}`}
          >
            Pending ({interests.filter(i => i.status === 'pending').length})
          </button>
          <button
            onClick={() => handleStatusFilter('accepted')}
            className={`btn btn-xs sm:btn-sm ${statusFilter === 'accepted' ? 'btn-success' : 'btn-outline'}`}
          >
            Accepted ({interests.filter(i => i.status === 'accepted').length})
          </button>
          <button
            onClick={() => handleStatusFilter('rejected')}
            className={`btn btn-xs sm:btn-sm ${statusFilter === 'rejected' ? 'btn-error' : 'btn-outline'}`}
          >
            Rejected ({interests.filter(i => i.status === 'rejected').length})
          </button>

          <select defaultValue="Sorted Option" onClick={(e) => setSorted(e.target.value)} className=" btn btn-outline h-8 ">
            <option disabled={true}>Sorted Quantity</option>
            <option value='high'>High Qantity</option>
            <option value='low'>Low Qantity</option>
          </select>

        </div>


        <div className="block sm:hidden">
          {filteredInterests.length > 0 ? (
            <div className="space-y-3">
              {filteredInterests.map((interest) => (
                <div key={interest._id} className="bg-white rounded-lg shadow p-4 border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm truncate flex-1 mr-2">
                      Status
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${statusClass(interest.status)}`}>
                      {interest.status?.charAt(0).toUpperCase() + interest.status?.slice(1) || 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Owner:</span>
                      <span className="text-gray-900 font-medium text-right">
                        {interest.owner.ownerName || 'Unknown'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="text-gray-900">{interest.quantity} kg</span>

                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Price:</span>
                      <span className="text-green-600 font-semibold">
                        {interest.totalPrice || (interest.quantity * (interest.pricePerUnit || 0))}/tk
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1">Message:</span>
                      <p className="text-gray-900 text-sm bg-gray-50 p-2 rounded truncate">
                        {interest.message}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interests found</h3>
              <p className="text-gray-500 px-4">
                {statusFilter === 'all'
                  ? "You haven't expressed interest in any crops yet."
                  : `No ${statusFilter} interests found.`
                }
              </p>
            </div>
          )}
        </div>
        <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
          {filteredInterests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Name
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Owner
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInterests.map((interest) => (
                    <tr key={interest._id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {interest.cropName || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {interest.owner.ownerName || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {interest.owner.ownerEmail || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {interest.quantity} kg
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          ${interest.totalPrice || (interest.quantity * (interest.pricePerUnit || 0))}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {interest.message}
                        </div>

                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass(interest.status)}`}>
                          {interest.status?.charAt(0).toUpperCase() + interest.status?.slice(1) || 'Pending'}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interests found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {statusFilter === 'all'
                  ? "You haven't expressed interest in any crops yet."
                  : `No ${statusFilter} interests found.`
                }
              </p>
            </div>
          )}
        </div>

        {interests.length > 0 && (
          <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{interests.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Interests</div>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                {interests.filter(i => i.status === 'pending').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {interests.filter(i => i.status === 'accepted').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Accepted</div>
            </div>
            <div className="bg-white rounded-lg shadow p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {interests.filter(i => i.status === 'rejected').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Rejected</div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyInterests;