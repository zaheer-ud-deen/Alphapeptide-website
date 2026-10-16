import Image from 'next/image';
import { FlaskConical, FileText, Leaf, ShieldCheck, Truck, Headset, ArrowUpRight } from 'lucide-react';

export default function TrustSection() {
  const trustCards = [
    {
      icon: <FlaskConical size={20} className="text-black" strokeWidth={1.75} />,
      title: 'INDEPENDENT LAB TESTED',
      description: 'Every batch independently verified by HPLC-UV at an accredited Canadian laboratory.',
    },
    {
      icon: <FileText size={20} className="text-black" strokeWidth={1.75} />,
      title: 'COA ON EVERY ORDER',
      description: 'Certificate of Analysis included with every product and every batch we ship.',
    },
    {
      icon: <Leaf size={20} className="text-black" strokeWidth={1.75} />,
      title: 'CANADIAN SUPPLIER',
      description: 'Proudly Canadian. Ships next business day with full tracking to every province.',
    },
    {
      icon: <ShieldCheck size={20} className="text-black" strokeWidth={1.75} />,
      title: 'BATCH TRACEABILITY',
      description: 'Batch specific labels with QR code for complete transparency and traceability.',
    },
    {
      icon: <Truck size={20} className="text-black" strokeWidth={1.75} />,
      title: 'SAME-DAY SHIPPING',
      description: 'Mon - Fri: Orders placed before 1pm EST ship the same business day.',
    },
  ];

  return (
    <section className="w-full bg-[#030303] py-16 md:py-20 px-4 md:px-10 flex flex-col items-center border-t border-white/5">

      {/* 1. Top Banner / Header Content */}
<div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 mb-10 pt-2">

  {/* Left Side: Typography */}
  <div className="flex flex-col max-w-[480px] w-full pt-1 flex-shrink-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[1px] bg-[#B98135]"></div>
      <span className="text-[#B98135] text-[11px] font-medium tracking-widest uppercase">
        Why Alpha Peptide
      </span>
    </div>

    <h2 className="text-[30px] md:text-[34px] font-bold tracking-tight text-white mb-6 leading-[1.15] whitespace-nowrap">
      BUILT ON TRUST.<br />
      DELIVERED WITH PRECISION.
    </h2>

    <p className="text-gray-300 text-sm leading-relaxed mb-1.5">
      Premium compounds are only part of the equation.
    </p>
    <p className="text-gray-400 text-xs leading-relaxed">
      Fast fulfillment, responsive support, and transparent quality standards are delivered into every order.
    </p>
  </div>

  {/* Right Side: Laboratory / Vials Image */}
<div className="relative w-full lg:flex-1 h-[220px] md:h-[250px] lg:h-[260px] rounded-lg overflow-hidden">
  <Image
    src="/whyusbg.png"
    alt="Lab Vials and Equipment"
    sizes="(max-width: 768px) 100vw, 33vw"
    fill
    className="object-cover"
  />
</div>

</div>

      {/* 2. Bottom 5-Column Grid */}
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {trustCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col p-5 rounded-lg border border-white/10 bg-[#0a0a0a] hover:border-[#B98135] transition-all duration-300 group"
          >
            {/* Icon Box - solid amber fill */}
            <div className="w-9 h-9 rounded-[6px] bg-gradient-to-br from-[#D9A552] to-[#B98135] flex items-center justify-center mb-5">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-white text-[13px] font-semibold tracking-wider mb-2.5">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-[11px] font-light leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Bottom Support Bar */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg border border-white/10 bg-[#0a0a0a] px-6 md:px-8 py-5">

        {/* Left: Responsive Support */}
        <div className="flex items-center gap-3">
          <Headset size={30} className="text-[#fff]" strokeWidth={1.75} />
          <span className="text-[#B98135] text-sm font-semibold tracking-widest uppercase">
            Responsive Support
          </span>
        </div>

        {/* Middle: Phone */}
        <div className="flex flex-col items-center text-center">
          <span className="text-gray-400 text-xs mb-1">Questions answered by real people</span>
          <span className="text-[#B98135] text-sm font-medium tracking-wide">
            365-PEPTIDE [365-737-8344]
          </span>
        </div>

        {/* Right: CTA */}
        <button className="px-6 py-2.5 border border-[#B98135]/60 hover:bg-[#B98135]/10 text-white text-xs font-medium tracking-[0.15em] rounded-[4px] flex items-center gap-2 transition-all duration-300 uppercase cursor-pointer">
          View Lab Results <ArrowUpRight size={15} strokeWidth={2.5} />
        </button>

      </div>

    </section>
  );
}