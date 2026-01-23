import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";
import { FaEye, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoading){
            const token = localStorage.getItem("token");
            if (token == null) {
                navigate("/login");
                return;
            }
            axios
            .get(import.meta.env.VITE_API_URL + "/api/orders",{
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setOrders(response.data);
                setIsLoading(false);
            });
        }       
    }, [isLoading]);

    return (
        <div className="w-full min-h-full bg-slate-50/50">
            <OrderModal 
                isModalOpen={isModelOpen} 
                closeModal={() => setIsModelOpen(false)} 
                selectedOrder={selectedOrder} 
                refresh={()=>{setIsLoading(true)}}
            />
        
            <div className="mx-auto max-w-7xl p-4 lg:p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Orders Management</h1>
                        <p className="text-sm text-gray-500">Track and manage your customer sales</p>
                    </div>
                    <span className="rounded-2xl bg-accent/10 px-4 py-2 text-sm font-bold text-accent border border-accent/20">
                        {orders.length} Total Orders
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-[50vh]"><Loader/></div>
                ) : (
                    <div className="space-y-4">
                        
                        {/* --- MOBILE VIEW: Cards (Visible only on small screens) --- */}
                        <div className="grid grid-cols-1 gap-4 lg:hidden">
                            {orders.map((item) => (
                                <div 
                                    key={item.orderId}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
                                    onClick={() => {
                                        setSelectedOrder(item);
                                        setIsModelOpen(true);
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold text-accent font-mono uppercase tracking-wider bg-accent/5 px-2 py-1 rounded-md">
                                            #{item.orderId}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${
                                            item.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                                        <FaUser className="text-gray-400 text-xs" /> {item.customerName}
                                    </h3>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                            <FaCalendarAlt /> {new Date(item.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Total Amount</p>
                                            <p className="text-lg font-black text-gray-900 leading-none">LKR {item.total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- DESKTOP VIEW: Table (Hidden on small screens) --- */}
                        <div className="hidden lg:block overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-bold uppercase tracking-widest border-b border-gray-50">
                                        <th className="px-6 py-5">Order ID</th>
                                        <th className="px-6 py-5">Customer</th>
                                        <th className="px-6 py-5">Items</th>
                                        <th className="px-6 py-5 text-center">Status</th>
                                        <th className="px-6 py-5">Total</th>
                                        <th className="px-6 py-5">Date</th>
                                        <th className="px-6 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.map((item) => (
                                        <tr key={item.orderId} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs font-bold text-accent">{item.orderId}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800">{item.customerName}</span>
                                                    <span className="text-[10px] text-gray-400">{item.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-500">{item.items.length} Items</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                                    item.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-black text-gray-800 text-sm">LKR {item.total.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-xs text-gray-500 font-medium">{new Date(item.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => { setSelectedOrder(item); setIsModelOpen(true); }}
                                                    className="p-2 bg-gray-50 text-gray-400 hover:bg-accent hover:text-white rounded-xl transition-all"
                                                >
                                                    <FaEye />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {orders.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium">No orders found in the system.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}