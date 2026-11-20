import React, { useState } from 'react';
import { MapPin, Star, ArrowUpRight, Compass } from 'lucide-react';
import { destinationsData } from '../data/travelData';

export default function DestinationBento({ onSelectDestination, onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = [
    'All',
    'Himachal Pradesh',
    'Uttarakhand',
    'Adventure & Treks',
    'Spiritual',
    'Honeymoon & Leisure'
  ];

  const filteredDestinations = destinationsData.filter((dest) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Himachal Pradesh') return dest.state === 'Himachal Pradesh';
    if (activeFilter === 'Uttarakhand') return dest.state === 'Uttarakhand';
    return dest.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Exactly from reference image: "Experience Our Destination" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Explore The Peaks & Valleys
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
              Experience Our Destination
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            Handpicked circuits across Devbhoomi Himachal & Uttarakhand. From raw high-altitude deserts to misty tea estates and holy riverbanks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bento Grid Layout - Styled with cards matching the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredDestinations.map((dest, idx) => {
            // Apply varied card styling for aesthetic visual interest
            const isLarge = idx === 0 || idx === 3;

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900 flex flex-col justify-end ${
                  isLarge ? 'md:col-span-2 lg:col-span-1 min-h-[360px] sm:min-h-[420px]' : 'min-h-[340px] sm:min-h-[380px]'
                }`}
              >
                {/* Background Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1200&q=80";
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Floating Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{dest.state}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 sm:p-7 space-y-2 text-white">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-medium">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Altitude: {dest.altitude} • {dest.idealDuration}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 font-normal leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Starts from</span>
                      <span className="text-lg font-extrabold text-white">
                        ₹{dest.priceFrom.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-400"> / person</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking({ destination: `${dest.name}, ${dest.state}` });
                      }}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-all group-hover:bg-emerald-500 group-hover:text-white"
                      title="Quick Book"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Want a customized multi-city circuit (e.g., Manali + Kasol + Jibhi or Rishikesh + Kedarnath)?
            </h4>
            <p className="text-xs text-slate-500">
              Our travel specialists will build your personalized route map with dedicated vehicle & stays.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking({ destination: 'Custom Multi-City Himalayan Circuit' })}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-600 transition-colors whitespace-nowrap shadow"
          >
            Create Custom Circuit
          </button>
        </div>

      </div>
    </section>
  );
}
