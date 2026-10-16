'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { Lock, CreditCard, Truck, Trash2, Plus, Minus, ShieldCheck, FlaskConical, FileText } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, subtotal, addToCart } = useCart();
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState<'free' | 'flat'>('free');

  // Shipping calculations
  const shippingCost = shippingMethod === 'flat' ? 20.00 : 0.00;
  const estimatedTotal = subtotal + shippingCost;

  // Free shipping progress logic
  const freeShippingGoal = 350;
  const progressPercent = Math.min((subtotal / freeShippingGoal) * 100, 100);
  const amountAway = Math.max(freeShippingGoal - subtotal, 0);

  // Related compounds upsell data
  const relatedProducts = [
    { id: 1, name: 'NAD+ 500mg', price: 89.99, image: '/Retatrutide.png' },
    { id: 2, name: 'NAD+ 500mg', price: 89.99, image: '/BPC-157.png' },
    { id: 3, name: 'NAD+ 500mg', price: 89.99, image: '/GHK-Cu.png' },
    { id: 4, name: 'NAD+ 500mg', price: 89.99, image: '/Retatrutide.png' },
  ];

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
             
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-cover object-right md:object-right-top opacity-90 mix-blend-lighten" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        </div>
        
        {/* Text Content */}
        <div className="max-w-[1440px] mx-auto relative z-20 w-full px-6 md:px-12">
          <div className="text-[12px] font-medium mb-3 flex items-center gap-2">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <span className="text-[#B98135]">›</span>
            <span className="text-[#B98135]">Shopping Cart</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-medium tracking-wide mb-3 text-white">
            Shopping Cart
          </h1>
          
          <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
            Review your selected items before purchase.<br/>
            Enjoy a seamless shopping experience.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Cart Table & Coupon */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8 overflow-x-auto">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-4 mb-4">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {/* Cart Items List */}
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                  Your cart is currently empty.
                </div>
              ) : (
                <div className="divide-y divide-white/5 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center pt-4 first:pt-0">
                      
                      {/* Product Info & Thumbnail */}
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="relative w-14 h-14 bg-black rounded border border-white/10 shrink-0 overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-white mb-1">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[11px] text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center text-xs text-gray-300">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex justify-center">
                        <div className="inline-flex items-center border border-white/20 rounded bg-black">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-2 text-xs font-medium text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-2 text-right text-xs font-medium text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Row */}
              <div className="pt-8 mt-8 border-t border-white/10 flex gap-3">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none" 
                />
                <button 
                  type="button" 
                  className="px-6 py-3 bg-gradient-to-r from-[#94590D] to-[#B77D33] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Apply Coupon
                </button>
              </div>

            </div>

            {/* Related Research Compounds Section */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-medium tracking-wide">Related Research Compounds</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((prod) => (
                  <div key={prod.id} className="bg-[#070707] border border-white/10 rounded-xl p-4 flex flex-col items-center text-center">
                    <div className="relative w-full h-32 mb-3 bg-black rounded-lg border border-white/5">
                      <Image src={prod.image} alt={prod.name} fill className="object-contain p-2" />
                    </div>
                    <h4 className="text-xs font-medium text-white mb-1">{prod.name}</h4>
                    <p className="text-xs text-[#B98135] font-semibold mb-3">${prod.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addToCart({ name: prod.name, price: prod.price, image: prod.image })}
                      className="w-full py-2 border border-[#B98135] text-[#B98135] hover:bg-[#B98135] hover:text-black text-[11px] uppercase font-semibold rounded transition-colors cursor-pointer"
                    >
                      Add To Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary & Shipment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
              
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

              {/* Order Note */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Add Order Note (Optional)</label>
                <textarea rows={3} placeholder="Notes about your order, e.g. special notes for delivery." className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#B98135] focus:outline-none"></textarea>
              </div>

              {/* Subtotal Display */}
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                <span className="text-gray-400">Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
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
                    <Image src="/Blogo.png" alt="Bitcoin Logo" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-1" />
                  </div>
                  <div className="h-8 px-3 bg-neutral-900 border border-white/10 rounded flex items-center justify-center text-[10px] font-medium text-gray-300">
                    e-Transfer
                  </div>
                </div>
              </div>

              {/* Proceed Button */}
              <button 
                onClick={() => router.push('/checkout')}
className="w-full py-4 bg-black/55 border-1 border-[#B98135] hover:opacity-90 text-white text-xs font-semibold tracking-[0.2em] rounded-lg uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"              >
                <Lock size={14} /> Proceed To Secure Checkout
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="border-t border-b border-white/10 bg-[#050505] py-6 my-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-gray-300">
            <FlaskConical size={18} className="text-[#B98135]" />
            <span>3rd Party Labs</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-300">
            <ShieldCheck size={18} className="text-[#B98135]" />
            <span>99%+ Purity (HPLC)</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-300">
            <FileText size={18} className="text-[#B98135]" />
            <span>Research Grade Compounds</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-300">
            <Lock size={18} className="text-[#B98135]" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}