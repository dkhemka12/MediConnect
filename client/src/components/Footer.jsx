import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>MediConnect</h3>
                    <p>Your trusted healthcare appointment booking platform</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/patient/doctors")}>Doctors</li>
                        <li onClick={() => navigate("/patient/my-appointments")}>My Appointments</li>
                        <li onClick={() => navigate("/login")}>Login</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>For Users</h4>
                    <ul>
                        <li onClick={() => navigate("/login")}>Login</li>
                        <li onClick={() => navigate("/register")}>Sign Up</li>
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
