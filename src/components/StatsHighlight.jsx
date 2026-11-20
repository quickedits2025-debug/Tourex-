import React from 'react';
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function StatsHighlight({ onOpenBooking }) {
  const stats = [
    {
      value: "97%",
      label: "Customer Satisfaction",
      desc: "Based on 4,800+ verified Indian travelers"
    },
    {
      value: "85+",
      label: "Popular Destinations",
      desc: "Across Himachal Pradesh & Uttarakhand"
    },
    {
      value: "245+",
      label: "Experienced Guides",
      desc: "Native Pahadi mountaineers & drivers"
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Vertical Cards matching the reference image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Tall Card: Alpine Lake with wooden boat */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative group">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                  alt="Emerald Himalayan lake and mountain reflection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Floating caption pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-slate-900 shadow-lg border border-white/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Spotlight</p>
                      <h4 className="text-sm font-bold text-slate-900">Chandratal & Naini Lake</h4>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      ★ 4.9 / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Accent Card */}
              <div className="hidden sm:block absolute -top-6 -right-6 w-36 sm:w-44 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80"
                  alt="Kedarnath shrine peaks"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Native Pahadi Experience Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Native Pahadi Hospitality</p>
                  <p className="text-sm font-bold text-white">Local Rooted Experience</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Typography & Metrics - Exactly matching reference */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Why Thousands Choose Us
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Traveling brings you closer to new places, people, and memories
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Born in the lap of Himachal, Tourex Himalaya is run by native mountain experts. We remove the uncertainty of hill travel with meticulously planned private cabs, certified guides, verified boutique stays, and round-the-clock road support.
              </p>
            </div>

            {/* Stats Row from the reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-500">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action pill & CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking({ destination: 'Custom Himachal & Uttarakhand' })}
                className="px-7 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-md"
              >
                Plan With A Local Expert
              </button>
              <a
                href="#reviews"
                className="px-6 py-3.5 rounded-full border border-slate-300 text-slate-700 font-medium text-sm hover:border-slate-900 transition-colors"
              >
                Read Traveler Stories
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
