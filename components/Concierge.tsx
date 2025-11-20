
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, CornerDownLeft } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Concierge: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Boa noite. Sou o Concierge Privilege. Estou à disposição para organizar eventos, sugerir menus exclusivos ou gerenciar solicitações VIP.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Administrador' : 'Concierge'}: ${m.text}`);
    const responseText = await sendMessageToGemini(userMsg.text, history);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col animate-fade-in pb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            Privilege Concierge <Sparkles className="text-amber-500" size={20} />
          </h2>
          <p className="text-zinc-400 mt-1">Inteligência Artificial dedicada para High-End Lifestyle.</p>
        </div>
      </div>

      <GlassCard className="flex-1 flex flex-col overflow-hidden !p-0 border-zinc-800">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-zinc-950/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`
                w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-2
                ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-gradient-to-br from-amber-500 to-yellow-700 text-black shadow-lg shadow-amber-500/20'}
              `}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              </div>
              
              <div className={`
                max-w-[85%] md:max-w-[70%] p-5 rounded-2xl text-sm leading-relaxed shadow-md
                ${msg.role === 'user' 
                  ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm' 
                  : 'bg-[#0f0f11] border border-white/5 text-zinc-300 rounded-tl-sm'}
              `}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[10px] opacity-40 mt-3 block font-medium uppercase tracking-wide">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-yellow-700 text-black flex items-center justify-center mt-2">
                 <Sparkles size={14} className="animate-spin-slow" />
               </div>
               <div className="bg-[#0f0f11] border border-white/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
                 <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black border-t border-white/10">
          <div className="relative flex items-center bg-zinc-900 rounded-xl border border-white/5 focus-within:border-amber-500/50 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Solicite algo ao Concierge..."
              className="w-full bg-transparent text-zinc-200 placeholder-zinc-600 py-4 pl-5 pr-14 focus:outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 p-2 bg-amber-600 hover:bg-amber-500 text-black rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-600/20"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <CornerDownLeft size={20} />}
            </button>
          </div>
          <p className="text-center text-[10px] text-zinc-600 mt-2">
            Privilege Concierge pode cometer erros. Verifique informações importantes.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};
