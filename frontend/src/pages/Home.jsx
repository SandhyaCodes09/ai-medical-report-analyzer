import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between items-center text-slate-800 p-6">
            
            {/* Header / Brand */}
            <div className="w-full max-w-6xl flex justify-between items-center py-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-slate-800">Medical Report AI</span>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm font-semibold text-teal-600 hover:text-teal-700 px-4 py-2 rounded-xl transition"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition shadow-xs"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Main Hero Section */}
            <div className="max-w-3xl text-center py-16">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200 mb-6">
                    🤖 Smart Health Analysis
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
                    AI-Powered Medical Report Analysis
                </h1>
                
                <p className="text-slate-500 text-base sm:text-lg mt-4 leading-relaxed">
                    Upload your clinical reports and let our AI parse abnormal parameters, track health trends, and provide comprehensive medical insights instantly.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition cursor-pointer text-sm"
                    >
                        Create Free Account
                    </button>
                    
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-8 py-3.5 rounded-xl transition cursor-pointer text-sm"
                    >
                        Login to Portal
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-slate-400 py-4 border-t border-slate-200 w-full text-center">
                &copy; Medical Report AI — Secure & HIPAA Compliant Healthcare Portal
            </div>

        </div>
    );
}

export default Home;