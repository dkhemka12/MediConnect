const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createAppointment,
  getAppointments,
  updateAppointment,
} = require("../controllers/appointmentController");

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/:id", protect, updateAppointment);

module.exports = router;