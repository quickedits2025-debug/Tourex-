import React, { useState } from 'react';
import { Send, Car, Building2, MapPin, Calendar, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { destinationsData } from '../data/travelData';
import { createInquiry } from '../lib/supabaseClient';

export default function Hero({ onOpenBooking, onFilterChange }) {
  const [activeTab, setActiveTab] = useState('tour'); // 'tour' | 'cab' | 'hotel'
  const [selectedDest, setSelectedDest] = useState('Spiti Valley, Himachal');
  const [checkInDate, setCheckInDate] = useState('2026-12-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-12-21');
  const [guestCount, setGuestCount] = useState('4 People');

  const handleReserve = (e) => {
    e.preventDefault();

    // Asynchronously record initial search intention into Supabase inquiries
    createInquiry({
      destination: selectedDest,
      service_type: activeTab,
      dates: `${checkInDate} to ${checkOutDate}`,
      guests: guestCount,
      phone: 'Inquiry from Hero Search',
      source: 'hero_floating_widget',
      status: 'new',
      metadata: { checkInDate, checkOutDate }
    }).catch(err => console.warn('Inquiry log error:', err));

    onOpenBooking({
      serviceType: activeTab,
      destination: selectedDest,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount
    });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark & Atmospheric Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Himalayan mountain chalet landscape"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Soft atmospheric gradient mimicking the reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Himachal & Uttarakhand Tour Specialists
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white font-sans">
              Let’s find your <br />
              <span className="font-serif italic font-normal text-emerald-300">next adventure</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-xl font-normal leading-relaxed">
              Curated Himalayan tour packages crafted by native locals. From the snow-laden heights of Spiti and Auli to the divine tranquility of Kedarnath and Jibhi pine valleys.
            </p>

            {/* Pill CTA button matching the reference design */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#packages"
                className="group inline-flex items-center pl-7 pr-2 py-2 rounded-full bg-white text-slate-900 font-semibold text-sm shadow-xl hover:shadow-2xl hover:bg-slate-100 transition-all duration-300"
              >
                <span>Take a tour</span>
                <span className="ml-5 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>

              <a
                href="#planner"
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/30 transition-all"
              >
                Custom Itinerary Planner
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Govt. HP Tourism Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Cancellation Flexibility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Local Pahadi Tour Guides</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Booking Card - Exactly matching the reference image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-gray-100/80 transition-all hover:shadow-emerald-950/20">
              
              {/* Top Tabs: Tour / Cab / Hotels */}
              <div className="flex items-center justify-between p-1 bg-slate-100/90 rounded-2xl mb-6 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('tour')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'tour'
                      ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Tour</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cab')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'cab'
                      ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Car className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cab / Tempo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('hotel')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'hotel'
                      ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Hotels</span>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleReserve} className="space-y-4">
                {/* Destination Field */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Destination
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                    </div>
                    <select
                      value={selectedDest}
                      onChange={(e) => setSelectedDest(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="Spiti Valley, Himachal">Spiti Valley, Himachal - 12,500 ft</option>
                      <option value="Manali & Solang, Himachal">Manali & Solang, Himachal - 6,700 ft</option>
                      <option value="Kedarnath & Tungnath, Uttarakhand">Kedarnath & Tungnath, Uttarakhand - 11,700 ft</option>
                      <option value="Rishikesh & Haridwar, Uttarakhand">Rishikesh & Haridwar, Uttarakhand</option>
                      <option value="Jibhi & Tirthan Valley, Himachal">Jibhi & Tirthan Valley, Himachal</option>
                      <option value="Auli & Chopta, Uttarakhand">Auli & Chopta (Ski & Snow), Uttarakhand</option>
                      <option value="Nainital & Jim Corbett, Uttarakhand">Nainital & Jim Corbett Safari</option>
                      <option value="Kasol & Tosh, Himachal">Kasol & Tosh Parvati Valley</option>
                      <option value="Dharamshala & Bir Billing, Himachal">Dharamshala & Bir Billing Paragliding</option>
                    </select>
                  </div>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Check In
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                      </div>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                      Check Out
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                      </div>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Guests / Travelers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Users className="w-4 h-4 text-emerald-700" />
                    </div>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="1 Solo Traveler">1 Solo Traveler</option>
                      <option value="2 People (Couple / Friends)">2 People (Couple / Friends)</option>
                      <option value="4 People (Family / Group)">4 People (Family / Group)</option>
                      <option value="6 - 8 People (Innova / 2 Cabs)">6 - 8 People (Innova / 2 Cabs)</option>
                      <option value="12+ People (Tempo Traveller)">12+ People (Tempo Traveller / Group)</option>
                    </select>
                  </div>
                </div>

                {/* Big Black Pill Button - Exactly like reference image */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-slate-950 text-white font-bold text-sm tracking-wide hover:bg-emerald-700 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-slate-950/20 flex items-center justify-center gap-2 group"
                  >
                    <span>Reserve Your Trip</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    🔒 Instant quote, no advance payment required to inquire
                  </p>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
