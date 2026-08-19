import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../../services/api";

function PatientNavbar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State to track active logout process
    const [loggingOut, setLoggingOut] = useState(false);

    // Safety fallback: Check prop first, then localStorage if available
    const localUserData = localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")) 
        : null;
    const currentUser = user || localUserData;

    // Check if user is authenticated
    const isLoggedIn = Boolean(currentUser && (currentUser._id || currentUser.name || currentUser.email));

    // ================= LOGOUT HANDLER =================
    /**
     * Handles user logout API call, clears local cache, and redirects cleanly
     */
    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            // Trigger backend logout route
            await api.post("/auth/logout");

        } catch (error) {
            console.error("LOGOUT ERROR:", error);
        } finally {
            // Clear local cache storage
            localStorage.removeItem("user");
            setLoggingOut(false);
            
            // Hard redirect to clear all cached state in memory
            window.location.href = "/login";
        }
    };

    // Helper to identify current active page route
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-10 py-4 sticky top-0 z-20">
            <div className="w-full flex items-center justify-between flex-wrap gap-4">

                {/* Brand Logo & Title Area */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h1.5l1.5-3 2 6 1.5-3H17" />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
                            Medical Report AI
                        </h1>
                        <span className="text-xs text-teal-600 font-medium">
                            Health Portal
                        </span>
                    </div>
                </Link>

                {/* Center Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-6">
                    <Link
                        to="/"
                        className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                            isActive("/") || isActive("/patient/dashboard")
                                ? "text-teal-700 bg-teal-50 font-bold"
                                : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                        }`}
                    >
                        <span>Dashboard</span>
                    </Link>

                    {/* Render My Reports option only for authenticated users */}
                    {isLoggedIn && (
                        <Link
                            to="/patient/reports"
                            className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                                isActive("/patient/reports")
                                    ? "text-teal-700 bg-teal-50 font-bold"
                                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                            }`}
                        >
                            <span>My Reports</span>
                        </Link>
                    )}
                </div>

                {/* Right Action Area: Profile & Auth Actions */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            {/* Authenticated User Greeting */}
                            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200/60">
                                👋 Hi, {currentUser?.name || "Patient"}
                            </span>

                            {/* Logout Action Button */}
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {loggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Guest Action Links */}
                            <Link
                                to="/login"
                                className="text-sm font-semibold text-teal-600 hover:text-teal-700 px-4 py-2 rounded-xl transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default PatientNavbar;