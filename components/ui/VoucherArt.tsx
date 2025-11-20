
import React from 'react';
import { LOGO_URL } from '../../constants';
import { Plane, Globe, Star, Clock } from 'lucide-react';

interface VoucherArtProps {
  passengerName: string;
  planName: string;
  qrCodeUrl: string; // Base64 or URL
  type?: 'Nacional' | 'Internacional';
  expiryDate?: string;
  voucherCode?: string; // 16 digit code
}

export const VoucherArt: React.FC<VoucherArtProps> = ({ 
  passengerName, 
  planName, 
  qrCodeUrl, 
  type = 'Internacional',
  expiryDate,
  voucherCode = "0000 0000 0000 0000"
}) => {
  
  const formattedCode = voucherCode.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  const isPending = !qrCodeUrl;

  return (
    <div className="w-full max-w-sm mx-auto relative drop-shadow-2xl transform transition-transform hover:scale-[1.02] duration-300 bg-transparent">
      
      {/* Top Section (The "Art") */}
      <div className="relative h-48 bg-black rounded-t-3xl overflow-hidden border border-white/10 border-b-0">
        <img 
          src={type === 'Internacional' 
            ? "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" 
            : "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
          } 
          className={`absolute inset-0 w-full h-full object-cover ${isPending ? 'grayscale opacity-40' : 'opacity-60'}`}
          alt=""
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-900"></div>
        
        <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
          <img src={LOGO_URL} className="w-10 h-10 rounded border border-gold-500/50 bg-black/50 backdrop-blur" crossOrigin="anonymous" />
          <div>
             <p className="text-white font-display font-bold text-lg tracking-wider leading-none">PRIVILEGE</p>
             <p className="text-gold-500 text-[10px] font-bold tracking-[0.3em] uppercase">Global Access</p>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10">
           <div className="bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={10} className="text-gold-500 fill-gold-500" />
              <span className="text-[10px] font-bold text-white uppercase">First Class</span>
           </div>
        </div>
      </div>

      {/* Middle Section (Details) */}
      <div className="bg-zinc-900 relative border-x border-white/10 p-6">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-black rounded-full border-r border-b border-white/10 z-20"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full border-l border-b border-white/10 z-20"></div>
          <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-zinc-700/50"></div>

          <div className="space-y-4 mt-2">
             <div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Passageiro / Passenger</p>
                <p className="text-white font-bold text-xl font-display tracking-wide truncate">{passengerName}</p>
             </div>

             <div className="flex justify-between items-end">
                <div>
                   <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Voucher Type</p>
                   <p className="text-gold-500 font-bold text-sm flex items-center gap-2">
                      {type === 'Internacional' ? <Globe size={14}/> : <Plane size={14}/>}
                      {planName}
                   </p>
                </div>
                {expiryDate && !isPending && (
                   <div className="text-right">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Validade</p>
                      <p className="text-white font-bold text-sm">{expiryDate}</p>
                   </div>
                )}
             </div>
          </div>
      </div>

      {/* Bottom Section (QR Code) */}
      <div className="bg-white rounded-b-3xl p-6 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"></div>

          <div className="flex flex-col items-center justify-center">
             <div className="w-32 h-32 bg-white p-2 mb-2">
                {isPending ? (
                    <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-300 rounded-lg">
                        <Clock size={32} className="mb-2 animate-pulse" />
                        <span className="text-[10px] font-bold text-center">Aguardando<br/>Emissão</span>
                    </div>
                ) : (
                    <img src={qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" crossOrigin="anonymous" />
                )}
             </div>
             
             <div className="mb-2">
                <p className={`text-black font-mono font-bold text-lg tracking-wider text-center ${isPending ? 'opacity-50' : ''}`}>{formattedCode}</p>
             </div>

             <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest">{isPending ? 'Pagamento Aprovado' : 'Scan at Reception'}</p>
             <p className="text-black font-bold text-xs mt-1">{isPending ? 'EMISSÃO EM ANDAMENTO' : 'NOMINAL & INTRANSFERÍVEL'}</p>
          </div>
      </div>
    </div>
  );
};
