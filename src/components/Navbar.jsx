import React, { useState, useEffect } from 'react';
import { Compass, Phone, MessageSquare, Menu, X, ArrowRight, MapPin, User, LogIn } from 'lucide-react';

export default function Navbar({ onOpenBooking, onSelectDestination }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Tour', href: '#packages' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Custom Plan', href: '#planner' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top Advisory Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ● Live Mountain Advisory
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="truncate text-slate-300">Atal Tunnel & Chardham routes active. 2026-27 Bookings Open with 20% Early Bird Off!</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200 text-[11px]">
            <a href="tel:+919816054321" className="flex items-center gap-1.5 hover:text-emerald-400 font-medium transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 98160 54321</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Manali & Dehradun
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Always crisp high contrast with dark readable text and icons */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Dark text and vivid emerald accent */}
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-emerald-400 transform -rotate-12 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-950 flex items-center">
                  tourex
                  <span className="text-emerald-600 font-extrabold text-xs ml-1.5 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-sans">
                    himalaya
                  </span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links - Bold Dark Charcoal text with emerald hover */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-slate-800 hover:text-emerald-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenBooking({ destination: 'Manali, Himachal' })}
                className="text-xs md:text-sm font-bold px-5 py-2.5 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-700 hover:text-white" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="text-xs md:text-sm font-bold px-5 py-2.5 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-500 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Book a Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-5 pt-4 pb-6 mt-3 space-y-3">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-900 font-bold text-base py-2 border-b border-gray-100 hover:text-emerald-600 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-500 transition-colors"
              >
                Book Your Himalayan Tour
              </button>
              <a
                href="https://wa.me/919816054321?text=Hi%20Tourex%20Himalaya%20team%2C%20I%20am%20interested%20in%20a%20tour%20package."
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 border-2 border-emerald-600 text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
