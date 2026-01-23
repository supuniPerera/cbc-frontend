import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine, FaHome, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import AdminUsersPage from "./admin/usersPage";
import DashboardOverview from "./admin/DashboardOverview";

export default function AdminPage() {
    const navigate = useNavigate();
    const [userLoaded, setUserLoaded] = useState(false);
    const [adminName, setAdminName] = useState("Admin");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to access admin panel");
            navigate("/login");
            return;
        }
        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            if (res.data.role !== "admin") {
                toast.error("You are not authorized");
                navigate("/");
                return;
            }
            setAdminName(res.data.firstName + " " + (res.data.lastName || ""));
            setUserLoaded(true);
        }).catch(() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="w-full h-screen bg-[#f8fafc] flex overflow-hidden font-sans">
            
            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR --- */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl lg:shadow-xl 
                flex flex-col items-center py-6 border-r border-gray-100 transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="flex items-center justify-between w-[90%] mb-8 lg:justify-center">
                    <div className="flex items-center py-3 px-4 bg-gradient-to-r from-accent to-[#fb7185] rounded-2xl shadow-lg shadow-accent/20">
                        <img src="/logo.png" alt="Logo" className="h-[30px] brightness-0 invert" />
                        <span className="text-white font-bold text-md ml-3">Admin Panel</span>
                    </div>
                    {/* Close button for mobile */}
                    <button className="lg:hidden text-gray-500 p-2" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <nav className="w-full px-4 flex flex-col gap-2 flex-1">
                    <SidebarLink to="/admin" icon={<FaChartLine />} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarLink to="/admin/orders" icon={<MdShoppingCartCheckout />} label="Orders" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarLink to="/admin/products" icon={<BsBox2Heart />} label="Products" onClick={() => setIsSidebarOpen(false)} />
                    <SidebarLink to="/admin/users" icon={<HiOutlineUsers />} label="Users" onClick={() => setIsSidebarOpen(false)} />
                    <div className="my-4 border-t border-gray-100 w-full"></div>
                    <SidebarLink to="/" icon={<FaHome />} label="Back to Home" />
                </nav>

                <div className="w-full px-4 mt-auto mb-4">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
                {/* Header */}
                <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shadow-sm shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Button */}
                        <button className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
                            <FaBars size={20} />
                        </button>
                        <h2 className="text-gray-700 font-bold text-lg lg:text-xl truncate">System Overview</h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-gray-800 leading-none">{adminName}</p>
                            <p className="text-[10px] font-bold text-accent uppercase">Administrator</p>
                        </div>
                        <FaUserCircle size={32} className="text-accent/20" />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-3 lg:p-8 overflow-y-auto bg-slate-50">
                    <div className="bg-white rounded-2xl lg:rounded-[32px] shadow-sm border border-gray-100 min-h-full p-4 lg:p-8">
                        {userLoaded ? (
                            <Routes>
                                <Route path="/" element={<DashboardOverview />} />
                                <Route path="/products" element={<AdminProductPage />} />
                                <Route path="/orders" element={<AdminOrdersPage />} />
                                <Route path="/add-product" element={<AddProductPage />} />
                                <Route path="/update-product" element={<UpdateProductPage />} />
                                <Route path="/users" element={<AdminUsersPage />} />
                            </Routes>
                        ) : (
                            <div className="flex justify-center items-center h-[60vh]"><Loader /></div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ to, icon, label, onClick }) {
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-accent hover:bg-accent/5 rounded-xl transition-all duration-200 font-bold text-sm"
        >
            <span className="text-xl">{icon}</span>
            {label}
        </Link>
    );
}