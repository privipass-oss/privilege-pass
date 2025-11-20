
import React from 'react';
import { LayoutDashboard, ShoppingBag, Plane, Settings, LogOut, BarChart3, Users, Gift, Tag, Megaphone, HelpCircle } from 'lucide-react';
import { MENU_ITEMS, LOGO_URL } from '../constants';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileOpen = false, setIsMobileOpen, onLogout }) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard size={22} />;
      case 'ShoppingBag': return <ShoppingBag size={22} />;
      case 'Plane': return <Plane size={22} />;
      case 'BarChart3': return <BarChart3 size={22} />;
      case 'Settings': return <Settings size={22} />;
      case 'Users': return <Users size={22} />;
      case 'Gift': return <Gift size={22} />;
      case 'Tag': return <Tag size={22} />;
      case 'Megaphone': return <Megaphone size={22} />;
      case 'HelpCircle': return <HelpCircle size={22} />;
      default: return <LayoutDashboard size={22} />;
    }
  };

  return (
    <>
       {/* Mobile Overlay */}
       {isMobileOpen && (
         <div 
           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
           onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
         ></div>
       )}

      <aside className={`
        fixed left-0 top-0 h-full w-72 bg-black border-r border-white/5 flex flex-col z-50 shadow-2xl shadow-black transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8 border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-transparent relative">
           {isMobileOpen && (
             <button 
               onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
               className="absolute right-4 top-4 text-zinc-500 hover:text-white md:hidden"
             >
               ✕
             </button>
           )}
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.3)] mr-4 flex-shrink-0 border border-gold-500/50">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-tight">PRIVILEGE</h1>
            <span className="text-[10px] text-amber-500 font-bold tracking-[0.3em] uppercase block mt-0.5">Pass Global</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">Gestão Geral</p>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChangeView(item.id as ViewState);
                if (isMobileOpen && setIsMobileOpen) setIsMobileOpen(false);
              }}
              className={`
                relative w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-500 group overflow-hidden
                ${currentView === item.id 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-zinc-200'
                }
              `}
            >
              {/* Active Background glow */}
              {currentView === item.id && (
                 <div className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl"></div>
              )}

              <span className={`relative z-10 transition-colors duration-300 ${currentView === item.id ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' : 'group-hover:text-white'}`}>
                {getIcon(item.icon)}
              </span>
              <span className="relative z-10 font-medium tracking-wide text-sm">{item.label}</span>
              
              {item.id === 'concierge' && (
                <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#eab308] animate-pulse"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-white/5 bg-zinc-950/50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="font-medium text-sm">Sair</span>
            </div>
          </button>
          <div className="mt-4 text-center">
            <p className="text-[10px] text-zinc-700">v3.1 • Dragon Pass Integration</p>
          </div>
        </div>
      </aside>
    </>
  );
};
