import React, { useState } from 'react';
import { X, Clock, Users, Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, customNote);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#F3E8FF] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A2035] shadow-sm backdrop-blur-xs transition-colors"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media visual column */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-[#FAF5F8]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.highlightBadge && (
              <div className="absolute top-4 left-4 bg-white/95 text-[#BE185D] text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                {product.highlightBadge}
              </div>
            )}
          </div>

          {/* Details column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#C084FC]">
                  {product.categoryLabel}
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#3B1A28] mt-1 leading-tight">
                  {product.name}
                </h2>
                <div className="font-mono tabular-nums text-xl font-bold text-[#BE185D] mt-2">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </div>
              </div>

              {/* Servings & Lead time */}
              <div className="grid grid-cols-1 gap-2 pt-2 text-xs text-[#6B5561]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C084FC]" />
                  <span>{product.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F472B6]" />
                  <span>{product.leadTime}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4553] leading-relaxed">
                {product.description}
              </p>

              {/* Full Ingredients List */}
              <div className="bg-[#FFF9FB] p-3.5 rounded-xl border border-[#FDE8EE]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#831843] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#BE185D]" />
                  <span>Ingredientes Nobres Selecionados:</span>
                </div>
                <ul className="text-xs text-[#6B5561] space-y-1 list-disc list-inside">
                  {product.ingredients.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Notes input */}
              <div>
                <label className="block text-xs font-medium text-[#6B5561] mb-1">
                  Observações para a Fran (ex: sem morangos, plaquinha de parabéns):
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Alguma preferência especial?"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28] placeholder:text-[#B59DAE]"
                />
              </div>

            </div>

            {/* Modal Bottom: Stepper + Add Button */}
            <div className="pt-4 border-t border-[#F5E5EC] flex items-center gap-4">
              
              {/* Stepper */}
              <div className="flex items-center gap-3 bg-[#FAF5F8] border border-[#F3E8FF] rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#BE185D] hover:bg-[#FCE7F3] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Diminuir"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-sm text-[#4A2035] w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#BE185D] text-white hover:bg-[#9D174D] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to order button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#C084FC] via-[#DB2777] to-[#BE185D] hover:opacity-95 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar · R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
