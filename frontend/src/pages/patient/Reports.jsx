import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// Exact PatientNavbar import path
import PatientNavbar from "../../components/patient/PatientNavbar";

import {
    showSuccess,
    showError,
    confirmDelete,
} from "../../utils/sweetAlert";

function Reports() {
    const navigate = useNavigate();

    // ================= STATE MANAGEMENT =================
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= EDIT STATE =================
    const [editingReport, setEditingReport] = useState(null);
    const [newFileName, setNewFileName] = useState("");

    // ================= FETCH REPORTS =================
    const fetchReports = async () => {
        try {
            const response = await api.get("/reports/my-reports");
            setReports(response.data.reports || []);
        } catch (error) {
            console.error("FETCH REPORTS ERROR:", error);

            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }

            showError(
                "Failed to Load Reports",
                error.response?.data?.message ||
                    "Unable to fetch your medical reports."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // ================= EDIT REPORT =================
    const handleEditSave = async (reportId) => {
        if (!newFileName.trim()) {
            showError("Invalid Name", "Please enter a report name.");
            return;
        }

        try {
            await api.put(`/reports/${reportId}`, {
                fileName: newFileName.trim(),
            });

            setReports((prev) =>
                prev.map((report) =>
                    report._id === reportId
                        ? { ...report, fileName: newFileName.trim() }
                        : report
                )
            );

            setEditingReport(null);
            setNewFileName("");

            showSuccess("Updated!", "Report name updated successfully.");
        } catch (error) {
            console.error("EDIT REPORT ERROR:", error);
            showError(
                "Update Failed",
                error.response?.data?.message ||
                    "Failed to update report name."
            );
        }
    };

    // ================= DELETE REPORT =================
    const handleDelete = async (reportId) => {
        try {
            const result = await confirmDelete();
            if (!result.isConfirmed) return;

            await api.delete(`/reports/${reportId}`);

            setReports((prev) =>
                prev.filter((report) => report._id !== reportId)
            );

            await showSuccess("Deleted!", "Medical report deleted successfully.");
        } catch (error) {
            console.error("DELETE REPORT ERROR:", error);
            showError(
                "Delete Failed",
                error.response?.data?.message ||
                    "Failed to delete medical report."
            );
        }
    };

    // ================= STATUS BADGE UTILITY =================
    const getStatusBadge = (status) => {
        const lowerStatus = status?.toLowerCase() || "";

        if (lowerStatus === "analyzed" || lowerStatus === "completed") {
            return "bg-emerald-100 text-emerald-800 border-emerald-300";
        }

        if (lowerStatus === "pending" || lowerStatus === "processing") {
            return "bg-amber-100 text-amber-800 border-amber-300";
        }

        return "bg-slate-100 text-slate-700 border-slate-300";
    };

    // ================= FORMAT DATE UTILITY =================
    const formatDate = (date) => {
        if (!date) return "Unknown date";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // ================= MAIN UI RENDER =================
    return (
        <div className="min-h-screen bg-slate-50 w-full">

            {/* Reusable PatientNavbar Component */}
            <PatientNavbar />

            {/* MAIN CONTENT */}
            <main className="w-full p-6 sm:p-10">

                {/* Page Header Area */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                            My Medical Reports
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Access, manage, and edit all your uploaded medical documents.
                        </p>
                    </div>

                    {/* New Report Upload Button */}
                    <button
                        onClick={() => navigate("/patient/upload-report")}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 text-sm self-start sm:self-auto"
                    >
                        <svg
                            className="w-5 h-5"
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
                        <span>Upload New Report</span>
                    </button>
                </div>

                {/* LOADING STATE */}
                {loading ? (
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-600 text-sm font-medium">
                            Fetching your medical reports...
                        </p>
                    </div>
                ) : reports.length === 0 ? (

                    /* NO REPORTS EMPTY STATE */
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-12 text-center shadow-xl shadow-teal-900/5 max-w-lg mx-auto mt-8">
                        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100">
                            <svg
                                className="w-8 h-8"
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
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                            No Reports Found
                        </h3>

                        <p className="text-slate-500 text-sm mt-2 mb-6">
                            You haven't uploaded any medical reports yet.
                        </p>

                        <button
                            onClick={() => navigate("/patient/upload-report")}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition"
                        >
                            Upload Your First Report
                        </button>
                    </div>

                ) : (

                    /* REPORTS LIST */
                    <div className="grid gap-4">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:border-teal-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                {/* Report Card Info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-11 h-11 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 border border-teal-100/80">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <div className="flex-1">
                                        {/* Inline File Rename Form */}
                                        {editingReport === report._id ? (
                                            <div className="flex items-center gap-2 max-w-md">
                                                <input
                                                    type="text"
                                                    value={newFileName}
                                                    onChange={(e) =>
                                                        setNewFileName(e.target.value)
                                                    }
                                                    className="w-full px-3 py-1.5 border border-teal-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                                                />

                                                <button
                                                    onClick={() => handleEditSave(report._id)}
                                                    className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-700 transition"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingReport(null);
                                                        setNewFileName("");
                                                    }}
                                                    className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-300 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            /* Normal Report Title Display */
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-slate-800 text-base break-all">
                                                    {report.fileName}
                                                </h3>

                                                <button
                                                    onClick={() => {
                                                        setEditingReport(report._id);
                                                        setNewFileName(report.fileName || "");
                                                    }}
                                                    title="Edit report name"
                                                    className="text-slate-400 hover:text-teal-600 transition flex-shrink-0"
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
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        {/* Upload Date Display */}
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Uploaded on{" "}
                                            {formatDate(
                                                report.createdAt || report.uploadedAt
                                            )}
                                        </p>

                                        {/* Dynamic Status Badge */}
                                        <span
                                            className={`inline-block mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${getStatusBadge(
                                                report.status
                                            )}`}
                                        >
                                            {report.status || "Pending"}
                                        </span>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS GROUP */}
                                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">

                                    {/* AI Analysis Route Trigger */}
                                    <button
                                        onClick={() =>
                                            navigate(`/patient/reports/${report._id}`)
                                        }
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-sm shadow-teal-500/20"
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
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        <span>AI Analysis</span>
                                    </button>

                                    {/* Original Document View Link */}
                                    <a
                                        href={`http://localhost:5000${report.fileUrl}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-slate-50 hover:bg-teal-50 text-teal-700 border border-slate-200 hover:border-teal-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
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
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7z"
                                            />
                                        </svg>
                                        <span>Document</span>
                                    </a>

                                    {/* Delete Button Trigger */}
                                    <button
                                        onClick={() => handleDelete(report._id)}
                                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
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
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 01-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Reports;

