
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Shield, Bell, User, Globe, Moon, Smartphone, Lock, CreditCard, Key, CheckCircle } from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'api';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = () => {
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
  }

  return (
    <div className="p-8 animate-fade-in max-w-6xl mx-auto pb-20">
      <h2 className="text-3xl font-bold text-white mb-2">Configurações</h2>
      <p className="text-slate-400 mb-8">Personalize o sistema de gestão Privilege Pass.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation for settings */}
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}
          >
            <User size={18} />
            <span className="font-medium">Perfil Admin</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'security' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}
          >
            <Shield size={18} />
            <span className="font-medium">Segurança</span>
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'notifications' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}
          >
            <Bell size={18} />
            <span className="font-medium">Notificações</span>
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'api' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}
          >
            <Globe size={18} />
            <span className="font-medium">API Dragon Pass</span>
          </button>
        </div>

        {/* Main Settings Content */}
        <div className="md:col-span-3 space-y-6">
          
          {activeTab === 'profile' && (
            <GlassCard className="p-8 animate-fade-in">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Perfil do Administrador</h3>
                <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group cursor-pointer mx-auto md:mx-0">
                    <img 
                    src="https://picsum.photos/100/100?random=99" 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 group-hover:border-amber-500/50 transition-colors"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white font-medium">Alterar Foto</span>
                    </div>
                </div>
                <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Nome</label>
                            <input type="text" defaultValue="Admin Principal" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Cargo</label>
                            <input type="text" defaultValue="Manager Global" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Email de Acesso</label>
                        <input type="email" defaultValue="privi.pass@gmail.com" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                    </div>
                    <div className="pt-4 flex items-center justify-end gap-4">
                        {showSaveSuccess && (
                            <span className="text-emerald-500 text-sm font-bold flex items-center gap-2 animate-fade-in">
                                <CheckCircle size={16}/> Salvo com sucesso
                            </span>
                        )}
                        <button onClick={handleSave} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl transition-colors">
                            Salvar Alterações
                        </button>
                    </div>
                </div>
                </div>
            </GlassCard>
          )}

          {activeTab === 'security' && (
              <GlassCard className="p-8 animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Segurança da Conta</h3>
                  <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                              <div className="p-3 bg-amber-500/20 text-amber-500 rounded-lg"><Key size={24}/></div>
                              <div>
                                  <p className="text-white font-bold">Autenticação de Dois Fatores (2FA)</p>
                                  <p className="text-zinc-400 text-sm">Adiciona uma camada extra de segurança ao login.</p>
                              </div>
                          </div>
                          <button 
                             onClick={() => setTwoFactor(!twoFactor)}
                             className={`w-14 h-8 rounded-full p-1 transition-colors relative ${twoFactor ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                          >
                             <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                              <div className="p-3 bg-red-500/20 text-red-500 rounded-lg"><Lock size={24}/></div>
                              <div>
                                  <p className="text-white font-bold">Alterar Senha Mestra</p>
                                  <p className="text-zinc-400 text-sm">Última alteração há 30 dias.</p>
                              </div>
                          </div>
                          <button className="px-4 py-2 border border-white/10 rounded-lg text-sm text-white hover:bg-white/5">Modificar</button>
                      </div>
                  </div>
              </GlassCard>
          )}

          {activeTab === 'notifications' && (
             <GlassCard className="p-8 animate-fade-in">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Preferências de Alerta</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-zinc-300">Novas Vendas (Push)</span>
                        <input type="checkbox" checked={pushEnabled} onChange={() => setPushEnabled(!pushEnabled)} className="accent-amber-500 w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-zinc-300">Relatório Diário por Email</span>
                        <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="accent-amber-500 w-5 h-5" />
                    </div>
                </div>
             </GlassCard>
          )}

          {activeTab === 'api' && (
              <GlassCard className="p-8 animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Integrações Externas</h3>
                  <div className="bg-zinc-950 p-6 rounded-xl border border-dashed border-zinc-700 text-center">
                      <Globe className="mx-auto text-zinc-600 mb-4" size={32} />
                      <h4 className="text-white font-bold">Dragon Pass API Status</h4>
                      <p className="text-emerald-500 text-sm font-bold mt-2 flex items-center justify-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Conectado
                      </p>
                      <p className="text-zinc-500 text-xs mt-4">Endpoint: api.dragonpass.com/v3/partners/privilege</p>
                  </div>
              </GlassCard>
          )}

        </div>
      </div>
    </div>
  );
};
