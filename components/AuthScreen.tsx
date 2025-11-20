
import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { AuthMode, Partner, Customer } from '../types';
import { LOGO_URL } from '../constants';

interface AuthScreenProps {
  onAuthenticated: (role: 'client' | 'admin' | 'partner', user?: any) => void;
  onBack: () => void;
  partners?: Partner[];
  customers?: Customer[]; // Added customers list for validation
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated, onBack, partners = [], customers = [] }) => {
  const [mode, setMode] = useState<AuthMode>('REGISTER');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API Call Latency
    setTimeout(() => {
      setLoading(false);
      
      // 1. Check Admin
      if (formData.email.includes('admin')) {
        onAuthenticated('admin', { name: 'Administrador', email: formData.email });
        return;
      } 
      
      // 2. Check Partner (Real Lookup)
      const foundPartner = partners.find(p => p.email.toLowerCase() === formData.email.toLowerCase());
      if (foundPartner) {
        onAuthenticated('partner', foundPartner);
        return;
      }
      
      // 3. Client Login Validation
      if (mode === 'LOGIN') {
          // Find customer in the list passed from App
          const foundCustomer = customers.find(c => c.email.toLowerCase() === formData.email.toLowerCase());
          
          if (foundCustomer) {
              // In a real app, verify password hash. Here we compare simple string if it exists.
              if (foundCustomer.password && foundCustomer.password !== formData.password) {
                  alert("Senha incorreta.");
                  return;
              }
              onAuthenticated('client', foundCustomer);
          } else {
              alert("Cliente não encontrado. Verifique o e-mail ou cadastre-se.");
          }
      } else {
          // Register Mode (Public)
          const exists = customers.find(c => c.email.toLowerCase() === formData.email.toLowerCase());
          if(exists) {
              alert("Este e-mail já está cadastrado. Faça login.");
              setMode('LOGIN');
              return;
          }
          
          // Create new client session (App will handle persistence if needed, but usually public reg adds to list)
          // Note: In this mock, public registration doesn't add to App state automatically unless we lift it, 
          // but for now we log them in as a new user.
          onAuthenticated('client', { 
              name: formData.name || 'Visitante', 
              email: formData.email,
              vouchers: [],
              password: formData.password // Store for session
          });
      }

    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6 relative overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <button onClick={onBack} className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-8">
           <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)] overflow-hidden border border-gold-500/50">
             <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
           </div>
           <h2 className="text-2xl font-bold text-white font-display">
             {mode === 'LOGIN' ? 'Bem-vindo de volta' : 'Criar sua conta'}
           </h2>
           <p className="text-zinc-500 text-sm mt-2">
             {mode === 'LOGIN' ? 'Acesse sua conta Cliente ou Parceiro.' : 'Cadastre-se para comprar acesso VIP.'}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'REGISTER' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-500/50 outline-none transition-colors"
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    required
                    type="tel" 
                    placeholder="(11) 99999-9999"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-500/50 outline-none transition-colors"
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                required
                type="email" 
                placeholder="seu@email.com"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-500/50 outline-none transition-colors"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-amber-500/50 outline-none transition-colors"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {mode === 'LOGIN' ? 'Entrar' : 'Criar Conta'} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            {mode === 'LOGIN' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              onClick={() => setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
              className="text-amber-500 font-bold ml-2 hover:underline"
            >
              {mode === 'LOGIN' ? 'Cadastre-se' : 'Fazer Login'}
            </button>
          </p>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-center w-full px-4">
        <p className="text-zinc-700 text-[10px] md:text-xs">
          Acesso Admin: admin@... | Acesso Parceiro: Use o email cadastrado
        </p>
      </div>
    </div>
  );
};
