import React, { useState, useEffect } from 'react';
import { AlertOctagon, Check, RotateCcw, ArrowRight, ShieldCheck, HelpCircle, FileSearch } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations, getLocalizedScamRules } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface ScamImmunityToolProps {
  currentLang: Language;
  selectedCurrency?: Currency;
  defaultExpanded?: boolean;
  onApplyForVettingWithData?: (score: number, flags: string[]) => void;
  onOpenDocVerification?: () => void;
}

export const ScamImmunityTool: React.FC<ScamImmunityToolProps> = ({
  currentLang,
  selectedCurrency = 'USD',
  defaultExpanded = true,
  onApplyForVettingWithData,
  onOpenDocVerification
}) => {
  const t = translations[currentLang];
  const scamRules = getLocalizedScamRules(currentLang);
  const [selectedFlags, setSelectedFlags] = useState<string[]>(
    defaultExpanded ? ['deep-discount', 'advance-export-tax'] : []
  );

  useEffect(() => {
    setSelectedFlags(defaultExpanded ? ['deep-discount', 'advance-export-tax'] : []);
  }, [defaultExpanded]);

  const toggleFlag = (id: string) => {
    setSelectedFlags((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const resetFlags = () => {
    setSelectedFlags([]);
  };

  const totalScore = selectedFlags.reduce((acc, flagId) => {
    const rule = scamRules.find((r) => r.id === flagId);
    return acc + (rule ? rule.riskScore : 0);
  }, 0);

  const displayRisk = Math.min(99.9, totalScore);

  const getRiskVerdict = (score: number) => {
    if (score >= 60) {
      return {
        level: t.scamVerdictCritical,
        color: 'text-rose-500',
        badgeBg: 'bg-rose-950/80 border-rose-800 text-rose-300',
        desc: t.scamVerdictCriticalDesc
      };
    } else if (score >= 30) {
      return {
        level: t.scamVerdictHigh,
        color: 'text-amber-500',
        badgeBg: 'bg-amber-950/80 border-amber-800 text-amber-300',
        desc: t.scamVerdictHighDesc
      };
    } else if (score > 0) {
      return {
        level: t.scamVerdictElevated,
        color: 'text-yellow-400',
        badgeBg: 'bg-yellow-950/80 border-yellow-800 text-yellow-300',
        desc: t.scamVerdictElevatedDesc
      };
    } else {
      return {
        level: t.scamVerdictClean,
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
        desc: t.scamVerdictCleanDesc
      };
    }
  };

  const verdict = getRiskVerdict(displayRisk);
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);

  return (
    <section id="scam-immunity" className="py-10 sm:py-12 bg-[#0E141F] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1.5">
            <span>{t.scamBadge1}</span>
            <span className="text-slate-600">·</span>
            <span>{t.scamBadge2}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.scamToolTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-snug">
            {t.scamToolSubtitle}
          </p>
        </div>

        {/* Diagnostic Tool Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Checkbox Indicators (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono-data text-slate-400 uppercase tracking-wider">
                {t.scamSelectConditionsLabel} ({selectedFlags.length})
              </span>
              <button
                onClick={resetFlags}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.scamResetBtn}</span>
              </button>
            </div>

            <div className="space-y-3">
              {scamRules.map((rule) => {
                const isChecked = selectedFlags.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleFlag(rule.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#182232] border-[#D4AF37]/80 shadow-md'
                        : 'bg-[#111722] border-slate-800 hover:border-slate-700 hover:bg-[#141C2B]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                          isChecked
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B0F17]'
                            : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold ${
                              isChecked ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {rule.label}
                          </h4>
                          <span className="text-[11px] font-mono-data text-rose-400 font-semibold shrink-0">
                            +{rule.riskScore}% Risk
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {rule.description}
                        </p>

                        {isChecked && (
                          <div className="mt-3 p-2.5 rounded bg-[#0B0F17] border border-rose-900/40 text-[11px] text-rose-300 leading-snug">
                            <span className="font-semibold text-rose-400">
                              {t.scamForensicAnalysisLabel}{' '}
                            </span>
                            {rule.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Risk Gauge & Scoreboard (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-xl bg-[#111722] border border-[#D4AF37]/40 p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono-data uppercase tracking-wider text-slate-400">
                  {t.scamScoreHeader}
                </span>
                <span className="text-[10px] font-mono-data text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  ALGORITHM V4.2
                </span>
              </div>

              {/* Dial / Metric */}
              <div className="text-center py-4 bg-[#0B0F17] rounded-xl border border-slate-800/80 p-6">
                <div className="inline-flex items-baseline gap-1">
                  <span
                    className={`font-cinzel text-5xl sm:text-6xl font-bold font-mono-data ${verdict.color}`}
                  >
                    {displayRisk.toFixed(0)}%
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs font-mono-data font-bold px-3 py-1 rounded border ${verdict.badgeBg}`}
                  >
                    {verdict.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-3 max-w-sm mx-auto leading-relaxed">
                  {verdict.desc}
                </p>
              </div>

              {/* Recommended Action Checklist */}
              <div className="space-y-2.5 text-xs">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.scamNextStepsTitle}
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t.scamNextStep1}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t.scamNextStep2}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertOctagon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t.scamNextStep3}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {onOpenDocVerification && (
                  <button
                    onClick={onOpenDocVerification}
                    className="w-full py-3.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-500/50 rounded transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileSearch className="w-4 h-4 text-emerald-400" />
                    <span>
                      {t.scamSubmitDocBtn} ({auditPrice})
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (onApplyForVettingWithData) {
                      onApplyForVettingWithData(displayRisk, selectedFlags);
                    }
                  }}
                  className="w-full py-3.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.scamRegisterAuditBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {auditPrice} (24–72h Report · VAT Incl.) · Choose Any Service or Tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
