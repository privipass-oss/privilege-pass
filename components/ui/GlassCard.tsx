import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', noPadding = false, interactive = false }) => {
  return (
    <div className={`
      relative
      bg-zinc-900/60
      backdrop-blur-md 
      border border-white/5 
      rounded-2xl 
      shadow-xl 
      ${noPadding ? '' : 'p-6'}
      ${interactive ? 'hover:border-gold-500/30 hover:shadow-gold-500/10 transition-all duration-300' : ''}
      ${className}
    `}>
      {/* Subtle golden accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent pointer-events-none"></div>
      {children}
    </div>
  );
};