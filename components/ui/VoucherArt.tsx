import React from 'react';
import { LOGO_URL } from '../../constants'; // Ensure this points to your Gold Wing 'P' logo
import { Plane, Globe, Star, ShieldCheck, QrCode } from 'lucide-react';

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
    <div className="w-full max-w-[340px] mx-auto relative drop-shadow-2xl transform transition-transform hover:scale-[1.01] duration-500">
      
      {/* THE MONOLITH CARD CONTAINER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#CFB16D]/40 bg-[#0a0a0a] h-auto min-h-[580px] flex flex-col">
        
        {/* 1. BACKGROUND TEXTURES */}
        <div className="absolute inset-0 z-0">
           {/* Dark Marble/Noise Texture Simulation */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           {/* Gold Gradient Sheen */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#CFB16D]/5 via-transparent to-[#CFB16D]/5"></div>
        </div>

        {/* 2. INNER BORDER (Double border effect for luxury) */}
        <div className="absolute inset-[4px] rounded-[2.2rem] border-[0.5px] border-[#CFB16D]/20 z-10 pointer-events-none"></div>

        {/* 3. CONTENT CONTENT */}
        <div className="relative z-20 flex flex-col items-center pt-8 pb-8 px-6 h-full justify-between">

          {/* --- HEADER SECTION --- */}
          <div className="flex flex-col items-center w-full">
            {/* Logo Area */}
            <div className="mb-4 p-3 rounded-full border border-[#CFB16D]/30 bg-[#CFB16D]/5 shadow-[0_0_15px_rgba(207,177,109,0.15)]">
              <img 
                src={LOGO_URL} 
                alt="Privilege Pass Logo" 
                className="w-10 h-10 object-contain drop-shadow-md" 
                crossOrigin="anonymous" 
              />
            </div>
            
            <h2 className="text-[#CFB16D] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Privilege Global Access</h2>
            
            {/* Membership Tag */}
            <div className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#CFB16D] to-[#9E7D35]">
              <div className="flex items-center gap-1 text-black font-bold text-[9px] tracking-widest uppercase">
                <Star size={10} fill="black" strokeWidth={0} />
                <span>Membro Black</span>
              </div>
            </div>
          </div>

          {/* --- PASSENGER SECTION --- */}
          <div className="w-full text-center my-6 space-y-1">
            <p className="text-[#CFB16D]/50 text-[9px] uppercase tracking-widest font-medium">Passageiro / Passenger</p>
            <h1 className="text-white font-serif text-2xl leading-tight tracking-wide font-medium truncate drop-shadow-md">
              {passengerName}
            </h1>
          </div>

          {/* --- DETAILS GRID --- */}
          <div className="w-full grid grid-cols-2 gap-4 border-t border-b border-[#CFB16D]/20 py-4 mb-6">
            <div className="text-left">
              <p className="text-[#CFB16D]/50 text-[8px] uppercase tracking-widest mb-1">Voucher Type</p>
              <div className="flex items-center gap-2 text-white/90 font-medium text-xs">
                {type === 'Internacional' ? <Globe size={12} className="text-[#CFB16D]"/> : <Plane size={12} className="text-[#CFB16D]"/>}
                <span className="truncate">{planName}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#CFB16D]/50 text-[8px] uppercase tracking-widest mb-1">Validity</p>
              <p className="text-white/90 font-medium text-xs">
                {expiryDate || 'VALID 1 YEAR'}
              </p>
            </div>
          </div>

          {/* --- QR CODE SECTION (The Jewel) --- */}
          <div className="w-full flex flex-col items-center">
            <div className="relative p-3 rounded-xl bg-[#151515] border border-[#CFB16D]/30 shadow-inner mb-3 group transition-all duration-300 hover:border-[#CFB16D]/60">
              
              {/* Glow effect behind QR */}
              <div className="absolute inset-0 bg-[#CFB16D] opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500"></div>

              {isPending ? (
                <div className="w-32 h-32 flex flex-col items-center justify-center text-[#CFB16D]/40 border-2 border-dashed border-[#CFB16D]/20 rounded-lg">
                   <Clock size={24} className="mb-2 animate-pulse" />
                   <span className="text-[8px] font-bold uppercase tracking-widest text-center">Aguardando<br/>Emissão</span>
                </div>
              ) : (
                // Important: Ensure the QR Code image has a transparent background or looks good on white inside this box.
                // Using mix-blend-screen or filters can help integrate it better if it's a standard black/white QR.
                <div className="bg-white p-1 rounded-lg">
                    <img 
                      src={qrCodeUrl} 
                      alt="Access QR" 
                      className="w-32 h-32 object-contain" 
                      crossOrigin="anonymous" 
                    />
                </div>
              )}
            </div>

            <p className="text-[#CFB16D] font-mono text-base tracking-[0.15em] font-bold drop-shadow-sm">
              {formattedCode}
            </p>
          </div>

          {/* --- FOOTER --- */}
          <div className="mt-6 flex flex-col items-center gap-1 opacity-60">
             <div className="flex items-center gap-1.5 text-[#CFB16D] text-[8px] uppercase tracking-[0.2em]">
               <ShieldCheck size={10} />
               <span>Secure Pass Technology</span>
             </div>
             <p className="text-[7px] text-zinc-500 font-medium">Nominal & Intransferível</p>
          </div>

        </div>
      </div>
    </div>
  );
};
