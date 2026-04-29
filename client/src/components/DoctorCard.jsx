import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor, onViewProfile, onBookNow }) => {
    // Generate initials from doctor's name
    const initials = doctor.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);

    return (
        <article className="doctor-card">
            <div className="doctor-card-main">
                {/* Avatar */}
                <div className="doctor-avatar-wrapper">
                    {doctor.image ? (
                        <img className="doctor-avatar" src={doctor.image} alt={doctor.name} />
                    ) : (
                        <div className="doctor-avatar doctor-avatar-fallback">{initials}</div>
                    )}
                </div>

                {/* Info Section */}
                <div className="doctor-info">
                    <h2 className="doctor-name">{doctor.name}</h2>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    
                    <div className="doctor-meta-row">
                        <span className="doctor-rating">⭐ {doctor.rating} ({doctor.reviews})</span>
                        <span className="doctor-experience">{doctor.experience}</span>
                    </div>

                    <div className="doctor-meta-tags">
                        <span className="meta-tag loc-tag">📍 {doctor.location}</span>
                        <span className="meta-tag slot-tag">🗓 {doctor.nextSlot || doctor.availability}</span>
                    </div>
                </div>
            </div>

            <div className="doctor-card-footer">
                <div className="doctor-fee-row">
                    <span>Consultation</span>
                    <strong>{doctor.fees || "₹1000"}</strong>
                </div>

                <div className="doctor-actions">
                    <button
                        type="button"
                        className="doctor-button doctor-button-outline"
                        onClick={onViewProfile}
                    >
                        View Profile
                    </button>
                    <button
                        type="button"
                        className="doctor-button doctor-button-solid"
                        onClick={onBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </article>
    );
};

export default DoctorCard;