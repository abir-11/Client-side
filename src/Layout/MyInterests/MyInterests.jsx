import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from './../../Context/AuthContext/AuthContext';

const MyInterests = () => {
  const { user, loading } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [fetchLoading, setFetchLoading] = useState(true);

  // Load user interests
  useEffect(() => {
    const fetchInterests = async () => {
      if (user?.email) {
        try {
          setFetchLoading(true);
          const response = await fetch(`http://localhost:3000/interests?userEmail=${user.email}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Ensure data is an array before setting state
          if (Array.isArray(data)) {
            setInterests(data);
          } else {
            console.error('Expected array but got:', data);
            setInterests([]);
            toast.error("Unexpected data format received");
          }
        } catch (error) {
          console.error('Failed to fetch interests:', error);
          setInterests([]);
          toast.error("Failed to load interests");
        } finally {
          setFetchLoading(false);
        }
      }
    };

    fetchInterests();
  }, [user?.email]);

  if (loading || fetchLoading) {
    return <p className="text-center text-lg text-green-600">Loading...</p>;
  }

  // Safe sorting function with array check
  const sortedInterests = Array.isArray(interests) 
    ? [...interests].sort((a, b) => {
        if (sortOption === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortOption === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortOption === "status") {
          return a.status.localeCompare(b.status);
        }
        return 0;
      })
    : [];

  return (
    <div className="max-w-6xl mx-auto my-10 p-5 border rounded-xl shadow-md bg-white">
      <h2 className="text-3xl font-bold text-green-700 mb-5">My Interests</h2>

      {/* Sorting */}
      <div className="flex justify-end mb-4">
        <label className="font-semibold mr-2">Sort By:</label>
        <select
          className="border p-2 rounded-md"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="status">Status</option>
        </select>
      </div>

      {sortedInterests.length === 0 ? (
        <p className="text-gray-600">No interests sent yet.</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Crop Name</th>
              <th>Owner</th>
              <th>Quantity</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedInterests.map((i) => (
              <tr key={i._id}>
                <td>{i.userName}</td>
                <td>{i.userEmail}</td>
                <td>{i.quantity}</td>
                <td>{i.message}</td>
                <td
                  className={`font-semibold ${
                    i.status === "accepted"
                      ? "text-green-600"
                      : i.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {i.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer />
    </div>
  );
};

export default MyInterests;