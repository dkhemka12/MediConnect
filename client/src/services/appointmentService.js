import { requestJson } from "./api";
import { isAuthenticated } from "./auth";

const STORAGE_KEY = "mediconnectAppointments";

const seedAppointments = [
  {
    id: "apt-1001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2026-04-24",
    time: "10:00 AM",
    location: "Heart Care Clinic, New York",
    status: "confirmed",
  },
  {
    id: "apt-1002",
    doctorName: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "2026-04-27",
    time: "11:30 AM",
    location: "Family Health Center, Los Angeles",
    status: "pending",
  },
  {
    id: "apt-1003",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    date: "2026-04-17",
    time: "02:30 PM",
    location: "Skin Wellness Center, Chicago",
    status: "completed",
  },
];

const getStoredAppointments = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return seedAppointments;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : seedAppointments;
  } catch {
    return seedAppointments;
  }
};

const saveStoredAppointments = (appointments) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

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

  try {
    const data = await requestJson("/appointments", { method: "GET" });
    const list = Array.isArray(data) ? data : data?.data || [];
    return list.map(normalizeAppointment);
  } catch {
    return getStoredAppointments();
  }
};

export const createAppointment = async (payload) => {
  if (!isAuthenticated()) {
    throw new Error("Please log in to book an appointment.");
  }

  try {
    const data = await requestJson("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const created = normalizeAppointment(data?.data || data);
    return created;
  } catch {
    const existing = getStoredAppointments();
    const created = {
      id: `apt-${Date.now()}`,
      doctorName: payload.doctorName || `Doctor #${payload.doctorId}`,
      specialty: payload.specialty || "Specialist",
      date: payload.date,
      time: payload.time,
      location: payload.location || "Clinic",
      status: "pending",
    };

    const updated = [created, ...existing];
    saveStoredAppointments(updated);
    return created;
  }
};

export const cancelAppointment = async (appointmentId) => {
  if (!isAuthenticated()) {
    throw new Error("Please log in to manage appointments.");
  }

  try {
    await requestJson(`/appointments/${appointmentId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "cancelled" }),
    });
    return;
  } catch {
    const existing = getStoredAppointments();
    const updated = existing.map((item) =>
      item.id === appointmentId ? { ...item, status: "cancelled" } : item,
    );
    saveStoredAppointments(updated);
  }
};
