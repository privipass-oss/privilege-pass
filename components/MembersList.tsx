
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Search, QrCode, X, CheckCircle, UploadCloud, Ban, UserPlus, Trash2, Edit, Smartphone, Image as ImageIcon, Eye, Printer, Hash, Download, Lock, AlertTriangle } from 'lucide-react';
import { Customer, VoucherPack } from '../types';
import { VoucherArt } from './ui/VoucherArt';
import html2canvas from 'html2canvas';

interface MembersListProps {
  customers: Customer[];
  products: VoucherPack[];
  onAddCustomer: (customer: Partial<Customer>) => void;
  onUpdateCustomer: (id: string, data: Partial<Customer>) => void;
  onDeleteCustomer: (id: string) => void;
}

export const MembersList: React.FC<MembersListProps> = ({ customers, products, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Attach Voucher State
  const [voucherToAttach, setVoucherToAttach] = useState<string>('');
  const [uploadedQrCode, setUploadedQrCode] = useState<string | null>(null);
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // New Customer Modal
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({ name: '', email: '', phone: '', password: '' });
  
  // Success/View Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedVoucherData, setGeneratedVoucherData] = useState<any>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PRINT FUNCTION
  const triggerPrint = () => {
      try {
          setTimeout(() => {
            window.focus();
            window.print();
          }, 500);
      } catch (e) {
          console.error("Erro ao tentar imprimir:", e);
          alert("Erro ao abrir diálogo de impressão. Tente Ctrl+P.");
      }
  };

  // DOWNLOAD IMAGE FUNCTION
  const handleDownloadImage = async () => {
      const element = document.getElementById('voucher-print-area');
      if (!element) {
          alert("Erro: Área do voucher não encontrada.");
          return;
      }
      
      setIsDownloading(true);
      try {
          const canvas = await html2canvas(element, {
              useCORS: true,
              allowTaint: false,
              scale: 2, // Better quality
              backgroundColor: '#000000'
          });
          
          const link = document.createElement('a');
          link.download = `Privilege-Voucher-${generatedVoucherData?.passengerName || 'Pass'}.png`;
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (err) {
          console.error("Download failed", err);
          alert("Não foi possível gerar a imagem automaticamente. Por favor, use o botão 'Imprimir' e escolha 'Salvar como PDF'.");
      } finally {
          setIsDownloading(false);
      }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
      e.preventDefault();
      const exists = customers.find(c => c.email === newCustomerData.email);
      if(exists) {
          alert("Email já cadastrado na base!");
          return;
      }
      if(!newCustomerData.password || newCustomerData.password.length < 6) {
          alert("A senha inicial deve ter pelo menos 6 caracteres.");
          return;
      }
      onAddCustomer(newCustomerData);
      setIsNewCustomerModalOpen(false);
      setNewCustomerData({ name: '', email: '', phone: '', password: '' });
      alert('Cliente cadastrado com sucesso! As credenciais (Email/Senha) já estão ativas para login.');
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      if(window.confirm('ATENÇÃO: Tem certeza que deseja EXCLUIR este cliente?\n\nTodos os vouchers e histórico serão apagados permanentemente.')) {
          onDeleteCustomer(id);
          setSelectedCustomer(null);
          alert("Cliente excluído com sucesso.");
      }
  }

  const handleStatusChange = () => {
      if (!selectedCustomer) return;
      const newStatus = selectedCustomer.name.includes('(Bloqueado)') ? selectedCustomer.name.replace(' (Bloqueado)', '') : `${selectedCustomer.name} (Bloqueado)`;
      onUpdateCustomer(selectedCustomer.id, { name: newStatus });
      alert(`Status alterado para: ${newStatus.includes('Bloqueado') ? 'Bloqueado' : 'Ativo'}`);
  }

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setUploadedQrCode(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setVoucherCodeInput(val);
  }

  const handleViewHistoryVoucher = (voucher: any) => {
      if (!selectedCustomer) return;
      
      if (voucher.status === 'Processando') {
         alert("Este voucher está pendente de emissão. Use o formulário à direita para anexar o QR Code e finalizar.");
         // Pre-select pack to help admin
         const pack = products.find(p => p.name === voucher.packName);
         if(pack) setVoucherToAttach(pack.id);
         return;
      }

      setGeneratedVoucherData({
          passengerName: selectedCustomer.name,
          planName: voucher.packName,
          qrCodeUrl: voucher.qrCodeUrl,
          type: voucher.packName.includes('Internacional') ? 'Internacional' : 'Nacional',
          code: voucher.code || "0000 0000 0000 0000"
      });
      setShowSuccessModal(true);
  };

  const handleAttachVoucher = () => {
    if(!voucherToAttach) {
        alert("Selecione um pacote.");
        return;
    }
    if(!uploadedQrCode) {
        alert("Por favor, faça o upload da imagem do QR Code.");
        return;
    }
    if(voucherCodeInput.length < 16) {
        alert("Por favor, digite os 16 números do código de validação.");
        return;
    }
    
    const pack = products.find(p => p.id === voucherToAttach);
    
    if (selectedCustomer) {
        const newVoucher = {
            packName: pack?.name || 'Voucher Manual',
            remainingAccess: pack?.accessCount || 1,
            totalAccess: pack?.accessCount || 1,
            status: 'Ativo' as const,
            purchaseDate: new Date().toLocaleDateString('pt-BR'),
            qrCodeUrl: uploadedQrCode,
            code: voucherCodeInput,
            id: Date.now().toString()
        };
        
        // If we are fulfilling a pending voucher, replace it
        let updatedVouchers = [...(selectedCustomer.activeVouchers || [])];
        const pendingIndex = updatedVouchers.findIndex(v => v.status === 'Processando' && v.packName === pack?.name);
        
        if (pendingIndex >= 0) {
            updatedVouchers[pendingIndex] = newVoucher; 
        } else {
            updatedVouchers.push(newVoucher); 
        }

        onUpdateCustomer(selectedCustomer.id, { activeVouchers: updatedVouchers as any });
        setSelectedCustomer({ ...selectedCustomer, activeVouchers: updatedVouchers as any });
    }

    setGeneratedVoucherData({
        passengerName: selectedCustomer?.name,
        planName: pack?.name,
        qrCodeUrl: uploadedQrCode,
        type: pack?.type,
        code: voucherCodeInput
    });
    setShowSuccessModal(true);
  };

  const selectedPackDetails = products.find(p => p.id === voucherToAttach);

  return (
    <div className="p-8 animate-fade-in pb-20 relative">
      
      {/* VIEW VOUCHER / SUCCESS MODAL */}
      {showSuccessModal && generatedVoucherData && (
          <div className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto">
               {/* Safe Scroll Container */}
              <div className="min-h-screen flex items-start justify-center py-12 px-4" onClick={() => setShowSuccessModal(false)}>
                  <div className="w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        {/* Actions Toolbar */}
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col md:flex-row gap-4 no-print z-50">
                            <button 
                                type="button"
                                onClick={handleDownloadImage}
                                disabled={isDownloading}
                                className="px-6 py-3 bg-gradient-gold text-black rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-xl font-bold cursor-pointer disabled:opacity-50"
                            >
                                {isDownloading ? <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></span> : <Download size={20} />}
                                Baixar Imagem (PNG)
                            </button>
                            <button 
                                type="button"
                                onClick={triggerPrint}
                                className="px-6 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors flex items-center gap-2 border border-white/10 shadow-xl font-bold cursor-pointer"
                            >
                                <Printer size={20} /> Imprimir PDF
                            </button>
                            <button 
                                type="button"
                                onClick={() => setShowSuccessModal(false)}
                                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-xl"
                            >
                                <X size={20} /> Fechar
                            </button>
                        </div>

                        <div className="text-center mb-8 no-print mt-32 md:mt-0">
                            <h2 className="text-3xl font-bold text-white text-gradient-gold mb-2">Voucher Gerado</h2>
                            <p className="text-zinc-400 max-w-md mx-auto">
                                Clique em "Baixar Imagem" para enviar pelo WhatsApp ou Imprimir.
                            </p>
                        </div>

                        {/* Printable Area */}
                        <div id="voucher-print-area" className="scale-100 transform-gpu mb-10">
                            <VoucherArt 
                                passengerName={generatedVoucherData.passengerName}
                                planName={generatedVoucherData.planName}
                                qrCodeUrl={generatedVoucherData.qrCodeUrl}
                                type={generatedVoucherData.type}
                                voucherCode={generatedVoucherData.code}
                            />
                        </div>
                  </div>
              </div>
          </div>
      )}

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Gestão de Clientes</h2>
          <p className="text-zinc-400 mt-2">Controle total da base de membros.</p>
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => setIsNewCustomerModalOpen(true)}
             className="px-4 py-2.5 bg-gradient-gold text-black rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-gold-500/10"
          >
              <UserPlus size={18} /> Novo Cliente
          </button>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
             <input 
               type="text" 
               placeholder="Buscar..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-10 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white w-64 focus:border-amber-500/50 outline-none"
             />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map((customer) => (
          <GlassCard key={customer.id} className="group hover:border-amber-500/30 transition-all duration-300" noPadding>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex items-center gap-5 lg:w-1/3 w-full">
                <div className="relative">
                  <img src={customer.avatarUrl} alt={customer.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">{customer.name}</h3>
                  <p className="text-zinc-500 text-sm">{customer.email}</p>
                </div>
              </div>

              <div className="flex-1 w-full">
                 {customer.activeVouchers && customer.activeVouchers.some(v => v.status === 'Processando') ? (
                    <div className="flex items-center gap-3 bg-amber-900/20 px-4 py-2 rounded-lg border border-amber-500/20 w-fit animate-pulse">
                      <AlertTriangle size={16} className="text-amber-500" />
                      <span className="text-sm text-amber-500 font-bold">Voucher Pendente</span>
                      <span className="text-xs text-zinc-400 ml-2">Requer Emissão</span>
                    </div>
                 ) : customer.activeVouchers && customer.activeVouchers.length > 0 ? (
                    <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5 w-fit">
                      <QrCode size={16} className="text-amber-500" />
                      <span className="text-sm text-zinc-300">{customer.activeVouchers[0].packName}</span>
                      <span className="text-xs text-zinc-500 ml-auto border-l border-white/10 pl-2">{customer.activeVouchers[0].remainingAccess} rest.</span>
                    </div>
                 ) : (
                    <span className="text-sm text-zinc-600 italic">Nenhum voucher ativo</span>
                 )}
              </div>

              <div className="flex gap-3 w-full lg:w-auto justify-end">
                 <button onClick={() => setSelectedCustomer(customer)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white border border-white/10 flex items-center gap-2">
                    <Edit size={14} /> Gerenciar
                 </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Create Customer Modal - FIX: Uses flex-start/overflow-auto to prevent clipping */}
      {isNewCustomerModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto" onClick={() => setIsNewCustomerModalOpen(false)}>
              <div className="min-h-full flex items-start justify-center py-20 px-4">
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setIsNewCustomerModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X /></button>
                      <h3 className="text-xl font-bold text-white mb-6">Cadastro Manual</h3>
                      <form onSubmit={handleCreateCustomer} className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-500">Nome Completo</label>
                            <input required type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500" placeholder="Nome" onChange={e => setNewCustomerData({...newCustomerData, name: e.target.value})}/>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-500">Email (Login)</label>
                            <input required type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500" placeholder="Email" onChange={e => setNewCustomerData({...newCustomerData, email: e.target.value})}/>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-500">Telefone</label>
                            <input required type="tel" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white mt-1 outline-none focus:border-gold-500" placeholder="Telefone" onChange={e => setNewCustomerData({...newCustomerData, phone: e.target.value})}/>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-1"><Lock size={10} /> Senha Inicial</label>
                            <input required type="text" className="w-full bg-black border border-emerald-500/30 rounded-lg p-3 text-white mt-1 outline-none focus:border-emerald-500" placeholder="Crie uma senha" onChange={e => setNewCustomerData({...newCustomerData, password: e.target.value})}/>
                            <p className="text-[10px] text-zinc-500 text-right">O cliente usará esta senha para logar.</p>
                          </div>

                          <button type="submit" className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl mt-2">Cadastrar</button>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* Manage Customer Modal (SCROLLABLE FIXED OVERLAY) */}
      {selectedCustomer && (
        <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedCustomer(null)}
        >
            {/* Flex items-start prevents top cutoff */}
            <div className="min-h-full flex items-start justify-center py-12 px-4" onClick={e => e.stopPropagation()}>
                
                {/* Modal Container */}
                <div 
                    className="w-full max-w-5xl bg-zinc-900 border border-amber-500/20 rounded-3xl shadow-2xl flex flex-col md:flex-row relative"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button Sticky */}
                    <div className="absolute top-4 right-4 z-50">
                        <button 
                            onClick={() => setSelectedCustomer(null)} 
                            className="p-2 bg-black text-zinc-400 hover:text-white rounded-full border border-white/10 shadow-lg"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Left Column: User Info & History */}
                    <div className="md:w-1/2 p-6 md:p-8 border-r border-white/5 bg-zinc-900/50">
                        <div className="flex items-center gap-4 mb-8 mt-4 md:mt-0">
                            <img src={selectedCustomer.avatarUrl} className="w-16 h-16 rounded-full border-2 border-amber-500" />
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedCustomer.name}</h3>
                                <p className="text-zinc-400 text-sm">{selectedCustomer.email}</p>
                                {selectedCustomer.password && <p className="text-zinc-600 text-[10px] mt-1">Senha: {selectedCustomer.password}</p>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Ações da Conta</h4>
                                <div className="flex gap-2">
                                    <button 
                                      onClick={(e) => handleDelete(e, selectedCustomer.id)} 
                                      className="flex-1 p-2 bg-red-900/20 text-red-500 text-xs font-bold rounded border border-red-500/20 flex items-center justify-center gap-1 hover:bg-red-900/30 transition-colors"
                                    >
                                      <Trash2 size={12} /> Excluir
                                    </button>
                                    <button onClick={handleStatusChange} className="flex-1 p-2 bg-zinc-800 text-zinc-300 text-xs font-bold rounded border border-white/10 flex items-center justify-center gap-1"><Ban size={12} /> {selectedCustomer.name.includes('Bloqueado') ? 'Desbloquear' : 'Bloquear'}</button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Vouchers Emitidos</h4>
                                <div className="space-y-3">
                                    {selectedCustomer.activeVouchers && selectedCustomer.activeVouchers.length > 0 ? (
                                        selectedCustomer.activeVouchers.map((v, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => handleViewHistoryVoucher(v)}
                                                className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all group ${v.status === 'Processando' ? 'bg-amber-900/10 border-amber-500/30 hover:bg-amber-900/20' : 'bg-zinc-800/50 border-white/5 hover:bg-zinc-800 hover:border-gold-500/30'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg transition-colors ${v.status === 'Processando' ? 'text-amber-500' : 'text-zinc-500 group-hover:text-gold-500'}`}>
                                                        {v.status === 'Processando' ? <AlertTriangle size={16} /> : <Eye size={16} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm font-bold group-hover:text-gold-500 transition-colors">{v.packName}</p>
                                                        <p className="text-zinc-500 text-xs">{v.purchaseDate}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-xs font-bold block ${v.status === 'Processando' ? 'text-amber-500' : 'text-emerald-500'}`}>{v.status}</span>
                                                    <span className="text-[10px] text-zinc-600 font-mono">{v.code ? v.code.substring(0,4) + '...' : ''}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-zinc-500 text-sm italic">Nenhum voucher.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Voucher Generator */}
                    <div className="md:w-1/2 bg-black relative flex flex-col p-6 md:p-8 rounded-b-3xl md:rounded-tr-3xl md:rounded-bl-none">
                        
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <QrCode className="text-gold-500" /> Emitir Voucher
                        </h3>
                        <p className="text-zinc-400 text-sm mb-6">Preencha os dados para validar e gerar a arte.</p>

                        <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1 block">1. Selecione o Plano</label>
                                    <select 
                                        className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white text-sm outline-none"
                                        value={voucherToAttach}
                                        onChange={e => setVoucherToAttach(e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1"><Hash size={12} /> 2. Código de Validação (16 Dígitos)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white text-sm font-mono outline-none focus:border-gold-500"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={voucherCodeInput}
                                        onChange={handleVoucherCodeChange}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] text-zinc-400 uppercase font-bold mb-1 block">3. Upload do QR Code</label>
                                    <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center hover:border-gold-500/50 transition-colors cursor-pointer relative">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleQrUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <UploadCloud className="text-zinc-500" />
                                            <p className="text-xs text-zinc-400">Clique para selecionar o arquivo</p>
                                            {uploadedQrCode && <span className="text-emerald-500 text-xs font-bold">Arquivo carregado!</span>}
                                        </div>
                                    </div>
                                </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 bg-zinc-900/50 rounded-xl border border-white/5 p-4 flex items-center justify-center relative min-h-[300px]">
                            <div className="absolute top-2 left-2 text-[10px] text-zinc-500 uppercase font-bold z-10 flex items-center gap-1">
                                <Smartphone size={10} /> Visualização
                            </div>
                            
                            <div className="relative scale-90 origin-center">
                                {voucherToAttach ? (
                                    <VoucherArt 
                                        passengerName={selectedCustomer.name}
                                        planName={selectedPackDetails?.name || 'Voucher'}
                                        qrCodeUrl={uploadedQrCode || ''}
                                        type={selectedPackDetails?.type}
                                        voucherCode={voucherCodeInput || "0000 0000 0000 0000"}
                                    />
                                ) : (
                                    <div className="text-zinc-600 text-sm flex flex-col items-center gap-2 p-8">
                                        <ImageIcon size={32} opacity={0.2} />
                                        Selecione um plano para visualizar.
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={handleAttachVoucher}
                            className="w-full mt-6 p-4 bg-gradient-gold text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-gold-500/20"
                            >
                                <Eye size={18} />
                                Emitir & Visualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
