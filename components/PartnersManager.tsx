
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { MOCK_TRANSACTIONS } from '../constants';
import { Partner, PartnerTransaction } from '../types';
import { CheckCircle, DollarSign, Clock, Settings, Phone, Instagram, UserPlus, Ban, Check, Filter, Download, FileText, TrendingUp } from 'lucide-react';

interface PartnersManagerProps {
  partners?: Partner[];
  onUpdateStatus?: (id: string, status: 'Ativo' | 'Bloqueado') => void;
}

export const PartnersManager: React.FC<PartnersManagerProps> = ({ partners = [], onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'history' | 'requests' | 'list'>('payments');
  
  // State for Transactions to allow updates
  const [transactions, setTransactions] = useState<PartnerTransaction[]>(MOCK_TRANSACTIONS);
  
  // State for History Filter
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('all');

  // Derived Lists
  const pendingPayments = transactions.filter(t => t.status === 'Agendado');
  const paidHistory = transactions.filter(t => t.status === 'Pago');
  const pendingRequests = partners.filter(p => p.status === 'Pendente');

  // Calculate totals for Pending
  const pendingTotal = pendingPayments.reduce((acc, curr) => acc + curr.commissionValue, 0);

  // Action Handlers
  const handleConfirmPayment = (id: string) => {
    const confirm = window.confirm("Confirma que realizou este PIX? A transação será movida para o histórico.");
    if (confirm) {
        setTransactions(prev => prev.map(t => 
            t.id === id ? { ...t, status: 'Pago', date: 'Hoje' } : t
        ));
    }
  };

  const handleContact = (type: 'whatsapp' | 'instagram', value: string) => {
      if(type === 'whatsapp') {
          window.open(`https://wa.me/55${value.replace(/\D/g,'')}`, '_blank');
      } else {
          window.open(`https://instagram.com/${value.replace('@','')}`, '_blank');
      }
  };

  // Filter History Logic
  const filteredHistory = selectedPartnerId === 'all' 
    ? paidHistory 
    : paidHistory.filter(t => t.partnerId === selectedPartnerId);

  // Calculate Stats for Filtered View
  const statsTotalPaid = filteredHistory.reduce((acc, curr) => acc + curr.commissionValue, 0);
  const statsTotalSalesGenerated = filteredHistory.reduce((acc, curr) => acc + curr.saleValue, 0);

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Gestão de Parceiros</h2>
          <p className="text-zinc-400 mt-2">Controle financeiro de afiliados, motoristas e influencers.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/5 pb-1 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'payments' ? 'text-emerald-500 border-emerald-500' : 'text-zinc-500 border-transparent hover:text-white'}`}
        >
          <DollarSign size={16} /> A Pagar (Pendentes) <span className="bg-emerald-500 text-black px-1.5 rounded-full text-xs">{pendingPayments.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'history' ? 'text-purple-500 border-purple-500' : 'text-zinc-500 border-transparent hover:text-white'}`}
        >
          <FileText size={16} /> Histórico & Relatórios
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'requests' ? 'text-blue-500 border-blue-500' : 'text-zinc-500 border-transparent hover:text-white'}`}
        >
          <UserPlus size={16} /> Solicitações <span className={`px-1.5 rounded-full text-xs ${pendingRequests.length > 0 ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>{pendingRequests.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 text-sm font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${activeTab === 'list' ? 'text-gold-500 border-gold-500' : 'text-zinc-500 border-transparent hover:text-white'}`}
        >
          <Settings size={16} /> Lista Geral
        </button>
      </div>

      {/* TAB: PAGAMENTOS PENDENTES */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
           <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-full">
                       <Clock size={24} />
                    </div>
                    <div>
                       <h3 className="text-white font-bold text-lg">Fila de Pagamentos (24h)</h3>
                       <p className="text-zinc-400 text-sm">Transações aprovadas aguardando PIX.</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-emerald-500 font-bold text-3xl">R$ {pendingTotal.toFixed(2)}</p>
                    <p className="text-zinc-500 text-xs uppercase font-bold">Total Pendente</p>
                 </div>
              </div>
           </GlassCard>

           <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-white/5 text-zinc-400 text-xs uppercase font-bold">
                    <tr>
                       <th className="p-4">Parceiro</th>
                       <th className="p-4">Chave PIX</th>
                       <th className="p-4">Venda Ref.</th>
                       <th className="p-4">Comissão</th>
                       <th className="p-4 text-right">Ação</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {pendingPayments.map(t => {
                       const partner = partners.find(p => p.id === t.partnerId);
                       return (
                          <tr key={t.id} className="hover:bg-white/5 transition-colors">
                             <td className="p-4">
                                <div className="flex items-center gap-3">
                                   <img src={partner?.avatarUrl} className="w-8 h-8 rounded-full" />
                                   <div>
                                       <p className="text-white font-medium text-sm">{partner?.name}</p>
                                       <p className="text-zinc-500 text-xs">{partner?.category}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-4">
                                 <div className="flex flex-col">
                                     <span className="text-zinc-300 font-mono text-sm bg-black/50 px-2 py-1 rounded w-fit">{partner?.pixKey}</span>
                                     <span className="text-zinc-600 text-[10px] mt-0.5">{partner?.pixType}</span>
                                 </div>
                             </td>
                             <td className="p-4">
                                 <p className="text-zinc-300 text-sm">{t.productName}</p>
                                 <p className="text-zinc-500 text-xs">Cliente: {t.customerName}</p>
                             </td>
                             <td className="p-4 text-emerald-400 font-bold">R$ {t.commissionValue.toFixed(2)}</td>
                             <td className="p-4 text-right">
                                <button 
                                  onClick={() => handleConfirmPayment(t.id)}
                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ml-auto shadow-lg shadow-emerald-900/20"
                                >
                                   <CheckCircle size={14} /> Confirmar PIX
                                </button>
                             </td>
                          </tr>
                       );
                    })}
                 </tbody>
              </table>
              {pendingPayments.length === 0 && (
                 <div className="p-12 text-center flex flex-col items-center justify-center text-zinc-500">
                     <CheckCircle size={48} className="mb-4 text-zinc-700" />
                     <p>Tudo certo! Nenhum pagamento pendente para hoje.</p>
                 </div>
              )}
           </div>
        </div>
      )}

      {/* TAB: HISTÓRICO & RELATÓRIOS */}
      {activeTab === 'history' && (
          <div className="space-y-6">
              
              {/* Controls Area */}
              <div className="flex flex-col md:flex-row gap-6">
                  {/* Filter Card */}
                  <GlassCard className="flex-1" noPadding>
                      <div className="p-6">
                          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                              <Filter size={18} className="text-gold-500" /> Filtrar por Parceiro
                          </h3>
                          <select 
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gold-500"
                            value={selectedPartnerId}
                            onChange={(e) => setSelectedPartnerId(e.target.value)}
                          >
                              <option value="all">Todos os Parceiros</option>
                              {partners.map(p => (
                                  <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                              ))}
                          </select>
                      </div>
                  </GlassCard>

                  {/* Stats Cards (Dynamic) */}
                  <GlassCard className="flex-1 bg-gradient-to-br from-zinc-900 to-black">
                      <div className="flex items-start justify-between">
                          <div>
                              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Comissões Pagas</p>
                              <h3 className="text-2xl font-bold text-white mt-1">R$ {statsTotalPaid.toFixed(2)}</h3>
                              <p className="text-zinc-500 text-xs mt-1">
                                  {selectedPartnerId === 'all' ? 'Total da Plataforma' : 'Para este parceiro'}
                              </p>
                          </div>
                          <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                              <CheckCircle size={20} />
                          </div>
                      </div>
                  </GlassCard>

                  <GlassCard className="flex-1 bg-gradient-to-br from-zinc-900 to-black">
                      <div className="flex items-start justify-between">
                          <div>
                              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Vendas Geradas</p>
                              <h3 className="text-2xl font-bold text-white mt-1">R$ {statsTotalSalesGenerated.toFixed(2)}</h3>
                              <p className="text-zinc-500 text-xs mt-1">Receita Bruta</p>
                          </div>
                          <div className="p-2 bg-gold-500/10 text-gold-500 rounded-lg">
                              <TrendingUp size={20} />
                          </div>
                      </div>
                  </GlassCard>
              </div>

              {/* History Table */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                      <h3 className="text-white font-bold text-sm">Transações Realizadas</h3>
                      <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                          <Download size={12} /> Exportar CSV
                      </button>
                  </div>
                  <table className="w-full text-left">
                      <thead className="bg-white/5 text-zinc-400 text-xs uppercase font-bold">
                          <tr>
                              <th className="p-4">Data Pgto</th>
                              <th className="p-4">Parceiro</th>
                              <th className="p-4">Produto Vendido</th>
                              <th className="p-4 text-right">Valor Comissão</th>
                              <th className="p-4 text-right">Status</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {filteredHistory.map(t => {
                              const partner = partners.find(p => p.id === t.partnerId);
                              return (
                                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                                      <td className="p-4 text-zinc-400 text-sm">{t.scheduledDate}</td>
                                      <td className="p-4">
                                          <div className="flex items-center gap-2">
                                              <img src={partner?.avatarUrl} className="w-6 h-6 rounded-full" />
                                              <span className="text-white text-sm">{partner?.name}</span>
                                          </div>
                                      </td>
                                      <td className="p-4 text-zinc-300 text-sm">{t.productName}</td>
                                      <td className="p-4 text-right text-emerald-400 font-bold text-sm">R$ {t.commissionValue.toFixed(2)}</td>
                                      <td className="p-4 text-right">
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-bold uppercase">
                                              <Check size={10} /> Pago
                                          </span>
                                      </td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
                  {filteredHistory.length === 0 && (
                      <div className="p-12 text-center text-zinc-500">Nenhum histórico encontrado com este filtro.</div>
                  )}
              </div>
          </div>
      )}

      {/* TAB: SOLICITAÇÕES DE CADASTRO */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
            <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-xl flex items-center gap-4">
                <UserPlus className="text-blue-500" size={24} />
                <div>
                    <h3 className="text-white font-bold">Aprovação de Novos Parceiros</h3>
                    <p className="text-zinc-400 text-sm">Verifique os dados antes de liberar o acesso aos links de venda.</p>
                </div>
            </div>

            {pendingRequests.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">Nenhuma solicitação pendente no momento.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingRequests.map(partner => (
                        <GlassCard key={partner.id} className="flex flex-col gap-4 border-l-4 border-l-blue-500">
                             <div className="flex justify-between items-start">
                                 <div className="flex items-center gap-3">
                                     <img src={partner.avatarUrl} className="w-12 h-12 rounded-full" />
                                     <div>
                                         <h3 className="text-white font-bold">{partner.name}</h3>
                                         <span className="text-blue-400 text-xs font-bold uppercase">{partner.category}</span>
                                     </div>
                                 </div>
                                 <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-[10px] font-bold uppercase">Pendente</span>
                             </div>

                             <div className="grid grid-cols-2 gap-2 text-sm">
                                 <div className="bg-white/5 p-2 rounded">
                                     <p className="text-zinc-500 text-[10px]">Instagram</p>
                                     <p className="text-white">{partner.instagram}</p>
                                 </div>
                                 <div className="bg-white/5 p-2 rounded">
                                     <p className="text-zinc-500 text-[10px]">WhatsApp</p>
                                     <p className="text-white">{partner.phone}</p>
                                 </div>
                             </div>

                             <div className="flex gap-2 mt-2">
                                 <button 
                                   onClick={() => onUpdateStatus && onUpdateStatus(partner.id, 'Ativo')}
                                   className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-bold flex items-center justify-center gap-2"
                                 >
                                     <Check size={16} /> Aprovar
                                 </button>
                                 <button className="px-3 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg">
                                     <Ban size={16} />
                                 </button>
                             </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
      )}

      {/* TAB: LISTA GERAL */}
      {activeTab === 'list' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {partners.filter(p => p.status === 'Ativo' || p.status === 'Bloqueado').map(partner => (
                  <GlassCard key={partner.id} className={`flex flex-col gap-4 ${partner.status === 'Bloqueado' ? 'opacity-50 grayscale' : ''}`}>
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                           <img src={partner.avatarUrl} className="w-12 h-12 rounded-full border border-white/10" />
                           <div>
                              <h3 className="text-white font-bold">{partner.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className={`text-[10px] px-2 py-0.5 rounded border ${partner.category === 'Motorista' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-purple-500/10 border-purple-500/20 text-purple-500'}`}>
                                    {partner.category.toUpperCase()}
                                 </span>
                                 {partner.status === 'Bloqueado' && <span className="text-[10px] px-2 py-0.5 rounded bg-red-500 text-white font-bold">BLOQUEADO</span>}
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-white font-bold">R$ {partner.totalEarned.toFixed(2)}</p>
                           <p className="text-zinc-500 text-[10px] uppercase">Total Pago</p>
                        </div>
                     </div>

                     {/* Contact Info Buttons */}
                     <div className="flex items-center gap-2 border-y border-white/5 py-3">
                         <button 
                           onClick={() => handleContact('whatsapp', partner.phone)}
                           className="flex-1 py-2 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                         >
                            <Phone size={14} /> WhatsApp
                         </button>
                         <button 
                           onClick={() => handleContact('instagram', partner.instagram)}
                           className="flex-1 py-2 bg-white/5 hover:bg-pink-500/20 hover:text-pink-500 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                         >
                            <Instagram size={14} /> Instagram
                         </button>
                     </div>
                     
                     <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-zinc-500">Desde: Hoje</span>
                        <button 
                           onClick={() => onUpdateStatus && onUpdateStatus(partner.id, partner.status === 'Ativo' ? 'Bloqueado' : 'Ativo')}
                           className="text-zinc-500 hover:text-white text-xs underline"
                        >
                           {partner.status === 'Ativo' ? 'Bloqueiar Acesso' : 'Reativar Acesso'}
                        </button>
                     </div>
                  </GlassCard>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};
