// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";
// import { showError } from "../../utils/sweetAlert";

// function ReportDetails() {
//     // URL Parameters se report/analysis ID fetch kar rahe hain
//     const { id } = useParams();
//     const navigate = useNavigate();

//     // Component level state management
//     const [analysis, setAnalysis] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     // ================= ANALYZE / GET ANALYSIS FUNCTION =================
//     /**
//      * Report ID ke basis par AI Analysis fetch karne ka function
//      */
//     const loadAnalysis = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             // Backend API call to trigger or fetch report analysis
//             const response = await api.post(`/analysis/${id}`);

//             // State update with response data
//             setAnalysis(response.data.analysis);
//         } catch (error) {
//             console.error("ANALYSIS ERROR:", error);

//             const message =
//                 error.response?.data?.message ||
//                 "Failed to analyze report.";

//             setError(message);

//             // Error alert trigger
//             showError("Analysis Failed", message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ================= LOAD ON PAGE MOUNT =================
//     // Component render hone par automatically analysis fetch karne ke liye
//     useEffect(() => {
//         loadAnalysis();
//     }, [id]);

//     return (
//         <div className="min-h-screen bg-slate-50 w-full p-4 sm:p-8">
//             {/* ================= MAIN CONTAINER ================= */}
//             <main className="max-w-5xl mx-auto">
//                 {/* Back Button & Header Bar */}
//                 <div className="flex items-center justify-between mb-6">
//                     <button
//                         onClick={() => navigate("/patient/reports")}
//                         className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200/80"
//                     >
//                         <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                             />
//                         </svg>
//                         Back to Reports
//                     </button>
//                 </div>

//                 {/* Content Card Wrapper */}
//                 <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
//                     {/* Header Details */}
//                     <div className="flex items-center gap-3 mb-2">
//                         <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100">
//                             <svg
//                                 className="w-6 h-6"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                                 />
//                             </svg>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
//                                 AI Report Analysis
//                             </h2>
//                         </div>
//                     </div>

//                     <p className="text-slate-500 text-sm mt-1">
//                         AI-generated analysis and breakdown of your uploaded medical report.
//                     </p>

//                     {/* ================= LOADING STATE ================= */}
//                     {loading && (
//                         <div className="mt-10 flex flex-col items-center justify-center py-16 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
//                             <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

//                             <p className="mt-4 text-slate-700 font-semibold text-base">
//                                 Analyzing your medical report...
//                             </p>

//                             <p className="text-xs text-slate-400 mt-1">
//                                 Please wait while our AI processes the document parameters.
//                             </p>
//                         </div>
//                     )}

//                     {/* ================= ERROR STATE ================= */}
//                     {!loading && error && (
//                         <div className="mt-8 bg-rose-50 border border-rose-200/80 text-rose-700 rounded-xl p-4 flex items-center gap-3 text-sm">
//                             <svg
//                                 className="w-5 h-5 flex-shrink-0 text-rose-500"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                             </svg>
//                             <span>{error}</span>
//                         </div>
//                     )}

//                     {/* ================= ANALYSIS DISPLAY ================= */}
//                     {!loading && analysis && (
//                         <div className="mt-8 space-y-8">
//                             {/* AI Health Summary Section */}
//                             <section className="space-y-3">
//                                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                                     <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
//                                     AI Health Summary
//                                 </h3>

//                                 <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-5">
//                                     <p className="text-slate-700 text-sm leading-relaxed">
//                                         {analysis.summary}
//                                     </p>
//                                 </div>
//                             </section>

//                             {/* Abnormal Parameters Section */}
//                             <section className="space-y-3">
//                                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                                     <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
//                                     Abnormal Parameters
//                                 </h3>

//                                 {analysis.abnormalValues?.length > 0 ? (
//                                     <div className="space-y-3">
//                                         {analysis.abnormalValues.map(
//                                             (item, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="border border-rose-200/70 bg-rose-50/50 rounded-xl p-5 shadow-xs"
//                                                 >
//                                                     <div className="flex justify-between items-center gap-4 border-b border-rose-100/80 pb-3">
//                                                         <strong className="text-slate-800 font-bold text-base">
//                                                             {item.parameter}
//                                                         </strong>

//                                                         <span className="bg-rose-100 text-rose-700 font-semibold text-xs px-2.5 py-1 rounded-full border border-rose-200">
//                                                             {item.status}
//                                                         </span>
//                                                     </div>

//                                                     <p className="text-slate-700 text-sm mt-3 font-medium">
//                                                         <span className="text-slate-500 font-normal">
//                                                             Detected Value:
//                                                         </span>{" "}
//                                                         {item.value}
//                                                     </p>

//                                                     <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
//                                                         {item.explanation}
//                                                     </p>
//                                                 </div>
//                                             )
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5">
//                                         <p className="text-emerald-800 text-sm font-medium flex items-center gap-2">
//                                             <svg
//                                                 className="w-5 h-5 text-emerald-600 flex-shrink-0"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                 />
//                                             </svg>
//                                             No clearly abnormal values were identified in this report.
//                                         </p>
//                                     </div>
//                                 )}
//                             </section>

//                             {/* AI Recommendations Section */}
//                             <section className="space-y-3">
//                                 <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                                     <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
//                                     Recommendations
//                                 </h3>

//                                 {analysis.recommendations?.length > 0 ? (
//                                     <ul className="space-y-2.5">
//                                         {analysis.recommendations.map(
//                                             (recommendation, index) => (
//                                                 <li
//                                                     key={index}
//                                                     className="flex items-start gap-3 bg-slate-50 border border-slate-200/70 rounded-xl p-4 text-slate-700 text-sm"
//                                                 >
//                                                     <span className="bg-teal-100 text-teal-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                                                         {index + 1}
//                                                     </span>

//                                                     <span className="leading-relaxed">
//                                                         {recommendation}
//                                                     </span>
//                                                 </li>
//                                             )
//                                         )}
//                                     </ul>
//                                 ) : (
//                                     <p className="text-slate-500 text-sm italic">
//                                         No specific recommendations were generated.
//                                     </p>
//                                 )}
//                             </section>

//                             {/* Medical Disclaimer Footer */}
//                             <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
//                                 <svg
//                                     className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                                     />
//                                 </svg>
//                                 <div>
//                                     <strong className="font-bold">Important Medical Note: </strong>
//                                     This AI analysis is for informational purposes only and does not constitute a formal medical diagnosis. Please consult a qualified healthcare professional for proper interpretation of your medical report.
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ReportDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

// Import PatientNavbar component
import PatientNavbar from "../../components/patient/PatientNavbar";

import { showError } from "../../utils/sweetAlert";

function ReportDetails() {
    // Extract report/analysis ID from URL parameters
    const { id } = useParams();
    const navigate = useNavigate();

    // Component level state management
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ================= ANALYZE / GET ANALYSIS FUNCTION =================
    /**
     * Fetches AI Analysis details based on report ID
     */
    const loadAnalysis = async () => {
        try {
            setLoading(true);
            setError("");

            // Backend API call to trigger or fetch report analysis
            const response = await api.post(`/analysis/${id}`);

            // Update state with analysis response data
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("ANALYSIS ERROR:", error);

            const message =
                error.response?.data?.message ||
                "Failed to analyze report.";

            setError(message);

            // Trigger error popup alert
            showError("Analysis Failed", message);
        } finally {
            setLoading(false);
        }
    };

    // ================= LOAD ON PAGE MOUNT =================
    // Fetch analysis automatically when component renders or ID changes
    useEffect(() => {
        loadAnalysis();
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 w-full">
            {/* Top Navigation Component */}
            <PatientNavbar />

            {/* ================= MAIN CONTAINER ================= */}
            <main className="max-w-5xl mx-auto p-4 sm:p-8">
                {/* Back Button & Header Bar */}
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

                {/* Content Card Wrapper */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
                    {/* Header Details */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100">
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                AI Report Analysis
                            </h2>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm mt-1">
                        AI-generated analysis and breakdown of your uploaded medical report.
                    </p>

                    {/* ================= LOADING STATE ================= */}
                    {loading && (
                        <div className="mt-10 flex flex-col items-center justify-center py-16 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

                            <p className="mt-4 text-slate-700 font-semibold text-base">
                                Analyzing your medical report...
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Please wait while our AI processes the document parameters.
                            </p>
                        </div>
                    )}

                    {/* ================= ERROR STATE ================= */}
                    {!loading && error && (
                        <div className="mt-8 bg-rose-50 border border-rose-200/80 text-rose-700 rounded-xl p-4 flex items-center gap-3 text-sm">
                            <svg
                                className="w-5 h-5 flex-shrink-0 text-rose-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* ================= ANALYSIS DISPLAY ================= */}
                    {!loading && analysis && (
                        <div className="mt-8 space-y-8">
                            {/* AI Health Summary Section */}
                            <section className="space-y-3">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    AI Health Summary
                                </h3>

                                <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-5">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {analysis.summary}
                                    </p>
                                </div>
                            </section>

                            {/* Abnormal Parameters Section */}
                            <section className="space-y-3">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                    Abnormal Parameters
                                </h3>

                                {analysis.abnormalValues?.length > 0 ? (
                                    <div className="space-y-3">
                                        {analysis.abnormalValues.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className="border border-rose-200/70 bg-rose-50/50 rounded-xl p-5 shadow-xs"
                                                >
                                                    <div className="flex justify-between items-center gap-4 border-b border-rose-100/80 pb-3">
                                                        <strong className="text-slate-800 font-bold text-base">
                                                            {item.parameter}
                                                        </strong>

                                                        <span className="bg-rose-100 text-rose-700 font-semibold text-xs px-2.5 py-1 rounded-full border border-rose-200">
                                                            {item.status}
                                                        </span>
                                                    </div>

                                                    <p className="text-slate-700 text-sm mt-3 font-medium">
                                                        <span className="text-slate-500 font-normal">
                                                            Detected Value:
                                                        </span>{" "}
                                                        {item.value}
                                                    </p>

                                                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                                                        {item.explanation}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-5">
                                        <p className="text-emerald-800 text-sm font-medium flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5 text-emerald-600 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            No clearly abnormal values were identified in this report.
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* AI Recommendations Section */}
                            <section className="space-y-3">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                    Recommendations
                                </h3>

                                {analysis.recommendations?.length > 0 ? (
                                    <ul className="space-y-2.5">
                                        {analysis.recommendations.map(
                                            (recommendation, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 bg-slate-50 border border-slate-200/70 rounded-xl p-4 text-slate-700 text-sm"
                                                >
                                                    <span className="bg-teal-100 text-teal-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        {index + 1}
                                                    </span>

                                                    <span className="leading-relaxed">
                                                        {recommendation}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-slate-500 text-sm italic">
                                        No specific recommendations were generated.
                                    </p>
                                )}
                            </section>

                            {/* Medical Disclaimer Footer */}
                            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <div>
                                    <strong className="font-bold">Important Medical Note: </strong>
                                    This AI analysis is for informational purposes only and does not constitute a formal medical diagnosis. Please consult a qualified healthcare professional for proper interpretation of your medical report.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ReportDetails;