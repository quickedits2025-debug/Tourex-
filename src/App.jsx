import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PillTextBanner from './components/PillTextBanner';
import StatsHighlight from './components/StatsHighlight';
import DestinationBento from './components/DestinationBento';
import PackagesSection from './components/PackagesSection';
import PackageModal from './components/PackageModal';
import CustomTripPlanner from './components/CustomTripPlanner';
import FeaturesSection from './components/FeaturesSection';
import VehicleFleetSection from './components/VehicleFleetSection';
import WeatherAdvisory from './components/WeatherAdvisory';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { supabase, signOutUser } from './lib/supabaseClient';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState(null);
  
  // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('signup');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
      }
    });

    // Listen to session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
      } else {
        // If not session user and not manually set demo user, reset
        if (!currentUser?.name) {
          setCurrentUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOpenAuth = (mode = 'signup') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const handleOpenBooking = (data = {}) => {
    setBookingModalData(data);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setBookingModalData(null);
  };

  const handleSelectDestination = (dest) => {
    handleOpenBooking({
      destination: `${dest.name}, ${dest.state}`,
      price: dest.priceFrom
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Top Navbar with Auth Props */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onSelectDestination={handleSelectDestination}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      <main className="flex-1">
        {/* 1. Hero Section matching reference image */}
        <Hero
          onOpenBooking={handleOpenBooking}
        />

        {/* 2. Creative Typography with Embedded Pill Images */}
        <PillTextBanner />

        {/* 3. Stats & About Highlight matching reference image */}
        <StatsHighlight
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. Experience Our Destination Bento Grid matching reference image */}
        <DestinationBento
          onSelectDestination={handleSelectDestination}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Curated Tour Packages Section */}
        <PackagesSection
          onSelectPackage={setSelectedPackage}
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Custom Itinerary Planner & Real-Time Price Estimator */}
        <CustomTripPlanner
          onOpenBooking={handleOpenBooking}
        />

        {/* 7. Key Features / Value Pillars from reference image */}
        <FeaturesSection />

        {/* 8. Dedicated Vehicle Fleet (Innova Crysta, Tempo, Thar, Dzire) */}
        <VehicleFleetSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 9. Live Road & Weather Status Advisory */}
        <WeatherAdvisory />

        {/* 10. Traveler Testimonials */}
        <TestimonialsSection />

        {/* 11. Frequently Asked Questions */}
        <FAQSection
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
      />

      {/* Package Day-by-Day Itinerary Modal */}
      {selectedPackage && (
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Universal Booking / Reservation Modal */}
      {bookingModalOpen && (
        <BookingModal
          initialData={bookingModalData}
          onClose={handleCloseBooking}
        />
      )}

      {/* Sign In & Sign Up Auth Modal (Matching Reference Image) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setAuthModalOpen(false);
        }}
      />

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
