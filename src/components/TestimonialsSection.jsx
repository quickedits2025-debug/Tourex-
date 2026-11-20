import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { testimonialsData } from '../data/travelData';

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block">
            Real Reviews From Real Travelers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Stories From The Mountains
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Over 15,000 travelers from across India have trusted Tourex Himalaya for their dream vacations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-xs text-slate-500">{item.city} • <span className="text-emerald-700 font-medium">{item.trip}</span></p>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-slate-200 shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
