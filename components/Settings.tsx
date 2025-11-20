
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Shield, Bell, User, Globe, Key, CheckCircle, Plus, Trash2, Users, X, UploadCloud, Lock } from 'lucide-react';
import { AdminUser } from '../types';

interface SettingsProps {
  adminProfile?: Partial<AdminUser>;
  onUpdateProfile?: (data: Partial<AdminUser>) => void;
  staff?: AdminUser[];
  onAddStaff?: (staff: AdminUser) => void;
  onRemoveStaff?: (id: string) => void;
}

type SettingsTab = 'profile' | 'staff' | 'security' | 'notifications' | 'api';

export const Settings: React.FC<SettingsProps> = ({ 
    adminProfile = {}, 
    onUpdateProfile,
    staff = [],
    onAddStaff,
    onRemoveStaff
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  // Profile Local State
  const [profileData, setProfileData] = useState(adminProfile);

  // Staff Modal State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Suporte', password: '' });

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const handleSaveProfile = () => {
      if(onUpdateProfile) onUpdateProfile(profileData);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const newAvatar = reader.result as string;
              setProfileData(prev => ({ ...prev, avatarUrl: newAvatar }));
              if(onUpdateProfile) onUpdateProfile({ ...profileData, avatarUrl: newAvatar });
          };
          reader.readAsDataURL(file);
      }
  };

  const handleAddStaffSubmit = () => {
      if(newStaff.name && newStaff.email && newStaff.password) {
          if(newStaff.password.length < 6) {
              alert("A senha deve ter pelo menos 6 caracteres.");
              return;
          }
          
          const staffMember: AdminUser = {
              id: Date.now().toString(),
              name: newStaff.name,
              email: newStaff.email,
              role: newStaff.role as any,
              avatarUrl: `https://ui-avatars.com/api/?name=${newStaff.name}&background=random`,
              lastActive: 'Nunca',
              password: newStaff.password
          };
          if(onAddStaff) onAddStaff(staffMember);
          setIsStaffModalOpen(false);
          setNewStaff({ name: '', email: '', role: 'Suporte', password: '' });
          alert(`Membro adicionado! Login: ${newStaff.email} | Senha: ${newStaff.password}`);
      } else {
          alert("Preencha todos os campos.");
      }
  };

  const handleChangePasswordSubmit = () => {
      // Basic validation
      if(passwordData.new !== passwordData.confirm) {
          alert("As novas senhas não coincidem.");
          return;
      }
      if(passwordData.new.length < 6) {
          alert("A senha deve ter pelo menos 6 caracteres.");
          return;
      }
      // Check current password (basic check against prop)
      if(adminProfile.password && passwordData.current !== adminProfile.password) {
          alert("Senha atual incorreta.");
          return;
      }

      // Update via prop to App State
      if(onUpdateProfile) {
          onUpdateProfile({ password: passwordData.new });
          alert("Senha de Administrador atualizada com sucesso! Use a nova senha no próximo login.");
      }
      
      setIsPasswordModalOpen(false);
      setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="p-8 animate-fade-in max-w-6xl mx-auto pb-20">
      <h2 className="text-3xl font-bold text-white mb-2">Configurações</h2>
      <p className="text-slate-400 mb-8">Personalize o sistema de gestão Privilege Pass.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}>
            <User size={18} /> <span className="font-medium">Perfil Admin</span>
          </button>
          <button onClick={() => setActiveTab('staff')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'staff' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}>
            <Users size={18} /> <span className="font-medium">Equipe / Staff</span>
          </button>
          <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'security' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}>
            <Shield size={18} /> <span className="font-medium">Segurança</span>
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'notifications' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}>
            <Bell size={18} /> <span className="font-medium">Notificações</span>
          </button>
          <button onClick={() => setActiveTab('api')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'api' ? 'bg-gradient-gold text-black font-bold shadow-lg' : 'text-zinc-400 hover:bg-white/5'}`}>
            <Globe size={18} /> <span className="font-medium">API Dragon Pass</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          {/* PERFIL TAB */}
          {activeTab === 'profile' && (
            <GlassCard className="p-8 animate-fade-in">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Perfil do Administrador</h3>
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="relative group cursor-pointer mx-auto md:mx-0">
                        <img src={profileData.avatarUrl || "https://picsum.photos/100/100"} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 group-hover:border-amber-500/50 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center text-xs text-white font-medium w-full h-full justify-center">
                                <UploadCloud size={20} className="mb-1"/> Alterar
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Nome</label>
                                <input type="text" value={profileData.name || ''} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Cargo</label>
                                <input type="text" value={profileData.role || ''} onChange={e => setProfileData({...profileData, role: e.target.value as any})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Email de Acesso</label>
                            <input type="email" value={profileData.email || ''} onChange={e => setProfileData({...profileData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-amber-500/50 outline-none" />
                        </div>
                        <div className="pt-4 flex items-center justify-end gap-4">
                            {showSaveSuccess && (
                                <span className="text-emerald-500 text-sm font-bold flex items-center gap-2 animate-fade-in"><CheckCircle size={16}/> Salvo com sucesso</span>
                            )}
                            <button onClick={handleSaveProfile} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl transition-colors">Salvar Alterações</button>
                        </div>
                    </div>
                </div>
            </GlassCard>
          )}

          {/* STAFF TAB */}
          {activeTab === 'staff' && (
              <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                      <h3 className="font-bold text-white">Membros da Equipe</h3>
                      <button onClick={() => setIsStaffModalOpen(true)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                          <Plus size={16} /> Adicionar
                      </button>
                  </div>
                  
                  <div className="grid gap-4">
                      {staff.length === 0 && (
                          <div className="text-center py-12 text-zinc-500 border border-dashed border-white/10 rounded-2xl">
                              Nenhum funcionário cadastrado.
                          </div>
                      )}
                      {staff.map(member => (
                          <GlassCard key={member.id} className="flex items-center justify-between" noPadding>
                              <div className="p-4 flex items-center gap-4">
                                  <img src={member.avatarUrl} className="w-10 h-10 rounded-full object-cover" />
                                  <div>
                                      <p className="text-white font-bold">{member.name}</p>
                                      <p className="text-zinc-500 text-xs">{member.email} • <span className="text-gold-500">{member.role}</span></p>
                                  </div>
                              </div>
                              <div className="p-4">
                                  <button 
                                    onClick={() => { if(confirm("Remover este membro da equipe?")) onRemoveStaff && onRemoveStaff(member.id) }} 
                                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          </GlassCard>
                      ))}
                  </div>
              </div>
          )}

          {/* SECURITY TAB */}
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
                          <button onClick={() => setTwoFactor(!twoFactor)} className={`w-14 h-8 rounded-full p-1 transition-colors relative ${twoFactor ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
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
                          <button onClick={() => setIsPasswordModalOpen(true)} className="px-4 py-2 border border-white/10 rounded-lg text-sm text-white hover:bg-white/5">Modificar</button>
                      </div>
                  </div>
              </GlassCard>
          )}

          {/* NOTIFICATIONS TAB */}
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

          {/* API TAB */}
          {activeTab === 'api' && (
              <GlassCard className="p-8 animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Integrações Externas</h3>
                  <div className="bg-zinc-950 p-6 rounded-xl border border-dashed border-zinc-700 text-center">
                      <Globe className="mx-auto text-zinc-600 mb-4" size={32} />
                      <h4 className="text-white font-bold">Dragon Pass API Status</h4>
                      <p className="text-emerald-500 text-sm font-bold mt-2 flex items-center justify-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Conectado
                      </p>
                  </div>
              </GlassCard>
          )}
        </div>
      </div>

      {/* Add Staff Modal - FIXED LAYOUT SCROLL items-start + py-24 */}
      {isStaffModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setIsStaffModalOpen(false)}>
              <div className="min-h-full flex items-start justify-center p-4 py-24">
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md relative shadow-2xl" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white">Novo Membro</h3>
                          <button onClick={() => setIsStaffModalOpen(false)} className="text-zinc-500 hover:text-white"><X /></button>
                      </div>
                      <div className="space-y-4">
                          <div><label className="text-xs font-bold text-zinc-500 uppercase">Nome</label><input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setNewStaff({...newStaff, name: e.target.value})}/></div>
                          <div><label className="text-xs font-bold text-zinc-500 uppercase">Email</label><input type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setNewStaff({...newStaff, email: e.target.value})}/></div>
                          <div>
                              <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1"><Key size={12}/> Senha de Acesso</label>
                              <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" placeholder="Mínimo 6 caracteres" onChange={e => setNewStaff({...newStaff, password: e.target.value})}/>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-zinc-500 uppercase">Cargo</label>
                              <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setNewStaff({...newStaff, role: e.target.value})}>
                                  <option value="Suporte">Suporte</option>
                                  <option value="Financeiro">Financeiro</option>
                                  <option value="Admin">Admin</option>
                              </select>
                          </div>
                          <button onClick={handleAddStaffSubmit} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl mt-2">Adicionar</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Change Password Modal - FIXED LAYOUT SCROLL items-start + py-24 */}
      {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setIsPasswordModalOpen(false)}>
              <div className="min-h-full flex items-start justify-center p-4 py-24">
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md relative shadow-2xl" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white">Alterar Senha</h3>
                          <button onClick={() => setIsPasswordModalOpen(false)}><X className="text-zinc-500 hover:text-white" /></button>
                      </div>
                      <div className="space-y-4">
                          <div><label className="text-xs font-bold text-zinc-500 uppercase">Senha Atual</label><input type="password" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setPasswordData({...passwordData, current: e.target.value})}/></div>
                          <div><label className="text-xs font-bold text-zinc-500 uppercase">Nova Senha</label><input type="password" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setPasswordData({...passwordData, new: e.target.value})}/></div>
                          <div><label className="text-xs font-bold text-zinc-500 uppercase">Confirmar Nova Senha</label><input type="password" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white" onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}/></div>
                          <button onClick={handleChangePasswordSubmit} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl mt-2">Atualizar Senha</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
