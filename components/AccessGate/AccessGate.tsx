'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, FileText} from 'lucide-react';

export default function AccessGate() {
  const router = useRouter();

  const handleEnterSite = () => {
    router.push('/home');
  };

  return (
    // h-[100dvh] ensures it perfectly fits the screen height, even on mobile browsers with URL bars
    // overflow-hidden prevents any scrolling
    <div className="h-[100dvh] w-full relative flex flex-col items-center justify-center text-white px-4 bg-black overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/EarthBgImage.png"
        alt="Earth Background"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
         
        className="object-cover object-center z-0"
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main Content Container - Flex is used to control spacing vertically */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full h-full justify-center">

        {/* Logo Section */}
        <div className="mb-4 md:mb-6 flex flex-col items-center">
          {/* Note: Adjust width and height values if your logo looks too small or big */}
          <div className="relative w-40 h-32 md:w-40 md:h-29 mb-2 md:mb-4">
             <Image
              src="/mainLogoTrasperent.png"
              alt="Alpha Peptide Logo"
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
               
              className="object-contain"
            />
          </div>
          <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] uppercase">
            Research Use Only • 19+
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-semibold tracking-wide mb-4 md:mb-6">
          CONFIRM YOUR ACCESS
        </h1>

        {/* Disclaimer Text - Adjusted text sizes for mobile to prevent overflow */}
        <div className="text-xs md:text-sm text-gray-300 space-y-2 md:space-y-4 mb-6 md:mb-10 font-light leading-relaxed px-2">
          <p>
            You must be of legal age in your province and a qualified research professional.<br className="hidden md:block" />
            All products are for in vitro laboratory research only not for human or animal consumption.
          </p>
          <p>
            By entering you confirm you are 19+ and accessing this site in a qualified research capacity.<br className="hidden md:block" />
            Products are not intended for personal, therapeutic, or clinical use.
          </p>
        </div>

            {/* Action Button with Subtle Cut Corners & Gradient Border */}
        <div 
          className="mb-8 md:mb-14 p-[1px] bg-gradient-to-r from-[#403d36] via-[#A08455] to-[#F0D9A8] hover:scale-105 transition-transform duration-300"
          style={{
            // Reduced to 6px for a sharper, subtler corner
            clipPath: 'polygon(6px 0px, calc(100% - 6px) 0px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0px calc(100% - 6px), 0px 6px)'
          }}
        >
          <button
            onClick={handleEnterSite}
            className="px-12 py-3 md:px-16 md:py-4 bg-gradient-to-b from-[#081A2B] to-[#0A0A0B] text-[#F5E6C8] text-xs md:text-sm tracking-[0.2em] uppercase font-medium w-full h-full flex items-center justify-center cursor-pointer"
            style={{
              // Reduced to 5px to match the outer border padding perfectly
              clipPath: 'polygon(5px 0px, calc(100% - 5px) 0px, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0px calc(100% - 5px), 0px 5px)'
            }}
          >
            I Agree & Enter Site
          </button>
        </div>

           {/* Footer Badges */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-12 text-[10px] md:text-xs tracking-widest text-gray-400 uppercase">
          
          <div className="flex items-center gap-2">
            <Image 
              src="/redleaf.png"
              alt="Canadian Flag"
              width={20}
              height={20}
               
              className="object-contain w-4 h-4 md:w-5 md:h-5"
            />
            <span>Canadian</span>
          </div>
          
          {/* Separator Line */}
          <div className="hidden sm:block w-[1px] h-4 bg-gray-600"></div>
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
            <span>Third-Party Tested</span>
          </div>
          
          {/* Separator Line */}
          <div className="hidden sm:block w-[1px] h-4 bg-gray-600"></div>

          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 md:w-5 md:h-5" />
            <span>COA Available</span>
          </div>
          
        </div>

      </div>
    </div>
  );
}