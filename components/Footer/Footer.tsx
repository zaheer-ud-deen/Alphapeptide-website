'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white pt-16 pb-12 px-6 md:px-12">
      
      {/* Main Grid Container */}
      <div className="w-full max-w-[1300px] mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/10">
          
          {/* Column 1: Brand (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start pr-4">
            
            {/* Logo Image */}
            <div className="relative w-[140px] h-[115px] mb-5">
              <Image 
                src="/footerlogo.png"
                alt="Alpha Peptide"
                sizes="(max-width: 768px) 100vw, 33vw"
                fill
                className="object-contain object-left"
              />
            </div>
            
            <p className="text-gray-100 text-[14px] leading-relaxed mb-6 max-w-[260px]">
              Canada's most transparent source for premium research compounds.
            </p>
            
            {/* Canadian Badge */}
            <div className="flex items-center gap-2">
              <div className="relative w-[20px] h-[20px]">
                <Image 
                  src="/redleaf.png"
                  alt="Canadian"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#C99441] text-[16px] font-medium tracking-wide">
                CANADIAN
              </span>
            </div>
          </div>

          {/* Column 2: EXPLORE (Spans 2 cols) */}
          <div className="md:col-span-2 flex flex-col pt-2">
            <h3 className="text-[#C99441] text-[15px] font-medium mb-5 tracking-wide">EXPLORE</h3>
            <ul className="flex flex-col gap-4">
              {['Shop', 'Lab Results', 'Research', 'Wholesale'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-200 hover:text-[#B77D33] text-[14px] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SUPPORT (Spans 2 cols) */}
          <div className="md:col-span-2 flex flex-col pt-2">
            <h3 className="text-[#C99441] text-[15px] font-medium mb-5 tracking-wide">SUPPORT</h3>
            <ul className="flex flex-col gap-4">
              {['FAQ', 'Contact Us', 'Shipping', 'Returns'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-200 hover:text-[#B77D33] text-[14px] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: FOLLOW US + SECURE PAYMENT (Spans 2 cols) */}
          <div className="md:col-span-2 flex flex-col pt-2">
            <h3 className="text-[#C99441] text-[15px] font-medium mb-5 tracking-wide">FOLLOW US</h3>
            <div className="flex items-center gap-4 mb-7">
              <Link href="#" aria-label="Email" className="text-gray-200 hover:text-[#B77D33] transition-colors">
                <Mail size={20} strokeWidth={1.75} />
              </Link>
              <Link href="#" aria-label="X" className="text-gray-200 hover:text-[#B77D33] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
               <Link href="#" aria-label="Instagram" className="text-gray-200 hover:text-[#B77D33] transition-colors">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
</Link>
            </div>

            <h3 className="text-gray-400 text-[13px] font-medium mb-4 tracking-wide uppercase">Secure Payment</h3>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-transparent border border-white/15 rounded flex items-center justify-center">
                <CreditCard size={16} className="text-gray-300" />
              </div>
              <div className="h-9 w-9 bg-transparent border border-white/15 rounded-full flex items-center justify-center text-[13px] font-bold">
                ₿
              </div>
              <div className="h-9 px-2.5 bg-transparent border border-white/15 rounded flex items-center justify-center text-[10px] font-medium text-gray-300 whitespace-nowrap">
                e-Transfer
              </div>
            </div>
          </div>

          {/* Column 5: STAY INFORMED (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col pt-2">
            <h3 className="text-[#C99441] text-[15px] font-medium mb-4 tracking-wide">STAY INFORMED</h3>
            <p className="text-gray-200 text-[14px] mb-5 leading-relaxed max-w-[280px]">
              Subscribe to get regular updates and new releases.
            </p>
            
            <form className="flex items-center gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email adress" 
                className="flex-1 max-w-[220px] bg-black border border-white/10 rounded-[4px] px-4 py-2.5 text-[13px] text-white placeholder-gray-700 focus:outline-none focus:border-[#C99441]"
              />
              <button 
                type="submit"
                className="bg-[#C99441] hover:bg-[#B58235] text-white px-5 py-2.5 rounded-[4px] text-[14px] font-medium transition-colors"
              >
                Enter
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-500 text-[12px]">
              © 2026 Alpha Peptide. All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {['Privacy Policy', 'Terms & Conditions', 'Research Standards', 'Disclaimer'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  className="text-gray-500 hover:text-gray-300 text-[12px] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-[#C99441] text-[10px] mt-[3px]">●</span>
            <p className="text-gray-500 text-[12px] leading-relaxed max-w-[1000px]">
              All products are supplied strictly for qualified in vitro laboratory research and are not for human or veterinary use. They are not drugs, foods, supplements, or cosmetics, and are not intended as medicines, medications, treatments, or performance-enhancing products. No claims are made regarding clinical outcomes, safety, or efficacy.
            </p>
          </div>
          
        </div>

      </div>
    </footer>
  );
}