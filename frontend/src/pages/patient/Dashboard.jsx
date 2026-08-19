import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

// Import PatientNavbar component
import PatientNavbar from "../../components/patient/PatientNavbar";

function Dashboard() {
    const navigate = useNavigate();

    // ================= STATE MANAGEMENT =================
    // State to store logged-in user profile
    const [user, setUser] = useState(null);
    // State to store reports list
    const [reports, setReports] = useState([]);
    // State to manage loading state
    const [loading, setLoading] = useState(true);
    // State to manage error messages
    const [errorMsg, setErrorMsg] = useState("");

    // ================= FETCH DASHBOARD DATA =================
    /**
     * Safely fetches user profile details and patient reports
     */
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            // 1. Fetch User Profile safely
            try {
                const userResponse = await api.get("/auth/me");
                setUser(userResponse.data?.user || userResponse.data || null);
            } catch (err) {
                console.warn("User profile fetch failed, using guest view:", err);
            }

            // 2. Fetch Reports safely
            try {
                const reportsResponse = await api.get("/reports/my-reports");
                setReports(reportsResponse.data?.reports || reportsResponse.data || []);
            } catch (err) {
                console.error("Reports fetch error:", err);
            }

        } catch (error) {
            console.error("DASHBOARD ERROR:", error);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Derived statistics calculation
    const totalReports = reports.length;
    
    // Calculate Analyzed / Completed reports count
    const analyzedCount = reports.filter((r) => {
        const status = r.status?.toLowerCase() || "";
        return status === "analyzed" || status === "completed";
    }).length;

    // Calculate Pending / Processing / Uploaded reports count
    const pendingCount = reports.filter((r) => {
        const status = r.status?.toLowerCase() || "";
        return (
            status === "pending" || 
            status === "processing" || 
            status === "uploaded" || 
            !status
        );
    }).length;

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 w-full relative flex flex-col font-sans">
            
            {/* Top Navigation Component */}
            <PatientNavbar user={user} />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-8xl mx-auto p-4 sm:p-8">

                {/* Error Banner Notification */}
                {errorMsg && (
                    <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{errorMsg}</span>
                        </div>
                        <button onClick={fetchDashboardData} className="text-xs font-bold underline cursor-pointer hover:text-amber-900">
                            Retry
                        </button>
                    </div>
                )}

                {/* HERO BANNER SECTION */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white p-8 sm:p-12 shadow-xl shadow-teal-600/10 mb-8">
                    
                    {/* Background Pattern Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
                    
                    {/* Background Medical Heartbeat SVG Illustration */}
                    <div className="absolute -right-8 -bottom-10 opacity-20 pointer-events-none hidden sm:block">
                        <svg className="w-96 h-96 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-md mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                            AI Diagnostic Portal Active
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Welcome back,{" "}
                            <span className="text-teal-100">
                                {user?.name || "Patient"}
                            </span> 👋
                        </h1>

                        <p className="text-teal-50 text-sm sm:text-base mt-3 leading-relaxed opacity-90">
                            Upload your clinical test reports to instantly analyze abnormal parameter values and receive AI-guided health insights.
                        </p>

                        {/* Action Callout Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => navigate("/patient/upload-report")}
                                className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Upload New Report</span>
                            </button>

                            <button
                                onClick={() => navigate("/patient/reports")}
                                className="bg-teal-800/40 hover:bg-teal-800/60 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl transition-all text-sm backdrop-blur-md cursor-pointer"
                            >
                                View My Reports
                            </button>
                        </div>
                    </div>
                </div>

                {/* METRICS STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    
                    {/* Total Documents Metric Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-teal-400 transition-all duration-200">
                        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-100 flex-shrink-0">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Documents</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-0.5">{loading ? "..." : totalReports}</h3>
                        </div>
                    </div>

                    {/* Analyzed Reports Metric Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-emerald-400 transition-all duration-200">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 flex-shrink-0">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Analyzed Reports</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-0.5">{loading ? "..." : analyzedCount}</h3>
                        </div>
                    </div>

                    {/* Pending Reports Metric Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center gap-4 hover:border-amber-400 transition-all duration-200">
                        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 flex-shrink-0">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Analysis</p>
                            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mt-0.5">{loading ? "..." : pendingCount}</h3>
                        </div>
                    </div>

                </div>

                {/* RECENT DOCUMENTS SECTION (DISPLAYING MAXIMUM 2 DOCUMENTS) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Recent Medical Documents</h2>
                            <p className="text-slate-500 text-xs mt-0.5">Showing latest 2 documents</p>
                        </div>

                        <Link
                            to="/patient/reports"
                            className="text-teal-600 hover:text-teal-700 text-xs font-bold transition flex items-center gap-1"
                        >
                            <span>View All</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-slate-400 text-sm">Fetching recent documents...</div>
                    ) : reports.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-slate-600 font-semibold text-sm">No medical reports found</p>
                            <p className="text-slate-400 text-xs mt-1">Upload a medical report to start AI analysis.</p>
                            <button
                                onClick={() => navigate("/patient/upload-report")}
                                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer"
                            >
                                Upload Report
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {/* Slice array to limit view to maximum 2 items */}
                            {reports.slice(0, 2).map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-teal-300 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white text-teal-600 rounded-xl flex items-center justify-center border border-slate-200 shadow-xs">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{report.fileName}</h4>
                                            <span className="text-[11px] text-slate-400">
                                                Uploaded on {new Date(report.createdAt || report.uploadedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/patient/reports/${report._id}`)}
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
                                    >
                                        View Analysis
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

export default Dashboard;

