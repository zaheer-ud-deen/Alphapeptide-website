'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductGrid() {
  const { addToCart } = useCart();
  
  // State to control mobile visibility of the last 2 products
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to handle the button click
  const handleAddToCart = (productName: string) => {
    addToCart();
    
    // Fire the toast notification
    toast.success(`${productName} added to cart!`, {
      style: { border: '1px solid #B98135', backgroundColor: '#0a0a0a', color: 'white' },
      icon: <span>🛒</span>,
    });
  };

  // Array holding the data for the 4 products
  const products = [
    {
      id: 1,
      name: 'Retatrutide',
      price: '$145.00 - $1160',
      badge: 'BEST SELLER',
      image: '/Retatrutide.png' 
    },
    {
      id: 2,
      name: 'BPC-157',
      price: '$65.00 - $520.00',
      badge: null,
      image: '/BPC-157.png'
    },
    {
      id: 3,
      name: 'GHK-Cu',
      price: '$60.00 - $480.00',
      badge: null,
      image: '/GHK-Cu.png'
    },
    {
      id: 4,
      name: 'Tesamorelin',
      price: '$85.00 - $680.00',
      badge: null,
      image: '/Tesamorelin.png'
    }
  ];

  return (
    <section className="w-full bg-[#050505] py-20 md:py-28 px-4 md:px-12 flex flex-col items-center">
      
      {/* 1. Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-[#B98135]"></div>
          <span className="text-[#B98135] text-xs font-medium tracking-widest uppercase">
            Top Picks
          </span>
          <div className="w-8 h-[1px] bg-[#B98135]"></div>
        </div>
        
        <h2 className="text-3xl md:text-[40px] font-medium tracking-wide text-white mb-4">
          RESEARCHED COMPOUNDS
        </h2>
        
        <p className="text-gray-300 text-sm md:text-base">
          Research Compounds <span className="text-[#B98135]"> with batch specific </span> analytical documentation
        </p>
      </div>

      {/* 2. Product Grid */}
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          
          /* 
             The "group" class here allows us to link the hover states of the card and button.
             Added dynamic classes: hides items 3 & 4 on mobile unless expanded, always shows on sm+ 
          */
          <div 
            key={product.id} 
            className={`group relative flex-col items-center p-4 rounded-lg border border-white/10 hover:border-[#B98135] transition-all duration-300 cursor-pointer bg-[#0a0a0a] ${
              !isExpanded && index >= 2 ? 'hidden sm:flex' : 'flex'
            }`}
          >
            
            {/* Optional Best Seller Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 border border-[#B98135] text-[#B98135] text-[9px] px-2 py-1 mt-0 uppercase tracking-widest rounded-full font-medium z-50">
                {product.badge}
              </div>
            )}

               {/* Product Image Area */}
            <div className="relative w-full h-[250px] md:h-[250px] mb-3 flex items-center justify-center">
              {/* Subtle glow effect behind the bottle */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl"></div>
              
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain relative z-10 mix-blend-lighten" 
              />
            </div>

            {/* Product Details */}
            <h3 className="text-lg md:text-sm font-semibold text-white tracking-wide mb-1">
              {product.name}
            </h3>
            
            <p className="text-gray-400 text-sm mb-3">
              {product.price}
            </p>

             <button 
                onClick={() => handleAddToCart(product.name)}
                className="cursor-pointer py-1 px-5 flex items-center justify-center gap-2 border border-[#B77D33] group-hover:border-[#B98135] group-hover:text-[#B98135] rounded-[4px] text-sm tracking-widest transition-all duration-300"
              >
                 View Details <ArrowUpRight size={16} strokeWidth={1.5} />
            </button>
            
          </div>
        ))}
      </div>

      {/* 3. Mobile View Toggle Button (Hidden on sm screens and up) */}
      <div className="w-full flex justify-center mt-8 sm:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#B98135] transition-colors text-xs font-semibold tracking-widest uppercase cursor-pointer"
        >
          {isExpanded ? (
            <>View Less <ChevronUp size={16} strokeWidth={2} /></>
          ) : (
            <>View All Products <ChevronDown size={16} strokeWidth={2} /></>
          )}
        </button>
      </div>

    </section>
  );
}