import React from 'react';
import { Users, Briefcase, Shield, Check, ArrowRight } from 'lucide-react';
import { fleetData } from '../data/travelData';

export default function VehicleFleetSection({ onOpenBooking }) {
  return (
    <section id="fleet" className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Mountain Ready Transportation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Himalayan Fleet
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md">
            All our vehicles are hill-certified, maintained with strict safety checks, and driven by licensed mountain chauffeurs.
          </p>
        </div>

        {/* Fleet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetData.map((car, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {car.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {car.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      {car.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {car.luggage}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                    {car.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Outstation Rate</span>
                    <span className="text-sm font-bold text-slate-900">{car.ratePerKm}</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking({ serviceType: 'cab', vehicle: car.name })}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Cab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
