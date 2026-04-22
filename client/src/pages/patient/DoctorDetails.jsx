import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import { fetchDoctors } from "../../services/userService";
import "./DoctorDetails.css";

const DoctorDetails = () => {
    const { id: doctorIdParam } = useParams();
    const navigate = useNavigate();
    const [doctorList, setDoctorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const data = await fetchDoctors();
                setDoctorList(data);
            } catch (error) {
                setErrorMessage(error.message || "Could not load doctor details.");
            } finally {
                setIsLoading(false);
            }
        };

        loadDoctors();
    }, []);

    const selectedDoctor = useMemo(
        () => doctorList.find((item) => item._id === doctorIdParam),
        [doctorIdParam, doctorList],
    );

    const doctorView = selectedDoctor
        ? {
            id: selectedDoctor._id,
            name: selectedDoctor.name,
            specialty: selectedDoctor.specialty || "General Physician",
            rating: selectedDoctor.rating || "4.7",
            reviews: selectedDoctor.reviews || 100,
            experienceYears: selectedDoctor.experienceYears || 5,
            patientsTreated: selectedDoctor.patientsTreated || "500+",
            fee: selectedDoctor.fees || "$120",
            location: selectedDoctor.location || "Clinic",
            bio: selectedDoctor.bio || "Experienced doctor available for consultation.",
            languages: selectedDoctor.languages || "English",
            tags: selectedDoctor.tags || [selectedDoctor.specialty || "General Care"],
            education: selectedDoctor.education || ["Medical degree"],
            slots: selectedDoctor.slots || ["10:00 AM", "11:00 AM", "12:00 PM"],
        }
        : null;

    const handleBackToDoctors = () => navigate("/patient/doctors");

    const handleOpenBooking = () => {
        if (!doctorView) {
            return;
        }

        if (!isAuthenticated()) {
            navigate("/login", { state: { from: `/patient/book-appointment/${doctorView.id}` } });
            return;
        }

        navigate(`/patient/book-appointment/${doctorView.id}`);
    };

    if (isLoading) {
        return (
            <div className="details-page">
                <div className="simple-card not-found-card">
                    <h2>Loading doctor...</h2>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="details-page">
                <div className="simple-card not-found-card">
                    <h2>{errorMessage}</h2>
                    <button className="solid-btn" onClick={handleBackToDoctors}>
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    if (!doctorView) {
        return (
            <div className="details-page">
                <div className="simple-card not-found-card">
                    <h2>Doctor not found</h2>
                    <button className="solid-btn" onClick={handleBackToDoctors}>
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    const initials = doctorView.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);

    return (
        <div className="details-page">
            {/* Back Button */}
            <button className="back-link" onClick={handleBackToDoctors}>
                ← Back to Doctor Listing
            </button>

            {/* Main Layout */}
            <div className="details-layout">
                <main className="left-column">
                    <section className="simple-card profile-card">
                        <div className="profile-top">
                            <div className="doctor-photo">{initials}</div>

                            <div className="profile-text">
                                <h1>{doctorView.name}</h1>
                                <p className="specialty-text">{doctorView.specialty}</p>
                                <p className="meta-text">
                                    ⭐ {doctorView.rating} ({doctorView.reviews} reviews) • {doctorView.experienceYears} years exp. • {doctorView.patientsTreated} patients
                                </p>
                                <p className="location-text">📍 {doctorView.location}</p>

                                <div className="tag-list">
                                    {doctorView.tags.map((tag) => (
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
                        <p>{doctorView.bio}</p>
                    </section>

                    <section className="simple-card">
                        <h2>Education & Experience</h2>
                        <ul className="education-list">
                            {doctorView.education.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </main>

                <aside className="right-column">
                    <section className="simple-card fee-card">
                        <p>Consultation Fee</p>
                        <h2>{doctorView.fee}</h2>
                        <button
                            className="solid-btn full-btn"
                            onClick={handleOpenBooking}
                        >
                            Book Appointment
                        </button>
                    </section>

                    <section className="simple-card">
                        <h3>Quick Info</h3>
                        <div className="info-row">
                            <span>Languages</span>
                            <strong>{doctorView.languages}</strong>
                        </div>
                        <div className="info-row">
                            <span>Experience</span>
                            <strong>{doctorView.experienceYears} years</strong>
                        </div>
                        <div className="info-row">
                            <span>Patients Treated</span>
                            <strong>{doctorView.patientsTreated}</strong>
                        </div>
                    </section>

                    <section className="simple-card">
                        <h3>Next Available</h3>
                        <div className="slot-list">
                            {doctorView.slots.map((slot) => (
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
