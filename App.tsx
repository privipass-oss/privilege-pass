
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MembersList } from './components/MembersList';
import { Concierge } from './components/Concierge';
import { Settings } from './components/Settings';
import { Analytics } from './components/Analytics';
import { PartnersManager } from './components/PartnersManager';
import { BenefitsManager } from './components/BenefitsManager';
import { ProductManager } from './components/ProductManager';
import { MarketingManager } from './components/MarketingManager';
import { FAQManager } from './components/FAQManager';
import { TravelHub } from './components/TravelHub';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SupportPage } from './components/SupportPage';
import { AuthScreen } from './components/AuthScreen';
import { ClientArea } from './components/ClientArea';
import { PartnerRegistration } from './components/PartnerRegistration';
import { PartnerArea } from './components/PartnerArea';
import { AppMode, ViewState, PartnerBenefit, Partner, Customer, VoucherPack, MarketingAsset, FAQItem } from './types';
import { ShieldCheck } from 'lucide-react';
import { PARTNER_BENEFITS, MOCK_PARTNERS, LOGO_URL, MOCK_CUSTOMERS, VOUCHER_PACKS, MOCK_MARKETING_ASSETS, INITIAL_FAQS } from './constants';

// Helper para carregar do LocalStorage com fallback
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.warn(`Erro ao carregar ${key} do storage`, e);
    return fallback;
  }
};

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('LANDING');
  const [adminView, setAdminView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  
  // --- STATE COM PERSISTÊNCIA (LOCAL STORAGE) ---
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [benefits, setBenefits] = useState<PartnerBenefit[]>(() => 
    loadFromStorage('pp_benefits', PARTNER_BENEFITS)
  );
  const [partners, setPartners] = useState<Partner[]>(() => 
    loadFromStorage('pp_partners', MOCK_PARTNERS)
  );
  const [customers, setCustomers] = useState<Customer[]>(() => 
    loadFromStorage('pp_customers', MOCK_CUSTOMERS)
  );
  const [products, setProducts] = useState<VoucherPack[]>(() => 
    loadFromStorage('pp_products', VOUCHER_PACKS)
  );
  const [marketingAssets, setMarketingAssets] = useState<MarketingAsset[]>(() => 
    loadFromStorage('pp_marketing', MOCK_MARKETING_ASSETS)
  );
  const [faqItems, setFaqItems] = useState<FAQItem[]>(() => 
    loadFromStorage('pp_faq', INITIAL_FAQS)
  );

  // Salvar automaticamente no Storage
  useEffect(() => { localStorage.setItem('pp_benefits', JSON.stringify(benefits)); }, [benefits]);
  useEffect(() => { localStorage.setItem('pp_partners', JSON.stringify(partners)); }, [partners]);
  useEffect(() => { localStorage.setItem('pp_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('pp_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('pp_marketing', JSON.stringify(marketingAssets)); }, [marketingAssets]);
  useEffect(() => { localStorage.setItem('pp_faq', JSON.stringify(faqItems)); }, [faqItems]);

  // Persistência da Sessão
  useEffect(() => {
      const savedSession = localStorage.getItem('pp_session');
      if (savedSession) {
          try {
              const session = JSON.parse(savedSession);
              if (session.user && session.mode) {
                  if (session.mode === 'CLIENT_AREA') {
                      const freshUser = customers.find(c => c.id === session.user.id);
                      if (freshUser) setCurrentUser(freshUser);
                      else setCurrentUser(session.user);
                  } else {
                      setCurrentUser(session.user);
                  }
                  setAppMode(session.mode);
              }
          } catch (e) {
              localStorage.removeItem('pp_session');
          }
      }
      
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 1500);
      return () => clearTimeout(timer);
  }, []); 

  useEffect(() => {
      if (currentUser && appMode !== 'LANDING' && appMode !== 'AUTH' && appMode !== 'SUPPORT') {
          localStorage.setItem('pp_session', JSON.stringify({ mode: appMode, user: currentUser }));
      }
  }, [currentUser, appMode]);

  // Handlers
  const handleGetStarted = () => setAppMode('AUTH');
  
  const handleAuthenticated = (role: 'client' | 'admin' | 'partner', user?: any) => {
    if (role === 'admin') {
      setCurrentUser(user);
      setAppMode('ADMIN_DASHBOARD');
    } else if (role === 'partner') {
      setCurrentUser(user);
      setAppMode('PARTNER_DASHBOARD');
    } else {
      // CLIENT LOGIC
      const existingCustomer = customers.find(c => c.email.toLowerCase() === user.email.toLowerCase());
      
      if (existingCustomer) {
        setCurrentUser(existingCustomer);
      } else {
        const newCustomer: Customer = {
            id: Date.now().toString(),
            name: user.name || 'Novo Cliente',
            email: user.email,
            password: user.password,
            phone: user.phone || '',
            avatarUrl: `https://ui-avatars.com/api/?name=${user.name}&background=random`,
            totalSpend: 0,
            location: 'Brasil',
            lastPurchaseDate: '-',
            activeVouchers: [],
            dragonPassId: 'PENDENTE'
        };
        setCustomers(prev => [newCustomer, ...prev]);
        setCurrentUser(newCustomer);
      }
      setAppMode('CLIENT_AREA');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pp_session');
    setAppMode('LANDING');
    setAdminView('dashboard');
    setCurrentUser(null);
  };

  // --- CUSTOMER MANAGEMENT (CRUD) ---
  const handleAddCustomer = (newCustomer: Partial<Customer>) => {
      const customer: Customer = {
          id: Date.now().toString(),
          name: newCustomer.name || 'Novo Cliente',
          email: newCustomer.email || '',
          password: newCustomer.password || '123456',
          phone: newCustomer.phone,
          avatarUrl: `https://ui-avatars.com/api/?name=${newCustomer.name}&background=random`,
          totalSpend: 0,
          location: 'Brasil',
          lastPurchaseDate: '-',
          activeVouchers: [],
          dragonPassId: 'PENDENTE'
      };
      setCustomers(prev => [customer, ...prev]);
  };

  const handleUpdateCustomer = (id: string, data: Partial<Customer>) => {
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
      if (currentUser && currentUser.id === id) {
          setCurrentUser((prev: any) => ({ ...prev, ...data }));
      }
  };

  const handleDeleteCustomer = (id: string) => {
      console.log(`[APP DEBUG] Deletando cliente ID: ${id}`);
      setCustomers(prevCustomers => {
          const newCustomers = prevCustomers.filter(c => String(c.id) !== String(id));
          return newCustomers;
      });
  };

  // --- PRODUCT MANAGEMENT ---
  const handleUpdateProduct = (updatedProduct: VoucherPack) => {
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  // --- PARTNER FLOW HANDLERS ---
  const handlePartnerRegister = () => setAppMode('PARTNER_REGISTER');
  
  const handlePartnerRegisterSubmit = (newPartnerData: any) => {
    const newPartner: Partner = {
        id: Date.now().toString(),
        ...newPartnerData,
        status: 'Pendente',
        totalSales: 0,
        totalEarned: 0,
        commissionType: newPartnerData.category === 'Motorista' ? 'Fixed' : 'Percentage',
        commissionValue: newPartnerData.category === 'Motorista' ? 50 : 10,
        // couponCode comes pre-formatted from registration now
        avatarUrl: `https://ui-avatars.com/api/?name=${newPartnerData.name}&background=random`
    };
    
    setPartners([...partners, newPartner]);
    setCurrentUser(newPartner);
    setAppMode('PARTNER_DASHBOARD');
  };

  const handlePartnerLoginClick = () => setAppMode('AUTH'); 

  // --- ADMIN PARTNER MANAGEMENT ---
  const handleUpdatePartnerStatus = (id: string, status: 'Ativo' | 'Bloqueado') => {
     setPartners(partners.map(p => p.id === id ? { ...p, status } : p));
  };

  // --- BENEFITS MANAGEMENT ---
  const handleAddBenefit = (benefit: PartnerBenefit) => {
    setBenefits([...benefits, benefit]);
  };
  const handleRemoveBenefit = (id: string) => {
    setBenefits(benefits.filter(b => b.id !== id));
  };

  // --- MARKETING MANAGEMENT ---
  const handleAddMarketingAsset = (asset: MarketingAsset) => {
      setMarketingAssets([...marketingAssets, asset]);
  };
  const handleRemoveMarketingAsset = (id: string) => {
      setMarketingAssets(marketingAssets.filter(a => a.id !== id));
  };

  // --- FAQ MANAGEMENT ---
  const handleAddFAQ = (item: FAQItem) => {
      setFaqItems([...faqItems, item]);
  };
  const handleUpdateFAQ = (item: FAQItem) => {
      setFaqItems(faqItems.map(f => f.id === item.id ? item : f));
  };
  const handleRemoveFAQ = (id: string) => {
      setFaqItems(faqItems.filter(f => f.id !== id));
  };

  // Boot Screen
  if (isBooting) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black"></div>
         <div className="z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] mb-8 overflow-hidden border border-gold-500/30">
               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white tracking-widest mb-2">PRIVILEGE PASS</h1>
            <div className="flex items-center gap-2 text-amber-500/80 text-xs uppercase tracking-[0.2em] font-mono">
               <ShieldCheck size={12} />
               System Initializing...
            </div>
            <div className="mt-8 w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
               <div className="h-full bg-amber-500 w-full animate-[translateX_1.5s_ease-in-out_infinite] origin-left transform scale-x-50"></div>
            </div>
         </div>
         <div className="absolute bottom-10 text-zinc-600 text-[10px] font-mono">
            v3.2.0 • Storage Active
         </div>
      </div>
    );
  }

  // Render Logic
  if (appMode === 'LANDING') {
    return <LandingPage 
        onGetStarted={handleGetStarted} 
        onPartnerClick={handlePartnerRegister} 
        onPartnerLogin={handlePartnerLoginClick} 
        products={products}
        faqItems={faqItems}
        onViewSupport={() => setAppMode('SUPPORT')} // Add navigation
    />;
  }

  if (appMode === 'SUPPORT') {
      return <SupportPage items={faqItems} onBack={() => setAppMode('LANDING')} />;
  }

  if (appMode === 'AUTH') {
    return (
        <AuthScreen 
            onAuthenticated={handleAuthenticated} 
            onBack={() => setAppMode('LANDING')} 
            partners={partners} 
            customers={customers} 
        />
    );
  }

  if (appMode === 'CLIENT_AREA') {
    return <ClientArea onLogout={handleLogout} user={currentUser} benefits={benefits} onUpdateUser={handleUpdateCustomer} faqItems={faqItems} />;
  }

  if (appMode === 'PARTNER_REGISTER') {
    return <PartnerRegistration onBack={() => setAppMode('LANDING')} onRegisterSuccess={handlePartnerRegisterSubmit} onLoginClick={handleGetStarted} />;
  }

  if (appMode === 'PARTNER_DASHBOARD') {
    return <PartnerArea onLogout={handleLogout} partner={currentUser} marketingAssets={marketingAssets} />;
  }

  const renderAdminContent = () => {
    switch (adminView) {
      case 'dashboard': return <Dashboard onChangeView={setAdminView} />;
      case 'members': return (
         <MembersList 
            customers={customers} 
            products={products}
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
         />
      );
      case 'products': return (
         <ProductManager 
            products={products} 
            onUpdateProduct={handleUpdateProduct} 
         />
      );
      case 'analytics': return <Analytics />;
      case 'partners': return <PartnersManager partners={partners} onUpdateStatus={handleUpdatePartnerStatus} />;
      case 'benefits': return <BenefitsManager benefits={benefits} onAdd={handleAddBenefit} onRemove={handleRemoveBenefit} />;
      case 'marketing': return <MarketingManager assets={marketingAssets} onAdd={handleAddMarketingAsset} onRemove={handleRemoveMarketingAsset} />;
      case 'concierge': return <Concierge />;
      case 'settings': return <Settings />;
      case 'faq': return <FAQManager items={faqItems} onAdd={handleAddFAQ} onUpdate={handleUpdateFAQ} onRemove={handleRemoveFAQ} />;
      case 'travel-hub': return (
        <div className="p-8 h-full overflow-y-auto pb-20">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Rede Credenciada & Tools</h2>
          <TravelHub />
        </div>
      );
      default: return <Dashboard onChangeView={setAdminView} />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-zinc-200 overflow-hidden font-sans selection:bg-amber-500/30 animate-fade-in">
      <Sidebar 
        currentView={adminView} 
        onChangeView={setAdminView} 
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col md:ml-72 h-full relative z-0 transition-all duration-300">
        <div className="fixed top-[-20%] right-[0%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none z-[-1]" />
        <div className="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-[-1]" />
        
        <div className="md:hidden absolute top-5 left-4 z-50">
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-2 bg-zinc-800/50 backdrop-blur rounded-lg border border-white/10 shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
           </button>
        </div>

        <Header onNavigate={setAdminView} />
        
        <main className="flex-1 overflow-y-auto p-0 scroll-smooth custom-scrollbar relative">
           <button 
             onClick={handleLogout}
             className="absolute bottom-4 right-4 z-50 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-xs font-bold border border-red-500/20 backdrop-blur-md md:hidden"
           >
             Sair
           </button>
          {renderAdminContent()}
        </main>
      </div>
    </div>
  );
}
