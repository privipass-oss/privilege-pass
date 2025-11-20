
import React, { useState } from 'react';
import { LogOut, Copy, DollarSign, Clock, CheckCircle, Link as LinkIcon, TrendingUp, Download, Image, FileText, Share2 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { MOCK_TRANSACTIONS, LOGO_URL } from '../constants';
import { Partner, MarketingAsset } from '../types';

interface PartnerAreaProps {
  onLogout: () => void;
  partner?: Partner; 
  marketingAssets?: MarketingAsset[]; // Dynamic assets
}

export const PartnerArea: React.FC<PartnerAreaProps> = ({ onLogout, partner, marketingAssets = [] }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketing'>('dashboard');
  const [copied, setCopied] = useState(false);
  
  const partnerCode = partner?.couponCode || "SEU_CODIGO";
  const partnerLink = `privilegepass.com/?ref=${partnerCode}`;
  const totalEarned = partner?.totalEarned || 0;
  const totalSales = partner?.totalSales || 0;
  const nextPayout = 139.55; 

  const handleCopy = () => {
    navigator.clipboard.writeText(partnerLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  
  const handleCopyCopy = (text: string) => {
     navigator.clipboard.writeText(text);
     alert('Texto copiado!');
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
       <header className="bg-zinc-900/50 backdrop-blur border-b border-white/5 sticky top-0 z-40">
         <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded border border-gold-500/50 object-cover" />
                <span className="font-bold text-lg tracking-tight">
                    Parceiro <span className="text-gold-500">Privilege</span>
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-white">{partner?.name || 'Parceiro'}</p>
                    <p className="text-xs text-gold-500 uppercase tracking-wider">{partner?.category || 'Afiliado'}</p>
                </div>
                <img src={partner?.avatarUrl || "https://ui-avatars.com/api/?name=P"} className="w-10 h-10 rounded-full border border-white/10" />
                <button onClick={onLogout} className="text-zinc-500 hover:text-white ml-2"><LogOut size={20}/></button>
            </div>
         </div>
       </header>

       <main className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
          
          {partner?.status === 'Pendente' && (
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-8 flex items-center gap-3 text-blue-400">
                  <Clock size={20} />
                  <span>Seu cadastro está em análise. Em breve você poderá realizar saques e ver relatórios completos.</span>
              </div>
          )}

          {/* Tab Switcher */}
          <div className="flex gap-6 mb-8 border-b border-white/5">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-gold-500 text-gold-500' : 'border-transparent text-zinc-500 hover:text-white'}`}
              >
                  Painel Financeiro
              </button>
              <button 
                onClick={() => setActiveTab('marketing')}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'marketing' ? 'border-gold-500 text-gold-500' : 'border-transparent text-zinc-500 hover:text-white'}`}
              >
                  Materiais de Divulgação
              </button>
          </div>

          {activeTab === 'dashboard' && (
            <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <GlassCard className="relative overflow-hidden border-emerald-500/30 bg-emerald-500/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">A Receber (24h)</p>
                                <h3 className="text-3xl font-bold text-white mt-1">R$ {nextPayout.toFixed(2)}</h3>
                                <p className="text-zinc-400 text-xs mt-2 flex items-center gap-1"><Clock size={12} /> Cairá amanhã automaticamente</p>
                            </div>
                            <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-xl">
                                <Clock size={24} />
                            </div>
                        </div>
                    </GlassCard>
                    
                    <GlassCard>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Pago</p>
                                <h3 className="text-3xl font-bold text-white mt-1">R$ {totalEarned.toFixed(2)}</h3>
                                <p className="text-zinc-400 text-xs mt-2">Histórico vitalício</p>
                            </div>
                            <div className="p-3 bg-white/5 text-white rounded-xl">
                                <CheckCircle size={24} />
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Vendas Totais</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{totalSales}</h3>
                                <p className="text-gold-500 text-xs mt-2 font-bold">+3 hoje</p>
                            </div>
                            <div className="p-3 bg-gold-500/10 text-gold-500 rounded-xl">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Tools */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <GlassCard className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><LinkIcon size={18} className="text-gold-500"/> Seu Link de Vendas</h3>
                        <p className="text-zinc-400 text-sm mb-4">Compartilhe este link. Qualquer compra feita através dele gera comissão automática para você.</p>
                        
                        <div className="flex items-center bg-zinc-950 border border-white/10 rounded-xl p-2 pr-4">
                            <div className="bg-zinc-800 px-4 py-2 rounded-lg text-zinc-400 text-sm mr-3 border border-white/5">HTTPS</div>
                            <input type="text" readOnly value={partnerLink} className="flex-1 bg-transparent text-white font-mono text-sm outline-none" />
                            <button 
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-gold-500 font-bold text-sm hover:text-white transition-colors"
                            >
                            {copied ? <CheckCircle size={16}/> : <Copy size={16} />} {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-lg font-bold text-white mb-4">Meu Cupom</h3>
                        <div className="bg-gradient-gold p-1 rounded-xl">
                        <div className="bg-black rounded-lg p-6 text-center border border-dashed border-gold-500/50">
                            <p className="text-gold-500 font-bold text-2xl tracking-widest uppercase">{partnerCode}</p>
                            <p className="text-zinc-500 text-xs mt-2 uppercase">5% de Desconto para seu cliente</p>
                        </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Transaction Feed */}
                <h3 className="text-xl font-bold text-white mb-6">Extrato Financeiro</h3>
                <div className="space-y-4">
                    {MOCK_TRANSACTIONS.map((t) => (
                        <GlassCard key={t.id} className="flex items-center justify-between group" noPadding>
                        <div className="p-6 flex items-center gap-4">
                            <div className={`p-3 rounded-full ${t.status === 'Pago' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                {t.status === 'Pago' ? <CheckCircle size={20} /> : <Clock size={20} />}
                            </div>
                            <div>
                                <p className="text-white font-bold">{t.productName}</p>
                                <p className="text-zinc-500 text-sm">Cliente: {t.customerName} • {t.date}</p>
                            </div>
                        </div>
                        <div className="p-6 text-right">
                            <p className="text-emerald-400 font-bold text-lg">+ R$ {t.commissionValue.toFixed(2)}</p>
                            <p className={`text-xs font-bold uppercase tracking-wide ${t.status === 'Pago' ? 'text-zinc-500' : 'text-amber-500'}`}>
                                {t.status === 'Pago' ? 'Pago' : `Previsto: ${t.scheduledDate}`}
                            </p>
                        </div>
                        </GlassCard>
                    ))}
                </div>
            </>
          )}

          {activeTab === 'marketing' && (
              <div className="space-y-8">
                  <div>
                      <h2 className="text-3xl font-bold text-white">Kit de Divulgação</h2>
                      <p className="text-zinc-400 mt-2">Use estes materiais oficiais para vender mais e parecer mais profissional.</p>
                  </div>

                  {marketingAssets.length === 0 ? (
                      <div className="p-12 border border-white/5 rounded-3xl text-center text-zinc-500">
                          Ainda não há materiais disponíveis. Fale com o suporte.
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {marketingAssets.map(asset => (
                             <GlassCard key={asset.id} className="flex flex-col h-full">
                                 <div className="flex items-start justify-between mb-4">
                                     <h3 className="font-bold text-white leading-tight flex-1 pr-2">{asset.title}</h3>
                                     <span className="text-[10px] font-bold bg-zinc-800 px-2 py-1 rounded text-gold-500 uppercase">{asset.category}</span>
                                 </div>
                                 
                                 {asset.type === 'Image' && (
                                     <div className="bg-zinc-900 rounded-xl aspect-video overflow-hidden mb-4 relative group cursor-pointer border border-white/5">
                                         <img src={asset.thumbnail || asset.url} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all" />
                                     </div>
                                 )}
                                 
                                 {asset.type === 'Text' && (
                                     <div className="bg-zinc-900 p-4 rounded-xl border border-white/5 mb-4 text-sm text-zinc-300 italic line-clamp-4">
                                         "{asset.content}"
                                     </div>
                                 )}

                                 {asset.type === 'PDF' && (
                                     <div className="bg-zinc-900 p-6 rounded-xl border border-white/5 mb-4 flex items-center justify-center text-red-500">
                                         <FileText size={40} />
                                     </div>
                                 )}
                                 
                                 <div className="mt-auto">
                                     <p className="text-zinc-500 text-xs mb-4 h-8 line-clamp-2">{asset.description}</p>
                                     {asset.type === 'Text' ? (
                                         <button onClick={() => handleCopyCopy(asset.content || '')} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                             <Copy size={14} /> Copiar Texto
                                         </button>
                                     ) : (
                                         <button onClick={() => alert('Download iniciado!')} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                             <Download size={14} /> Baixar Arquivo
                                         </button>
                                     )}
                                 </div>
                             </GlassCard>
                          ))}
                      </div>
                  )}
              </div>
          )}
       </main>
    </div>
  );
};
