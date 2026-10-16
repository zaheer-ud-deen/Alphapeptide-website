'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Copy, Check, AlertCircle, Truck, HeadphonesIcon, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import Footer from '../../../components/Footer/Footer';
import CheckoutHero from '@/components/Checkout/CheckoutHero';

export default function InteracPaymentPage() {
  const router = useRouter();
  const { cartItems, subtotal } = useCart();
  
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const shippingCost = subtotal >= 350 ? 0 : 19.95;
  const orderTotal = subtotal + shippingCost;
  const orderNumber = 'Order 13';
  const recipientEmail = 'Payment@Alphapeptide.Ca';
  const formattedAmount = `$${orderTotal.toFixed(2)}`;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col">
      
      {/* Reusable Hero Component (Set to Step 3: Payment) */}
      <CheckoutHero currentStep={3} />

      {/* Main Payment Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Interac Details & Copy Inputs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="border border-white/10 bg-[#070707] rounded-lg p-6 md:p-8">
              
              {/* Header Box */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden rounded">
             <Image 
                   src="/image 71.png" 
                   alt="Interac e-Transfer" 
                   sizes="(max-width: 768px) 100vw, 33vw"
                   fill 
                   className="object-contain"
                />
                </div>
                <div>
                  <h2 className="text-white text-base font-bold">Interac e-Transfer</h2>
                  <p className="text-xs text-gray-400">Send the exact amount to the email below to complete your order securely.</p>
                </div>
              </div>

              <div className="space-y-5">
                
                {/* Recipient Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recipient Email</label>
                  <div className="flex items-center bg-black border border-white/10 rounded overflow-hidden">
                    <input 
                      type="text" 
                      readOnly 
                      value={recipientEmail} 
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    <button 
                      onClick={() => handleCopy(recipientEmail, 'email')}
                      className="px-4 py-3 bg-white/5 hover:bg-white/10 border-l border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
                    >
                      {copiedField === 'email' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Amount</label>
                  <div className="flex items-center bg-black border border-white/10 rounded overflow-hidden">
                    <input 
                      type="text" 
                      readOnly 
                      value={formattedAmount} 
                      className="w-full bg-transparent px-4 py-3 text-sm text-[#B98135] font-bold focus:outline-none"
                    />
                    <button 
                      onClick={() => handleCopy(formattedAmount, 'amount')}
                      className="px-4 py-3 bg-white/5 hover:bg-white/10 border-l border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
                    >
                      {copiedField === 'amount' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'amount' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Message / Note */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Message / Note</label>
                  <div className="flex items-center bg-black border border-white/10 rounded overflow-hidden">
                    <input 
                      type="text" 
                      readOnly 
                      value={orderNumber} 
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    <button 
                      onClick={() => handleCopy(orderNumber, 'note')}
                      className="px-4 py-3 bg-white/5 hover:bg-white/10 border-l border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
                    >
                      {copiedField === 'note' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'note' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Important Alert Notice */}
                <div className="flex items-start gap-3 p-4 border border-[#B98135]/40 rounded bg-[#B98135]/5 text-xs text-gray-300">
                  <AlertCircle size={18} className="text-[#B98135] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Important:</strong> Please send the exact amount and include <span className="text-[#B98135] font-bold">Order 13</span> in the message to ensure fast processing.
                  </p>
                </div>

                {/* Action Button */}
                <button 
  onClick={() => router.push('/secure-checkout/payment-confirm')}
  className="w-full mt-4 py-4 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-xs font-bold tracking-[0.2em] uppercase rounded shadow-lg transition-all cursor-pointer"
>
  YES, I HAVE SENT THE PAYMENT
</button>

              </div>
            </div>

            {/* Return link */}
            <button 
              onClick={() => router.push('/secure-checkout')}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer w-fit"
            >
              <ArrowLeft size={14} /> Return To Shipping
            </button>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="border border-white/10 bg-[#070707] rounded-lg p-6">
              
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-sm font-bold tracking-widest uppercase">ORDER SUMMARY</h2>
                <span className="text-xs text-gray-400 font-medium uppercase">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} ITEM(S)</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4 mb-6 pb-6 border-b border-white/10 max-h-[240px] overflow-y-auto pr-2">
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
                  <span className="text-gray-400">Shipping (on products only)</span>
                  <span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-sm font-bold tracking-widest uppercase text-white">Total (CAD)</span>
                <span className="text-2xl font-bold text-[#B98135]">${orderTotal.toFixed(2)}</span>
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