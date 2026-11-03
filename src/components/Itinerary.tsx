import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, CheckCircle2, ChevronRight, FileText, Sparkles } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations, getLocalizedItinerary } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface ItineraryProps {
  currentLang: Language;
  selectedCurrency?: Currency;
  onRegisterForTier: (tier: 'academic' | 'trader' | 'sovereign') => void;
}

export const Itinerary: React.FC<ItineraryProps> = ({
  currentLang,
  selectedCurrency = 'USD',
  onRegisterForTier
}) => {
  const t = translations[currentLang];
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const itineraryDays = getLocalizedItinerary(currentLang);
  const activeDayData = itineraryDays.find((d) => d.day === selectedDay) || itineraryDays[0];
  const kycPrice = formatCurrencyPrice(1000, selectedCurrency);

  return (
    <section id="expedition" className="py-10 sm:py-12 bg-[#0B0F17] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1.5">
            <span>{t.itineraryBadge1}</span>
            <span className="text-slate-600">·</span>
            <span>{t.itineraryBadge2}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.itineraryTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-snug">
            {t.itinerarySubtitle}
          </p>
        </div>

        {/* Day Selector Navigation Pipeline */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-thin">
          {itineraryDays.map((day) => {
            const isSelected = selectedDay === day.day;
            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#182232] border-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#111722] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono-data font-bold ${
                      isSelected ? 'text-[#D4AF37]' : 'text-slate-500'
                    }`}
                  >
                    {t.itineraryDayWord} 0{day.day}
                  </span>
                  {day.day === 2 && (
                    <span className="text-[10px] font-semibold bg-rose-950/80 text-rose-300 px-1.5 py-0.2 rounded border border-rose-800/60">
                      Scam Lab
                    </span>
                  )}
                  {day.day === 6 && (
                    <span className="text-[10px] font-semibold bg-[#D4AF37]/20 text-[#FEF3C7] px-1.5 py-0.2 rounded border border-[#D4AF37]/30">
                      Gala
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-white mt-1 whitespace-nowrap">
                  {day.title.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Display */}
        <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          {/* Day Header Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono-data font-bold text-[#0B0F17] bg-[#D4AF37] px-2.5 py-0.5 rounded">
                  {t.itineraryDayWord} 0{activeDayData.day}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeDayData.location}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {activeDayData.timeSlot}
                </span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-3">
                {activeDayData.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium mt-1">
                {activeDayData.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-center">
              <button
                onClick={() => onRegisterForTier('trader')}
                className="px-4 py-2 text-xs font-semibold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors whitespace-nowrap flex items-center gap-1.5 shadow"
              >
                <span>
                  {t.itineraryRegisterBtn} ({kycPrice} KYC)
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grid: Details & Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Content */}
            <div
              className={`${
                activeDayData.image ? 'lg:col-span-7' : 'lg:col-span-12'
              } space-y-6`}
            >
              <div>
                <h4 className="text-xs font-mono-data uppercase tracking-wider text-slate-400 mb-2">
                  {t.itineraryMandateLabel}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeDayData.description}
                </p>
              </div>

              {/* Key Activities */}
              <div>
                <h4 className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] mb-3">
                  {t.itineraryActivitiesLabel}
                </h4>
                <div className="space-y-2.5">
                  {activeDayData.keyActivities.map((act, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Deconstructed & Executive Deliverable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.itineraryRiskLabel}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {activeDayData.riskDeconstructed}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.itineraryDeliverableLabel}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {activeDayData.executiveDeliverable}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Featured Forensic Visual if available */}
            {activeDayData.image && (
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#0B0F17] relative shadow-xl group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={activeDayData.image}
                      alt="Forensic laboratory testing gold authenticity"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
                  </div>
                  <div className="p-4 bg-[#111722] border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Forensic Metallurgical Lab
                      </span>
                      <span className="text-[11px] font-mono-data text-emerald-400">
                        Seized Counterfeit Library
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick day progression footer */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
              disabled={selectedDay === 1}
              className={`hover:text-white transition-colors ${
                selectedDay === 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              {t.itineraryPrevDay}
            </button>
            <span className="font-mono-data">
              {t.itineraryDayWord} {selectedDay} / 7
            </span>
            <button
              onClick={() => setSelectedDay((prev) => Math.min(7, prev + 1))}
              disabled={selectedDay === 7}
              className={`hover:text-white transition-colors ${
                selectedDay === 7 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              {t.itineraryNextDay}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
