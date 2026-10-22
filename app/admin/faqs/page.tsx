'use client';
import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronRight, Edit2, Trash2, X, Check } from 'lucide-react';

export default function AdminFAQs() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic API Fetching setup
  useEffect(() => {
    async function loadFaqs() {
      try {
        // Once Supabase API is ready, it will hit /api/faqs
        const response = await fetch('/api/faqs'); 
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to load FAQs", error);
      } finally {
        setIsLoading(false);
      }
    }
    // loadFaqs(); // Uncomment when API is ready
    setIsLoading(false); // Remove when API is ready
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full relative overflow-x-hidden">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-white text-2xl font-semibold tracking-tight">FAQ Knowledge Base</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a0a0a] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">KNOWLEDGE BASE ENGINE • VERIFIED</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Manage customer support questions, clinical research advisories, and shipping policies.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search knowledge base..." 
              className="w-72 bg-[#050505] border border-white/10 rounded pl-9 pr-3 py-2 text-sm text-white focus:border-[#B98135] transition-all focus:outline-none"
            />
          </div>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-[#B98135] hover:bg-[#a6732f] text-black font-semibold text-sm px-4 py-2 rounded flex items-center gap-1.5 transition-all"
          >
            <Plus size={16} />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-8 space-y-3.5">
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading protocols...</p>
        ) : faqs.length > 0 ? (
          faqs.map((faq: any) => (
            <div key={faq.id} className="bg-[#050505] border border-white/10 rounded-lg p-5 flex justify-between items-start group hover:border-white/20 transition-all">
              <div className="flex gap-3">
                <ChevronRight size={20} className="text-gray-500 mt-1" />
                <div>
                  <span className="bg-white/5 border border-white/10 text-gray-400 text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full mb-2 inline-block">
                    {faq.category}
                  </span>
                  <h3 className="text-white text-base font-semibold">{faq.question}</h3>
                  <p className="text-gray-500 text-sm mt-1 truncate max-w-2xl">{faq.answer}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-[#B98135] transition-colors"><Edit2 size={16} /></button>
                <button className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 border border-white/10 border-dashed rounded text-center">
            <p className="text-gray-500 text-sm">No FAQs found. Add your first protocol.</p>
          </div>
        )}
      </div>

      {/* Right Slide-Out Drawer overlay */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsDrawerOpen(false)} />
      
      <aside className={`fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[#050505] border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-white/10 flex justify-between items-start bg-[#0a0a0a]">
          <div>
            <span className="text-[10px] text-[#B98135] uppercase tracking-widest font-bold">FAQ PROTOCOL BUILDER</span>
            <h2 className="text-white text-xl font-semibold mt-1">Add New FAQ Entry</h2>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500 hover:text-white p-1 rounded hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Category Taxonomy</label>
            <select className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-sm text-white focus:outline-none focus:border-[#B98135]">
              <option value="ORDERS & SHIPPING">ORDERS & SHIPPING</option>
              <option value="PRODUCTS & PEPTIDES">PRODUCTS & PEPTIDES</option>
              <option value="RESEARCH & SAFETY">RESEARCH & SAFETY</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Question / Inquiry Prompt</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-sm text-white focus:outline-none focus:border-[#B98135]" placeholder="e.g. What are the temperature parameters?" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Detailed Answer</label>
            <textarea rows={6} className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-sm text-white focus:outline-none focus:border-[#B98135] resize-none" placeholder="Enter protocol details..." />
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-[#0a0a0a]">
          <button onClick={() => setIsDrawerOpen(false)} className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-colors">Cancel</button>
          <button className="bg-[#B98135] hover:bg-[#a6732f] text-black font-semibold text-sm px-5 py-2 rounded transition-all flex items-center gap-1.5">
            <Check size={16} /> Save Protocol
          </button>
        </div>
      </aside>

    </div>
  );
}