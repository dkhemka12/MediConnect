const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    //Reads entries from req.body
    const { name, email, password, role, phone } = req.body;

    //making email to lowercase because email is case insensitive here.
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    //validating logic for the required fields
    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",  
      });
    }

    //checks if a user is already registered with the same email. If yes, it returns a 409 Conflict status code with an appropriate message.
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    
    // hashing the password submitted and salting it with 10 rounds. 
    const hashedPassword = await bcrypt.hash(password, 10);


    const isActive = role === "doctor" ? false : true;// doctor login is waiting for admin to approve.
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone,
      isActive,
    });

    const responsePayload = {
      success: true,
      message: user.isActive
        ? "User registered successfully"
        : "Doctor account created. Waiting for admin activation.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
      },
    };

    if (user.isActive) {
      responsePayload.token = generateToken(user);
    }

    return res.status(201).json(responsePayload);
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
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({//validation error due to missing fields.
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({//authentication error due to invalid credentials.
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({//authentication error due to invalid credentials.
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({//authorization error due to inactive account.
        success: false,
        message: "Account is inactive. Please wait for admin approval.",
      });
    }

    const token = generateToken(user);
    //after token created ,returns success response with user data and token for authentication in future requests.
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
        isActive: user.isActive,
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
