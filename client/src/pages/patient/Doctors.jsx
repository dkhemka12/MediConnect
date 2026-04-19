import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/DoctorCard";
import "./Doctors.css";

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

const specialties = [
  "All Specialties",
  "Cardiologist",
  "General Physician",
  "Dermatologist",
  "Pediatrician",
];

const Doctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  const visibleDoctors = doctors.filter((doctor) => {
    const searchMatch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const specialtyMatch =
      selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;

    return searchMatch && specialtyMatch;
  });

  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value);
  const handleSpecialtyChange = (value) => setSelectedSpecialty(value);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All Specialties");
  };

  const handleOpenProfile = (doctorId) => navigate(`/patient/doctor/${doctorId}`);
  const handleOpenBooking = (doctorId) => navigate(`/patient/book-appointment/${doctorId}`);

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
