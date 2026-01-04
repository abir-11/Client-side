import React, { use, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Dashboard = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ALL DATA ================= */
  useEffect(() => {
    fetch("https://my-krishilink.vercel.app/krishiCard")
      .then((res) => res.json())
      .then((data) => {
        setAllCrops(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ================= FILTER BY OWNER EMAIL ================= */
  const myCrops = useMemo(() => {
    if (!user?.email) return [];
    return allCrops.filter(
      (crop) => crop?.owner?.ownerEmail === user.email
    );
  }, [allCrops, user?.email]);

  /* ================= STATS ================= */
  const totalQuantity = useMemo(
    () => myCrops.reduce((sum, c) => sum + (c.quantity || 0), 0),
    [myCrops]
  );

  const totalValue = useMemo(
    () =>
      myCrops.reduce(
        (sum, c) => sum + (c.pricePerUnit || 0) * (c.quantity || 0),
        0
      ),
    [myCrops]
  );

  /* ================= STATUS CHART ================= */
  const statusData = useMemo(() => {
    const map = {};
    myCrops.forEach((c) => {
      map[c.status] = (map[c.status] || 0) + 1;
    });
    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [myCrops]);

  /* ================= TYPE CHART ================= */
  const typeData = useMemo(() => {
    const map = {};
    myCrops.forEach((c) => {
      map[c.type] = (map[c.type] || 0) + 1;
    });
    return Object.keys(map).map((key) => ({
      type: key,
      count: map[key],
    }));
  }, [myCrops]);

  const recentCrops = [...myCrops].slice(-3).reverse();
  const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

  if (loading) {
    return (
      <p className="text-center text-green-600 mt-10 font-semibold">
        Loading Dashboard...
      </p>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (myCrops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          🌾 No Crops Added Yet
        </h2>
        <p className="text-gray-500 mb-4">
          You haven’t added any crops yet. Start by adding your first crop.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-post")}
          className="btn bg-green-600 text-white hover:bg-green-700"
        >
          ➕ Add Your First Crop
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ================= WELCOME ================= */}
      <h2 className="text-2xl font-bold">
        Welcome,{" "}
        <span className="text-green-600">
          {user?.displayName || "Farmer"}
        </span>{" "}
        🌾
      </h2>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">My Crops</p>
          <h3 className="text-3xl font-bold text-green-600">
            {myCrops.length}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Quantity</p>
          <h3 className="text-3xl font-bold text-green-600">
            {totalQuantity} kg
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Estimated Value</p>
          <h3 className="text-3xl font-bold text-green-600">
            ৳ {totalValue}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Pending Crops</p>
          <h3 className="text-3xl font-bold text-yellow-500">
            {statusData.find((s) => s.name === "pending")?.value || 0}
          </h3>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard/add-post")}
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            ➕ Add Crop
          </button>
          <button
            onClick={() => navigate("/dashboard/my-posts")}
            className="btn border border-green-600 text-green-600 hover:bg-green-50"
          >
            🌽 My Crops
          </button>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-4">Crop Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-4">Crop Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= RECENT CROPS ================= */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="font-semibold mb-4">Recently Added Crops</h3>

        <ul className="space-y-3">
          {recentCrops.map((crop) => (
            <li
              key={crop._id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{crop.name}</h4>
                <p className="text-sm text-gray-500">
                  {crop.type} • {crop.location} •{" "}
                  {crop.quantity} {crop.unit}
                </p>
                <p className="text-xs text-gray-400">
                  Status: {crop.status}
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard/my-posts")}
                className="btn btn-sm bg-green-100 text-green-700 hover:bg-green-200"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
