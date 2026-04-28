import { requestJson } from "./api";
import { isAuthenticated } from "./auth";

const normalizeStatus = (status) => {
  if (!status) return "pending";

  const value = String(status).toLowerCase();
  if (value === "approved") return "confirmed";
  if (value === "cancelled") return "cancelled";
  if (value === "pending") return "pending";
  if (value === "completed") return "completed";
  if (value === "confirmed") return "confirmed";

  return "pending";
};

const normalizeAppointment = (item) => ({
  id: item._id || item.id,
  patientName:
    item.patientName || item.patient?.name || item.patientId?.name || "Patient",
  doctorName:
    item.doctorName ||
    item.doctor?.name ||
    item.doctorId?.name ||
    `Doctor #${item.doctorId || "N/A"}`,
  specialty:
    item.specialty ||
    item.doctor?.specialty ||
    item.doctorId?.specialty ||
    "Specialist",
  date: item.date || item.appointmentDate || "",
  time: item.time || item.slot || "",
  location:
    item.location ||
    item.doctor?.location ||
    item.doctorId?.location ||
    "Online / Clinic",
  status: normalizeStatus(item.status),
});

export const getMyAppointments = async () => {
  if (!isAuthenticated()) {
    throw new Error("Please log in to view your appointments.");
  }

  const data = await requestJson("/appointments", { method: "GET" });
  const list = Array.isArray(data) ? data : data?.data || [];
  return list.map(normalizeAppointment);
};

export const createAppointment = async (payload) => {
  if (!isAuthenticated()) {
    throw new Error("Please log in to book an appointment.");
  }

  const data = await requestJson("/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return normalizeAppointment(data?.data || data || {});
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  if (!isAuthenticated()) {
    throw new Error("Please log in to manage appointments.");
  }

  const data = await requestJson(`/appointments/${appointmentId}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

  return normalizeAppointment(data?.data || data || {});
};

export const cancelAppointment = async (appointmentId) =>
  updateAppointmentStatus(appointmentId, "cancelled");
