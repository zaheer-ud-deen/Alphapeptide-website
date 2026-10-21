import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[500px] md:h-[520px] flex items-center bg-black overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlays — lighter than before so the earth glow stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 z-0"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between">

        {/* Left Column */}
        <div className="flex flex-col max-w-[620px] w-full">

          {/* Top Label & Divider */}
          <span className="text-[#B98135] text-[11px] tracking-[0.2em] uppercase font-medium">
            Research Compounds . Canada
          </span>
          <div className="w-12 h-[2px] bg-[#B98135] mt-3 mb-8"></div>

          {/* Headline */}
          <h1 className="text-[38px] md:text-[46px] lg:text-[52px] font-bold leading-[1.08] tracking-normal mb-8 uppercase">
            Transparency.<br />
            Through Testing.
          </h1>

          {/* Checklist */}
          <div className="flex flex-col gap-2.5 text-[12px] md:text-[13px] tracking-[0.1em] font-normal text-gray-200 uppercase">
            <p>
              <span className="text-[#B98135]">No Blind Trust.</span> Verify the data.
            </p>
            <p>Every batch tested and documented.</p>
            <p>
              Every COA <span className="text-[#B98135]">Accessible</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
             <button className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#94590D] to-[#B77D33] hover:from-[#B77D33] hover:to-[#94590D] text-white text-xs font-semibold tracking-[0.15em] rounded-[4px] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer">
  VIEW RESEARCH CATALOG<ArrowUpRight size={15} strokeWidth={2.5} />
</button>

            <button className="w-full sm:w-auto px-7 py-3.5 border border-white/80 hover:bg-white/10 text-white text-xs font-semibold tracking-[0.15em] rounded-[4px] transition-all duration-300 cursor-pointer">
              VIEW BATCH DOCUMENTATION
            </button>
          </div>
        </div>

        {/* Right Column: Logo built to match the mark exactly */}
        <div className="hidden md:block relative w-[280px] h-[420px] lg:w-[250px] lg:h-[250px] self-start mt-8 lg:mt-2 mr-13">
          <Image
            src="/HeroLogo.png"
            alt="Alpha Peptide Logo"
            fill
             
            sizes="(max-width: 1024px) 280px, 380px"
            className="object-contain object-top"
          />
        </div>

      </div>
    </section>
  );
}