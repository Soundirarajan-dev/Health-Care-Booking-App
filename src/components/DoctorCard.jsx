import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const getAvailabilityClass = (availability) => {
    switch (availability) {
      case 'Available Today':
        return 'status-available';
      case 'Fully Booked':
        return 'status-booked';
      case 'On Leave':
        return 'status-leave';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-image"
        />
        <div className="doctor-details">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-specialization">{doctor.specialization}</p>
          <div className="doctor-meta">
            <span className="rating">★ {doctor.rating}</span>
            <span className="experience">{doctor.experience} experience</span>
          </div>
        </div>
      </div>
      
      <div className="doctor-actions">
        <span className={`availability-status ${getAvailabilityClass(doctor.availability)}`}>
          {doctor.availability}
        </span>
        <Link to={`/doctor/${doctor.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;