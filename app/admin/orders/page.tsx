'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Snowflake, Truck, Check, Sliders, ArrowRight, 
  X, QrCode, CheckCircle2, AlertTriangle, ShieldCheck, Clock
} from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [activeStatus, setActiveStatus] = useState('PROCESSING');
  const [trackingNumber, setTrackingNumber] = useState('FDX-9942-8812-US');
  const [dispatchNotes, setDispatchNotes] = useState('Verified HPLC CoA included in cryogenic container. Dry ice replenished at 14:15 EST. Chamber temp calibrated to -22.4°C.');
  
  // Toast notification state
  const [toast, setToast] = useState<{ show: boolean; title: string; body: string }>({ show: false, title: '', body: '' });

  useEffect(() => {
    // Dynamic data loading representation (ready for Supabase /api/orders)
    const initialOrders = [
      {
        id: 'ORD-9824',
        courier: 'FEDEX COLD-CHAIN',
        name: 'Dr. Marcus Vance',
        title: 'DIR. BIOCHEM',
        email: 'm.vance@biolabnexus.org',
        date: 'Oct 28, 2026',
        time: '14:30 EST',
        total: '$1,280.00',
        paymentType: 'CLINICAL CREDIT',
        status: 'PROCESSING',
        statusColor: 'text-green-400 bg-green-500/10 border-green-500/30',
        address: {
          building: 'Building 4, Biotech Innovation Park',
          street: '8400 Research Blvd, Cryo-Dock 2B',
          cityStateZip: 'Austin, TX 78758, USA'
        },
        phone: '+1 (512) 555-0194',
        items: [
          { qty: 2, name: 'BPC-157 (5mg Lyophilized Vial)', cas: '137525-51-0', lot: '#2024-B992', purity: '99.4%', price: '$144.00', unit: '$72.00 ea' },
          { qty: 4, name: 'TB-500 (10mg High-Purity)', cas: '77591-33-4', lot: '#2024-T410', purity: '99.1%', price: '$440.00', unit: '$110.00 ea' },
          { qty: 1, name: 'Bacteriostatic Water (30ml USP)', cas: 'USP Grade Multi-Dose', lot: '0.9% Benzyl Alcohol', purity: 'USP', price: '$20.00', unit: '$20.00 ea' },
          { qty: 1, name: 'GHK-Cu (50mg Lyophilized)', cas: '49557-75-7', lot: '#2024-G208', purity: '99.8%', price: '$676.00', unit: '$676.00 ea' }
        ]
      },
      {
        id: 'ORD-9823',
        courier: 'UPS CRYOSHIFT',
        name: 'Dr. Sarah Lin, MD',
        title: 'LONGEVITY RESEARCH',
        email: 's.lin@apexlongevity.inst',
        date: 'Oct 28, 2026',
        time: '13:12 EST',
        total: '$460.00',
        paymentType: 'WIRE TRANSFER',
        status: 'PENDING',
        statusColor: 'text-[#B98135] bg-[#B98135]/10 border-[#B98135]/30',
        address: {
          building: 'Apex Longevity Institute',
          street: '120 Research Parkway, Suite 400',
          cityStateZip: 'Boston, MA 02118, USA'
        },
        phone: '+1 (617) 555-0143',
        items: [
          { qty: 2, name: 'Retatrutide (10mg Vial)', cas: '2381089-83-2', lot: '#2024-R304', purity: '99.8%', price: '$370.00', unit: '$185.00 ea' },
          { qty: 1, name: 'Bacteriostatic Water (30ml USP)', cas: 'USP Grade', lot: 'Multi-Dose', purity: 'USP', price: '$20.00', unit: '$20.00 ea' }
        ]
      },
      {
        id: 'ORD-9822',
        courier: 'DIRECT COURIER',
        name: 'Prof. David Sterling',
        title: 'GENOMICS LAB',
        email: 'd.sterling@stanford-genomics.edu',
        date: 'Oct 28, 2026',
        time: '11:45 EST',
        total: '$2,410.00',
        paymentType: 'RESEARCH GRANT VISA',
        status: 'COMPLETED',
        statusColor: 'text-green-400 bg-green-500/10 border-green-500/30',
        address: {
          building: 'Stanford Genomics Wing',
          street: '300 Pasteur Drive',
          cityStateZip: 'Stanford, CA 94305, USA'
        },
        phone: '+1 (650) 555-0199',
        items: [
          { qty: 10, name: 'BPC-157 (5mg Lyophilized Vial)', cas: '137525-51-0', lot: '#2024-B992', purity: '99.4%', price: '$720.00', unit: '$72.00 ea' },
          { qty: 10, name: 'TB-500 (10mg High-Purity)', cas: '77591-33-4', lot: '#2024-T410', purity: '99.1%', price: '$1,100.00', unit: '$110.00 ea' }
        ]
      },
      {
        id: 'ORD-9821',
        courier: 'FEDEX COLD-CHAIN',
        name: 'Horizon Cell Analytics',
        title: 'DIAGNOSTICS',
        email: 'ops@horizoncell.ch',
        date: 'Oct 28, 2026',
        time: '09:18 EST',
        total: '$3,890.00',
        paymentType: 'SWIFT WIRE',
        status: 'PROCESSING',
        statusColor: 'text-green-400 bg-green-500/10 border-green-500/30',
        address: {
          building: 'Horizon BioLabs Europe',
          street: 'Baselstrasse 44',
          cityStateZip: '4056 Basel, Switzerland'
        },
        phone: '+41 61 555 0192',
        items: [
          { qty: 20, name: 'SS-31 (50mg Elamipretide)', cas: '736992-21-5', lot: '#2024-M811', purity: '99.6%', price: '$2,900.00', unit: '$145.00 ea' }
        ]
      },
      {
        id: 'ORD-9820',
        courier: 'QUARANTINE',
        name: 'Elena Rostova',
        title: 'SYNAPSE CORE',
        email: 'e.rostova@synapsecore.eu',
        date: 'Oct 27, 2026',
        time: '21:04 EST',
        total: '$840.00',
        paymentType: 'PAYMENT FLAGGED',
        status: 'CANCELLED',
        statusColor: 'text-red-400 bg-red-500/10 border-red-500/30',
        address: {
          building: 'Synapse Core EU',
          street: 'Kottbusser Damm 72',
          cityStateZip: '10967 Berlin, Germany'
        },
        phone: '+49 30 555 0121',
        items: [
          { qty: 5, name: 'Epithalon (10mg Vial)', cas: '307297-39-8', lot: '#2024-E102', purity: '99.2%', price: '$440.00', unit: '$88.00 ea' }
        ]
      },
      {
        id: 'ORD-9819',
        courier: 'FEDEX COLD-CHAIN',
        name: 'Dr. Julian Thorne',
        title: 'CAMBRIDGE MOLSCI',
        email: 'j.thorne@cambridge-molsci.org',
        date: 'Oct 27, 2026',
        time: '18:50 EST',
        total: '$1,920.00',
        paymentType: 'CREDIT ACCOUNT',
        status: 'PENDING',
        statusColor: 'text-[#B98135] bg-[#B98135]/10 border-[#B98135]/30',
        address: {
          building: 'Department of Molecular Sciences',
          street: 'Tennis Court Road',
          cityStateZip: 'Cambridge CB2 1EW, United Kingdom'
        },
        phone: '+44 1223 555 011',
        items: [
          { qty: 12, name: 'BPC-157 (5mg Lyophilized Vial)', cas: '137525-51-0', lot: '#2024-B992', purity: '99.4%', price: '$864.00', unit: '$72.00 ea' }
        ]
      }
    ];

    setOrders(initialOrders);
    setSelectedOrder(initialOrders[0]); // Default selected drawer item
  }, []);

  const triggerToast = (title: string, body: string) => {
    setToast({ show: true, title, body });
    setTimeout(() => {
      setToast({ show: false, title: '', body: '' });
    }, 3500);
  };

  const handleSaveDispatch = () => {
    triggerToast('Dispatch Manifest Committed', `${selectedOrder?.id} assigned tracking: ${trackingNumber}`);
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen bg-[#030303] text-white">
      
      {/* Top Command & Action Bar */}
      <div className="w-full px-6 lg:px-8 py-6 flex flex-col gap-4 bg-[#050505] border-b border-white/10">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-semibold tracking-tight text-white">Order Dispatch & Tracking</h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-widest uppercase">COLD-CHAIN COURIER LIVE • 12 IN TRANSIT</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">Manage bio-reagent fulfillments, cryogenic dispatch protocols, and certified institute manifests.</p>
          </div>

          {/* Quick Metrics Telemetry Cards */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2 rounded bg-[#0a0a0a] border border-white/10 flex flex-col min-w-[124px]">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">TOTAL ORDERS</span>
              <span className="text-xl font-semibold text-white tracking-tight">1,429</span>
            </div>
            <div className="px-4 py-2 rounded bg-[#0a0a0a] border border-white/10 flex flex-col min-w-[130px]">
              <span className="text-[10px] font-bold text-[#B98135] uppercase tracking-wider">UNFULFILLED / PENDING</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-semibold text-[#B98135] tracking-tight">4</span>
                <span className="text-[9px] px-1 rounded bg-[#B98135]/20 text-[#B98135] font-bold">URGENT</span>
              </div>
            </div>
            <div className="px-4 py-2 rounded bg-[#0a0a0a] border border-white/10 flex flex-col min-w-[140px]">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AVG DISPATCH TIME</span>
              <span className="text-xl font-semibold text-[#fbba68] tracking-tight">3.2 <span className="text-xs font-normal text-gray-500">HRS</span></span>
            </div>
          </div>
        </div>

        {/* Controls Row: Search, Filters, CSV */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-lg flex items-center">
            <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Institute, or Email..." 
              className="w-full bg-[#0a0a0a] border border-white/10 rounded text-sm text-white placeholder:text-gray-600 pl-9 pr-4 py-2 focus:outline-none focus:border-[#B98135] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select className="appearance-none bg-[#0a0a0a] border border-white/10 text-white text-xs rounded pl-3 pr-8 py-2 focus:outline-none focus:border-[#B98135] cursor-pointer hover:bg-white/5 transition-colors">
                <option value="all">Status: All (12 Active)</option>
                <option value="pending">Pending Cryo-Prep (4)</option>
                <option value="processing">Processing Lot Check (3)</option>
                <option value="completed">Completed & Dispatched (4)</option>
                <option value="cancelled">Cancelled / Quarantined (1)</option>
              </select>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#0a0a0a] border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-xs font-medium cursor-pointer">
              <Snowflake size={14} className="text-[#B98135]" />
              <span>Dry-Ice Cold-Chain</span>
            </button>
            <button 
              onClick={() => triggerToast('Export Initiated', 'Compiling cryogenic manifest records into CSV (12 entries)...')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#151c25] border border-white/20 text-white hover:border-[#B98135] hover:text-[#B98135] transition-all text-xs font-medium ml-auto lg:ml-0 cursor-pointer"
            >
              <Download size={14} />
              <span>Export Manifest (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <div className="w-full px-6 lg:px-8 py-6 flex items-start gap-6 relative overflow-x-hidden">
        
        {/* Primary Orders Table Panel */}
        <div className="flex-1 flex flex-col bg-[#050505] border border-white/10 rounded overflow-hidden shadow-2xl">
          <div className="px-4 py-2.5 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B98135] animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SECURE CLINICAL LOGISTICS MANIFEST</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase">REFRIGERATION COMPLIANCE: 100% PASS</span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] font-bold text-[#B98135] uppercase">GMP CERTIFIED 2026</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="h-9 border-b border-white/10 bg-[#080f17]">
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">ORDER ID</th>
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">RECIPIENT & INSTITUTION</th>
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">DATE & TIME</th>
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">TOTAL PAYLOAD</th>
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">DISPATCH STATUS</th>
                  <th className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {orders.map((ord, idx) => {
                  const isSelected = selectedOrder?.id === ord.id;
                  return (
                    <tr 
                      key={idx} 
                      onClick={() => { setSelectedOrder(ord); setIsDrawerOpen(true); }}
                      className={`group transition-colors cursor-pointer ${isSelected ? 'bg-[#B98135]/15 border-l-2 border-[#B98135]' : 'hover:bg-white/5'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-mono font-semibold text-[#B98135] tracking-tight">{ord.id}</span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Snowflake size={10} className="text-green-400" />
                            <span className="text-[9px] text-green-400 tracking-widest uppercase">{ord.courier}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-white truncate">{ord.name}</span>
                            <span className="text-[9px] px-1 rounded bg-[#151c25] text-gray-400 uppercase">{ord.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono truncate">{ord.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-400 text-[11px]">
                        {ord.date}<br/><span className="text-gray-500 font-normal">{ord.time}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-mono text-white font-semibold">{ord.total}</span>
                          <span className="text-[9px] text-gray-500 uppercase">{ord.paymentType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${ord.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedOrder(ord); setIsDrawerOpen(true); }}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${isSelected ? 'bg-[#B98135] text-black shadow-sm' : 'border border-white/20 text-gray-300 hover:border-[#B98135] hover:text-[#B98135]'}`}
                        >
                          <span>MANAGE</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 bg-[#0a0a0a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>Showing <strong className="text-white">1 to 6</strong> of <strong className="text-white">12</strong> active dispatch records</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded border border-white/10 text-gray-500 hover:text-white cursor-pointer text-xs font-mono" disabled>PREV</button>
              <button className="px-2.5 py-1 rounded bg-[#B98135] text-black font-mono text-xs font-semibold cursor-pointer">1</button>
              <button className="px-2.5 py-1 rounded border border-white/10 text-gray-400 hover:text-white font-mono text-xs cursor-pointer">2</button>
              <button className="px-2.5 py-1 rounded border border-white/10 text-gray-400 hover:text-white text-xs font-mono cursor-pointer">NEXT</button>
            </div>
          </div>
        </div>

        {/* Fulfillment Drawer Slide-Out Panel */}
        {selectedOrder && (
          <aside className={`w-[480px] shrink-0 bg-[#050505] border border-white/10 rounded flex flex-col shadow-2xl transition-all duration-300 relative z-30 ${isDrawerOpen ? 'block' : 'hidden'}`}>
            
            {/* Drawer Header Bar */}
            <div className="p-4 border-b border-white/10 bg-[#0a0a0a] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-[#B98135] tracking-widest uppercase">ORDER DISPATCH MANIFEST</span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <h2 className="text-xl font-semibold text-white tracking-tight font-mono">
                  Order: {selectedOrder.id}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${selectedOrder.statusColor}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Placed {selectedOrder.date} at {selectedOrder.time} • Paid via {selectedOrder.paymentType}
              </p>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-250px)]">
              
              {/* Section 1: Customer & Shipping */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">RECIPIENT & COLD-CHAIN ROUTING</span>
                  <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest font-mono">VERIFIED LAB ID: BLN-881</span>
                </div>
                <div className="p-3 rounded bg-[#0a0a0a] border border-white/10 flex flex-col gap-2">
                  <div>
                    <div className="text-sm font-semibold text-white">{selectedOrder.name}</div>
                    <div className="text-xs text-gray-400">{selectedOrder.address.building} • {selectedOrder.title}</div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">DELIVERY RECEPTACLE ADDRESS:</span>
                    <p className="text-xs text-gray-300 font-mono">
                      {selectedOrder.address.building}<br/>
                      {selectedOrder.address.street}<br/>
                      {selectedOrder.address.cityStateZip}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                    <span>COMM: {selectedOrder.email}</span>
                    <span>TEL: {selectedOrder.phone}</span>
                  </div>

                  {/* Protocol Badge Callout */}
                  <div className="mt-1 p-2.5 rounded bg-[#121821] border border-white/10 flex items-start gap-2">
                    <Snowflake size={16} className="text-[#B98135] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        LOGISTICS SPEC: -20°C VACUUM DRY ICE
                      </span>
                      <span className="text-[11px] text-gray-400 leading-tight">
                        Priority Overnight via FedEx Clinical Cold-Chain (Master Tracking: <span className="font-mono text-[#B98135]">FDX-9942-8812</span>)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Order Items Manifest */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    PRODUCT SPECIFICATION MANIFEST ({selectedOrder.items.length} ITEMS)
                  </span>
                  <span className="text-[9px] font-bold text-[#B98135] uppercase font-mono tracking-widest">GMP LOT-MATCHED</span>
                </div>
                <div className="rounded border border-white/10 divide-y divide-white/10 bg-[#0a0a0a] overflow-hidden">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="p-3 flex items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#151c25] font-semibold text-[#B98135]">{item.qty}x</span>
                          <span className="text-sm font-medium text-white">{item.name}</span>
                        </div>
                        <div className="font-mono text-[10px] text-gray-500 mt-0.5">
                          CAS: {item.cas} • Lot: {item.lot} • Purity: {item.purity}
                        </div>
                      </div>
                      <div className="text-right shrink-0 font-mono">
                        <div className="text-xs font-semibold text-white">{item.price}</div>
                        <div className="text-[10px] text-gray-500">{item.unit}</div>
                      </div>
                    </div>
                  ))}

                  {/* Price Breakdown Summary */}
                  <div className="p-3 bg-[#080f17] flex flex-col gap-1 text-xs font-mono">
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Subtotal Items</span>
                      <span>{selectedOrder.total}</span>
                    </div>
                    <div className="flex items-center justify-between text-green-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Cold-Chain Cryo Insulated Packaging
                      </span>
                      <span className="font-semibold">INCLUDED</span>
                    </div>
                    <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-white font-semibold">
                      <span className="tracking-wide">TOTAL VERIFIED SETTLEMENT</span>
                      <span className="text-sm text-[#B98135]">{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Fulfillment Actions */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  UPDATE DISPATCH STATUS & CARRIER TELEMETRY
                </span>
                <div className="flex flex-col gap-3 p-3 rounded bg-[#0a0a0a] border border-white/10">
                  
                  {/* Segmented status toggles */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-[#030303] rounded border border-white/10">
                    <button 
                      onClick={() => setActiveStatus('PROCESSING')}
                      className={`py-1.5 px-2 rounded text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${activeStatus === 'PROCESSING' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'text-gray-400 hover:text-white'}`}
                    >
                      PROCESSING
                    </button>
                    <button 
                      onClick={() => setActiveStatus('COMPLETED')}
                      className={`py-1.5 px-2 rounded text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${activeStatus === 'COMPLETED' ? 'bg-[#B98135] text-black font-semibold' : 'text-gray-400 hover:text-white'}`}
                    >
                      DISPATCHED
                    </button>
                    <button 
                      onClick={() => setActiveStatus('CANCELLED')}
                      className={`py-1.5 px-2 rounded text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${activeStatus === 'CANCELLED' ? 'bg-red-500 text-white font-semibold' : 'text-gray-400 hover:text-red-400'}`}
                    >
                      CANCEL / HOLD
                    </button>
                  </div>

                  {/* Tracking Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center justify-between font-bold">
                      <span>FEDEX CLINICAL TRACKING NUMBER</span>
                      <span className="text-green-400 font-mono text-[9px]">LIVE TELEMETRY READY</span>
                    </label>
                    <div className="relative flex items-center">
                      <QrCode size={16} className="absolute left-3 text-gray-500" />
                      <input 
                        type="text" 
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full bg-[#030303] border border-white/20 rounded font-mono text-sm text-[#B98135] pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#B98135]"
                      />
                    </div>
                  </div>

                  {/* Dispatch Notes */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      DISPATCH & COA QUALITY ATTESTATION
                    </label>
                    <textarea 
                      rows={2}
                      value={dispatchNotes}
                      onChange={(e) => setDispatchNotes(e.target.value)}
                      className="w-full bg-[#030303] border border-white/20 rounded text-xs text-white p-2 focus:outline-none focus:border-[#B98135] resize-none"
                    />
                  </div>

                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between gap-3">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 rounded border border-white/20 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDispatch}
                className="flex-1 px-4 py-2 rounded bg-[#B98135] text-black text-xs font-semibold hover:bg-[#a6732f] shadow-lg shadow-[#B98135]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Truck size={16} />
                <span>Save Changes & Dispatch</span>
              </button>
            </div>

          </aside>
        )}

      </div>

      {/* Toast Notification Banner */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 flex items-center gap-3 px-4 py-3 rounded bg-[#080f17] border border-[#B98135]/50 shadow-2xl text-white ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <ShieldCheck size={20} className="text-[#B98135]" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#B98135]">{toast.title}</span>
          <span className="text-[11px] text-gray-400">{toast.body}</span>
        </div>
      </div>

    </div>
  );
}