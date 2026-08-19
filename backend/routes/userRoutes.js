const express = require("express");

const {
    getCurrentUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user
router.get("/me", protect, getCurrentUser);

module.exports = router;