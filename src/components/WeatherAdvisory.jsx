import React from 'react';
import { AlertTriangle, CheckCircle, Info, RefreshCw, Mountain } from 'lucide-react';
import { advisoryData } from '../data/travelData';

export default function WeatherAdvisory() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Live Himalayan Route & Pass Status</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                </h3>
                <p className="text-xs text-slate-400">
                  Updated twice daily directly from our ground operations teams in Manali, Shimla & Dehradun.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Status Verified: Today 08:30 AM IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {advisoryData.map((item, idx) => (
              <div key={idx} className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">{item.route}</span>
                  {item.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
                </div>

                <div className="text-xs text-slate-300">
                  {item.status}
                </div>

                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-700/80 text-emerald-300">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
