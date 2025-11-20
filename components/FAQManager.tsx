
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { FAQItem } from '../types';
import { Trash2, Plus, Edit2, X, Save } from 'lucide-react';

interface FAQManagerProps {
  items: FAQItem[];
  onAdd: (item: FAQItem) => void;
  onUpdate: (item: FAQItem) => void;
  onRemove: (id: string) => void;
}

export const FAQManager: React.FC<FAQManagerProps> = ({ items, onAdd, onUpdate, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [formData, setFormData] = useState<Partial<FAQItem>>({ category: 'Geral' });

  const openAdd = () => {
      setEditingItem(null);
      setFormData({ category: 'Geral' });
      setIsModalOpen(true);
  };

  const openEdit = (item: FAQItem) => {
      setEditingItem(item);
      setFormData({ ...item });
      setIsModalOpen(true);
  };

  const handleSave = () => {
      if (formData.question && formData.answer) {
          if (editingItem) {
              onUpdate({ ...editingItem, ...formData } as FAQItem);
          } else {
              onAdd({
                  id: Date.now().toString(),
                  question: formData.question,
                  answer: formData.answer,
                  category: formData.category as any
              });
          }
          setIsModalOpen(false);
      }
  };

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Gestão de FAQ</h2>
          <p className="text-zinc-400 mt-2">Edite as perguntas frequentes que aparecem no site e na área do cliente.</p>
        </div>
        <button 
          onClick={openAdd}
          className="px-6 py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Nova Pergunta
        </button>
      </div>

      <div className="space-y-4">
          {items.map(item => (
              <GlassCard key={item.id} className="flex justify-between items-start gap-4" noPadding>
                  <div className="p-6 flex-1">
                      <span className="text-[10px] uppercase font-bold bg-zinc-800 px-2 py-1 rounded text-zinc-400 border border-white/10 mb-2 inline-block">{item.category || 'Geral'}</span>
                      <h4 className="text-gold-500 font-bold mb-2">{item.question}</h4>
                      <p className="text-zinc-400 text-sm">{item.answer}</p>
                  </div>
                  <div className="p-4 flex flex-col gap-2 border-l border-white/5">
                      <button 
                        onClick={() => openEdit(item)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-300 transition-colors"
                      >
                          <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { if(window.confirm('Excluir pergunta?')) onRemove(item.id) }}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                      >
                          <Trash2 size={16} />
                      </button>
                  </div>
              </GlassCard>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{editingItem ? 'Editar Pergunta' : 'Nova Pergunta'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                 <label className="text-xs font-bold text-zinc-500 uppercase">Categoria</label>
                 <select 
                   className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                   value={formData.category || 'Geral'}
                   onChange={e => setFormData({...formData, category: e.target.value as any})}
                 >
                    <option value="Geral">Geral</option>
                    <option value="Acesso">Acesso</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Técnico">Técnico</option>
                 </select>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">Pergunta</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                  value={formData.question || ''}
                  onChange={e => setFormData({...formData, question: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">Resposta</label>
                <textarea 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500 h-32 resize-none"
                  value={formData.answer || ''}
                  onChange={e => setFormData({...formData, answer: e.target.value})}
                />
              </div>

              <button 
                onClick={handleSave}
                className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl mt-4 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
