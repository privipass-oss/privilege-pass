
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Instagram, CreditCard, ArrowRight, CheckCircle, Users, DollarSign, Star, Phone, Tag } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface PartnerRegistrationProps {
  onBack: () => void;
  onRegisterSuccess: (data: any) => void;
  onLoginClick?: () => void;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({ onBack, onRegisterSuccess, onLoginClick }) => {
  const [viewState, setViewState] = useState<'INFO' | 'FORM'>('INFO');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<'Motorista' | 'Influencer'>('Motorista');
  
  // Form States
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      instagram: '',
      pixKey: '',
      couponSuffix: '' // Stores only the user part "JOAO"
  });

  // Derived Coupon for Display
  const prefix = category === 'Motorista' ? 'DRIVER-' : 'VIP-';
  const fullCoupon = prefix + (formData.couponSuffix.toUpperCase().replace(/[^A-Z0-9]/g, ''));

  // Phone Mask Helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 11) value = value.slice(0, 11); // Limit to 11 chars
    
    // Apply mask (XX) XXXXX-XXXX
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API latency then pass data up
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
          ...formData,
          category,
          couponCode: fullCoupon, // Send the full composed code
          pixType: formData.pixKey.includes('@') ? 'Email' : 'CPF/Tel'
      });
    }, 2000);
  };

  // --- VIEW 1: APRESENTAÇÃO / INFORMAÇÕES ---
  if (viewState === 'INFO') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-6 relative overflow-hidden">
        <button onClick={onBack} className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors z-20">
          <ArrowLeft size={20} /> Voltar
        </button>
        
        {/* Login Link Top Right */}
        <div className="absolute top-8 right-8 z-20">
           <button onClick={onLoginClick} className="text-white hover:text-gold-500 font-bold transition-colors text-sm border border-white/10 bg-zinc-900/50 px-4 py-2 rounded-full backdrop-blur-md">
             Já sou parceiro (Login)
           </button>
        </div>

        <div className="max-w-5xl mx-auto w-full mt-20 relative z-10 pb-20">
           <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                 Parceria <span className="text-gold-500">Privilege</span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                 Transforme sua influência ou seus passageiros em receita recorrente. 
                 A plataforma mais premium de acesso VIP do Brasil.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <GlassCard className="text-center p-8 group hover:border-gold-500/30">
                 <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-gold-500 mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    <DollarSign size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Comissão Automática</h3>
                 <p className="text-zinc-400 text-sm">
                    Ganhe <span className="text-white font-bold">R$ 50,00</span> (Motoristas) ou <span className="text-white font-bold">15%</span> (Influencers) por cada venda.
                 </p>
              </GlassCard>

              <GlassCard className="text-center p-8 group hover:border-emerald-500/30">
                 <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    <CheckCircle size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Pagamento em 24h</h3>
                 <p className="text-zinc-400 text-sm">
                    Sem esperar o fim do mês. Vendeu hoje, o PIX cai na sua conta amanhã automaticamente.
                 </p>
              </GlassCard>

              <GlassCard className="text-center p-8 group hover:border-purple-500/30">
                 <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-purple-500 mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                    <Users size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Painel Exclusivo</h3>
                 <p className="text-zinc-400 text-sm">
                    Acompanhe suas vendas em tempo real, gere links personalizados e cupons de desconto.
                 </p>
              </GlassCard>
           </div>

           {/* CTA */}
           <div className="text-center">
              <button 
                onClick={() => setViewState('FORM')}
                className="px-12 py-5 bg-gradient-gold text-black font-bold rounded-full text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
              >
                 Quero me Cadastrar <ArrowRight />
              </button>
              <p className="text-zinc-600 text-sm mt-4">Cadastro gratuito e aprovação em instantes.</p>
           </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: FORMULÁRIO DE CADASTRO ---
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <button onClick={() => setViewState('INFO')} className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors z-20">
        <ArrowLeft size={20} /> Voltar para Informações
      </button>

      <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10 my-10">
         <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Dados do Parceiro</h2>
            <p className="text-zinc-400">Preencha seus dados para liberar seu acesso ao painel.</p>
         </div>

         <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
               
               <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCategory('Motorista')}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${category === 'Motorista' ? 'bg-gold-500 text-black border-gold-500' : 'bg-black/50 border-white/10 text-zinc-500 hover:border-white/30'}`}
                  >
                    <Briefcase size={28} />
                    <span className="font-bold text-sm">Motorista VIP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('Influencer')}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${category === 'Influencer' ? 'bg-purple-500 text-white border-purple-500' : 'bg-black/50 border-white/10 text-zinc-500 hover:border-white/30'}`}
                  >
                    <Instagram size={28} />
                    <span className="font-bold text-sm">Influencer</span>
                  </button>
               </div>

               <div className="space-y-4">
                  {/* Nome e Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase">Nome Completo</label>
                        <input required type="text" 
                           className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 outline-none" 
                           placeholder="Nome e Sobrenome"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        <p className="text-[10px] text-zinc-600">Como você será identificado na plataforma.</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase">Email (Login)</label>
                        <input required type="email" 
                           className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 outline-none" 
                           placeholder="seu@email.com"
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                        <p className="text-[10px] text-zinc-600">Use um e-mail válido para receber notificações.</p>
                    </div>
                  </div>

                  {/* Contato e Pix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1"><Phone size={12}/> WhatsApp / Celular</label>
                        <input required type="tel" 
                           className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 outline-none" 
                           placeholder="(XX) 9XXXX-XXXX"
                           value={formData.phone}
                           onChange={handlePhoneChange}
                           maxLength={15}
                        />
                        <p className="text-[10px] text-zinc-600">Ex: (11) 99999-9999</p>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1"><Instagram size={12}/> Instagram</label>
                        <input required type="text" 
                           className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-gold-500/50 outline-none" 
                           placeholder="@seu.perfil"
                           value={formData.instagram}
                           onChange={e => setFormData({...formData, instagram: e.target.value})}
                        />
                        <p className="text-[10px] text-zinc-600">Perfil público para validação.</p>
                     </div>
                  </div>
                  
                  <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-2"><CreditCard size={14}/> Chave PIX (Para Recebimento)</label>
                        <input required type="text" 
                           className="w-full bg-black border border-emerald-500/30 rounded-xl p-3 text-white focus:border-emerald-500 outline-none" 
                           placeholder="CPF, Email, Telefone ou Aleatória"
                           value={formData.pixKey}
                           onChange={e => setFormData({...formData, pixKey: e.target.value})}
                        />
                        <p className="text-[10px] text-zinc-500 text-right">Certifique-se que a chave está correta para receber pagamentos.</p>
                      </div>
                  </div>

                  {/* Coupon Selection */}
                  <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-xl space-y-2">
                     <label className="text-xs font-bold text-amber-500 uppercase flex items-center gap-2"><Tag size={14}/> Escolha seu Cupom</label>
                     <div className="flex items-center bg-black border border-amber-500/30 rounded-xl p-3">
                         <span className="text-zinc-500 font-bold mr-1 select-none">{prefix}</span>
                         <input 
                           required 
                           type="text" 
                           className="flex-1 bg-transparent text-white font-bold uppercase outline-none placeholder-zinc-600"
                           placeholder="SEUNOME"
                           maxLength={12}
                           value={formData.couponSuffix}
                           onChange={e => setFormData({...formData, couponSuffix: e.target.value})}
                         />
                     </div>
                     <p className="text-[10px] text-zinc-500">
                         Seu cupom final será: <span className="text-white font-bold">{fullCoupon}</span>. Seus clientes terão 5% de desconto com ele.
                     </p>
                  </div>

               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full py-5 bg-gradient-gold text-black font-bold rounded-xl text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-3 mt-6"
               >
                 {loading ? <span className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full"></span> : <>Finalizar Cadastro <ArrowRight /></>}
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};
