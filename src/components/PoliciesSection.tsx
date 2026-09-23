import React, { useState } from 'react';
import { Calendar, CreditCard, ShieldCheck, MapPin, Copy, Check, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const PoliciesSection: React.FC = () => {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_CONFIG.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <section id="politicas" className="py-16 sm:py-20 bg-[#FFFBFD] border-t border-[#F8EBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C084FC]">
            Transparência & Cuidado
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B1A28]">
            Como Funcionam Nossas Encomendas
          </h2>
          <p className="text-sm text-[#735A68]">
            Tudo o que você precisa saber para garantir bolos fresquinhos e doces artesanais para sua comemoração.
          </p>
        </div>

        {/* 3 Structured Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Prazos e Antecedência */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3E8FF] shadow-xs space-y-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B1A28]">
              Prazos de Antecedência
            </h3>
            <p className="text-xs sm:text-sm text-[#664D5B] leading-relaxed">
              • <strong>Bolos Vulcão & Afetivos:</strong> 24h de antecedência (consulte disponibilidade para pronta entrega no dia).
            </p>
            <p className="text-xs sm:text-sm text-[#664D5B] leading-relaxed">
              • <strong>Bolos Festivos & Cento de Doces:</strong> Mínimo de 48h a 72h para personalização e preparo das massas e recheios nobres.
            </p>
          </div>

          {/* Card 2: Pagamentos & PIX */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3E8FF] shadow-xs space-y-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B1A28]">
              Pagamento & Sinal
            </h3>
            <p className="text-xs sm:text-sm text-[#664D5B] leading-relaxed">
              Para confirmação de agendamento na agenda do ateliê, solicitamos um sinal de <strong>50% via PIX</strong> ou valor integral. O restante pode ser pago na entrega ou retirada.
            </p>
            <div className="pt-2">
              <div className="flex items-center justify-between p-2.5 bg-[#FAF5F8] rounded-xl border border-[#E9D5FF] text-xs">
                <span className="font-mono text-[#3B1A28] font-bold">PIX: {STORE_CONFIG.pixKey}</span>
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 bg-white text-[#9333EA] hover:bg-[#F3E8FF] rounded-lg border border-[#DDD6FE] font-medium text-[11px] transition-colors flex items-center gap-1"
                >
                  {copiedPix ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Retirada e Entrega em Jacobina */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#F3E8FF] shadow-xs space-y-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B1A28]">
              Retirada & Entrega
            </h3>
            <p className="text-xs sm:text-sm text-[#664D5B] leading-relaxed">
              • <strong>Retirada no Ateliê:</strong> Gratuita, com horário marcado em Jacobina/BA.
            </p>
            <p className="text-xs sm:text-sm text-[#664D5B] leading-relaxed">
              • <strong>Entrega em Jacobina:</strong> Realizada com todo o cuidado para que seu bolo chegue impecável. Taxa fixa informativa a partir de R$ 8,00.
            </p>
          </div>

        </div>

        {/* WhatsApp direct banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FCE7F3]/70 via-[#F3E8FF]/60 to-[#FFF0F5] border border-[#F5D0E0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#3B1A28]">
              Dúvidas ou Personalizações Especiais?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B5561]">
              Fale diretamente com a Fran e receba um atendimento personalizado com todo carinho.
            </p>
          </div>
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Olá, Fran! Quero tirar uma dúvida sobre as encomendas.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] shadow-sm flex items-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com a Fran (+55 74 9904-1753)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
