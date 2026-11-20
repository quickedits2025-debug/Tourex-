import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  return (
    <aside aria-label="Support contacts" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Helpful tooltip badge */}
      <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 text-white text-[11px] font-medium py-1.5 px-3 rounded-full shadow-lg backdrop-blur-md border border-slate-700/60 animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Online: Instant Pahadi Travel Expert</span>
      </div>

      <a
        href="https://wa.me/919816054321?text=Hello%20Tourex%20Himalaya!%20I%20am%20planning%20a%20trip%20to%20Himachal/Uttarakhand%20and%20would%20like%20to%20get%20a%20quote."
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label="Chat on WhatsApp with Mountain Concierge"
      >
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>
    </aside>
  );
}
