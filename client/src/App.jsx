import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/patient/Dashboard";
import Doctors from "./pages/patient/Doctors";
import DoctorDetails from "./pages/patient/DoctorDetails";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";

import DoctorDashboard from "./pages/doctor/Dashboard";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Patient */}
      <Route path="/patient/dashboard" element={<Dashboard />} />
      <Route path="/patient/doctors" element={<Doctors />} />
      <Route path="/patient/doctor/:id" element={<DoctorDetails />} />
      <Route
        path="/patient/book-appointment/:id"
        element={<BookAppointment />}
      />
      <Route path="/patient/my-appointments" element={<MyAppointments />} />

      {/* Doctor */}
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
    </Routes>
  );
}

export default App;
