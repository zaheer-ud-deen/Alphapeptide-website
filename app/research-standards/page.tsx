import React from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer/Footer';

export default function ResearchStandardsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-[900px] w-full mx-auto px-6 md:px-12 py-16 md:py-24">
        
        <div className="text-[11px] font-medium mb-6 flex items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <span className="text-[#B98135]">›</span>
          <span className="text-[#B98135]">Research Standards</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          Research <span className="text-[#B98135]">Standards</span>
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-10">Quality Assurance & Analytical Protocols</p>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">1. Purity Verification (99%+)</h2>
            <p>
              We maintain rigid quality benchmarks across all peptide and compound categories. Every single batch undergoes exhaustive High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry testing to verify a minimum threshold of 99%+ purity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">2. Independent Laboratory Testing</h2>
            <p>
              To ensure absolute impartiality and accuracy, our compounds are tested independently by accredited Canadian analytical laboratories. Certificate of Analysis (COA) documents are permanently archived and matched to individual lot numbers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">3. Batch Traceability</h2>
            <p>
              Every vial is laser-etched with a distinct lot identifier, linking it back directly to its analytical lab report. Researchers can instantly review batch purity documentation via our COA Archive prior to conducting experiments.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}