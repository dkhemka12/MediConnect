const Appointment = require("../models/Appointment");

const normalizeStatus = (status) => {
  const value = String(status || "").toLowerCase();

  if (["approved", "confirmed"].includes(value)) {
    return "approved";
  }

  if (value === "cancelled" || value === "canceled") {
    return "cancelled";
  }

  if (value === "pending") {
    return "pending";
  }

  return null;
};

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
    const normalizedStatus = normalizeStatus(status);

    if (!normalizedStatus) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required",
      });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isDoctor = req.user.role === "doctor";
    const isPatient = req.user.role === "patient";
    const isDoctorOwner =
      isDoctor && appointment.doctorId.toString() === req.user._id.toString();
    const isPatientOwner =
      isPatient && appointment.patientId.toString() === req.user._id.toString();

    if (!isAdmin && isDoctor && !isDoctorOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this appointment",
      });
    }

    if (!isAdmin && isPatient && !isPatientOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this appointment",
      });
    }

    if (isDoctor && !["approved", "cancelled"].includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Doctors can only accept or reject appointments",
      });
    }

    if (isPatient && normalizedStatus !== "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Patients can only cancel appointments",
      });
    }

    appointment.status = normalizedStatus;
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: `Appointment status updated to ${normalizedStatus}`,
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
