import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext.jsx';

const DoctorProfile = (props) => {
  const { id } = useParams();
  const { getDoctorById } = useAppointment();
  console.log(useParams())
  const doctor = getDoctorById(id);

  if (!doctor) {
    return (
      <div className="not-found">
        <h2>Doctor not found</h2>
        <Link to="/" className="back-link">
          Back to doctors list
        </Link>
      </div>
    );
  }

  const isAvailable = doctor.availability === 'Available Today';

  return (
    <div className="doctor-profile">
      <Link to="/" className="back-link">
        ← Back to doctors
      </Link>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-section">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="profile-image"
            />
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">{doctor.name}</h1>
            <p className="profile-specialization">{doctor.specialization}</p>
            
            <div className="profile-meta">
              <span className="profile-rating">★ {doctor.rating}</span>
              <span className="profile-experience">{doctor.experience} experience</span>
            </div>
            
            <div className="profile-availability">
              <span className={`availability-badge ${
                doctor.availability === 'Available Today' ? 'available' :
                doctor.availability === 'Fully Booked' ? 'booked' : 'leave'
              }`}>
                {doctor.availability}
              </span>
            </div>
            
            <p className="profile-about">{doctor.about}</p>
            
            {isAvailable && (
              <Link to={`/book/${doctor.id}`} className="book-appointment-btn">
                Book Appointment
              </Link>
            )}
          </div>
        </div>
        
        <div className="schedule-section">
          <h3>Available Schedule</h3>
          <div className="schedule-grid">
            {Object.entries(doctor.schedule).map(([day, times]) => (
              <div key={day} className="schedule-day">
                <h4 className="day-name">{day}</h4>
                {times.length > 0 ? (
                  <div className="time-slots">
                    {times.map(time => (
                      <div key={time} className="time-slot">
                        {time}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-times">Not available</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;