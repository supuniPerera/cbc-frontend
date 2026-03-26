import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "./loader";

export default function UserDataMobile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="flex justify-center items-center relative">
            {/* Logout Confirmation Modal */}
            {isLogoutConfirmOpen && (
                <div className="fixed z-[120] w-full h-screen top-0 left-0 bg-black/30 flex justify-center items-center">
                    <div className="w-[300px] bg-primary rounded-lg p-6 flex flex-col gap-4 shadow-lg ring-1 ring-secondary/20">
                        <span className="text-lg font-semibold text-secondary text-center">
                            Are you sure you want to logout?
                        </span>

                        <div className="flex justify-between gap-4">
                            <button
                                className="flex-1 bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="flex-1 bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                                onClick={() => setIsLogoutConfirmOpen(false)}
                            >
                                No
                            </button>
                        </div>

                        <button
                            className="w-full bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                            onClick={() => setIsLogoutConfirmOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Spinner */}
            {loading && (
                <div className="w-8 h-8 border-4 border-white border-b-transparent rounded-full animate-spin"></div>
            )}

            {/* Logged In User */}
            {user && !loading && (
                <div className="h-full w-full flex justify-center items-center gap-2">
                    <img
                        src={user.image || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                    />
                    <span className="text-secondary font-medium">{user.firstName}</span>

                    <select
                        onChange={(e) => {
                            if (e.target.value === "logout") setIsLogoutConfirmOpen(true);
                            if (e.target.value === "settings") window.location.href = "/settings";
                        }}
                        className="ml-2 bg-accent text-white px-2 py-1 rounded-lg hover:bg-secondary transition"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Menu
                        </option>
                        <option value="settings">Account Settings</option>
                        <option value="logout">Logout</option>
                    </select>
                </div>
            )}

            {/* Logged Out */}
            {!loading && !user && (
                <a
                    href="/login"
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                >
                    Login
                </a>
            )}
        </div>
    );
}