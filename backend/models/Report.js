const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        reportType: {
            type: String,
            default: "Medical Report",
        },

        extractedText: {
            type: String,
            default: "",
        },

        // Gemini AI Analysis
        aiAnalysis: {
            type: String,
            default: "",
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: [
                "uploaded",
                "processing",
                "analyzed",
            ],
            default: "uploaded",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Report", reportSchema);