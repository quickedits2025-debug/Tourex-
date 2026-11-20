import React from 'react';

export default function PillTextBanner() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Creative Text with Embedded Pill Images - Directly from reference image */}
        <div className="inline-block text-left sm:text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-slate-900 tracking-tight leading-[1.3] font-sans">
            <span className="inline-block">Take the step and explore</span>{' '}
            {/* Pill 1: Mountain landscape capsule */}
            <span className="inline-block align-middle mx-2 my-1">
              <span className="inline-block w-28 sm:w-36 md:w-44 h-9 sm:h-12 md:h-14 rounded-full overflow-hidden shadow-md ring-2 ring-emerald-500/20 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt="Himalayan mountain vista"
                  className="w-full h-full object-cover filter contrast-105"
                />
              </span>
            </span>{' '}
            <span className="inline-block">the</span>
            <br className="hidden sm:inline" />
            <span className="inline-block font-serif italic font-normal text-emerald-800">world</span>{' '}
            {/* Pill 2: Blue alpine lake capsule */}
            <span className="inline-block align-middle mx-2 my-1">
              <span className="inline-block w-28 sm:w-36 md:w-44 h-9 sm:h-12 md:h-14 rounded-full overflow-hidden shadow-md ring-2 ring-emerald-500/20 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80"
                  alt="Sacred alpine lake"
                  className="w-full h-full object-cover filter contrast-105"
                />
              </span>
            </span>{' '}
            <span className="inline-block">waiting for you.</span>
          </h2>
        </div>

        {/* Subtitle from reference */}
        <p className="mt-8 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Traveling changes you. You see untouched snow peaks, meet warm Pahadi souls, and return home with timeless Himalayan memories.
        </p>

        {/* Quick state selection badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Popular Circuits:</span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 transition-colors cursor-pointer">
            🌲 Himachal: Manali • Spiti • Kasol • Jibhi • Shimla
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 transition-colors cursor-pointer">
            🏔️ Uttarakhand: Kedarnath • Rishikesh • Auli • Nainital
          </span>
        </div>

      </div>
    </section>
  );
}
