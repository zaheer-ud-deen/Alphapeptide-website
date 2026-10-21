'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  subtotal: number;
  isCartOpen: boolean;
  isOpen: boolean; // Alias to prevent naming mismatches
  toggleCart: () => void;
  addToCart: (product?: { name?: string; price?: number; image?: string }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  formattedTime: string; // Global checkout timer
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Global Timer State (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(900);

  // 1. Load cart & global timer from localStorage when the app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('alphaPeptideCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from local storage', error);
      }
    }
    setIsInitialized(true);

    // Global Checkout Timer Logic
    const TIMER_DURATION = 15 * 60; // 15 minutes
    const storageKey = 'global_checkout_timer_expiry';
    const now = Date.now();
    const storedExpiry = localStorage.getItem(storageKey);

    let expiryTime: number;

    if (storedExpiry) {
      expiryTime = parseInt(storedExpiry, 10);
      if (expiryTime <= now) {
        expiryTime = now + TIMER_DURATION * 1000;
        localStorage.setItem(storageKey, expiryTime.toString());
      }
    } else {
      expiryTime = now + TIMER_DURATION * 1000;
      localStorage.setItem(storageKey, expiryTime.toString());
    }

    const remainingSeconds = Math.max(0, Math.floor((expiryTime - now) / 1000));
    setTimeLeft(remainingSeconds);

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const left = Math.max(0, Math.floor((expiryTime - currentTime) / 1000));
      setTimeLeft(left);

      if (left === 0) {
        const newExpiry = Date.now() + TIMER_DURATION * 1000;
        localStorage.setItem(storageKey, newExpiry.toString());
        expiryTime = newExpiry;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2. Save cart to localStorage every time cartItems changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('alphaPeptideCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (product?: { name?: string; price?: number; image?: string }) => {
    setCartItems((prev) => {
      const productName = product?.name || 'Research Compound';
      const existing = prev.find(item => item.name === productName);
      
      if (existing) {
        return prev.map(item => 
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prev, {
        id: Date.now(),
        name: productName,
        price: product?.price || 59.99,
        quantity: 1,
        image: product?.image || '/BPC-157.png'
      }];
    });
    setIsCartOpen(true); 
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Format seconds into MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <CartContext.Provider 
      value={{ 
        cartCount, 
        cartItems, 
        subtotal, 
        isCartOpen, 
        isOpen: isCartOpen, 
        toggleCart, 
        addToCart, 
        updateQuantity, 
        removeItem,
        formattedTime
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}