'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import Header from '../../components/Navbar/Navbar'; // Update path if necessary
import Footer from '../../components/Footer/Footer'; // Update path if necessary

export default function ContactPage() {
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
      
      {/* Hero Section with Contact Background Image (50% Height) */}
      <div className="relative w-full py-12 md:py-16 overflow-hidden bg-black flex flex-col justify-center min-h-[175px]">
        
        {/* Contact Background Image Wrapper - Pushed to the right with blend mode */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[75%] z-0 pointer-events-none">
          <Image 
            src="/contactbg.png" 
            alt="Contact Background" 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
             
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
            <span className="text-[#B98135]">Contact Us</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-medium tracking-wide mb-3 text-white">
            Contact Us
          </h1>
          
          {/* Description */}
          <p className="text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed mb-3">
            Use the form below for questions about product availability, Certificates of Analysis and batch documentation, order status, shipping within Canada, wholesale enquiries, or general website information. Including your order number and the product name helps us respond faster.
          </p>

          <p className="text-sm">
            <span className="text-[#B98135] font-medium">Email: </span>
            <a href="mailto:info@alphapeptide.ca" className="text-white hover:text-[#B98135] transition-colors cursor-pointer">
              info@alphapeptide.ca
            </a>
          </p>
        </div>
      </div>

      {/* Main Content: Two Columns Layout matching Figma */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Contact Form */}
        <div className="lg:col-span-7 bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8">
          <form onSubmit={(e) => submitToGoogleSheet(e, 'Contact')} className="space-y-6">
            
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
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Name<span className="text-[#B98135]">*</span></label>
                <input name="name" type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Email<span className="text-[#B98135]">*</span></label>
                <input name="email" type="email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 cursor-pointer">Message<span className="text-[#B98135]">*</span></label>
              <textarea name="message" rows={6} placeholder="Enter please your message." className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white focus:border-[#B98135] focus:outline-none transition-colors resize-none" required></textarea>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="privacy" className="accent-[#B98135] w-4 h-4 rounded cursor-pointer border-white/10 bg-black shrink-0" required />
              <label htmlFor="privacy" className="text-xs text-gray-300 cursor-pointer">
                I agree to the <Link href="/privacy" className="text-[#B98135] hover:underline cursor-pointer">Privacy Policy</Link> of the website.
              </label>
            </div>

            <button disabled={status === 'Sending...'} type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {status || 'Send'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Quick Contact Card with QR Code */}
        <div className="lg:col-span-5">
          <div className="bg-[#070707] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="space-y-4 flex-1">
              <h3 className="text-base font-medium tracking-wide text-white">Quick Contact</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Chat with us on WhatsApp for faster support.
              </p>
              <div className="flex items-center gap-2 pt-2">
                {/* <div className="w-8 h-8 rounded-full bg-black border border-[#B98135]/40 flex items-center justify-center text-[#B98135]">
                  <MessageSquare size={14} />
                </div> */}
                {/* <span className="text-sm font-bold text-[#B98135] tracking-wide">365-PEPTIDE</span> */}
              </div>
              
            </div>

            {/* QR Code Image from Public Folder */}
            <div className="relative w-38 h-38 rounded-lg p-2 shrink-0 border border-white/10 flex items-center justify-center bg-black">
             
              <Image 
                src="/contactqr.png" 
                alt="WhatsApp QR Code" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </div>
      
      {/* Global Footer */}
      <Footer /> 
      
    </div>
  );
}