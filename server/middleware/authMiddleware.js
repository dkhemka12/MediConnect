const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware function protects routes by ensuring a valid JWT token is provided.
const protect = async (req, res, next) => {
	let token;

	// Check if the authorization header exists and starts with 'Bearer'
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Extract token from header (Format: "Bearer <token>")
			token = req.headers.authorization.split(" ")[1];

			// Verify the token using our secret key
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Find the user by the ID embedded in the token payload.
			// We use .select("-password") to ensure we don't attach the hashed password to req.user for security.
			req.user = await User.findById(decoded.userId).select("-password");

			if (!req.user) {
				return res.status(401).json({ success: false, message: "Not authorized, user no longer exists" });
			}

			// Token is valid and user exists, proceed to the next middleware or controller
			next();
		} catch (error) {
			console.error("Token Verification Error:", error);
			return res.status(401).json({
				success: false,
				message: "Not authorized, token failed",
			});
		}
	}

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Not authorized, no token provided",
		});
	}
};

module.exports = { protect };

// The whole point of this file is to verify the JWT token sent by the client.
// If the token is valid, it decodes the payload, fetches the user from the database, 
// and attaches the user data to the request (`req.user`). This makes the user data 
// accessible to any route that uses this middleware. If the token is missing or invalid, 
// it blocks the request with a 401 Unauthorized status.
