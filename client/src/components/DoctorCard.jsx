import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor, onViewProfile, onBookNow }) => {
    // Generate initials from doctor's name
    const initials = doctor.name
        .split(" ")      // Split name into words
        .map((word) => word[0])   // Take first letter of each word
        .join("")        // Join letters together
        .slice(0, 2);    // Limit to 2 characters

    return (
        <article className="doctor-card">
            
           {/* If doctor image exists, show image */}
            {doctor.image ? (
                <img className="doctor-avatar" src={doctor.image} alt={doctor.name} />
            ) : (
                // If no image, show initials as fallback
                <div className="doctor-avatar doctor-avatar-fallback">{initials}</div>
            )}

            <div className="doctor-info">
                {/* Top section: name, specialty, rating, experience */}
                <div className="doctor-top">
                    <div>
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <p className="doctor-specialty">{doctor.specialty}</p>
                        {/* Rating and reviews */}
                        <p className="doctor-rating-line">⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
                        {/* Experience */}
                        <p className="doctor-experience">{doctor.experience}</p>
                    </div>
                </div>

                <div className="doctor-meta">
                    {/*Shows the location*/}
                    <p>📍 {doctor.location}</p>

                    {/* Show next available slot, fallback to general availability */}
                    <p className="doctor-slot">🗓 {doctor.nextSlot || doctor.availability}</p>
                </div>

                <div className="doctor-footer">
                    

                    <div className="doctor-actions">

                        {/* View Profile Button */}
                        <button
                            type="button"
                            className="doctor-button doctor-button-outline"
                            onClick={onViewProfile}
                        >
                            View Profile
                        </button>

                        {/* Book Now Button */}
                        <button
                            type="button"
                            className="doctor-button doctor-button-solid"
                            onClick={onBookNow}
                        >
                            Book Now
                        </button>
                        </div>
                        <div className="doctor-fee">
                        <span>Consultation Fee</span>
                        <strong>₹1000</strong>
                    </div>
                    
                </div>
            </div>
        </article>
    );
};

export default DoctorCard;

{  /*
    DoctorCard.jsx - A reusable card component to display doctor information in the MediConnect application. 
    It shows the doctor's name, specialty, rating, experience, location, next available slot, and consultation fee. 
    The component also includes "View Profile" and "Book Now" buttons that trigger respective callback functions when clicked.
*/ }