'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Copy, Check, ChevronDown, ExternalLink } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import Footer from '../../../components/Footer/Footer';
import CheckoutHero from '@/components/Checkout/CheckoutHero';

export default function BitcoinPaymentPage() {
  const router = useRouter();
  const { subtotal } = useCart();
  
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const shippingCost = subtotal >= 350 ? 0 : 19.95;
  const orderTotal = subtotal + shippingCost;
  
  // Approximate BTC conversion rate calculation (e.g., assuming $90,000 CAD per BTC)
  const btcRate = 90000; 
  const btcAmount = (orderTotal / btcRate).toFixed(8);
  const btcWalletAddress = 'bc1qr788d0r5scgh4d84...5eqr05j40ygyvpdk';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('bc1qr788d0r5scgh4d845eqr05j40ygyvpdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col">
      
      {/* Reusable Checkout Hero Component (Step 3: Payment) */}
      <CheckoutHero currentStep={3} />

      {/* Main Bitcoin Gateway Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 md:px-12 py-12 flex items-center justify-center">
        <div className="w-full max-w-[540px] bg-[#070707] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-2xl">
          
          {/* BTC Header Amount */}
          <div className="mb-6 w-full">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
             0.00438409 BTC
            </h2>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>View Details</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable Details Box */}
            {showDetails && (
              <div className="mt-4 p-4 bg-black/60 border border-white/10 rounded-xl text-left text-xs space-y-2 text-gray-300 animate-fadeIn">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span>${subtotal.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping:</span>
                  <span>${shippingCost.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 font-semibold text-white">
                  <span>Total CAD:</span>
                  <span className="text-[#B98135]">${orderTotal.toFixed(2)} CAD</span>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Container */}
          <div className="relative w-64 h-64 bg-black p-4 rounded-xl mb-6 flex items-center justify-center shadow-inner">
            {/* Placeholder image for QR code (replace /bitcoin-qr.png with your actual QR code asset) */}
            <div className="relative w-full h-full">
              <Image 
                src="/bi_qr-code.png" 
                alt="Bitcoin Payment QR Code" 
                sizes="(max-width: 768px) 100vw, 33vw"
                fill 
                className="object-contain"
                onError={(e) => {
                  // Fallback visual if image isn't uploaded yet
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback mock visual elements if image is missing */}
              
            </div>

            {/* Centered Bitcoin Logo Overlay badge */}
            {/* <div className="absolute w-12 h-12 bg-[#F7931A] rounded-full border-4 border-white flex items-center justify-center text-white shadow-md">
              <span className="font-bold text-lg">₿</span>
            </div> */}
          </div>

          {/* Wallet Address & Copy Field */}
          <div className="w-full mb-6">
            <span className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2 text-left">
              Address
            </span>
            <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3 justify-between gap-3">
              <span className="text-xs font-mono text-gray-300 truncate">
                {btcWalletAddress}
              </span>
              <button 
                onClick={handleCopyAddress}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy Address"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Pay in Wallet Button */}
          <button 
            onClick={() => router.push('/secure-checkout/bitcoin-confirmation')}
             className="w-full py-4 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
             >
            PAY IN WALLET
        </button>

        </div>
      </main>

      <Footer />
    </div>
  );
}