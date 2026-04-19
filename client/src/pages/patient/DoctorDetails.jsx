import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DoctorDetails.css";

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        rating: "4.9",
        reviews: 256,
        experienceYears: 15,
        patientsTreated: "1200+",
        fee: "$150",
        location: "Heart Care Clinic, New York, NY",
        bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart disease diagnosis, and advanced cardiac care.",
        languages: "English, Spanish",
        tags: [
            "Preventive Cardiology",
            "Heart Disease Treatment",
            "Cardiac Imaging",
            "Interventional Cardiology",
        ],
        education: [
            "MD, Harvard Medical School",
            "Residency in Internal Medicine, Johns Hopkins Hospital",
            "Fellowship in Cardiology, Cleveland Clinic",
        ],
        slots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM"],
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "General Physician",
        rating: "4.8",
        reviews: 189,
        experienceYears: 12,
        patientsTreated: "980+",
        fee: "$120",
        location: "Family Health Center, Los Angeles, CA",
        bio: "Dr. Michael Chen focuses on preventive care and complete primary health consultations for adults and senior patients.",
        languages: "English, Mandarin",
        tags: ["Primary Care", "Preventive Medicine", "Chronic Care"],
        education: [
            "MD, Stanford University School of Medicine",
            "Residency in Family Medicine, UCLA Medical Center",
        ],
        slots: ["11:00 AM", "11:30 AM", "12:00 PM", "04:00 PM"],
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Dermatologist",
        rating: "4.9",
        reviews: 342,
        experienceYears: 10,
        patientsTreated: "1500+",
        fee: "$140",
        location: "Skin Wellness Center, Chicago, IL",
        bio: "Dr. Emily Rodriguez treats common and advanced skin conditions with a balanced clinical and cosmetic dermatology approach.",
        languages: "English, Spanish",
        tags: ["Acne Treatment", "Skin Allergy", "Cosmetic Dermatology"],
        education: [
            "MD, Northwestern University School of Medicine",
            "Residency in Dermatology, Mayo Clinic",
        ],
        slots: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"],
    },
    {
        id: 4,
        name: "Dr. David Park",
        specialty: "Pediatrician",
        rating: "5.0",
        reviews: 428,
        experienceYears: 18,
        patientsTreated: "2100+",
        fee: "$160",
        location: "Kids Care Hospital, Boston, MA",
        bio: "Dr. David Park provides full pediatric care and long-term child health planning for newborns, children, and adolescents.",
        languages: "English, Korean",
        tags: ["Child Checkups", "Vaccination", "Growth Monitoring"],
        education: [
            "MD, Johns Hopkins University School of Medicine",
            "Residency in Pediatrics, Boston Children's Hospital",
        ],
        slots: ["08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM"],
    },
];

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const doctorId = Number(id);
    const doctor = doctors.find((item) => item.id === doctorId);

    if (!doctor) {
        return (
            <div className="details-page">
                <div className="simple-card not-found-card">
                    <h2>Doctor not found</h2>
                    <button className="solid-btn" onClick={() => navigate("/patient/doctors")}>
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    const initials = doctor.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);

    return (
        <div className="details-page">
            <button className="back-link" onClick={() => navigate("/patient/doctors")}>
                ← Back to Doctor Listing
            </button>

            <div className="details-layout">
                <main className="left-column">
                    <section className="simple-card profile-card">
                        <div className="profile-top">
                            <div className="doctor-photo">{initials}</div>

                            <div className="profile-text">
                                <h1>{doctor.name}</h1>
                                <p className="specialty-text">{doctor.specialty}</p>
                                <p className="meta-text">
                                    ⭐ {doctor.rating} ({doctor.reviews} reviews) • {doctor.experienceYears} years exp. • {doctor.patientsTreated} patients
                                </p>
                                <p className="location-text">📍 {doctor.location}</p>

                                <div className="tag-list">
                                    {doctor.tags.map((tag) => (
                                        <span key={tag} className="tag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="simple-card">
                        <h2>About</h2>
                        <p>{doctor.bio}</p>
                    </section>

                    <section className="simple-card">
                        <h2>Education & Experience</h2>
                        <ul className="education-list">
                            {doctor.education.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </main>

                <aside className="right-column">
                    <section className="simple-card fee-card">
                        <p>Consultation Fee</p>
                        <h2>{doctor.fee}</h2>
                        <button
                            className="solid-btn full-btn"
                            onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
                        >
                            Book Appointment
                        </button>
                    </section>

                    <section className="simple-card">
                        <h3>Quick Info</h3>
                        <div className="info-row">
                            <span>Languages</span>
                            <strong>{doctor.languages}</strong>
                        </div>
                        <div className="info-row">
                            <span>Experience</span>
                            <strong>{doctor.experienceYears} years</strong>
                        </div>
                        <div className="info-row">
                            <span>Patients Treated</span>
                            <strong>{doctor.patientsTreated}</strong>
                        </div>
                    </section>

                    <section className="simple-card">
                        <h3>Next Available</h3>
                        <div className="slot-list">
                            {doctor.slots.map((slot) => (
                                <div key={slot} className="slot-item">
                                    <span>{slot}</span>
                                    <span className="slot-check">✓</span>
                                </div>
                            ))}
                        </div>
                        <button className="outline-btn full-btn">View All Slots</button>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default DoctorDetails;