import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const handleOpenLogin = () => navigate("/login");
  const handleOpenDoctors = () => navigate("/patient/doctors");

  return (
    <div className="home">
      {/* Main Hero */}
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
            <button className="primary-btn" onClick={handleOpenLogin}>
              Get Started Free →
            </button>

            <button className="outline-btn" onClick={handleOpenDoctors}>
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