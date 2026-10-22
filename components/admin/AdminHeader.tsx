import { Search, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#030303]/90 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-white tracking-tight">System Command Console</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">SYSTEM PORTAL • LIVE SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-gray-500 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search compound, batch ID..." 
            className="bg-[#0a0a0a] border border-white/10 text-white text-sm pl-9 pr-4 py-1.5 rounded focus:outline-none focus:border-[#B98135] placeholder:text-gray-600 w-56 transition-all"
          />
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B98135] ring-2 ring-[#030303] animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B98135] ring-2 ring-[#030303]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-[#B98135]/40 flex items-center justify-center text-xs font-bold">
            ER
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm text-white font-semibold leading-tight">Dr. Evelyn Reed</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead Admin / Lab Director</span>
          </div>
        </div>
        
        <Link href="/" className="flex items-center gap-1 px-3 py-1.5 rounded border border-white/20 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 ml-2">
          <LogOut size={14} />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
}