import { Link, NavLink, Outlet } from "react-router";
import { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import { IoIosHome } from "react-icons/io";
import logo from '../assets/images.png'
import { FaMoneyCheckAlt } from "react-icons/fa";
const DashboardLayout = () => {
    const { user } = use(AuthContext);
    const [open, setOpen] = useState(false);

    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* ===== MOBILE OVERLAY ===== */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                />
            )}

            {/* ===== SIDEBAR ===== */}
            <aside
                className={`fixed lg:static z-30 w-64 bg-green-700 text-white min-h-screen
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            >
                <div className="p-5 text-2xl font-bold border-b border-green-600 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-xl">
                        🌾
                        <img
                            src={logo}
                            alt="KrishiLink Logo"
                            className="w-12 h-12 rounded-full"
                        />
                    </Link>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden text-2xl"
                    >
                        <FiX />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <NavLink
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="block p-2 rounded hover:bg-green-600 "
                    >
                        <div className="flex items-center gap-1">
                            <span><IoIosHome /></span> <span>Dashboard</span>
                        </div>
                    </NavLink>

                    {!isAdmin && (
                        <>
                            <NavLink
                                to="/dashboard/add-post"
                                onClick={() => setOpen(false)}
                                className="block p-2 rounded hover:bg-green-600"
                            >
                                ➕ Add Post
                            </NavLink>
                            <NavLink
                                to="/dashboard/my-posts"
                                onClick={() => setOpen(false)}
                                className="block p-2 rounded hover:bg-green-600"
                            >
                                🌽 My Posts
                            </NavLink>
                             <NavLink
                                to="/dashboard/myinterests"
                                onClick={() => setOpen(false)}
                                className="block p-2 rounded hover:bg-green-600"
                            >
                               <div className="flex items-center gap-2">
                            <span><FaMoneyCheckAlt /></span> <span>My Interest</span>
                        </div>
                            </NavLink>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <NavLink
                                to="/dashboard/all-posts"
                                onClick={() => setOpen(false)}
                                className="block p-2 rounded hover:bg-green-600"
                            >
                                📋 All Posts
                            </NavLink>
                            <NavLink
                                to="/dashboard/users"
                                onClick={() => setOpen(false)}
                                className="block p-2 rounded hover:bg-green-600"
                            >
                                👥 All Users
                            </NavLink>
                        </>
                    )}

                    <NavLink
                        to="/dashboard/profile"
                        onClick={() => setOpen(false)}
                        className="block p-2 rounded hover:bg-green-600"
                    >
                        👤 Profile
                    </NavLink>
                </nav>
            </aside>

            {/* ===== MAIN CONTENT ===== */}
            <main className="flex-1 p-6 w-full">
                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen(true)}
                    className="lg:hidden mb-4 text-2xl bg-white p-2 rounded shadow"
                >
                    <FiMenu />
                </button>

                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
