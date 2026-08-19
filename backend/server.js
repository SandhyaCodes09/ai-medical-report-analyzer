const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/reports", reportRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Medical Report AI API is running",
    });
});

app.use("/api/analysis", analysisRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});