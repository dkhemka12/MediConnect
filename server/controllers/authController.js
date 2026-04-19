const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
	try {
		const { name, email, password, role, phone } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Name, email, and password are required",
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User already exists with this email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
			phone,
		});

		const token = generateToken(user);

		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			token,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = generateToken(user);

		return res.status(200).json({
			success: true,
			message: "Login successful",
			token,
			data: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	register,
	login,
};

// The whole point of this file is to define the authentication controller for the application, which includes two main functions: register and login. 
// The register function handles user registration by validating input, checking for existing users, hashing the password, creating a new user in the database, and generating a JWT token for the newly registered user. 
// The login function handles user authentication by validating input, checking for the existence of the user, comparing the provided password with the stored hashed password, and generating a JWT token if the credentials are valid. 
// Both functions return appropriate responses based on the success or failure of the operations. By exporting these functions, we can use them in our authentication routes to handle incoming requests for user registration and login.