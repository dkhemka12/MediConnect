const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	bookAppointment,
	getAppointments,
	updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

router.use(protect);

router.post("/", bookAppointment);

router.get("/", getAppointments);

router.put("/:id", updateAppointmentStatus);

module.exports = router;
