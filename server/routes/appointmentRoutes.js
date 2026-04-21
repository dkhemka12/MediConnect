const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	bookAppointment,
	getAppointments,
	updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file.
// This ensures that only logged-in users with a valid token can hit these endpoints.
router.use(protect);

// POST /api/appointments -> Book an appointment
router.post("/", bookAppointment);

// GET /api/appointments -> Fetch appointments
router.get("/", getAppointments);

// PUT /api/appointments/:id -> Update or cancel an appointment
router.put("/:id", updateAppointmentStatus);

module.exports = router;

// The whole point of this file is to map the HTTP requests (GET, POST, PUT) 
// related to appointments to their respective controller functions. 
// Crucially, it applies our authentication middleware (`protect`) so that 
// all API boundaries under `/api/appointments` are secure from unauthenticated access.
