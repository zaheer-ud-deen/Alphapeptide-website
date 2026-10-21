import React from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer/Footer';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-[900px] w-full mx-auto px-6 md:px-12 py-16 md:py-24">
        
        <div className="text-[11px] font-medium mb-6 flex items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <span className="text-[#B98135]">›</span>
          <span className="text-[#B98135]">Disclaimer</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          Legal <span className="text-[#B98135]">Disclaimer</span>
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-10">Regulatory Notice & Product Usage</p>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">1. Not for Human Consumption</h2>
            <p>
              The materials sold by Alpha Peptide are strictly restricted to laboratory research use. They are not drugs, foods, dietary supplements, or cosmetics, and must not be used, ingested, or applied in any manner for humans or animals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">2. Regulatory Compliance</h2>
            <p>
              It is the sole responsibility of the purchaser to ensure full compliance with all local, state, federal, and international laws regarding the import, purchase, possession, and use of research compounds within their jurisdiction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">3. No Medical Advice</h2>
            <p>
              Any information provided on this website or accompanying literature is for informational and educational purposes only. It should not be construed as medical, clinical, or professional advice of any kind.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}