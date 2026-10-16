'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search,  
  ShoppingBag, 
  Sparkles, 
  Package, 
  Copy
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const promos = [
    {
      id: 0,
      icon: <Sparkles size={14} className="text-[#C4A464] shrink-0" />,
      content: (
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          <span className="text-[9px] md:text-xs tracking-wider font-medium text-gray-200 truncate">
            NEW RESEARCHER OFFER — 10% OFF YOUR FIRST ORDER · CODE
          </span>
          <button className="flex items-center gap-1 border border-[#C4A464] text-[#C4A464] px-1.5 md:px-2.5 py-0.5 rounded-[4px] text-[9px] md:text-[10px] hover:bg-[#C4A464]/10 transition-colors shrink-0">
            ALPHA10 <Copy size={10} className="md:w-3 md:h-3" />
          </button>
        </div>
      )
    },
    {
      id: 1,
      icon: <Package size={14} className="text-[#C4A464] shrink-0" />,
      content: (
        <span className="text-[9px] md:text-xs tracking-wider font-medium text-gray-200 uppercase truncate">
          Ships from Canada . Free Shipping over $175*
        </span>
      )
    }
  ];

  const startAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPromo((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    }, 3000);
  };

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  if (pathname === '/') {
    return null; 
  }

  const handlePrev = () => {
    setCurrentPromo((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
    startAutoRotate();
  };

  const handleNext = () => {
    setCurrentPromo((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    startAutoRotate();
  };

  const navLinks = [
    { label: 'Home', href: '/home' },
    { label: 'Research Catalog', href: '/research-catalog' },
    { label: 'Lab Results', href: '/lab-results' },
    { label: 'Research', href: '/research' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Affiliate', href: '/affiliate' },
    { label: 'Wholesale', href: '/wholesale' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      {/* 1. Top Promotional Bar (Normal Document Flow - Scrolls away) */}
      <div className="w-full flex items-center justify-between px-2 md:px-4 py-2 bg-black text-white relative z-[90]">
        <button onClick={handlePrev} className="p-1 hover:text-[#C4A464] transition-colors shrink-0">
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-center min-w-0">
          {promos[currentPromo].icon}
          {promos[currentPromo].content}
        </div>
        <button onClick={handleNext} className="p-1 hover:text-[#C4A464] transition-colors shrink-0">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 2. Main Navigation Area & Mobile Menu (Sticky at Top) */}
      <nav className="sticky top-0 w-full bg-black text-white flex flex-col z-[100] border-b border-white/10 shadow-lg">
        
        {/* Main Desktop/Tablet Bar */}
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-3 md:py-4 relative z-50">
          
          {/* Logo */}
          <Link href="/" className="relative w-[140px] md:w-[180px] h-[40px] md:h-[50px] flex-shrink-0 bg-black">
            <Image 
              src="/HeaderLogo.png" 
              alt="Alpha Peptide" 
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
                
              className="object-contain object-left" 
            />
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link 
                  key={href} 
                  href={href} 
                  className={`text-[13px] leading-none transition-colors ${
                    isActive 
                      ? 'text-[#B77D33] font-medium' 
                      : 'text-gray-200 font-light hover:text-[#B77D33]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Icons: Search, Cart, and Hamburger */}
          <div className="flex items-center gap-3 md:gap-5 lg:gap-6 bg-black">
            <button className="hover:text-[#C4A464] transition-colors cursor-pointer p-1">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {/* CART BUTTON */}
            <div className="relative z-50">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleCart();
                }}
                className="relative flex items-center justify-center p-1 md:p-2 text-white hover:text-[#C4A464] transition-colors cursor-pointer bg-transparent border-none outline-none"
              >
                <ShoppingBag size={20} strokeWidth={1.5} className="pointer-events-none" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 md:top-0 md:right-0 bg-[#C4A464] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full pointer-events-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* HAMBURGER MENU BUTTON (RAW SVG) - Visible on Mobile, Hidden on LG */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center p-1 text-white hover:text-[#C4A464] transition-colors cursor-pointer ml-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* 3. Mobile Dropdown Menu (Attached to Sticky Nav) */}
        <div 
          className={`lg:hidden absolute top-[100%] left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top z-40 ${
            isMobileMenuOpen ? 'opacity-100 scale-y-100 h-screen' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col px-6 py-4 pb-32 h-full overflow-y-auto">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link 
                  key={href} 
                  href={href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-4 border-b border-white/5 text-[15px] tracking-wide transition-colors ${
                    isActive 
                      ? 'text-[#B77D33] font-medium' 
                      : 'text-gray-300 hover:text-[#B77D33]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            
            <div className="mt-8">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium mb-4">Support & More</p>
              <div className="flex gap-4">
                <button className="text-xs text-gray-400 hover:text-white transition-colors">Login / Register</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}