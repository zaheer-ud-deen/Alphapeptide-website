'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, RefreshCw, TrendingUp, Package, FlaskConical, Award, 
  Download, Edit, Eye, PlusCircle, FileText, BarChart2, Snowflake 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  // State for your dynamic data
  const [metrics, setMetrics] = useState({
    revenue: "$0.00",
    revenueGrowth: "+0.0%",
    activeOrders: 0,
    pendingDispatch: 0,
    totalProducts: 0,
    lyophilizedBatches: 0,
    topSelling: "-",
    topSellingVials: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    // This is where you will fetch your real Supabase data!
    async function loadDashboardData() {
      try {
        // Simulating the API response based on your design for now
        setMetrics({
          revenue: "$24,500",
          revenueGrowth: "+18.4%",
          activeOrders: 12,
          pendingDispatch: 4,
          totalProducts: 45,
          lyophilizedBatches: 8,
          topSelling: "BPC-157",
          topSellingVials: 342
        });

        setRecentOrders([
          { id: "ORD-9824", name: "Dr. Marcus Vance", lab: "BioLab Nexus", date: "Oct 28, 2026", total: "$1,280.00", status: "Completed", statusColor: "text-green-500 bg-green-500/10 border-green-500/20" },
          { id: "ORD-9823", name: "Sarah Lin", lab: "Apex Longevity Inst.", date: "Oct 28, 2026", total: "$420.00", status: "Pending", statusColor: "text-[#B98135] bg-[#B98135]/10 border-[#B98135]/20" },
          { id: "ORD-9822", name: "Prof. David Sterling", lab: "Endo Research Lab", date: "Oct 27, 2026", total: "$2,650.00", status: "Completed", statusColor: "text-green-500 bg-green-500/10 border-green-500/20" },
          { id: "ORD-9821", name: "Horizon Cell Analytics", lab: "Diagnostics Division", date: "Oct 27, 2026", total: "$890.00", status: "Completed", statusColor: "text-green-500 bg-green-500/10 border-green-500/20" },
          { id: "ORD-9820", name: "Elena Rostova", lab: "Vanguard Lab", date: "Oct 26, 2026", total: "$150.00", status: "Cancelled", statusColor: "text-red-500 bg-red-500/10 border-red-500/20" }
        ]);

        setTopProducts([
          { name: "BPC-157 (5mg Vial)", batch: "BATCH-A992 • 99.4% PURITY", stats: "142 orders ($7,100)", image: "/placeholder.jpg" },
          { name: "TB-500 (10mg Vial)", batch: "BATCH-T410 • 99.8% PURITY", stats: "98 orders ($6,370)", image: "/placeholder.jpg" },
          { name: "GHK-Cu (50mg Cosmetic/Lab)", batch: "BATCH-G208 • 99.1% PURITY", stats: "86 orders ($4,300)", image: "/placeholder.jpg" }
        ]);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="flex flex-col w-full p-6 lg:p-10 gap-8 max-w-[1600px] mx-auto">
      
      {/* TOP HEADER / TITLE BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl text-white font-semibold tracking-tight">Dashboard Overview</h1>
            <span className="px-2 py-0.5 rounded bg-[#B98135]/10 border border-[#B98135]/30 text-[10px] font-bold text-[#B98135] uppercase tracking-widest">
              REAL-TIME CLINICAL INVENTORY & DISPATCH
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              SUPABASE CONNECTED • DB LATENCY: 24ms
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0a0a0a] border border-white/10 text-gray-400 text-sm cursor-pointer hover:border-white/30 transition-all">
            <Calendar size={14} className="text-[#B98135]" />
            <span className="font-medium text-white">Past 30 Days (Oct 1 - Oct 31)</span>
          </div>
          <button className="p-1.5 rounded bg-[#0a0a0a] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* TOP ROW METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-[#050505] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">TOTAL REVENUE</span>
            <div className="w-8 h-8 rounded bg-[#B98135]/10 border border-[#B98135]/20 flex items-center justify-center text-[#B98135] group-hover:scale-105 transition-transform">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-3xl text-white font-bold tracking-tight leading-none">{metrics.revenue}</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="flex items-center text-green-500 text-[10px] font-bold tracking-widest bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                {metrics.revenueGrowth}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-[#050505] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">ACTIVE ORDERS</span>
            <div className="w-8 h-8 rounded bg-[#B98135]/10 border border-[#B98135]/20 flex items-center justify-center text-[#B98135] group-hover:scale-105 transition-transform">
              <Package size={18} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-3xl text-white font-bold tracking-tight leading-none">{metrics.activeOrders}</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="flex items-center text-[#B98135] text-[10px] font-bold tracking-widest bg-[#B98135]/10 px-1.5 py-0.5 rounded border border-[#B98135]/20">
                {metrics.pendingDispatch} pending
              </span>
              <span className="text-xs text-gray-500">cold-chain dispatch</span>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-[#050505] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">TOTAL PRODUCTS</span>
            <div className="w-8 h-8 rounded bg-[#B98135]/10 border border-[#B98135]/20 flex items-center justify-center text-[#B98135] group-hover:scale-105 transition-transform">
              <FlaskConical size={18} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-3xl text-white font-bold tracking-tight leading-none">{metrics.totalProducts}</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{metrics.lyophilizedBatches} lyophilized</span>
              <span className="text-xs text-gray-500">batches in stock</span>
            </div>
          </div>
        </div>

        {/* Top Selling Card */}
        <div className="bg-[#050505] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">TOP SELLING</span>
            <div className="w-8 h-8 rounded bg-[#B98135]/10 border border-[#B98135]/20 flex items-center justify-center text-[#B98135] group-hover:scale-105 transition-transform">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-3xl text-[#B98135] font-bold tracking-tight leading-none">{metrics.topSelling}</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{metrics.topSellingVials} vials</span>
              <span className="text-xs text-gray-500">sold this cycle</span>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION (SPLIT 2/3 and 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Recent Orders */}
        <div className="lg:col-span-8 bg-[#050505] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex flex-col">
              <h2 className="text-lg text-white font-semibold tracking-tight">Recent Orders</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">LATEST CLINICAL & RESEARCH TRANSACTIONS</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0a0a0a] border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:border-[#B98135] hover:text-[#B98135] transition-all cursor-pointer">
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
          
          <div className="w-full overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">ORDER ID</th>
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">CUSTOMER NAME</th>
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">DATE</th>
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">TOTAL</th>
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500">STATUS</th>
                  <th className="py-3 px-3 text-[10px] font-bold tracking-widest uppercase text-gray-500 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-white">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors cursor-pointer">
                    <td className="py-3 px-3 text-[#B98135] font-semibold">{order.id}</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{order.name}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{order.lab}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-400">{order.date}</td>
                    <td className="py-3 px-3 font-medium text-white">{order.total}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-widest uppercase ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button className="text-gray-500 hover:text-[#B98135] transition-colors cursor-pointer"><Edit size={16} /></button>
                        <button className="text-gray-500 hover:text-white transition-colors cursor-pointer"><Eye size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Showing {recentOrders.length} active orders</span>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B98135] hover:text-white uppercase tracking-widest transition-colors cursor-pointer">
              <span>View All Orders</span>
            </Link>
          </div>
        </div>

        {/* RIGHT PANEL: Quick Actions & Top Products */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Quick Action Buttons */}
          <div className="bg-[#050505] border border-white/10 rounded-xl p-5 shadow-sm">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">QUICK DISPATCH ACTIONS</span>
            <div className="flex flex-col gap-3">
              <Link href="/admin/products" className="w-full bg-[#B98135] hover:bg-[#a6732f] text-black text-sm font-semibold rounded py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <PlusCircle size={18} />
                <span className="tracking-wide">Add New Product</span>
              </Link>
              <Link href="/admin/research" className="w-full bg-[#0a0a0a] border border-[#B98135]/50 text-[#B98135] hover:bg-[#B98135]/10 text-sm font-semibold rounded py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <FileText size={18} />
                <span className="tracking-wide">Add Research Article</span>
              </Link>
            </div>
          </div>

          {/* Top Products Card */}
          <div className="bg-[#050505] border border-white/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex flex-col">
                <h3 className="text-base text-white font-semibold tracking-tight">Top Performing Products</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">BY UNIT VOLUME</span>
              </div>
              <BarChart2 size={20} className="text-gray-500" />
            </div>
            
            <div className="flex flex-col divide-y divide-white/5 mt-2">
              {topProducts.map((product, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                       <span className="text-xs text-gray-600">Img</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white truncate">{product.name}</span>
                      <span className="text-[9px] font-bold text-[#B98135] truncate tracking-wider">{product.batch}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{product.stats}</span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded bg-[#0a0a0a] border border-white/10 text-gray-500 hover:text-[#B98135] hover:border-[#B98135]/40 transition-colors flex-shrink-0 cursor-pointer">
                    <Edit size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 bg-white/5 px-3 py-2 rounded">
              <Snowflake size={14} className="text-[#B98135]" />
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase truncate">
                All cold storage units at optimal -20°C.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}