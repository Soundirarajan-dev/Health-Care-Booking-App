import React, { createContext, useContext, useState } from 'react';
import { doctors } from '../data/mockData.jsx';

const AppointmentContext = createContext();

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'Scheduled'
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const getDoctorById = (id) => {
    return doctors.find(doctor => doctor.id === id);
  };

  return (
    <AppointmentContext.Provider value={{
      doctors,
      appointments,
      searchTerm,
      setSearchTerm,
      filteredDoctors,
      addAppointment,
      getDoctorById
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};