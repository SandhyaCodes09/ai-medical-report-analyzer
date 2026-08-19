// const { GoogleGenAI } = require("@google/genai");
// const Report = require("../models/Report");
// const Analysis = require("../models/Analysis");
// const path = require("path");
// const extractPdfText = require("../utils/pdfExtractor");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// // ================= ANALYZE REPORT =================

// const analyzeReport = async (req, res) => {
//     try {
//         const { reportId } = req.params;

//         // Find report belonging to logged-in patient
//         const report = await Report.findOne({
//             _id: reportId,
//             patient: req.user.userId,
//         });

//         if (!report) {
//             return res.status(404).json({
//                 message: "Report not found",
//             });
//         }

//         // Get actual file path
//         const filePath = path.join(
//             __dirname,
//             "..",
//             report.fileUrl
//         );

//         let reportText = "";

//         // Currently PDF analysis
//         if (
//             report.fileName
//                 .toLowerCase()
//                 .endsWith(".pdf")
//         ) {
//             reportText = await extractPdfText(filePath);
//         } else {
//             return res.status(400).json({
//                 message:
//                     "Currently only PDF reports are supported. Image OCR will be added next.",
//             });
//         }

//         if (!reportText.trim()) {
//             return res.status(400).json({
//                 message:
//                     "Could not extract text from this report.",
//             });
//         }

//         // ================= GEMINI PROMPT =================

//         const prompt = `
// You are an AI medical report analysis assistant.

// Analyze the following medical report.

// Return ONLY valid JSON in this exact structure:

// {
//   "summary": "short and simple summary",
//   "abnormalValues": [
//     {
//       "parameter": "parameter name",
//       "value": "reported value",
//       "status": "High or Low or Abnormal",
//       "explanation": "simple explanation"
//     }
//   ],
//   "recommendations": [
//     "recommendation 1",
//     "recommendation 2"
//   ]
// }

// Rules:

// 1. Do not diagnose diseases.
// 2. Do not claim certainty.
// 3. Explain abnormal values in simple language.
// 4. Only mention values that are actually present in the report.
// 5. If no clearly abnormal value is found, return an empty abnormalValues array.
// 6. Recommendations should encourage consultation with a qualified healthcare professional when appropriate.
// 7. Return JSON only.

// Medical Report:

// ${reportText}
// `;

//         // ================= GEMINI =================

//         const response = await ai.models.generateContent({
//             model: "gemini-3.6-flash",
//             contents: prompt,
//             config: {
//                 temperature: 0.2,
//             },
//         });

//         const aiText = response.text;

//         console.log("GEMINI RESPONSE:", aiText);

//         // Remove markdown code fences if Gemini returns them
//         const cleanedText = aiText
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim();

//         const aiResult = JSON.parse(cleanedText);

//         // ================= SAVE ANALYSIS =================

//         const analysis = await Analysis.findOneAndUpdate(
//             {
//                 report: report._id,
//                 patient: req.user.userId,
//             },
//             {
//                 report: report._id,
//                 patient: req.user.userId,
//                 summary: aiResult.summary || "",
//                 abnormalValues:
//                     aiResult.abnormalValues || [],
//                 recommendations:
//                     aiResult.recommendations || [],
//             },
//             {
//                 new: true,
//                 upsert: true,
//             }
//         );

//         // Update report status
//         report.status = "analyzed";
//         await report.save();

//         res.status(200).json({
//             message:
//                 "Report analyzed successfully",
//             analysis,
//         });
//     } catch (error) {
//         console.error(
//             "Analyze Report Error:",
//             error
//         );

//         res.status(500).json({
//             message:
//                 "Failed to analyze medical report",
//             error:
//                 process.env.NODE_ENV === "development"
//                     ? error.message
//                     : undefined,
//         });
//     }
// };

// module.exports = {
//     analyzeReport,
// };

// ==========================================

// const { GoogleGenAI } = require("@google/genai");
// const Report = require("../models/Report");
// const Analysis = require("../models/Analysis");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// // ================= ANALYZE REPORT =================

// const analyzeReport = async (req, res) => {
//     try {
//         const { reportId } = req.params;

//         // ================= FIND REPORT =================

//         const report = await Report.findOne({
//             _id: reportId,
//             patient: req.user.userId,
//         });

//         if (!report) {
//             return res.status(404).json({
//                 message: "Report not found",
//             });
//         }

//         console.log("================================");
//         console.log("ANALYZING REPORT:", report.fileName);
//         console.log("REPORT ID:", report._id);
//         console.log("================================");

//         // ================= GET EXTRACTED TEXT =================
//         // PDF -> pdf-parse
//         // Image -> Tesseract OCR
//         // Both are already extracted during upload

//         const reportText = report.extractedText || "";

//         console.log("EXTRACTED TEXT FOR AI:");
//         console.log(reportText);

//         if (!reportText.trim()) {
//             return res.status(400).json({
//                 message:
//                     "Could not extract text from this report. Please upload a clear PDF or image.",
//             });
//         }

//         // ================= GEMINI PROMPT =================

//         const prompt = `
// You are an AI medical report analysis assistant.

// Analyze the following medical report.

// Return ONLY valid JSON in this exact structure:

// {
//   "summary": "short and simple summary",
//   "abnormalValues": [
//     {
//       "parameter": "parameter name",
//       "value": "reported value",
//       "status": "High or Low or Abnormal",
//       "explanation": "simple explanation"
//     }
//   ],
//   "recommendations": [
//     "recommendation 1",
//     "recommendation 2"
//   ]
// }

// Rules:

// 1. Do not diagnose diseases.
// 2. Do not claim certainty.
// 3. Explain abnormal values in simple language.
// 4. Only mention values that are actually present in the report.
// 5. If no clearly abnormal value is found, return an empty abnormalValues array.
// 6. Recommendations should encourage consultation with a qualified healthcare professional when appropriate.
// 7. Return JSON only.
// 8. Do not add markdown or code fences.

// Medical Report:

// ${reportText}
// `;

//         // ================= GEMINI =================

//         console.log("Sending report to Gemini...");

//         const response = await ai.models.generateContent({
//             model: "gemini-3.6-flash",
//             contents: prompt,
//             config: {
//                 temperature: 0.2,
//             },
//         });

//         const aiText = response.text || "";

//         console.log("================================");
//         console.log("GEMINI RESPONSE:");
//         console.log(aiText);
//         console.log("================================");

//         if (!aiText.trim()) {
//             return res.status(500).json({
//                 message: "Gemini returned an empty response.",
//             });
//         }

//         // ================= CLEAN GEMINI RESPONSE =================

//         const cleanedText = aiText
//             .replace(/```json/gi, "")
//             .replace(/```/g, "")
//             .trim();

//         let aiResult;

//         try {
//             aiResult = JSON.parse(cleanedText);
//         } catch (parseError) {
//             console.error(
//                 "GEMINI JSON PARSE ERROR:",
//                 parseError
//             );

//             console.error(
//                 "RAW GEMINI RESPONSE:",
//                 aiText
//             );

//             return res.status(500).json({
//                 message:
//                     "AI returned an invalid response format.",
//             });
//         }

//         // ================= SAVE ANALYSIS =================

//         const analysis = await Analysis.findOneAndUpdate(
//             {
//                 report: report._id,
//                 patient: req.user.userId,
//             },
//             {
//                 report: report._id,
//                 patient: req.user.userId,

//                 summary: aiResult.summary || "",

//                 abnormalValues:
//                     Array.isArray(aiResult.abnormalValues)
//                         ? aiResult.abnormalValues
//                         : [],

//                 recommendations:
//                     Array.isArray(aiResult.recommendations)
//                         ? aiResult.recommendations
//                         : [],
//             },
//             {
//                 new: true,
//                 upsert: true,
//             }
//         );

//         // ================= UPDATE REPORT STATUS =================

//         report.status = "analyzed";

//         await report.save();

//         // ================= SUCCESS =================

//         res.status(200).json({
//             message: "Report analyzed successfully",
//             analysis,
//         });

//     } catch (error) {
//         console.error("================================");
//         console.error("ANALYZE REPORT ERROR:");
//         console.error(error);
//         console.error("================================");

//         res.status(500).json({
//             message: "Failed to analyze medical report",
//             error:
//                 process.env.NODE_ENV === "development"
//                     ? error.message
//                     : undefined,
//         });
//     }
// };

// module.exports = {
//     analyzeReport,
// };

// =======================================

const { GoogleGenAI } = require("@google/genai");
const Report = require("../models/Report");
const Analysis = require("../models/Analysis");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// ================= ANALYZE REPORT =================

const analyzeReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        // ================= FIND REPORT =================

        const report = await Report.findOne({
            _id: reportId,
            patient: req.user.userId,
        });

        if (!report) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        // ================= CHECK EXISTING ANALYSIS =================

        const existingAnalysis = await Analysis.findOne({
            report: report._id,
            patient: req.user.userId,
        });

        if (existingAnalysis) {
            return res.status(200).json({
                message: "Analysis already exists",
                analysis: existingAnalysis,
            });
        }

        console.log("================================");
        console.log("ANALYZING REPORT:", report.fileName);
        console.log("REPORT ID:", report._id);
        console.log("================================");

        // ================= GET EXTRACTED TEXT =================

        const reportText = report.extractedText || "";

        console.log("EXTRACTED TEXT FOR AI:");
        console.log(reportText);

        if (!reportText.trim()) {
            return res.status(400).json({
                message:
                    "Could not extract text from this report. Please upload a clear PDF or image.",
            });
        }

        // ================= GEMINI PROMPT =================

        const prompt = `
You are an AI medical report analysis assistant.

Analyze the following medical report.

Return ONLY valid JSON in this exact structure:

{
  "summary": "short and simple summary",
  "abnormalValues": [
    {
      "parameter": "parameter name",
      "value": "reported value",
      "status": "High or Low or Abnormal",
      "explanation": "simple explanation"
    }
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2"
  ]
}

Rules:

1. Do not diagnose diseases.
2. Do not claim certainty.
3. Explain abnormal values in simple language.
4. Only mention values that are actually present in the report.
5. If no clearly abnormal value is found, return an empty abnormalValues array.
6. Recommendations should encourage consultation with a qualified healthcare professional when appropriate.
7. Return JSON only.
8. Do not add markdown or code fences.

Medical Report:

${reportText}
`;

        // ================= GEMINI =================

        console.log("Sending report to Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
                temperature: 0.2,
            },
        });

        const aiText = response.text || "";

        console.log("================================");
        console.log("GEMINI RESPONSE:");
        console.log(aiText);
        console.log("================================");

        if (!aiText.trim()) {
            return res.status(500).json({
                message: "Gemini returned an empty response.",
            });
        }

        // ================= CLEAN RESPONSE =================

        const cleanedText = aiText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let aiResult;

        try {
            aiResult = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error(
                "GEMINI JSON PARSE ERROR:",
                parseError
            );

            return res.status(500).json({
                message:
                    "AI returned an invalid response format.",
            });
        }

        // ================= SAVE ANALYSIS =================

        const analysis = await Analysis.findOneAndUpdate(
            {
                report: report._id,
                patient: req.user.userId,
            },
            {
                report: report._id,
                patient: req.user.userId,
                summary: aiResult.summary || "",
                abnormalValues:
                    Array.isArray(aiResult.abnormalValues)
                        ? aiResult.abnormalValues
                        : [],
                recommendations:
                    Array.isArray(aiResult.recommendations)
                        ? aiResult.recommendations
                        : [],
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        // ================= UPDATE STATUS =================

        report.status = "analyzed";
        await report.save();

        // ================= RESPONSE =================

        res.status(200).json({
            message: "Report analyzed successfully",
            analysis,
        });

    } catch (error) {
        console.error("================================");
        console.error("ANALYZE REPORT ERROR:");
        console.error(error);
        console.error("================================");

        res.status(500).json({
            message: "Failed to analyze medical report",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

module.exports = {
    analyzeReport,
};