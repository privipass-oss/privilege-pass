
import React, { useState, useEffect } from 'react';
import { LogOut, QrCode, CheckCircle, MessageCircle, CreditCard, Sparkles, Plane, Smartphone, Gift, Copy, AlertTriangle, Lock, Printer, X, ZoomIn, Loader2, Download, HelpCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { TravelHub } from './TravelHub';
import { Concierge } from './Concierge';
import { HelpCenter } from './HelpCenter';
import { VOUCHER_PACKS, PARTNER_BENEFITS, LOGO_URL, INITIAL_FAQS } from '../constants';
import { VoucherPack, VoucherType, Customer, PartnerBenefit, FAQItem } from '../types';
import { VoucherArt } from './ui/VoucherArt';
import { createMercadoPagoPreference } from '../services/paymentService';
import html2canvas from 'html2canvas';

interface ClientAreaProps {
  onLogout: () => void;
  user?: Customer; 
  benefits?: PartnerBenefit[];
  onUpdateUser?: (id: string, data: Partial<Customer>) => void;
  faqItems?: FAQItem[]; // Add FAQ Items prop
}

export const ClientArea: React.FC<ClientAreaProps> = ({ onLogout, user, benefits = PARTNER_BENEFITS, onUpdateUser, faqItems = INITIAL_FAQS }) => {
  const [activeTab, setActiveTab] = useState<'my-vouchers' | 'buy' | 'travel-hub' | 'concierge' | 'benefits' | 'help'>('buy');
  const [activeCategory, setActiveCategory] = useState<VoucherType>('Internacional');
  const [notification, setNotification] = useState<string | null>(null);
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [viewVoucher, setViewVoucher] = useState<any | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // --- LAYOUT FIX: SCROLL TO TOP ON MOUNT ---
  // Ensures the page starts at the top when transitioning from Auth/Register screens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Normalize user data
  const currentUser: Customer = user ? {
      ...user,
      activeVouchers: user.activeVouchers || (user as any).vouchers || []
  } : { 
      id: 'guest',
      name: 'Visitante', 
      email: '', 
      avatarUrl: '',
      totalSpend: 0,
      location: '',
      lastPurchaseDate: '',
      activeVouchers: [],
      vouchers: [] 
  };

  // --- PAYMENT CONFIRMATION HANDLER (AUTO RETURN) ---
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const status = query.get('status');
    const packId = query.get('pack');

    if (status === 'approved' && packId && onUpdateUser) {
        // 1. Encontrar o pacote comprado
        const pack = VOUCHER_PACKS.find(p => p.id === packId);
        
        if (pack) {
            const newVoucher = {
                id: Date.now().toString(),
                packName: pack.name,
                remainingAccess: pack.accessCount,
                totalAccess: pack.accessCount,
                status: 'Processando', // Aguardando emissão manual do QR Code
                purchaseDate: new Date().toLocaleDateString('pt-BR'),
                qrCodeUrl: '', 
                code: 'Aguardando Emissão'
            };

            // 3. Salvar no usuário
            const updatedVouchers = [...(currentUser.activeVouchers || []), newVoucher];
            onUpdateUser(currentUser.id, { activeVouchers: updatedVouchers as any });

            // 4. Notificar e Limpar URL
            setNotification('Pagamento Confirmado! Seu voucher está sendo gerado.');
            setActiveTab('my-vouchers');
            
            // Limpar query params sem recarregar
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
  }, []); // Run once on mount

  const handleBuyClick = async (pack: VoucherPack) => {
      if (!currentUser.email) {
          alert("Erro: Usuário não identificado.");
          return;
      }

      setIsRedirecting(true);
      try {
          // 1. Criar Preferência no MercadoPago
          const checkoutUrl = await createMercadoPagoPreference(pack, currentUser);
          
          // 2. Redirecionar Cliente para o Checkout Seguro do MP
          window.location.href = checkoutUrl;
          
      } catch (error) {
          console.error(error);
          alert("Erro ao conectar com MercadoPago. Verifique sua conexão.");
          setIsRedirecting(false);
      }
  };

  const calculateDiscount = (pack: VoucherPack) => {
    if (pack.accessCount === 1) return 0;
    const basePack = VOUCHER_PACKS.find(p => p.type === pack.type && p.accessCount === 1);
    if (!basePack) return 0;
    const pricePerUnitInPack = pack.price / pack.accessCount;
    const discount = ((basePack.price - pricePerUnitInPack) / basePack.price) * 100;
    return Math.round(discount);
  };

  const triggerPrint = () => {
      try {
          setTimeout(() => {
             window.focus();
             window.print();
          }, 500);
      } catch (e) {
          console.error("Erro ao imprimir:", e);
          alert("Erro ao abrir impressão. Use Ctrl+P.");
      }
  };

  const handleDownloadImage = async () => {
      const element = document.getElementById('voucher-print-area');
      if (!element) return;
      
      setIsDownloading(true);
      try {
          const canvas = await html2canvas(element, {
              useCORS: true,
              allowTaint: false,
              scale: 2,
              backgroundColor: '#000000'
          });
          
          const link = document.createElement('a');
          link.download = `Voucher-${currentUser.name}.png`;
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (err) {
          console.error(err);
          alert("Erro ao baixar. Use a opção de imprimir.");
      } finally {
          setIsDownloading(false);
      }
  };

  // Mock Wallet Add (Since real .pkpass requires backend certs)
  const handleAddToWallet = (type: 'apple' | 'google') => {
      alert(`Simulação: Adicionando ao ${type === 'apple' ? 'Apple Wallet' : 'Google Carteira'}.\n\nEm produção, isso baixaria o arquivo .pkpass assinado digitalmente.`);
      // Fallback to image download for demo
      handleDownloadImage();
  };

  if (isRedirecting) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 animate-fade-in">
              <Loader2 size={64} className="text-emerald-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">Conectando ao MercadoPago...</h2>
              <p className="text-zinc-400">Você será redirecionado para o checkout seguro.</p>
              <p className="text-zinc-500 text-sm mt-8">Não feche esta janela.</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-200 pb-20 relative">
      
      {/* VIEW VOUCHER MODAL - FIXED LAYOUT */}
      {viewVoucher && (
          <div className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto">
              {/* Use min-h-screen and py-12 to ensure scrollability and prevent cutoff */}
              <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 relative">
                  
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col md:flex-row gap-4 no-print z-50">
                      <button 
                        type="button"
                        onClick={() => setViewVoucher(null)}
                        className="px-4 py-2 bg-zinc-800 text-white font-bold rounded-full hover:bg-zinc-700 transition-colors shadow-xl flex items-center gap-2"
                      >
                          <X size={18} /> Fechar
                      </button>
                  </div>

                  <div className="flex flex-col items-center w-full max-w-lg pt-10 md:pt-0">
                      <div id="voucher-print-area" className="scale-90 md:scale-100 transform-gpu w-full mb-6">
                          <VoucherArt 
                              passengerName={currentUser.name}
                              planName={viewVoucher.packName}
                              qrCodeUrl={viewVoucher.qrCodeUrl || ''}
                              expiryDate="VALID 1 YEAR"
                              type={viewVoucher.packName.includes('Internacional') ? 'Internacional' : 'Nacional'}
                              voucherCode={viewVoucher.code}
                          />
                      </div>

                      {/* Wallet & Actions Section */}
                      <div className="w-full px-6 pb-10 space-y-4 no-print">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Apple Wallet Button */}
                              <button 
                                onClick={() => handleAddToWallet('apple')}
                                className="bg-black border border-zinc-800 text-white h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M17.837 12.234c-.02-1.83 1.497-2.72 1.566-2.764-.854-1.248-2.182-1.42-2.655-1.44-1.13-.117-2.207.666-2.78.666-.573 0-1.46-.65-2.4-.633-1.236.018-2.377.72-3.01 1.823-1.284 2.227-.33 5.526.915 7.33.61 0.883 1.337 1.875 2.29 1.84.914-.035 1.26-.59 2.365-.59 1.106 0 1.42.59 2.385.573.985-.018 1.61-.894 2.214-1.777.696-1.016.982-2.003.997-2.053-.023-.01-1.913-.734-1.886-2.923zm-2.05-5.255c.51-.617.853-1.474.76-2.33-.735.03-1.625.49-2.15 1.104-.47.54-.88 1.413-.77 2.247.82.064 1.655-.402 2.16-1.02z"/>
                                </svg>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[8px] uppercase font-bold">Add to</span>
                                    <span className="text-sm font-bold">Apple Wallet</span>
                                </div>
                              </button>

                              {/* Google Wallet Button */}
                              <button 
                                onClick={() => handleAddToWallet('google')}
                                className="bg-black border border-zinc-800 text-white h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
                              >
                                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                                    <path fill="#EA4335" d="M5.25 9.75H3v4.5h2.25v-4.5z"/>
                                    <path fill="#FBBC04" d="M8.625 9.75H6.375v4.5h2.25v-4.5z"/>
                                    <path fill="#34A853" d="M12 9.75h-2.25v4.5H12v-4.5z"/>
                                    <path fill="#4285F4" d="M15.375 9.75h-2.25v4.5h2.25v-4.5z"/>
                                    <path fill="#76777A" d="M21 12c0-3.315-2.685-6-6-6h-6c-3.315 0-6 2.685-6 6s2.685 6 6 6h6c3.315 0 6-2.685 6-6z" opacity=".2"/>
                                    <path fill="#5F6368" d="M15 18H9c-3.315 0-6-2.685-6-6s2.685-6 6-6h6c3.315 0 6 2.685 6 6s-2.685 6-6 6zm0-10.5H9C6.515 7.5 4.5 9.515 4.5 12s2.015 4.5 4.5 4.5h6c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5z"/>
                                  </svg>
                                  <div className="flex flex-col items-start leading-none">
                                    <span className="text-[8px] uppercase font-bold">Add to</span>
                                    <span className="text-sm font-bold">Google Wallet</span>
                                </div>
                              </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                              <button 
                                onClick={triggerPrint}
                                className="py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium text-xs flex flex-col items-center gap-1"
                              >
                                  <Printer size={18} /> Imprimir PDF
                              </button>
                              <button 
                                onClick={handleDownloadImage}
                                disabled={isDownloading}
                                className="py-3 bg-gradient-gold text-black hover:brightness-110 rounded-xl font-bold text-xs flex flex-col items-center gap-1"
                              >
                                  {isDownloading ? <Loader2 size={18} className="animate-spin"/> : <Download size={18} />}
                                  Baixar Imagem
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <header className="bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 w-full">
        <div className="px-6 h-20 flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
             <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded border border-gold-500/50 object-cover" />
             <span className="font-display font-bold text-xl text-white tracking-tight">PRIVILEGE <span className="text-gold-500">PASS</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-zinc-400">Olá, {currentUser.name}</span>
            <button onClick={onLogout} className="text-zinc-500 hover:text-white"><LogOut size={20} /></button>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-6 py-8 max-w-6xl mx-auto animate-fade-in w-full">
        {notification && <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 sticky top-24 z-30 backdrop-blur-md shadow-xl"><CheckCircle size={20} /> {notification}</div>}

        {/* TAB NAVIGATION */}
        <div className="flex gap-6 mb-8 border-b border-white/5 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: 'buy', label: 'Comprar Acesso', icon: CreditCard },
            { id: 'my-vouchers', label: 'Meus Vouchers', icon: QrCode },
            { id: 'concierge', label: 'Concierge', icon: MessageCircle },
            { id: 'travel-hub', label: 'Travel Hub', icon: Plane },
            { id: 'benefits', label: 'Benefícios', icon: Gift },
            { id: 'help', label: 'Ajuda / FAQ', icon: HelpCircle },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`pb-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all relative ${activeTab === tab.id ? 'text-gold-500' : 'text-zinc-500 hover:text-white'}`}>
              <tab.icon size={16} /> {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-500 shadow-[0_0_10px_#D4AF37]"></div>}
            </button>
          ))}
        </div>

        {/* CONTENT AREAS */}
        {activeTab === 'concierge' && <div className="h-[calc(100vh-200px)] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50"><Concierge /></div>}
        {activeTab === 'travel-hub' && <TravelHub />}
        {activeTab === 'help' && <HelpCenter items={faqItems} />}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {benefits.map(benefit => (
                 <GlassCard key={benefit.id} className="relative group hover:border-gold-500/50 transition-all overflow-hidden" noPadding>
                    <div className="h-32 relative">
                       <img src={benefit.image} alt={benefit.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white">{benefit.category}</div>
                    </div>
                    <div className="p-6">
                       <h3 className="text-xl font-bold text-white mb-1">{benefit.name}</h3>
                       <p className="text-gold-500 font-bold text-lg mb-3">{benefit.discount}</p>
                       <button onClick={() => { navigator.clipboard.writeText(benefit.code); setNotification(`Código copiado!`); setTimeout(() => setNotification(null), 2000); }} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"><Copy size={14} /> Copiar Código</button>
                    </div>
                 </GlassCard>
               ))}
          </div>
        )}

        {activeTab === 'my-vouchers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
             {currentUser.activeVouchers && currentUser.activeVouchers.length > 0 ? (
                 currentUser.activeVouchers.map((voucher, i) => (
                    <div 
                        key={i} 
                        onClick={() => setViewVoucher(voucher)}
                        className="cursor-pointer transform transition-transform hover:scale-[1.02] hover:brightness-110 relative group"
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 rounded-3xl pointer-events-none"></div>
                        <div className="absolute top-4 right-4 z-20 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <ZoomIn size={20} />
                        </div>
                        <VoucherArt 
                            passengerName={currentUser.name}
                            planName={voucher.packName}
                            qrCodeUrl={voucher.qrCodeUrl || ''}
                            expiryDate="VALID 1 YEAR"
                            type={voucher.packName.includes('Internacional') ? 'Internacional' : 'Nacional'}
                            voucherCode={voucher.code}
                        />
                    </div>
                 ))
             ) : (
                <div className="col-span-3 text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-zinc-500">
                    <Lock size={48} className="mb-4 opacity-50" />
                    <h3 className="text-lg font-bold text-white">Carteira Vazia</h3>
                    <p className="text-sm max-w-xs mx-auto mt-2">Você ainda não possui passes ativos. Compre agora para acessar as salas.</p>
                    <button onClick={() => setActiveTab('buy')} className="mt-6 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-sm">Ir para Loja</button>
                </div>
             )}
          </div>
        )}

        {activeTab === 'buy' && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-10">
              <div className="bg-zinc-900 p-1 rounded-xl border border-white/10 inline-flex">
                {['Internacional', 'Nacional'].map((type) => (
                  <button key={type} onClick={() => setActiveCategory(type as VoucherType)} className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeCategory === type ? 'bg-gold-500 text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {VOUCHER_PACKS.filter(p => p.type === activeCategory).map((pack) => {
                  if (pack.isActive === false) return null;
                  return (
                    <GlassCard key={pack.id} className="flex flex-col group hover:-translate-y-2 transition-transform duration-300" interactive>
                        {pack.accessCount === 4 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 z-10"><Sparkles size={12} /> Escolha Premium</div>}
                        <div className="mb-4 mt-2">
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-gold-400 transition-colors">{pack.name}</h3>
                        <p className="text-zinc-400 text-sm mt-2 h-10 leading-snug">{pack.description}</p>
                        </div>
                        <div className="py-6 border-y border-white/5 mb-6">
                        <div className="flex items-end gap-1"><span className="text-sm text-zinc-500 mb-1">R$</span><span className="text-4xl font-bold text-white">{pack.price.toFixed(0)}</span><span className="text-sm text-zinc-500 mb-1">,00</span></div>
                        {calculateDiscount(pack) > 0 && <p className="text-xs text-emerald-400 mt-2 font-bold">Economia de {calculateDiscount(pack)}% aplicada</p>}
                        </div>
                        <button 
                          onClick={() => handleBuyClick(pack)}
                          className={`w-full py-5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${pack.accessCount === 4 ? 'bg-gradient-gold text-black hover:brightness-110' : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-white/10'}`}
                        >
                           <CreditCard size={18} /> Comprar Agora
                        </button>
                        <p className="text-[10px] text-zinc-500 text-center mt-3 flex items-center justify-center gap-1">
                           <Lock size={10} /> Checkout Seguro MercadoPago
                        </p>
                    </GlassCard>
                  );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
