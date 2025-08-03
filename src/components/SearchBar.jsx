import React from 'react';
import { useAppointment } from '../context/AppointmentContext.jsx';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAppointment();

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search doctors by name or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;