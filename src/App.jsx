import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Cabinet from './components/Cabinet.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';
import AppointmentModal from './components/AppointmentModal.jsx';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenBooking = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-slate-900">
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />
        <About />
        <Services onSelectService={handleOpenBooking} />
        <Cabinet />
        <Testimonials />
      </main>

      <Footer />

      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
