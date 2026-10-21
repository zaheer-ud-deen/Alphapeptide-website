'use client';

import { X, Trash2, Plus, Minus, ShoppingCart, Lock, ShieldCheck, FlaskConical } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // <-- ADDED ROUTER
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';


export default function CartDrawer() {
  const { isOpen, toggleCart, cartItems, updateQuantity, removeItem, subtotal, addToCart } = useCart();
  const router = useRouter(); // <-- INITIALIZED ROUTER

  // Free shipping goal logic (e.g., goal is $350)
  const freeShippingGoal = 350;
  const progressPercent = Math.min((subtotal / freeShippingGoal) * 100, 100);
  const amountAway = Math.max(freeShippingGoal - subtotal, 0);

  // Suggested products data for "You may also like..."
  const upsellProducts = [
    { id: 1, name: 'NAD+ 500mg', price: '$89.99', image: '/Retatrutide.png' },
    { id: 2, name: 'NAD+ 500mg', price: '$89.99', image: '/BPC-157.png' },
    { id: 3, name: 'NAD+ 500mg', price: '$89.99', image: '/GHK-Cu.png' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[380px] bg-[#030303] border-l border-white/10 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#070707]">
            <h2 className="text-lg font-medium tracking-wide">Shopping Cart</h2>
            <button 
              onClick={toggleCart}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar Section */}
          <div className="px-6 py-4 bg-[#080808] border-b border-white/10">
            <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
              <span>
                {amountAway > 0 
                  ? `You are $${amountAway.toFixed(2)} away from free shipping!` 
                  : '🎉 You qualify for free shipping!'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-black rounded-full overflow-hidden relative border border-white/10">
              <div 
                className="h-full bg-[#B98135] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#B98135] border-2 border-black flex items-center justify-center text-[8px]"
                style={{ left: `calc(${progressPercent}% - 8px)` }}
              >
                🚚
              </div>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10">
            
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400">
                <ShoppingCart size={40} className="text-[#B98135] mb-3 stroke-[1.5]" />
                <p className="text-sm">Your cart is currently empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 flex items-center gap-4 relative group hover:border-[#B98135]/40 transition-colors"
                >
                  {/* Item Image */}
                  <div className="relative w-16 h-16 bg-black rounded border border-white/5 shrink-0 overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill 
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[#B98135] text-sm font-medium mb-3">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="inline-flex items-center border border-[#B98135]/60 rounded bg-black">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-medium text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

            {/* "You may also like..." Upsell Section */}
           <div className="pt-6 mt-6 border-t border-white/10">
  <h3 className="text-sm font-medium text-white mb-4">You may also like...</h3>
  <div className="grid grid-cols-3 gap-3">
    {upsellProducts.map((upsell, idx) => (
      <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-lg p-3 flex flex-col items-center text-center">
        <div className="relative w-full h-20 mb-2">
          <Image src={upsell.image} alt={upsell.name} fill className="object-contain" />
        </div>
        <span className="text-[11px] font-medium text-white truncate w-full mb-0.5">{upsell.name}</span>
        <span className="text-[11px] text-gray-400 mb-2">{upsell.price}</span>
        <button 
          onClick={() => {
            // 1. Add to cart
            addToCart({
              name: upsell.name,
              price: parseFloat(upsell.price.replace('$', '')),
              image: upsell.image
            });
            
            // 2. Fire the toast notification
            toast.success(`${upsell.name} added to cart!`, {
              style: { border: '1px solid #B98135', backgroundColor: '#0a0a0a', color: 'white' },
              icon: <span>🛒</span>,
            });
          }}
          className="w-full py-1 border border-[#B98135] text-[#B98135] hover:bg-[#B98135] hover:text-black text-[10px] uppercase font-semibold rounded transition-colors cursor-pointer"
        >
          Add
        </button>
      </div>
    ))}
  </div>
</div>

          </div>

          {/* Footer Subtotal & Action Buttons */}
          <div className="p-6 bg-[#070707] border-t border-white/10 flex flex-col gap-4">
            
            <div className="flex items-center justify-between text-base font-semibold">
              <span className="text-gray-300">Subtotal: <span className="text-xs font-normal text-gray-400">({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span></span>
              <span className="text-white text-lg">${subtotal.toFixed(2)}</span>
            </div>

             {/* View Cart Button */}
           <button 
                  onClick={() => {
           toggleCart();
               router.push('/cart');
                }}
  className="w-full py-3.5 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-xs font-semibold tracking-[0.15em] rounded-[4px] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer uppercase"
>
  <ShoppingCart size={15} /> View Cart
</button>
            {/* Checkout Securely Button */}
            <button 
              // <-- FIXED: Added routing back in so it navigates to the checkout page
              onClick={() => {
                toggleCart();
                router.push('/checkout');
              }}
              className="w-full py-3.5 border border-[#B98135] hover:bg-[#B98135]/10 text-white text-xs font-semibold tracking-[0.15em] rounded-[4px] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer uppercase"
            >
              <Lock size={14} className="text-[#B98135]" /> Checkout Securely
            </button>

            {/* Bottom Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
              <div className="flex flex-col items-center text-[10px] text-gray-400 gap-1">
                <FlaskConical size={14} className="text-[#B98135]" />
                <span>3rd Party Labs</span>
              </div>
              <div className="flex flex-col items-center text-[10px] text-gray-400 gap-1">
                <ShieldCheck size={14} className="text-[#B98135]" />
                <span>99%+ Purity HPLC</span>
              </div>
              <div className="flex flex-col items-center text-[10px] text-gray-400 gap-1">
                <Lock size={14} className="text-[#B98135]" />
                <span>Secure Checkout</span>
              </div>
            </div>

          </div>

        </div>
      </div>
     
    </div>
    
  );
}