import React from 'react';
import { Check, Sparkles, Shield, Plane, Building2, Calendar, ArrowRight, CreditCard, AlertTriangle } from 'lucide-react';
import { Currency, Language } from '../types';
import { translations, getLocalizedPackages } from '../data/translations';
import { UPCOMING_COHORTS, formatCurrencyPrice } from '../data/expeditionData';

interface PricingPackagesProps {
  currentLang: Language;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onSelectTier: (tier: 'academic' | 'trader' | 'sovereign') => void;
  onPayByCard: (tier: 'academic' | 'trader' | 'sovereign', type?: 'full') => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  currentLang,
  selectedCurrency,
  onCurrencyChange,
  onSelectTier,
  onPayByCard
}) => {
  const t = translations[currentLang];
  const localizedPackages = getLocalizedPackages(currentLang);
  const currencies: Currency[] = ['USD'];

  return (
    <section id="packages" className="py-10 sm:py-12 bg-[#0B0F17] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Section Header & USD Currency Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1.5">
              <span>{t.packagesBadge1}</span>
              <span className="text-slate-600">·</span>
              <span>{t.packagesBadge2}</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.packagesTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-snug">
              {t.packagesSubtitle}
            </p>
          </div>

          {/* USD Currency Display */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#111722] p-1.5 rounded-lg border border-slate-800">
            <span className="text-[11px] font-mono-data text-slate-400 px-2 uppercase">
              {t.packagesCurrencyLabel}
            </span>
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className="px-2.5 py-1 rounded text-xs font-mono-data font-bold bg-[#D4AF37] text-[#0B0F17]"
              >
                {curr} ($)
              </button>
            ))}
          </div>
        </div>

        {/* Transparent VAT-Inclusive Pricing & Service Selection Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-[#111722] border border-[#D4AF37]/40 flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-justify">
            {t.packagesKycWarning}
          </p>
        </div>

        {/* Upcoming Cohort Dates Strip */}
        <div className="mb-12 p-4 rounded-xl bg-[#111722] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.packagesDatesLabel}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {UPCOMING_COHORTS.map((cohort) => (
              <div
                key={cohort.id}
                className="px-3 py-1.5 rounded bg-[#0B0F17] border border-slate-800 text-xs flex items-center gap-2"
              >
                <span className="text-slate-200 font-medium">{cohort.dates}</span>
                <span
                  className={`text-[10px] font-mono-data px-1.5 py-0.2 rounded ${
                    cohort.status.includes('Remaining')
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                  }`}
                >
                  {cohort.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {localizedPackages.map((pkg) => {
            const isHighlighted = pkg.highlighted;
            const isSovereign = pkg.id === 'sovereign';

            return (
              <div
                key={pkg.id}
                className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 relative ${
                  isHighlighted
                    ? 'bg-[#141D2B] border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/10 lg:-translate-y-2'
                    : isSovereign
                    ? 'bg-gradient-to-b from-[#131A26] to-[#0E141F] border border-[#D4AF37]/50 shadow-xl'
                    : 'bg-[#111722] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-6 px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B0F17] text-[11px] font-bold uppercase tracking-wider shadow">
                    {t.packagesPopularBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono-data font-bold text-[#D4AF37] uppercase tracking-wider">
                      {pkg.tierNumber}
                    </span>
                    {isSovereign && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FEF3C7] bg-[#D4AF37]/20 px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        B6 Motorcade & Diplomatic VIP
                      </span>
                    )}
                  </div>

                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="my-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-mono-data text-3xl sm:text-4xl font-extrabold text-white">
                        {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                      </span>
                      <span className="text-xs text-slate-300 font-mono-data">
                        {t.packagesPerDelegate}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-[#D4AF37] font-mono-data">
                      USD {pkg.priceUsd.toLocaleString()} per person, inclusive of applicable Ugandan VAT
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono-data">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>{t.packagesKycAllocationNote}</span>
                    </div>
                  </div>

                  {/* Logistics Snapshot */}
                  <div className="space-y-3 mb-6 text-xs">
                    <div className="p-3 rounded-lg bg-[#0B0F17]/80 border border-slate-800/80">
                      <div className="text-slate-400 font-semibold mb-0.5">
                        {t.packagesIdealForLabel}
                      </div>
                      <div className="text-slate-200">{pkg.idealFor}</div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">
                          {t.packagesAccommodationLabel}
                        </span>
                        <span className="text-slate-400">{pkg.accommodation}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-300">
                      <Plane className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold block">
                          {t.packagesTransportLabel}
                        </span>
                        <span className="text-slate-400">{pkg.transport}</span>
                      </div>
                    </div>
                  </div>

                  {/* Exclusive Bonus for Tier 3 */}
                  {pkg.exclusiveBonus && (
                    <div className="mb-6 p-3.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs text-[#FEF3C7]">
                      <strong className="block text-[#D4AF37] uppercase tracking-wider text-[10px] font-mono-data mb-1">
                        SOVEREIGN EXCLUSIVE RETAINER
                      </strong>
                      {pkg.exclusiveBonus}
                    </div>
                  )}

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-mono-data uppercase text-slate-400 tracking-wider">
                      {t.packagesIncludedLabel}
                    </div>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Deliverables & CTA */}
                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono-data uppercase text-[#D4AF37] mb-2">
                      {t.packagesDeliverablesLabel}
                    </div>
                    <div className="space-y-1">
                      {pkg.deliverables.map((deliv, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <span className="text-[#D4AF37]">•</span>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full-Payment Registration + Online Settlement Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => onSelectTier(pkg.id)}
                      className={`w-full py-3 rounded font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-[#0B0F17] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20'
                          : 'bg-[#182232] hover:bg-[#D4AF37] text-white hover:text-[#0B0F17] border border-[#D4AF37]/50'
                      }`}
                    >
                      <span>
                        {t.packagesRegisterBtn} ({pkg.tierNumber})
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onPayByCard(pkg.id, 'full')}
                      className="w-full py-2.5 px-3 rounded bg-[#0B0F17] hover:bg-[#131A26] border border-slate-700 hover:border-[#D4AF37]/60 text-[11px] font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {t.packagesPayFullBtn} ({formatCurrencyPrice(pkg.priceUsd, selectedCurrency)} · VAT Incl.)
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sovereign B6 Armored Motorcade Feature Showcase Card */}
        <div className="mt-12 rounded-2xl overflow-hidden bg-[#111722] border border-[#D4AF37]/40 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          <div className="lg:col-span-5 relative min-h-[260px]">
            <img
              src="/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg"
              alt="B6 Armored Executive Motorcade and Tactical Security Transfer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#111722]" />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono-data uppercase text-[#D4AF37]">
              <span>TIER 03 SOVEREIGN EXECUTIVE · DIPLOMATIC VIP</span>
              <span>·</span>
              <span>B6 ARMORED TACTICAL MOTORCADE</span>
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              {t.packagesSovereignHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.packagesSovereignDesc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectTier('sovereign')}
                className="px-5 py-2.5 rounded text-xs font-bold bg-[#D4AF37] text-[#0B0F17] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
              >
                {t.packagesSovereignBtn}
              </button>
              <button
                onClick={() => onPayByCard('sovereign', 'full')}
                className="px-4 py-2.5 rounded text-xs font-semibold bg-[#182232] text-white border border-[#D4AF37]/40 hover:bg-[#1E2A3D] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {t.packagesPayDepositBtn} ({formatCurrencyPrice(25000, selectedCurrency)} {t.packagesPerDelegate})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
