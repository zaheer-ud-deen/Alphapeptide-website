import React from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-[900px] w-full mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* Breadcrumb */}
        <div className="text-[11px] font-medium mb-6 flex items-center gap-2">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <span className="text-[#B98135]">›</span>
          <span className="text-[#B98135]">Privacy Policy</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          Privacy <span className="text-[#B98135]">Policy</span>
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-10">Last Updated: October 2026</p>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">1. Overview</h2>
            <p>
              At Alpha Peptide, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or purchase our research compounds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">2. Information We Collect</h2>
            <p>
              When you place an order, create an account, or contact our support team, we may collect personal details such as your name, shipping address, email address, and payment confirmation details. All international transactions and payment gateways are encrypted and tokenized.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">3. Use of Information</h2>
            <p>
              We use the information we collect strictly to fulfill orders, manage batch tracking, provide customer support, and communicate important updates regarding your account or shipments. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white tracking-wide">4. Data Security</h2>
            <p>
              We employ industry-leading SSL encryption and rigorous security protocols to protect your sensitive information during transmission and storage. Access to personal data is restricted exclusively to authorized personnel necessary for fulfillment.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}