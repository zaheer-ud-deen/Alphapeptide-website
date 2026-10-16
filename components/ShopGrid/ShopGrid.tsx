'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  List as ListIcon, 
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight
} from 'lucide-react';

import { useCart } from '../../context/CartContext'; 
import { categories } from '../ShopHero/ShopHero'; 

// Mock data with unique 'slugs' for individual product routing
const products = [
  { id: 1, name: 'Retatrutide', slug: 'retatrutide', categoryId: 'core-metabolic', subtitle: '20MG | 99% Purity', price: '$95.00', numericPrice: 95.00, image: '/p1.png', badge: 'BEST SELLER', status: 'available', sales: 500, dateAdded: '2023-10-01' },
  { id: 2, name: 'TESAMORELIN', slug: 'tesamorelin', categoryId: 'endocrine-growth', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p2.png', badge: null, status: 'available', sales: 300, dateAdded: '2023-11-15' },
  { id: 3, name: 'SS-31', slug: 'ss-31', categoryId: 'metabolic-immunity', subtitle: '10MG | 99% Purity', price: '$85.00', numericPrice: 85.00, image: '/p3.png', badge: null, status: 'available', sales: 250, dateAdded: '2023-09-10' },
  { id: 4, name: 'BAC. WATER', slug: 'bac-water', categoryId: 'accessories', subtitle: '3ML', price: '$15.00', numericPrice: 15.00, image: '/p4.png', badge: 'BEST SELLER', status: 'available', sales: 1000, dateAdded: '2023-01-01' },
  { id: 5, name: 'WOLVERINE', slug: 'wolverine', categoryId: 'stacks', subtitle: '20MG | 99% Purity', price: '$110.00', numericPrice: 110.00, image: '/p5.png', badge: null, status: 'available', sales: 150, dateAdded: '2024-01-10' },
  { id: 6, name: 'GHK-Cu', slug: 'ghk-cu', categoryId: 'longevity-regeneration', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p6.png', badge: null, status: 'available', sales: 200, dateAdded: '2023-12-05' },
  { id: 7, name: 'TB-500', slug: 'tb-500', categoryId: 'longevity-regeneration', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p7.png', badge: null, status: 'available', sales: 400, dateAdded: '2023-05-20' },
  { id: 8, name: 'KLOW', slug: 'klow', categoryId: 'stacks', subtitle: '80MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p8.png', badge: null, status: 'available', sales: 100, dateAdded: '2024-02-01' },
  { id: 9, name: 'MOTS-C', slug: 'mots-c', categoryId: 'metabolic-immunity', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p9.png', badge: null, status: 'available', sales: 220, dateAdded: '2023-08-11' },
  { id: 10, name: 'GLOW', slug: 'glow', categoryId: 'stacks', subtitle: '70MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p10.png', badge: null, status: 'available', sales: 180, dateAdded: '2023-07-22' },
  { id: 11, name: 'BPC-157', slug: 'bpc-157', categoryId: 'longevity-regeneration', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p11.png', badge: null, status: 'available', sales: 450, dateAdded: '2023-04-14' },
  { id: 12, name: 'SELANK', slug: 'selank', categoryId: 'neuro-cognitive', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p12.png', badge: null, status: 'coming_soon', sales: 0, dateAdded: '2024-03-01' },
  { id: 16, name: 'SEMAX', slug: 'semax', categoryId: 'neuro-cognitive', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p16.png', badge: null, status: 'coming_soon', sales: 0, dateAdded: '2024-03-05' },
  { id: 13, name: '5-AMINO-1MQ', slug: '5-amino-1mq', categoryId: 'core-metabolic', subtitle: '10MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p13.png', badge: null, status: 'coming_soon', sales: 0, dateAdded: '2024-03-02' },
  { id: 14, name: 'TIRZEPATIDE', slug: 'tirzepatide', categoryId: 'core-metabolic', subtitle: '30MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p14.png', badge: null, status: 'coming_soon', sales: 0, dateAdded: '2024-03-03' },
  { id: 15, name: 'CJC-1295 w/DAC', slug: 'cjc-1295-w-dac', categoryId: 'endocrine-growth', subtitle: '5MG | 99% Purity', price: '$90.00', numericPrice: 90.00, image: '/p15.png', badge: null, status: 'coming_soon', sales: 0, dateAdded: '2024-03-04' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured (default)' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest' },
  { id: 'best-selling', label: 'Best Selling' },
];

export default function ShopGrid({ categorySlug = 'all' }: { categorySlug?: string }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = categorySlug === 'all' 
    ? products 
    : products.filter(p => p.categoryId === categorySlug);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSort.id) {
      case 'price-asc': return a.numericPrice - b.numericPrice;
      case 'price-desc': return b.numericPrice - a.numericPrice;
      case 'newest': return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'best-selling': return b.sales - a.sales;
      case 'featured': default: return a.id - b.id;
    }
  });

  const pageTitle = categories.find(c => c.id === categorySlug)?.label || 'All Products';

  return (
    <section className="w-full bg-[#030303] min-h-screen py-10 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl md:text-[28px] text-white font-medium tracking-wide">
              {pageTitle}
            </h2>
            <span className="text-gray-500 text-xs font-medium tracking-wide">
              {filteredProducts.length} Compounds
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-md bg-transparent hover:bg-white/5 transition-colors text-gray-300 text-[11px] font-medium tracking-widest uppercase">
              <Filter size={14} /> FILTER
            </button>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-md bg-[#0a0a0a] hover:bg-white/5 transition-colors text-gray-300 text-[11px] font-medium tracking-widest uppercase">
                SORT BY: {activeSort.label.replace(' (default)', '')} <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-[#111] border border-white/10 rounded-md shadow-xl z-50 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button key={option.id} onClick={() => { setActiveSort(option); setIsSortOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${activeSort.id === option.id ? 'bg-[#B98135] text-black font-semibold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 ml-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 border rounded-md transition-colors ${viewMode === 'grid' ? 'border-gray-500 text-white bg-white/5' : 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/30'}`}><LayoutGrid size={18} strokeWidth={1.5} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 border rounded-md transition-colors ${viewMode === 'list' ? 'border-gray-500 text-white bg-white/5' : 'border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/30'}`}><ListIcon size={18} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
           <div className="py-20 text-center text-gray-500">No products found in this category.</div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
            {sortedProducts.map((product) => (
              <div 
                key={product.id} 
                className={`group relative flex bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden hover:border-[#B98135] transition-all duration-300 cursor-pointer ${viewMode === 'grid' ? 'flex-col items-center p-4' : 'flex-row items-center h-48 p-4'}`}
              >
                
                {product.badge && (
                  <div className="absolute top-4 left-4 border border-[#B98135] text-[#B98135] text-[9px] px-2 py-1 uppercase tracking-widest rounded-full font-medium z-50 pointer-events-none">
                    {product.badge}
                  </div>
                )}

                {/* Homepage-matched Image Area */}
                <Link href={`/research-catalog/${product.categoryId}/${product.slug}`} className={`relative flex items-center justify-center ${viewMode === 'grid' ? 'w-full h-[250px] mb-3' : 'w-48 h-full border-r border-white/5'}`}>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none"></div>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    fill 
                    className="object-contain relative z-10 mix-blend-lighten" 
                  />
                </Link>

                {/* Product Details & Action */}
                <div className={`flex flex-col ${viewMode === 'grid' ? 'w-full items-center text-center' : 'flex-grow p-6 justify-center'}`}>
                  <Link href={`/research-catalog/${product.categoryId}/${product.slug}`}>
                    <h3 className="text-lg font-semibold text-white tracking-wide mb-1 hover:text-[#B98135] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {product.price}
                  </p>

                  <div className={viewMode === 'grid' ? 'w-full flex justify-center' : 'w-48'}>
                    {product.status === 'available' ? (
                      /* FIXED: Replaced button with Link for direct routing */
                      <Link 
                        href={`/research-catalog/${product.categoryId}/${product.slug}`}
                        className="cursor-pointer py-1 px-5 flex items-center justify-center gap-2 border border-[#B77D33] group-hover:border-[#B98135] group-hover:text-[#B98135] rounded-[4px] text-sm tracking-widest transition-all duration-300 text-white"
                      >
                        View Details <ArrowUpRight size={16} strokeWidth={1.5} />
                      </Link>
                    ) : (
                      <button disabled className="cursor-not-allowed py-1 px-5 flex items-center justify-center gap-2 border border-white/5 rounded-[4px] bg-[#030303]/50 text-gray-600 text-sm tracking-widest">
                        <Clock size={14} /> Coming Soon
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* --- PAGINATION --- */}
        <div className="flex items-center justify-center mt-16 pb-10">
          <div className="flex items-center gap-2">
            
            <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
              <ChevronLeft size={16} />
            </button>
            
            <button 
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[11px] font-bold transition-colors ${currentPage === 1 ? 'bg-[#B98135] text-black border border-[#B98135]' : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
            >
              1
            </button>
            
            <button 
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[11px] font-bold transition-colors ${currentPage === 2 ? 'bg-[#B98135] text-black border border-[#B98135]' : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
            >
              2
            </button>
            
            <div className="w-8 h-8 flex items-center justify-center text-gray-500">
              <MoreHorizontal size={14} />
            </div>
            
            <button 
              onClick={() => setCurrentPage(10)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[11px] font-bold transition-colors ${currentPage === 10 ? 'bg-[#B98135] text-black border border-[#B98135]' : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
            >
              10
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors">
              <ChevronRight size={16} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}