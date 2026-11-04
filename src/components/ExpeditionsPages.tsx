import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  ShieldCheck,
  FileText,
  Users,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Compass,
  Clock,
  Building2,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Currency, Language } from '../types';
import {
  ITINERARY_DAYS,
  EXPEDITION_PACKAGES,
  UPCOMING_COHORTS,
  formatCurrencyPrice
} from '../data/expeditionData';

interface SharedExpeditionProps {
  currentLang: Language;
  selectedCurrency: Currency;
  onNavigate: (path: string) => void;
  onSelectTierForApply?: (tier: 'academic' | 'trader' | 'sovereign', cohort?: string) => void;
}

const IndependenceBanner: React.FC = () => (
  <div className="bg-[#080B11] border-b border-slate-800/80 py-2.5 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
      <p className="font-medium text-slate-200 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
        Independent due diligence and field verification. We do not buy, sell, or broker gold.
      </p>
      <span className="text-[11px] font-mono text-slate-400">
        7-Day Field Programme · Entebbe, Kampala, Mubende & Busia
      </span>
    </div>
  </div>
);

const ExpeditionsSubnav: React.FC<{
  activePath: string;
  onNavigate: (path: string) => void;
}> = ({ activePath, onNavigate }) => {
  const items = [
    { label: 'Overview', path: '/expeditions' },
    { label: 'Professional Trader', path: '/expeditions/professional' },
    { label: 'Academic & Research', path: '/expeditions/academic' },
    { label: 'Institutional & Private', path: '/expeditions/institutional' },
    { label: '7-Day Itinerary', path: '/expeditions/itinerary' },
    { label: 'Dates & Packages', path: '/expeditions/dates' }
  ];

  return (
    <div className="bg-[#0B0F17]/90 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
        {items.map((item) => {
          const active = activePath === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 6.1 EXPEDITIONS OVERVIEW (/expeditions)
// ============================================================================
export const ExpeditionsOverviewPage: React.FC<SharedExpeditionProps> = ({
  selectedCurrency,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions" onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
              7-Day Field Due-Diligence Programme · Uganda
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
              On-the-ground verification across Uganda’s regulated gold supply chain.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure mb-8">
              Designed for principals, compliance officers, researchers, and institutional delegations who need direct exposure to the mining cadastre, extraction corridors, accredited refineries, customs clearance, and banking standards before committing capital.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/expeditions/dates')}
                className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <span>Compare Dates & Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/expeditions/itinerary')}
                className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Inspect Full 7-Day Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selection: Difference Between the Three Audiences */}
      <section className="py-16 lg:py-20 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#9A7418] mb-2">
              Three Tailored Programmes
            </p>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Choose the programme aligned with your mandate
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every cohort covers the core regulatory and supply-chain stages, while accommodation, transport, private sessions, and counterparty audits are structured around three distinct participant profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Professional Trader */}
            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-[#9A7418] transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#9A7418]/10 text-[#9A7418]">
                    Tier 02 · Most Selected
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {formatCurrencyPrice(15000, selectedCurrency)} / person
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-[#9A7418] mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
                  Professional Trader Expedition
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  For bullion buyers, commodity desks, and private principals evaluating active counterparties, refinery procedures, and compliant contract structures.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-stone-200/80 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Includes 1-on-1 review of up to 2 active gold offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>5-Star Kampala Serena Hotel & dedicated 4x4 SUV convoy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Hands-on fire assay, DGSM registry & banking roundtable</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/expeditions/professional')}
                className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Professional Programme</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Academic & Research */}
            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-[#9A7418] transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-stone-200/80 text-slate-700">
                    Tier 01 · Research & ESG
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {formatCurrencyPrice(8000, selectedCurrency)} / person
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-700 mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
                  Academic & Research Expedition
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  For policy analysts, ESG auditors, university faculties, and supply-chain researchers studying mineral governance and artisanal-to-industrial flows.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-stone-200/80 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Cadastre briefings, artisanal pithead & refinery observation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>4-Star business hotel & escorted group executive transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Group rate: 6+ paying delegates include 1 complimentary faculty seat</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/expeditions/academic')}
                className="w-full py-3 px-4 rounded-lg bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Academic Programme</span>
                <ArrowRight className="w-4 h-4 text-[#9A7418]" />
              </button>
            </div>

            {/* Institutional & Private Delegations */}
            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-[#9A7418] transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-slate-900 text-[#D4AF37]">
                    Tier 03 · Private / Diplomatic
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {formatCurrencyPrice(25000, selectedCurrency)} / person
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-900 mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
                  Institutional & Private Delegations
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  For sovereign funds, central bank observers, family office principals, and corporate boards requiring discrete movement and custom scoping.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-stone-200/80 pt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>B6 armored executive motorcade & diplomatic airport clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Audit of up to 5 active offers + 12-month verification retainer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <span>Private ministerial briefings & Lake Victoria Villa suite</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/expeditions/institutional')}
                className="w-full py-3 px-4 rounded-lg bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Institutional Programme</span>
                <ArrowRight className="w-4 h-4 text-[#9A7418]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What the 7-Day Programme Involves & What Participants Gain */}
      <section className="py-16 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                Programme Structure
              </p>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                What participants gain over seven days
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Rather than sitting in a hotel conference room listening to brokers, participants travel across the physical nodes of Uganda’s gold sector with legal, metallurgical, and operational specialists.
              </p>
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                  How to choose the right path
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Already holding a written offer?</strong> Start with a 24–72-Hour Offer Verification ({formatCurrencyPrice(2500, selectedCurrency)}). USD 1,000 is credited toward any expedition booked within 90 days.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Planning long-term sourcing or research?</strong> Review the 7-day itinerary and apply for an upcoming cohort or request a confidential briefing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/expeditions/itinerary')}
                  className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Full 7-Day Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/expeditions/dates')}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Dates & Packages
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1.5">
                  01 · Regulatory Cadastre
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Direct DGSM License Verification
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn how Exploration Licenses (EL), Mining Leases (ML), and Mineral Dealer Licenses (MDL) are recorded and checked at the Entebbe Directorate of Geological Survey and Mines.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1.5">
                  02 · Assay & Metallurgy
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Fire Assay vs. Surface XRF
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Observe induction smelting and ISO-11426 cupellation inside bonded refineries, and understand why handheld XRF scans fail to detect tungsten or copper-alloy cores.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1.5">
                  03 · Field Economics
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Artisanal & Industrial Corridors
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspect artisanal extraction in Mubende/Kassanda and industrial CIL processing in Busia to see real pithead pricing and formal custody chains.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block mb-1.5">
                  04 · Customs & Banking
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  URA ASYCUDA & Tier-1 Banking
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Review statutory 5% export levy procedures, ICGLR certificates, commercial bank AML compliance, and armored tarmac logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 6.2 PROFESSIONAL TRADER EXPEDITION (/expeditions/professional)
// ============================================================================
export const ProfessionalExpeditionPage: React.FC<SharedExpeditionProps> = ({
  selectedCurrency,
  onNavigate,
  onSelectTierForApply
}) => {
  const pkg = EXPEDITION_PACKAGES.find((p) => p.id === 'trader') || EXPEDITION_PACKAGES[1];

  const handleApply = () => {
    if (onSelectTierForApply) {
      onSelectTierForApply('trader');
    } else {
      onNavigate('/apply?tier=trader');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions/professional" onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
                <span>Tier 02 · Commercial Due Diligence</span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
                Professional Trader Expedition
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure mb-6">
                Built for physical gold buyers, commodity desk directors, and private principals who want to verify active offers, understand refinery and customs workflows, and establish vetted legal and banking channels in Uganda.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-7 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center justify-center gap-2.5 transition-colors shadow-lg cursor-pointer"
                >
                  <span>Apply for a Professional Expedition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/expeditions/itinerary')}
                  className="px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  View 7-Day Itinerary
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    All-Inclusive Programme Fee
                  </span>
                  <span className="text-3xl font-mono font-bold text-white">
                    {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">per person (VAT incl.)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
                  7 Days / 6 Nights
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Accommodation
                  </span>
                  <span className="font-medium text-white">{pkg.accommodation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Ground Transport & Security
                  </span>
                  <span className="font-medium text-white">{pkg.transport}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Included Counterparty Audits
                  </span>
                  <span className="font-medium text-[#D4AF37]">
                    1-on-1 confidential audit of up to 2 active gold offers you hold
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply for a Professional Expedition
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas & Practical Deliverables */}
      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                What the Professional Trader Programme covers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Counterparty & Active-Offer Assessment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bring up to two active FCOs, SPAs, or seller proposals for confidential 1-on-1 verification against DGSM mineral registry records and URA customs files.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Refinery & Fire Assay Exposure
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hands-on testing session inside an accredited refinery covering ultrasonic core testing, induction smelting, and cupellation fire assay.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Banking, Escrow & Legal Structuring
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Closed-door roundtable with Ugandan commercial bank compliance officers and mining counsel on compliant SPA contracts and payment mechanics.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Artisanal & Industrial Field Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Guided inspections of Mubende artisanal pits and Busia industrial processing circuits to benchmark real production capacities and pricing.
                  </p>
                </div>
              </div>

              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Professional-Tier Inclusions
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Practical Deliverables
                </h3>
                <ul className="space-y-3">
                  {pkg.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <FileText className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-900">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-3">
                  Upcoming Cohort Availability
                </h3>
                <div className="space-y-2.5 mb-5">
                  {UPCOMING_COHORTS.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between text-xs py-2 border-b border-stone-200 last:border-0"
                    >
                      <span className="font-medium text-slate-800">{c.dates}</span>
                      <span className="font-mono text-[#9A7418] font-semibold">{c.status}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Every applicant completes statutory KYC/PEP screening and signs our Non-Transaction Agreement before final seat confirmation.
                </p>
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply for a Professional Expedition
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 6.3 ACADEMIC & RESEARCH EXPEDITION (/expeditions/academic)
// ============================================================================
export const AcademicExpeditionPage: React.FC<SharedExpeditionProps> = ({
  selectedCurrency,
  onNavigate,
  onSelectTierForApply
}) => {
  const [syllabusDownloaded, setSyllabusDownloaded] = useState(false);
  const pkg = EXPEDITION_PACKAGES.find((p) => p.id === 'academic') || EXPEDITION_PACKAGES[0];

  const handleDownloadProgramme = () => {
    const syllabusContent = [
      'UGANDA GOLD EXPEDITION — ACADEMIC & RESEARCH PROGRAMME SYLLABUS (TIER 01)',
      '=========================================================================',
      'Independent Field Research & Supply-Chain Governance Curriculum',
      'Duration: 7 Days / 6 Nights | Locations: Entebbe, Kampala, Mubende, Busia',
      `Programme Fee: ${formatCurrencyPrice(pkg.priceUsd, selectedCurrency)} per participant (Group policy: 6+ paying delegates include 1 complimentary faculty member)`,
      '',
      'LEARNING & RESEARCH OUTCOMES:',
      '1. Statutory Mineral Governance: Analysis of the Uganda Mining and Minerals Act 2022 and DGSM cadastre architecture.',
      '2. Artisanal & Small-Scale Gold Mining (ASGM): Field observation of extraction economics, mercury-free transitions, and formalization in Mubende/Kassanda.',
      '3. Industrial Processing & ESG Compliance: Site review of Carbon-in-Leach (CIL) circuits and environmental tailings management in Busia.',
      '4. Regional Traceability & Customs: Examination of ICGLR Regional Certification Mechanism (RCM), OECD Annex II alignment, and URA ASYCUDA export protocols.',
      '',
      '7-DAY CURRICULUM SUMMARY:',
      ...ITINERARY_DAYS.map(
        (d) => `Day ${d.day}: ${d.title} (${d.location})\n   Focus: ${d.focus}\n   Reference Material: ${d.executiveDeliverable}`
      ),
      '',
      'Non-Transaction Policy: This programme is strictly educational and analytical. We do not buy, sell, or broker minerals.'
    ].join('\n');

    const blob = new Blob([syllabusContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Uganda-Gold-Expedition-Academic-Research-Programme.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSyllabusDownloaded(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions/academic" onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono uppercase tracking-widest mb-4">
                <span>Tier 01 · Field Research & Supply-Chain Governance</span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
                Academic & Research Expedition
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure mb-6">
                An empirical 7-day field curriculum for university researchers, ESG and supply-chain auditors, development economists, and regulatory policy specialists examining East African mineral governance and traceability.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadProgramme}
                  className="px-7 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center justify-center gap-2.5 transition-colors shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Programme</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact?topic=academic')}
                  className="px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Enquire About a Group</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {syllabusDownloaded && (
                <p className="mt-3 text-xs text-emerald-400 font-medium">
                  Academic & Research Programme syllabus downloaded. You may also start an individual or group application below.
                </p>
              )}
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Academic & Research Rate
                  </span>
                  <span className="text-3xl font-mono font-bold text-white">
                    {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">per participant</span>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
                  Tier 01
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-5">
                <p className="text-xs font-semibold text-[#D4AF37] mb-1">
                  Institutional Group & Faculty Arrangement
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Universities, think tanks, and research institutes booking 6 or more paying participants receive one complimentary place for an accompanying faculty lead or principal investigator.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Accommodation
                  </span>
                  <span className="font-medium text-white">{pkg.accommodation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Field Transport
                  </span>
                  <span className="font-medium text-white">{pkg.transport}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectTierForApply ? onSelectTierForApply('academic') : onNavigate('/apply?tier=academic')
                }
                className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Start Individual or Faculty Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Learning Outcomes */}
      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                Research & Learning Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Statutory & Policy Context
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Examine the implementation of the Uganda Mining and Minerals Act 2022, licensing categories, and regional ICGLR certification mechanisms.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Artisanal vs. Industrial Field Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Compare artisanal extraction and local cooperative structures in Mubende with industrial processing and environmental management in Busia.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Refinery & Customs Traceability
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Observe assay laboratories and URA customs documentation to understand how chain-of-custody data is recorded at export points.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Documented Field Reference Materials
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Receive structured statutory compilations, supply-chain flowcharts, and cadastre reference guides for academic citation and compliance reporting.
                  </p>
                </div>
              </div>

              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Programme Details & Inclusions
                </h3>
                <ul className="space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Research Reference Deliverables
                </h3>
                <ul className="space-y-3 mb-6">
                  {pkg.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <FileText className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-900">{del}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadProgramme}
                    className="w-full py-3 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Programme</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact?topic=academic')}
                    className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Enquire About a Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 6.4 INSTITUTIONAL & PRIVATE DELEGATIONS (/expeditions/institutional)
// ============================================================================
export const InstitutionalExpeditionPage: React.FC<SharedExpeditionProps> = ({
  selectedCurrency,
  onNavigate
}) => {
  const pkg = EXPEDITION_PACKAGES.find((p) => p.id === 'sovereign') || EXPEDITION_PACKAGES[2];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions/institutional" onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
                <span>Tier 03 · Bespoke Governance & Diplomatic Protocol</span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
                Institutional & Private Delegations
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure mb-6">
                Confidential field scoping, ministerial and regulatory access, and close-protection logistics for sovereign wealth funds, central bank observers, institutional investment committees, and private family offices.
              </p>

              {/* Primary CTA: Request a Confidential Briefing (No public checkout as main action) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact?topic=institutional')}
                  className="px-7 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center justify-center gap-2.5 transition-colors shadow-lg cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Request a Confidential Briefing</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/expeditions/itinerary')}
                  className="px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Review Standard 7-Day Framework
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7">
              <div className="border-b border-slate-800 pb-4 mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block mb-1">
                  Private Scoping & Benchmark Rate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-bold text-white">
                    {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                  </span>
                  <span className="text-xs text-slate-400">per principal</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Institutional delegations are scoped privately via NDA and custom security protocol prior to formal engagement.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 mb-6">
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Residence
                  </span>
                  <span className="font-medium text-white">{pkg.accommodation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Security & Movement
                  </span>
                  <span className="font-medium text-white">{pkg.transport}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono uppercase text-[10px]">
                    Extended Retainer
                  </span>
                  <span className="font-medium text-[#D4AF37]">
                    Audit of up to 5 active proposals + 12-month verification retainer (12 remote audits)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/contact?topic=institutional')}
                className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Request a Confidential Briefing</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                Institutional Protocol & Private Scoping
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Strict Confidentiality & NDA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Delegation identities, flight manifests, and investment mandates are compartmentalized under bilateral non-disclosure protocols.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Governance & Regulatory Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct closed-door briefings with senior leadership at the Ministry of Energy & Mineral Development, DGSM, and Tier-1 commercial banks.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    B6 Armored & Aviation Logistics
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Entebbe VIP tarmac fast-track, dedicated B6 armored motorcade with close-protection officers, and optional rotary-wing transfers to mining corridors.
                  </p>
                </div>
                <div className="surface-ivory-card rounded-xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Tailored Delegation Formats
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Can be executed as a dedicated private cohort on custom dates or integrated with private bilateral sessions alongside scheduled cohorts.
                  </p>
                </div>
              </div>

              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Institutional Capabilities & Inclusions
                </h3>
                <ul className="space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="surface-ivory-card rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Private Scoping Process
                </h3>
                <ol className="space-y-4 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-[#D4AF37] font-mono font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Confidential Briefing Request</strong>
                      Submit your institutional mandate and preferred dates to our Executive Directorate.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-[#D4AF37] font-mono font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Mutual NDA & Security Scoping</strong>
                      Execute confidentiality terms and align on diplomatic clearance, armored transport, or helicopter logistics.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-[#D4AF37] font-mono font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 block">Bespoke Programme & Retainer Activation</strong>
                      Confirm ministerial schedules, counterparty dossier audits, and institutional settlement.
                    </div>
                  </li>
                </ol>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact?topic=institutional')}
                  className="w-full py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Request a Confidential Briefing</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 6.5 SEVEN-DAY ITINERARY (/expeditions/itinerary)
// ============================================================================
export const ItineraryPage: React.FC<SharedExpeditionProps> = ({
  onNavigate
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [expandedMobileDays, setExpandedMobileDays] = useState<number[]>([1]);

  const toggleMobileDay = (day: number) => {
    setExpandedMobileDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const activeDayObj = ITINERARY_DAYS.find((d) => d.day === selectedDay) || ITINERARY_DAYS[0];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions/itinerary" onNavigate={onNavigate} />

      <section className="py-12 lg:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                Full Seven-Day Schedule
              </p>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                Seven-Day Field Verification Itinerary
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed reading-measure">
                A structured progression from the national mineral registry in Entebbe to artisanal pits, industrial processing plants, accredited refineries, customs clearance, and institutional banking compliance.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/apply')}
                className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <span>Start Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Interactive Vertical Timeline & Detail View */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* DESKTOP VIEW (lg and up): Interactive Vertical Timeline on Left, Expanded Detail on Right */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 relative pl-6 border-l-2 border-slate-800 space-y-3">
              {ITINERARY_DAYS.map((item) => {
                const isSelected = item.day === selectedDay;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelectedDay(item.day)}
                    className={`w-full text-left p-4 rounded-xl border transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-[#D4AF37] shadow-lg'
                        : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                        isSelected
                          ? 'bg-[#D4AF37] border-[#D4AF37]'
                          : 'bg-[#0B0F17] border-slate-600'
                      }`}
                    />
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className={isSelected ? 'text-[#D4AF37] font-bold' : 'text-slate-400'}>
                        DAY 0{item.day} · {item.timeSlot}
                      </span>
                      <span className="text-slate-400 truncate max-w-[170px]">{item.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.focus}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sticky top-24">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-1">
                    Day 0{activeDayObj.day} of 07 · {activeDayObj.timeSlot}
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                    {activeDayObj.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{activeDayObj.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeDayObj.location}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block mb-1">
                    Operational Focus
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {activeDayObj.focus}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                    Risk Addressed
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeDayObj.riskDeconstructed}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeDayObj.description}
              </p>

              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Field Sessions & Inspections
                </h3>
                <ul className="space-y-2.5">
                  {activeDayObj.keyActivities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                    Participant Deliverable
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {activeDayObj.executiveDeliverable}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (below lg): Stacked Expandable Day Cards */}
          <div className="lg:hidden space-y-4">
            {ITINERARY_DAYS.map((item) => {
              const isExpanded = expandedMobileDays.includes(item.day);
              return (
                <div
                  key={item.day}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileDay(item.day)}
                    aria-expanded={isExpanded}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-mono text-[#D4AF37] block">
                        DAY 0{item.day} · {item.location}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.focus}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
                      <p className="text-slate-300 leading-relaxed">{item.description}</p>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="font-mono uppercase text-[10px] text-amber-400 block mb-1">
                          Risk Addressed
                        </span>
                        <p className="text-slate-300">{item.riskDeconstructed}</p>
                      </div>
                      <div>
                        <span className="font-mono uppercase text-[10px] text-slate-400 block mb-2">
                          Key Field Activities
                        </span>
                        <ul className="space-y-1.5">
                          {item.keyActivities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                        <span className="font-mono uppercase text-[10px] text-[#D4AF37] block mb-0.5">
                          Deliverable
                        </span>
                        <p className="font-semibold text-white">{item.executiveDeliverable}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 6.6 DATES, PACKAGES, AND INCLUSIONS (/expeditions/dates)
// ============================================================================
export const DatesPackagesPage: React.FC<SharedExpeditionProps> = ({
  selectedCurrency,
  onNavigate,
  onSelectTierForApply
}) => {
  const [selectedCohort, setSelectedCohort] = useState<string>(UPCOMING_COHORTS[0].dates);

  const handleStartApplication = (tier: 'academic' | 'trader' | 'sovereign') => {
    if (onSelectTierForApply) {
      onSelectTierForApply(tier, selectedCohort);
    } else {
      onNavigate(`/apply?tier=${tier}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <ExpeditionsSubnav activePath="/expeditions/dates" onNavigate={onNavigate} />

      <section className="py-12 lg:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              2027 Cohort Calendar & Package Matrix
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Dates, Packages, and Inclusions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed reading-measure">
              Select a scheduled 7-day cohort below and compare inclusions across our three participant tiers. All packages include statutory KYC/PEP screening and field permits.
            </p>
          </div>

          {/* Cohort Schedule Selector */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {UPCOMING_COHORTS.map((c) => {
              const active = selectedCohort === c.dates;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCohort(c.dates)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    active
                      ? 'bg-slate-900 border-[#D4AF37] shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>7-Day Cohort</span>
                    </div>
                    <p className="text-sm font-bold text-white">{c.dates}</p>
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded ${
                      c.status.includes('Remaining')
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {c.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Package Comparison Section (Ivory Surface for High-Contrast Readability) */}
      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Comparison Table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-stone-300 bg-white shadow-sm mb-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100/80">
                  <th className="p-6 w-1/4 text-xs font-mono uppercase tracking-wider text-slate-500">
                    Programme Dimension
                  </th>
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`p-6 w-1/4 border-l border-stone-200 ${
                        pkg.highlighted ? 'bg-[#9A7418]/5' : ''
                      }`}
                    >
                      <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418] block mb-1">
                        {pkg.tierNumber}
                      </span>
                      <div className="font-serif-display text-lg font-bold text-slate-900 mb-1">
                        {pkg.name}
                      </div>
                      <div className="text-2xl font-mono font-bold text-slate-900">
                        {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                        <span className="text-xs font-sans font-normal text-slate-500"> / person</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs text-slate-700">
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">Ideal Audience</td>
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="p-5 border-l border-stone-200 leading-relaxed">
                      {pkg.idealFor}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">Accommodation</td>
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="p-5 border-l border-stone-200 leading-relaxed">
                      {pkg.accommodation}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">
                    Ground Transport & Security
                  </td>
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="p-5 border-l border-stone-200 leading-relaxed">
                      {pkg.transport}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">
                    Active Offer Audits Included
                  </td>
                  <td className="p-5 border-l border-stone-200">
                    Optional add-on ({formatCurrencyPrice(2500, selectedCurrency)} standalone verification)
                  </td>
                  <td className="p-5 border-l border-stone-200 font-semibold text-slate-900">
                    Up to 2 active gold offers audited 1-on-1
                  </td>
                  <td className="p-5 border-l border-stone-200 font-semibold text-slate-900">
                    Up to 5 active offers + 12-month verification retainer (12 remote audits)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">
                    Core Inclusions
                  </td>
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="p-5 border-l border-stone-200 align-top">
                      <ul className="space-y-2">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7418] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-900 bg-stone-50/60">
                    Next Step ({selectedCohort.split(':')[0]})
                  </td>
                  <td className="p-5 border-l border-stone-200">
                    <button
                      type="button"
                      onClick={() => handleStartApplication('academic')}
                      className="w-full py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Start Application
                    </button>
                  </td>
                  <td className="p-5 border-l border-stone-200 bg-[#9A7418]/5">
                    <button
                      type="button"
                      onClick={() => handleStartApplication('trader')}
                      className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Start Application
                    </button>
                  </td>
                  <td className="p-5 border-l border-stone-200">
                    <button
                      type="button"
                      onClick={() => onNavigate('/contact?topic=institutional')}
                      className="w-full py-3 px-4 rounded-lg bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Check Availability
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Package Cards */}
          <div className="lg:hidden space-y-6">
            {EXPEDITION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`surface-ivory-card rounded-2xl p-6 shadow-sm ${
                  pkg.highlighted ? 'ring-2 ring-[#9A7418]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#9A7418]">
                    {pkg.tierNumber}
                  </span>
                  <span className="text-xl font-mono font-bold text-slate-900">
                    {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-600 mb-4">{pkg.idealFor}</p>
                <div className="space-y-2 text-xs text-slate-700 border-t border-stone-200 pt-3 mb-4">
                  <p>
                    <strong className="text-slate-900">Accommodation:</strong> {pkg.accommodation}
                  </p>
                  <p>
                    <strong className="text-slate-900">Transport:</strong> {pkg.transport}
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7418] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {pkg.id === 'sovereign' ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact?topic=institutional')}
                    className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Check Availability
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartApplication(pkg.id)}
                    className="w-full py-3 rounded-lg bg-[#D4AF37] text-slate-950 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Start Application
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Conditions & Verification Credit Note */}
          <div className="surface-ivory-card rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                 conditions, Vetting & Verification Credit Policy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                All packages are settled as a single full programme fee following application review and Non-Transaction Agreement signature. Clients who complete a 24–72-Hour Offer Verification ({formatCurrencyPrice(2500, selectedCurrency)}) receive a USD 1,000 credit toward any expedition booked within 90 days.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/verification')}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-slate-900 border border-stone-300 text-xs font-semibold whitespace-nowrap cursor-pointer"
            >
              Verify an Offer First
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
