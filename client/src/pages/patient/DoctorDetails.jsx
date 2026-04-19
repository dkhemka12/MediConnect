import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Doctor Details</h2>
      <p>Doctor ID: {id}</p>
      <p>Name: Dr.John Doe</p>
      <p>Specialization: Cardiologist</p>
      <p>Experience: 10 years</p>
      <br />
      <button onClick={() => navigate(`/patient/book-appointment/${id}`)}>
        Book Appointment
      </button>
      <br />
      <br />
      <button onClick={() => navigate(`/patient/doctors`)}>
        Back to Doctors
      </button>
    </div>
  );
};

export default DoctorDetails;
