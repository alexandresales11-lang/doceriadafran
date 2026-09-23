import React from 'react';
import { Heart, Sparkles, Award } from 'lucide-react';
import { STORE_CONFIG } from '../data/products';

export const AboutFran: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-20 bg-white border-t border-[#F8EBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Medallion Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Outer decorative glow */}
              <div className="absolute inset-0 bg-[#FBCFE8]/40 rounded-full blur-2xl -z-10" />

              {/* Fran portrait medallion with delicate double lilac border */}
              <div className="p-2.5 bg-gradient-to-tr from-[#D8B4E2] via-[#FCE7F3] to-[#C084FC] rounded-full shadow-xl shadow-[#D8B4E2]/30">
                <div className="p-1.5 bg-white rounded-full ring-2 ring-[#C084FC]/70">
                  <img
                    src={STORE_CONFIG.avatarImage}
                    alt="Fran - Confeiteira da Doceria da Fran"
                    className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Floating sweet badge */}
              <div className="absolute -bottom-3 right-4 bg-white/95 px-4 py-2 rounded-2xl shadow-md border border-[#F3E8FF] flex items-center gap-2 text-xs text-[#BE185D] font-semibold">
                <Heart className="w-4 h-4 fill-[#BE185D]" />
                <span>Feito com Afeto</span>
              </div>
            </div>
          </div>

          {/* Text and story Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C084FC]">
              Nossa História
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B1A28] leading-tight">
              Da nossa cozinha artesanal direto para as suas melhores memórias
            </h2>
            
            <p className="text-sm sm:text-base text-[#664D5B] leading-relaxed">
              A <strong>Doceria da Fran</strong> nasceu do amor genuíno pela confeitaria artesanal. Cada receita carrega o calor do carinho de mãe, massas fofinhas que derretem na boca e recheios generosos preparados sem pressa no tacho.
            </p>

            <p className="text-sm text-[#735A68] leading-relaxed">
              Aqui em Jacobina/BA, selecionamos rigorosamente chocolate nobre belga, frutas frescas, manteiga de primeira e doce de leite puro. Sem conservantes artificiais ou misturas prontas: aqui o sabor é autêntico e feito para encantar cada pedaço.
            </p>

            {/* 3 mini highlights */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-3.5 rounded-2xl bg-[#FFF8FA] border border-[#FCE7F3]">
                <Sparkles className="w-4 h-4 text-[#BE185D] mb-1.5" />
                <h4 className="text-xs font-bold text-[#3B1A28]">Ingredientes Puros</h4>
                <p className="text-[11px] text-[#7A6472] mt-0.5">Sem misturas prontas ou aromatizantes químicos.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF5FF] border border-[#F3E8FF]">
                <Award className="w-4 h-4 text-[#9333EA] mb-1.5" />
                <h4 className="text-xs font-bold text-[#3B1A28]">Produção Diária</h4>
                <p className="text-[11px] text-[#7A6472] mt-0.5">Bolos e tortas assados e montados no dia do seu evento.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF8FA] border border-[#FCE7F3]">
                <Heart className="w-4 h-4 text-[#EC4899] mb-1.5" />
                <h4 className="text-xs font-bold text-[#3B1A28]">Toque Personalizado</h4>
                <p className="text-[11px] text-[#7A6472] mt-0.5">Cada pedido é preparado com dedicação única pela Fran.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
