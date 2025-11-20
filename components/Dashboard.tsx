
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe2, CreditCard, Plane, CheckCircle, TrendingUp, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { MOCK_CHART_DATA, RECENT_ACTIVITY } from '../constants';
import { ViewState } from '../types';

interface DashboardProps {
    onChangeView?: (view: ViewState) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-amber-500/20 p-3 rounded-lg shadow-2xl backdrop-blur-sm">
        <p className="text-zinc-400 text-xs mb-1 uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
          <p className="text-amber-400 text-sm font-bold">
            Intl: {payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p className="text-zinc-300 text-sm font-bold">
            Nac: {payload[1].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  
  const navigate = (view: ViewState) => {
      if(onChangeView) onChangeView(view);
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in pb-20">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Privilege Global</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-0.5 rounded bg-zinc-800 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
              Dragon Pass Partner
            </span>
            <p className="text-zinc-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistema de Vendas Online
            </p>
          </div>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => navigate('travel-hub')} 
             className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-white/10 text-sm font-medium transition-all shadow-lg flex items-center gap-2"
           >
             <Globe2 size={16} /> Rede Credenciada
           </button>
           <button 
             onClick={() => navigate('members')}
             className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center gap-2"
           >
             <ShoppingBag size={16} /> Nova Venda
           </button>
        </div>
      </div>

      {/* Main Stats Row - Sales Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="group hover:border-amber-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Vendas Totais</p>
              <h3 className="text-3xl font-bold text-white mt-1">R$ 324.5k</h3>
              <p className="text-emerald-400 text-xs font-medium mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +22% este mês
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <CreditCard size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="group hover:border-blue-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Vouchers Ativos</p>
              <h3 className="text-3xl font-bold text-white mt-1">1.420</h3>
              <p className="text-blue-400 text-xs font-medium mt-2 flex items-center gap-1">
                <Plane size={12} /> Prontos para uso
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <Plane size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="group hover:border-purple-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Rede Dragon Pass</p>
              <h3 className="text-3xl font-bold text-white mt-1">1.300+</h3>
              <p className="text-purple-400 text-xs font-medium mt-2 flex items-center gap-1">
                <Globe2 size={12} /> Salas Globais
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
              <Globe2 size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="group hover:border-emerald-500/30 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Taxa de Aprovação</p>
              <h3 className="text-3xl font-bold text-white mt-1">99.2%</h3>
              <p className="text-zinc-400 text-xs font-medium mt-2">
                Emissões com sucesso
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Sales Split */}
        <div className="lg:col-span-2 h-full">
          <GlassCard className="h-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Performance de Vendas</h3>
                <p className="text-xs text-zinc-500">Nacional vs Internacional (Últimos 7 dias)</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                   <span className="text-xs text-zinc-400">Internacional</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-zinc-600"></span>
                   <span className="text-xs text-zinc-400">Nacional</span>
                 </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorIntl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNac" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52525b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#52525b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="internacional" 
                    stroke="#EAB308" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorIntl)" 
                    stackId="1"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="nacional" 
                    stroke="#52525b" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorNac)" 
                    stackId="1"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Live Transaction Feed */}
        <div className="h-full">
          <GlassCard className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-white">Transações em Tempo Real</h3>
               <span className="px-2 py-1 bg-red-500/20 text-red-500 text-[10px] font-bold rounded uppercase animate-pulse">Live</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {RECENT_ACTIVITY.map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${log.type === 'sale' ? 'bg-emerald-500' : log.type === 'access' ? 'bg-amber-500' : 'bg-blue-500'} ring-4 ring-black mb-1`}></div>
                    <div className="w-[1px] h-full bg-zinc-800 group-last:hidden"></div>
                  </div>
                  <div className="pb-2 w-full">
                    <div className="flex justify-between items-start">
                       <p className="text-sm text-zinc-200 leading-snug font-medium">{log.text}</p>
                       {log.value && <span className="text-xs text-emerald-400 font-bold whitespace-nowrap ml-2">{log.value}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                       <Clock size={10} className="text-zinc-500" />
                       <span className="text-xs text-zinc-500">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={() => navigate('members')} className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium text-zinc-400 transition-colors">
              Ver Histórico de Vendas
            </button>
          </GlassCard>
        </div>
      </div>

      {/* Global Reach Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <GlassCard className="md:col-span-3 !p-0 flex flex-col md:flex-row overflow-hidden min-h-[120px]">
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-black p-6 flex-1 flex items-center justify-between">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative overflow-hidden">
                    <Globe2 className="text-blue-400 relative z-10" size={32} />
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl"></div>
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg">Cobertura Global Dragon Pass</h4>
                   <p className="text-sm text-zinc-400 max-w-md">Acesso instantâneo a mais de 1.300 salas VIP em aeroportos ao redor do mundo. Integração ativa.</p>
                 </div>
               </div>
               <div className="text-right hidden lg:block pr-8">
                 <div className="flex items-center gap-8">
                    <div>
                        <p className="text-2xl font-bold text-white">98%</p>
                        <p className="text-xs text-zinc-500 uppercase">Uptime API</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">138</p>
                        <p className="text-xs text-zinc-500 uppercase">Países</p>
                    </div>
                 </div>
               </div>
            </div>
            <div className="bg-zinc-950 p-6 w-full md:w-64 border-l border-white/5 flex items-center justify-center">
               <button onClick={() => navigate('travel-hub')} className="w-full py-3 border border-white/10 rounded-lg text-sm font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                 <CheckCircle size={16} className="text-emerald-500" />
                 Status do Sistema
               </button>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};
