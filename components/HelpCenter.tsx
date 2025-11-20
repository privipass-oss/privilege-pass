
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { ChevronDown, ChevronUp, MessageCircle, Mail, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface HelpCenterProps {
    items: FAQItem[];
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleWhatsApp = () => {
      window.open('https://wa.me/5521920222269', '_blank');
  };

  const handleEmail = () => {
      window.location.href = 'mailto:privi.pass@gmail.com';
  };

  return (
    <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
            {/* Left: FAQ List */}
            <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-gold-500" /> Perguntas Frequentes
                </h3>
                
                {items.length === 0 && (
                    <p className="text-zinc-500">Nenhuma pergunta cadastrada.</p>
                )}

                {items.map((faq, index) => (
                    <GlassCard 
                        key={faq.id} 
                        className={`cursor-pointer transition-all duration-300 ${openIndex === index ? 'border-gold-500/30 bg-zinc-900' : 'hover:bg-white/5'}`}
                        noPadding
                    >
                        <div 
                            className="p-5 flex justify-between items-center"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <h4 className={`font-medium ${openIndex === index ? 'text-gold-500' : 'text-zinc-200'}`}>
                                {faq.question}
                            </h4>
                            {openIndex === index ? <ChevronUp size={18} className="text-gold-500"/> : <ChevronDown size={18} className="text-zinc-500"/>}
                        </div>
                        
                        {openIndex === index && (
                            <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
                                {faq.answer}
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>

            {/* Right: Support Channels */}
            <div className="md:w-80 space-y-6">
                <GlassCard className="p-6 bg-gradient-to-b from-zinc-900 to-black">
                    <h3 className="text-lg font-bold text-white mb-4">Precisa de ajuda urgente?</h3>
                    <p className="text-zinc-400 text-sm mb-6">Nosso time de concierge está disponível para resolver problemas de acesso em tempo real.</p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={handleWhatsApp}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
                        >
                            <MessageCircle size={18} /> WhatsApp Suporte
                        </button>
                        <button 
                            onClick={handleEmail}
                            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                            <Mail size={18} /> Email Oficial
                        </button>
                    </div>
                </GlassCard>

                <div className="p-4 rounded-xl bg-amber-900/10 border border-amber-500/20 flex items-start gap-3">
                    <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-amber-500 font-bold text-xs uppercase mb-1">Dica Importante</p>
                        <p className="text-zinc-400 text-xs leading-snug">
                            Sempre aumente o brilho do seu celular ao máximo antes de apresentar o QR Code na recepção.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
