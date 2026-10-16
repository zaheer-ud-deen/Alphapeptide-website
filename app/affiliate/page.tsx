'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Tag, Link2, CreditCard } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar'; // Adjust path if necessary
import HowItWorks from '../../components/HowItWorks/HowItWorks'; // Adjust path if necessary
import Footer from '../../components/Footer/Footer'; // Adjust path if necessary


export default function AffiliatePage() {
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
      
      {/* Global Navbar */}
      
      {/* Hero Section with bg001.png Background Image */}
      <div className="relative w-full py-16 md:py-24 overflow-hidden bg-black flex flex-col justify-center">
        
        {/* Background Image Wrapper - Pushed to the right with blend mode */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[75%] z-0 pointer-events-none">
          <Image 
            src="/bg001.png" 
            alt="Affiliate Hero Background" 
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
            <span className="text-[#B98135]">Become an Affiliate</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-medium tracking-wide mb-3 text-white">
            Become an Affiliate
          </h1>
          
          {/* Description */}
          <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-12 ">

        {/* Two-Column Form & Perks Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Affiliate Registration Form */}
          <div className="lg:col-span-7 bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8">
            <form onSubmit={(e) => submitToGoogleSheet(e, 'Affiliate')} className="space-y-5">
              
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

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Username*</label>
                <input type="text" name="username" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">First Name*</label>
                <input type="text" name="firstName" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Last Name*</label>
                <input type="text" name="lastName" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Email*</label>
                <input type="email" name="email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Confirm Email*</label>
                <input type="email" name="confirmEmail" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Who referred you?</label>
                <input type="text" name="referredBy" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Add your Social Media link</label>
                <input type="text" name="socialLink" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Phone Number*</label>
                <input type="tel" name="phone" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Postal Code*</label>
                <input type="text" name="postalCode" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">City*</label>
                  <input type="text" name="city" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
                </div>
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
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Country*</label>
                <input type="text" name="country" defaultValue="Canada" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="terms" className="accent-[#B98135] w-4 h-4 rounded cursor-pointer border-white/10 bg-black shrink-0" required />
                <label htmlFor="terms" className="text-xs text-gray-300 cursor-pointer">
                  Accept our <Link href="/terms" className="text-[#B98135] hover:underline cursor-pointer">Terms & Conditions</Link>
                </label>
              </div>

              <button disabled={status === 'Sending...'} type="submit" className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:opacity-90 text-white text-xs font-semibold tracking-wider rounded-lg transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {status || 'Register'}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Partner in Precision Perks Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8 space-y-6 sticky top-6">
              
              <div>
                <h3 className="text-sm font-semibold tracking-widest text-white uppercase mb-2">Partner in Precision</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Earn 25% commission by sharing premium, lab verified research compounds with your audience.
                </p>
              </div>

              <div className="space-y-6 border-t border-white/10 pt-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Commission</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Earn on every successful referral.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <Tag size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">Customer Discount</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Share exclusive savings with your audience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <Link2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">No Commitments</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">No minimums, no monthly targets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#B98135]/50 bg-black flex items-center justify-center text-[#B98135] shrink-0">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#B98135] uppercase tracking-wide mb-1">On-Time Payouts</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Reliable payments, every time.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* How It Works Component */}
      <HowItWorks />

      {/* Global Footer */}
      <Footer />

    </div>
  );
}