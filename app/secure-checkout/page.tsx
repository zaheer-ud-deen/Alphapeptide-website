'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, HeadphonesIcon, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext'; 
import Footer from '../../components/Footer/Footer'; 
import CheckoutHero from '@/components/Checkout/CheckoutHero';

export default function SecureCheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, formattedTime } = useCart(); // Pull formattedTime from global context
  const [selectedMethod, setSelectedMethod] = useState<'etransfer' | 'btc'>('etransfer');
  
  // Shipping logic based on cart rules
  const shippingCost = subtotal >= 350 ? 0 : 19.95;
  const orderTotal = subtotal + shippingCost;
  
  const freeShippingGoal = 350;
  const progressPercent = Math.min((subtotal / freeShippingGoal) * 100, 100);

  // Handle Pay Now button redirection based on selected method
  const handlePayNow = () => {
    if (selectedMethod === 'etransfer') {
      router.push('/secure-checkout/payment');
    } else if (selectedMethod === 'btc') {
      router.push('/secure-checkout/bitcoin-payment'); 
    } else {
      alert('Selected payment method is coming soon.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col">
      
      {/* Reusable Hero Component with Global Timer Passed Down */}
      <CheckoutHero currentStep={1} timer={formattedTime} />

      {/* Main Checkout Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Payment Methods */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="border border-white/10 bg-[#070707] rounded-lg p-6 md:p-8">
              <h2 className="text-[#B98135] text-sm font-bold tracking-widest uppercase mb-1">
                1. PAYMENT METHOD
              </h2>
              <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-8">
                CHOOSE HOW YOU'D LIKE TO PAY FOR YOUR ORDER.
              </p>

              <div className="space-y-4">
                {/* Google Pay (Disabled - Coming Soon) */}
                <label className="flex items-center gap-4 p-5 border border-white/10 rounded bg-[#0a0a0a] opacity-50 cursor-not-allowed">
                  <input type="radio" disabled className="w-4 h-4 accent-[#B98135]" />
                  <div className="flex items-center gap-3 w-32 shrink-0">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-semibold text-white">Free Shipping</span>
                    <span className="block text-[11px] text-gray-400">Shipped out next business day</span>
                  </div>
                  <div className="px-3 py-1 border border-white/20 rounded text-[9px] uppercase tracking-wider font-bold text-gray-400">
                    COMING SOON
                  </div>
                </label>

                {/* Interac e-Transfer */}
                <label className={`flex items-center gap-4 p-5 border rounded cursor-pointer transition-colors ${selectedMethod === 'etransfer' ? 'border-[#B98135] bg-[#B98135]/5' : 'border-white/10 bg-[#0a0a0a] hover:border-white/30'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedMethod === 'etransfer'} 
                    onChange={() => setSelectedMethod('etransfer')}
                    className="w-4 h-4 accent-[#B98135] cursor-pointer" 
                  />
                  <div className="relative w-12 h-8 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/image 71.png" 
                      alt="Interac e-Transfer" 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-bold text-[#B98135]">Interac e-Transfer</span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">Pay securely via Interac e-Transfer.<br/>Payment instructions shown after checkout.</span>
                  </div>
                </label>

                {/* Bitcoin */}
                <label className={`flex items-center gap-4 p-5 border rounded cursor-pointer transition-colors ${selectedMethod === 'btc' ? 'border-[#B98135] bg-[#B98135]/5' : 'border-white/10 bg-[#0a0a0a] hover:border-white/30'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={selectedMethod === 'btc'} 
                    onChange={() => setSelectedMethod('btc')}
                    className="w-4 h-4 accent-[#B98135] cursor-pointer" 
                  />
                  <div className="w-12 shrink-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center text-white font-bold text-lg">₿</div>
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-bold text-[#B98135]">Bitcoin (BTC)</span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">Pay with Bitcoin via BTCPay.</span>
                  </div>
                </label>
              </div>

              {/* Action Button */}
              <button 
                onClick={handlePayNow}
                className="w-full mt-8 py-4 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-sm font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock size={16} /> PAY NOW
              </button>
              <p className="text-center text-[10px] text-gray-500 mt-4 tracking-widest">
                — Secure & Encrypted Checkout —
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="border border-white/10 bg-[#070707] rounded-lg p-6">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-sm font-bold tracking-widest uppercase">ORDER SUMMARY</h2>
                <span className="text-xs text-gray-400 font-medium uppercase">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} ITEM(S)</span>
              </div>

              {/* Free Shipping Tracker */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden relative border border-white/10 mb-2">
                  <div className="h-full bg-[#B98135] transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#B98135] border-2 border-black flex items-center justify-center text-[8px]" style={{ left: `calc(${progressPercent}% - 8px)` }}>🚚</div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  {subtotal >= freeShippingGoal ? '🎉 You qualify for free shipping!' : `Add $${(freeShippingGoal - subtotal).toFixed(2)} for free shipping`}
                </p>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4 mb-6 pb-6 border-b border-white/10 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-12 h-12 bg-black rounded border border-white/10 shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-white">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">Qty x {item.quantity}</p>
                    </div>
                    <div className="text-xs font-medium text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-xs mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-sm font-bold tracking-widest uppercase">Total (CAD)</span>
                <span className="text-2xl font-bold text-white">${orderTotal.toFixed(2)}</span>
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  placeholder="Discount Code" 
                  className="flex-1 bg-black border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-[#B98135] transition-colors"
                />
                <button className="px-6 py-3 bg-[#B98135]/20 hover:bg-[#B98135] text-[#B98135] hover:text-black text-xs font-bold uppercase tracking-wider rounded transition-colors">
                  Apply
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck size={20} className="text-[#B98135]" strokeWidth={1.5} />
                  <span className="text-[11px] font-bold text-white tracking-wide">Same-Day Shipping</span>
                  <span className="text-[9px] text-gray-500">Mon - Fri</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 border-l border-white/10">
                  <HeadphonesIcon size={20} className="text-[#B98135]" strokeWidth={1.5} />
                  <span className="text-[11px] font-bold text-white tracking-wide">Responsive Support</span>
                  <span className="text-[9px] text-gray-500">24/7 Assistance</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}