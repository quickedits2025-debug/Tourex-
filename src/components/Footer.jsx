import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp, Loader2, CheckCircle2 } from 'lucide-react';
import { subscribeNewsletter } from '../lib/supabaseClient';

export default function Footer({ onOpenBooking }) {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsEmail || !newsEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    setSubscribing(true);
    setSubscribedMsg('');
    const res = await subscribeNewsletter(newsEmail);
    setSubscribing(false);
    if (res.success) {
      setSubscribedMsg('Subscribed! Check your inbox for exclusive deals.');
      setNewsEmail('');
    } else {
      setSubscribedMsg(res.message || 'Thanks for subscribing!');
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-600 transform -rotate-12" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                tourex<span className="text-emerald-400 font-light text-sm ml-1 uppercase tracking-widest">himalaya</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Authentic Himalayan travel company registered with Himachal Tourism Department. Specializing in customized tour packages, luxury mountain camps, and private hill cabs across Himachal and Uttarakhand.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HP Tourism Reg No: HP/TO-2024/7829-M</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Uttarakhand Tourism Partner Desk: UK-TOUR-5102</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Himachal Tours
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Spiti Valley 4x4 Tour</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Manali & Solang Valley</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Kasol & Parvati Valley</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Jibhi & Tirthan Valley</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Dharamshala & Bir Billing</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Shimla & Kufri Winter</a></li>
            </ul>
          </div>

          {/* Uttarakhand Circuits */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Uttarakhand Tours
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Kedarnath & Tungnath Yatra</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Do Dham & Chardham Yatra</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Rishikesh Rafting & Camping</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Auli Ski & Snow Odyssey</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Nainital & Jim Corbett Safari</a></li>
              <li><a href="#destinations" className="hover:text-emerald-400 transition-colors">Mussoorie & Dhanaulti Hills</a></li>
            </ul>
          </div>

          {/* Offices & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Headquarters & Concierge
            </h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Himachal Operations Office:</strong>
                  Near Hadimba Temple Road, The Mall, Old Manali, Distt. Kullu, Himachal Pradesh - 175131
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Uttarakhand Hub:</strong>
                  Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-slate-200">24x7 Helpline: </strong>
                  <a href="tel:+919816054321" className="hover:text-white transition-colors">+91 98160 54321</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-slate-200">Email: </strong>
                  <a href="mailto:concierge@tourexhimalaya.com" className="hover:text-white transition-colors">concierge@tourexhimalaya.com</a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    required
                    placeholder="Enter email for secret deals"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    {subscribing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Join'}
                  </button>
                </div>
                {subscribedMsg && (
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{subscribedMsg}</span>
                  </p>
                )}
              </form>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Tourex Himalaya. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in the Himalayas for Indian travelers.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors border border-slate-800"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
