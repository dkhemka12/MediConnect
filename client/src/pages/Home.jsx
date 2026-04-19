import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      
      {/* Navbar */}
      <div className="navbar">
        <h2 className="logo">MediConnect</h2>

        <div className="nav-links">
          <span onClick={()=>navigate("/")}>Home</span>
          <span onClick={()=>navigate("/patient/doctors")}>Doctors</span>
          <span onClick={()=>navigate("/patient/services")}>Services</span>
          <span onClick={()=>navigate("/about")}>About</span>
        </div>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="primary-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-left">
          <p className="tag">💚 Your Health, Our Priority</p>

          <h1 className="hero-title">
            Modern Healthcare at Your Fingertips
          </h1>

          <p className="desc">
            Connect with top doctors, manage appointments, and access your
            medical records all in one place.
          </p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Get Started Free →
            </button>

            <button
              className="outline-btn"
              onClick={() => navigate("/patient/doctors")}
            >
              Find a Doctor
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://res.cloudinary.com/ddmqw0xx8/image/upload/f_auto,q_auto/214ed4a0-b9c2-4488-b0f7-977a9c71161b_mi4rya"
            alt="doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;