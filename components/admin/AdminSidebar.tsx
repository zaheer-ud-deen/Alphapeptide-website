'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FlaskConical, Package, MessageCircleQuestion, Lock, Settings,FileSignature } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: FlaskConical },
    { name: 'Orders', href: '/admin/orders', icon: Package, badge: '12' },
    { name: 'Lab Results', href: '/admin/lab-results', icon: FileSignature }, // NEW
    { name: 'FAQs', href: '/admin/faqs', icon: MessageCircleQuestion },
    { name: 'Research Vault', href: '/admin/research', icon: Lock },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-white/10 z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="h-16 px-4 border-b border-white/10 flex items-center gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold tracking-widest text-[#B98135] uppercase truncate">ALPHA PEPTIDE ADMIN</span>
            <span className="text-[9px] leading-tight tracking-widest text-gray-500 uppercase truncate">RESEARCH & CLINICAL</span>
          </div>
        </div>
        
        <div className="px-4 pt-6 pb-2">
          <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">SYSTEM NAVIGATION</span>
        </div>
        
        <nav className="flex flex-col px-2 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-colors ${isActive ? 'bg-[#B98135]/10 text-[#B98135] border-l-2 border-[#B98135]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? 'text-[#B98135]' : 'text-gray-400'} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[#B98135] text-[10px] font-bold tracking-widest leading-none border border-white/10">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase truncate">SYSTEM SECURE • 99.9% UPTIME</span>
        </div>
      </div>
    </aside>
  );
}