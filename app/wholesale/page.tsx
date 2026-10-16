'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, ShieldCheck, Truck, Headphones } from 'lucide-react';
import Header from '../../components/Navbar/Navbar'; // Adjust path if necessary
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Footer from '../../components/Footer/Footer';

export default function WholesaleApplyPage() {
  const [status, setStatus] = useState<string>('');
  // 1. Add Honeypot state
  const [honeypot, setHoneypot] = useState<string>('');

  const submitToGoogleSheet = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault();

    // 2. HONEYPOT CHECK: If bot filled this, silently ignore
    if (honeypot !== '') {
      console.log('Bot detected, silently rejecting.');
      return; 
    }

    // 3. RATE LIMIT CHECK: Prevent multiple submissions within 30 seconds
    const lastSubmitTime = localStorage.getItem('lastFormSubmit');
    const now = Date.now();
    if (lastSubmitTime && (now - parseInt(lastSubmitTime)) < 30000) {
      setStatus('Please wait 30 seconds before submitting again.');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setStatus('Sending...');
    
    // 4. USE ENVIRONMENT VARIABLE
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL; 
    
    if (!WEBHOOK_URL) {
      console.error('Webhook URL is missing from .env.local');
      setStatus('Error. Try again.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.formType = formType; // Tells the script which tab to use

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, 
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('Success!');
        localStorage.setItem('lastFormSubmit', now.toString()); // Save success time
        (e.target as HTMLFormElement).reset(); // Clear the form
        setTimeout(() => setStatus(''), 3000); // Reset button text after 3s
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      
      {/* Global Header */}
      
      {/* Hero Section with heroimg.png Background Image (50% Height) */}
      <div className="relative w-full py-16 md:py-24 overflow-hidden bg-black flex flex-col justify-center">
        
        {/* Background Image Wrapper - Pushed to the right with blend mode */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[75%] z-0 pointer-events-none">
          <Image 
            src="/heroimg.png" 
            alt="Hero Background"
            sizes="(max-width: 768px) 100vw, 33vw"
            fill 
             
            className="object-cover object-right md:object-right-top opacity-90 mix-blend-lighten" 
          />
          {/* Gradient overlay to smoothly blend its left edge into the pitch-black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        </div>
        
        {/* Text Content */}
        <div className="max-w-[1440px] mx-auto relative z-20 w-full px-6 md:px-12">
          {/* Breadcrumbs */}
          <div className="text-[12px] font-medium mb-3 flex items-center gap-2">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Home</Link>
            <span className="text-[#B98135]">›</span>
            <span className="text-[#B98135]">Wholesale Apply</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-medium tracking-wide mb-3 text-white">
            Wholesale Apply
          </h1>
          
          {/* Description */}
          <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
            Join our wholesale program and unlock exclusive pricing on premium, lab-verified research compounds.
          </p>
        </div>
      </div>

      {/* Main Form & Partnership Section */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-12 ">
        
        {/* Two-Column Form and Info Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Comprehensive Wholesale Form */}
          <div className="lg:col-span-7 bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8">
            <form onSubmit={(e) => submitToGoogleSheet(e, 'Wholesale')} className="space-y-5">
              
              {/* 5. ADD THE HONEYPOT FIELD */}
              <input 
                type="text" 
                name="website_url_catch" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Name*</label>
                  <input type="text" name="name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Username*</label>
                  <input type="text" name="username" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Email*</label>
                <input type="email" name="email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Products you're interested in*</label>
                <input type="text" name="products" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Location*</label>
                <input type="text" name="location" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Postal Code*</label>
                  <input type="text" name="postalCode" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">City*</label>
                  <input type="text" name="city" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Province*</label>
                  <select name="province" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors cursor-pointer" required>
                    <option value="">Select Province</option>
                    <option value="ON">Ontario</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                    <option value="QC">Quebec</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Country*</label>
                  <select name="country" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors cursor-pointer" required>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="terms" className="accent-[#B98135] w-4 h-4 rounded cursor-pointer border-white/10 bg-black shrink-0" required />
                <label htmlFor="terms" className="text-xs text-gray-300 cursor-pointer">
                  I Accept our <Link href="/terms" className="text-[#B98135] hover:underline cursor-pointer">Terms & Conditions</Link>
                </label>
              </div>

              <button disabled={status === 'Sending...'} type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {status || 'Register As Wholesaler'}
              </button>
            </form>
          </div>
          
          {/* RIGHT COLUMN: Wholesale Partnership & Support Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Partnership Benefits Box */}
            <div className="bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-sm font-semibold tracking-widest text-white uppercase mb-2">Wholesale Partnership</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Earn 25% commission by sharing premium, lab-verified research compounds with your audience.
                </p>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Exclusive Wholesale Pricing</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Get access to tiered discounts exclusive to our wholesale partners.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Lab Verified Quality</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">All compounds are third-party tested for purity and consistency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Reliable & Discreet Shipping</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Fast, secure, and discreet delivery across Canada.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Dedicated Support</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-2">Our team is here to support your business every step of the way.</p>
                    <span className="text-sm font-bold text-[#B98135] tracking-wide">365 - PEPTIDE</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Questions Box */}
            <div className="bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8 space-y-3">
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase">Questions?</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Contact our wholesale team at{' '}
                <a href="mailto:partnerships@alphapeptide.ca" className="text-[#B98135] hover:underline cursor-pointer">
                  partnerships@alphapeptide.ca
                </a>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed pt-1">
                We typically respond within 24 hours.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* How It Works Section Component */}
      <HowItWorks />

      {/* Global Footer Component */}
      <Footer />

    </div>
  );
}