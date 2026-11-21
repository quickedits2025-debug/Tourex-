import React, { useRef } from 'react';
import { 
  X, Download, Printer, CheckCircle2, ShieldCheck, 
  MapPin, Phone, Mail, Calendar, Users, QrCode, ArrowLeft, MessageSquare 
} from 'lucide-react';

export default function BillReceiptModal({ isOpen, onClose, bookingData, paymentInfo }) {
  const invoiceRef = useRef(null);

  if (!isOpen || !bookingData) return null;

  const invoiceNumber = `INV-${bookingData.bookingId?.replace('TXH-', '') || '2026-891024'}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const basePrice = bookingData.basePrice || 12499;
  const guestMultiplier = bookingData.guests?.includes('1') ? 1 : bookingData.guests?.includes('2') ? 2 : bookingData.guests?.includes('4') ? 4 : bookingData.guests?.includes('6') ? 6 : 8;
  const subtotal = bookingData.subtotal || (basePrice * guestMultiplier);
  const discountAmount = bookingData.discountAmount || 0;
  const totalPayable = bookingData.totalPayable || (subtotal - discountAmount);
  const tokenAdvance = bookingData.tokenAdvance || Math.round(totalPayable * 0.25);
  const balanceDue = totalPayable - tokenAdvance;

  // Print function that targets only the invoice
  const handlePrint = () => {
    window.print();
  };

  // Direct offline HTML invoice download
  const handleDownloadOfflineReceipt = () => {
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${bookingData.bookingId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; padding: 40px; margin: 0; background: #fff; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 20px; }
          .brand { font-size: 26px; font-weight: 900; color: #0f172a; }
          .brand span { color: #059669; }
          .badge { background: #dcfce7; color: #166534; font-size: 11px; padding: 4px 8px; border-radius: 999px; font-weight: bold; display: inline-block; }
          .grid { display: flex; justify-content: space-between; margin-top: 24px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13px; }
          th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 1px solid #cbd5e1; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
          .text-right { text-align: right; }
          .total-box { margin-top: 20px; float: right; width: 300px; font-size: 13px; }
          .total-row { display: flex; justify-content: space-between; padding: 4px 0; }
          .grand-total { font-size: 16px; font-weight: bold; color: #059669; border-top: 2px solid #0f172a; padding-top: 8px; }
          .footer { margin-top: 140px; border-top: 1px dashed #cbd5e1; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">tourex <span>HIMALAYA</span></div>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">HP Tourism Reg: HP/TO-2024/7829-M | GSTIN: 02AAACT1928K1Z5</div>
            <div style="font-size: 11px; color: #64748b;">The Mall, Near Hadimba Temple Road, Old Manali, HP - 175131</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 20px; font-weight: 800; color: #0f172a;">TAX INVOICE & RECEIPT</div>
            <div style="font-size: 12px; margin-top: 4px;"><strong>Invoice No:</strong> ${invoiceNumber}</div>
            <div style="font-size: 12px;"><strong>Booking ID:</strong> ${bookingData.bookingId}</div>
            <div style="font-size: 12px;"><strong>Date:</strong> ${currentDate} ${currentTime}</div>
            <div style="margin-top: 6px;"><span class="badge">PAID (Advance Token Verified)</span></div>
          </div>
        </div>

        <div class="grid">
          <div>
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">BILLED TO (GUEST)</strong>
            <div style="font-size: 15px; font-weight: bold; margin-top: 4px;">${bookingData.name || 'Traveler'}</div>
            <div>Phone / WhatsApp: ${bookingData.phone}</div>
            <div>Email: ${bookingData.email || 'N/A'}</div>
            <div>Pickup City: ${bookingData.pickupCity}</div>
          </div>
          <div style="text-align: right;">
            <strong style="color: #64748b; font-size: 11px; text-transform: uppercase;">TOUR CIRCUIT DETAILS</strong>
            <div style="font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 4px;">${bookingData.destination}</div>
            <div>Travel Dates: ${bookingData.checkIn} to ${bookingData.checkOut}</div>
            <div>Total Group: ${bookingData.guests}</div>
            <div>Service Category: ${bookingData.serviceType?.toUpperCase() || 'TOUR PACKAGE'}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Description of Himalayan Services</th>
              <th>SAC Code</th>
              <th>Qty / Pax</th>
              <th class="text-right">Rate (₹)</th>
              <th class="text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>Handcrafted Himalayan Tour Package</strong><br><small style="color: #64748b;">Sanitized private hill vehicle, hotel stays with breakfast & dinner</small></td>
              <td>998555</td>
              <td>${guestMultiplier} Travelers</td>
              <td class="text-right">₹${basePrice.toLocaleString('en-IN')}</td>
              <td class="text-right">₹${subtotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Inner-Line Permits & Environmental Green Fees</strong><br><small style="color: #64748b;">Rohtang / Spiti / Chardham clearances</small></td>
              <td>998559</td>
              <td>1 Group</td>
              <td class="text-right">Included</td>
              <td class="text-right">₹0.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>Mountain Safety Kit & High-Altitude Medical Oxygen</strong></td>
              <td>998559</td>
              <td>1 Unit</td>
              <td class="text-right">Complimentary</td>
              <td class="text-right">₹0.00</td>
            </tr>
            ${discountAmount > 0 ? `
            <tr style="color: #059669;">
              <td>4</td>
              <td><strong>Promotional Discount Coupon (${bookingData.couponCode || 'PROMO'})</strong></td>
              <td>-</td>
              <td>1 Applied</td>
              <td class="text-right">-₹${discountAmount.toLocaleString('en-IN')}</td>
              <td class="text-right">-₹${discountAmount.toLocaleString('en-IN')}</td>
            </tr>` : ''}
          </tbody>
        </table>

        <div class="total-box">
          <div class="total-row"><span>Total Package Value:</span> <strong>₹${totalPayable.toLocaleString('en-IN')}</strong></div>
          <div class="total-row" style="color: #059669;"><span>Advance Token (25% Paid):</span> <strong>₹${tokenAdvance.toLocaleString('en-IN')}</strong></div>
          <div class="total-row"><span>Payment Method:</span> <strong>${paymentInfo?.provider || 'UPI (PhonePe / GPay)'}</strong></div>
          <div class="total-row"><span>Transaction ID:</span> <strong style="font-family: monospace;">${paymentInfo?.transactionId || 'TXN_UPI_89127391'}</strong></div>
          <div class="total-row grand-total"><span>Balance on Arrival (75%):</span> <span>₹${balanceDue.toLocaleString('en-IN')}</span></div>
        </div>

        <div style="clear: both;"></div>

        <div class="footer">
          <div>This is an authentic, computer-generated Tax Invoice issued by Tourex Himalaya Expeditions Pvt. Ltd.</div>
          <div>100% refund policy applicable on cancellations requested 10 days before departure.</div>
          <div style="margin-top: 6px; font-weight: bold; color: #0f172a;">24x7 Mountain Helpline: +91 98160 54321 | concierge@tourexhimalaya.com</div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tourex_Invoice_${bookingData.bookingId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 max-h-[96vh] flex flex-col print:shadow-none print:border-none print:max-h-none print:m-0">
        
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Tax Invoice & Bill Receipt
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadOfflineReceipt}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
              title="Download HTML Receipt File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Bill</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE BILL RECEIPT CONTENT AREA */}
        <div ref={invoiceRef} className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 text-slate-900 bg-white print:p-6">
          
          {/* 1. Header with Company Logo & Invoice Title */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black tracking-tight text-slate-950 font-sans">
                  tourex<span className="text-emerald-600">HIMALAYA</span>
                </span>
              </div>
              <p className="text-xs font-bold text-slate-600 mt-1">
                Authorized Himalayan Tour Operator (HP Tourism Reg: HP/TO-2024/7829-M)
              </p>
              <p className="text-[11px] text-slate-500">
                GSTIN: <strong>02AAACT1928K1Z5</strong> • State Code: 02 (HP)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                The Mall, Near Hadimba Temple Road, Old Manali, Distt. Kullu, HP - 175131
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ● PAID (Token Verified)
              </span>
              <h2 className="text-xl font-black text-slate-950 mt-1">TAX INVOICE</h2>
              <p className="text-xs text-slate-600 font-mono">Invoice No: <strong>{invoiceNumber}</strong></p>
              <p className="text-xs text-slate-600 font-mono">Booking Ref: <strong>{bookingData.bookingId}</strong></p>
              <p className="text-xs text-slate-500">Date: {currentDate} • {currentTime}</p>
            </div>
          </div>

          {/* 2. Customer & Circuit Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Billed To (Lead Traveler)
              </span>
              <h4 className="text-base font-bold text-slate-900">{bookingData.name || 'Rohit'}</h4>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{bookingData.phone || '+91 98123 45678'}</span>
              </p>
              {bookingData.email && (
                <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{bookingData.email}</span>
                </p>
              )}
              <p className="text-xs text-slate-600 mt-1">
                <strong>Pickup City:</strong> {bookingData.pickupCity || 'Delhi (Doorstep / Majnu Ka Tilla)'}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                Tour Circuit & Logistics
              </span>
              <h4 className="text-base font-bold text-slate-900">{bookingData.destination || 'Spiti Valley, Himachal'}</h4>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
              </p>
              <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{bookingData.guests}</span>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                <strong>Transport:</strong> Sanitized Hill SUV / Tempo Traveller
              </p>
            </div>
          </div>

          {/* 3. Itemized Tax Bill Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100/80 text-slate-700">
                  <th className="py-2.5 px-3 font-bold">#</th>
                  <th className="py-2.5 px-3 font-bold">Service Description</th>
                  <th className="py-2.5 px-3 font-bold">SAC</th>
                  <th className="py-2.5 px-3 font-bold">Pax</th>
                  <th className="py-2.5 px-3 font-bold text-right">Rate (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">1</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block text-xs">Curated Himalayan Tour Package</strong>
                    <span className="text-[11px] text-slate-500">
                      Resorts with mountain balcony, daily buffet breakfast & dinner, experienced Pahadi guide
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">998555</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{guestMultiplier} Pax</td>
                  <td className="py-3 px-3 text-right text-slate-700">₹{basePrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</td>
                </tr>

                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">2</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block text-xs">Dedicated Mountain Vehicle & Fuel</strong>
                    <span className="text-[11px] text-slate-500">All state border road taxes, green fees, driver allowances</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">998559</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">1 Vehicle</td>
                  <td className="py-3 px-3 text-right text-slate-500">Included</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">₹0.00</td>
                </tr>

                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">3</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block text-xs">Inner-Line & Rohtang/Pass Permits</strong>
                    <span className="text-[11px] text-slate-500">Government clearance & environmental passes</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">998559</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">1 Group</td>
                  <td className="py-3 px-3 text-right text-slate-500">Included</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">₹0.00</td>
                </tr>

                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-400">4</td>
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block text-xs">High-Altitude Medical Oxygen Kit</strong>
                    <span className="text-[11px] text-slate-500">Emergency portable canister & pulse oximeter</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">998559</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">Complimentary</td>
                  <td className="py-3 px-3 text-right text-slate-500">₹0.00</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">₹0.00</td>
                </tr>

                {discountAmount > 0 && (
                  <tr className="bg-emerald-50/50 text-emerald-800">
                    <td className="py-2.5 px-3 font-semibold text-emerald-600">5</td>
                    <td className="py-2.5 px-3">
                      <strong>Promotional Early Bird Voucher ({bookingData.couponCode || 'HIMALAYA10'})</strong>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">-</td>
                    <td className="py-2.5 px-3">1 Applied</td>
                    <td className="py-2.5 px-3 text-right">-₹{discountAmount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-bold">-₹{discountAmount.toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 4. Payment Totals & Transaction Receipt Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Payment Audit Stamp */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                Digital Payment Audit Trail
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <strong className="text-slate-900 capitalize">{paymentInfo?.provider || 'UPI (PhonePe / GPay)'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <strong className="text-slate-900 font-mono text-[11px]">{paymentInfo?.transactionId || 'TXN_UPI_58951666'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="text-emerald-700 font-bold">SUCCESS (Token Verified)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GST (5% Component):</span>
                  <span className="text-slate-700 font-semibold">Included in Total</span>
                </div>
              </div>

              {/* QR Verification */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://tourexhimalaya.com/verify-invoice"
                    alt="Invoice QR Verify"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  Scan QR code to verify this official invoice on the Tourex Himalaya verification registry.
                </div>
              </div>
            </div>

            {/* Calculations Box */}
            <div className="p-4 rounded-2xl bg-[#0f172a] text-white space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Tour Package Price</span>
                <span className="font-semibold text-white">₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                <span>Advance Token Paid (25%)</span>
                <span>₹{tokenAdvance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="text-sm font-bold text-white block">Balance on Arrival</span>
                  <span className="text-[10px] text-slate-400">Payable to Chauffeur / Hotel</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400">
                    ₹{balanceDue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 5. Terms & Official Footer */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="space-y-0.5 max-w-md">
                <strong className="text-slate-700 block">Terms & Conditions:</strong>
                <p>1. 100% refund on advance token if cancellation is requested at least 10 days before tour start date.</p>
                <p>2. Please present this invoice along with valid Government Photo ID (Aadhaar / Voter ID) at hotel check-in.</p>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <div className="w-24 h-8 mx-auto sm:ml-auto border-b border-slate-400 text-[9px] font-mono text-slate-400 flex items-end justify-center pb-0.5">
                  Digitally Signed
                </div>
                <span className="text-[10px] font-bold text-slate-800 block mt-1">Authorized Signatory</span>
                <span className="text-[10px] text-slate-400">Tourex Himalaya Expeditions Pvt. Ltd.</span>
              </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 pt-3 border-t border-slate-100">
              Need assistance? 24x7 Operations Concierge: <strong>+91 98160 54321</strong> • concierge@tourexhimalaya.com
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions (Hidden when printing) */}
        <div className="p-4 bg-slate-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Booking Summary</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/919816054321?text=Hi%20Tourex%20Himalaya%20team!%20I%20have%20downloaded%20my%20Tax%20Invoice%20${invoiceNumber}%20for%20Booking%20ID%20${bookingData.bookingId}.%20Advance%20paid:%20%E2%82%B9${tokenAdvance}.%20Please%20verify%20and%20send%20hotel%20voucher.`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
