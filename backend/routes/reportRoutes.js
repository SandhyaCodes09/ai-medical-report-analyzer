// const express = require("express");

// const {
//     uploadReport,
//     getMyReports,
// } = require("../controllers/reportController");

// const protect = require("../middleware/authMiddleware");
// const upload = require("../middleware/uploadMiddleware");

// const router = express.Router();

// // Upload medical report
// router.post(
//     "/upload",
//     protect,
//     upload.single("report"),
//     uploadReport
// );

// // Get logged-in patient's reports
// router.get(
//     "/my-reports",
//     protect,
//     getMyReports
// );


// module.exports = router;

const express = require("express");

const {
    uploadReport,
    getMyReports,
    updateReport,
    deleteReport,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload medical report
router.post(
    "/upload",
    protect,
    upload.single("report"),
    uploadReport
);

// Get logged-in patient's reports
router.get(
    "/my-reports",
    protect,
    getMyReports
);

// Edit report name
router.put(
    "/:id",
    protect,
    updateReport
);

// Delete report
router.delete(
    "/:id",
    protect,
    deleteReport
);

module.exports = router;