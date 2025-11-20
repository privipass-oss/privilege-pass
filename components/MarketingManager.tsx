
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { MarketingAsset } from '../types';
import { Trash2, Plus, Image, FileText, Link as LinkIcon, X } from 'lucide-react';

interface MarketingManagerProps {
  assets: MarketingAsset[];
  onAdd: (asset: MarketingAsset) => void;
  onRemove: (id: string) => void;
}

export const MarketingManager: React.FC<MarketingManagerProps> = ({ assets, onAdd, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<MarketingAsset>>({
    type: 'Image',
    category: 'Stories'
  });

  const handleSave = () => {
    if (newAsset.title && newAsset.description) {
      const asset: MarketingAsset = {
        id: Date.now().toString(),
        title: newAsset.title,
        description: newAsset.description,
        type: newAsset.type || 'Image',
        category: newAsset.category || 'Stories',
        url: newAsset.url || '#',
        content: newAsset.content,
        thumbnail: newAsset.thumbnail || 'https://placehold.co/600x400/18181b/FFF?text=Preview'
      };
      onAdd(asset);
      setIsModalOpen(false);
      setNewAsset({ type: 'Image', category: 'Stories' });
    }
  };

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Kit de Divulgação</h2>
          <p className="text-zinc-400 mt-2">Gerencie os materiais que aparecem no painel dos parceiros.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Novo Material
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <GlassCard key={asset.id} className="flex flex-col h-full" noPadding>
            {asset.type === 'Image' || asset.type === 'PDF' ? (
               <div className="h-40 bg-zinc-800 relative overflow-hidden rounded-t-2xl group">
                  <img src={asset.thumbnail || asset.url} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white font-bold uppercase border border-white/10">
                      {asset.type}
                  </div>
               </div>
            ) : (
               <div className="h-40 bg-zinc-800 relative flex items-center justify-center rounded-t-2xl border-b border-white/5">
                  <FileText size={40} className="text-zinc-600" />
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-white font-bold uppercase border border-white/10">
                      COPY
                  </div>
               </div>
            )}
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-4">
                 <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">{asset.category}</span>
                 <h3 className="text-lg font-bold text-white mt-1 leading-tight">{asset.title}</h3>
                 <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{asset.description}</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[10px] text-zinc-600">ID: {asset.id}</span>
                 <button onClick={() => onRemove(asset.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                    <Trash2 size={16} />
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
                  <h3 className="text-xl font-bold text-white">Adicionar Material</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X /></button>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="text-xs font-bold text-zinc-500 uppercase">Título</label>
                     <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                       onChange={e => setNewAsset({...newAsset, title: e.target.value})} />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-zinc-500 uppercase">Descrição</label>
                     <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                       onChange={e => setNewAsset({...newAsset, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase">Tipo</label>
                        <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                          onChange={e => setNewAsset({...newAsset, type: e.target.value as any})}>
                           <option value="Image">Imagem</option>
                           <option value="PDF">PDF</option>
                           <option value="Text">Texto (Copy)</option>
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase">Categoria</label>
                        <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                          onChange={e => setNewAsset({...newAsset, category: e.target.value as any})}>
                           <option value="Stories">Stories</option>
                           <option value="Feed">Feed</option>
                           <option value="Copy">Copy / Texto</option>
                           <option value="Documentos">Documentos</option>
                        </select>
                     </div>
                  </div>

                  {newAsset.type !== 'Text' ? (
                     <>
                       <div>
                          <label className="text-xs font-bold text-zinc-500 uppercase">URL do Arquivo</label>
                          <input type="text" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                             onChange={e => setNewAsset({...newAsset, url: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-zinc-500 uppercase">Thumbnail URL (Opcional)</label>
                          <input type="text" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                             onChange={e => setNewAsset({...newAsset, thumbnail: e.target.value})} />
                       </div>
                     </>
                  ) : (
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase">Conteúdo do Texto</label>
                        <textarea className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500 h-32 resize-none"
                           onChange={e => setNewAsset({...newAsset, content: e.target.value})} />
                     </div>
                  )}

                  <button onClick={handleSave} className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl mt-4 hover:brightness-110 transition-all">
                     Salvar Material
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
