import React, { useState } from 'react';
import { Clock, MapPin, Check, Star, ArrowRight, Sparkles, Shield, Users } from 'lucide-react';
import { packagesData } from '../data/travelData';

export default function PackagesSection({ onSelectPackage, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Himachal Pradesh', 'Uttarakhand', 'Bestsellers'];

  const filteredPackages = packagesData.filter((pkg) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Himachal Pradesh') return pkg.state === 'Himachal Pradesh';
    if (activeTab === 'Uttarakhand') return pkg.state === 'Uttarakhand';
    if (activeTab === 'Bestsellers') return pkg.badge.toLowerCase().includes('bestseller') || pkg.badge.toLowerCase().includes('popular');
    return true;
  });

  return (
    <section id="packages" className="py-20 sm:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              All-Inclusive Itineraries
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Curated Tour Packages
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            Complete hassle-free packages including verified mountain hotels, sanitized vehicles, meals, and experienced local Pahadi tour leads.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Top: Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1000&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-white backdrop-blur-md shadow-sm">
                    {pkg.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-sm">
                    {pkg.discount}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating}</span>
                  <span className="text-slate-400 font-normal">({pkg.reviews})</span>
                </div>

                {/* Duration Pill at bottom left of image */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{pkg.destination}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Pickup:</span> {pkg.startingPoint}
                  </p>

                  {/* Inclusions Highlights */}
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Inclusions:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {pkg.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: Price and Actions */}
                <div className="pt-4 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">SAVE ₹{(pkg.originalPrice - pkg.price).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      ₹{pkg.price.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-slate-500"> / person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onOpenBooking({ packageId: pkg.id, title: pkg.title, price: pkg.price })}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
