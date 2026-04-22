import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";

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
        <Route
          path="/patient/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/doctors"
          element={
            <RequireAuth>
              <Doctors />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/doctor/:id"
          element={
            <RequireAuth>
              <DoctorDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/book-appointment/:id"
          element={
            <RequireAuth>
              <BookAppointment />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/my-appointments"
          element={
            <RequireAuth>
              <MyAppointments />
            </RequireAuth>
          }
        />

        {/* Doctor */}
        <Route
          path="/doctor/dashboard"
          element={
            <RequireAuth>
              <DoctorDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <RequireAuth>
              <DoctorAppointments />
            </RequireAuth>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <AdminUsers />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
