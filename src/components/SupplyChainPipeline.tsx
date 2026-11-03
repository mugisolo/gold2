import React, { useState } from 'react';
import { Pickaxe, Factory, Flame, ShieldAlert, PlaneTakeoff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations, getLocalizedSupplyChainSteps } from '../data/translations';
import { UgandaSupplyChainMap } from './UgandaSupplyChainMap';

interface SupplyChainPipelineProps {
  currentLang: Language;
}

export const SupplyChainPipeline: React.FC<SupplyChainPipelineProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [Pickaxe, Factory, Flame, ShieldAlert, PlaneTakeoff];
  const localizedSteps = getLocalizedSupplyChainSteps(currentLang);
  const currentStep = localizedSteps[activeStep] || localizedSteps[0];

  return (
    <section id="food-chain" className="py-10 sm:py-12 bg-[#0E141F] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1.5">
            <span>{t.supplyBadge1}</span>
            <span className="text-slate-600">·</span>
            <span>{t.supplyBadge2}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.supplyTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-snug">
            {t.supplySubtitle}
          </p>
        </div>

        {/* Step Buttons Pipeline Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {localizedSteps.map((step, idx) => {
            const Icon = stepIcons[idx] || Pickaxe;
            const isSelected = activeStep === idx;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-[#182232] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'bg-[#111722] border-slate-800 hover:border-slate-700 hover:bg-[#141C2B]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-mono-data font-bold ${
                      isSelected ? 'text-[#D4AF37]' : 'text-slate-400'
                    }`}
                  >
                    {t.supplyStageWord} {step.stageNumber}
                  </span>
                  <div
                    className={`p-1.5 rounded ${
                      isSelected
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div
                  className={`text-sm font-bold line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {step.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {step.location}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-data font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/20">
                  {t.supplyStageWord} {currentStep.stageNumber} / 05
                </span>
                <span className="text-xs text-slate-400">{currentStep.location}</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-2">
                {currentStep.name}
              </h3>
            </div>
            <div className="text-xs text-slate-400 bg-[#0B0F17] px-3.5 py-2 rounded-lg border border-slate-800 self-start md:self-center">
              <span className="text-slate-400">{t.supplyCounterpartyLabel} </span>
              <span className="text-white font-medium">{currentStep.realEntity}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* The Fraud Vulnerability */}
            <div className="p-5 rounded-lg bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{t.supplyTrapTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.fraudRisk}
              </p>
              <div className="mt-4 pt-3 border-t border-rose-900/30 text-[11px] text-rose-300">
                {t.supplyTrapWarning}
              </div>
            </div>

            {/* The Expedition Due Diligence Verification */}
            <div className="p-5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{t.supplyVerifyTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.dueDiligenceAction}
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-900/30 text-[11px] text-emerald-300 font-mono-data">
                {t.supplyVerifyNote}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Uganda Gold Mining Regions & Supply Chain Transit Map */}
        <UgandaSupplyChainMap
          currentLang={currentLang}
          activeStageIndex={activeStep}
          onSelectStage={setActiveStep}
        />
      </div>
    </section>
  );
};

