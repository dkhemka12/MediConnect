const Appointment = require("../models/Appointment");

// Book appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments (for logged-in user)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id,
    }).populate("doctorId", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status (cancel etc.)
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};