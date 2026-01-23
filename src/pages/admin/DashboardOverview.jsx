import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaUsers, FaBoxOpen, FaShippingFast } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DashboardOverview() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            
            setOrders(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Orders fetch error:", err);
            setLoading(false);
        });
    }, []);

    // --- Stats  ---
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const recentOrders = orders.slice(0, 5); // Table එකට පෙන්වන්නේ අන්තිම 5 පමණි

    return (
        <div className="space-y-10 pb-10">
            {/* --- Stats Cards Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <StatCard 
                    title="Total Revenue" 
                    value={`Rs. ${totalRevenue.toLocaleString()}`} 
                    icon={<FaDollarSign />} 
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-50" 
                    trend="Lifetime earnings"
                />

                <StatCard 
                    title="Pending Orders" 
                    value={pendingOrders} 
                    icon={<FaShippingFast />} 
                    iconColor="text-amber-600"
                    bgColor="bg-amber-50" 
                    trend="Awaiting processing"
                />

                <StatCard 
                    title="Deliveries" 
                    value={completedOrders} 
                    icon={<FaBoxOpen />} 
                    iconColor="text-blue-600"
                    bgColor="bg-blue-50" 
                    trend="Successfully completed"
                />

                <StatCard 
                    title="Total Orders" 
                    value={orders.length} 
                    icon={<FaUsers />} 
                    iconColor="text-purple-600"
                    bgColor="bg-purple-50" 
                    trend="Order volume"
                />
            </div>

            {/* --- Recent Activity / Table Section --- */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-bold text-gray-800 text-xl tracking-tight">Recent Orders</h3>
                        <p className="text-sm text-gray-400">Manage and monitor your latest customer orders</p>
                    </div>
                    <Link to="/admin/orders" className="bg-accent/10 text-accent px-5 py-2 rounded-xl text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300">
                        View All
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest">
                                <th className="p-5 font-bold">Order ID</th>
                                <th className="p-5 font-bold">Customer</th>
                                <th className="p-5 font-bold">Status</th>
                                <th className="p-5 font-bold">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="4" className="p-10 text-center text-gray-400">Fetching latest data...</td></tr>
                            ) : recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <OrderRow 
                                        key={order._id}
                                        id={order.orderId} 
                                        name={order.customerName} 
                                        status={order.status || "pending"} 
                                        amount={`Rs. ${order.total?.toLocaleString()}`}
                                        statusColor={
                                            order.status === "delivered" ? "bg-green-100 text-green-700" :
                                            order.status === "pending" ? "bg-amber-100 text-amber-700" :
                                            order.status === "cancelled" ? "bg-red-100 text-red-700" :
                                            "bg-blue-100 text-blue-700"
                                        }
                                    />
                                ))
                            ) : (
                                <tr><td colSpan="4" className="p-10 text-center text-gray-400">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon, iconColor, bgColor, trend }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-5">
                <div className={`p-4 rounded-2xl ${bgColor} ${iconColor} text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">{value}</h2>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">{trend}</p>
            </div>
        </div>
    );
}

// Reusable Table Row Component
function OrderRow({ id, name, status, amount, statusColor }) {
    return (
        <tr className="hover:bg-gray-50/80 transition-colors">
            <td className="p-5 font-bold text-gray-700 text-sm">{id}</td>
            <td className="p-5 text-sm font-medium text-gray-500">{name}</td>
            <td className="p-5">
                <span className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-extrabold ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="p-5 font-black text-gray-800 text-sm">{amount}</td>
        </tr>
    );
}