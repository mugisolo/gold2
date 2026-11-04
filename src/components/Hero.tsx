import React from 'react';
import { ShieldAlert, ArrowRight, FileText, CheckCircle2, Lock, CreditCard, AlertTriangle, FileSearch } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface HeroProps {
  currentLang: Language;
  selectedCurrency: Currency;
  showHeroBanner?: boolean;
  showGoldTicker?: boolean;
  onOpenBriefing: () => void;
  onViewPackages: () => void;
  onOpenCardPayment: () => void;
  onOpenRegistration: () => void;
  onOpenDocVerification: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  selectedCurrency,
  showHeroBanner = true,
  showGoldTicker = true,
  onOpenBriefing,
  onViewPackages,
  onOpenCardPayment,
  onOpenRegistration,
  onOpenDocVerification
}) => {
  const t = translations[currentLang];
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);
  const spotLbmaKg = formatCurrencyPrice(85420, selectedCurrency);
  const entebbeRefineryKg = formatCurrencyPrice(84150, selectedCurrency);

  return (
    <section className="relative min-h-[72vh] flex items-center pt-28 pb-10 overflow-hidden border-b border-slate-800/80">
      {/* Background Hero Visual with Rich Obsidian Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg"
          alt="Gold Assay and Executive Due Diligence"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-[#0B0F17]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Live Multi-Currency Gold Spot Ticker (Controlled by /uiConfig/global goldTickerEnabled rule) */}
        {showGoldTicker && (
          <div className="mb-4 px-3.5 py-2 rounded-lg bg-[#0B0F17]/90 border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono-data">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#D4AF37] font-bold uppercase">
                LBMA 999.9 Fine Reference ({selectedCurrency}):
              </span>
              <span className="text-white font-bold">{spotLbmaKg} / kg</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span>
                Entebbe Licensed Refinery Parity (98.5%): <strong className="text-emerald-400">{entebbeRefineryKg} / kg</strong>
              </span>
              <span className="hidden sm:inline text-slate-500">·</span>
              <span className="hidden sm:inline text-rose-400">
                Scam Threshold Alert: &gt;4% Discount = Advance-Fee Fraud
              </span>
            </div>
          </div>
        )}

        <div className="max-w-3xl space-y-4">
          {/* Authority Badge (Controlled by /uiConfig/global heroBannerVisible rule) */}
          {showHeroBanner && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#131A26]/90 border border-[#D4AF37]/40 text-[#FEF3C7] text-xs font-medium tracking-wide">
              <span>{t.heroBadge}</span>
            </div>
          )}

          {/* Primary Sovereign Headline */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {t.heroTitleLine1}{' '}
            <span className="gold-gradient-text block mt-1">
              {t.heroTitleHighlight}
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-semibold block mt-1.5">
              {t.heroTitleLine2}
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 leading-snug max-w-2xl font-normal text-justify">
            {t.heroSubtitle}
          </p>

          {/* Key Verification Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#111722]/80 border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">{t.heroPillar1Title}</strong>
                {t.heroPillar1Sub}
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#111722]/80 border border-[#D4AF37]/30">
              <FileSearch className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">
                  {auditPrice} {t.heroPillar2Title}
                </strong>
                {t.heroPillar2Sub}
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#111722]/80 border border-slate-800/80">
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">{t.heroPillar3Title}</strong>
                {t.heroPillar3Sub}
              </div>
            </div>
          </div>

          {/* Primary & Secondary Action Group */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onOpenRegistration}
              className="px-6 py-3.5 rounded font-semibold text-sm text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2 shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
            >
              <span>{t.heroCtaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDocVerification}
              className="px-5 py-3.5 rounded font-bold text-sm text-white bg-[#182232] hover:bg-[#1E2B40] border-2 border-[#D4AF37] transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/10 cursor-pointer"
            >
              <FileSearch className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {t.heroCtaDocAudit} · {auditPrice} (USD, inclusive of applicable Ugandan VAT)
              </span>
            </button>

            <button
              onClick={onViewPackages}
              className="px-5 py-3.5 rounded font-semibold text-sm text-white bg-[#131A26] hover:bg-[#1C2638] border border-slate-700 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              {t.heroCtaPackages}
            </button>

            <button
              onClick={onOpenCardPayment}
              className="px-4 py-3.5 rounded font-semibold text-xs text-[#FEF3C7] bg-[#111722] hover:bg-[#182232] border border-[#D4AF37]/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.heroCtaCardPay}</span>
            </button>

            <button
              onClick={onOpenBriefing}
              className="px-4 py-3.5 rounded font-medium text-xs text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/60 border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.heroCtaBriefing}</span>
            </button>
          </div>

          {/* Statutory Non-Transaction Notice */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong className="text-slate-200">{t.heroDisclaimerTitle}</strong>{' '}
                {t.heroDisclaimerText}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Executive Metrics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="font-mono-data text-2xl sm:text-3xl font-bold text-white">7 DAYS</div>
            <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mt-1">
              {t.heroStat1Label}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.heroStat1Sub}</p>
          </div>

          <div>
            <div className="font-mono-data text-2xl sm:text-3xl font-bold text-[#D4AF37]">
              {auditPrice}
            </div>
            <div className="text-xs text-white font-semibold uppercase tracking-wider mt-1">
              {t.heroStat2Label}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.heroStat2Sub}</p>
          </div>

          <div>
            <div className="font-mono-data text-2xl sm:text-3xl font-bold text-emerald-400">
              0% BROKERAGE
            </div>
            <div className="text-xs text-white font-semibold uppercase tracking-wider mt-1">
              {t.heroStat4Label}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.heroStat4Sub}</p>
          </div>

          <div>
            <div className="font-mono-data text-xl sm:text-2xl font-bold text-amber-400">
              KYC & Sanctions Vetting
            </div>
            <div className="text-xs text-white font-semibold uppercase tracking-wider mt-1">
              Included in Every Package
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{t.heroStat3Sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
