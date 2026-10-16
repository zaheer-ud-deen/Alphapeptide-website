'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const categories = [
  { id: 'all', label: 'All Products', iconSrc: '/tabi6.png' },
  { id: 'core-metabolic', label: 'Core Metabolic', iconSrc: '/tabi1.png' },
  { id: 'endocrine-growth', label: 'Endocrine & Growth', iconSrc: '/tabi2.png' },
  { id: 'metabolic-immunity', label: 'Metabolic Immunity', iconSrc: '/tabi3.png' },
  { id: 'longevity-regeneration', label: 'Longevity & Regeneration', iconSrc: '/tabi4.png' },
  { id: 'neuro-cognitive', label: 'Neuro Cognitive', iconSrc: '/tabi5.png' },
  { id: 'stacks', label: 'Stacks', iconSrc: '/tabi6.png' },
  { id: 'accessories', label: 'Accessories', iconSrc: '/tabi7.png' },
];

export default function ShopHero({ initialCategory = 'all' }: { initialCategory?: string }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const handleSelect = (id: string) => {
    setActiveCategory(id);
    if (id === 'all') {
      router.push('/research-catalog');
    } else {
      router.push(`/research-catalog/${id}`);
    }
  };

  return (
    // We keep the container compact here
    <div className="relative w-full pb-12 bg-[#030303]">

      {/* Hero Content Wrapper with fixed compact height */}
      <div className="relative w-[400] md:w-[1200] h-[320px] md:h-[400px] flex flex-col overflow-hidden bg-[#030303]">

        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/shophero.png"
            alt="Research compounds"
             
            sizes="(max-width: 768px) 100vw, 33vw"
            fill
            className="object-contain object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90"></div>
        </div>

        {/* Top Content: Breadcrumbs & Headings (Tightened spacing & aligned to match layout) */}
      <div className="relative z-10 w-full px-6 md:px-12 pt-4 md:pt-6 pb-6">
        
        <div className="text-xs text-gray-400 flex items-center gap-2 mb-3">
          <Link href="/" className="hover:text-[#B98135] transition-colors">Home</Link>
          <span className="text-gray-600">›</span>
          <Link href="/research-catalog" className="hover:text-[#B98135] transition-colors">Research Catalog</Link>
          
          {activeCategory !== 'all' && (
            <>
              <span className="text-gray-600">›</span>
              <span className="text-[#B98135]">
                {categories.find(c => c.id === activeCategory)?.label}
              </span>
            </>
          )}
        </div>

        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold tracking-tight text-white mb-1">
            RESEARCH CATALOG
          </h1>
          <p className="text-gray-300 text-xs md:text-[14px] leading-relaxed max-w-[320px]">
            Premium research compounds. Lab verified.<br />
            Batch traceable.
          </p>
        </div>
      </div>

      </div>

      {/* Interactive Category Tabs: Pulled up slightly using negative margin so they float over the bottom */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 md:px-10 -mt-2 md:-mt-28">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className="group relative h-28 md:h-36 w-full text-left focus:outline-none transition-transform hover:-translate-y-1 duration-300"
              >
                <div 
                  className={`absolute inset-0 p-[1px] transition-colors duration-300 ${
                    isActive ? 'bg-white/30' : 'bg-white/10 group-hover:bg-white/20'
                  }`}
                  style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                >
                  <div 
                    className="h-full w-full flex flex-col items-center justify-center gap-3 p-2 transition-colors duration-300 bg-[#0a0e17] cursor-pointer"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
                  >
                    
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                    }`}>
                      <Image 
                        src={cat.iconSrc} 
                        alt={`${cat.label} Icon`}
                      
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes="(max-width: 768px) 32px, 40px"
                      />
                    </div>

                    <span className={`text-[9px] md:text-[10px] text-center leading-tight tracking-wide ${
                      isActive ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-200'
                    }`}>
                      {cat.label.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {word}<br className="hidden md:block" />
                        </React.Fragment>
                      ))}
                    </span>
                    
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
