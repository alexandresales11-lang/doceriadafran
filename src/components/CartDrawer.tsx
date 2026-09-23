import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Calendar, 
  CreditCard, 
  Truck, 
  Store,
  Sparkles
} from 'lucide-react';
import { CartItem, DeliveryMethod, PaymentMethod, OrderFormState } from '../types';
import { STORE_CONFIG } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [copiedPix, setCopiedPix] = useState(false);
  const [formData, setFormData] = useState<OrderFormState>({
    customerName: '',
    customerPhone: '',
    deliveryMethod: 'retirada',
    address: '',
    neighborhood: '',
    referencePoint: '',
    preferredDate: '',
    preferredTime: '',
    paymentMethod: 'pix',
    specialNotes: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === 'entrega' ? STORE_CONFIG.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleInputChange = (field: keyof OrderFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Por favor, informe seu nome completo';
    }

    if (!formData.customerPhone.trim() || formData.customerPhone.length < 8) {
      errors.customerPhone = 'Por favor, informe seu WhatsApp para contato';
    }

    if (formData.deliveryMethod === 'entrega') {
      if (!formData.address.trim()) {
        errors.address = 'Informe a rua e número para entrega em Jacobina';
      }
      if (!formData.neighborhood.trim()) {
        errors.neighborhood = 'Informe o bairro';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (!validateForm()) {
      // Scroll to the first error
      const errorElement = document.querySelector('.form-error-field');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Build the formatted WhatsApp message
    const orderItemsText = items
      .map(
        (it) =>
          `• *${it.quantity}x* ${it.product.name} - R$ ${(it.product.price * it.quantity).toFixed(2).replace('.', ',')}${it.notes ? `\n   ↳ _Obs: ${it.notes}_` : ''}`
      )
      .join('\n');

    const paymentLabel = 
      formData.paymentMethod === 'pix' ? 'PIX' :
      formData.paymentMethod === 'cartao' ? 'Cartão de Crédito/Débito' : 'Dinheiro na Entrega/Retirada';

    const deliveryText =
      formData.deliveryMethod === 'entrega'
        ? `🚚 *Entrega em Jacobina/BA*\n📍 Endereço: ${formData.address}\n🏘️ Bairro: ${formData.neighborhood}${formData.referencePoint ? `\n📌 Referência: ${formData.referencePoint}` : ''}\n📦 Taxa de Entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')}`
        : `🏪 *Retirada no Ateliê da Fran* (Jacobina/BA)\n📦 Taxa: Grátis`;

    const scheduleText =
      formData.preferredDate || formData.preferredTime
        ? `\n🗓️ *Data/Horário Preferido:* ${formData.preferredDate || 'A combinar'} às ${formData.preferredTime || 'A combinar'}`
        : '';

    const notesText = formData.specialNotes.trim()
      ? `\n📝 *Observações Especiais:* ${formData.specialNotes.trim()}`
      : '';

    const message = `🧁 *NOVO PEDIDO - ${STORE_CONFIG.name.toUpperCase()}* 🧁\n\n` +
      `👤 *Cliente:* ${formData.customerName}\n` +
      `📱 *WhatsApp:* ${formData.customerPhone}\n\n` +
      `🎂 *ITENS DO PEDIDO:*\n${orderItemsText}\n\n` +
      `--------------------------------\n` +
      `💵 *Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n` +
      (formData.deliveryMethod === 'entrega' ? `🚚 *Taxa de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n` : '') +
      `💰 *VALOR TOTAL:* R$ ${grandTotal.toFixed(2).replace('.', ',')}\n` +
      `💳 *Forma de Pagamento:* ${paymentLabel}\n` +
      `--------------------------------\n\n` +
      `${deliveryText}` +
      `${scheduleText}` +
      `${notesText}\n\n` +
      `_Pedido gerado pelo catálogo online da Doceria da Fran._ ✨`;

    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#FFFDFE] h-full shadow-2xl flex flex-col z-10 border-l border-[#F5E5EC] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F7E5EE] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-[#3B1A28]">
                Seu Pedido
              </h2>
              <span className="text-xs text-[#8C7080]">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#9E7B8E] hover:text-[#BE185D] p-1.5 transition-colors"
                title="Esvaziar sacola"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#FAF5F8] text-[#5C4553] transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Empty State */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF5F8] border border-[#F3E8FF] flex items-center justify-center text-[#D8B4E2]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#4A2035]">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-[#7A6472] max-w-xs mx-auto">
                Explore os bolos vulcão, tortas artesanais e docinhos para festa da Fran e adicione seus favoritos.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#C084FC] to-[#DB2777] rounded-full shadow-xs hover:opacity-95 transition-all"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#831843] uppercase tracking-wider flex items-center justify-between">
                  <span>Itens Selecionados</span>
                  <span className="font-mono text-[#BE185D] tabular-nums">
                    Subtotal: R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="divide-y divide-[#F7E7EE] border border-[#F7E5EE] rounded-2xl bg-white overflow-hidden">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-3.5 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#FCE7F3]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-luxury text-sm font-bold text-[#3B1A28] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#BE185D] font-mono tabular-nums font-semibold mt-0.5">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </div>
                        {item.notes && (
                          <p className="text-[11px] text-[#8C7080] truncate italic mt-0.5">
                            Obs: {item.notes}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center gap-1.5 bg-[#FAF5F8] border border-[#F3E8FF] rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-white text-[#BE185D] flex items-center justify-center hover:bg-[#FCE7F3] shadow-2xs"
                              aria-label="Diminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs text-[#3B1A28] w-5 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-[#BE185D] text-white flex items-center justify-center hover:bg-[#9D174D] shadow-2xs"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item total & remove */}
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#4A2035] tabular-nums">
                              R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                              title="Remover item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery vs Pickup Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#831843] uppercase tracking-wider">
                  Como Deseja Receber seu Pedido?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryMethod', 'retirada')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      formData.deliveryMethod === 'retirada'
                        ? 'border-[#BE185D] bg-[#FFF0F5] shadow-xs'
                        : 'border-[#F0E2EB] bg-white hover:border-[#D8B4E2]'
                    }`}
                  >
                    <Store className={`w-4 h-4 mt-0.5 ${formData.deliveryMethod === 'retirada' ? 'text-[#BE185D]' : 'text-neutral-400'}`} />
                    <div>
                      <div className="font-semibold text-xs text-[#3B1A28]">Retirada no Ateliê</div>
                      <div className="text-[11px] text-[#059669] font-medium mt-0.5">Sem taxa (Grátis)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('deliveryMethod', 'entrega')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      formData.deliveryMethod === 'entrega'
                        ? 'border-[#BE185D] bg-[#FFF0F5] shadow-xs'
                        : 'border-[#F0E2EB] bg-white hover:border-[#D8B4E2]'
                    }`}
                  >
                    <Truck className={`w-4 h-4 mt-0.5 ${formData.deliveryMethod === 'entrega' ? 'text-[#BE185D]' : 'text-neutral-400'}`} />
                    <div>
                      <div className="font-semibold text-xs text-[#3B1A28]">Entrega em Jacobina</div>
                      <div className="text-[11px] text-[#BE185D] font-mono tabular-nums mt-0.5">+ R$ 8,00</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-4 bg-white p-4 rounded-2xl border border-[#F7E5EE]">
                <div className="text-xs font-semibold text-[#831843] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#BE185D]" />
                  <span>Dados para o Atendimento</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-[#5C4553] mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className={`w-full text-xs px-3 py-2 rounded-xl border ${
                      formErrors.customerName ? 'border-red-400 bg-red-50/30' : 'border-[#E9D5FF]'
                    } focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]`}
                  />
                  {formErrors.customerName && (
                    <span className="text-[10px] text-red-500 mt-1 block">{formErrors.customerName}</span>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-medium text-[#5C4553] mb-1">
                    Seu WhatsApp para Contato *
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    placeholder="(74) 99999-9999"
                    className={`w-full text-xs px-3 py-2 rounded-xl border ${
                      formErrors.customerPhone ? 'border-red-400 bg-red-50/30' : 'border-[#E9D5FF]'
                    } focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]`}
                  />
                  {formErrors.customerPhone && (
                    <span className="text-[10px] text-red-500 mt-1 block">{formErrors.customerPhone}</span>
                  )}
                </div>

                {/* Conditional Delivery Address */}
                {formData.deliveryMethod === 'entrega' && (
                  <div className="space-y-3 pt-2 border-t border-[#F8EBF0]">
                    <div>
                      <label className="block text-xs font-medium text-[#5C4553] mb-1">
                        Endereço Completo (Rua e Número) *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Ex: Rua Senador Pedro Lago, 120"
                        className={`w-full text-xs px-3 py-2 rounded-xl border ${
                          formErrors.address ? 'border-red-400 bg-red-50/30' : 'border-[#E9D5FF]'
                        } focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]`}
                      />
                      {formErrors.address && (
                        <span className="text-[10px] text-red-500 mt-1 block">{formErrors.address}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#5C4553] mb-1">
                          Bairro em Jacobina *
                        </label>
                        <input
                          type="text"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                          placeholder="Ex: Centro, Missão..."
                          className={`w-full text-xs px-3 py-2 rounded-xl border ${
                            formErrors.neighborhood ? 'border-red-400 bg-red-50/30' : 'border-[#E9D5FF]'
                          } focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#5C4553] mb-1">
                          Ponto de Referência
                        </label>
                        <input
                          type="text"
                          value={formData.referencePoint}
                          onChange={(e) => handleInputChange('referencePoint', e.target.value)}
                          placeholder="Próximo a..."
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#5C4553] mb-1">
                      Data Preferida
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C4553] mb-1">
                      Horário Aprox.
                    </label>
                    <input
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28]"
                    />
                  </div>
                </div>

                {/* Payment method selection */}
                <div>
                  <label className="block text-xs font-medium text-[#5C4553] mb-1">
                    Forma de Pagamento Pretendida
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as PaymentMethod)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28] bg-white"
                  >
                    <option value="pix">PIX (50% na encomenda ou 100%)</option>
                    <option value="cartao">Cartão de Crédito / Débito</option>
                    <option value="dinheiro">Dinheiro Físico</option>
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-medium text-[#5C4553] mb-1">
                    Observações Especiais
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                    placeholder="Instruções para entrega, dedicatória no bilhete, vela..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#C084FC]/50 text-[#3B1A28] resize-none"
                  />
                </div>

              </div>

              {/* PIX Quick Copy Box */}
              <div className="bg-gradient-to-r from-[#FAF5FF] to-[#FFF5F8] p-4 rounded-2xl border border-[#E9D5FF] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B21A8]">
                    <CreditCard className="w-3.5 h-3.5 text-[#9333EA]" />
                    <span>Pagamento via PIX</span>
                  </div>
                  <span className="text-[11px] text-[#7E22CE] font-medium">Chave Celular</span>
                </div>

                <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#DDD6FE]">
                  <div className="font-mono text-xs font-bold text-[#4A2035] tracking-wider">
                    {STORE_CONFIG.pixKey}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#7E22CE] bg-[#F3E8FF] hover:bg-[#E9D5FF] rounded-lg transition-colors"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3 h-3 text-[#15803D]" />
                        <span className="text-[#15803D]">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Chave</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-[#8C7080] leading-tight">
                  Titular: {STORE_CONFIG.pixBeneficiary}. Para encomendas com antecedência, a confirmação ocorre mediante sinal de 50%.
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer with Totals and WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#F7E5EE] bg-white space-y-3">
            
            {/* Calculation Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6B5561]">
              <div className="flex justify-between">
                <span>Subtotal dos produtos</span>
                <span className="font-mono tabular-nums text-[#3B1A28]">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {formData.deliveryMethod === 'entrega' && (
                <div className="flex justify-between">
                  <span>Taxa de Entrega (Jacobina)</span>
                  <span className="font-mono tabular-nums text-[#3B1A28]">
                    R$ {deliveryFee.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-[#F5E5EC] font-bold text-sm text-[#3B1A28]">
                <span>Total Estimado</span>
                <span className="font-mono tabular-nums text-lg text-[#BE185D]">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-[#16A34A] via-[#15803D] to-[#166534] hover:opacity-95 rounded-2xl shadow-md shadow-[#16A34A]/25 transition-all flex items-center justify-center gap-2.5 active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Finalizar Pedido pelo WhatsApp</span>
            </button>

            <p className="text-[11px] text-center text-[#9C8291]">
              Ao clicar, você enviará a lista detalhada para o WhatsApp oficial da Fran (+55 74 9904-1753).
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
