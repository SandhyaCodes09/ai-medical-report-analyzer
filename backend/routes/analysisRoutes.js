const express = require("express");

const {
    analyzeReport,
} = require("../controllers/analysisController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Analyze specific report
router.post(
    "/:reportId",
    protect,
    analyzeReport
);

module.exports = router;