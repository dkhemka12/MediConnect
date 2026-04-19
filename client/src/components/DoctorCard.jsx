import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor, onViewProfile, onBookNow }) => {
    const initials = doctor.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2);

    return (
        <article className="doctor-card">
            {doctor.image ? (
                <img className="doctor-avatar" src={doctor.image} alt={doctor.name} />
            ) : (
                <div className="doctor-avatar doctor-avatar-fallback">{initials}</div>
            )}

            <div className="doctor-info">
                <div className="doctor-top">
                    <div>
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <p className="doctor-specialty">{doctor.specialty}</p>
                        <p className="doctor-rating-line">⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
                        <p className="doctor-experience">{doctor.experience}</p>
                    </div>
                </div>

                <div className="doctor-meta">
                    <p>📍 {doctor.location}</p>
                    <p className="doctor-slot">🗓 {doctor.nextSlot || doctor.availability}</p>
                </div>

                <div className="doctor-footer">
                    <div className="doctor-fee">
                        <span>Consultation Fee</span>
                        <strong>{doctor.fees}</strong>
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
            </div>
        </article>
    );
};

export default DoctorCard;