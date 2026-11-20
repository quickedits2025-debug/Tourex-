import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Car, Calendar, Users, Hotel, ShieldCheck } from 'lucide-react';
import { createInquiry } from '../lib/supabaseClient';

export default function CustomTripPlanner({ onOpenBooking }) {
  const [selectedState, setSelectedState] = useState('Himachal'); // 'Himachal' | 'Uttarakhand' | 'Combined'
  const [durationDays, setDurationDays] = useState(5);
  const [travelers, setTravelers] = useState(4);
  const [stayTier, setStayTier] = useState('premium'); // 'standard' | 'premium' | 'luxury'
  const [vehicle, setVehicle] = useState('innova'); // 'sedan' | 'innova' | 'tempo' | 'thar'

  // Pricing calculations
  const calculateEstimate = () => {
    // Base per person per day hotel + food
    let dailyStayCost = 1500;
    if (stayTier === 'premium') dailyStayCost = 2400;
    if (stayTier === 'luxury') dailyStayCost = 4200;

    // Vehicle per day cost
    let dailyVehicleCost = 3500; // sedan
    if (vehicle === 'innova') dailyVehicleCost = 5500;
    if (vehicle === 'thar') dailyVehicleCost = 6500;
    if (vehicle === 'tempo') dailyVehicleCost = 7500;

    const totalStay = dailyStayCost * durationDays * travelers;
    const totalTransport = dailyVehicleCost * durationDays;
    const guideAndPermits = 1200 * durationDays;

    const grandTotal = totalStay + totalTransport + guideAndPermits;
    const perPerson = Math.round(grandTotal / travelers);

    return { grandTotal, perPerson };
  };

  const { grandTotal, perPerson } = calculateEstimate();

  const handleBookCustom = () => {
    // Log custom itinerary inquiry to Supabase
    createInquiry({
      destination: `${selectedState} (${durationDays} Days)`,
      service_type: 'custom_circuit',
      guests: `${travelers} People`,
      phone: 'Pending in modal',
      source: 'custom_trip_planner',
      status: 'new',
      metadata: {
        stayTier,
        vehicle,
        durationDays,
        estimatedPerPerson: perPerson,
        grandTotal
      }
    }).catch(err => console.warn('Custom planner inquiry error:', err));

    onOpenBooking({
      customPlan: true,
      destination: `${selectedState} Custom Circuit (${durationDays} Days)`,
      travelers: `${travelers} People`,
      vehicle: vehicle.toUpperCase(),
      stayTier: stayTier.toUpperCase(),
      estimatedCost: perPerson
    });
  };

  return (
    <section id="planner" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Cost Estimator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Design Your Own Custom Himalayan Trip
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal">
            Pick your preferred state, days, hotel category, and vehicle. Get an instant realistic quote with zero hidden charges.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-8 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-8">
            
            {/* 1. Region / State */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                1. Select Himalayan Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Himachal', name: 'Himachal Pradesh', sub: 'Manali, Spiti, Kasol, Jibhi' },
                  { id: 'Uttarakhand', name: 'Uttarakhand', sub: 'Kedarnath, Rishikesh, Auli' },
                  { id: 'Combined', name: 'Both (Grand Circuit)', sub: 'Best of both states' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedState(item.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      selectedState === item.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm text-white flex items-center justify-between">
                      {item.name}
                      {selectedState === item.id && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration & Travelers Slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    2. Duration: <span className="text-white font-black text-sm">{durationDays} Days / {durationDays - 1} Nights</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>3 Days (Weekend)</span>
                  <span>7 Days (Classic)</span>
                  <span>12 Days (Deep Expedition)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Travelers: <span className="text-white font-black text-sm">{travelers} Person{travelers > 1 ? 's' : ''}</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Solo</span>
                  <span>4 Group / Family</span>
                  <span>16+ Tempo</span>
                </div>
              </div>
            </div>

            {/* 3. Stay Standard */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                3. Choose Accommodation Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', name: 'Cozy Mountain Stays', desc: 'Clean, warm wooden homestays' },
                  { id: 'premium', name: '3-4 Star Mountain View', desc: 'Resorts with valley balcony & buffet' },
                  { id: 'luxury', name: 'Luxury Glamping & 5-Star', desc: 'Jacuzzi suites, premium chalets' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setStayTier(tier.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      stayTier === tier.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-bold text-sm text-white flex items-center justify-between">
                      {tier.name}
                      {stayTier === tier.id && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Vehicle Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-3">
                4. Dedicated Mountain Vehicle
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'sedan', name: 'Dzire / Etios', note: 'Best for 2-3 pax' },
                  { id: 'innova', name: 'Innova Crysta', note: 'Top comfort for 4-6' },
                  { id: 'thar', name: '4x4 Thar / Scorpio', note: 'Best for Spiti/Snow' },
                  { id: 'tempo', name: 'Force Tempo Traveller', note: 'For 9-16 friends' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicle(v.id)}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      vehicle === v.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <Car className={`w-5 h-5 mx-auto mb-1 ${vehicle === v.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div className="font-bold text-xs text-white">{v.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{v.note}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Live Quote Summary Card */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                Instant Quote Summary
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Customized Package
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedState} • {durationDays} Days • {travelers} Travelers
              </p>
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Duration</span>
                <span className="font-semibold text-slate-800">{durationDays} Days / {durationDays - 1} Nights</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Stay Category</span>
                <span className="font-semibold text-slate-800 capitalize">{stayTier} Stays (Breakfast & Dinner)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Dedicated Vehicle</span>
                <span className="font-semibold text-slate-800 uppercase">{vehicle} (All Tolls & Fuel)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pahadi Guide & Permits</span>
                <span className="font-semibold text-emerald-600">Included</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Medical Oxygen Backup</span>
                <span className="font-semibold text-emerald-600">Complimentary</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Estimated Price per Person</span>
              <div className="text-3xl font-black text-slate-950">
                ₹{perPerson.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500"> / person</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Total for group of {travelers}: ₹{grandTotal.toLocaleString('en-IN')} (approx)
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleBookCustom}
                className="w-full py-4 px-6 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Book This Custom Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/919816054321?text=Hi%20Tourex%20Himalaya%2C%20I%20configured%20a%20custom%20trip%20for%20${selectedState}%20for%20${durationDays}%20Days%20with%20${travelers}%20people%20using%20${vehicle}.%20Estimated%20per%20person%20%E2%82%B9${perPerson}.%20Please%20send%20detailed%20itinerary.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-6 rounded-full border border-emerald-600 text-emerald-700 font-semibold text-xs text-center block hover:bg-emerald-50 transition-colors"
              >
                Get Custom Itinerary on WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero lock-in fee. 100% customizable with our expert</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
