import React from 'react';
import { Plus, Minus, Clock, Users, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetails,
}) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-[#F3E8FF] hover:border-[#D8B4E2] shadow-xs hover:shadow-lg hover:shadow-[#D8B4E2]/20 transition-all duration-300 overflow-hidden">
      
      {/* Product Image Area */}
      <div 
        className="relative aspect-4/3 w-full bg-[#FAF5F8] overflow-hidden cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Fallback pattern in case image fails */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Highlight Tag */}
        {product.highlightBadge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#BE185D] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs border border-[#FCE7F3]">
            {product.highlightBadge}
          </div>
        )}

        {/* Quick View Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#4A2035] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Ver detalhes e ingredientes"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C7080] font-medium mb-1.5">
            <span className="text-[#C084FC] uppercase tracking-wider text-[11px] font-semibold">
              {product.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D8B4E2]" />
              <span className="truncate max-w-[150px]">{product.leadTime}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-serif-luxury text-lg sm:text-xl font-bold text-[#3B1A28] group-hover:text-[#BE185D] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Servings count */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B5561] mt-1.5">
            <Users className="w-3.5 h-3.5 text-[#E9D5FF]" />
            <span>{product.servings}</span>
          </div>

          {/* Short description */}
          <p className="text-xs text-[#7A6472] mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key ingredients teaser */}
          <div className="mt-2.5 text-[11px] text-[#9C8291]">
            <span className="font-semibold text-[#664D5B]">Ingredientes: </span>
            <span>{product.ingredients.slice(0, 3).join(', ')}...</span>
          </div>
        </div>

        {/* Footer Area: Price & Action */}
        <div className="pt-3 border-t border-[#F8EBF0] flex items-center justify-between gap-3">
          
          {/* Price display */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#A8909E] font-medium">Valor</span>
            <span className="font-mono tabular-nums text-lg sm:text-xl font-bold text-[#BE185D]">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Quantity Selector or Add Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-2 bg-[#FCE7F3]/70 border border-[#FBCFE8] rounded-xl p-1">
              <button
                onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                className="w-7 h-7 rounded-lg bg-white text-[#BE185D] hover:bg-[#FCE7F3] flex items-center justify-center transition-colors shadow-xs active:scale-90"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              <span className="font-mono font-bold text-xs text-[#4A2035] w-5 text-center tabular-nums">
                {quantityInCart}
              </span>

              <button
                onClick={() => onUpdateQuantity(product.id, quantityInCart + 1)}
                className="w-7 h-7 rounded-lg bg-[#BE185D] text-white hover:bg-[#9D174D] flex items-center justify-center transition-colors shadow-xs active:scale-90"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product, 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#C084FC] to-[#DB2777] hover:from-[#B470F8] hover:to-[#BE185D] rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
