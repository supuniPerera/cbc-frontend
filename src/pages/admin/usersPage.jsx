import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";
import { FaUserShield, FaUserCheck } from "react-icons/fa";

// --- User Block/Unblock Confirmation Modal ---
function UserBlockConfirm(props) {
    const { user, close, refresh } = props;
    const email = user.email;

    function blockUser() {
        const token = localStorage.getItem("token");
        axios
            .put(import.meta.env.VITE_API_URL + "/api/users/block/" + email, {
                isBlock: !user.isBlock
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                close();
                toast.success("User status updated");
                refresh();
            })
            .catch(() => {
                toast.error("Failed to change status");
            });
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center p-4">
            <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] p-8 relative flex flex-col items-center text-center shadow-2xl">
                <button onClick={close} className="absolute -top-2 -right-2 w-10 h-10 bg-white shadow-md rounded-full text-gray-400 hover:text-red-600 font-bold transition-all">✕</button>
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${user.isBlock ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {user.isBlock ? <FaUserCheck size={30}/> : <FaUserShield size={30}/>}
                </div>

                <h3 className="text-xl font-black text-gray-800 mb-2">{user.isBlock ? "Unblock User?" : "Block User?"}</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Are you sure you want to <span className="font-bold">{user.isBlock ? "unblock" : "block"}</span> {email}?
                </p>

                <div className="flex gap-3 w-full">
                    <button onClick={close} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">Cancel</button>
                    <button onClick={blockUser} className={`flex-1 py-3 text-white font-bold rounded-2xl shadow-lg transition-all ${user.isBlock ? 'bg-green-500 shadow-green-100 hover:bg-green-600' : 'bg-red-500 shadow-red-100 hover:bg-red-600'}`}>
                        Yes, Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login");
                navigate("/login");
                return;
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-full bg-slate-50/30">
            {isBlockConfirmVisible && (
                <UserBlockConfirm 
                    refresh={() => setIsLoading(true)} 
                    user={userToBlock} 
                    close={() => setIsBlockConfirmVisible(false)} 
                />
            )}

            <div className="mx-auto max-w-7xl p-4 lg:p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800 tracking-tight">User Management</h1>
                        <p className="text-sm text-gray-400 font-medium">Manage permissions and account status</p>
                    </div>
                    <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-black uppercase text-gray-500 tracking-widest">{users.length} Total Users</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-[50vh]"><Loader /></div>
                ) : (
                    <div className="w-full">
                        
                        {/* --- MOBILE VIEW: User Cards --- */}
                        <div className="grid grid-cols-1 gap-4 lg:hidden">
                            {users.map((user) => (
                                <div key={user.email} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img 
                                                src={user.image} 
                                                referrerPolicy="no-referrer"
                                                className={`w-16 h-16 rounded-full object-cover border-4 ${user.isBlock ? 'border-red-100' : 'border-green-100'}`}
                                                alt=""
                                            />
                                            {user.isEmailVerified && (
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                                    <MdVerified className="text-blue-500" size={18} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate">{user.firstName} {user.lastName}</h3>
                                            <p className="text-xs text-gray-400 truncate font-mono">{user.email}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                                                    {user.role}
                                                </span>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${user.isBlock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                    {user.isBlock ? 'Blocked' : 'Active'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => { setUserToBlock(user); setIsBlockConfirmVisible(true); }}
                                        className={`w-full mt-4 py-2.5 rounded-xl font-bold text-xs transition-all ${user.isBlock ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
                                    >
                                        {user.isBlock ? 'Unblock Account' : 'Block Account'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* --- DESKTOP VIEW: Table --- */}
                        <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-bold uppercase tracking-widest border-b border-gray-50">
                                        <th className="px-6 py-5">User Profile</th>
                                        <th className="px-6 py-5">Email Address</th>
                                        <th className="px-6 py-5">Role</th>
                                        <th className="px-6 py-5 text-center">Status</th>
                                        <th className="px-6 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user) => (
                                        <tr key={user.email} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 flex items-center gap-4">
                                                <img 
                                                    src={user.image} 
                                                    referrerPolicy="no-referrer"
                                                    className={`h-12 w-12 rounded-full object-cover ring-4 ${user.isBlock ? 'ring-red-50' : 'ring-green-50'}`}
                                                    alt="" 
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm leading-tight">{user.firstName} {user.lastName}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">ID: {user.email.split('@')[0]}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                                    {user.email}
                                                    {user.isEmailVerified && <MdVerified className="text-blue-500" title="Verified" />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.role === "admin" && <MdOutlineAdminPanelSettings className="text-purple-500" size={18} />}
                                                    <span className={`text-xs font-bold capitalize ${user.role === 'admin' ? 'text-purple-600' : 'text-gray-500'}`}>{user.role}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${user.isBlock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                    {user.isBlock ? 'Blocked' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => { setUserToBlock(user); setIsBlockConfirmVisible(true); }}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${user.isBlock ? 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white' : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
                                                >
                                                    {user.isBlock ? 'Unblock' : 'Block'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {users.length === 0 && (
                            <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-100">
                                <p className="text-gray-400 font-medium">No users found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}