import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/DoctorCard";
import { isAuthenticated } from "../../services/auth";
import "./Doctors.css";

// Sample data for doctors (can be replaced with backend data later)
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years experience",
    rating: "4.9",
    reviews: 256,
    fees: "$150",
    location: "New York, NY",
    availability: "Available Today",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "General Physician",
    experience: "12 years experience",
    rating: "4.8",
    reviews: 189,
    fees: "$120",
    location: "Los Angeles, CA",
    availability: "Tomorrow",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    experience: "10 years experience",
    rating: "4.9",
    reviews: 342,
    fees: "$140",
    location: "Chicago, IL",
    availability: "This Week",
  },
  {
    id: 4,
    name: "Dr. David Park",
    specialty: "Pediatrician",
    experience: "18 years experience",
    rating: "5.0",
    reviews: 428,
    fees: "$160",
    location: "Boston, MA",
    availability: "Available Today",
  },
];

// List of specialties for filtering
const specialties = [
  "All Specialties",
  "Cardiologist",
  "General Physician",
  "Dermatologist",
  "Pediatrician",
];

// Doctors listing page for patients
const Doctors = () => {
  const navigate = useNavigate();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for selected specialty filter
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  // Filter doctors based on search query and selected specialty
  const visibleDoctors = doctors.filter((doctor) => {

    // Check if doctor name or specialty matches the search query
    const searchMatch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if doctor specialty matches the selected specialty filter
    const specialtyMatch =
      selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;

    return searchMatch && specialtyMatch;
  });

  // Handlers for search input
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value);

  // Handlers for specialty filter change
  const handleSpecialtyChange = (value) => setSelectedSpecialty(value);

  // Handler to reset filters and search query
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All Specialties");
  };

  // Handlers for navigation to doctor details
  const handleOpenProfile = (doctorId) => navigate(`/patient/doctor/${doctorId}`);

  // Handler to navigate to booking page for a specific doctor
  const handleOpenBooking = (doctorId) => {
    if (!isAuthenticated()) {
      navigate("/login", { state: { from: `/patient/book-appointment/${doctorId}` } });
      return;
    }

    navigate(`/patient/book-appointment/${doctorId}`);
  };

  return (
    <div className="doctor-page">
      {/* Header */}
      <section className="doctor-hero">
        <p className="doctor-hero-tag">Find the right doctor</p>
        <h1>Browse doctors and book in a few clicks</h1>
        <p className="doctor-hero-text">
          Search by name or specialty, use the filters on the left, and keep the layout simple for future backend data.
        </p>

        <div className="doctor-search">
          <input
            type="text"
            placeholder="Search doctor name or specialty"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </section>

      {/* Filters and Results */}
      <section className="doctor-layout">
        <aside className="doctor-sidebar">
          <div className="filter-group">
            <h3>Specialty</h3>
            <div className="filter-list">
              {specialties.map((item) => (
                <label key={item} className="filter-item">
                  <input
                    type="radio"
                    name="specialty"
                    checked={selectedSpecialty === item}
                    onChange={() => handleSpecialtyChange(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" className="clear-button" onClick={handleResetFilters}>
            Clear Filters
          </button>
        </aside>

        <div className="doctor-results">
          <div className="doctor-grid">
            {visibleDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={() => handleOpenProfile(doctor.id)}
                onBookNow={() => handleOpenBooking(doctor.id)}
              />
            ))}
          </div>

          {visibleDoctors.length === 0 ? (
            <div className="empty-state">
              <h3>No doctors matched your search</h3>
              <p>Try a different name or clear the filters.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Doctors;

{/* This component displays a list of doctors for patients to browse and book appointments with. It includes a search bar to filter doctors by name or specialty, and a sidebar with specialty filters. 
 Each doctor is displayed in a card format with their name, specialty, experience, rating, fees, location, and availability. 
 Patients can click on "View Profile" to see more details about the doctor or "Book Now" to start the appointment booking process. 
 The data is currently static but can be replaced with dynamic data from a backend in the future. 
*/}
