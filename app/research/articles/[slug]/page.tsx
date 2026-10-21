import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ArrowUpRight } from 'lucide-react';
import { articleData } from '@/data/articleData'; 
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer/Footer'; 
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = articleData[slug];

  if (!data) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'HOME', href: '/' },
    { label: 'RESEARCH', href: '/research' },
    { label: data.title }
  ];
  // dynamic links of articles
let externalLink = "";

switch (slug) {
  case 'bpc-157': externalLink = "https://www.peptidecenter.org/peptides/bpc-157"; break;
  case 'tb-500': externalLink = "https://www.peptidecenter.org/peptides/bpc-157"; break;
  case 'ghk-cu': externalLink = "https://www.peptidecenter.org/peptides/ghk-cu"; break;
  case '5-amino-1mq': externalLink = "https://www.peptidecenter.org/peptides/5-amino-1mq"; break;
  case 'cjc-1295': externalLink = "https://www.peptidecenter.org/peptides/cjc-1295-with-dac"; break;
  case 'retatrutide': externalLink = "https://www.lilly.com/news/stories/what-to-know-about-retatrutide?utm_source=chatgpt.com"; break;
  case 'tirzepatide': externalLink = "https://health.clevelandclinic.org/tirzepatide-vs-semaglutide?utm_source=chatgpt.com"; break;
  case 'tesamorelin': externalLink = "https://www.peptidecenter.org/peptides/tesamorelin"; break;
  case 'mots-c': externalLink = "https://www.peptidecenter.org/peptides/mots-c"; break;
  case 'ss-31': externalLink = "https://www.peptidecenter.org/peptides/ss-31"; break;
  case 'semax': externalLink = "https://www.peptidecenter.org/peptides/semax"; break;
  case 'selank': externalLink = "https://www.peptidecenter.org/peptides/selank"; break;
  case 'wolverine': externalLink = "https://www.peptidecenter.org/peptides/wolverine-blend"; break;
  case 'klow': externalLink = "https://www.peptidecenter.org/peptides/klow"; break;
  case 'glow': externalLink = "https://www.peptidecenter.org/peptides/glow"; break;
  default: externalLink = "#"; 
}

// ... your page layout code ...

{/**/}
<a 
  href={externalLink} 
  target="_blank"
  rel="noopener noreferrer"
  className="shrink-0 flex items-center gap-4 border border-yellow bg-transparent hover:bg-white/5 transition-all px-8 py-4 rounded-sm text-[11px] md:text-[13px] font-semibold tracking-widest uppercase text-white group"
>
  READ RESEARCH OVERVIEW 
  <ArrowUpRight size={18} className="text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
</a>

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-4 md:pt-2">
      
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 mb-1">
        
        <Breadcrumbs items={breadcrumbItems} />

        <div className="rounded-xl overflow-hidden border border-white/10 flex flex-col">
          
          {/* TOP SECTION: Natural layout that prevents top/bottom cropping */}
         <div className="relative w-full flex flex-col md:flex-row md:h-[400px] bg-[#030303] overflow-hidden">
            
            {/* LEFT AREA: Image + Main Title */}
            <div className="relative flex-1 flex items-center px-8 md:px-20 py-12 md:py-16">
              
              {/* Absolute background image wrapper styled with object-contain to ensure zero cropping */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {data.bgImage && (
                  <Image 
                    src={data.bgImage} 
                    alt={data.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-right md:object-right" 
                     
                  />
                )}
                {/* Gradient overlay to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 flex flex-col items-start max-w-2xl my-auto">
                <div className="border border-[#B98135] text-[#B98135] px-4 py-2 rounded-sm text-xs font-bold tracking-widest uppercase mb-3 bg-black/50">
                  {data.badge}
                </div>

                <h1 className="text-4xl md:text-[50px] font-bold tracking-tight mb-1">
                  {data.title}
                </h1>
                
                <div className="w-[140px] h-[3px] bg-[#B98135] mb-8" />

                {data.subtitle && (
                  <div className="mb-3">
                    <p className="text-lg md:text-[15px] font-light tracking-wide whitespace-pre-line ">
                      {data.subtitle}
                    </p>
                  </div>
                )}

                {data.leftTags && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    {data.leftTags.map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] md:text-[12px] font-light tracking-[0.1em] uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Variation 2: Right Aligned Text layout */}
              {data.rightText && (
                <div className="absolute right-8 bottom-12 flex flex-col items-end text-right z-20">
                  <div className="text-sm md:text-lg tracking-widest leading-relaxed font-medium uppercase">
                    {data.rightText}
                  </div>
                  <div className="w-29 h-[3px] bg-[#B98135] mt-4" />
                </div>
              )}
            </div>

            {/* RIGHT AREA: Dedicated Vertical Text Column */}
            {data.rightHexText && (
              <div className="w-full md:w-[150px] lg:w-[140px] shrink-0 bg-[#060606] border-l border-white/5 flex flex-col justify-center px-6 py-12 z-10">
                <div className="flex flex-col justify-between gap-4">
                  {data.rightHexText.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] md:text-[9px] font-bold tracking-widest uppercase mb-1 text-white">
                        {item.title}
                      </span>
                      <div className="w-8 h-[1px] bg-[#B98135] mb-2" />
                      <p className="text-[6px] md:text-[8px] text-gray-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM SECTION: Action Bar */}
          <div className="w-full bg-[#070707] border-t border-white/10 p-8 md:p-10 flex flex-col z-20">
            <div className="max-w-4xl mb-10 md:mb-12">
              <h3 className="text-xl md:text-[22px] font-bold tracking-wide mb-3">
                {data.footerTitle}
              </h3>
              <p className="text-[13px] md:text-[15px] text-gray-400 font-light leading-relaxed">
                {data.footerDesc}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
              <div className="flex items-center flex-wrap gap-5 text-[11px] md:text-xs font-medium tracking-[0.15em] text-gray-300">
                <div className="flex items-center gap-4">
                  <FileText size={32} strokeWidth={1.5} className="text-white" />
                  <span>{data.publisher}</span>
                </div>
                <div className="w-[1px] h-4 bg-white/20 hidden md:block" />
                <span>{data.resourceType || 'Educational Resource'}</span>
                <div className="w-[1px] h-4 bg-white/20 hidden md:block" />
                <span>{data.year}</span>
              </div>

              <a 
  href={externalLink}
  target="_blank" 
  rel="noopener noreferrer"
  className="shrink-0 flex items-center gap-4 border border-yellow bg-transparent hover:bg-white/5 transition-all px-8 py-4 rounded-sm text-[11px] md:text-[13px] font-semibold tracking-widest uppercase text-white group"
>
  READ RESEARCH OVERVIEW 
  <ArrowUpRight size={18} className="text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}