import React from 'react';
import Navbar from '../../../components/Navbar/Navbar'; 
import ShopHero from '../../../components/ShopHero/ShopHero';
import ShopGrid from '../../../components/ShopGrid/ShopGrid';
import Footer from '../../../components/Footer/Footer'; 
import SupportInfoBar from '../../../components/SupportInfoBar/SupportInfoBar';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      
      
      <main className="flex-grow">
        <ShopHero initialCategory={categorySlug} />
        <ShopGrid categorySlug={categorySlug} />
        <div className="relative w-full px-12">
          <SupportInfoBar />
        </div>
      </main>

      <Footer />
    </div>
  );
}