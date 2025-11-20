
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { VoucherPack } from '../types';
import { Edit2, DollarSign, CheckCircle, X, Tag, Power } from 'lucide-react';

interface ProductManagerProps {
  products: VoucherPack[];
  onUpdateProduct: (product: VoucherPack) => void;
}

export const ProductManager: React.FC<ProductManagerProps> = ({ products, onUpdateProduct }) => {
  const [editingProduct, setEditingProduct] = useState<VoucherPack | null>(null);
  const [formData, setFormData] = useState<Partial<VoucherPack>>({});

  const handleEditClick = (product: VoucherPack) => {
    setEditingProduct(product);
    setFormData({ ...product });
  };

  const handleToggleActive = (e: React.MouseEvent, product: VoucherPack) => {
    e.stopPropagation(); // Stop bubbling to card click
    
    // Determine if currently active (defaults to true if undefined)
    const isCurrentlyActive = product.isActive !== false;
    const newState = !isCurrentlyActive;

    console.log(`Toggling Product ${product.id}: ${isCurrentlyActive} -> ${newState}`);

    onUpdateProduct({
        ...product,
        isActive: newState
    });
  };

  const handleSave = () => {
    if (editingProduct && formData.name && formData.price) {
      onUpdateProduct({
        ...editingProduct,
        ...formData,
        price: Number(formData.price) // Ensure number
      } as VoucherPack);
      setEditingProduct(null);
    }
  };

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Produtos & Preços</h2>
          <p className="text-zinc-400 mt-2">Gerencie os valores dos vouchers e visibilidade na loja.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          // Explicitly calculate active state
          const isActive = product.isActive !== false;

          return (
            <GlassCard 
                key={product.id} 
                className={`relative group transition-all flex flex-col h-full ${isActive ? 'hover:border-gold-500/30' : 'opacity-80 grayscale bg-zinc-900/30 border-zinc-800'}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors duration-300 ${
                        !isActive ? 'bg-red-500/20 text-red-500' :
                        product.type === 'Internacional' ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-700 text-zinc-300'
                    }`}>
                        {!isActive ? 'INATIVO (OFF)' : product.type}
                    </div>
                    
                    <div className="flex gap-2">
                        {/* Explicit Color Styles for Toggle Button */}
                        <button 
                            onClick={(e) => handleToggleActive(e, product)}
                            style={{
                                backgroundColor: isActive ? '#10b981' : '#18181b', // Emerald-500 or Zinc-900
                                borderColor: isActive ? '#34d399' : '#7f1d1d', // Emerald-400 or Red-900
                                color: isActive ? '#000' : '#ef4444', // Black or Red-500
                            }}
                            className={`p-2 rounded-lg border shadow-lg transition-transform active:scale-95 hover:scale-105`}
                            title={isActive ? "Desativar Produto" : "Ativar Produto"}
                        >
                            <Power size={16} strokeWidth={3} />
                        </button>
                        
                        <button 
                            onClick={() => handleEditClick(product)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                            title="Editar Detalhes"
                        >
                            <Edit2 size={16} />
                        </button>
                    </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}>{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-1">{product.description}</p>
                
                <div className="border-t border-white/5 pt-4 mt-auto">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Preço Atual</p>
                    <p className={`text-3xl font-bold ${isActive ? 'text-white' : 'text-zinc-500'}`}>R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-zinc-600 mt-1">{product.accessCount} Acesso(s)</p>
                </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X /></button>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-gold-500/20 rounded-xl text-gold-500">
                  <Tag size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white">Editar Produto</h3>
                  <p className="text-zinc-400 text-sm">Alterações refletem na hora.</p>
               </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">Nome do Pacote</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase">Descrição (Marketing)</label>
                <textarea 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500 h-24 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1"><DollarSign size={12}/> Preço (R$)</label>
                <input 
                  type="number" 
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="pt-2">
                 <button 
                  onClick={handleSave}
                  className="w-full py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
