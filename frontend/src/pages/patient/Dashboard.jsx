import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import PatientNavbar from "../../components/patient/PatientNavbar";
import PatientFooter from "../../components/patient/PatientFooter";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    // ================= FETCH DASHBOARD DATA =================

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            // Fetch logged-in user
            try {
                const userResponse = await api.get("/auth/me");

                setUser(
                    userResponse.data?.user ||
                    userResponse.data ||
                    null
                );
            } catch (err) {
                console.warn("User profile fetch failed:", err);
            }

            // Fetch patient reports
            try {
                const reportsResponse = await api.get("/reports/my-reports");

                setReports(
                    reportsResponse.data?.reports ||
                    reportsResponse.data ||
                    []
                );
            } catch (err) {
                console.error("Reports fetch error:", err);
                setErrorMsg("Unable to load your medical reports.");
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

    // ================= STATISTICS =================

    const totalReports = reports.length;

    const analyzedCount = reports.filter((report) => {
        const status = report.status?.toLowerCase() || "";

        return (
            status === "analyzed" ||
            status === "completed"
        );
    }).length;

    const pendingCount = reports.filter((report) => {
        const status = report.status?.toLowerCase() || "";

        return (
            status === "pending" ||
            status === "processing" ||
            status === "uploaded" ||
            !status
        );
    }).length;

    // ================= HELPERS =================

    const getStatus = (status) => {
        const currentStatus = status?.toLowerCase();

        if (
            currentStatus === "analyzed" ||
            currentStatus === "completed"
        ) {
            return {
                label: "Analyzed",
                className:
                    "bg-emerald-50 text-emerald-700 border-emerald-200",
            };
        }

        if (currentStatus === "processing") {
            return {
                label: "Processing",
                className:
                    "bg-blue-50 text-blue-700 border-blue-200",
            };
        }

        return {
            label: "Pending",
            className:
                "bg-amber-50 text-amber-700 border-amber-200",
        };
    };

    // ================= UI =================

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

            {/* ================= NAVBAR ================= */}

            <PatientNavbar user={user} />

            {/* ================= MAIN ================= */}

            <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* ================= ERROR ================= */}

                {errorMsg && (
                    <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">

                                <svg
                                    className="w-5 h-5 text-amber-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 1.732z"
                                    />
                                </svg>

                            </div>

                            <span>{errorMsg}</span>

                        </div>

                        <button
                            onClick={fetchDashboardData}
                            className="font-bold underline hover:text-amber-950 cursor-pointer"
                        >
                            Retry
                        </button>

                    </div>
                )}

                {/* =====================================================
                    HERO SECTION
                ===================================================== */}

                <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-cyan-700 to-teal-800 text-white shadow-2xl shadow-teal-900/10">

                    {/* Decorative circles */}

                    <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>

                    <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-cyan-300/10 blur-3xl"></div>

                    {/* Medical background icon */}

                    <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.08] hidden lg:block">

                        <svg
                            className="w-[330px] h-[330px]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="0.7"
                                d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2.1 0 3.8 1.2 5.5 3.1C13.7 6.2 15.4 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z"
                            />

                            <path
                                strokeWidth="0.8"
                                d="M4 12h3l1.5-3 2.5 6 2-4 1.5 2H20"
                            />
                        </svg>

                    </div>

                    <div className="relative z-10 p-7 sm:p-10 lg:p-12">

                        {/* Brand badge */}

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-semibold">

                            <span className="relative flex h-2.5 w-2.5">

                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>

                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300"></span>

                            </span>

                            MediSense AI • Health Intelligence

                        </div>

                        {/* Heading */}

                        <h1 className="mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">

                            Welcome back,{" "}

                            <span className="text-cyan-100">
                                {user?.name || "Patient"}
                            </span>

                            <span className="ml-2">👋</span>

                        </h1>

                        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-teal-50/90">

                            Understand your medical reports with the power of AI.
                            Upload a report and get clear, easy-to-understand
                            health insights in seconds.

                        </p>

                        {/* Buttons */}

                        <div className="mt-8 flex flex-wrap gap-3">

                            <button
                                onClick={() =>
                                    navigate("/patient/upload-report")
                                }
                                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-teal-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-50 cursor-pointer"
                            >

                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100">

                                    <svg
                                        className="w-4 h-4 text-teal-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>

                                </span>

                                Upload New Report

                            </button>

                            <button
                                onClick={() =>
                                    navigate("/patient/reports")
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 cursor-pointer"
                            >

                                View My Reports

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
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>

                            </button>

                        </div>

                        {/* Small trust indicators */}

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-teal-100/80">

                            <span className="flex items-center gap-1.5">
                                <span className="text-emerald-300">✓</span>
                                AI-powered analysis
                            </span>

                            <span className="flex items-center gap-1.5">
                                <span className="text-emerald-300">✓</span>
                                Easy-to-understand insights
                            </span>

                            <span className="flex items-center gap-1.5">
                                <span className="text-emerald-300">✓</span>
                                Secure report management
                            </span>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    STATISTICS
                ===================================================== */}

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mt-6">

                    {/* Total */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex items-center justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">

                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>

                            </div>

                            <span className="text-xs font-medium text-slate-400">
                                All time
                            </span>

                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Total Reports
                        </p>

                        <h3 className="mt-1 text-3xl font-extrabold text-slate-800">
                            {loading ? "..." : totalReports}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Medical documents uploaded
                        </p>

                    </div>

                    {/* Analyzed */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex items-center justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                            </div>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                                COMPLETED
                            </span>

                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            AI Analyzed
                        </p>

                        <h3 className="mt-1 text-3xl font-extrabold text-emerald-600">
                            {loading ? "..." : analyzedCount}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Reports successfully analyzed
                        </p>

                    </div>

                    {/* Pending */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex items-center justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                            </div>

                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                                IN QUEUE
                            </span>

                        </div>

                        <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Pending Analysis
                        </p>

                        <h3 className="mt-1 text-3xl font-extrabold text-amber-600">
                            {loading ? "..." : pendingCount}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Reports waiting for analysis
                        </p>

                    </div>

                </section>

                {/* =====================================================
                    QUICK ACTIONS + HEALTH INFO
                ===================================================== */}

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">

                    {/* Quick Actions */}

                    <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5">

                            <h2 className="text-lg font-extrabold text-slate-800">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Manage your health reports quickly
                            </p>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            <button
                                onClick={() =>
                                    navigate("/patient/upload-report")
                                }
                                className="group rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-left transition-all hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50 cursor-pointer"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm">

                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-sm font-bold text-slate-800">
                                    Upload Report
                                </h3>

                                <p className="mt-1 text-[11px] text-slate-500">
                                    Start a new AI analysis
                                </p>

                            </button>

                            <button
                                onClick={() =>
                                    navigate("/patient/reports")
                                }
                                className="group rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-left transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">

                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-sm font-bold text-slate-800">
                                    My Reports
                                </h3>

                                <p className="mt-1 text-[11px] text-slate-500">
                                    View all your reports
                                </p>

                            </button>

                            <button
                                onClick={() =>
                                    navigate("/patient/profile")
                                }
                                className="group rounded-xl border border-violet-100 bg-violet-50/60 p-4 text-left transition-all hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 cursor-pointer"
                            >

                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">

                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>

                                </div>

                                <h3 className="text-sm font-bold text-slate-800">
                                    My Profile
                                </h3>

                                <p className="mt-1 text-[11px] text-slate-500">
                                    Manage your information
                                </p>

                            </button>

                        </div>

                    </div>

                    {/* AI Health Insight */}

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">

                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl"></div>

                        <div className="relative z-10">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">

                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-6.364l-.707-.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>

                                </div>

                                <div>

                                    <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300">
                                        AI Health Insight
                                    </p>

                                    <h3 className="text-sm font-bold">
                                        Understand your reports
                                    </h3>

                                </div>

                            </div>

                            <p className="mt-5 text-sm leading-6 text-slate-300">

                                AI analysis can help you understand medical
                                report values, identify unusual parameters,
                                and provide general health insights.

                            </p>

                            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">

                                <p className="text-[11px] leading-5 text-slate-400">

                                    <span className="font-bold text-teal-300">
                                        Note:
                                    </span>{" "}
                                    AI insights are for informational purposes
                                    and should not replace professional medical
                                    advice.

                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            {/* =====================================================
    RECENT REPORTS
===================================================== */}

<section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    <div className="mb-6 flex items-center justify-between">

        <div>
            <h2 className="text-lg font-extrabold text-slate-800">
                Recent Medical Reports
            </h2>

            <p className="mt-1 text-xs text-slate-500">
                Showing your 2 most recent medical reports
            </p>
        </div>

        <Link
            to="/patient/reports"
            className="flex items-center gap-1 text-xs font-bold text-teal-600 transition hover:text-teal-700"
        >
            View All

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
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </Link>

    </div>

    {/* ================= LOADING ================= */}

    {loading ? (

        <div className="space-y-3">

            {[1, 2].map((item) => (
                <div
                    key={item}
                    className="animate-pulse rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                    <div className="flex items-center gap-4">

                        <div className="h-11 w-11 rounded-xl bg-slate-200"></div>

                        <div className="flex-1">

                            <div className="h-3 w-40 rounded bg-slate-200"></div>

                            <div className="mt-2 h-2 w-24 rounded bg-slate-200"></div>

                        </div>

                        <div className="h-8 w-24 rounded-lg bg-slate-200"></div>

                    </div>
                </div>
            ))}

        </div>

    ) : reports.length === 0 ? (

        /* ================= EMPTY STATE ================= */

        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">

                <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l-5.414-5.414A1 1 0 0112.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>

            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-700">
                No medical reports yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Upload your first medical report and let
                MediSense AI help you understand it.
            </p>

            <button
                onClick={() =>
                    navigate("/patient/upload-report")
                }
                className="mt-5 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md cursor-pointer"
            >
                Upload Your First Report
            </button>

        </div>

    ) : (

        /* ================= ONLY 2 RECENT REPORTS ================= */

        <div className="space-y-3">

            {reports.slice(0, 2).map((report) => {

                const status = getStatus(report.status);

                return (
                    <div
                        key={report._id}
                        className="group flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-teal-200 hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >

                        {/* REPORT INFO */}

                        <div className="flex min-w-0 items-center gap-4">

                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-white text-teal-600 shadow-sm">

                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>

                            </div>

                            <div className="min-w-0">

                                <h3 className="truncate text-sm font-bold text-slate-800">
                                    {report.fileName}
                                </h3>

                                <div className="mt-1 flex flex-wrap items-center gap-2">

                                    <span className="text-[11px] text-slate-400">
                                        Uploaded{" "}
                                        {new Date(
                                            report.createdAt ||
                                            report.uploadedAt
                                        ).toLocaleDateString()}
                                    </span>

                                    <span className="text-slate-300">
                                        •
                                    </span>

                                    <span
                                        className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${status.className}`}
                                    >
                                        {status.label}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* VIEW ANALYSIS */}

                        <button
                            onClick={() =>
                                navigate(
                                    `/patient/reports/${report._id}`
                                )
                            }
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700 cursor-pointer"
                        >
                            View Analysis

                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>

                        </button>

                    </div>
                );
            })}

        </div>
    )}

</section>

                {/* ================= FOOTER INFO ================= */}

                {/* <div className="mt-6 pb-4 text-center">

                    <p className="text-[11px] text-slate-400">
                        MediSense AI • Intelligent Medical Report Analysis
                    </p>

                </div> */}

            </main>
            <PatientFooter />


        </div>
    );
}

export default Dashboard;