import React from 'react';
import { AlertTriangle, TrendingUp, FileWarning, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations, getLocalizedMarketRealities } from '../data/translations';

interface MarketRealityProps {
  currentLang: Language;
  onOpenScamDiagnostic?: () => void;
}

const COMPARISON_ROWS: Record<
  Language,
  Array<{
    vector: string;
    pitch: string;
    reality: string;
  }>
> = {
  EN: [
    {
      vector: 'Pricing vs. LBMA Spot',
      pitch: '"15% to 25% discount below LBMA spot on 100kg–500kg."',
      reality: 'Licensed refiners in Kampala pay 98%–99% spot in immediate cash. Deep discounts do not exist.'
    },
    {
      vector: 'URA 5% Export Tax',
      pitch: '"Buyer must wire $50,000 upfront to clear customs & taxes."',
      reality: 'Export levies are assessed electronically via ASYCUDA World after accredited refinery assay.'
    },
    {
      vector: 'Assay & Testing',
      pitch: '"Inspect the bars at our hotel or private office with handheld XRF."',
      reality: 'XRF only reads surface microns. Full smelting & lead cupellation Fire Assay in a bonded refinery is mandatory.'
    },
    {
      vector: 'Escrow & Payment',
      pitch: '"Wire deposit into our Kampala law firm’s client escrow account."',
      reality: 'Transactions clear strictly through Tier-1 commercial bank conditional documentary structures.'
    }
  ],
  AR: [
    {
      vector: 'التسعير مقارنة بسعر LBMA الفوري',
      pitch: '"خصم 15% إلى 25% أقل من سعر LBMA الفوري على كميات 100–500 كجم."',
      reality: 'تدفع المصافي المرخصة في كمبالا 98%–99% من السعر الفوري نقداً وفوراً. الخصومات الكبيرة غير موجودة.'
    },
    {
      vector: 'ضريبة التصدير 5% لدى URA',
      pitch: '"يجب على المشتري تحويل 50,000 دولار مقدماً لتخليص الجمارك والضرائب."',
      reality: 'تُقيّم رسوم التصدير إلكترونياً عبر نظام ASYCUDA World الرسمي بعد المعايرة في مصفاة معتمدة.'
    },
    {
      vector: 'الفحص والمعايرة المخبرية',
      pitch: '"افحص السبائك في الفندق أو مكتبنا الخاص بجهاز XRF المحمول."',
      reality: 'جهاز XRF يقرأ السطح فقط. الصهر الكامل ومعايرة النار (Fire Assay) في مصفاة جمركية أمر إلزامي.'
    },
    {
      vector: 'الضمان البنكي والدفع',
      pitch: '"حوّل العربون إلى حساب الضمان الخاص بمكتب المحاماة في كمبالا."',
      reality: 'تتم التسويات حصرياً عبر البنوك التجارية من الفئة الأولى باعتمادات مستندية مشروطة.'
    }
  ],
  ZH: [
    {
      vector: '对比 LBMA 国际现货定价',
      pitch: '“100公斤至500公斤金条，享受低于 LBMA 现货价 15% 至 25% 的特惠折扣。”',
      reality: '坎帕拉持牌精炼厂以 98%–99% 现货价即期现金收购。深度折扣在经济学上根本不存在。'
    },
    {
      vector: 'URA 5% 法定出口税',
      pitch: '“买方必须先电汇 50,000 美元用于办理海关清关与缴纳出口税。”',
      reality: '出口税仅在认证保税精炼厂完成火试金化验后，通过官方 ASYCUDA World 系统生成 PRN 缴纳。'
    },
    {
      vector: '纯度化验与检测',
      pitch: '“在酒店套房或私人办公室用手持式 XRF 光谱仪看货检测即可。”',
      reality: 'XRF 仅能扫描表面微米层。必须在保税精炼厂进行整体感应熔炼与 1050°C 铅灰吹火试金检测。'
    },
    {
      vector: '资金托管与结算',
      pitch: '“请将定金汇入我们在坎帕拉合作的私人律师事务所客户托管账户。”',
      reality: '合法大宗交易严格通过一级商业银行有条件跟单信用证或银行级托管完成结算。'
    }
  ],
  FR: [
    {
      vector: 'Prix vs Cours Spot LBMA',
      pitch: '« Remise de 15 % à 25 % sous le spot LBMA sur 100 kg à 500 kg. »',
      reality: 'Les raffineries agréées de Kampala paient 98 % à 99 % du spot en espèces immédiates. Les fortes remises n’existent pas.'
    },
    {
      vector: 'Taxe d’Exportation URA de 5 %',
      pitch: '« L’acheteur doit virer 50 000 $ d’avance pour dédouaner et payer les taxes. »',
      reality: 'Les taxes d’exportation sont liquidées électroniquement via ASYCUDA World après essai en raffinerie agréée.'
    },
    {
      vector: 'Essai & Analyse Métallurgique',
      pitch: '« Inspectez les barres à notre hôtel ou bureau privé avec un XRF portable. »',
      reality: 'Le XRF ne lit que les microns de surface. La fusion complète et la coupellation (Fire Assay) en raffinerie sont obligatoires.'
    },
    {
      vector: 'Séquestre & Paiement',
      pitch: '« Virez l’acompte sur le compte séquestre de notre cabinet d’avocats à Kampala. »',
      reality: 'Les transactions se règlent strictement via des banques commerciales de rang 1 sous garanties documentaires.'
    }
  ]
};

export const MarketReality: React.FC<MarketRealityProps> = ({
  currentLang,
  onOpenScamDiagnostic
}) => {
  const t = translations[currentLang];
  const realities = getLocalizedMarketRealities(currentLang);
  const rows = COMPARISON_ROWS[currentLang] || COMPARISON_ROWS.EN;
  const icons = [TrendingUp, AlertTriangle, FileWarning];

  return (
    <section id="market-reality" className="py-10 sm:py-12 bg-[#0B0F17] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-2">
              <span>{t.realitySectionBadge1}</span>
              <span className="text-slate-600">·</span>
              <span>{t.realitySectionBadge2}</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.realitySectionTitle}
            </h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">
              {t.realitySectionSubtitle}
            </p>
          </div>

          {onOpenScamDiagnostic && (
            <button
              onClick={onOpenScamDiagnostic}
              className="self-start md:self-auto px-4 py-2.5 rounded bg-[#131A26] hover:bg-[#1B2536] border border-[#D4AF37]/40 text-xs font-semibold text-[#FEF3C7] flex items-center gap-2 transition-colors shrink-0"
            >
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.realityAuditBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3-Card Reality Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {realities.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#111722] border border-slate-800 hover:border-[#D4AF37]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-xs font-mono-data uppercase tracking-wider px-2.5 py-1 rounded bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/20">
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#0B0F17] border border-slate-800 flex items-center justify-center text-[#D4AF37]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="font-mono-data text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      {item.metricSub}
                    </div>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-white mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                  <div className="p-3 rounded-lg bg-[#0B0F17]/90 border border-rose-900/40">
                    <div className="text-[11px] font-mono-data uppercase text-rose-400 font-semibold mb-1">
                      {t.realityImplicationLabel}
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">
                      {item.implication}
                    </p>
                  </div>

                  <div className="text-xs text-[#FEF3C7]/90 font-mono-data flex items-start gap-2 pt-1">
                    <span className="text-[#D4AF37] font-bold">›</span>
                    <span>{item.keyStat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparative Reality Table: The Scammer Pitch vs On-The-Ground Reality */}
        <div className="mt-14 rounded-xl bg-[#111722] border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                {t.realityTableTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.realityTableSub}
              </p>
            </div>
            <span className="text-xs font-mono-data text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/20 self-start sm:self-auto">
              FIELD AUDIT COMPARISON
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0B0F17]/60 text-[11px] font-mono-data uppercase text-slate-400">
                  <th className="py-3.5 px-6">{t.realityColVector}</th>
                  <th className="py-3.5 px-6 text-rose-400">{t.realityColPitch}</th>
                  <th className="py-3.5 px-6 text-emerald-400">{t.realityColGround}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#151D2B]/50">
                    <td className="py-4 px-6 font-semibold text-white">{row.vector}</td>
                    <td className="py-4 px-6 text-rose-300">{row.pitch}</td>
                    <td className="py-4 px-6 text-emerald-300">{row.reality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
