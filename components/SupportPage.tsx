
import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail } from 'lucide-react';
import { FAQItem } from '../types';
import { GlassCard } from './ui/GlassCard';
import { LOGO_URL } from '../constants';

interface SupportPageProps {
  items: FAQItem[];
  onBack: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ items, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  // Derived Categories
  const categories = ['Todos', ...Array.from(new Set(items.map(i => i.category || 'Geral')))];

  // Filter Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-zinc-200 pb-20">
      {/* Header */}
      <div className="bg-zinc-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
           <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft size={20} /> Voltar
           </button>
           <div className="flex items-center gap-3">
              <img src={LOGO_URL} className="w-8 h-8 rounded object-cover border border-gold-500/30" />
              <span className="font-bold text-lg text-white">Central de Ajuda</span>
           </div>
           <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
         
         {/* Search Hero */}
         <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Como podemos ajudar?</h1>
            <p className="text-zinc-400 mb-8">Busque por dúvidas sobre acesso, pagamentos ou regras.</p>
            
            <div className="relative max-w-xl mx-auto">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
               <input 
                 type="text" 
                 placeholder="Digite sua dúvida (ex: cancelamento, crianças)..." 
                 className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white focus:border-gold-500/50 outline-none shadow-xl transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         {/* Category Filters */}
         <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    activeCategory === cat 
                    ? 'bg-gold-500 text-black border-gold-500' 
                    : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                 }`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Results */}
         <div className="space-y-4">
            {filteredItems.length === 0 ? (
               <div className="text-center py-12">
                  <HelpCircle size={48} className="mx-auto text-zinc-600 mb-4" />
                  <p className="text-zinc-500">Nenhum resultado encontrado para "{searchQuery}".</p>
               </div>
            ) : (
               filteredItems.map((item) => (
                  <GlassCard 
                     key={item.id}
                     className={`cursor-pointer transition-all duration-300 group ${openIndex === item.id ? 'border-gold-500/30 bg-zinc-900' : 'hover:bg-white/5'}`}
                     noPadding
                  >
                     <div 
                        className="p-6 flex justify-between items-center"
                        onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)}
                     >
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] uppercase font-bold text-zinc-500 border border-zinc-700 px-2 py-1 rounded">{item.category || 'Geral'}</span>
                           <h3 className={`font-bold text-lg ${openIndex === item.id ? 'text-gold-500' : 'text-zinc-200 group-hover:text-white'}`}>
                              {item.question}
                           </h3>
                        </div>
                        {openIndex === item.id ? <ChevronUp className="text-gold-500"/> : <ChevronDown className="text-zinc-500"/>}
                     </div>
                     
                     {openIndex === item.id && (
                        <div className="px-6 pb-8 pt-2 text-zinc-300 leading-relaxed border-t border-white/5 animate-fade-in pl-20">
                           {item.answer}
                        </div>
                     )}
                  </GlassCard>
               ))
            )}
         </div>

         {/* Bottom Support CTA */}
         <div className="mt-16 pt-16 border-t border-white/5 text-center">
            <p className="text-zinc-400 mb-6">Ainda precisa de ajuda?</p>
            <div className="flex justify-center gap-4">
               <button 
                 onClick={() => window.open('https://wa.me/5521920222269', '_blank')}
                 className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
               >
                  <MessageCircle size={18} /> Falar no WhatsApp
               </button>
               <button 
                 onClick={() => window.location.href = 'mailto:privi.pass@gmail.com'}
                 className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors"
               >
                  <Mail size={18} /> Enviar Email
               </button>
            </div>
         </div>

      </div>
    </div>
  );
};
