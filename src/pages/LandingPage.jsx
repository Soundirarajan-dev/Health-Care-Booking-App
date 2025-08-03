import React from 'react';
import { useAppointment } from '../context/AppointmentContext.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

const LandingPage = () => {
  const { filteredDoctors } = useAppointment();

  return (
    <div className="landing-page">
      <div className="page-header">
        <h1>Find Your Doctor</h1>
        <p>Book appointments with qualified healthcare professionals</p>
      </div>
      
      <SearchBar />
      
      <div className="doctors-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="no-results">
            <p>No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;