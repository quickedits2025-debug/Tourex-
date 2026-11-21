import React, { useState } from 'react';
import { 
  X, CheckCircle, Calendar, Users, MapPin, Phone, Mail, User, 
  ShieldCheck, ArrowRight, Loader2, CreditCard, Lock, Smartphone, 
  Download, MessageSquare, CheckCircle2 
} from 'lucide-react';
import { createBooking } from '../lib/supabaseClient';
import PaymentGateway from './PaymentGateway';
import BillReceiptModal from './BillReceiptModal';

export default function BookingModal({ initialData, onClose }) {
  // Step 1: Traveler Details -> Step 2: Payment Gateway Checkout -> Step 3: Confirmed Voucher & Payment Receipt
  const [step, setStep] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);
  const [showBillModal, setShowBillModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: initialData?.destination || 'Spiti Valley, Himachal',
    serviceType: initialData?.serviceType || 'tour',
    checkIn: initialData?.checkIn || '2026-12-15',
    checkOut: initialData?.checkOut || '2026-12-21',
    guests: initialData?.guests || '2 People (Couple / Friends)',
    pickupCity: 'Delhi (Doorstep / Majnu Ka Tilla)',
    specialRequests: '',
    couponCode: '',
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [bookingId, setBookingId] = useState('');

  // Base estimate calculation
  const basePrice = initialData?.price || initialData?.estimatedCost || 12499;
  const guestMultiplier = formData.guests.includes('1') ? 1 : formData.guests.includes('2') ? 2 : formData.guests.includes('4') ? 4 : formData.guests.includes('6') ? 6 : 8;
  const subtotal = basePrice * guestMultiplier;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const totalPayable = subtotal - discountAmount;
  const tokenAdvance = Math.round(totalPayable * 0.25); // 25% token

  const handleApplyCoupon = () => {
    if (formData.couponCode.trim().toUpperCase() === 'HIMALAYA10') {
      setAppliedDiscount(0.10);
      setCouponSuccess('10% Early Bird Discount Applied!');
      setCouponError('');
    } else if (formData.couponCode.trim().toUpperCase() === 'FIRSTTRIP') {
      setAppliedDiscount(0.15);
      setCouponSuccess('15% First Trip Discount Applied!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try HIMALAYA10 or FIRSTTRIP');
      setCouponSuccess('');
    }
  };

  // Step 1 Submission: Validates traveler info and opens payment gateway
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your Name and WhatsApp phone number');
      return;
    }
    const generatedId = `TXH-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setStep(2); // Advance to Payment Gateway
  };

  // Step 2 Submission: Payment completed via Google Pay / PhonePe / Paytm / Card / NetBanking
  const handlePaymentCompleted = async (payInfo) => {
    setIsSubmitting(true);
    setPaymentResult(payInfo);

    const bookingPayload = {
      booking_id: bookingId,
      full_name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      destination: formData.destination,
      service_type: formData.serviceType || 'tour',
      check_in: formData.checkIn || null,
      check_out: formData.checkOut || null,
      guests: formData.guests,
      pickup_city: formData.pickupCity,
      special_requests: formData.specialRequests || null,
      coupon_code: formData.couponCode || null,
      discount_amount: discountAmount,
      total_payable: totalPayable,
      advance_token: tokenAdvance,
      status: 'advance_paid'
    };

    // Save to Supabase backend
    await createBooking(bookingPayload);
    setIsSubmitting(false);
    setStep(3); // Show confirmed voucher & payment receipt
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className={`relative w-full ${step === 2 ? 'max-w-5xl' : 'max-w-2xl'} bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 max-h-[94vh] flex flex-col transition-all duration-300`}>
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${step === 3 ? 'bg-emerald-400' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {step === 1 && 'Step 1 of 2: Tour & Traveler Details'}
                {step === 2 && 'Step 2 of 2: Secure Payment Gateway'}
                {step === 3 && 'Booking Confirmed & Advance Paid!'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {step === 1 && 'Reserve Your Himalayan Journey'}
              {step === 2 && 'Complete Your Advance Token Payment'}
              {step === 3 && 'Pack Your Bags for the Himalayas!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* ================= STEP 1: TRAVELER & TRIP DETAILS ================= */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Selected Destination Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Selected Destination / Circuit
                  </span>
                  <p className="text-sm font-bold text-slate-900">{formData.destination}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  All-Inclusive
                </span>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      required
                      className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      required
                      className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none appearance-none"
                    >
                      <option value="1 Solo Traveler">1 Solo Traveler</option>
                      <option value="2 People (Couple / Friends)">2 People (Couple / Friends)</option>
                      <option value="4 People (Family / Group)">4 People (Family / Group)</option>
                      <option value="6 People (Innova Group)">6 People (Innova Group)</option>
                      <option value="12+ People (Tempo Traveller)">12+ People (Tempo Traveller)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pickup City */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pickup City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <select
                    value={formData.pickupCity}
                    onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  >
                    <option value="Delhi (Doorstep / Airport / Majnu Ka Tilla)">Delhi NCR (Doorstep / IGI Airport / Majnu Ka Tilla)</option>
                    <option value="Chandigarh (Airport / Railway Station)">Chandigarh (Airport / Railway Station / Sector 43)</option>
                    <option value="Dehradun (Jolly Grant Airport / Haridwar)">Dehradun (Jolly Grant Airport / Haridwar)</option>
                    <option value="Ex-Himachal (Manali / Shimla direct)">Ex-Himachal (Manali / Shimla Hotel pickup)</option>
                  </select>
                </div>
              </div>

              {/* Traveler Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rohit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="e.g. 9812345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g. rohit@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (Try HIMALAYA10)"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-bold tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-xs text-emerald-600 font-semibold">{couponSuccess}</p>}
                {couponError && <p className="text-xs text-rose-500 font-semibold">{couponError}</p>}
              </div>

              {/* Price summary banner before gateway */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Total Tour Cost ({guestMultiplier} Travelers)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>Discount ({(appliedDiscount * 100)}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">25% Advance Token Today</span>
                    <span className="text-[11px] text-slate-400">Remaining 75% on arrival</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400">₹{tokenAdvance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Button to advance to Payment Gateway */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Payment Gateway (Google Pay, UPI, Cards)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero cancellation fee up to 10 days before departure</span>
              </div>
            </form>
          )}

          {/* ================= STEP 2: PAYMENT GATEWAY (Skillshare Reference Match) ================= */}
          {step === 2 && (
            <PaymentGateway
              amount={tokenAdvance}
              totalAmount={totalPayable}
              bookingDetails={formData}
              appliedDiscount={appliedDiscount}
              discountAmount={discountAmount}
              couponCode={formData.couponCode}
              setCouponCode={(val) => setFormData({ ...formData, couponCode: val })}
              onApplyCoupon={handleApplyCoupon}
              couponSuccess={couponSuccess}
              couponError={couponError}
              onPaymentSuccess={handlePaymentCompleted}
              onBack={() => setStep(1)}
            />
          )}

          {/* ================= STEP 3: CONFIRMED BOOKING & PAYMENT RECEIPT ================= */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-fadeIn">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Advance Token Paid Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Your Himalayan Tour is Reserved!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Booking Reference: <strong className="text-slate-900 font-mono text-sm">{bookingId}</strong>
                </p>
              </div>

              {/* Payment Receipt & Voucher Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left space-y-4 shadow-sm relative overflow-hidden">
                
                {/* Official Paid Stamp */}
                <div className="border-b border-dashed border-gray-300 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guest Name</span>
                    <h4 className="font-bold text-slate-900 text-base">{formData.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Payment Status</span>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                      ● PAID (Token Confirmed)
                    </p>
                  </div>
                </div>

                {/* Transaction details */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Paid Via:</span>
                    <strong className="text-slate-800 capitalize">{paymentResult?.provider || 'UPI (Google Pay / PhonePe)'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Transaction ID:</span>
                    <strong className="text-slate-800 font-mono text-[11px]">{paymentResult?.transactionId || 'TXN_UPI_89127391'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Amount Paid Today:</span>
                    <strong className="text-emerald-700 text-sm">₹{tokenAdvance.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Balance on Arrival:</span>
                    <strong className="text-slate-800 text-sm">₹{(totalPayable - tokenAdvance).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Tour Specifics */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block font-medium">Destination:</span>
                    <span className="font-bold text-slate-800">{formData.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Pickup City:</span>
                    <span className="font-bold text-slate-800">{formData.pickupCity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Travel Dates:</span>
                    <span className="font-bold text-slate-800">{formData.checkIn} to {formData.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Travelers:</span>
                    <span className="font-bold text-slate-800">{formData.guests}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your booking has been saved in our Supabase system. Our concierge team has been notified.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/919816054321?text=Hi%20Tourex%20Himalaya%20team!%20My%20Booking%20ID%20is%20${bookingId}.%20I%20have%20paid%20the%20advance%20token%20of%20%E2%82%B9${tokenAdvance}%20via%20${paymentResult?.provider || 'UPI'}.%20Transaction%20Ref:%20${paymentResult?.transactionId || 'TXN_CONFIRMED'}.%20Please%20send%20my%20resort%20and%20chauffeur%20voucher.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Mountain Concierge on WhatsApp</span>
                </a>

                <button
                  onClick={() => setShowBillModal(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download / Print Official Tax Invoice & Receipt</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Official Tax Invoice & Bill Receipt Modal */}
      <BillReceiptModal
        isOpen={showBillModal}
        onClose={() => setShowBillModal(false)}
        bookingData={{
          bookingId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          serviceType: formData.serviceType,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          pickupCity: formData.pickupCity,
          basePrice,
          subtotal,
          discountAmount,
          totalPayable,
          tokenAdvance,
          couponCode: formData.couponCode,
        }}
        paymentInfo={paymentResult}
      />
    </div>
  );
}
