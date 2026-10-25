'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, FileText, Link as LinkIcon, Edit, Trash2, 
  X, CheckCircle2, Image as ImageIcon, BookOpen, FileBox 
} from 'lucide-react';

export default function AdminResearchVault() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ARTICLE' | 'VAULT'>('ARTICLE');
  
  // Form State for Drawer
  const [contentType, setContentType] = useState<'ARTICLE' | 'VAULT'>('ARTICLE');
  
  // Dynamic Data State
  const [publications, setPublications] = useState<any[]>([]);

  useEffect(() => {
    // This is where you will fetch your real Supabase data!
    async function loadPublications() {
      try {
        // Simulating the API response based on your database schema
        setPublications([
          {
            id: 'pub-001',
            type: 'ARTICLE',
            title: 'BPC-157: Mechanisms of Angiogenesis and Gastric Repair',
            excerpt: 'An in-depth review of BPC-157 influence on VEGF expression and systemic tissue regeneration protocols.',
            date: 'Oct 20, 2026',
            status: 'PUBLISHED',
            statusColor: 'text-green-500 bg-green-500/10 border-green-500/30'
          },
          {
            id: 'pub-002',
            type: 'ARTICLE',
            title: 'GLP-1 and GIP Receptor Co-Agonism in Metabolic Research',
            excerpt: 'Analyzing the metabolic pathways triggered by dual-agonist peptides in cellular models.',
            date: 'Oct 15, 2026',
            status: 'PUBLISHED',
            statusColor: 'text-green-500 bg-green-500/10 border-green-500/30'
          },
          {
            id: 'pub-003',
            type: 'VAULT',
            title: 'HPLC Purity Analysis: Batch #A992 (BPC-157)',
            excerpt: 'Independent third-party mass spectrometry and high-performance liquid chromatography results.',
            date: 'Oct 28, 2026',
            status: 'PUBLISHED',
            statusColor: 'text-green-500 bg-green-500/10 border-green-500/30'
          },
          {
            id: 'pub-004',
            type: 'VAULT',
            title: 'Cold-Chain Shipping Validation Study',
            excerpt: 'Thermal mapping data for our -20°C dry ice shipping containers over a 72-hour transit period.',
            date: 'Oct 05, 2026',
            status: 'DRAFT',
            statusColor: 'text-gray-400 bg-white/5 border-white/20'
          }
        ]);
      } catch (error) {
        console.error("Failed to load publications", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublications();
  }, []);

  // Filter data based on active tab
  const filteredPublications = publications.filter(pub => pub.type === activeTab);

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      
      {/* Backdrop Blur Layer */}
      <div 
        className={`fixed inset-0 bg-[#030303]/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Main View Area */}
      <div className="p-6 lg:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
        
        {/* Top Action Bar */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl text-white font-semibold tracking-tight">Research Library & Vault</h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0a0a0a] border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">CONTENT ENGINE SYNCED</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">Publish clinical articles, lab results, and external vault documents.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center min-w-[280px]">
              <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search publications or vault files..." 
                className="w-full bg-[#050505] border border-white/10 text-white text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#B98135] transition-all"
              />
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#B98135] text-black font-semibold text-sm hover:bg-[#a6732f] transition-all cursor-pointer shadow-lg shadow-[#B98135]/10"
            >
              <Plus size={18} />
              <span>Add Publication</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('ARTICLE')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'ARTICLE' ? 'text-[#B98135] border-b-2 border-[#B98135] bg-[#B98135]/5' : 'text-gray-500 hover:text-white'}`}
          >
            <BookOpen size={16} />
            Research Articles
          </button>
          <button 
            onClick={() => setActiveTab('VAULT')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'VAULT' ? 'text-[#B98135] border-b-2 border-[#B98135] bg-[#B98135]/5' : 'text-gray-500 hover:text-white'}`}
          >
            <FileBox size={16} />
            The Vault (PDFs & Links)
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-white/10">
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Publication Details</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Content Type</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date Added</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-white">
                {isLoading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500 text-sm">Loading database records...</td></tr>
                ) : filteredPublications.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500 text-sm">No records found for this category.</td></tr>
                ) : (
                  filteredPublications.map((pub) => (
                    <tr key={pub.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded bg-[#0a0a0a] border border-white/10 shrink-0 flex items-center justify-center">
                            <ImageIcon size={18} className="text-gray-600" />
                          </div>
                          <div className="flex flex-col min-w-0 max-w-md">
                            <span className="text-sm font-semibold text-white group-hover:text-[#B98135] transition-colors line-clamp-1">{pub.title}</span>
                            <span className="text-xs text-gray-500 mt-1 line-clamp-1">{pub.excerpt}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a0a0a] border border-white/10 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                          {pub.type === 'ARTICLE' ? <FileText size={12} className="text-[#B98135]" /> : <LinkIcon size={12} className="text-blue-400" />}
                          {pub.type === 'ARTICLE' ? 'ARTICLE' : 'VAULT LINK'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {pub.date}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${pub.statusColor}`}>
                          {pub.status}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add / Edit Publication Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-full sm:w-[600px] bg-[#050505] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#B98135] uppercase tracking-widest">CONTENT PROTOCOL BUILDER</span>
              <h2 className="text-xl text-white font-semibold tracking-tight mt-1">Publish to Library</h2>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 custom-scrollbar">
          
          {/* Content Type Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Content Type</label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#0a0a0a] border border-white/10 rounded-lg">
              <label 
                className={`flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${contentType === 'ARTICLE' ? 'bg-[#030303] border border-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setContentType('ARTICLE')}
              >
                <input type="radio" name="cType" className="hidden" checked={contentType === 'ARTICLE'} readOnly />
                <BookOpen size={14} className={contentType === 'ARTICLE' ? 'text-[#B98135]' : ''} />
                <span className="text-xs font-semibold uppercase tracking-wider">Research Article</span>
              </label>
              <label 
                className={`flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-colors ${contentType === 'VAULT' ? 'bg-[#030303] border border-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setContentType('VAULT')}
              >
                <input type="radio" name="cType" className="hidden" checked={contentType === 'VAULT'} readOnly />
                <FileBox size={14} className={contentType === 'VAULT' ? 'text-[#B98135]' : ''} />
                <span className="text-xs font-semibold uppercase tracking-wider">Vault Document</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Title / Headline *</label>
            <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none" placeholder="Enter publication title" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Excerpt / Short Summary *</label>
            <textarea rows={2} className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded transition-colors focus:outline-none resize-none" placeholder="A brief summary for the preview card..." />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Cover Image (Cloudinary)</label>
            <div className="border-2 border-dashed border-white/20 hover:border-[#B98135]/50 bg-[#0a0a0a] hover:bg-white/5 p-6 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                <ImageIcon size={20} />
              </div>
              <span className="text-xs text-gray-400">Click to upload thumbnail</span>
            </div>
          </div>

          {/* Conditional Field based on Content Type */}
          {contentType === 'ARTICLE' ? (
            <div className="flex flex-col gap-1.5 flex-1 min-h-[200px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#B98135]">Article Body (Markdown Supported) *</label>
              <textarea 
                className="w-full h-full min-h-[200px] bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm p-4 rounded transition-colors focus:outline-none resize-y custom-scrollbar" 
                placeholder="Write your clinical research article here. Use markdown for headings, bold text, and lists..." 
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#B98135]">External URL or PDF Link *</label>
              <div className="relative flex items-center">
                <LinkIcon size={16} className="absolute left-3 text-gray-500" />
                <input 
                  type="url" 
                  className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm pl-9 pr-4 py-2.5 rounded transition-colors focus:outline-none" 
                  placeholder="https://... (Link to lab result or external study)" 
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Publishing Status</label>
            <select className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#B98135] text-white text-sm px-4 py-2.5 rounded cursor-pointer focus:outline-none appearance-none">
              <option value="PUBLISHED">Published (Live to public)</option>
              <option value="DRAFT">Draft (Hidden)</option>
            </select>
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
            <span>Save Publication</span>
          </button>
        </div>
      </aside>

    </div>
  );
}