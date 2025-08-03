import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext.jsx';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const { getDoctorById, addAppointment } = useAppointment();
  
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const doctor = getDoctorById(doctorId);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addAppointment({
        doctorId: doctorId,
        patientName: formData.patientName,
        email: formData.email,
        date: formData.date,
        time: formData.time
      });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Appointment Confirmed!</h2>
          <p>
            Your appointment with {doctor.name} has been successfully booked for {formData.date} at {formData.time}.
          </p>
          <div className="success-actions">
            <Link to={`/doctor/${doctorId}`} className="btn-primary">
              Back to Profile
            </Link>
            <Link to="/" className="btn-secondary">
              Find More Doctors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get available times for selected date
  const getAvailableTimesForDate = () => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    return doctor.schedule[dayName] || [];
  };

  const availableTimes = getAvailableTimesForDate();

  return (
    <div className="book-appointment">
      <Link to={`/doctor/${doctorId}`} className="back-link">
        ← Back to {doctor.name}'s profile
      </Link>
      
      <div className="booking-card">
        <div className="booking-header">
          <h1>Book Appointment</h1>
          <p>with {doctor.name} - {doctor.specialization}</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name *</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className={errors.patientName ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.patientName && <span className="error-message">{errors.patientName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">Preferred Time *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={errors.time ? 'error' : ''}
              disabled={!formData.date}
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <span className="error-message">{errors.time}</span>}
            {formData.date && availableTimes.length === 0 && (
              <span className="warning-message">No available times for selected date</span>
            )}
          </div>

          <button
            type="submit"
            disabled={formData.date && availableTimes.length === 0}
            className="submit-btn"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;