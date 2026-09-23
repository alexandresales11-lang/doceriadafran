import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  totalAmount: number;
  onClick: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount,
  totalAmount,
  onClick,
}) => {
  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Resumo do Pedido"
      className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Ver pedido com ${itemCount} itens, total de R$ ${totalAmount.toFixed(2).replace('.', ',')}`}
        className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#BE185D] via-[#C084FC] to-[#BE185D] text-white shadow-xl shadow-[#BE185D]/35 hover:shadow-2xl hover:shadow-[#BE185D]/45 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/60 cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-white text-[#BE185D] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
            {itemCount}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium text-pink-100 uppercase tracking-wider leading-none">
            Ver Sacola
          </span>
          <span className="font-mono tabular-nums text-sm font-bold text-white mt-0.5">
            R$ {totalAmount.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </button>
    </aside>
  );
};
