'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar'; 
import Footer from '../../../components/Footer/Footer'; 
import CheckoutHero from '@/components/Checkout/CheckoutHero';

export default function PaymentConfirmPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col">
      

      {/* Reusable Checkout Hero (Set to Step 3: Payment) */}
      <CheckoutHero currentStep={3} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 md:px-12 py-12 flex flex-col items-center justify-center">
        
        {/* Custom Hero Heading Below Navigation Banner */}
        <div className="text-center mb-8 max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Have You Sent the e-Transfer?
          </h2>
          <p className="text-xs md:text-sm text-gray-400">
            Please confirm once you have sent the payment to complete your order.
          </p>
        </div>

        {/* Center Card Container */}
        <div className="w-full max-w-[560px] bg-[#070707] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center shadow-2xl">
          
          {/* Centered Golden Circle Icon */}
          <div className="w-16 h-16 rounded-full border border-[#B98135] bg-[#B98135]/10 flex items-center justify-center text-[#B98135] mb-6 shadow-[0_0_20px_rgba(185,129,53,0.15)]">
            <Mail size={28} strokeWidth={1.5} />
          </div>

          {/* Recipient Details */}
          <div className="text-center mb-8">
            <span className="block text-sm font-semibold text-white mb-1">
              Send your e-Transfer to:
            </span>
            <span className="block text-sm font-medium  tracking-wide">
              payment@alphapeptide.ca
            </span>
          </div>

          <div className="w-full border-t border-white/10 pt-6 mb-8">
            {/* IMPORTANT Box */}
            <div className="flex items-start gap-3 text-xs text-gray-300">
              <AlertCircle size={20} className="text-[#B98135] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <span className="block text-[#B98135] font-bold tracking-wider uppercase text-[11px]">
                  IMPORTANT:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-[11px] text-gray-300 leading-relaxed">
                  <li>Include your order number in the message: <strong className="text-white">Order 13</strong></li>
                  <li>Send the exact amount shown at checkout</li>
                  <li>Orders are processed automatically once payment is received</li>
                  <li>Please do not include any additional notes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            {/* YES Button */}
            <button 
              onClick={() => router.push('/secure-checkout/confirmation')}
              className="w-full py-4 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-lg shadow-lg transition-all cursor-pointer"
            >
              YES, I HAVE SENT THE PAYMENT
            </button>

            {/* NOT YET Button */}
            <button 
              onClick={() => router.push('/secure-checkout/payment')}
              className="w-full py-3.5 bg-black border border-white/20 hover:border-white/40 text-gray-300 hover:text-white text-xs font-bold tracking-[0.2em] uppercase rounded-lg transition-all cursor-pointer"
            >
              NOT YET
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}