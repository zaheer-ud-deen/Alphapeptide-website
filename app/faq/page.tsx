'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Truck, Headphones, FileText } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer'; 
import SupportInfoBar from '../../components/SupportInfoBar/SupportInfoBar';

// FAQ Data extracted from your design
const faqData = {
  "ORDERS & SHIPPING": [
    {
      q: "When will my order be processed?",
      a: "Orders are processed within 1-2 business days (Monday to Friday). You will receive an email confirmation once your order has been processed and is preparing for shipment."
    },
    { q: "What shipping carriers do you use?", a: "We partner with reliable carriers like Canada Post to ensure secure and timely delivery of your research compounds." },
    { q: "Do you offer express shipping?", a: "Yes, expedited shipping options are available at checkout for faster delivery." },
    { q: "How do I know if my order has shipped?", a: "You will receive an email with tracking information as soon as your shipping label is created." },
    { q: "Can I update my shipping address after placing an order?", a: "If your order has not yet been processed, contact our support team immediately to request an address update." },
    { q: "What if I enter the wrong shipping address?", a: "We are not responsible for packages delivered to an incorrect address provided by the customer. Please verify your details before checkout." },
    { q: "Do you offer local pickup?", a: "Currently, we operate exclusively online and do not offer local pickup." },
    { q: "Is shipping discreet?", a: "Yes, all orders are shipped in plain, unmarked packaging to ensure your privacy." }
  ],
  "PRODUCTS & PEPTIDES": [
    {
      q: "What are peptides?",
      a: "Peptides are short chains of amino acids that naturally occur in the body and play important roles in signaling, recovery, metabolism, and various biological functions."
    },
    { q: "Are your peptides research grade?", a: "Yes, all our peptides are strictly research grade and intended for laboratory use only." },
    { q: "What makes your peptides high quality?", a: "Our compounds undergo rigorous purification processes and third-party HPLC testing to ensure maximum purity." },
    { q: "What is the purity of your peptides?", a: "Our peptides consistently test at 99%+ purity, verified by independent analytical laboratories." },
    { q: "How are your peptides manufactured?", a: "They are synthesized in state-of-the-art facilities using advanced solid-phase peptide synthesis (SPPS)." },
    { q: "Do you provide Certificates of Analysis (COAs)?", a: "Yes, up-to-date batch COAs are available on our website for transparency and verification." },
    { q: "Can I trust the batch I receive?", a: "Absolutely. We maintain strict batch tracking and quality control protocols from synthesis to bottling." }
  ],
  "PAYMENTS & PRICING": [
    {
      q: "Is my payment information secure?",
      a: "Yes. Our website uses industry-leading SSL encryption and secure payment processing to protect your information."
    },
    { q: "When will I be charged for my order?", a: "Your payment method will be charged immediately upon placing the order." },
    { q: "Do you charge tax?", a: "Applicable taxes are calculated at checkout based on your shipping destination." },
    { q: "Do you offer any discounts or promotions?", a: "Yes, we offer a 10% discount for new researchers and occasional promotions for our newsletter subscribers." },
    { q: "Can I get a price match?", a: "We do not currently offer price matching, as we focus on providing the highest verified purity at competitive rates." },
    { q: "Can I pay with a different cryptocurrency or digital wallet?", a: "We currently accept major credit cards and e-Transfer. Check our checkout page for the most up-to-date payment methods." }
  ],
  "RETURNS & REFUNDS": [
    {
      q: "What is your return policy?",
      a: "Due to the nature of our products, all sales are final. We do not accept returns or exchanges."
    },
    { q: "What if my order arrives damaged or incorrect?", a: "Please contact our support team within 48 hours of delivery with photographic evidence, and we will resolve the issue." },
    { q: "Can I cancel or modify my order?", a: "Orders can only be canceled or modified if they have not yet entered the processing stage." },
    { q: "Do you offer refunds?", a: "Refunds are only issued in the event of an inventory error or if a cancellation is requested before processing." },
    { q: "What if my tracking shows my package was delivered but I didn't receive it?", a: "Please check with neighbors and your local post office. We cannot be held liable for packages marked as delivered by the carrier." },
    { q: "Do you ship internationally?", a: "Please refer to our Shipping Policy page for the most current list of countries we service." },
    { q: "Why was my order declined or refunded?", a: "Orders may be declined due to payment verification failure or suspected violation of our Terms and Conditions." },
    { q: "Do you restock sold-out items?", a: "Yes, we regularly restock our inventory. You can sign up for email notifications on the product page." }
  ],
  "ACCOUNT SECURITY": [
    {
      q: "How do I create an account?",
      a: "Click the \"Login\" icon at the top right and select \"Create Account.\" Enter your email address, create a strong password, and follow the prompts."
    },
    { q: "Is my personal information secure?", a: "Yes, we employ strict data protection protocols and do not sell your personal information to third parties." },
    { q: "What password requirements do you have?", a: "Passwords must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters." },
    { q: "How do I reset my password?", a: "Click \"Forgot Password\" on the login screen to receive a secure reset link via email." },
    { q: "How do I update my account information?", a: "Log into your account dashboard to update your shipping address, payment methods, and contact details." },
    { q: "What should I do if I suspect unauthorized activity?", a: "Immediately reset your password and contact our support team so we can secure your account." },
    { q: "How do you protect payment information?", a: "We do not store full credit card numbers on our servers. All transactions are tokenized and processed via secure payment gateways." }
  ],
  "RESEARCH & SAFETY": [
    {
      q: "Are your products for human consumption?",
      a: "No. All products sold by Alpha Peptide are intended for laboratory research purposes only and are not for human consumption or clinical use."
    },
    { q: "What is the intended use of your products?", a: "They are designed strictly for in-vitro testing and laboratory experimentation by qualified professionals." },
    { q: "Do you provide usage or dosage instructions?", a: "No. As these are research chemicals, we cannot provide dosing, reconstitution, or usage advice." },
    { q: "Are your products tested?", a: "Yes, every batch undergoes independent HPLC and Mass Spectrometry testing to verify identity and purity." },
    { q: "How should your products be stored?", a: "Lyophilized peptides should generally be stored in a cool, dark place or refrigerated to maintain stability." },
    { q: "Do you ship internationally?", a: "Please review our shipping policies, as research chemical regulations vary strictly by country." },
    { q: "Are your products legal to purchase?", a: "It is the buyer's responsibility to understand and comply with the regulations and laws governing research chemicals in their specific jurisdiction." }
  ]
};

const categories = Object.keys(faqData);

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default to the first question open

  // Handle Tab Switch
  const handleTabClick = (category: string) => {
    setActiveCategory(category);
    setOpenIndex(0); // Automatically open the first question when switching tabs
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      
      {/* Hero Section */}
      <div className="relative w-full py-10 overflow-hidden bg-black flex flex-col justify-center">
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Heading & Description */}
          <div className="relative z-20">
            <div className="text-[12px] font-medium mb-4 flex items-center gap-2">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <span className="text-[#B98135]">›</span>
              <span className="text-[#B98135]">FAQ</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-wide mb-4 leading-tight">
              Frequently Asked<br className="hidden md:block" /> Questions
            </h1>
            
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Right Hero Logo */}
          <div className="flex justify-center lg:justify-end items-start w-full relative z-20">
            <div className="relative w-full max-w-[200px] md:max-w-[320px] h-[100px] md:h-[160px] lg:h-[200px] opacity-90">
              <Image 
                src="/heroLogo.png" 
                alt="Alpha Peptide Hero Logo" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain object-center lg:object-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-12 py-8 md:py-12">
        
        {/* Adjusted padding classes here: md:pl-14 applies only on desktop/laptop */}
        <div className="max-w-[1200px] mx-auto md:pl-14">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mb-8 md:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTabClick(cat)}
                className={`px-3 py-3 md:px-4 md:py-4 text-[10px] md:text-[11px] font-medium tracking-widest uppercase rounded border transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/5' 
                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          {/* Adjusted padding classes here: removed invalid px-45, restricted pl-12 to md:pl-12 */}
          <div className="space-y-3 mb-12 md:mb-16 md:pr-4 md:pl-12">
            {faqData[activeCategory as keyof typeof faqData].map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-[#B98135] bg-[#080808]' : 'border-white/5 bg-[#050505] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                  >
                    <span className={`text-xs md:text-sm font-medium pr-4 ${isOpen ? 'text-[#B98135]' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-[#B98135] shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-4 md:px-5 pb-4 md:pb-5">
                      <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Support Info Cards */}
          <div className="relative w-full">
            <SupportInfoBar />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}