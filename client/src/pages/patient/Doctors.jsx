import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/DoctorCard";
import { isAuthenticated } from "../../services/auth";
import { fetchDoctors } from "../../services/userService";
import "./Doctors.css";

const Doctors = () => {
  const navigate = useNavigate();

  const [doctorList, setDoctorList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  // useEffect runs on component mount to fetch doctor list
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        // Fetch doctors and map to UI format
        const data = await fetchDoctors();
        const mapped = data.map((doctor) => ({
          id: doctor._id,
          name: doctor.name,
          specialty: doctor.specialty || "General Physician",
          experience: doctor.experience || "5 years experience",
          rating: doctor.rating || "4.7",
          reviews: doctor.reviews || 100,
          fees: doctor.fees || "₹120",
          location: doctor.location || "Clinic",
          availability: doctor.availability || "Available",
        }));
        setDoctorList(mapped);
      } catch (error) {
        setErrorMessage(error.message || "Could not load doctors.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Extract unique specialties from doctor list for filter options
  const specialties = [
    "All Specialties",
    ...new Set(doctorList.map((doctor) => doctor.specialty).filter(Boolean)),
  ];

  // Filter doctors based on search query and selected specialty
  const visibleDoctors = doctorList.filter((doctor) => {
    // Match search against name or specialty (case-insensitive)
    const searchMatch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    // Match selected specialty filter
    const specialtyMatch =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;

    return searchMatch && specialtyMatch;
  });

  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value);
  const handleSpecialtyChange = (value) => setSelectedSpecialty(value);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("All Specialties");
  };

  const handleOpenProfile = (doctorId) =>
    navigate(`/patient/doctor/${doctorId}`);

  const handleOpenBooking = (doctorId) => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: { from: `/patient/book-appointment/${doctorId}` },
      });
      return;
    }

    navigate(`/patient/book-appointment/${doctorId}`);
  };

  return (
    <div className="doctor-page">
      <section className="doctor-hero">
        <div className="doctor-hero-inner">
          <p className="doctor-hero-tag">Find the right doctor</p>
          <h1>Browse doctors and book in a few clicks</h1>
          <p className="doctor-hero-text">
            Search by name or specialty, use the filters on the left, and keep
            the layout simple for future backend data.
          </p>
        </div>

        <div className="doctor-search">
          <input
            type="text"
            placeholder="Search doctor name or specialty"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
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
                    checked={selectedSpecialty === item}
                    onChange={() => handleSpecialtyChange(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="clear-button"
            onClick={handleResetFilters}
          >
            Clear Filters
          </button>
        </aside>

        <div className="doctor-results">
          {isLoading ? (
            <div className="empty-state">
              <p>Loading doctors...</p>
            </div>
          ) : null}
          {errorMessage ? (
            <div className="empty-state">
              <p>{errorMessage}</p>
            </div>
          ) : null}

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

          {!isLoading && !errorMessage && visibleDoctors.length === 0 ? (
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
