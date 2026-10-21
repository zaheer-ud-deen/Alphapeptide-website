import React from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer/Footer';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-[900px] w-full mx-auto px-6 md:px-12 py-16 md:py-24">
        
        <div className="text-[11px] font-medium mb-6 flex items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <span className="text-[#B98135]">›</span>
          <span className="text-[#B98135]">Terms & Conditions</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          Terms & <span className="text-[#B98135]">Conditions</span>
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-10">Last Updated: October 2026</p>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">1. Agreement to Terms</h2>
            <p>
              By accessing and placing an order through Alpha Peptide, you agree to be bound by these Terms and Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">2. Research Use Only</h2>
            <p>
              All products sold on this website are strictly intended for laboratory research, in-vitro testing, and analytical experimentation only. They are expressly not for human consumption, clinical use, diagnostic procedures, or therapeutic application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">3. Purchaser Qualifications</h2>
            <p>
              Purchasers warrant that they are qualified researchers, affiliated with accredited laboratories, universities, or institutions, and that they possess the proper training and equipment to safely handle research compounds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">4. Limitation of Liability</h2>
            <p>
              In no event shall Alpha Peptide or its affiliates be liable for any direct, indirect, incidental, or consequential damages arising out of the misuse or handling of products purchased through our platform.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}