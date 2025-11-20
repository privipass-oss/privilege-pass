import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Smartphone, Monitor, Users, MousePointer2, Globe, Instagram, Search, Link, ArrowUpRight, Radio } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { MOCK_ANALYTICS } from '../constants';

export const Analytics: React.FC = () => {
  
  // Data preparation for Recharts
  const deviceData = MOCK_ANALYTICS.devices;

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fade-in pb-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
           <h2 className="text-4xl font-display font-bold text-white">Tráfego & Audiência</h2>
           <p className="text-zinc-400 mt-2">Monitoramento em tempo real de visitantes, dispositivos e origem.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
           </span>
           <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Live View</span>
        </div>
      </div>

      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <GlassCard className="relative overflow-hidden">
            <div className="absolute right-0 top-0 p-3 opacity-10 text-white">
               <Users size={60} />
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Visitantes Únicos (24h)</p>
            <h3 className="text-3xl font-bold text-white mt-1">{MOCK_ANALYTICS.totalVisitors.toLocaleString()}</h3>
            <p className="text-emerald-400 text-xs mt-2 font-bold">+12.5% vs ontem</p>
         </GlassCard>

         <GlassCard className="relative overflow-hidden border-amber-500/30 bg-amber-500/5">
            <div className="absolute right-0 top-0 p-3 opacity-10 text-amber-500">
               <Radio size={60} />
            </div>
            <p className="text-amber-500/70 text-xs font-bold uppercase tracking-wider">Online Agora</p>
            <h3 className="text-3xl font-bold text-amber-500 mt-1">{MOCK_ANALYTICS.activeNow}</h3>
            <div className="flex items-center gap-1 mt-2">
               <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[60%] animate-pulse"></div>
               </div>
               <span className="text-[10px] text-zinc-500">Pico de hoje</span>
            </div>
         </GlassCard>

         <GlassCard className="relative overflow-hidden">
            <div className="absolute right-0 top-0 p-3 opacity-10 text-white">
               <MousePointer2 size={60} />
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Taxa de Rejeição</p>
            <h3 className="text-3xl font-bold text-white mt-1">{MOCK_ANALYTICS.bounceRate}</h3>
            <p className="text-zinc-400 text-xs mt-2">Média do setor: 45% (Ótimo)</p>
         </GlassCard>

         <GlassCard className="relative overflow-hidden">
             <div className="absolute right-0 top-0 p-3 opacity-10 text-white">
               <Monitor size={60} />
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Tempo Médio</p>
            <h3 className="text-3xl font-bold text-white mt-1">{MOCK_ANALYTICS.avgSession}</h3>
            <p className="text-zinc-400 text-xs mt-2">Retenção alta em "Checkout"</p>
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Device Breakdown */}
         <GlassCard className="lg:col-span-1 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Dispositivos</h3>
            <div className="h-[250px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {deviceData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <Smartphone className="mx-auto text-amber-500 mb-1" size={24} />
                  <p className="text-2xl font-bold text-white">90%</p>
                  <p className="text-[10px] text-zinc-500 uppercase">Mobile</p>
               </div>
            </div>
            <div className="space-y-3 mt-4">
               {deviceData.map((device, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                        <span className="text-zinc-300">{device.name}</span>
                     </div>
                     <span className="font-bold text-white">{device.value}%</span>
                  </div>
               ))}
            </div>
         </GlassCard>

         {/* Traffic Sources */}
         <GlassCard className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Origem do Tráfego (Top Channels)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {MOCK_ANALYTICS.sources.map((source, idx) => (
                  <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-amber-500/30 transition-colors group">
                     <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-zinc-400 group-hover:text-amber-500 transition-colors border border-white/5">
                        {source.icon === 'Instagram' && <Instagram size={24} />}
                        {source.icon === 'Search' && <Search size={24} />}
                        {source.icon === 'Link' && <Link size={24} />}
                        {source.icon === 'MessageCircle' && <Users size={24} />}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm font-bold text-white">{source.name}</span>
                           <span className="text-sm font-bold text-amber-500">{source.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" 
                              style={{ width: `${source.value}%` }}
                           ></div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex items-start gap-3">
               <div className="p-1 bg-blue-500/20 rounded text-blue-400 mt-1">
                  <ArrowUpRight size={14} />
               </div>
               <div>
                  <p className="text-blue-400 font-bold text-sm">Insight de Marketing</p>
                  <p className="text-zinc-400 text-xs mt-1">
                     O tráfego vindo do Instagram (@privilege.pass) tem a maior taxa de conversão (8.5%). 
                     Considere aumentar os Stories com link direto para o checkout.
                  </p>
               </div>
            </div>
         </GlassCard>
      </div>

      {/* Geo & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Top Cities */}
         <GlassCard className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Globe size={18} className="text-zinc-400" /> Top Localizações
            </h3>
            <div className="space-y-4">
               {MOCK_ANALYTICS.topCities.map((loc, idx) => (
                  <div key={idx} className="relative">
                     <div className="flex justify-between items-center mb-1 text-sm relative z-10">
                        <span className="text-white font-medium">{loc.city}</span>
                        <span className="text-zinc-500">{loc.visitors.toLocaleString()} vis.</span>
                     </div>
                     <div className="absolute bottom-0 left-0 w-full h-full bg-zinc-800/30 rounded opacity-50 z-0">
                        <div className="h-full bg-zinc-700/50 rounded" style={{ width: `${loc.percentage}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
               <p className="text-xs text-zinc-500">Maioria do público concentrada no Sudeste Brasileiro.</p>
            </div>
         </GlassCard>

         {/* Live Session Feed */}
         <GlassCard className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-white">Sessões Ativas (Tempo Real)</h3>
               <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wide">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Atualizando
               </div>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="text-xs text-zinc-500 border-b border-white/5 uppercase tracking-wider">
                        <th className="pb-3 pl-2 font-medium">IP (Masked)</th>
                        <th className="pb-3 font-medium">Dispositivo</th>
                        <th className="pb-3 font-medium">Local</th>
                        <th className="pb-3 font-medium">Página Atual</th>
                        <th className="pb-3 pr-2 text-right font-medium">Visto há</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm">
                     {MOCK_ANALYTICS.liveSessions.map((session) => (
                        <tr key={session.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                           <td className="py-3 pl-2 text-zinc-400 font-mono text-xs">{session.ip}</td>
                           <td className="py-3 text-white flex items-center gap-2">
                              {session.device.includes('iPhone') ? <Smartphone size={14} className="text-zinc-500" /> : <Monitor size={14} className="text-zinc-500" />}
                              {session.device}
                           </td>
                           <td className="py-3 text-zinc-300">{session.location}</td>
                           <td className="py-3 text-amber-500">{session.page}</td>
                           <td className="py-3 pr-2 text-right text-zinc-500 text-xs">{session.time}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};