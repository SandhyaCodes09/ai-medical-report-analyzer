const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get token from HttpOnly cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, please login",
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded user information
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = protect;