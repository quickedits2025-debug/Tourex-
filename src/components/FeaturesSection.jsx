import React from 'react';
import { Compass, Users2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Compass,
      title: "Ease of travel",
      desc: "Door-to-door pickups from Delhi NCR, Chandigarh, or Dehradun. Sanitized vehicles and seamless permits handled entirely by our desk."
    },
    {
      icon: Users2,
      title: "Local Staff Help",
      desc: "Our drivers and guides are native Himachalis and Garhwalis who know the sacred legends, hidden viewpoints, and safest mountain routes."
    },
    {
      icon: ShieldCheck,
      title: "Safe and reliable",
      desc: "24/7 mountain helpline, GPS-tracked vehicles, emergency oxygen kits for high altitudes, and zero hidden commercial commissions."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title matching reference image */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get a good travel experience
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            A good travel experience is not just about the places visited, but also the stories, friendships, and peace brought back home.
          </p>
        </div>

        {/* 3-Col feature grid matching the layout in the reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center md:text-left">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-slate-900 text-slate-900 group-hover:text-emerald-400 flex items-center justify-center transition-colors mx-auto md:mx-0">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
