import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Home page component that serves as the landing page for the MediConnect application.
const Home = () => {
  const navigate = useNavigate();

  // Handlers for navigation to login page and doctors listing page
  const handleOpenLogin = () => navigate("/login");

  // Handler to navigate to doctors listing page
  const handleOpenDoctors = () => navigate("/patient/doctors");

  return (
    <div className="home">
      {/* Main Hero */}
      <div className="hero">
        <div className="hero-left">
          <p className="tag">💚 Your Health, Our Priority</p>

          <h1 className="hero-title">Modern Healthcare at Your Fingertips</h1>

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
            src="/Gemini_Generated_Image_4cbw5m4cbw5m4cbw.png"
            alt="doctor"
            
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* This component serves as the landing page for the MediConnect application. It features a hero section with a tagline, title, description, and call-to-action buttons for users to get started or find a doctor. 
 The useNavigate hook from react-router-dom is used to handle client-side routing when the buttons are clicked, allowing users to navigate to the login page or the doctors listing page seamlessly. 
 The component is styled using an external CSS file (Home.css) to create an engaging and visually appealing user interface.
*/
}
