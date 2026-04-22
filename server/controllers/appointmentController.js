const Appointment = require("../models/Appointment");

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Validation check
    if (!doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID, date, and time are required",
      });
    }

    // Create a new appointment, using the authenticated user's ID as the patientId
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Fetch appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let query = {};

    // Based on the role, users should only see relevant appointments
    if (req.user.role === "patient") {
      query.patientId = req.user._id;
    } else if (req.user.role === "doctor") {
      query.doctorId = req.user._id;
    }
    // If the user is an admin, the query remains empty {}, meaning they fetch ALL appointments.

    // Fetch from the database and populate the patient and doctor details (excluding passwords)
    const appointments = await Appointment.find(query)
      .populate("patientId", "name email phone")
      .populate("doctorId", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update appointment status (or cancel)
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Find the appointment by ID and update the status
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }, // Returns the updated document
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
};
