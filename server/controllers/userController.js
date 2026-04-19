const User = require("../models/User");

const getUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password").sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			count: users.length,
			data: users,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	getUsers,
};
// The whole point of this file is to define a controller function (getUsers) that handles the logic for fetching all users from the database.
//  The function uses the User model to query the database, excluding the password field for security reasons, and sorts the results by creation date in descending order. 
// The function then returns a JSON response with the success status, a message, the count of users fetched, and the user data itself. If there is an error during the process, it catches the error and returns a 500 status code with an error message. Finally, we export the getUsers function to be used in the user routes (userRoutes.js) where it will be called when a GET request is made to fetch all users.
