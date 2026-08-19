// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Dashboard from "./pages/patient/Dashboard";
// import Reports from "./pages/patient/Reports";
// import ReportDetails from "./pages/patient/ReportDetails";
// import UploadReport from "./components/report/UploadReport";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Navigate to="/patient/dashboard" replace />}
//                 />

//                 <Route
//                     path="/login"
//                     element={<Login />}
//                 />

//                 <Route
//                     path="/register"
//                     element={<Register />}
//                 />

//                 <Route
//                     path="/patient/dashboard"
//                     element={<Dashboard />}
//                 />

//                 <Route
//                     path="/patient/reports"
//                     element={<Reports />}
//                 />

//                 <Route
//                     path="/patient/reports/:id"
//                     element={<ReportDetails />}
//                 />

//                 <Route
//                     path="/patient/upload-report"
//                     element={<UploadReport />}
//                 />

//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

// Lazy loading pages for better performance and smooth load
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Dashboard = lazy(() => import("./pages/patient/Dashboard"));
const Reports = lazy(() => import("./pages/patient/Reports"));
const ReportDetails = lazy(() => import("./pages/patient/ReportDetails"));
const UploadReport = lazy(() => import("./components/report/UploadReport"));

// Smooth Medical Loader Component
const LoadingSpinner = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            <div className="absolute w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
        </div>
        <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase animate-pulse">
            Loading Medical Portal...
        </p>
    </div>
);

// Custom 404 Not Found Page
const NotFound = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-teal-900/5">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800">Page Not Found</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 mb-6">
                The medical record or page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/patient/dashboard"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-6 py-3 rounded-xl transition shadow-md shadow-teal-500/20"
            >
                Return to Dashboard
            </Link>
        </div>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            {/* Suspense handles smooth page loading fallbacks */}
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* Default Route Redirect */}
                    <Route
                        path="/"
                        element={<Navigate to="/patient/dashboard" replace />}
                    />

                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Patient Portal Routes */}
                    <Route path="/patient/dashboard" element={<Dashboard />} />
                    <Route path="/patient/reports" element={<Reports />} />
                    <Route path="/patient/reports/:id" element={<ReportDetails />} />
                    <Route path="/patient/upload-report" element={<UploadReport />} />

                    {/* Fallback 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;