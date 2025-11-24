
import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Mail, Send, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Customer, Partner, EmailCampaign } from '../types';

interface MailManagerProps {
  customers: Customer[];
  partners: Partner[];
  campaigns: EmailCampaign[];
  onSendCampaign: (campaign: EmailCampaign) => void;
}

export const MailManager: React.FC<MailManagerProps> = ({ customers, partners, campaigns, onSendCampaign }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipientType, setRecipientType] = useState<'ALL' | 'CUSTOMERS' | 'PARTNERS'>('CUSTOMERS');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateRecipients = () => {
      if (recipientType === 'ALL') return customers.length + partners.length;
      if (recipientType === 'CUSTOMERS') return customers.length;
      return partners.length;
  };

  const handleSend = () => {
      if (!subject || !message) {
          alert("Por favor, preencha o assunto e a mensagem.");
          return;
      }

      setIsSending(true);

      // Simulating API Delay
      setTimeout(() => {
          const newCampaign: EmailCampaign = {
              id: Date.now().toString(),
              subject,
              content: message,
              recipientType,
              sentDate: new Date().toLocaleString(),
              status: 'Sent',
              sentCount: calculateRecipients()
          };

          onSendCampaign(newCampaign);
          setIsSending(false);
          setShowSuccess(true);
          setSubject('');
          setMessage('');
          
          setTimeout(() => setShowSuccess(false), 3000);
      }, 1500);
  };

  return (
    <div className="p-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-white">Email Marketing</h2>
          <p className="text-zinc-400 mt-2">Dispare comunicados, promoções e avisos para sua base.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Compose Area */}
          <div className="lg:col-span-2 space-y-6">
              <GlassCard>
                  <div className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Destinatários</label>
                          <div className="flex gap-2">
                              <button 
                                onClick={() => setRecipientType('CUSTOMERS')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${recipientType === 'CUSTOMERS' ? 'bg-amber-600 border-amber-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}
                              >
                                  Clientes ({customers.length})
                              </button>
                              <button 
                                onClick={() => setRecipientType('PARTNERS')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${recipientType === 'PARTNERS' ? 'bg-amber-600 border-amber-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}
                              >
                                  Parceiros ({partners.length})
                              </button>
                              <button 
                                onClick={() => setRecipientType('ALL')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${recipientType === 'ALL' ? 'bg-amber-600 border-amber-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-400'}`}
                              >
                                  Todos ({customers.length + partners.length})
                              </button>
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Assunto</label>
                          <input 
                             type="text" 
                             className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-amber-500"
                             placeholder="Ex: Promoção Relâmpago: Salas Internacionais"
                             value={subject}
                             onChange={e => setSubject(e.target.value)}
                          />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Mensagem</label>
                          <textarea 
                             className="w-full bg-zinc-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-amber-500 h-64 resize-none"
                             placeholder="Escreva sua mensagem aqui..."
                             value={message}
                             onChange={e => setMessage(e.target.value)}
                          />
                      </div>

                      <div className="flex justify-between items-center pt-4">
                          <div className="text-xs text-zinc-500 flex items-center gap-2">
                              <AlertCircle size={14} />
                              <span>O sistema enviará emails individuais para {calculateRecipients()} contatos.</span>
                          </div>
                          <button 
                             onClick={handleSend}
                             disabled={isSending || calculateRecipients() === 0}
                             className="px-8 py-3 bg-gradient-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              {isSending ? 'Enviando...' : <><Send size={18} /> Enviar Campanha</>}
                          </button>
                      </div>

                      {showSuccess && (
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 animate-fade-in">
                              <CheckCircle size={20} /> Campanha enviada para a fila de processamento com sucesso!
                          </div>
                      )}
                  </div>
              </GlassCard>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-white mb-4">Histórico de Envios</h3>
              <div className="space-y-4">
                  {campaigns.length === 0 ? (
                      <div className="text-zinc-500 text-sm text-center py-8 border border-dashed border-white/10 rounded-xl">
                          Nenhuma campanha enviada.
                      </div>
                  ) : (
                      campaigns.map(campaign => (
                          <GlassCard key={campaign.id} className="flex flex-col gap-2" noPadding>
                              <div className="p-4">
                                  <div className="flex justify-between items-start mb-1">
                                      <span className="text-[10px] font-bold bg-zinc-800 px-2 py-1 rounded text-zinc-400 uppercase">{campaign.recipientType}</span>
                                      <span className="text-[10px] text-zinc-500">{campaign.sentDate}</span>
                                  </div>
                                  <h4 className="font-bold text-white text-sm line-clamp-1" title={campaign.subject}>{campaign.subject}</h4>
                                  <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                                      <CheckCircle size={12} />
                                      <span>{campaign.sentCount} enviados</span>
                                  </div>
                              </div>
                          </GlassCard>
                      ))
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};
