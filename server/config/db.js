const mongoose = require("mongoose");// imported mongoose module to interact with MongoDB database

const connectDB = async () => {
	try {

		await mongoose.connect(process.env.MONGO_URI); // established a connection to the MongoDB database using the connection string from environment variables
        
		console.log("MongoDB connected successfully");

	} 
    catch (error) {

		console.error(`MongoDB connection error: ${error.message}`);
		process.exit(1);

	}
};

module.exports = connectDB;
//The whole point of this file is to export a function which can be called in the server.js file to establish a connection to the MongoDB database using Mongoose. The function handles any connection errors and logs the status of the connection.
//In short, this file is responsible for setting up the connection to the MongoDB database and making it available for use in other parts of the application.