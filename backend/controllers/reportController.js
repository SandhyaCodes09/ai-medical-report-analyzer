// const Report = require("../models/Report");

// const extractReportText = require("../utils/reportTextExtractor");

// const { analyzeMedicalReport } = require("../services/geminiService");

// // ================= UPLOAD REPORT =================

// const uploadReport = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 message: "Please upload a medical report",
//             });
//         }

//         // Extract text from PDF/Image
//         const extractedText = await extractReportText(
//             req.file.path,
//             req.file.mimetype
//         );

//         // ================= GEMINI AI ANALYSIS =================

//         let aiAnalysis = "";

//         if (extractedText && extractedText.trim()) {
//             aiAnalysis = await analyzeMedicalReport(extractedText);
//         }

//         // ================= SAVE REPORT =================

//         const report = await Report.create({
//             patient: req.user.userId,
//             fileName: req.file.originalname,
//             fileUrl: `/uploads/${req.file.filename}`,
//             reportType: "Medical Report",
//             status: "analyzed",
//             extractedText: extractedText || "",
//             aiAnalysis: aiAnalysis || "",
//         });

//         // ================= RESPONSE =================

//         res.status(201).json({
//             message: "Medical report analyzed successfully",
//             report,
//         });

//     } catch (error) {
//         console.error("Upload Report Error:", error);

//         res.status(500).json({
//             message: "Failed to process medical report",
//             error: error.message,
//         });
//     }
// };

// // ================= GET MY REPORTS =================

// const getMyReports = async (req, res) => {
//     try {
//         const reports = await Report.find({
//             patient: req.user.userId,
//         }).sort({ createdAt: -1 });

//         res.status(200).json({
//             reports,
//         });

//     } catch (error) {
//         console.error("Get Reports Error:", error);

//         res.status(500).json({
//             message: "Failed to fetch reports",
//         });
//     }
// };

// module.exports = {
//     uploadReport,
//     getMyReports,
// };

// ==============================================
// const Report = require("../models/Report");

// const extractReportText = require("../utils/reportTextExtractor");

// // ================= UPLOAD REPORT =================

// const uploadReport = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 message: "Please upload a medical report",
//             });
//         }

//         // Extract text from PDF/Image
//         const extractedText = await extractReportText(
//             req.file.path,
//             req.file.mimetype
//         );

//         // ================= SAVE REPORT =================

//         const report = await Report.create({
//             patient: req.user.userId,
//             fileName: req.file.originalname,
//             fileUrl: `/uploads/${req.file.filename}`,
//             reportType: "Medical Report",
//             status: "uploaded",
//             extractedText: extractedText || "",
//         });

//         // ================= RESPONSE =================

//         res.status(201).json({
//             message: "Medical report uploaded successfully",
//             report,
//         });

//     } catch (error) {
//         console.error("Upload Report Error:", error);

//         res.status(500).json({
//             message: "Failed to process medical report",
//             error: error.message,
//         });
//     }
// };

// // ================= GET MY REPORTS =================

// const getMyReports = async (req, res) => {
//     try {
//         const reports = await Report.find({
//             patient: req.user.userId,
//         }).sort({ createdAt: -1 });

//         res.status(200).json({
//             reports,
//         });

//     } catch (error) {
//         console.error("Get Reports Error:", error);

//         res.status(500).json({
//             message: "Failed to fetch reports",
//         });
//     }
// };

// module.exports = {
//     uploadReport,
//     getMyReports,
// };

const Report = require("../models/Report");
const extractReportText = require("../utils/reportTextExtractor");
const fs = require("fs");
const path = require("path");

// ================= UPLOAD REPORT =================

const uploadReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a medical report",
            });
        }

        // Extract text from PDF/Image
        const extractedText = await extractReportText(
            req.file.path,
            req.file.mimetype
        );

        // Save report
        const report = await Report.create({
            patient: req.user.userId,
            fileName: req.file.originalname,
            fileUrl: `/uploads/${req.file.filename}`,
            reportType: "Medical Report",
            status: "uploaded",
            extractedText: extractedText || "",
        });

        res.status(201).json({
            message: "Medical report uploaded successfully",
            report,
        });

    } catch (error) {
        console.error("Upload Report Error:", error);

        res.status(500).json({
            message: "Failed to process medical report",
            error: error.message,
        });
    }
};

// ================= GET MY REPORTS =================

const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({
            patient: req.user.userId,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            reports,
        });

    } catch (error) {
        console.error("Get Reports Error:", error);

        res.status(500).json({
            message: "Failed to fetch reports",
        });
    }
};

// ================= EDIT REPORT NAME =================

const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName } = req.body;

        if (!fileName || !fileName.trim()) {
            return res.status(400).json({
                message: "Report name is required",
            });
        }

        const report = await Report.findOne({
            _id: id,
            patient: req.user.userId,
        });

        if (!report) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        report.fileName = fileName.trim();

        await report.save();

        res.status(200).json({
            message: "Report name updated successfully",
            report,
        });

    } catch (error) {
        console.error("Update Report Error:", error);

        res.status(500).json({
            message: "Failed to update report",
            error: error.message,
        });
    }
};

// ================= DELETE REPORT =================

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;

        // Find report belonging to logged-in patient
        const report = await Report.findOne({
            _id: id,
            patient: req.user.userId,
        });

        if (!report) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        // ================= DELETE FILE =================

        if (report.fileUrl) {
            const filePath = path.join(
                __dirname,
                "..",
                report.fileUrl.replace(/^\/+/, "")
            );

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // ================= DELETE DATABASE RECORD =================

        await Report.findByIdAndDelete(id);

        res.status(200).json({
            message: "Report deleted successfully",
        });

    } catch (error) {
        console.error("Delete Report Error:", error);

        res.status(500).json({
            message: "Failed to delete report",
            error: error.message,
        });
    }
};

// ================= EXPORT =================

module.exports = {
    uploadReport,
    getMyReports,
    updateReport,
    deleteReport,
};