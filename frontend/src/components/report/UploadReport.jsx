import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// Import PatientNavbar component
import PatientNavbar from "../../components/patient/PatientNavbar";

// Import SweetAlert utilities
import {
    showSuccess,
    showError,
} from "../../utils/sweetAlert";

function UploadReport() {
    const navigate = useNavigate();

    // ================= STATE MANAGEMENT =================
    // State to store authenticated user profile
    const [user, setUser] = useState(null);
    // State to store the selected file
    const [file, setFile] = useState(null);
    // State to track form loading/processing status
    const [loading, setLoading] = useState(false);
    // State for success feedback messages
    const [message, setMessage] = useState("");
    // State for error feedback messages
    const [error, setError] = useState("");

    // Dynamic login authentication check
    const isLoggedIn = Boolean(user && (user._id || user.name || user.email));

    // ================= FETCH USER PROFILE =================
    /**
     * Checks authenticated user session on page load
     */
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/auth/me");
                setUser(response.data?.user || response.data || null);
            } catch (err) {
                console.warn("User profile fetch failed in upload page:", err);
                setUser(null);
            }
        };

        fetchUserProfile();
    }, []);

    // ================= FILE CHANGE HANDLER =================
    /**
     * Handles file selection and validates file type & size
     */
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        setError("");
        setMessage("");

        // Reset file state if selection is canceled
        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Allowed document & image MIME types
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg",
        ];

        // Validation 1: File Format Check
        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Only PDF, JPG, JPEG and PNG files are allowed.");
            setFile(null);
            return;
        }

        // Validation 2: Maximum Size Limit (5 MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5 MB.");
            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    // ================= FILE UPLOAD SUBMIT HANDLER =================
    /**
     * Constructs multipart form data and posts it to the server
     */
    const handleUpload = async (e) => {
        e.preventDefault();

        // Guest Guard Check: Trigger popup alert if user is not logged in
        if (!isLoggedIn) {
            showError(
                "Access Restricted",
                "Please register or login first to upload medical reports."
            );
            return;
        }

        // Validation Check: Ensure a file is selected
        if (!file) {
            setError("Please select a medical report.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            // Construct Multipart FormData payload
            const formData = new FormData();
            formData.append("report", file);

            // Send request to API endpoint
            await api.post("/reports/upload", formData);

            // Display success alert
            showSuccess(
                "Report Uploaded!",
                "Your medical report has been uploaded successfully."
            );
            setFile(null);

            // Redirect to reports list after successful upload
            setTimeout(() => {
                navigate("/patient/reports");
            }, 1000);

        } catch (error) {
            console.error("UPLOAD ERROR:", error);
            
            // Display error alert
            showError(
                "Upload Failed",
                error.response?.data?.message ||
                    "Failed to upload medical report."
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= MAIN UI RENDER =================
    return (
        <div className="min-h-screen bg-slate-50 w-full">
            {/* Top Navigation Component */}
            <PatientNavbar user={user} />

            {/* Main Content Container */}
            <main className="w-full p-6 sm:p-10 flex justify-center items-center">
                <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-teal-900/5 border border-slate-200/80 p-6 sm:p-8">

                    {/* Back Button Section */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigate("/patient/reports")}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200/80 cursor-pointer"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Reports
                        </button>
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl mb-3 border border-teal-100">
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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Upload Medical Report
                        </h2>

                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Upload your medical document in PDF or image format for AI analysis.
                        </p>
                    </div>

                    {/* Error Alert Banner */}
                    {error && (
                        <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 px-4 py-3 text-xs sm:text-sm flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-rose-500 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Alert Banner */}
                    {message && (
                        <div className="mb-5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-4 py-3 text-xs sm:text-sm flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-emerald-500 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Upload Form */}
                    <form onSubmit={handleUpload}>
                        <label className="block group">
                            {/* File Drag & Drop Dropzone */}
                            <div
                                className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition cursor-pointer flex flex-col items-center justify-center gap-3 ${
                                    file
                                        ? "border-teal-500 bg-teal-50/30"
                                        : "border-slate-300 hover:border-teal-500 bg-slate-50/50 hover:bg-teal-50/20"
                                }`}
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-center text-teal-600 group-hover:scale-110 transition duration-200">
                                    <svg
                                        className="w-7 h-7"
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

                                <div>
                                    <p className="font-semibold text-slate-800 text-sm sm:text-base">
                                        {file ? file.name : "Choose your medical report"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        PDF, JPG, JPEG or PNG — Maximum 5 MB
                                    </p>
                                </div>

                                {/* Hidden HTML File Input */}
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </label>

                        {/* Submit Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Uploading & Processing...
                                </>
                            ) : (
                                "Upload Report"
                            )}
                        </button>
                    </form>

                    {/* Compliance & Security Footer */}
                    <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 border-t border-slate-100 pt-4">
                        <svg
                            className="w-3.5 h-3.5 text-teal-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        <span>256-Bit Encrypted & HIPAA Compliant</span>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default UploadReport;
