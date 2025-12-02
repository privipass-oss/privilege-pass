// Sidebar.tsx - OTIMIZADO
import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, Plane, Settings, LogOut, 
  BarChart3, Users, Gift, Tag, Megaphone, HelpCircle, Mail 
} from 'lucide-react';
import { MENU_ITEMS, LOGO_URL } from '../constants';
import { ViewState, AdminUser } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  onLogout?: () => void;
  currentUser?: AdminUser;
}

// ✅ NOVO: Mapa de ícones (substitui switch statement)
const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
  Plane: <Plane size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Settings: <Settings size={20} />,
  Users: <Users size={20} />,
  Gift: <Gift size={20} />,
  Tag: <Tag size={20} />,
  Megaphone: <Megaphone size={20} />,
  HelpCircle: <HelpCircle size={20} />,
  Mail: <Mail size={20} />,
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, onChangeView, isMobileOpen = false, 
  setIsMobileOpen, onLogout, currentUser 
}) => {
  const role = currentUser?.role || 'Admin';

  // ✅ REFATORADO: Mapeamento de permissões
  const ROLE_PERMISSIONS: Record<string, string[]> = {
    'Suporte': ['dashboard', 'members', 'concierge', 'faq', 'travel-hub', 'benefits'],
    'Financeiro': ['dashboard', 'products', 'analytics', 'partners', 'marketing', 'email'],
    'Admin': MENU_ITEMS.map(i => i.id),
  };

  const permittedIds = ROLE_PERMISSIONS[role] || [];
  const filteredMenu = MENU_ITEMS.filter(item => permittedIds.includes(item.id));

  // ✅ OTIMIZADO: Ícones agora vêm de mapa
  const getIcon = (iconName: string) => ICON_MAP[iconName] || ICON_MAP.LayoutDashboard;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 h-screen bg-gradient-to-b from-zinc-900 to-black border-r border-white/5 
        flex flex-col transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:sticky left-0 top-0 z-40
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <img src={LOGO_URL} alt="Privilege Pass" className="h-8" />
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredMenu.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onChangeView(item.id as ViewState);
                setIsMobileOpen && setIsMobileOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${currentView === item.id
                  ? 'bg-gradient-gold text-black font-bold shadow-lg'
                  : 'text-zinc-400 hover:bg-white/5'
                }
              `}
            >
              {getIcon(item.icon)}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};
