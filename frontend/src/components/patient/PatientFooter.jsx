function PatientFooter() {
    return (
        <footer className="mt-10 bg-slate-950 text-white overflow-hidden">

            <div className="max-w-[1500px] mx-auto px-6 lg:px-8 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* ================= BRAND ================= */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center">

                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2.1 0 3.8 1.2 5.5 3.1C13.7 6.2 15.4 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z"
                                    />
                                </svg>

                            </div>

                            <div>

                                <h2 className="font-extrabold text-base">
                                    MediSense{" "}
                                    <span className="text-teal-400">
                                        AI
                                    </span>
                                </h2>

                                <p className="text-[10px] text-slate-600 mt-0.5">
                                    Smart Healthcare Intelligence
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ================= CENTER ================= */}

                    <div className="text-center">

                        <p className="text-xs text-slate-400">
                            Understand your health.
                        </p>

                        <p className="mt-1 text-xs font-semibold text-teal-400">
                            Powered by Artificial Intelligence.
                        </p>

                    </div>

                    {/* ================= SYSTEM STATUS ================= */}

                    <div className="flex justify-center md:justify-end">

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">

                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>

                            <div>

                                <p className="text-[10px] font-bold text-slate-300">
                                    SYSTEM STATUS
                                </p>

                                <p className="text-[10px] text-emerald-400">
                                    All systems operational
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= BOTTOM ================= */}

                <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2">

                    <p className="text-[10px] text-slate-600">
                        © {new Date().getFullYear()} MediSense AI
                    </p>

                    <p className="text-[10px] text-slate-600">
                        AI-Powered Medical Report Analysis
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default PatientFooter;