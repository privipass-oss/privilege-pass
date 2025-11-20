
import React, { useState } from 'react';
import { Globe2, CheckCircle, Star, ArrowRight, ShieldCheck, Menu, X, MapPin, Plane, MessageCircle, Quote, Crown, User, AlertCircle, HelpCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { VOUCHER_PACKS, TOP_LOUNGES, TESTIMONIALS, LOGO_URL, INITIAL_FAQS } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { VoucherType, VoucherPack, FAQItem } from '../types';
import { Concierge } from './Concierge';
import { HelpCenter } from './HelpCenter';

interface LandingPageProps {
  onGetStarted: () => void;
  onPartnerClick?: () => void;
  onPartnerLogin?: () => void;
  onViewSupport?: () => void;
  products?: VoucherPack[]; // Use real products
  faqItems?: FAQItem[]; // Use real FAQs
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onPartnerClick, onPartnerLogin, onViewSupport, products = VOUCHER_PACKS, faqItems = INITIAL_FAQS }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [voucherType, setVoucherType] = useState<VoucherType>('Nacional');

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-gold-500/30 font-sans">
      
      {/* Floating Concierge Button */}
      <button 
        onClick={() => setIsConciergeOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-gold text-black p-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform group animate-bounce-slow"
        title="Falar com Concierge"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-zinc-900 text-gold-500 text-xs font-bold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-gold-500/20">
          Concierge Online
        </span>
      </button>

      {/* Concierge Modal */}
      {isConciergeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-4xl h-[80vh] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
             <button onClick={() => setIsConciergeOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white z-50 bg-black/50 p-2 rounded-full">
               <X size={24} />
             </button>
             <Concierge />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src={LOGO_URL} alt="Privilege Pass" className="w-10 h-10 rounded-lg border border-gold-500/50 object-cover" />
            <span className="font-display font-bold text-xl tracking-tight text-white">PRIVILEGE <span className="text-gold-500">PASS</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-gold-400 transition-colors">Benefícios</button>
            <button onClick={() => scrollToSection('rede')} className="hover:text-gold-400 transition-colors">Salas VIP</button>
            <button onClick={() => scrollToSection('vouchers')} className="hover:text-gold-400 transition-colors">Pacotes</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-gold-400 transition-colors">Dúvidas</button>
            <button 
              onClick={onPartnerLogin} 
              className="hover:text-gold-400 transition-colors flex items-center gap-1"
            >
              Área do Parceiro
            </button>
          </div>
          
          <div className="hidden md:block">
             <button 
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300 flex items-center gap-2"
            >
              <User size={16} />
              Área do Cliente
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-fade-in shadow-2xl h-screen">
            <button onClick={() => scrollToSection('beneficios')} className="text-left text-lg text-zinc-300 py-4 border-b border-white/5">Benefícios</button>
            <button onClick={() => scrollToSection('rede')} className="text-left text-lg text-zinc-300 py-4 border-b border-white/5">Salas VIP</button>
            <button onClick={() => scrollToSection('vouchers')} className="text-left text-lg text-zinc-300 py-4 border-b border-white/5">Valores</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-lg text-zinc-300 py-4 border-b border-white/5">Dúvidas</button>
            <button onClick={() => { setIsMobileMenuOpen(false); onPartnerLogin && onPartnerLogin(); }} className="text-left text-lg text-zinc-300 py-4 border-b border-white/5">Área do Parceiro</button>
            
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onGetStarted(); }}
              className="mt-8 w-full py-4 bg-gradient-gold text-black font-bold rounded-xl text-lg shadow-lg shadow-gold-500/20"
            >
              Acessar / Cadastrar
            </button>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onPartnerClick && onPartnerClick(); }}
              className="w-full py-3 bg-white/5 text-zinc-300 font-bold rounded-xl text-sm border border-white/10"
            >
              Quero ser Parceiro
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1569383963996-b6d930c48268?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Lounge" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_15s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in backdrop-blur-md">
            <Star size={12} fill="currentColor" />
            Parceiro Oficial Dragon Pass
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 animate-fade-in text-white drop-shadow-2xl" style={{ animationDelay: '0.1s' }}>
            Viaje como um <br />
            <span className="text-gradient-gold">Membro Elite.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
            Acesso instantâneo a mais de 1.300 salas VIP globais. Sem mensalidade, sem burocracia. Seu voucher direto no WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-gold hover:brightness-110 text-black font-bold rounded-full text-lg transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group"
            >
              Comprar Acesso
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('vouchers')}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-lg font-medium transition-all backdrop-blur-sm text-white"
            >
              Ver Preços
            </button>
          </div>
        </div>
      </section>

      {/* Rules Highlight */}
      <section className="bg-amber-900/10 border-y border-amber-500/20 py-4 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 text-amber-500 text-sm font-medium text-center">
              <AlertCircle size={16} />
              <p>Importante: Vouchers são <strong className="underline">nominais e intransferíveis</strong>. Necessário apresentar documento original.</p>
          </div>
      </section>

      {/* Stats / Trust */}
      <section id="beneficios" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
           <div className="text-center group">
             <div className="w-20 h-20 mx-auto bg-zinc-900/50 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-white/5 group-hover:border-gold-500/30 transition-colors shadow-lg">
               <Globe2 size={40} />
             </div>
             <h3 className="text-4xl font-display font-bold text-white mb-2">1.300+</h3>
             <p className="text-zinc-500 text-sm uppercase tracking-wider font-bold">Salas no Mundo</p>
             <p className="text-zinc-400 mt-3 text-sm leading-relaxed">Cobertura em todos os continentes através da rede Dragon Pass.</p>
           </div>
           
           <div className="text-center group">
             <div className="w-20 h-20 mx-auto bg-zinc-900/50 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-white/5 group-hover:border-gold-500/30 transition-colors shadow-lg">
               <ShieldCheck size={40} />
             </div>
             <h3 className="text-4xl font-display font-bold text-white mb-2">Pay-per-Use</h3>
             <p className="text-zinc-500 text-sm uppercase tracking-wider font-bold">Sem Assinatura</p>
             <p className="text-zinc-400 mt-3 text-sm leading-relaxed">Pague apenas quando viajar. Liberdade total sem cobrança recorrente.</p>
           </div>
           
           <div className="text-center group">
             <div className="w-20 h-20 mx-auto bg-zinc-900/50 rounded-2xl flex items-center justify-center text-gold-500 mb-6 border border-white/5 group-hover:border-gold-500/30 transition-colors shadow-lg">
               <Crown size={40} />
             </div>
             <h3 className="text-4xl font-display font-bold text-white mb-2">VIP</h3>
             <p className="text-zinc-500 text-sm uppercase tracking-wider font-bold">Tratamento Elite</p>
             <p className="text-zinc-400 mt-3 text-sm leading-relaxed">Buffet, Open Bar, Wi-Fi e Chuveiros nas melhores salas.</p>
           </div>
        </div>
      </section>

      {/* Redes Credenciadas Section (ID: rede) */}
      <section id="rede" className="py-20 bg-black relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest">Cobertura Global</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2 mb-4">Principais Salas VIP</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">Algumas das mais de 1.300 salas que você pode acessar com o Privilege Pass.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <img src="https://flagcdn.com/w20/br.png" alt="Brasil" className="rounded-sm" />
                      Destaques Brasil
                    </h3>
                    <div className="space-y-4">
                      {TOP_LOUNGES.brasil.slice(0, 5).map((item, i) => (
                        <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                          <p className="text-gold-500 font-bold text-sm">{item.airport}</p>
                          <p className="text-zinc-400 text-xs mt-1">{item.lounges.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                </GlassCard>
                <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Globe2 size={20} className="text-blue-400" />
                      Destaques Internacionais
                    </h3>
                    <div className="space-y-4">
                      {TOP_LOUNGES.mundo.slice(0, 5).map((item, i) => (
                        <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                          <p className="text-gold-500 font-bold text-sm">{item.airport}</p>
                          <p className="text-zinc-400 text-xs mt-1">{item.lounges.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                </GlassCard>
            </div>
            
            <div className="mt-10 text-center">
               <button onClick={onGetStarted} className="text-zinc-400 hover:text-white text-sm border-b border-zinc-700 hover:border-white transition-all pb-1">
                 Verifique a disponibilidade de uma sala específica no painel do cliente →
               </button>
            </div>
        </div>
      </section>

      {/* Vouchers Section */}
      <section id="vouchers" className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Escolha sua Experiência</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Nossos pacotes são flexíveis. Compre agora e use a qualquer momento dentro de 12 meses.</p>
          </div>

          {/* Premium Toggle */}
          <div className="flex justify-center mb-20">
            <div className="bg-zinc-900 p-2 rounded-full border border-white/10 inline-flex relative">
              <div 
                className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-gradient-gold rounded-full shadow-lg transition-all duration-500 ease-out
                  ${voucherType === 'Nacional' ? 'left-2' : 'left-[calc(50%+4px)]'}
                `}
              ></div>
              
              <button
                onClick={() => setVoucherType('Nacional')}
                className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 ${voucherType === 'Nacional' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                <MapPin size={16} /> NACIONAIS
              </button>
              <button
                onClick={() => setVoucherType('Internacional')}
                className={`relative z-10 px-10 py-3 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 ${voucherType === 'Internacional' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                <Plane size={16} /> INTERNACIONAIS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.type === voucherType).map((pack) => (
              <GlassCard 
                key={pack.id} 
                className={`
                  flex flex-col relative transition-all duration-500 hover:-translate-y-3
                  ${pack.isActive === false ? 'opacity-50 grayscale pointer-events-none' : ''}
                  ${pack.accessCount === 4 
                    ? 'border-gold-500/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-zinc-900/80' 
                    : 'hover:border-white/20'}
                `}
                interactive
              >
                {pack.accessCount === 4 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-black text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    Mais Vendido
                  </div>
                )}
                
                <div className="mb-8 pt-4">
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{pack.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed h-12">{pack.description}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base text-zinc-500 font-medium">R$</span>
                    <span className="text-5xl font-bold text-white tracking-tight">{pack.price.toFixed(0)}</span>
                    <span className="text-xl text-zinc-500 font-medium">,00</span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-2 font-medium uppercase tracking-wide">Pagamento Único • Validade 1 Ano</p>
                </div>

                <ul className="space-y-5 mb-10 flex-1">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={onGetStarted}
                  className={`w-full py-5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2
                    ${pack.accessCount === 4
                      ? 'bg-gradient-gold text-black hover:brightness-110 shadow-lg shadow-gold-500/20' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                >
                  Selecionar
                  <ArrowRight size={16} />
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section (Experiência) - ID: depoimentos */}
      <section id="depoimentos" className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">A Experiência Privilege</h2>
               <p className="text-zinc-400">Veja o que nossos membros dizem sobre suas viagens.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {TESTIMONIALS.map((item) => (
                 <GlassCard key={item.id} className="flex flex-col">
                    <Quote size={32} className="text-gold-500/30 mb-6" />
                    <p className="text-zinc-300 text-lg italic mb-6 flex-1">"{item.text}"</p>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                       <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                       <div>
                          <p className="text-white font-bold text-sm">{item.name}</p>
                          <p className="text-gold-500 text-xs uppercase tracking-wider font-bold">{item.role}</p>
                       </div>
                    </div>
                 </GlassCard>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold text-white mb-4 flex items-center justify-center gap-2">
                      <HelpCircle className="text-gold-500" /> Dúvidas Frequentes
                  </h2>
                  <p className="text-zinc-400">Perguntas mais comuns. Para ver todas, acesse a central.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 mb-8">
                  <HelpCenter items={faqItems.slice(0, 4)} />
              </div>

              {onViewSupport && (
                 <div className="text-center">
                    <button 
                       onClick={onViewSupport}
                       className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto shadow-lg"
                    >
                       <ExternalLink size={18} /> Acessar Central de Ajuda Completa
                    </button>
                 </div>
              )}
          </div>
      </section>

      {/* B2B & Partners Section */}
      <section className="py-20 bg-zinc-900 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-4">Seja um Parceiro</h3>
                <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
                  É motorista VIP ou Influencer? Cadastre-se e ganhe comissão automática a cada venda indicada.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                 <button 
                   onClick={onPartnerLogin}
                   className="px-8 py-4 bg-transparent border border-white/10 hover:bg-white/5 rounded-xl text-white font-bold transition-all"
                 >
                   Fazer Login
                 </button>
                 <button 
                   onClick={onPartnerClick}
                   className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all flex items-center gap-3 whitespace-nowrap"
                 >
                   <Star size={20} className="text-gold-500" />
                   Quero ser Parceiro
                 </button>
              </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <img src={LOGO_URL} alt="Privilege Pass" className="w-8 h-8 rounded border border-gold-500/30 object-cover" />
             <span className="font-bold text-xl text-white tracking-tight">PRIVILEGE PASS</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col items-center md:items-end text-zinc-600 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                      <Phone size={14} /> <span>Suporte: (21) 92022-2269</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Mail size={14} /> <span>privi.pass@gmail.com</span>
                  </div>
              </div>
              <p className="text-zinc-600 text-sm">© 2024 Privilege Pass Global. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
