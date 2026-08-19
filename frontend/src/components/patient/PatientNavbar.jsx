// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function PatientNavbar({ user }) {
//     const navigate = useNavigate();
//     const [loggingOut, setLoggingOut] = useState(false);

//     const handleLogout = async () => {
//         try {
//             setLoggingOut(true);

//             await api.post("/auth/logout");

//             navigate("/login");
//         } catch (error) {
//             console.error("LOGOUT ERROR:", error);
//             navigate("/login");
//         } finally {
//             setLoggingOut(false);
//         }
//     };

//     return (
//         <nav className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-10 py-4 sticky top-0 z-20">
//             <div className="w-full flex items-center justify-between">

//                 {/* Brand Logo */}
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
//                         <svg
//                             className="w-6 h-6"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2.2"
//                                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                             />
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M9 12h1.5l1.5-3 2 6 1.5-3H17"
//                             />
//                         </svg>
//                     </div>

//                     <div>
//                         <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
//                             Medical Report AI
//                         </h1>

//                         <span className="text-xs text-teal-600 font-medium">
//                             Health Portal
//                         </span>
//                     </div>
//                 </div>

//                 {/* User Profile & Actions */}
//                 <div className="flex items-center gap-4">
//                     <span className="text-sm font-medium text-slate-700">
//                         Hi, {user?.name || "Patient"}
//                     </span>

//                     <button
//                         onClick={handleLogout}
//                         disabled={loggingOut}
//                         className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
//                     >
//                         {loggingOut ? "Logging out..." : "Logout"}
//                     </button>
//                 </div>

//             </div>
//         </nav>
//     );
// }

// export default PatientNavbar;

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../../services/api";

function PatientNavbar({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State to track logout button loading status
    const [loggingOut, setLoggingOut] = useState(false);

    // ================= LOGOUT HANDLER =================
    /**
     * Handles user logout API call and redirects to login route
     */
    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            // Trigger backend logout endpoint
            await api.post("/auth/logout");

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            console.error("LOGOUT ERROR:", error);
            navigate("/login");
        } finally {
            setLoggingOut(false);
        }
    };

    // Helper function to check active path for styling navigation links
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="w-full bg-white border-b border-slate-200/80 px-6 sm:px-10 py-4 sticky top-0 z-20">
            <div className="w-full flex items-center justify-between flex-wrap gap-4">

                {/* Brand Logo & Title Area */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h1.5l1.5-3 2 6 1.5-3H17"
                            />
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
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 sm:gap-6">
                    {/* Dashboard Navigation Link */}
                    <Link
                        to="/patient/dashboard"
                        className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                            isActive("/patient/dashboard")
                                ? "text-teal-700 bg-teal-50 font-bold"
                                : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                        }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span>Dashboard</span>
                    </Link>

                    {/* Reports List Navigation Link */}
                    <Link
                        to="/patient/reports"
                        className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                            isActive("/patient/reports")
                                ? "text-teal-700 bg-teal-50 font-bold"
                                : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                        }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <span>My Reports</span>
                    </Link>
                </div>

                {/* User Profile & Actions */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                        Hi, {user?.name || "Patient"}
                    </span>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default PatientNavbar;