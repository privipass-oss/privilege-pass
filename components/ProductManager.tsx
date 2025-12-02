// ProductManager.tsx - OTIMIZADO
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { VoucherPack } from '../types';
import { Edit2, DollarSign, CheckCircle, X, Tag, Power } from 'lucide-react';

interface ProductManagerProps {
  products: VoucherPack[];
  onUpdateProduct: (product: VoucherPack) => void;
}

export const ProductManager: React.FC<ProductManagerProps> = ({ 
  products, 
  onUpdateProduct 
}) => {
  // ✅ CORRIGIDO: Type Safety
  const [editingProduct, setEditingProduct] = useState<VoucherPack | null>(null);
  const [formData, setFormData] = useState<Partial<VoucherPack>>({});

  const handleEditClick = (product: VoucherPack) => {
    setEditingProduct(product);
    setFormData({ ...product });
  };

  const handleToggleActive = (e: React.MouseEvent, product: VoucherPack) => {
    e.stopPropagation();
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
        price: Number(formData.price)
      } as VoucherPack);
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
          <Tag className="text-amber-500" />
          Produtos & Preços
        </h2>
        <p className="text-zinc-400">Gerencie os valores dos vouchers e visibilidade na loja.</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => {
          const isActive = product.isActive !== false;
          
          return (
            <GlassCard key={product.id} className="group cursor-pointer hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  ${isActive 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/20 text-red-400'
                  }
                `}>
                  {!isActive ? 'INATIVO (OFF)' : product.type}
                </span>

                <div className="flex gap-2">
                  {/* Toggle Button */}
                  <button
                    onClick={(e) => handleToggleActive(e, product)}
                    style={{
                      backgroundColor: isActive ? '#10b981' : '#18181b',
                      borderColor: isActive ? '#34d399' : '#7f1d1d',
                      color: isActive ? '#000' : '#ef4444',
                    }}
                    className="p-2 rounded-lg border shadow-lg transition-transform active:scale-95 hover:scale-105"
                    title={isActive ? "Desativar Produto" : "Ativar Produto"}
                  >
                    <Power size={18} />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditClick(product)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                    title="Editar Detalhes"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg mb-1">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Preço Atual</p>
                  <p className="text-2xl font-bold text-amber-500">R$ {product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Acesso(s)</p>
                  <p className="text-2xl font-bold text-blue-500">{product.accessCount}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div
          onClick={() => setEditingProduct(null)}
          className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto py-24 z-50"
        >
          <GlassCard
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md relative"
          >
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-1">Editar Produto</h3>
            <p className="text-zinc-400 mb-6">Alterações refletem na hora.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Nome do Pacote
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Descrição (Marketing)
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-amber-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-amber-500"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-3 bg-gradient-gold hover:shadow-xl text-black font-bold rounded-lg transition-all"
            >
              Salvar Alterações
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
