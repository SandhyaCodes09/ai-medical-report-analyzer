const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (userId, role) => {
    return jwt.sign(
        {
            userId,
            role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// Cookie options
const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ================= REGISTER =================

const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, gender, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            phone,
        });

        const token = generateToken(user._id, user.role);

        // Save JWT in HttpOnly cookie
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// ================= LOGIN =================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id, user.role);

        // Save JWT in HttpOnly cookie
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// ================= LOGOUT =================

const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        message: "Logout successful",
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};