const mongoose = require("mongoose");
//the schema design will change as per field input requirement. I have just added some sample fields for testing purpose. You can add more fields as per requirement.
const userSchema = new mongoose.Schema(//Sample schema
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},
		role: {
			type: String,
			enum: ["patient", "doctor", "admin"],
			default: "patient",
		},
		phone: {
			type: String,
			default: "",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);// Create a Mongoose model named "User" using the defined userSchema, which will be used to interact with the users collection in the MongoDB database.

module.exports = User;
// The whole point of this file is to define a Mongoose schema and model for the User collection in the MongoDB database. The schema outlines the structure of user documents, including fields for name, email, password, role, phone number, and active status.
//  By creating and exporting the User model, we can easily interact with the users collection in our database throughout the application, allowing us to perform operations such as creating new users, retrieving user data, updating user information, and deleting users as needed.