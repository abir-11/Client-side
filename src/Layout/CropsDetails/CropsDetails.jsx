import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from './../../Context/AuthContext/AuthContext';

const CropDetails = () => {
  const crop = useLoaderData();
  const { user, loading } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1); // ✅ Default 1 instead of 0
  const [message, setMessage] = useState("");
  const [interests, setInterests] = useState([]);
  const [isAlreadyInterested, setIsAlreadyInterested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Loading state for form

  const totalPrice = quantity * crop.pricePerUnit;
  const isOwner = user?.email === crop.owner?.ownerEmail;

  useEffect(() => {
    if (!crop?._id || !user?.email) return;
    
    fetch(`http://localhost:3000/interests/${crop._id}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data || []);
        const already = data?.some((i) => i.userEmail === user?.email);
        setIsAlreadyInterested(already);
      })
      .catch(() => toast.error("Failed to load interests"));
  }, [crop._id, user?.email]);

  if (loading) return <p className="text-center text-lg text-green-600">Loading...</p>;

  // Handle interest submission
  const handleSubmitInterest = async (e) => {
    e.preventDefault();
    
    if (quantity < 1) {
      toast.error("Quantity must be at least 1!");
      return;
    }

    if (quantity > crop.quantity) {
      toast.error(`Quantity cannot exceed available ${crop.quantity} ${crop.unit}`);
      return;
    }

    const newInterest = {
      cropId: crop._id,
      userEmail: user.email,
      userName: user.displayName,
      quantity,
      message,
      status: "pending",
    };

    try {
      const result = await Swal.fire({
        title: "Confirm Interest Request",
        html: `
          <div class="text-left">
            <p><strong>Crop:</strong> ${crop.name}</p>
            <p><strong>Quantity:</strong> ${quantity} ${crop.unit}</p>
            <p><strong>Total Price:</strong> ৳${totalPrice}</p>
            <p><strong>Message:</strong> ${message || "No message"}</p>
          </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Send Interest",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      setIsSubmitting(true);

      const response = await fetch("http://localhost:3000/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInterest),
      });

      const data = await response.json();

      if (data.insertedId || data.modifiedCount > 0) {
        toast.success("Interest sent successfully!");
        setIsAlreadyInterested(true);
        setInterests((prev) => [...prev, { 
          _id: data.insertedId || new Date().getTime(), 
          ...newInterest 
        }]);
        // ✅ Reset form
        setQuantity(1);
        setMessage("");
      } else {
        toast.error("Failed to send interest!");
      }
    } catch (error) {
      toast.error("Server error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Accept/Reject for owner
  const handleStatusChange = async (interestId, status, interestQty) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${status} this interest?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${status}`,
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const response = await fetch(`http://localhost:3000/interests/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interestId, cropsId: crop._id, status }),
      });

      const data = await response.json();

      if (data.modifiedCount > 0) {
        toast.success(`Interest ${status} successfully!`);
        setInterests((prev) => 
          prev.map((i) => (i._id === interestId ? { ...i, status } : i))
        );
      } else {
        toast.error("Failed to update interest");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-5 border rounded-xl shadow-md bg-white">
      {/* Crop Info - Improved UI */}
      <div className="flex flex-col lg:flex-row gap-8 border-b pb-8">
        <div className="flex-shrink-0">
          <img 
            src={crop.image} 
            alt={crop.name} 
            className="w-full lg:w-80 h-80 object-cover rounded-2xl border shadow-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <h1 className="font-bold text-3xl text-gray-800">{crop.name}</h1>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {crop.type}
            </span>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{crop.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">৳</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price per unit</p>
                <p className="font-semibold">{crop.pricePerUnit} ৳/{crop.unit}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">📦</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Quantity</p>
                <p className="font-semibold">{crop.quantity} {crop.unit}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{crop.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-semibold">{crop.owner?.ownerName}</p>
                <p className="text-xs text-gray-400">{crop.owner?.ownerEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Form */}
      {!isOwner && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-green-800 border-l-4 border-green-600 pl-3">
            Send Interest
          </h2>
          
          {isAlreadyInterested ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <p className="text-green-800 font-medium text-lg mb-2">
                You've already sent an interest for this crop
              </p>
              <p className="text-green-600">
                Your interest is currently under review by the owner
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitInterest} className="border border-gray-200 p-6 rounded-lg bg-gray-50 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className="input input-bordered w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={quantity}
                    min="1"
                    max={crop.quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Available: {crop.quantity} {crop.unit}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">Total Price</label>
                  <input
                    type="text"
                    value={`৳${totalPrice}`}
                    readOnly
                    className="input input-bordered w-full bg-green-50 font-bold text-green-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-gray-700">Message to Owner</label>
                  <textarea
                    className="textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message to the crop owner..."
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn w-full mt-6 ${
                  isSubmitting ? 'btn-disabled' : 'btn-success text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Submit Interest'
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Received Interests (Owner) */}
      {isOwner && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-l-4 border-blue-600 pl-3">
            Received Interests
          </h2>
          
          {interests.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400 text-2xl">📭</span>
              </div>
              <p className="text-gray-500 text-lg">No interests received yet</p>
              <p className="text-gray-400">Interests from buyers will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto border rounded-lg">
              <table className="table w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-semibold text-gray-700">Buyer</th>
                    <th className="font-semibold text-gray-700">Quantity</th>
                    <th className="font-semibold text-gray-700">Message</th>
                    <th className="font-semibold text-gray-700">Status</th>
                    <th className="font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interests.map((i) => (
                    <tr key={i._id} className="hover:bg-gray-50">
                      <td>
                        <div>
                          <p className="font-medium">{i.userName}</p>
                          <p className="text-sm text-gray-500">{i.userEmail}</p>
                        </div>
                      </td>
                      <td>
                        <p>{i.quantity} {crop.unit}</p>
                        <p className="text-sm text-green-600 font-medium">
                          ৳{i.quantity * crop.pricePerUnit}
                        </p>
                      </td>
                      <td>
                        <p className="max-w-xs truncate" title={i.message}>
                          {i.message || "No message"}
                        </p>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i.status === "accepted" 
                            ? "bg-green-100 text-green-800" 
                            : i.status === "rejected" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {i.status}
                        </span>
                      </td>
                      <td>
                        {i.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(i._id, "accepted", i.quantity)}
                              className="btn btn-sm btn-success text-white"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(i._id, "rejected", i.quantity)}
                              className="btn btn-sm btn-error text-white"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No actions</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CropDetails;