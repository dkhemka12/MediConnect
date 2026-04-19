import { requestJson } from "./api";

const STORAGE_KEY = "mediconnectAppointments";

const seedAppointments = [
  {
    id: "apt-1001",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2026-04-24",
    time: "10:00 AM",
    location: "Heart Care Clinic, New York",
    status: "Confirmed",
  },
  {
    id: "apt-1002",
    doctorName: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "2026-04-27",
    time: "11:30 AM",
    location: "Family Health Center, Los Angeles",
    status: "Pending",
  },
  {
    id: "apt-1003",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    date: "2026-04-17",
    time: "02:30 PM",
    location: "Skin Wellness Center, Chicago",
    status: "Completed",
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

const normalizeAppointment = (item) => ({
  // Keep this mapper as the single adaptation layer for backend payload changes.
  id: item._id || item.id,
  doctorName: item.doctorName || item.doctor?.name || "Unknown Doctor",
  specialty: item.specialty || item.doctor?.specialty || "Specialist",
  date: item.date || item.appointmentDate || "",
  time: item.time || item.slot || "",
  location: item.location || item.doctor?.location || "Online / Clinic",
  status: item.status || "Pending",
});

export const getMyAppointments = async () => {
  // Backend endpoint expected from server team: GET /appointments/my
  try {
    const data = await requestJson("/appointments/my", { method: "GET" });
    const list = Array.isArray(data) ? data : data?.appointments || [];
    return list.map(normalizeAppointment);
  } catch {
    return getStoredAppointments();
  }
};

export const createAppointment = async (payload) => {
  // Backend endpoint expected from server team: POST /appointments
  try {
    const data = await requestJson("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const created = normalizeAppointment(data?.appointment || data);
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
      status: "Pending",
    };

    const updated = [created, ...existing];
    saveStoredAppointments(updated);
    return created;
  }
};

export const cancelAppointment = async (appointmentId) => {
  // Backend endpoint expected from server team: PATCH /appointments/:id/cancel
  try {
    await requestJson(`/appointments/${appointmentId}/cancel`, {
      method: "PATCH",
    });
    return;
  } catch {
    const existing = getStoredAppointments();
    const updated = existing.map((item) =>
      item.id === appointmentId ? { ...item, status: "Cancelled" } : item,
    );
    saveStoredAppointments(updated);
  }
};
