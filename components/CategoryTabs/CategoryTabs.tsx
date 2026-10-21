'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight,
  Crosshair,
  BarChart2,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Centralized data structure so you can easily update text and images later
const tabsData = [
  {
    id: 'core-metabolic',
    label: 'Core Metabolic',
    iconSrc: '/tabi1.png', 
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/core-metabolic',
    imageSrc: '/tab1.png', 
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'endocrine-growth',
    label: 'Endocrine & Growth',
    iconSrc: '/tabi2.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/endocrine',
    imageSrc: '/tab2.png', 
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'metabolic-immunity',
    label: 'Metabolic Immunity',
    iconSrc: '/tabi3.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/immunity',
    imageSrc: '/tab3.png',
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'longevity',
    label: 'Longevity & Regeneration',
    iconSrc: '/tabi4.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/longevity',
    imageSrc: '/tab4.png',
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'neuro-cognitive',
    label: 'Neuro Cognitive',
    iconSrc: '/tabi5.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/neuro',
    imageSrc: '/tab5.png',
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'stacks',
    label: 'Stacks',
    iconSrc: '/tabi6.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/stacks',
    imageSrc: '/tab6.png',
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  },
  {
    id: 'accessories',
    label: 'Accessories',
    iconSrc: '/tabi7.png',
    titleWhite: 'RESEARCH. COMPOUNDS.',
    titleGold: 'DEFINED BY PURITY.',
    description: 'High quality lyophilized research compounds, verified through analysis and documented by batch.',
    buttonText: 'VIEW RESEARCH CATALOG',
    buttonLink: '/shop/accessories',
    imageSrc: '/tab7.png',
    features: [
      { icon: Crosshair, text: 'Research Use Only' },
      { icon: BarChart2, text: 'Batch Documentation' },
      { icon: RefreshCw, text: 'Analytical Testing' }
    ]
  }
];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to handle horizontal scrolling
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Pixels to scroll per click
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Find the currently active data
  const currentData = tabsData.find(tab => tab.id === activeTab) || tabsData[0];

  return (
    <section className="w-full bg-[#030303] py-8 md:py-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* TOP TABS NAVIGATION */}
        <div className="relative flex items-center mb-6 lg:mb-1">
          
          {/* Left Chevron (Visible only on mobile) */}
          <button 
            onClick={() => scroll('left')}
            className="md:hidden absolute left-[-24px] z-10 h-full flex items-center justify-center bg-gradient-to-r from-[#030303] via-[#030303] to-transparent pr-4 pl-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto no-scrollbar w-full cursor-pointer scroll-smooth"
          >
            <div className="flex w-full min-w-max justify-start gap-4 md:gap-6 lg:gap-8 pb-px px-6 md:px-0">
              {tabsData.map((tab) => {
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-3 pb-4 px-2 md:px-3 transition-all duration-300 border-b-2 ${
                      isActive 
                        ? 'border-[#B98135] text-[#B98135]' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {/* Custom Image Icon with brighter default state (opacity-75 instead of opacity-40) */}
                    <div className={`relative w-8 h-8 md:w-9 md:h-9 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}>
                      <Image 
                        src={tab.iconSrc} 
                        alt={`${tab.label} Icon`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span className={`cursor-pointer text-[10px] md:text-xs font-medium tracking-wide text-center uppercase ${isActive ? 'text-[#B98135]' : ''}`}>
                      {tab.label.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {word}<br className="hidden sm:block" />
                        </React.Fragment>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Chevron (Visible only on mobile) */}
          <button 
            onClick={() => scroll('right')}
            className="md:hidden absolute right-[-24px] z-10 h-full flex items-center justify-center bg-gradient-to-l from-[#030303] via-[#030303] to-transparent pl-4 pr-2 text-gray-400 hover:text-white"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[500px]">
          
          {/* Left Text Column */}
          <div className="flex flex-col justify-center animate-in fade-in slide-in-from-left-4 duration-500" key={currentData.id}>
            
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight mb-5 tracking-wide">
              <span className="text-white block">{currentData.titleWhite}</span>
              <span className="text-[#B98135] block">{currentData.titleGold}</span>
            </h2>
            
            <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed max-w-lg mb-10">
              {currentData.description}
            </p>
            
            <a 
              href={currentData.buttonLink}
              className="inline-flex items-center justify-between w-full sm:w-[320px] px-6 py-4 border border-[#B98135] rounded-md text-[#B98135] text-xs font-semibold tracking-widest uppercase hover:bg-[#B98135]/10 transition-colors group mb-12 lg:mb-16"
            >
              {currentData.buttonText}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Bottom Features */}
            <div className="flex items-start gap-8 md:gap-12">
              {currentData.features.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#B98135]/40 flex items-center justify-center">
                      <FeatureIcon size={16} className="text-[#B98135]" />
                    </div>
                    <span className="text-[10px] text-gray-400 text-center tracking-wider max-w-[80px]">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
            
          </div>

          {/* Right Image Column */}
          <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center animate-in fade-in slide-in-from-right-4 duration-500" key={`${currentData.id}-img`}>
            {/* Background texture/glow effect placeholder if needed */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B98135]/5 to-transparent opacity-50 blur-3xl pointer-events-none"></div>
            
            <Image 
              src={currentData.imageSrc} 
              alt={currentData.label} 
              fill
              className="object-contain object-center drop-shadow-2xl z-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}