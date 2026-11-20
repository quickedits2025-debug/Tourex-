import React, { useState } from 'react';
import { X, Clock, MapPin, Check, AlertCircle, Shield, Calendar, Users, Phone, ArrowRight, Star } from 'lucide-react';

export default function PackageModal({ pkg, onClose, onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'inclusions' | 'policies'

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-gray-100">
        
        {/* Modal Top Header with Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-900 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1200&q=80";
            }}
            className="w-full h-full object-cover filter brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/20" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Top of Image */}
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow">
                {pkg.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                <MapPin className="w-3 h-3 inline mr-1 text-emerald-400" />
                {pkg.destination}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                <Clock className="w-3 h-3 inline mr-1 text-emerald-400" />
                {pkg.duration}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-gray-200 bg-slate-50 px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'inclusions'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'policies'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Important Guidelines & FAQs
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-gray-100">
                <span>Total Days: <strong className="text-slate-800">{pkg.duration}</strong></span>
                <span>Starting Point: <strong className="text-slate-800">{pkg.startingPoint}</strong></span>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {pkg.itinerary.map((item) => (
                  <div key={item.day} className="relative">
                    {/* Timeline bullet */}
                    <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center border-2 border-white shadow">
                      {item.day}
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-gray-100 space-y-1.5 ml-2 hover:border-gray-300 transition-colors">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Day {item.day}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-3">
                <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  What's Included in this Package:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-100 space-y-3">
                <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  What's Not Included:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: POLICIES */}
          {activeTab === 'policies' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                <h4 className="font-bold text-slate-900">Packing Essentials</h4>
                <p className="text-slate-600">
                  Thermal innerwear, down jacket / windproof fleece, sturdy trekking shoes with grip, sunglasses, lip balm & sunscreen (SPF 50+), power bank, personal medications.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                <h4 className="font-bold text-slate-900">Acclimatization & Safety</h4>
                <p className="text-slate-600">
                  For high-altitude locations like Spiti Valley (12,500 ft) and Kedarnath (11,755 ft), stay well hydrated. Our vehicles carry portable medical oxygen cylinders and first aid.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 space-y-1">
                <h4 className="font-bold text-slate-900">Payment & Cancellation Terms</h4>
                <p className="text-slate-600">
                  Only 25% advance token required to confirm. 100% refund on cancellations requested at least 10 days before departure date.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer with Pricing & Booking CTA */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{pkg.discount}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{pkg.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500"> / person</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking({ packageId: pkg.id, title: pkg.title, price: pkg.price });
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-950 hover:bg-emerald-600 text-white font-bold text-sm rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Book This Package Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
