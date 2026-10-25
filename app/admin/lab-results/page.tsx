'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, FileSignature, Edit, Trash2, X, CheckCircle2, 
  ExternalLink, UploadCloud, FileText, FlaskConical, Activity 
} from 'lucide-react';

export default function AdminLabResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [labResults, setLabResults] = useState<any[]>([]);

  useEffect(() => {
    // This will fetch from your /api/lab-results route later
    async function loadLabResults() {
      try {
        setLabResults([
          {
            id: 1,
            lot: "VP-183D5F7410",
            compound: "BPC-157 / TB-500 Blend",
            dose: "—",
            purity: "99.84%",
            mw: "—",
            status: "IN STOCK",
            statusColor: "text-green-500",
            coaUrl: "#"
          },
          {
            id: 2,
            lot: "VP-3Q5S7UFA6",
            compound: "CJC / Ipamorelin",
            dose: "—",
            purity: "99.22%",
            mw: "—",
            status: "IN STOCK",
            statusColor: "text-green-500",
            coaUrl: "#"
          },
          {
            id: 3,
            lot: "VP-8K3M7N2P4",
            compound: "GLP-1 SM",
            dose: "Dose Strength: 10mg",
            purity: "98.05%",
            mw: "—",
            status: "IN STOCK",
            statusColor: "text-green-500",
            coaUrl: "#"
          }
        ]);
      } catch (error) {
        console.error("Failed to load lab results", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadLabResults();
  }, []);

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      
      {/* Backdrop Blur Layer */}
      <div 
        className={`fixed inset-0 bg-[#030303]/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="p-6 lg:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
        
        {/* Top Action Bar */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex flex-col gap-1 pb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl text-white font-semibold tracking-tight">Lab Results & COAs</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#B98135]/10 border border-[#B98135]/30">
                <span className="text-[10px] uppercase tracking-widest text-[#B98135] font-bold">BATCH TRACEABLE</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">Manage Certificates of Analysis, batch lots, and purity data for the public registry.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pb-4">
            <div className="relative flex items-center min-w-[280px]">
              <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search lot number..." 
                className="w-full bg-[#050505] border border-white/10 text-white text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#B98135] transition-all"
              />
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#B98135] text-black font-semibold text-sm hover:bg-[#a6732f] transition-all cursor-pointer shadow-lg shadow-[#B98135]/10"
            >
              <Plus size={18} />
              <span>Add Lab Result</span>
            </button>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#050505] p-4 rounded-xl border border-white/10 flex flex-col cursor-pointer hover:border-white/20 transition-all">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Published Lots</span>
            <div className="flex items-center gap-3">
              <FileSignature size={24} className="text-[#B98135]" />
              <span className="text-2xl text-white font-semibold">22</span>
            </div>
          </div>
          <div className="bg-[#050505] p-4 rounded-xl border border-white/10 flex flex-col cursor-pointer hover:border-white/20 transition-all">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Avg Purity</span>
            <div className="flex items-center gap-3">
              <Activity size={24} className="text-green-500" />
              <span className="text-2xl text-white font-semibold">99.15%</span>
            </div>
          </div>
          <div className="bg-[#050505] p-4 rounded-xl border border-white/10 flex flex-col cursor-pointer hover:border-white/20 transition-all">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Archived Certificates</span>
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-gray-400" />
              <span className="text-2xl text-white font-semibold">104</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/10">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">LOT</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">COMPOUND</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">DOSE</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">PURITY HPLC</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">MW</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">STATUS</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-white">
                {isLoading ? (
                  <tr><td colSpan={7} className="py-8 text-center text-gray-500 text-sm">Loading records...</td></tr>
                ) : (
                  labResults.map((result) => (
                    <tr key={result.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="py-4 px-6 font-mono text-gray-300">{result.lot}</td>
                      <td className="py-4 px-6 font-medium text-white group-hover:text-[#B98135] transition-colors">{result.compound}</td>
                      <td className="py-4 px-6 text-gray-400 text-xs">{result.dose}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-[#B98135] font-semibold">{result.purity}</span>
                          <span className="text-[9px] text-[#B98135] uppercase font-bold tracking-widest">HPLC</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-mono">{result.mw}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${result.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {result.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-widest">
                            <ExternalLink size={12} />
                            COA
                          </button>
                          <button className="p-1.5 rounded text-gray-500 hover:text-[#B98135] hover:bg-[#B98135]/10 transition-colors cursor-pointer">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[#050505] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#B98135] uppercase tracking-widest">BATCH REGISTRY</span>
              <h2 className="text-xl text-white font-semibold tracking-tight mt-1">Add Lab Result</h2>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 custom-scrollbar">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Lot Number *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white font-mono text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="e.g. VP-183D5F7410" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Compound *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="e.g. BPC-157 / TB-500 Blend" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Dose</label>
              <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="e.g. Dose Strength: 10mg" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#B98135]">Purity HPLC (%) *</label>
              <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-[#B98135] font-bold text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="99.84%" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Molecular Weight (MW)</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="—" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Store Link (Product Slug)</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-gray-400 font-mono text-xs px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="/shop/bpc-157" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</label>
            <select className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded cursor-pointer focus:outline-none appearance-none">
              <option value="IN STOCK">IN STOCK (Active Batch)</option>
              <option value="ARCHIVED">ARCHIVED (Historical Record)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">COA Document Upload (PDF or Image)</label>
            <div className="border-2 border-dashed border-white/20 hover:border-[#B98135]/50 bg-[#0a0a0a] hover:bg-white/5 p-6 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                <UploadCloud size={20} />
              </div>
              <span className="text-xs text-gray-400">Upload COA Document to Cloudinary</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 p-5 bg-[#0a0a0a] flex items-center justify-end gap-3 shrink-0">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="px-5 py-2 rounded border border-white/20 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded bg-[#B98135] text-black font-semibold text-sm hover:bg-[#a6732f] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#B98135]/20">
            <CheckCircle2 size={16} />
            <span>Publish Result</span>
          </button>
        </div>
      </aside>

    </div>
  );
}