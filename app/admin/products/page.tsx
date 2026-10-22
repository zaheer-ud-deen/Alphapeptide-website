'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, Download, Plus, BadgeCheck, Microscope, 
  Activity, AlertTriangle, Edit, Trash2, ChevronLeft, ChevronRight, 
  X, CheckCircle2, FlaskConical, Cpu
} from 'lucide-react';

export default function AdminProducts() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dynamic State for Telemetry & Products
  const [telemetry, setTelemetry] = useState({
    verifiedInventory: "1,842",
    inventoryGrowth: "+6.2% WK",
    meanPurity: "99.54%",
    activeRuns: "3 Active",
    alerts: "2 Compounds"
  });
  
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // This is where you will fetch your real Supabase data!
    async function loadProducts() {
      try {
        // Simulating the API response based on your design
        setProducts([
          { 
            id: "alpha-bpc157-5mg",
            name: "BPC-157 (Body Protection Compound)", 
            cas: "CAS 137525-51-0",
            category: "Tissue Repair & Healing", 
            dose: "5MG Lyophilized", 
            purity: "99.4% HPLC Certified", 
            price: "$72.00", 
            stock: 142, 
            batch: "Batch #A992", 
            status: "AVAILABLE",
            statusColor: "text-green-500 bg-green-500/10 border-green-500/30"
          },
          { 
            id: "alpha-reta-10mg",
            name: "Retatrutide (Triple G-Agonist)", 
            cas: "CAS 2381089-83-2",
            category: "Core Metabolic", 
            dose: "10MG Lyophilized", 
            purity: "99.8% HPLC Certified", 
            price: "$185.00", 
            stock: 68, 
            batch: "Batch #R304", 
            status: "AVAILABLE",
            statusColor: "text-green-500 bg-green-500/10 border-green-500/30"
          },
          { 
            id: "alpha-ss31-50mg",
            name: "SS-31 (Elamipretide Peptide)", 
            cas: "CAS 736992-21-5",
            category: "Mitochondrial & Cellular", 
            dose: "50MG Lyophilized", 
            purity: "99.6% HPLC Certified", 
            price: "$145.00", 
            stock: 40, 
            batch: "Batch #M811", 
            status: "AVAILABLE",
            statusColor: "text-green-500 bg-green-500/10 border-green-500/30"
          },
          { 
            id: "alpha-tirz-15mg",
            name: "Tirzepatide Clinical Research Grade", 
            cas: "CAS 2023788-19-2",
            category: "Core Metabolic", 
            dose: "15MG Lyophilized", 
            purity: "99.7% HPLC Certified", 
            price: "$160.00", 
            stock: 0, 
            batch: "Batch Synthesis Q4", 
            status: "COMING SOON",
            statusColor: "text-[#B98135] bg-[#B98135]/10 border-[#B98135]/30"
          },
          { 
            id: "alpha-epi-10mg",
            name: "Epithalon Telomere Activator", 
            cas: "CAS 307297-39-8",
            category: "Neuro & Longevity", 
            dose: "10MG Lyophilized", 
            purity: "99.2% HPLC Certified", 
            price: "$88.00", 
            stock: 12, 
            batch: "Low stock reserve", 
            status: "AVAILABLE",
            statusColor: "text-green-500 bg-green-500/10 border-green-500/30"
          }
        ]);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      
      {/* Backdrop Blur Layer for Slide-Out Drawer */}
      <div 
        className={`fixed inset-0 bg-[#030303]/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Main View Area */}
      <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1600px] w-full mx-auto">
        
        {/* Top Action Bar */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-white font-semibold tracking-tight">Clinical Inventory & Compounds</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] uppercase tracking-widest text-green-500 font-bold">Active Sync</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">Manage catalog, pricing, purity certifications, and physical batch inventory.</p>
            <div className="flex items-center gap-2 mt-1">
              <Cpu size={12} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                DB SYNCHRONIZED • 45 ACTIVE SKUS • 99.4% AVG PURITY • COLD-CHAIN LOCK
              </span>
            </div>
          </div>
          
          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center min-w-[240px]">
              <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search compound, CAS #, batch..." 
                className="w-full bg-[#050505] border border-white/10 text-white text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#B98135] placeholder:text-gray-600 transition-all"
              />
            </div>
            <div className="relative">
              <select className="appearance-none bg-[#050505] border border-white/10 text-white text-sm pl-4 pr-8 py-2 rounded-lg focus:outline-none focus:border-[#B98135] transition-all cursor-pointer">
                <option>All Categories</option>
                <option>Core Metabolic</option>
                <option>Mitochondrial & Cellular</option>
                <option>Tissue Repair & Healing</option>
                <option>Neuro & Longevity</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#050505] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium cursor-pointer">
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#B98135] text-black font-semibold text-sm hover:bg-[#a6732f] transition-all cursor-pointer"
            >
              <Plus size={18} />
              <span>Add New Compound</span>
            </button>
          </div>
        </div>

        {/* Telemetry Cards Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#050505] p-5 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-bold tracking-widest uppercase">Verified Pure Inventory</span>
              <BadgeCheck size={16} className="text-green-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl text-white font-semibold">{telemetry.verifiedInventory}</span>
              <span className="text-[10px] font-bold text-green-500">{telemetry.inventoryGrowth}</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Lyophilized units in cryogenic bay</span>
          </div>
          <div className="bg-[#050505] p-5 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-bold tracking-widest uppercase">Mean HPLC Analytical</span>
              <Microscope size={16} className="text-[#B98135]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl text-white font-semibold">{telemetry.meanPurity}</span>
              <span className="text-[10px] font-bold text-[#B98135]">PASS QA</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Independent third-party spectrometry</span>
          </div>
          <div className="bg-[#050505] p-5 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-bold tracking-widest uppercase">Synthesis Runs</span>
              <Activity size={16} className="text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl text-white font-semibold">{telemetry.activeRuns}</span>
              <span className="text-[10px] font-bold text-gray-500">BATCH #R304</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Production ETA 48-72h</span>
          </div>
          <div className="bg-[#050505] p-5 rounded-xl border border-white/10 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[10px] font-bold tracking-widest uppercase">Threshold Depletion</span>
              <AlertTriangle size={16} className="text-red-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl text-white font-semibold">{telemetry.alerts}</span>
              <span className="text-[10px] font-bold text-red-500">ALERT</span>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase mt-1">Epithalon, Semax 30mg below reserve</span>
          </div>
        </div>

        {/* Product Data Table Container */}
        <div className="bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/10">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Product / Identification</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Specs & Purity</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Unit Price</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Inventory / Lot</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-white">
                {products.map((product, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 shrink-0 flex items-center justify-center">
                          <span className="text-[10px] text-gray-600">Img</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-white group-hover:text-[#B98135] transition-colors">{product.name}</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{product.id} • {product.cas}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#0a0a0a] text-gray-400 text-xs border border-white/10">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{product.dose}</span>
                        <span className="text-[10px] font-bold text-gray-500 tracking-wide">{product.purity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-white">
                      {product.price} <span className="text-[10px] font-normal text-gray-500">USD</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className={`font-medium text-sm ${product.stock <= 12 ? 'text-red-500 flex items-center gap-1' : 'text-white'}`}>
                          {product.stock <= 12 && <AlertTriangle size={12} />}
                          {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500">{product.batch}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider ${product.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-[#B98135]'}`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button className="p-1.5 rounded text-gray-500 hover:text-[#B98135] hover:bg-[#B98135]/10 transition-colors cursor-pointer">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 rounded text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-[#0a0a0a] border-t border-white/10 gap-4">
            <span className="text-xs text-gray-500">
              Showing <span className="font-semibold text-white">1 - 5</span> of <span className="font-semibold text-white">45</span> Compounds
            </span>
            <div className="flex items-center gap-1.5">
              <button className="px-2 py-1.5 rounded border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded bg-[#B98135]/20 border border-[#B98135] text-[#B98135] text-xs font-semibold flex items-center justify-center cursor-pointer">1</button>
              <button className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 text-gray-400 text-xs flex items-center justify-center transition-colors cursor-pointer">2</button>
              <button className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 text-gray-400 text-xs flex items-center justify-center transition-colors cursor-pointer">3</button>
              <span className="text-gray-600 px-1">...</span>
              <button className="w-8 h-8 rounded border border-white/10 hover:bg-white/5 text-gray-400 text-xs flex items-center justify-center transition-colors cursor-pointer">9</button>
              <button className="px-2 py-1.5 rounded border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Slide-Out Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[#050505] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#B98135] uppercase tracking-widest">COMPOUND PROTOCOL BUILDER</span>
              <h2 className="text-xl text-white font-semibold tracking-tight mt-1">Add New Compound</h2>
              <p className="text-xs text-gray-400 mt-1">Register a clinical batch SKU into active inventory.</p>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Compound Name *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="e.g. Retatrutide Synthetic Peptide" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Canonical Slug URL *</label>
            <div className="flex items-center rounded border border-white/10 bg-[#0a0a0a] focus-within:border-[#B98135] overflow-hidden">
              <span className="px-3 text-gray-500 text-[10px] font-mono select-none border-r border-white/10">alphapeptide.com/compounds/</span>
              <input type="text" className="w-full bg-transparent text-white text-sm px-3 py-2.5 focus:outline-none" placeholder="bpc-157-5mg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Category *</label>
              <div className="relative">
                <select className="w-full appearance-none bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded cursor-pointer focus:outline-none">
                  <option>Tissue Repair & Healing</option>
                  <option>Core Metabolic</option>
                  <option>Mitochondrial & Cellular</option>
                  <option>Neuro & Longevity</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Unit Price (USD) *</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500 text-sm select-none">$</span>
                <input type="number" step="0.01" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm pl-7 pr-3 py-2.5 rounded focus:outline-none" placeholder="72.00" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Specifications & Purity Baseline *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded focus:outline-none" placeholder="5MG Lyophilized | 99.4% HPLC Certified" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Batch / CAS Registry Identifier *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm font-mono px-4 py-2.5 rounded focus:outline-none" placeholder="CAS 137525-51-0 • Lot #2024-B992" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Listing Status</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-3 rounded border border-[#B98135]/50 bg-[#B98135]/10 cursor-pointer transition-colors">
                <input type="radio" name="status" defaultChecked className="accent-[#B98135] cursor-pointer" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#B98135]">Available</span>
                  <span className="text-[9px] text-gray-400">Ready for fulfillment</span>
                </div>
              </label>
              <label className="flex items-center gap-2 p-3 rounded border border-white/10 bg-[#0a0a0a] hover:bg-white/5 cursor-pointer transition-colors">
                <input type="radio" name="status" className="accent-[#B98135] cursor-pointer" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Coming Soon</span>
                  <span className="text-[9px] text-gray-400">Pre-order / Batch prep</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Cloudinary Asset / Vial Image</label>
            <div className="border-2 border-dashed border-white/20 hover:border-[#B98135]/50 bg-[#0a0a0a] hover:bg-white/5 p-6 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#B98135]/10 border border-[#B98135]/20 flex items-center justify-center text-[#B98135]">
                <FlaskConical size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Click to upload Cloudinary asset</span>
                <span className="text-[10px] text-gray-500 mt-1">PNG, JPG up to 5MB (1:1 ratio)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded bg-[#0a0a0a] border border-white/10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cold-Chain Handling Protocols</span>
            <label className="flex items-center gap-3 text-white cursor-pointer text-sm">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#B98135] cursor-pointer" />
              <span>-20°C Lyophilized Storage Required</span>
            </label>
            <label className="flex items-center gap-3 text-white cursor-pointer text-sm">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#B98135] cursor-pointer" />
              <span>Light Sensitive (Amber Type-1 Vial)</span>
            </label>
          </div>
        </div>

        <div className="border-t border-white/10 p-5 bg-[#0a0a0a] flex items-center justify-end gap-3">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="px-5 py-2 rounded border border-white/20 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded bg-[#B98135] text-black font-semibold text-sm hover:bg-[#a6732f] transition-all flex items-center gap-2 cursor-pointer">
            <CheckCircle2 size={16} />
            <span>Save Compound</span>
          </button>
        </div>
      </aside>

    </div>
  );
}