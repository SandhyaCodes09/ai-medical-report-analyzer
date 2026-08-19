const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        report: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
            required: true,
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        summary: {
            type: String,
            default: "",
        },

        abnormalValues: [
            {
                parameter: String,
                value: String,
                status: String,
                explanation: String,
            },
        ],

        recommendations: [
            {
                type: String,
            },
        ],

        disclaimer: {
            type: String,
            default:
                "This AI-generated analysis is for informational purposes only and is not a medical diagnosis. Please consult a qualified healthcare professional.",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Analysis", analysisSchema);