import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    {/* Section 1: Brand Info */}
                    <h3>MediConnect</h3>
                    <p>Your trusted healthcare appointment booking platform</p>
                </div>

                <div className="footer-section">
                    {/* Section 2: Quick Navigation Links */}
                    <h4>Quick Links</h4>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>  {/* Navigate to home page when "Home" is clicked */}
                        <li onClick={() => navigate("/patient/doctors")}>Doctors</li> {/* Navigate to Doctors listing */}
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>For Users</h4>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@mediconnect.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Health St, Medical City</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 MediConnect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

{  /*
    Footer.jsx - A footer component for the MediConnect application. 
    It includes brand information, quick navigation links, user-related links, and contact information. 
    The useNavigate hook from react-router-dom is used to handle client-side routing when links are clicked.
*/ }
