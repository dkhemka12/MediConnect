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
            <div className="doctor-avatar">{initials}</div>

            <div className="doctor-info">
                <div className="doctor-top">
                    <div>
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <p className="doctor-specialty">{doctor.specialty}</p>
                        <p className="doctor-experience">{doctor.experience}</p>
                    </div>

                    <span className="doctor-rating">⭐ {doctor.rating}</span>
                </div>

                <div className="doctor-details">
                    <span>{doctor.reviews} reviews</span>
                    <span>{doctor.location}</span>
                    <span>{doctor.availability}</span>
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
        </article>
    );
};

export default DoctorCard;