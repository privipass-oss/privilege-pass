
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { PartnerBenefit } from '../types';
import { Trash2, Plus, CheckCircle, X } from 'lucide-react';

interface BenefitsManagerProps {
  benefits: PartnerBenefit[];
  onAdd: (benefit: PartnerBenefit) => void;
  onRemove: (id: string) => void;
}

export const BenefitsManager: React.FC<BenefitsManagerProps> = ({ benefits, onAdd, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBenefit, setNewBenefit] = useState<Partial<PartnerBenefit>>({
    category: 'Shopping'
  });

  const handleSave = () => {
    if (newBenefit.name && newBenefit.discount && newBenefit.code) {
      const benefit: PartnerBenefit = {
        id: Date.now().toString(),
        name: newBenefit.name,
        description: newBenefit.description || '',
        discount: newBenefit.discount,
        image: newBenefit.image || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop',
        category: newBenefit.category as any,
        code: newBenefit.code
      };
      onAdd(benefit);
      setIsModalOpen(false);
      setNewBenefit({ category: 'Shopping' });
    }
  };

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Clube de Benefícios</h2>
          <p className="text-zinc-400 mt-2">Gerencie os parceiros e descontos visíveis para os clientes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Novo Benefício
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <GlassCard key={benefit.id} className="relative group" noPadding>
            <div className="h-32 relative overflow-hidden rounded-t-2xl">
              <img src={benefit.image} alt={benefit.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white">
                {benefit.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{benefit.name}</h3>
              <p className="text-gold-500 font-bold text-lg mb-2">{benefit.discount}</p>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{benefit.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <code className="bg-white/5 px-2 py-1 rounded text-xs text-zinc-300 font-mono">{benefit.code}</code>
                <button 
                  onClick={() => onRemove(benefit.id)}
                  className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add Modal - FIXED LAYOUT SCROLL items-start + py-24 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setIsModalOpen(false)}>
          <div className="min-h-full flex items-start justify-center p-4 py-24">
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Adicionar Parceiro</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Nome do Parceiro</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                    onChange={e => setNewBenefit({...newBenefit, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase">Desconto (Ex: 20% OFF)</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                      onChange={e => setNewBenefit({...newBenefit, discount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase">Código Cupom</label>
                    <input 
                      type="text" 
                      className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                      onChange={e => setNewBenefit({...newBenefit, code: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Categoria</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                    onChange={e => setNewBenefit({...newBenefit, category: e.target.value as any})}
                  >
                    <option value="Shopping">Shopping</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Hospedagem">Hospedagem</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Descrição Curta</label>
                  <textarea 
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500 h-20 resize-none"
                    onChange={e => setNewBenefit({...newBenefit, description: e.target.value})}
                  />
                </div>
                <div>
                   <label className="text-xs font-bold text-zinc-500 uppercase">URL da Imagem (Opcional)</label>
                   <input 
                      type="text" 
                      placeholder="https://..."
                      className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                      onChange={e => setNewBenefit({...newBenefit, image: e.target.value})}
                    />
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl mt-4 hover:brightness-110 transition-all"
                >
                  Salvar Benefício
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
