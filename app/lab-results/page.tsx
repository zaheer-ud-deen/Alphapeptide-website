'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, ShieldCheck, FileText, ExternalLink, FlaskConical, Biohazard } from 'lucide-react';
// import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer'; 

// Static Data for the COA Table
const initialLots = [
  { lot: 'VP-183D5F7410', compound: 'BPC-157 / TB-500 Blend', dose: '—', purity: '99.84% HPLC', mw: '—', status: 'IN STOCK', pdf: '/BPC157TB500.pdf' },
  { lot: 'VP-3Q5S7UFA6', compound: 'CJC / Ipamorelin', dose: '—', purity: '99.22% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-8K3M7N2P4', compound: 'GLP-1 SM', dose: 'Dose Strength: 10mg', purity: '98.05% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-5R7T3W6X6', compound: 'GLP-3 RT', dose: 'Dose Strength: 10mg', purity: '99.65% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-5B7D5FSH1', compound: 'Melanotan-II 10mg', dose: '10mg', purity: '99.38% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-3AAC6E2G8', compound: 'GLP-2 TZ', dose: '—', purity: '99.77% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-1U5V6X8Z2', compound: 'MOTS-C', dose: '—', purity: '99.86% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-7W9Y2AACS', compound: 'Semax 10mg', dose: '10mg', purity: '99.76% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
  { lot: 'VP-2JN6N8OD', compound: 'SS-31', dose: 'Dosage: 50mg', purity: '99.33% HPLC', mw: '—', status: 'IN STOCK', pdf: '/SS-31.pdf' },
  { lot: 'VP-9N2P5R7T0', compound: 'Tesamorelin 10mg', dose: '10mg', purity: '99.29% HPLC', mw: '—', status: 'IN STOCK', pdf: '/tersmoline.pdf' },
  { lot: 'VP-11N2P5R7T', compound: 'Retatrutide 10mg', dose: '10mg', purity: '99.50% HPLC', mw: '—', status: 'IN STOCK', pdf: '/Retatrutide.pdf' },
  { lot: 'VP-12N2P5R7T', compound: 'Tirzepatide 30mg', dose: '30mg', purity: '99.90% HPLC', mw: '—', status: 'IN STOCK', pdf: '/sample-coa.pdf' },
];

export default function LabResultsPage() {
  const [lots] = useState(initialLots);
  
  // Desktop specific state (Shows 10, adds 5)
  const [visibleDesktopCount, setVisibleDesktopCount] = useState(10);
  const handleViewMoreDesktop = () => {
    setVisibleDesktopCount((prev) => prev + 5);
  };

  // Mobile specific state (Shows 3, adds 3)
  const [visibleMobileCount, setVisibleMobileCount] = useState(3);
  const handleViewMoreMobile = () => {
    setVisibleMobileCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full bg-[#030303] flex flex-col">
        
        {/* Top Half: Split Content */}
        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row">
          
          {/* LEFT COLUMN: Headings and Search */}
          <div className="w-full lg:w-[40%] px-6 md:px-12 py-12 lg:py-8 flex flex-col justify-center">
            
            <h1 className="text-[38] md:text-[50px] font-bold tracking-tight mb-2 leading-none">
              <span className="text-white">COA </span> <span className="text-[#B98135]"> ARCHIVE. </span>
            </h1>
            
            <h2 className="text-[12px] md:text-[13px] font-medium tracking-widest mb-6 uppercase">
              <span className="text-[#B98135] ">EVERY LOT.</span> <span className="text-white">EVERY TIME.</span>
            </h2>
            
            <p className="text-gray-400 text-[13px] leading-relaxed mb-10 max-w-[520px]">
              Find published lab results searchable by lot number or compound name. Verified lots remain available after they sell out.
            </p>

            {/* Filter Bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 ">
              
              <div className="relative w-full sm:w-[580]">
                <input 
                  type="text" 
                  placeholder="Search lot number or compound name..." 
                  className="w-full bg-transparent border border-white/20 rounded-md pl-4 pr-10 py-2.5 text-[12px] text-gray-400 placeholder:text-gray-500 focus:border-[#B98135] focus:outline-none transition-colors"
                />
                <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              <div className="relative w-full sm:w-[530px]">
                <select className="w-full bg-transparent border border-white/20 rounded-md pl-4 pr-10 py-2.5 text-[12px] text-gray-300 focus:border-[#B98135] focus:outline-none transition-colors appearance-none cursor-pointer">
                  <option value="all" className="bg-[#030303]">All statuses</option>
                  <option value="available" className="bg-[#030303]">Available</option>
                  <option value="sold_out" className="bg-[#030303]">Sold Out</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <button className="text-[#B98135] text-[11px] font-bold tracking-widest hover:text-white transition-colors uppercase whitespace-nowrap pl-2 cursor-pointer">
                CLEAR FILTERS
              </button>
            </div>
          </div>
          
          {/* CUSTOM VERTICAL DIVIDER LINE */}
          <div className="hidden lg:block w-px bg-white/10 my-18 relative z-20"></div>
          
          {/* RIGHT COLUMN: Background Image & 3rd Party Tested Badge */}
          <div className="w-full lg:w-[62%] relative flex items-center min-h-[250px] lg:min-h-full py-1 lg:py-20 border-t border-white/10 lg:border-t-0">
            
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image 
                src="/heroimg222.png" 
                alt="COA Archive Background" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain object-center" 
              />
            </div>

            {/* Badge Content */}
            <div className="relative z-20 px-6 lg:pl-20 pr-6 pb-20">
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  <ShieldCheck size={22} className="text-[#B98135]" strokeWidth={1.25} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[12px] font-bold text-white tracking-widest uppercase">
                    INDEPENDENTLY THIRD-PARTY TESTED
                  </h3>
                  <p className="text-[12px] text-gray-300">
                    Verified through independent Canadian laboratories
                  </p>
                  <p className="text-[10px] font-medium text-[#B98135] tracking-widest uppercase pt-1">
                    TESTIDES.COM <span className="text-[#B98135]/40 px-1">•</span> PEPTIDETESTCANADA.CA
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="w-full border-y border-white/10 bg-[#030303]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-bold tracking-widest uppercase">
            
            <div className="flex items-center gap-2">
              <span className="text-[#B98135] text-xs">22</span>
              <span className="text-white">PUBLISHED LOTS</span>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-[#B98135]"></div>
            <span className="text-gray-300">INDEPENDENTLY TESTED</span>
            
            <div className="w-1.5 h-1.5 rounded-full bg-[#B98135]"></div>
            <span className="text-gray-300">BATCH TRACEABLE</span>
            
            <div className="w-1.5 h-1.5 rounded-full bg-[#B98135]"></div>
            <span className="text-gray-300">CERTIFICATES PERMANENTLY ARCHIVED</span>
            
          </div>
        </div>

      </div>
      {/* --- END HERO SECTION --- */}

      {/* --- COA SECTION --- */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-12">
        
        {/* =========================================================
            DESKTOP/LAPTOP TABLE VIEW (Hidden on Mobile) 
        ========================================================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
                <th className="py-4 px-4 font-bold">LOT</th>
                <th className="py-4 px-4 font-bold">COMPOUND</th>
                <th className="py-4 px-4 font-bold">DOSE</th>
                <th className="py-4 px-4 font-bold">PURITY HPLC</th>
                <th className="py-4 px-4 font-bold">MW</th>
                <th className="py-4 px-4 font-bold">STATUS</th>
                <th className="py-4 px-4 text-right font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {lots.slice(0, visibleDesktopCount).map((item, index) => (
                <tr key={`desktop-${index}`} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-mono text-gray-300">{item.lot}</td>
                  <td className="py-4 px-4 font-medium text-white">{item.compound}</td>
                  <td className="py-4 px-4 text-gray-400">{item.dose}</td>
                  <td className="py-4 px-4 text-[#B98135] font-medium leading-tight">
                    {item.purity.replace('HPLC', '')} <br /> 
                    <span className="text-[10px] text-[#B98135]">HPLC</span>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{item.mw}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-2 font-medium text-white text-[11px] tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-6">
                      <a 
                        href={item.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/10 bg-black text-[10px] font-bold tracking-widest text-white hover:border-[#B98135] transition-colors uppercase"
                      >
                        <ExternalLink size={12} className="text-white" />
                        VIEW COA
                      </a>
                      
                      <Link 
                        href="/shop" 
                        className="text-[10px] font-bold tracking-widest text-[#B98135] hover:text-white transition-colors uppercase"
                      >
                        SHOP →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* DESKTOP VIEW MORE BUTTON */}
          {visibleDesktopCount < lots.length && (
            <div className="flex justify-center mt-12 mb-8">
              <button 
                onClick={handleViewMoreDesktop}
                className="flex items-center gap-3 text-[13px] font-medium tracking-widest text-white hover:text-gray-300 transition-colors uppercase cursor-pointer"
              >
                VIEW MORE LOTS <ChevronDown size={20} className="text-[#B98135]" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* =========================================================
            MOBILE CARD VIEW (Hidden on Desktop/Tablet) 
        ========================================================= */}
        <div className="md:hidden flex flex-col gap-4">
          {lots.slice(0, visibleMobileCount).map((item, index) => (
            <div key={`mobile-${index}`} className="bg-[#0a0a0a] border border-white/10 rounded-lg p-5 flex flex-col gap-4">
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1">{item.compound}</h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wide">Lot: {item.lot}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-medium text-white text-[9px] tracking-widest uppercase bg-white/5 px-2.5 py-1.5 rounded shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-y border-white/5 py-4 my-1">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Dose</p>
                  <p className="text-gray-300">{item.dose}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Purity</p>
                  <p className="text-[#B98135] font-medium">{item.purity}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">MW</p>
                  <p className="text-gray-300">{item.mw}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link 
                  href="/shop" 
                  className="text-[10px] font-bold tracking-widest text-[#B98135] hover:text-white transition-colors uppercase"
                >
                  SHOP →
                </Link>
                <a 
                  href={item.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/10 bg-black text-[10px] font-bold tracking-widest text-white hover:border-[#B98135] transition-colors uppercase"
                >
                  <ExternalLink size={12} className="text-white" />
                  VIEW COA
                </a>
              </div>

            </div>
          ))}

          {/* MOBILE VIEW MORE BUTTON */}
          {visibleMobileCount < lots.length && (
            <div className="flex justify-center mt-6 mb-4">
              <button 
                onClick={handleViewMoreMobile}
                className="flex items-center gap-3 text-[13px] font-medium tracking-widest text-white hover:text-gray-300 transition-colors uppercase cursor-pointer"
              >
                VIEW MORE LOTS <ChevronDown size={20} className="text-[#B98135]" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* --- FEATURE FOOTER BANNER --- */}
      <div className="w-full border-y border-white/10 bg-[#030303] py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex items-start gap-5 py-6 md:py-0 md:pr-8">
            <FlaskConical size={32} className="text-white shrink-0" strokeWidth={1.5} />
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">INDEPENDENT CANADIAN LABS</h4>
              <p className="text-[10px] font-bold text-[#B98135] tracking-widest">TESTIDES.COM • PEPTIDETESTCANADA.CA</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">Third-party verification you can trust.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-5 py-6 md:py-0 md:px-8">
            <ShieldCheck size={32} className="text-white shrink-0" strokeWidth={1.5} />
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">99%+ HPLC PURITY</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">High performance liquid chromatography testing.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 py-6 md:py-0 md:px-8">
            <Biohazard size={32} className="text-white shrink-0" strokeWidth={1.5} />
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">BATCH TRACEABLE</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Every lot is recorded, verified, and traceable.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 py-6 md:py-0 md:pl-8">
            <FileText size={32} className="text-white shrink-0" strokeWidth={1.5} />
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">CERTIFICATES ARCHIVED</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Published certificates remain available after sell out.</p>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}