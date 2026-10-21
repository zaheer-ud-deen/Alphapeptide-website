'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  ArrowUpRight, 
  ArrowRight,
  Crosshair, 
  BarChart2, 
  RefreshCw, 
  ShoppingCart,
  Minus,
  Plus,
  FileText,
  List,
  Info,
  Box,
  Clock,
  Microscope,
  XCircle,
  GraduationCap,
  ClipboardList,
  Truck,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
  Plus as PlusIcon
} from 'lucide-react';

import Footer from '../../../../components/Footer/Footer'; 
import { useCart } from '../../../../context/CartContext';

// Categories matching ShopHero design
export const categories = [
  { id: 'all', label: 'All Products', iconSrc: '/tabi6.png' },
  { id: 'core-metabolic', label: 'Core Metabolic', iconSrc: '/tabi1.png' },
  { id: 'endocrine-growth', label: 'Endocrine & Growth', iconSrc: '/tabi2.png' },
  { id: 'metabolic-immunity', label: 'Metabolic Immunity', iconSrc: '/tabi3.png' },
  { id: 'longevity-regeneration', label: 'Longevity & Regeneration', iconSrc: '/tabi4.png' },
  { id: 'neuro-cognitive', label: 'Neuro Cognitive', iconSrc: '/tabi5.png' },
  { id: 'stacks', label: 'Stacks', iconSrc: '/tabi6.png' },
  { id: 'accessories', label: 'Accessories', iconSrc: '/tabi7.png' },
];

// --- Research Use Only expanded content (static for all products) ---
const researchPointsLeft: any[] = [
  {
    icon: Microscope,
    title: 'Non-clinical research only',
    text: 'For laboratory research, analytical reference and assay development.',
  },
  {
    icon: XCircle,
    title: 'No human or animal use',
    text: 'Not for consumption or any clinical, therapeutic, diagnostic, cosmetic, food, supplement or veterinary purpose.',
  },
  {
    icon: GraduationCap,
    title: 'Qualified personnel and facilities',
    text: 'Use only by trained personnel in suitably equipped research facilities.',
  },
];

const researchPointsRight: any[] = [
  {
    icon: ClipboardList,
    title: 'No health or treatment claims',
    text: 'Must not be represented as intended to diagnose, treat, mitigate, cure or prevent any disease or medical condition, or as authorized or approved by Health Canada.',
  },
  {
    icon: ShieldCheck,
    title: 'Purchaser responsibility',
    text: 'Purchasers are responsible for ensuring compliance with all applicable laws, regulations, institutional requirements and laboratory safety procedures.',
  },
  {
    badge: '21+',
    title: 'Age restriction',
    text: 'Purchasers must be 21 years of age or older.',
  },
];

// Change these links to your real pages
const policyLinks = [
  { label: 'Terms & Conditions', href: '/terms-and-conditions', icon: FileText },
  { label: 'Shipping & Returns', href: '/shipping-returns', icon: Truck },
  { label: 'Refund Policy', href: '/refund-policy', icon: FileText },
];

function ResearchPoint({ point }: { point: any }) {
  const Icon = point.icon;
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 flex-shrink-0 flex justify-center pt-0.5">
        {point.badge ? (
          <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
            {point.badge}
          </div>
        ) : (
          <Icon size={34} strokeWidth={1.4} className="text-white" />
        )}
      </div>
      <div>
        <h5 className="text-white text-sm font-medium mb-1">{point.title}</h5>
        <p className="text-gray-400 text-xs leading-relaxed">{point.text}</p>
      </div>
    </div>
  );
}

// Product database dictionary for your compounds
const productsData: Record<string, any> = {
  'retatrutide': {
    name: 'RETATRUTIDE',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'CORE METABOLIC RESEARCH',
    categorySlug: 'core-metabolic',
    description: 'Retatrutide is a next-generation, investigational triple agonist targeting GLP-1, GIP, and glucagon receptors, supporting appetite regulation, lean mass preservation, and metabolic efficiency.',
    image: '/detailed1.png',
    strength: '20MG',
    purity: '20MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$256.50', numericPrice: 256.50 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$382.50', numericPrice: 382.50 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$720.00', numericPrice: 720.00 },
    ],
    isComingSoon: false,
    related: [
      { name: '5-AMINO-1MQ', slug: '5-amino-1mq', categorySlug: 'core-metabolic', subtitle: '10MG | 99% Purity', image: '/p13.png' },
      { name: 'TIRZEPATIDE', slug: 'tirzepatide', categorySlug: 'core-metabolic', subtitle: '30MG | 99% Purity', image: '/p14.png' }
    ]
  },
  '5-amino-1mq': {
    name: '5-AMINO-1MQ',
    tagline: 'NNMT PRECURSOR',
    categoryLabel: 'CORE METABOLIC RESEARCH',
    categorySlug: 'core-metabolic',
    description: '5-Amino-1MQ is a novel NNMT precursor research compound studied for its potential to support cellular energy, mitochondrial function, and metabolic health.',
    image: '/detailed2.png',
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '3 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
    ],
    isComingSoon: true,
    related: [
      { name: 'RETATRUTIDE', slug: 'retatrutide', categorySlug: 'core-metabolic', subtitle: '20MG | 99% Purity', image: '/detailed1.png' },
      { name: 'TIRZEPATIDE', slug: 'tirzepatide', categorySlug: 'core-metabolic', subtitle: '30MG | 99% Purity', image: '/p14.png' }
    ]
  },
  'tirzepatide': {
    name: 'TIRZEPATIDE',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'CORE METABOLIC RESEARCH',
    categorySlug: 'core-metabolic',
    description: 'Tirzepatide is a next-generation, investigational dual GIP/GLP-1 receptor agonist, studied for its potential to support glycemic control, appetite regulation, and metabolic health.',
    image: '/detailed3.png',
    strength: '30MG',
    purity: '30MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '3 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '5 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '10 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
    ],
    isComingSoon: true,
    related: [
      { name: 'Retatrutide', slug: 'retatrutide', categorySlug: 'core-metabolic', subtitle: 'CORE METABOLIC RESEARCH\n20MG | 99% Purity', image: '/detailed1.png' },
      { name: '5-AMINO-1MQ', slug: '5-amino-1mq', categorySlug: 'core-metabolic', subtitle: 'CORE METABOLIC RESEARCH\n10MG | 99% Purity', image: '/p13.png' }
    ]
  },
  'tesamorelin': {
    name: 'TESAMORELIN',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ENDOCRINE & GROWTH RESEARCH',
    categorySlug: 'endocrine-growth',
    description: 'Tesamorelin is a GHRH analog that stimulates the body\'s natural release of growth hormone to support visceral fat reduction, lean body composition, metabolic health, and overall vitality.',
    image: '/12121212.png',
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$200.00', numericPrice: 200.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$300.00', numericPrice: 300.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$580.00', numericPrice: 580.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'CJC-1295 w/DAC', slug: 'cjc-1295-w-dac', categorySlug: 'endocrine-growth', subtitle: '5MG | 99% Purity', image: '/p15.png' },
      { name: 'RETATRUTIDE', slug: 'retatrutide', categorySlug: 'core-metabolic', subtitle: '20MG | 99% Purity', image: '/detailed1.png' }
    ]
  },
  'cjc-1295-w-dac': {
    name: 'CJC-1295 w/DAC',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ENDOCRINE & GROWTH RESEARCH',
    categorySlug: 'endocrine-growth',
    description: 'CJC-1295 with DAC is a long-acting growth hormone releasing hormone (GHRH)-analog designed to stimulate the body\'s natural release of growth hormone, supporting lean body composition, recovery, and overall vitality.',
    image: '/12321233.png',
    strength: '5MG',
    purity: '5MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '3 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '5 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '10 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
    ],
    isComingSoon: true,
    related: [
      { name: 'TESAMORELIN', slug: 'tesamorelin', categorySlug: 'endocrine-growth', subtitle: '10MG | 99% Purity', image: '/p2.png' },
      { name: '5-AMINO-1MQ', slug: '5-amino-1mq', categorySlug: 'core-metabolic', subtitle: '10MG | 99% Purity', image: '/p13.png' }
    ]
  },
  'ss-31': {
    name: 'SS-31',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'METABOLIC IMMUNITY RESEARCH',
    categorySlug: 'metabolic-immunity',
    description: 'SS-31 is a novel mitochondrial-targeted research compound studied for its potential to support mitochondrial function, reduce oxidative stress, and optimize metabolic and immune health.',
    image: '/33428534.png', 
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$85.00', numericPrice: 85.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$240.00', numericPrice: 240.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$375.00', numericPrice: 375.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$700.00', numericPrice: 700.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'MOTS-c', slug: 'mots-c', categorySlug: 'metabolic-immunity', subtitle: '10MG | 99% Purity', image: '/p9.png' },
      { name: 'RETATRUTIDE', slug: 'retatrutide', categorySlug: 'core-metabolic', subtitle: '20MG | 99% Purity', image: '/detailed1.png' }
    ]
  },
  'mots-c': {
    name: 'MOTS-c',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'METABOLIC IMMUNITY RESEARCH',
    categorySlug: 'metabolic-immunity',
    description: 'MOTS-c is a mitochondrial-derived peptide studied for its potential to support metabolic homeostasis, insulin sensitivity, energy balance, and cellular stress resistance.',
    image: '/p9.png', 
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'SS-31', slug: 'ss-31', categorySlug: 'metabolic-immunity', subtitle: '10MG | 99% Purity', image: '/p3.png' },
      { name: 'TESAMORELIN', slug: 'tesamorelin', categorySlug: 'endocrine-growth', subtitle: '10MG | 99% Purity', image: '/p2.png' }
    ]
  },
  'bpc-157': {
    name: 'BPC-157',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'LONGEVITY & REGENERATION',
    categorySlug: 'longevity-regeneration',
    description: 'BPC-157 is a pentadecapeptide studied for its potential to support tissue repair, gut health, inflammation reduction, and overall cellular recovery.',
    image: '/bpc157.png', 
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'TB-500', slug: 'tb-500', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p7.png' },
      { name: 'GHK-Cu', slug: 'ghk-cu', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p6.png' }
    ]
  },
  'tb-500': {
    name: 'TB-500',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'LONGEVITY & REGENERATION',
    categorySlug: 'longevity-regeneration',
    description: 'TB-500 is a synthetic fraction of Thymosin Beta-4, researched for its role in cellular migration, tissue repair, and down-regulation of inflammatory markers.',
    image: '/tb500.png',
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'BPC-157', slug: 'bpc-157', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p11.png' },
      { name: 'GHK-Cu', slug: 'ghk-cu', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p6.png' }
    ]
  },
  'ghk-cu': {
    name: 'GHK-Cu',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'LONGEVITY & REGENERATION',
    categorySlug: 'longevity-regeneration',
    description: 'GHK-Cu is a naturally occurring copper complex studied for its potential in tissue remodeling, antioxidant activation, and stimulation of collagen synthesis.',
    image: '/ghkcu.png', 
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'BPC-157', slug: 'bpc-157', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p11.png' },
      { name: 'TB-500', slug: 'tb-500', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p7.png' }
    ]
  },
  'semax': {
    name: 'SEMAX',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'NEURO COGNITIVE RESEARCH',
    categorySlug: 'neuro-cognitive',
    description: 'Semax is a synthetic peptide originally developed for its potential to support cognitive function, focus, and neuroprotection.',
    image: '/semax.png',
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '3 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '5 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '10 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
    ],
    isComingSoon: true,
    related: [
      { name: 'SELANK', slug: 'selank', categorySlug: 'neuro-cognitive', subtitle: '10MG | 99% Purity', image: '/p12.png' },
      { name: 'GHK-Cu', slug: 'ghk-cu', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p6.png' }
    ]
  },
'selank': {
    name: 'SELANK',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'NEURO COGNITIVE RESEARCH',
    categorySlug: 'neuro-cognitive',
    description: 'Selank is a synthetic regulatory peptide studied for its potential anxiolytic properties, supporting emotional balance, and cognitive function.',
    image: '/selank.png', 
    strength: '10MG',
    purity: '10MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '3 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '5 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
      { label: '10 PACK', subtitle: 'COMING SOON', price: '$0.00', numericPrice: 0.00 },
    ],
    isComingSoon: true,
    related: [
      { name: 'SEMAX', slug: 'semax', categorySlug: 'neuro-cognitive', subtitle: '10MG | 99% Purity', image: '/p16.png' },
      { name: 'BPC-157', slug: 'bpc-157', categorySlug: 'longevity-regeneration', subtitle: '10MG | 99% Purity', image: '/p11.png' }
    ]
  },
  'glow': {
    name: 'GLOW',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'STACK RESEARCH',
    categorySlug: 'stacks',
    description: 'GLOW is a synergistic peptide stack designed for aesthetic research, formulated to support cellular regeneration and overall vitality.',
    image: '/glow.png', 
    strength: '70MG',
    purity: '70MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'KLOW', slug: 'klow', categorySlug: 'stacks', subtitle: '80MG | 99% Purity', image: '/p8.png' },
      { name: 'WOLVERINE', slug: 'wolverine', categorySlug: 'stacks', subtitle: '20MG | 99% Purity', image: '/p5.png' }
    ]
  },
  'klow': {
    name: 'KLOW',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'STACK RESEARCH',
    categorySlug: 'stacks',
    description: 'KLOW is an advanced peptide stack researched for its potential to support metabolic efficiency, energy balance, and lean mass optimization.',
    image: '/klow.png', 
    strength: '80MG',
    purity: '80MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$90.00', numericPrice: 90.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$255.00', numericPrice: 255.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$400.00', numericPrice: 400.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$750.00', numericPrice: 750.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'GLOW', slug: 'glow', categorySlug: 'stacks', subtitle: '70MG | 99% Purity', image: '/p10.png' },
      { name: 'WOLVERINE', slug: 'wolverine', categorySlug: 'stacks', subtitle: '20MG | 99% Purity', image: '/p5.png' }
    ]
  },
  'wolverine': {
    name: 'WOLVERINE',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'STACK RESEARCH',
    categorySlug: 'stacks',
    description: 'WOLVERINE is a potent stack combining tissue-repairing compounds to comprehensively support cellular recovery, inflammation reduction, and healing.',
    image: '/2341233fe.png', 
    strength: '20MG',
    purity: '20MG | 99% Purity',
    packSizes: [
      { label: '1 VIAL', price: '$110.00', numericPrice: 110.00 },
      { label: '3 PACK', subtitle: 'Per Vial', price: '$315.00', numericPrice: 315.00 },
      { label: '5 PACK', subtitle: 'Per Vial', price: '$500.00', numericPrice: 500.00 },
      { label: '10 PACK', subtitle: 'Per Vial', price: '$950.00', numericPrice: 950.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'GLOW', slug: 'glow', categorySlug: 'stacks', subtitle: '70MG | 99% Purity', image: '/p10.png' },
      { name: 'KLOW', slug: 'klow', categorySlug: 'stacks', subtitle: '80MG | 99% Purity', image: '/p8.png' }
    ]
  },
  'bac-water': {
    name: 'BACTERIOSTATIC WATER',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ACCESSORIES',
    categorySlug: 'accessories',
    description: 'Bacteriostatic water for injection containing 0.9% benzyl alcohol added as a bacteriostatic preservative.',
    image: '/water-base.png', 
    strength: '30ML',
    purity: 'RESEARCH USE ONLY',
    packSizes: [
      { label: '1 VIAL', price: '$15.00', numericPrice: 15.00 },
      { label: '3 PACK', price: '$40.00', numericPrice: 40.00 },
      { label: '5 PACK', price: '$65.00', numericPrice: 65.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'SYRINGES', slug: 'syringes', categorySlug: 'accessories', subtitle: '100 PACK', image: '/syringes.png' },
      { name: 'PREP PADS', slug: 'prep-pads', categorySlug: 'accessories', subtitle: '100 PACK', image: '/prep-pads.png' }
    ]
  },
  'syringes': {
    name: 'SYRINGES',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ACCESSORIES',
    categorySlug: 'accessories',
    description: 'High-quality, sterile syringes for precise measurement and administration of research compounds.',
    image: '/injection.jpeg', 
    strength: '1ML',
    purity: 'STERILE',
    packSizes: [
      { label: '100 PACK', price: '$15.00', numericPrice: 15.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'BACTERIOSTATIC WATER', slug: 'bac-water', categorySlug: 'accessories', subtitle: '30ML', image: '/p4.png' },
      { name: 'PREP PADS', slug: 'prep-pads', categorySlug: 'accessories', subtitle: '100 PACK', image: '/prep-pads.png' }
    ]
  },
  'prep-pads': {
    name: 'PREP PADS',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ACCESSORIES',
    categorySlug: 'accessories',
    description: 'Individually wrapped, sterile alcohol prep pads for surface and vial sterilization.',
    image: '/sachet.jpeg', 
    strength: '70%',
    purity: 'ISOPROPYL ALCOHOL',
    packSizes: [
      { label: '100 PACK', price: '$5.00', numericPrice: 5.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'SYRINGES', slug: 'syringes', categorySlug: 'accessories', subtitle: '100 PACK', image: '/syringes.png' },
      { name: 'VIAL CAPS', slug: 'vial-caps', categorySlug: 'accessories', subtitle: 'VARIOUS COLORS', image: '/vial-caps.png' }
    ]
  },
  'vial-caps': {
    name: 'VIAL CAPS',
    tagline: 'RESEARCH COMPOUND',
    categoryLabel: 'ACCESSORIES',
    categorySlug: 'accessories',
    description: 'Protective snap-off caps for research vials, available in multiple colors for easy categorization.',
    image: '/redwhite .jpeg', 
    strength: '20MM',
    purity: 'ALUMINUM/PLASTIC',
    packSizes: [
      { label: '10 PACK', price: '$2.00', numericPrice: 2.00 },
    ],
    isComingSoon: false,
    related: [
      { name: 'BACTERIOSTATIC WATER', slug: 'bac-water', categorySlug: 'accessories', subtitle: '30ML', image: '/p4.png' },
      { name: 'PREP PADS', slug: 'prep-pads', categorySlug: 'accessories', subtitle: '100 PACK', image: '/prep-pads.png' }
    ]
  }
};
export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  
  // Dynamically grab which product slug is in the URL (e.g., retatrutide, 5-amino-1mq, tirzepatide)
  const productSlug = (params?.product as string) || 'retatrutide';
  const product = productsData[productSlug] || productsData['retatrutide'];

  const [activeCategory, setActiveCategory] = useState(product.categorySlug);
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState(product.packSizes[0].label);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { addToCart } = useCart();
  const activePack = product.packSizes.find((p: any) => p.label === selectedPack) || product.packSizes[0];

  // Other accordion cards (Research Use Only is handled separately below)
  const otherAccordions = [
    {
      id: 'batch',
      icon: List,
      title: 'BATCH DOCUMENTATION',
      content: 'Batch-specific documentation, including third-party certificates of analysis (COA) and HPLC purity reports, is available for each production lot.',
    },
    {
      id: 'description',
      icon: Info,
      title: 'PRODUCT INFORMATION',
      content: product.description,
    },
    {
      id: 'storage',
      icon: Box,
      title: 'STORAGE & HANDLING DOCUMENTATION',
      content: 'Store lyophilized product in a cool, dry place away from direct light, with the vial tightly sealed. Refer to the batch documentation for lot-specific storage guidance.',
    },
  ];

  const isResearchOpen = openAccordion === 'research';

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    if (id === 'all') {
      router.push('/research-catalog');
    } else {
      router.push(`/research-catalog/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col font-sans">
      <main className="flex-grow">
        
        {/* --- TOP SECTION & HERO BACKGROUND --- */}
        <div className="relative w-full pb-20">
          <div className="absolute inset-0 z-0 h-full">
            <Image
              // Dynamic background logic for all three categories   
              src={
                product.categorySlug === 'metabolic-immunity' ? '/bgimage2221212.png' :
                product.categorySlug === 'longevity-regeneration' ? '/123237432434.png' :
                product.categorySlug === 'endocrine-growth' ? '/endocronicbg.png' :
                product.categorySlug === 'neuro-cognitive' ? '/24352342352.png' : 
                product.categorySlug === 'stacks' ? '/12343323213.png' :
                product.categorySlug === 'accessories' ? '/123423423423.png' :
                
                '/shopdetailed.jpeg' // Default Core Metabolic background
              }
              alt="Category Background"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
               
              className="object-cover object-center opacity-85"
            />
            
          </div>

          <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-10">
            
            {/* Breadcrumbs */}
            <div className="text-[11px] text-gray-400 flex items-center gap-2 mb-6 uppercase tracking-widest font-medium">
              <Link href="/" className="hover:text-[#B98135] transition-colors cursor-pointer">Home</Link>
              <span className="text-gray-600">›</span>
              <Link href="/research-catalog" className="hover:text-[#B98135] transition-colors cursor-pointer">Research Catalog</Link>
              <span className="text-gray-600">›</span>
              <Link href={`/research-catalog/${product.categorySlug}`} className="hover:text-[#B98135] transition-colors cursor-pointer">Core Metabolic</Link>
              <span className="text-gray-600">›</span>
              <span className="text-[#B98135]">{product.name}</span>
            </div>

            {/* Title & Description */}
            <div className="max-w-xl mb-8">
            </div>

            {/* Sub-Compounds Tabs */}
            <div className="mb-8">
              <h3 className="text-[#B98135] text-[10px] uppercase tracking-widest font-bold mb-3">
                {product.categorySlug === 'core-metabolic' ? 'CORE METABOLIC' : 
                 product.categorySlug === 'endocrine-growth' ? 'ENDOCRINE & GROWTH COMPOUNDS' : 
                 product.categorySlug === 'metabolic-immunity' ? 'METABOLIC IMMUNITY COMPOUNDS' :
                 product.categorySlug === 'longevity-regeneration' ? 'LONGEVITY & REGENERATION COMPOUNDS' :
                 product.categorySlug === 'neuro-cognitive' ? 'NEURO COGNITIVE COMPOUNDS' :
                 product.categorySlug === 'stacks' ? 'STACK RESEARCH COMPOUNDS' :
                 'ACCESSORIES'}
              </h3>
              
              {product.categorySlug === 'core-metabolic' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/core-metabolic/retatrutide" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'retatrutide' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    RETATRUTIDE
                  </Link>
                  <Link href="/research-catalog/core-metabolic/5-amino-1mq" className={`flex flex-col items-center justify-center px-6 py-1.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === '5-amino-1mq' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    <span>5-AMINO-1MQ</span>
                    <span className="text-[7px] text-gray-500">COMING SOON</span>
                  </Link>
                  <Link href="/research-catalog/core-metabolic/tirzepatide" className={`flex flex-col items-center justify-center px-6 py-1.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'tirzepatide' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    <span>TIRZEPATIDE</span>
                    <span className="text-[7px] text-gray-500">COMING SOON</span>
                  </Link>
                </div>
              ) : product.categorySlug === 'endocrine-growth' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/endocrine-growth/cjc-1295-w-dac" className={`flex flex-col items-center justify-center px-6 py-1.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'cjc-1295-w-dac' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    <span>CJC-1295 w/DAC</span>
                    <span className="text-[7px] text-gray-500">COMING SOON</span>
                  </Link>
                  <Link href="/research-catalog/endocrine-growth/tesamorelin" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'tesamorelin' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    TESAMORELIN
                  </Link>
                </div>
              ) : product.categorySlug === 'metabolic-immunity' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/metabolic-immunity/ss-31" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'ss-31' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    SS-31
                  </Link>
                  <Link href="/research-catalog/metabolic-immunity/mots-c" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'mots-c' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    MOTS-c
                  </Link>
                </div>
              ) : product.categorySlug === 'longevity-regeneration' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/longevity-regeneration/bpc-157" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'bpc-157' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    BPC-157
                  </Link>
                  <Link href="/research-catalog/longevity-regeneration/tb-500" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'tb-500' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    TB-500
                  </Link>
                  <Link href="/research-catalog/longevity-regeneration/ghk-cu" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'ghk-cu' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    GHK-Cu
                  </Link>
                </div>
              ) : product.categorySlug === 'neuro-cognitive' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/neuro-cognitive/semax" className={`flex flex-col items-center justify-center px-6 py-1.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'semax' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    <span>SEMAX</span>
                    <span className="text-[7px] text-gray-500">COMING SOON</span>
                  </Link>
                  <Link href="/research-catalog/neuro-cognitive/selank" className={`flex flex-col items-center justify-center px-6 py-1.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'selank' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    <span>SELANK</span>
                    <span className="text-[7px] text-gray-500">COMING SOON</span>
                  </Link>
                </div>
              ) : product.categorySlug === 'stacks' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/stacks/glow" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'glow' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    GLOW
                  </Link>
                  <Link href="/research-catalog/stacks/klow" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'klow' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    KLOW
                  </Link>
                  <Link href="/research-catalog/stacks/wolverine" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'wolverine' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    WOLVERINE
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/research-catalog/accessories/bac-water" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'bac-water' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    BACTERIOSTATIC WATER
                  </Link>
                  <Link href="/research-catalog/accessories/syringes" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'syringes' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    SYRINGES
                  </Link>
                  <Link href="/research-catalog/accessories/prep-pads" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'prep-pads' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    PREP PADS
                  </Link>
                  <Link href="/research-catalog/accessories/vial-caps" className={`px-6 py-2.5 border text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${productSlug === 'vial-caps' ? 'border-[#B98135] text-[#B98135] bg-[#B98135]/10' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                    VIAL CAPS
                  </Link>
                </div>
              )}
            </div>

            {/* Product Hero Info & Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3 uppercase">{product.name}</h1>
                <p className="text-[#B98135] text-[11px] uppercase tracking-widest font-bold mb-6">{product.tagline}</p>
                
                <button className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded text-gray-300 text-[10px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors cursor-pointer">
                  VIEW BATCH DOCUMENTATION <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Right Image */}
              <div className="relative w-full h-[280px] md:h-[420px] flex items-center justify-center pb-12 -mt-40">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain drop-shadow-2xl z-10"
                />
              </div>
            </div>

          </div>
        </div>

        {/* --- PURCHASE ACTION BAR --- */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 -mt-10 mb-12">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-2xl">
            
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {/* Strength */}
              <div className="flex flex-col gap-3">
                <span className="text-white text-xs font-medium">Strength</span>
                <button className="px-6 py-2.5 bg-[#94590D] text-white text-[11px] font-bold tracking-widest rounded shadow-[0_0_15px_rgba(185,129,53,0.3)] cursor-pointer">
                  {product.strength}
                </button>
              </div>

              <div className="hidden md:block w-px h-12 bg-white/10"></div>

              {/* Pack Size */}
              <div className="flex flex-col gap-3">
                <span className="text-white text-xs font-medium">Pack Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.packSizes.map((pack: any) => (
                    <button 
                      key={pack.label}
                      onClick={() => !product.isComingSoon && setSelectedPack(pack.label)}
                      className={`flex flex-col items-center justify-center px-4 py-2 min-w-[90px] rounded transition-all border ${
                        selectedPack === pack.label 
                          ? 'bg-[#94590D] border-[#B98135] text-white' 
                          : 'bg-transparent border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-widest">{pack.label}</span>
                      <span className="text-[8px] text-gray-400">{pack.subtitle}</span>
                      <span className="text-[11px] font-bold mt-0.5">{pack.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Actions (Quantity & Cart / Coming Soon) */}
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              {!product.isComingSoon ? (
                <>
                  <div className="flex items-center border border-white/10 rounded h-12">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-white text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* UPDATED ADD TO CART BUTTON WITH TOAST NOTIFICATION */}
                  <button 
                    onClick={() => {
                      addToCart({ name: `${product.name} ${product.strength}`, price: activePack.numericPrice, image: product.image });
                      toast.success(`${product.name} added to cart!`, {
                        position: "top-right",
                        theme: "dark",
                      });
                    }}
                    className="flex-grow xl:flex-grow-0 flex items-center justify-center gap-3 px-10 h-12 bg-[#B98135] text-black text-[11px] font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(185,129,53,0.2)] hover:bg-[#c99145] transition-colors cursor-pointer"
                  >
                    <ShoppingCart size={16} /> ADD TO CART
                  </button>
                </>
              ) : (
                <button disabled className="w-full xl:w-auto px-12 h-12 bg-white/5 border border-white/10 text-gray-500 text-[11px] font-bold tracking-widest uppercase rounded cursor-not-allowed">
                  Coming Soon
                </button>
              )}
            </div>

          </div>
        </div>

        {/* --- RELATED (TOP) & ACCORDIONS (BELOW, FULL WIDTH) --- */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20">
          <div className="flex flex-col gap-6">
            
            {/* Related Product Cards (outer box, full width) */}
            <div className="border border-white/10 bg-[#050505] rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.related.map((rel: any) => {
                  const relComingSoon = productsData[rel.slug]?.isComingSoon;
                  return (
                    <Link
                      key={rel.slug}
                      href={`/research-catalog/${rel.categorySlug}/${rel.slug}`}
                      className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-lg p-4 hover:border-white/25 transition-colors cursor-pointer"
                    >
                      {/* Bottle image */}
                      <div className="relative w-20 h-36 flex-shrink-0">
                        <Image src={rel.image} alt={rel.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />
                      </div>

                      {/* Info */}
                      <div className="flex flex-col">
                        <h4 className="text-white text-base font-bold tracking-wide mb-2 uppercase">{rel.name}</h4>
                        <p className="text-[#F5A800] text-sm font-medium uppercase leading-snug mb-4">
                          Research<br />Compound
                        </p>
                        <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-b from-[#4a4f57] to-[#2c3036] text-white text-xs font-medium">
                          {relComingSoon ? (
                            <>Coming Soon <Clock size={14} /></>
                          ) : (
                            <>View Product <ArrowUpRight size={14} /></>
                          )}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Accordions (full width, below related cards) */}
            <div className="flex flex-col gap-2">

              {/* ===== 1) RESEARCH USE ONLY (expands to full disclaimer) ===== */}
              <div className="border border-white/10 bg-[#0a0a0a] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(isResearchOpen ? null : 'research')}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 cursor-pointer"
                >
                  <div className="flex items-stretch gap-4 flex-1">
                    <FileText
                      size={isResearchOpen ? 44 : 28}
                      strokeWidth={1.5}
                      className={`flex-shrink-0 ${isResearchOpen ? 'text-white mt-1' : 'text-[#F5A800]'}`}
                    />

                    {isResearchOpen && (
                      <div className="w-[2px] bg-[#F5A800] flex-shrink-0"></div>
                    )}

                    <div className="flex-1">
                      <h4 className="text-white text-[13px] md:text-sm font-normal tracking-wide uppercase">
                        Research Use Only
                      </h4>

                      {!isResearchOpen ? (
                        <p className="text-gray-400 text-xs mt-1">Not for human consumption.</p>
                      ) : (
                        <>
                          <h5 className="text-[#F5A800] text-base font-semibold mt-1 mb-2">
                            Laboratory Research Materials Only
                          </h5>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-4xl">
                            Products offered by Alpha Peptide are supplied solely for non-clinical laboratory research, analytical reference and assay development by qualified facilities and trained personnel.
                          </p>

                          {/* Warning box */}
                          <div className="flex items-center gap-4 border border-[#B98135] bg-[#B98135]/10 rounded-md px-4 py-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5A800] flex items-center justify-center">
                              <AlertCircle size={18} className="text-black" strokeWidth={2.5} />
                            </div>
                            <p className="text-[#F5A800] text-sm leading-relaxed">
                              Not for human or animal consumption. Not for clinical, therapeutic, diagnostic, cosmetic, food, supplement, or veterinary use. Purchasers must be 21 years of age or older.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {isResearchOpen ? (
                    <Minus size={22} className="text-white flex-shrink-0" />
                  ) : (
                    <PlusIcon size={22} className="text-white flex-shrink-0" />
                  )}
                </button>

                {/* Expanded details */}
                {isResearchOpen && (
                  <div className="px-5 pb-5">
                    {/* 6 points in 2 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-6 pt-2">
                      <div className="flex flex-col gap-6 md:pr-10 md:border-r md:border-white/10">
                        {researchPointsLeft.map((p) => (
                          <ResearchPoint key={p.title} point={p} />
                        ))}
                      </div>
                      <div className="flex flex-col gap-6 md:pl-10">
                        {researchPointsRight.map((p) => (
                          <ResearchPoint key={p.title} point={p} />
                        ))}
                      </div>
                    </div>

                    {/* Footer note + policy links */}
                    <div className="mt-6 pt-4 border-t border-white/15">
                      <p className="text-center text-gray-300 text-xs mb-4">
                        This Research Use Only notice forms part of our applicable policies. If there is any inconsistency, the Terms &amp; Conditions control.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-white/10">
                        {policyLinks.map((link) => {
                          const LinkIcon = link.icon;
                          return (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="flex items-center justify-center gap-3 text-white text-xs hover:text-[#F5A800] transition-colors"
                            >
                              <LinkIcon size={20} strokeWidth={1.5} />
                              <span>{link.label}</span>
                              <ArrowRight size={14} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===== 2) OTHER ACCORDIONS (Batch / Product Info / Storage) ===== */}
              {otherAccordions.map((item) => {
                const Icon = item.icon;
                const isOpen = openAccordion === item.id;
                return (
                  <div key={item.id} className="border border-white/10 bg-[#0a0a0a] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5 cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <Icon size={28} strokeWidth={1.5} className="text-[#F5A800] flex-shrink-0" />
                        <h4 className="text-white text-[13px] md:text-sm font-normal tracking-wide">{item.title}</h4>
                      </div>
                      {isOpen ? (
                        <Minus size={22} className="text-white flex-shrink-0" />
                      ) : (
                        <PlusIcon size={22} className="text-white flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-400 leading-relaxed">
                        {item.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </main>

      {/* --- TRUST BANNER WITH DIAGONAL EDGES --- */}
      <div className="w-full pb-20 px-10">
        <div className="relative w-full p-[1px] bg-white/15" style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)' }}>
          <div 
            className="w-full bg-[#0a0a0a] py-6 px-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-2xl"
            style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)' }}
          >
            <div className="flex items-center gap-4 text-white">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Image src="/glass.png" alt="3rd Party Labs" width={22} height={22} className="object-contain" />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wide">3rd Party Labs</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/15"></div>

            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 flex items-center justify-center text-white">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wide">99%+ Purity (HPLC)</span>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/15"></div>

            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 flex items-center justify-center text-white">
                <FileSpreadsheet size={22} strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wide">Research Grade Peptides</span>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer />
      <Footer />
    </div>
  );
}