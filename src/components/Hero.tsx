import React from 'react';
import { Sparkles, Heart, Award, ArrowDown, MessageCircle, Clock, MapPin } from 'lucide-react';
import { STORE_CONFIG, PRODUCTS } from '../data/products';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FAF5FF] to-[#FFFBFD] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#F5E5EC]">
      {/* Decorative ambient blurred spots in soft lilac & pastel pink */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FCE7F3]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-[#F3E8FF]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Trust Seals & Direct Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Subtle editorial trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E9D5FF] text-xs text-[#7E22CE] shadow-xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="font-medium">Confeitaria Fina & Bolos Afetivos em Jacobina</span>
            </div>

            {/* Main Title with Elegant Typography */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3B1A28] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Momentos doces feitos com <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BE185D] via-[#C084FC] to-[#BE185D]">alma, afeto</span> e receita de família.
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-[#664D5B] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Bolos vulcão com piscina cremosa, tortas nobres e docinhos enrolados à mão. Ingredientes selecionados para transformar qualquer dia em uma doce celebração.
            </p>

            {/* Quality Seals (100% Artesanal, Ingredientes Nobres, Feito com Amor) */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#6B5561]">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-[#FCE7F3] shadow-xs">
                <Award className="w-4 h-4 text-[#BE185D]" />
                <span className="font-semibold text-[#4A2035]">100% Artesanal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-[#F3E8FF] shadow-xs">
                <Sparkles className="w-4 h-4 text-[#9333EA]" />
                <span className="font-semibold text-[#4A2035]">Ingredientes Nobres</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg border border-[#FCE7F3] shadow-xs">
                <Heart className="w-4 h-4 text-[#EC4899] fill-[#EC4899]/20" />
                <span className="font-semibold text-[#4A2035]">Feito com Amor</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#C084FC] via-[#DB2777] to-[#BE185D] hover:opacity-95 rounded-full shadow-md shadow-[#BE185D]/20 transition-all transform active:scale-98"
              >
                <span>Explorar Cardápio Online</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Olá, Fran! Gostaria de consultar a disponibilidade de bolos e doces para hoje/esta semana.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#2E7D32] bg-white hover:bg-[#F0FDF4] border border-[#BBF7D0] rounded-full transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                <span>Encomenda Rápida via WhatsApp</span>
              </a>
            </div>

            {/* Location & Time Subtitle */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#8C7080]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Jacobina - BA (Retirada ou Entrega)</span>
              </div>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F472B6]" />
                <span>Atendimento hoje até 18:30</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Card simulating an elegant menu & Fran's portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* The Floating Card Container */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-white/95 rounded-3xl p-6 sm:p-7 border border-[#F3E8FF] shadow-xl shadow-[#D8B4E2]/25 backdrop-blur-md">
              
              {/* Central Fran Medallion with double lilac pastel border */}
              <div className="flex flex-col items-center text-center -mt-14 mb-4">
                <div className="relative p-1.5 bg-gradient-to-tr from-[#D8B4E2] via-[#FBCFE8] to-[#E9D5FF] rounded-full shadow-lg shadow-[#D8B4E2]/40">
                  <div className="p-1 bg-white rounded-full ring-2 ring-[#C084FC]/60">
                    <img
                      src={STORE_CONFIG.avatarImage}
                      alt="Fran Confeiteira com espátula e fouet"
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <span className="font-script-accent text-2xl text-[#BE185D] block">
                    Fran Confeiteira
                  </span>
                  <span className="font-serif-luxury text-sm tracking-wide uppercase text-[#735A68] font-semibold">
                    Ateliê Gastronômico Artesanal
                  </span>
                </div>
              </div>

              {/* Mini Menu Showcase Preview within the card */}
              <div className="space-y-3.5 bg-[#FFF9FB] p-4 rounded-2xl border border-[#FDE8EE]">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F7E0E7] text-[#6B5561]">
                  <span className="font-medium">Destaque do Dia no Ateliê:</span>
                  <span className="text-[#BE185D] font-bold">Produção Fresca</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={PRODUCTS[0].image}
                    alt="Bolo Vulcão Ninho e Nutella"
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#F9C5D5]"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-base font-bold text-[#3B1A28] leading-tight truncate">
                      Bolo Vulcão Ninho & Nutella
                    </h4>
                    <p className="text-xs text-[#856B7A] truncate">
                      Leite Ninho cremosa + Nutella legítima
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-sm font-bold text-[#BE185D] tabular-nums">
                        R$ 78,00
                      </span>
                      <span className="text-[11px] text-[#059669] font-medium bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        Disponível
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Card Action */}
              <button
                onClick={onScrollToMenu}
                className="mt-5 w-full py-3 px-4 text-xs font-semibold text-[#831843] bg-gradient-to-r from-[#FCE7F3] via-[#F3E8FF] to-[#FCE7F3] hover:from-[#FBCFE8] hover:to-[#E9D5FF] border border-[#F9A8D4]/50 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Visualizar Cardápio & Montar Pedido</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#9C8291]">
                  Chave PIX e entrega facilitada pelo WhatsApp oficial
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
