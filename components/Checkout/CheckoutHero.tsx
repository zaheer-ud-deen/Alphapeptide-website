'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface CheckoutHeroProps {
  currentStep: number;
}

export default function CheckoutHero({ currentStep }: CheckoutHeroProps) {
  // Persistent Timer State using global localStorage
  const [timeLeft, setTimeLeft] = useState<number>(900);

  useEffect(() => {
    const TIMER_DURATION = 15 * 60; // 15 minutes in seconds
    const storageKey = 'global_checkout_timer_expiry';
    
    const now = Date.now();
    const storedExpiry = localStorage.getItem(storageKey);

    let expiryTime: number;

    if (storedExpiry) {
      expiryTime = parseInt(storedExpiry, 10);
      // If stored expiry has already passed, reset a new 15-minute window
      if (expiryTime <= now) {
        expiryTime = now + TIMER_DURATION * 1000;
        localStorage.setItem(storageKey, expiryTime.toString());
      }
    } else {
      // Initialize global timer if it doesn't exist yet
      expiryTime = now + TIMER_DURATION * 1000;
      localStorage.setItem(storageKey, expiryTime.toString());
    }

    // Calculate initial remaining time
    const remainingSeconds = Math.max(0, Math.floor((expiryTime - now) / 1000));
    setTimeLeft(remainingSeconds);

    // Interval to tick every second
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const left = Math.max(0, Math.floor((expiryTime - currentTime) / 1000));
      
      setTimeLeft(left);

      if (left === 0) {
        const newExpiry = Date.now() + TIMER_DURATION * 1000;
        localStorage.setItem(storageKey, newExpiry.toString());
        expiryTime = newExpiry;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { num: 1, title: 'Information', iconSrc: '/eva_file-text-outline.png' },
    { num: 2, title: 'Shipping', iconSrc: '/hugeicons_shipping-truck-01.png' },
    { num: 3, title: 'Payment', iconSrc: '/fluent_payment-16-regular.png' },
    { num: 4, title: 'Confirmation', iconSrc: '/healthicons_yes-outline.png' },
  ];

  return (
    <div className="relative w-full bg-[#030303] overflow-hidden flex flex-col items-center pt-1 pb-2">
      
      {/* Background Earth/Space Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image 
          src="/checkoutbg.png" 
          alt="Secure Checkout Background"
          sizes="(max-width: 768px) 100vw, 33vw"
          fill
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 md:px-12">
        
        {/* Top Bar: Breadcrumbs & Timer */}
        <div className="flex justify-between items-center mb-10 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
          <div className="flex gap-2 text-gray-400">
            <Link href="/" className="hover:text-[#B98135] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/cart" className="hover:text-[#B98135] transition-colors">Checkout</Link>
            <span>›</span>
            <span className="text-[#B98135]">{steps[currentStep - 1]?.title}</span>
          </div>
          
          <div className="flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 rounded-sm text-gray-300">
            <Clock size={14} className="text-[#B98135]" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Secure Checkout
          </h1>
          <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] uppercase font-medium">
            SECURE. ENCRYPTED. TRUSTED.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="relative flex justify-between items-center max-w-3xl mx-auto w-full">
          {/* Connecting Lines */}
          <div className="absolute top-[51px] left-10 right-10 h-[1px] bg-white/10 z-0"></div>
          
          {steps.map((step, index) => {
            const isActive = step.num === currentStep;
            const isCompleted = step.num < currentStep;
            
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center gap-3">
                <span className={`text-[10px] font-bold tracking-widest ${isActive || isCompleted ? 'text-[#B98135]' : 'text-gray-500'}`}>
                  0{step.num}
                </span>
                
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 bg-[#030303] transition-colors p-2.5 relative
                  ${isActive ? 'border-[#B98135]' : isCompleted ? 'border-[#B98135] bg-[#B98135]/10' : 'border-white opacity-90'}
                `}>
                  <Image 
                    src={step.iconSrc} 
                    alt={step.title}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  
                  {/* Left Dot (Hidden on first step) */}
                  {index > 0 && (
                    <div className={`absolute top-1/2 -translate-y-1/2 -left-[5px] w-[5px] h-[5px] rounded-full ${isActive || isCompleted ? 'bg-[#B98135]' : 'bg-white'}`}></div>
                  )}

                  {/* Right Dot (Hidden on last step) */}
                  {index < steps.length - 1 && (
                    <div className={`absolute top-1/2 -translate-y-1/2 -right-[5px] w-[5px] h-[5px] rounded-full ${isActive || isCompleted ? 'bg-[#B98135]' : 'bg-white'}`}></div>
                  )}
                </div>
                
                <span className={`text-[10px] md:text-xs font-semibold tracking-wide ${isActive || isCompleted ? 'text-[#B98135]' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}