const mongoose = require("mongoose");

// Define the schema for booking appointments between patients and doctors
const appointmentSchema = new mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Patient ID is required"],
			ref: "User", // References the User model (specifically looking for a patient)
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Doctor ID is required"],
			ref: "User", // References the User model (specifically looking for a doctor)
		},
		date: {
			type: String,
			required: [true, "Appointment date is required"],
		},
		time: {
			type: String,
			required: [true, "Appointment time is required"],
		},
		status: {
			type: String,
			enum: ["pending", "approved", "cancelled"], // Only these 3 statuses are allowed
			default: "pending", // Appointments always start as pending
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;

// The whole point of this file is to define a Mongoose schema and model for the Appointment collection.
// It maps out how an appointment document looks in the MongoDB database, establishing relationships 
// via ObjectIds to the patient (User) and the doctor (User). It also enforces valid formats 
// and statuses to prevent bad data from being stored in the database.
