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
  const [searchText, setSearchText] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [availability, setAvailability] = useState("All");

  const filteredDoctors = doctors.filter((doctor) => {
    const searchMatch =
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchText.toLowerCase());
    const specialtyMatch =
      specialty === "All Specialties" || doctor.specialty === specialty;
    const availabilityMatch =
      availability === "All" || doctor.availability === availability;

    return searchMatch && specialtyMatch && availabilityMatch;
  });

  const resetFilters = () => {
    setSearchText("");
    setSpecialty("All Specialties");
    setAvailability("All");
  };

  return (
    <div className="doctor-page">
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
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="button">Search Doctors</button>
        </div>
      </section>

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
                    checked={specialty === item}
                    onChange={() => setSpecialty(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>


          <button type="button" className="clear-button" onClick={resetFilters}>
            Clear Filters
          </button>
        </aside>

        <div className="doctor-results">
          

          <div className="doctor-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={() => navigate(`/patient/doctor/${doctor.id}`)}
                onBookNow={() => navigate(`/patient/book-appointment/${doctor.id}`)}
              />
            ))}
          </div>

          {filteredDoctors.length === 0 ? (
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
