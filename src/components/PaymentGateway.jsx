import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, HelpCircle, Check, ArrowRight, Loader2, 
  CreditCard, Smartphone, Building, QrCode, Copy, CheckCircle2, ChevronDown 
} from 'lucide-react';

export default function PaymentGateway({ 
  amount, 
  totalAmount, 
  bookingDetails, 
  appliedDiscount, 
  discountAmount,
  onApplyCoupon,
  couponCode,
  setCouponCode,
  couponSuccess,
  couponError,
  onPaymentSuccess, 
  onBack 
}) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiProvider, setUpiProvider] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'other'
  const [upiId, setUpiId] = useState('');
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [upiVerified, setUpiVerified] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardCountry, setCardCountry] = useState('India');
  const [cardZip, setCardZip] = useState('110001');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // Survey
  const [heardAbout, setHeardAbout] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Formatting card number
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const parts = val.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const handleVerifyUpi = () => {
    if (!upiId || !upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g. 9812345678@okhdfcbank or yourname@ybl)');
      return;
    }
    setIsVerifyingUpi(true);
    setTimeout(() => {
      setIsVerifyingUpi(false);
      setUpiVerified(true);
    }, 600);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    const paymentInfo = {
      method: paymentMethod,
      provider: paymentMethod === 'upi' ? upiProvider : paymentMethod === 'card' ? 'Card' : selectedBank,
      transactionId: `TXN_${paymentMethod.toUpperCase()}_${Math.floor(10000000 + Math.random() * 90000000)}`,
      paidAmount: amount,
      totalAmount: totalAmount,
      balanceDue: totalAmount - amount,
      heardAbout: heardAbout || 'Direct Website',
      paidAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(paymentInfo);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF9F6] p-4 sm:p-8 rounded-3xl text-slate-800">
      
      {/* Top Header matching reference styling */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official 256-Bit SSL Encrypted Checkout</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Confirm Your Himalayan Tour
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Pay 25% advance token today • Balance payable on arrival in Himachal • 100% Refundable up to 10 days before trip
        </p>
      </div>

      {/* Main Grid: Left Payment Methods vs Right Order Summary (Exact replica of reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        
        {/* LEFT COLUMN: Payment Options */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>Select a payment method</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              </label>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Zero Convenience Fee
              </span>
            </div>

            {/* Payment Method Selector Pill Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => { setPaymentMethod('upi'); setUpiVerified(false); }}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building className="w-4 h-4 text-emerald-600" />
                <span>Net Banking</span>
              </button>
            </div>
          </div>

          {/* METHOD 1: UPI (Google Pay, PhonePe, Paytm, QR) */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              
              {/* Provider Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Choose Preferred UPI App:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* Google Pay */}
                  <button
                    type="button"
                    onClick={() => { setUpiProvider('gpay'); setShowQr(false); }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      upiProvider === 'gpay'
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {/* GPay SVG */}
                    <div className="h-6 flex items-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path fill="#34A853" d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        <circle cx="12" cy="12" r="2.5" fill="#FBBC05" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-slate-900">Google Pay</span>
                  </button>

                  {/* PhonePe */}
                  <button
                    type="button"
                    onClick={() => { setUpiProvider('phonepe'); setShowQr(false); }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      upiProvider === 'phonepe'
                        ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#5f259f] text-white font-extrabold text-[12px] flex items-center justify-center">
                      पे
                    </div>
                    <span className="text-xs font-bold text-slate-900">PhonePe</span>
                  </button>

                  {/* Paytm */}
                  <button
                    type="button"
                    onClick={() => { setUpiProvider('paytm'); setShowQr(false); }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                      upiProvider === 'paytm'
                        ? 'border-sky-500 bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="h-6 flex items-center font-black text-xs text-[#00b9f5] tracking-tighter">
                      Pay<span className="text-[#002e6e]">tm</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">Paytm UPI</span>
                  </button>
                </div>
              </div>

              {/* UPI ID Input Form */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Enter {upiProvider.toUpperCase()} ID / VPA
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={
                        upiProvider === 'gpay'
                          ? 'mobilenumber@okhdfcbank'
                          : upiProvider === 'phonepe'
                          ? 'mobilenumber@ybl'
                          : 'mobilenumber@paytm'
                      }
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setUpiVerified(false);
                      }}
                      className="w-full px-3.5 py-3 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                    {upiVerified && (
                      <span className="absolute right-3 top-3.5 text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyUpi}
                    disabled={isVerifyingUpi || !upiId}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs transition-colors shrink-0"
                  >
                    {isVerifyingUpi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Verify'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  A payment request notification will be sent to your {upiProvider.toUpperCase()} app.
                </p>
              </div>

              {/* OR SCAN QR CODE Option */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQr(!showQr)}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>{showQr ? 'Hide UPI QR Code' : 'Or Scan Instant UPI QR Code on any app'}</span>
                </button>

                {showQr && (
                  <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2 animate-fadeIn">
                    <p className="text-xs font-bold text-slate-800">
                      Scan with Google Pay, PhonePe, Paytm, or BHIM
                    </p>
                    {/* Simulated Authentic Indian UPI QR Code */}
                    <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=tourexhimalaya@okaxis%26pn=Tourex%20Himalaya%20Travels%26am=5000%26cu=INR"
                        alt="Tourex Himalaya UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      UPI ID: <strong className="text-slate-800">tourexhimalaya@okaxis</strong>
                    </div>
                    <span className="inline-block text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                      ● Amount auto-set to ₹{amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* METHOD 2: CREDIT / DEBIT CARDS (Replicating reference layout) */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              
              {/* Card Number with Visa/Mastercard/RuPay Badges */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold tracking-wider text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                  {/* Card logos matching reference screenshot */}
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[10px] font-black text-blue-800 border border-blue-200">
                      VISA
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-red-50 text-[10px] font-black text-red-600 border border-red-200">
                      MC
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-[10px] font-black text-amber-800 border border-amber-200">
                      RuPay
                    </span>
                  </div>
                </div>
              </div>

              {/* Expiration and CVC Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Country and Zip Row (matching reference) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Country
                  </label>
                  <select
                    value={cardCountry}
                    onChange={(e) => setCardCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900 appearance-none bg-white"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    PIN / Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 110001"
                    value={cardZip}
                    onChange={(e) => setCardZip(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

            </div>
          )}

          {/* METHOD 3: NET BANKING */}
          {paymentMethod === 'netbanking' && (
            <div className="space-y-3 pt-1 animate-fadeIn">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Select Your Bank
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'sbi', name: 'State Bank of India' },
                  { id: 'hdfc', name: 'HDFC Bank' },
                  { id: 'icici', name: 'ICICI Bank' },
                  { id: 'axis', name: 'Axis Bank' },
                  { id: 'pnb', name: 'Punjab National Bank' },
                  { id: 'kotak', name: 'Kotak Mahindra' },
                ].map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedBank === bank.id
                        ? 'border-emerald-600 bg-emerald-50 text-slate-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SSL and Security Seal (Matching reference footer) */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured with 256-Bit SSL</span>
            </div>
            <span className="text-[11px] text-slate-400">
              RBI & NPCI Compliant Gateway
            </span>
          </div>

          {/* Support Line */}
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Have any questions? Write to our support team at{' '}
            <a href="mailto:concierge@tourexhimalaya.com" className="text-emerald-700 underline font-medium">concierge@tourexhimalaya.com</a>{' '}
            or call <strong className="text-slate-700">+91 98160 54321</strong>.
          </p>

        </div>

        {/* RIGHT COLUMN: Gift Card, Dark Order Summary & Action (Exact replica of reference) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* GIFT CARD OR DISCOUNT CODE (Exact layout from reference) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
              Gift Card or Discount Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="HIMALAYA10"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm uppercase font-bold tracking-wider text-slate-900 focus:outline-none focus:border-slate-900"
              />
              <button
                type="button"
                onClick={onApplyCoupon}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
              >
                Apply
              </button>
            </div>
            {couponSuccess && <p className="text-xs text-emerald-600 font-semibold">{couponSuccess}</p>}
            {couponError && <p className="text-xs text-rose-500 font-semibold">{couponError}</p>}
          </div>

          {/* DARK ORDER SUMMARY CARD (Matching dark blue/black container in reference) */}
          <div className="bg-[#0e1726] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 border border-slate-800 relative overflow-hidden">
            
            {/* Header / Subtitle in card */}
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Himalayan Tour Reservation
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {bookingDetails?.destination || 'Custom Circuit'}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{bookingDetails?.guests || '2 People'}</span>
                  <span className="text-xs font-semibold text-slate-300">Ex-{bookingDetails?.pickupCity?.split(' ')[0] || 'Delhi'}</span>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Package Price</span>
                <span className="font-semibold text-white">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Early Bird Discount ({(appliedDiscount * 100)}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>Advance Token (Payable Today)</span>
                <span className="font-bold text-white">25%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining on Arrival in Himachal</span>
                <span className="text-slate-300">₹{(totalAmount - discountAmount - amount).toLocaleString('en-IN')} (75%)</span>
              </div>
            </div>

            {/* Prominent TODAY'S TOTAL Highlight (Exact layout from reference) */}
            <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-slate-300 block">Today's Token</span>
                <span className="text-[10px] text-slate-500">Secures hotel & mountain cab</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-emerald-400">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* BIG VIBRANT ACTION BUTTON (Matching the green button in reference screenshot) */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.99] text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Processing with {paymentMethod === 'upi' ? upiProvider.toUpperCase() : 'Bank Gateway'}...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'upi'
                        ? `Pay ₹${amount.toLocaleString('en-IN')} via ${upiProvider === 'gpay' ? 'Google Pay' : upiProvider === 'phonepe' ? 'PhonePe' : 'Paytm'}`
                        : `Pay Advance Token ₹${amount.toLocaleString('en-IN')}`}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBack}
                disabled={isProcessing}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Edit Traveler Details
              </button>
            </div>

            {/* Terms clause (matching reference) */}
            <p className="text-[10px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
              By clicking 'Pay Advance Token', you agree to Tourex Himalaya booking policies, standard cancellation terms, and permit authorizations. Full refund on cancellations made at least 10 days prior to departure.
            </p>

          </div>

          {/* Optional Survey (Exact replica of reference dropdown: "How did you first hear about us?") */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
              How did you first hear about us? (optional)
            </label>
            <div className="relative">
              <select
                value={heardAbout}
                onChange={(e) => setHeardAbout(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-slate-900 appearance-none shadow-sm"
              >
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Instagram / Reels">Instagram / Reels</option>
                <option value="Friend or Family Recommendation">Friend or Family Recommendation</option>
                <option value="YouTube Travel Vlog">YouTube Travel Vlog</option>
                <option value="Facebook Community">Facebook Community</option>
                <option value="Word of Mouth">Word of Mouth</option>
              </select>
              <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
