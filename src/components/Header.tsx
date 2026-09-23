import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#F7E7EE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Zone with delicate circular medallion */}
        <div className="flex items-center gap-3.5">
          {/* Circular medallion with double lilac pastel border and soft shadow */}
          <div className="relative group shrink-0">
            <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-tr from-[#E9D5FF] via-[#FCE7F3] to-[#DDD6FE] shadow-sm shadow-[#D8B4E2]/40">
              <div className="w-full h-full rounded-full p-[2px] bg-white ring-1 ring-[#D8B4E2]/70 overflow-hidden flex items-center justify-center">
                <img
                  src={STORE_CONFIG.avatarImage}
                  alt="Fran Confeiteira"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized monogram if image is not loaded
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = '<span class="font-serif-luxury font-bold text-[#BE185D] text-lg">DF</span>';
                    }
                  }}
                />
              </div>
            </div>
            {/* Subtle glow dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" title="Ateliê Aberto"></span>
          </div>

          <a href="#" className="flex flex-col text-left group">
            <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#4A2035] group-hover:text-[#BE185D] transition-colors leading-tight">
              {STORE_CONFIG.name}
            </span>
            <span className="font-script-accent text-base text-[#BE185D] -mt-1 font-normal tracking-wide">
              {STORE_CONFIG.subtitle}
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B5561]">
          <a
            href="#catalogo"
            onClick={(e) => {
              e.preventDefault();
              onOpenMenu();
            }}
            className="hover:text-[#BE185D] transition-colors"
          >
            Cardápio
          </a>
          <a
            href="#sobre"
            className="hover:text-[#BE185D] transition-colors"
          >
            Sobre a Fran
          </a>
          <a
            href="#encomendas"
            className="hover:text-[#BE185D] transition-colors"
          >
            Como Encomendar
          </a>
          <a
            href="#politicas"
            className="hover:text-[#BE185D] transition-colors"
          >
            Políticas & PIX
          </a>
        </nav>

        {/* Zone 3: Actions (WhatsApp & Cart) */}
        <div className="flex items-center gap-3">
          {/* Quick WhatsApp Link */}
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Olá, Fran! Gostaria de tirar uma dúvida sobre os bolos e doces.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#15803D] bg-[#DCFCE7]/70 hover:bg-[#DCFCE7] border border-[#BBF7D0] rounded-full transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Falar com a Fran</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#C084FC] to-[#EC4899] hover:from-[#B470F8] hover:to-[#DB2777] rounded-full shadow-sm shadow-[#EC4899]/25 transition-all transform active:scale-95 whitespace-nowrap"
            aria-label="Abrir Sacola de Pedidos"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#BE185D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Meu Pedido</span>
            {cartCount > 0 && (
              <span className="font-mono tabular-nums text-pink-100 font-bold border-l border-white/30 pl-2">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
