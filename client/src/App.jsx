import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/patient/Dashboard";
import Doctors from "./pages/patient/Doctors";
import About from "./pages/patient/About";
import DoctorDetails from "./pages/patient/DoctorDetails";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";

import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route path="/patient/dashboard" element={<Dashboard />} />
        <Route path="/patient/doctors" element={<Doctors />} />
        <Route path="/patient/about" element={<About />} />
        <Route path="/patient/doctor/:id" element={<DoctorDetails />} />
        <Route
          path="/patient/book-appointment/:id"
          element={<BookAppointment />}
        />
        <Route path="/patient/my-appointments" element={<MyAppointments />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
