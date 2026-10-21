'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Lock, CreditCard, Truck } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, formattedTime } = useCart();
  
  const [shippingMethod, setShippingMethod] = useState<'free' | 'flat'>('free');

  // Shipping calculations
  const shippingCost = shippingMethod === 'flat' ? 20.00 : 0.00;
  const estimatedTotal = subtotal + shippingCost;

  // Free shipping progress logic
  const freeShippingGoal = 350;
  const progressPercent = Math.min((subtotal / freeShippingGoal) * 100, 100);
  const amountAway = Math.max(freeShippingGoal - subtotal, 0);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      
      {/* Hero Section with Earth Background Image (50% Height) */}
      <div className="relative w-full py-12 md:py-16 overflow-hidden bg-black flex flex-col justify-center min-h-[175px] border-b border-white/10">
        
        {/* Earth Image Wrapper - Pushed to the right */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[75%] z-0 pointer-events-none">
          <Image 
            src="/checkoutbg.png" 
            alt="Earth Background" 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-right md:object-right-top opacity-90 mix-blend-lighten" 
          />
          {/* Gradient overlay inside the image wrapper to seamlessly blend its left edge into the pitch-black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        </div>
        
        {/* Text Content */}
        <div className="max-w-[1440px] mx-auto relative z-20 w-full px-6 md:px-12 flex justify-between items-center">
          <div>
            {/* Breadcrumbs */}
            <div className="text-[12px] font-medium mb-3 flex items-center gap-2">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <span className="text-[#B98135]">›</span>
              <span className="text-[#B98135]">Shopping Cart</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-[48px] font-medium tracking-wide mb-3 text-white">
              Shopping Cart
            </h1>
            
            {/* Description */}
            <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
              Review your selected items before purchase.<br/>
              Enjoy a seamless shopping experience.
            </p>
          </div>

          {/* Persistent Timer Badge */}
          <div className="hidden md:flex items-center gap-2 border border-white/10 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm text-[#B98135]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span className="font-mono font-medium tracking-wider">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Billing Details Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-medium text-[#B98135] tracking-widest uppercase mb-6">
              Billing Details
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">First Name*</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Last Name*</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Username*</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Email Address*</label>
                <input type="email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Country / Region*</label>
                <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors">
                  <option value="Canada">Canada</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Street Address*</label>
                <input type="text" placeholder="House number and street name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Town / City*</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Province*</label>
                  <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors">
                    <option value="">Select Province</option>
                    <option value="ON">Ontario</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                    <option value="QC">Quebec</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Postal Code*</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Phone (optional)</label>
                <input type="tel" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="diff-address" className="accent-[#B98135] w-4 h-4 rounded cursor-pointer" />
                <label htmlFor="diff-address" className="text-sm text-gray-300 cursor-pointer">Ship to a different address?</label>
              </div>

              {/* Coupon Box */}
              <div className="pt-4 flex gap-3">
                <input type="text" placeholder="Coupon code" className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none" />
                <button type="button" className="px-6 py-3 bg-gradient-to-r from-[#94590D] to-[#B77D33] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Apply Coupon
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary & Shipment */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
            
            {/* Heading */}
            <h2 className="text-lg font-medium tracking-wide border-b border-white/10 pb-4 uppercase">
              Your Order
            </h2>

            {/* Free Shipping Progress Bar */}
            <div className="pb-2">
              <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full relative mb-4">
                <div 
                  className="h-full bg-[#B98135] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#070707] border border-[#B98135] flex items-center justify-center text-[#B98135]"
                  style={{ left: `calc(${progressPercent}% - 12px)` }}
                >
                  <Truck size={12} />
                </div>
              </div>
              <p className="text-xs text-gray-300">
                {amountAway > 0 
                  ? `You are $${amountAway.toFixed(2)} away from free shipping` 
                  : '🎉 You qualify for free shipping!'}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4"></div>

            {/* Optional Order Note */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Add Order Note (Optional)</label>
              <textarea rows={3} placeholder="Notes about your order, e.g. special notes for delivery." className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#B98135] focus:outline-none"></textarea>
            </div>

            {/* Subtotal breakdown */}
            <div className="space-y-3 text-sm border-b border-white/10 pb-4">
              <div className="flex justify-between text-gray-400 text-xs">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-300 text-xs">{item.name} × {item.quantity}</span>
                  <span className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="text-gray-400">Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipment Options */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Shipment</span>
              
              <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${shippingMethod === 'free' ? 'border-[#B98135] bg-[#0a0a0a]' : 'border-white/10 bg-black'}`}>
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'free'} 
                  onChange={() => setShippingMethod('free')} 
                  className="mt-1 accent-[#B98135]" 
                />
                <div className="flex-1 text-xs">
                  <div className="font-medium text-white mb-0.5">Free Shipping</div>
                  <div className="text-gray-400">Shipped out next business day</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${shippingMethod === 'flat' ? 'border-[#B98135] bg-[#0a0a0a]' : 'border-white/10 bg-black'}`}>
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === 'flat'} 
                  onChange={() => setShippingMethod('flat')} 
                  className="mt-1 accent-[#B98135]" 
                />
                <div className="flex-1 text-xs">
                  <div className="font-medium text-white mb-0.5">Flat rate ($20.00)</div>
                  <div className="text-gray-400">Shipped out next business day: $20.00</div>
                </div>
              </label>
            </div>

            {/* Estimated Total */}
            <div className="flex justify-between items-center text-base font-semibold pt-1">
              <span className="text-gray-300">Estimated Total</span>
              <span className="text-xl text-[#B98135]">${estimatedTotal.toFixed(2)}</span>
            </div>

            {/* Secure Payment Box */}
            <div className="bg-black border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <Lock size={14} className="text-[#B98135]" />
                <span>Secure Payment</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Your payment information is safe and encrypted.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-8 px-3 bg-neutral-900 border border-white/10 rounded flex items-center justify-center">
                  <CreditCard size={18} className="text-gray-300" />
                </div>
                
                <div className="h-8 w-10 bg-neutral-900 border border-white/10 rounded flex items-center justify-center relative overflow-hidden p-1">
                  <Image 
                    src="/Blogo.png" 
                    alt="Bitcoin Logo" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-1"
                  />
                </div>

                <div className="h-8 px-3 bg-neutral-900 border border-white/10 rounded flex items-center justify-center text-[10px] font-medium text-gray-300">
                  e-Transfer
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <button 
              onClick={() => router.push('/secure-checkout')}
              className="w-full py-4 bg-black/55 border-2 border-[#94590D] hover:opacity-90 text-white text-xs font-semibold tracking-[0.2em] rounded-lg uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock size={14} /> Proceed To Secure Checkout
            </button>

          </div>
        </div>
      </div>
      
      {/* Footer Component rendered at the bottom */}
      <Footer />
      
    </div>
  );
}