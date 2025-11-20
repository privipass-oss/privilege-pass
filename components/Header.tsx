
import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { ViewState, AdminUser } from '../types';

interface HeaderProps {
    onNavigate?: (view: ViewState) => void;
    adminProfile?: Partial<AdminUser>;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, adminProfile }) => {
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-slate-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
      
      {/* Search Bar */}
      <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-full px-4 py-2 w-96 focus-within:border-amber-500/50 focus-within:bg-slate-900 transition-all">
        <Search size={18} className="text-slate-500" />
        <input 
          type="text" 
          placeholder="Buscar membro, transação ou acesso..." 
          className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 ml-3 w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-slate-950"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <button 
          onClick={() => onNavigate && onNavigate('settings')}
          className="flex items-center gap-3 cursor-pointer group outline-none"
        >
          <img 
            src={adminProfile?.avatarUrl || "https://ui-avatars.com/api/?name=Admin&background=random"} 
            alt="Admin" 
            className="w-10 h-10 rounded-full border-2 border-amber-500/30 group-hover:border-amber-500 transition-colors object-cover"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{adminProfile?.name || 'Admin Principal'}</p>
            <p className="text-xs text-slate-400">{adminProfile?.role || 'Privilege Manager'}</p>
          </div>
          <ChevronDown size={16} className="text-slate-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
};
