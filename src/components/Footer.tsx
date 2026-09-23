import React from 'react';
import { MessageCircle, Instagram, MapPin, Clock, Heart, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF5F8] border-t border-[#F5E5EC] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#EEDDE6]">
          
          {/* Col 1: Brand & Subtitle */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              {/* Delicate Medallion */}
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#D8B4E2] to-[#FCE7F3] shadow-xs">
                <div className="w-full h-full rounded-full p-[1px] bg-white ring-1 ring-[#D8B4E2] overflow-hidden">
                  <img
                    src={STORE_CONFIG.avatarImage}
                    alt="Fran Confeiteira"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold text-[#3B1A28] block leading-tight">
                  {STORE_CONFIG.name}
                </span>
                <span className="font-script-accent text-sm text-[#BE185D] block -mt-0.5">
                  {STORE_CONFIG.subtitle}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#7A6472] leading-relaxed">
              Confeitaria artesanal feita com amor, afeto e ingredientes nobres para adoçar momentos inesquecíveis.
            </p>
          </div>

          {/* Col 2: Horários & Ateliê */}
          <div className="space-y-2">
            <h4 className="font-serif-luxury text-sm font-bold text-[#3B1A28] uppercase tracking-wider">
              Atendimento
            </h4>
            <div className="space-y-2 text-xs text-[#6B5561]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C084FC] mt-0.5 shrink-0" />
                <span>{STORE_CONFIG.openingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#BE185D] mt-0.5 shrink-0" />
                <span>{STORE_CONFIG.locationDetails}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Contato & Encomendas */}
          <div className="space-y-2">
            <h4 className="font-serif-luxury text-sm font-bold text-[#3B1A28] uppercase tracking-wider">
              Contato Direto
            </h4>
            <div className="space-y-2 text-xs text-[#6B5561]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#15803D]" />
                <span className="font-mono">{STORE_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>{STORE_CONFIG.instagram}</span>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white text-[11px] font-medium transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Pagamento & PIX */}
          <div className="space-y-2">
            <h4 className="font-serif-luxury text-sm font-bold text-[#3B1A28] uppercase tracking-wider">
              Chave PIX
            </h4>
            <div className="bg-white p-3 rounded-xl border border-[#F3E8FF] space-y-1">
              <span className="text-[10px] text-[#8C7080] block">Chave Celular (Jacobina):</span>
              <span className="font-mono text-xs font-bold text-[#BE185D] block">
                {STORE_CONFIG.pixKey}
              </span>
              <span className="text-[10px] text-[#6B5561] block">
                {STORE_CONFIG.pixBeneficiary}
              </span>
            </div>
          </div>

        </div>

        {/* Quiet copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9C8291] gap-3">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name} · Jacobina, Bahia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-[#BE185D] fill-[#BE185D]" />
            <span>e receita artesanal de família.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
