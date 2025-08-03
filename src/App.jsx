import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppointmentProvider } from './context/AppointmentContext.jsx';
import Header from './components/Header.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DoctorProfile from './pages/DoctorProfile.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import './App.css';

function App() {
  return (
    <AppointmentProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/book/:doctorId" element={<BookAppointment />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppointmentProvider>
  );
}

export default App;