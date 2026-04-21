const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");   // imported dotenv module to load environment variables from .env file

const connectDB = require("./config/db");// imported the connectDB function from the db.js file to establish a connection to the MongoDB database
const authRoutes = require("./routes/authRoutes"); // imported the authentication routes from the authRoutes.js file to handle authentication-related requests
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();// Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
	})
);// Enable CORS for the specified client URL or default to localhost:5173


app.use(express.json());// Middleware to parse JSON request bodies

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);// Mount the authentication routes on the /api/auth path and user routes on the /api/users path, allowing the server to handle requests related to authentication and user management.

app.use("/api/appointments", appointmentRoutes); // Mount appointment routes


app.get("/api/health", (req, res) => {// Define a simple health check route to verify that the server is running and responsive. This route can be used for monitoring and debugging purposes.
	res.status(200).json({
		success: true,
		message: "Server is running",
	});
});



const startServer = async () => {// Define an asynchronous function to start the server. This function will first establish a connection to the MongoDB database using the connectDB function. If the connection is successful, it will start the server and listen on the specified port. If there is an error connecting to the database, the error will be logged and the process will exit with a failure code.
	await connectDB();// Establish a connection to the MongoDB database before starting the server. If the connection is successful, the server will start listening on the specified port. If there is an error connecting to the database, the error will be logged and the process will exit with a failure code.
    
	app.listen(PORT, () => {// Start the server and listen on the specified port
		console.log(`Server running on port ${PORT}`);
	});
};

startServer();// Call the function to start the server
