'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight, ChevronLeft, FileText } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar'; // Adjust path if needed
import Footer from '../../components/Footer/Footer'; // Adjust path if needed

// Mock data based on the design
const researchLibrary = [
  { name: 'BPC-157', subtitle: 'TISSUE REPAIR\nGUT HEALTH', image: '/res1.png', slug: 'bpc-157' },
  { name: 'TB-500', subtitle: 'TISSUE REPAIR\nMOBILITY', image: '/res2.png', slug: 'tb-500' },
  { name: 'GHK-Cu', subtitle: 'SKIN HEALTH\nRECOVERY', image: '/res3.png', slug: 'ghk-cu' },
  { name: 'MOTS-c', subtitle: 'METABOLIC HEALTH\nCELLULAR ENERGY', image: '/res4.png', slug: 'mots-c' },
  { name: 'SS-31', subtitle: 'MITOCHONDRIAL HEALTH\nCELLULAR PROTECTION', image: '/res5.png', slug: 'ss-31' },
  { name: 'TESAMORELIN', subtitle: 'TISSUE REPAIR\nGUT HEALTH', image: '/res6.png', slug: 'tesamorelin' },
  { name: 'WOLVERINE', subtitle: 'TISSUE REPAIR\nGUT HEALTH', image: '/res7.png', slug: 'wolverine' },
  { name: 'GLOW', subtitle: 'TISSUE REPAIR\nGUT HEALTH', image: '/res8.png', slug: 'glow' },
  { name: 'KLOW', subtitle: 'METABOLIC HEALTH\nCELLULAR ENERGY', image: '/res9.png', slug: 'klow' },
  { name: 'RETATRUTIDE', subtitle: 'METABOLIC HEALTH\nCELLULAR ENERGY', image: '/res10.png', slug: 'retatrutide' },
];

const expandingVault = [
  { name: 'SELANK', subtitle: 'COMING SOON', image: '/exp1.png', link: '/research/selank' },
  { name: 'THYMOSIN ALPHA-1', subtitle: 'COMING SOON', image: '/exp1.png', link: '/research/thymosin-alpha-1' },
  { name: 'SEMAX', subtitle: 'COMING SOON', image: '/exp1.png', link: '/research/semax' },
  { name: 'CJC-1295', subtitle: 'COMING SOON', image: '/exp1.png', link: '/research/cjc-1295-dac' },
  { name: '5-AMINO-1MQ', subtitle: 'COMING SOON', image: '/exp1.png', link: '/research/5-amino-1mq' },
];

const researchArticles = [
  { title: 'What is BPC-157? Evidence, Research & Safety', source: 'Research Review', year: '2024', image: '/lat1.png', slug: 'bpc-157' },
  { title: 'Thymosin Beta-4 (TB-500): A Comprehensive Review of Biological Func...', source: 'Research Review', year: '2024', image: '/lat2.png', slug: 'tb-500' },
  { title: 'GHK-Cu: A Comprehensive Review of its Biological Activities, Therapeutic Potential in...', source: 'Research Review', year: '2024', image: '/lat3.png', slug: 'ghk-cu' },
  { title: '5-Amino-1MQ: Emerging Research on a Mitochondrial Target for Cognitive Health...', source: 'Research Review', year: '2024', image: '/lat4.png', slug: '5-amino-1mq' },
  { title: 'CJC-1295: A Review of its Effects on Growth Hormone Secretion and Clinical Applications', source: 'Research Review', year: '2024', image: '/lat5.png', slug: 'cjc-1295' },
  { title: 'Retatrutide: A Triple-Hormone Agonist for Obesity and Metabolic Disease — What th...', source: 'Research Review', year: '2024', image: '/lat6.png', slug: 'retatrutide' },
  { title: 'Tirzepatide: A Dual GLP-1 and GIP Receptor Agonist for the Treatment of Obesity and...', source: 'Research Review', year: '2024', image: '/lat7.png', slug: 'tirzepatide' },
  { title: 'What Is MOTS-c? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat8.png', slug: 'mots-c' },
  { title: 'What Is SS-31? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat9.png', slug: 'ss-31' },
  { title: 'What Is SEMAX? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat10.png', slug: 'semax' },
  { title: 'What Is SELANK? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat11.png', slug: 'selank' },
  { title: 'What Is WOLVERINE? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat12.png', slug: 'wolverine' },
  { title: 'What Is KLOW? Research, Benefits & Safety', source: 'Research Review', year: '2024', image: '/lat13.png', slug: 'klow' },
  { title: 'What Is GLOW? Research, Benefits & Safety', source: 'Research Review', year: '2024', image: '/lat14.png', slug: 'glow' },
  { title: 'What Is Tesamorelin? Benefits, Research & Safety', source: 'Research Review', year: '2024', image: '/lat15.png', slug: 'tesamorelin' }
];

export default function ResearchVaultPage() {
  // Refs for each scrollable container
  const libraryRef = useRef<HTMLDivElement>(null);
  const vaultRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  // Reusable scroll function
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.5; // Scrolls 80% of the visible container width
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans">
      
      {/* Hero Section */}
      <div className="relative w-full py-20 md:py-16 overflow-hidden bg-black flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/research-hero.png" 
            alt="Research Vault Background" 
            fill 
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center md:object-cover " 
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-20 w-full px-6 md:px-12 lg:px-16">
          <div className="text-[10px] md:text-xs font-semibold mb-4 tracking-[0.15em] text-[#B98135] uppercase">
            PEPTIDE RESEARCH VAULT
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-2 text-white leading-none">
            Research
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 text-[#B98135] leading-none">
            VAULT
          </h2>
          
          <p className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 max-w-lg">
            ADVANCING HUMAN POTENTIAL THROUGH SCIENCE
          </p>

          <p className="text-gray-400 text-xs md:text-sm max-w-md leading-relaxed mb-8">
            Explore our compounds, the science behind them, and the research shaping tomorrow.
          </p>

          <Link 
            href="#library" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:opacity-90 text-white text-[11px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer"
          >
            BROWSE COMPOUNDS <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Content Sections Container */}
      <div id="library" className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-16 py-16 space-y-20">
        
        {/* Research Library */}
        <section className="relative group">
          <h2 className="text-xl md:text-[22px] font-medium tracking-wide mb-6">
            Research Library
          </h2>
          
          <div className="relative">
            <button 
              onClick={() => scrollContainer(libraryRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>

            <div 
              ref={libraryRef}
              className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {researchLibrary.map((item, index) => (
                <div key={index} className="min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px] shrink-0 bg-[#070707] border border-white/10 rounded-lg overflow-hidden flex flex-col">
                  <div className="relative h-[220px] w-full bg-[#0a0a0a]">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90" />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-[9px] text-gray-400 uppercase leading-tight whitespace-pre-line">
                        {item.subtitle}
                      </p>
                    </div>
                    <Link href={`/research/${item.slug}`} className="w-full flex items-center justify-center gap-2 py-2 border border-[#B98135]/50 hover:border-[#B98135] text-[#B98135] text-[9px] font-bold uppercase tracking-widest rounded transition-colors cursor-pointer">
                      VIEW RESEARCH <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => scrollContainer(libraryRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Expanding the Vault */}
        <section className="relative group">
          <h2 className="text-xl md:text-[22px] font-medium tracking-wide mb-6">
            Expanding the Vault
          </h2>
          
          <div className="relative">
             <button 
               onClick={() => scrollContainer(vaultRef, 'left')}
               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
             >
              <ChevronLeft size={16} />
            </button>

            <div 
              ref={vaultRef}
              className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {expandingVault.map((item, index) => (
                <Link 
                  href={item.link}
                  key={index} 
                  className="min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px] shrink-0 bg-[#070707] border border-white/10 rounded-lg overflow-hidden flex flex-col hover:border-[#B98135] transition-colors cursor-pointer"
                >
                  <div className="relative h-[220px] w-full bg-[#0a0a0a]">
                    <Image src={item.image} alt={item.name} sizes="(max-width: 768px) 100vw, 33vw" fill className="object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-center items-center text-center">
                    <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{item.name}</h3>
                    <p className="text-[14px] text-[#B98135] font-semibold uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button 
              onClick={() => scrollContainer(vaultRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Latest Research Articles */}
        <section className="relative group">
          <h2 className="text-xl md:text-[22px] font-medium tracking-wide mb-6">
            Latest Research Articles
          </h2>
          
          <div className="relative">
            <button 
              onClick={() => scrollContainer(articlesRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>

            <div 
              ref={articlesRef}
              className="flex gap-4 md:gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {researchArticles.map((article, index) => (
                <Link key={index} href={`/research/articles/${article.slug}`} className="min-w-[280px] w-[280px] md:min-w-[340px] md:w-[340px] shrink-0 bg-[#050505] border border-white/10 hover:border-white/30 transition-colors rounded-lg overflow-hidden flex flex-col cursor-pointer group/card">
                  <div className="relative h-[160px] w-full bg-[#0a0a0a]">
                    <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 group-hover/card:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[11px] font-bold text-white leading-relaxed mb-4 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-[10px] text-gray-400 border-t border-white/10 pt-3">
                      <div className="flex items-center gap-1.5">
                        <FileText size={12} className="text-gray-400" />
                        <span>{article.source}</span>
                      </div>
                      <span>|</span>
                      <span>{article.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button 
              onClick={() => scrollContainer(articlesRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-1/2 z-10 w-8 h-8 rounded-full border border-[#B98135]/50 bg-[#030303] flex items-center justify-center text-[#B98135] hover:bg-[#B98135] hover:text-white transition-colors cursor-pointer shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

      </div>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}