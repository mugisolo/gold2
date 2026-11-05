import React, { useState, Suspense } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Compass,
  FileSearch,
  Pickaxe,
  Factory,
  Flame,
  ShieldAlert,
  PlaneTakeoff,
  CheckCircle2,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Lock,
  Scale
} from 'lucide-react';
import { Currency, Language } from '../types';
import {
  SCAM_RULES,
  MARKET_REALITIES,
  LEGAL_CHARTER_PILLARS,
  formatCurrencyPrice
} from '../data/expeditionData';
import { getLocalizedSupplyChainSteps } from '../data/translations';

const LazyUgandaSupplyChainMap = React.lazy(() =>
  import('./UgandaSupplyChainMap').then((mod) => ({ default: mod.UgandaSupplyChainMap }))
);

interface SharedRiskProps {
  currentLang: Language;
  selectedCurrency: Currency;
  onNavigate: (path: string) => void;
}

const IndependenceBanner: React.FC = () => (
  <div className="bg-[#080B11] border-b border-slate-800/80 py-2.5 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
      <p className="font-medium text-slate-200 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
        Independent due diligence and field verification. We do not buy, sell, or broker gold.
      </p>
      <span className="text-[11px] font-mono text-slate-400">
        Regulatory & Supply-Chain Reference Hub
      </span>
    </div>
  </div>
);

const RiskSubnav: React.FC<{
  activePath: string;
  onNavigate: (path: string) => void;
}> = ({ activePath, onNavigate }) => {
  const items = [
    { label: 'Risk & Compliance Hub', path: '/risk-compliance' },
    { label: 'Supply-Chain Stages & Map', path: '/risk-compliance/supply-chain' },
    { label: 'Scam-Risk Assessment Tool', path: '/risk-compliance/scam-check' }
  ];

  return (
    <div className="bg-[#0B0F17]/90 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
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
// 8.1 RISK & COMPLIANCE OVERVIEW (/risk-compliance)
// ============================================================================
export const RiskComplianceHubPage: React.FC<SharedRiskProps> = ({
  selectedCurrency,
  onNavigate
}) => {
  const [openTopic, setOpenTopic] = useState<string | null>('counterparty-identity');

  const topics = [
    {
      id: 'counterparty-identity',
      title: '1. Counterparty identity',
      summary:
        'Verify the legal existence, corporate registration, tax identification, and beneficial ownership of the offering entity before reviewing commercial terms or visiting vaults.',
      statutoryReference:
        'Uganda Companies Act, 2012 (administered by the Uganda Registration Services Bureau — URSB); Uganda Revenue Authority (URA) Tax Identification Number (TIN) Registry; Anti-Money Laundering Act, 2013 (as amended, enforced by the Financial Intelligence Authority — FIA).',
      methodologyNote:
        'Internal methodology: Our due-diligence desk cross-checks corporate incorporation numbers, registered directors, and signatory authority against URSB filings and URA TIN records prior to commercial engagement.'
    },
    {
      id: 'licence-verification',
      title: '2. Licence verification',
      summary:
        'Confirm that the seller or supplier holds an active, category-appropriate mineral right or dealing licence issued by the Directorate of Geological Survey and Mines (DGSM) in Entebbe.',
      statutoryReference:
        'The Mining and Minerals Act, 2022 (Republic of Uganda Gazette, enacted October 2022) — governing Exploration Licences (EL), Location Licences, Mining Leases (ML), Mineral Dealer Licences (MDL), and Refining Licences.',
      methodologyNote:
        'Internal methodology: Because static PDF certificates can be altered or reference expired non-precious quarry permits, we verify licence serial numbers, holder identity, coordinates, and validity dates directly against the DGSM Mineral Cadastre in Entebbe.'
    },
    {
      id: 'chain-of-custody',
      title: '3. Chain of custody',
      summary:
        'Trace physical mineral lots from licensed pithead extraction or documented regional import through aggregation, transport, and refinery intake logs.',
      statutoryReference:
        'International Conference on the Great Lakes Region (ICGLR) Regional Certification Mechanism (RCM) Manual (2nd Edition); Uganda Mining and Minerals Act, 2022 mineral movement and traceability provisions.',
      methodologyNote:
        'Internal methodology: We audit mine-site production logs, mineral movement permits, and refinery lot-intake books to verify whether claimed volumes align with physical mine and processing capacity.'
    },
    {
      id: 'assay-and-sampling',
      title: '4. Assay and sampling',
      summary:
        'Distinguish rapid non-destructive surface screening from definitive metallurgical assay. Handheld XRF only measures 10 to 50 micrometers into the surface skin and cannot detect internal tungsten or base-metal cores.',
      statutoryReference:
        'ISO 11426:2021 (Determination of gold — Cupellation method / fire assay); ASTM E1316 (Ultrasonic Pulse-Echo Testing); LBMA Good Delivery Technical Specifications for Homogeneous Melting and Vacuum Pin-Tube / Drill Sampling.',
      methodologyNote:
        'Internal methodology: Before settlement, our protocol requires multi-axis ultrasonic velocity screening followed by full induction melting of the doré lot, representative dual sampling, and 1,050°C fire assay cupellation at an accredited laboratory.'
    },
    {
      id: 'sanctions-and-pep-screening',
      title: '5. Sanctions and PEP screening',
      summary:
        'Screen all named counterparties, beneficial owners, intermediaries, and logistics agents against international sanctions lists and Politically Exposed Person (PEP) databases.',
      statutoryReference:
        'United Nations Security Council Consolidated List; US Treasury OFAC Sanctions Lists; UK HM Treasury (OFSI) Consolidated List; European Union Financial Sanctions; Uganda FIA AML/CFT Guidelines.',
      methodologyNote:
        'Internal methodology: Every verification dossier and expedition registration includes automated and analyst-reviewed screening across OFAC, UN, UK HMT, EU sanctions, and PEP registries.'
    },
    {
      id: 'customs-and-export-evidence',
      title: '6. Customs and export evidence',
      summary:
        'Validate export declarations, airway bills, customs seals, and statutory tax assessments through official Uganda Revenue Authority (URA) channels rather than third-party escrow accounts.',
      statutoryReference:
        'East African Community Customs Management Act, 2004; Uganda Revenue Authority (URA) ASYCUDA World Export Procedures & Official Payment Registration Number (PRN) Rules.',
      methodologyNote:
        'Internal methodology: We verify that export levies and customs duties are assessed through verifiable URA ASYCUDA declarations and paid via official government PRNs—never through private law firm or broker accounts.'
    },
    {
      id: 'responsible-sourcing',
      title: '7. Responsible sourcing',
      summary:
        'Evaluate conflict-free origin, environmental and mercury-management practices, occupational safety, and community governance across artisanal and industrial supply chains.',
      statutoryReference:
        'OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas (3rd Edition, Annex II & Supplement on Gold); Minamata Convention on Mercury National Action Plan frameworks.',
      methodologyNote:
        'Internal methodology: During field expeditions and site audits in Mubende, Kassanda, and Busia, our team documents observable site conditions, cooperative governance, and OECD five-step alignment.'
    }
  ];

  const glossaryItems = [
    {
      term: 'DGSM',
      full: 'Directorate of Geological Survey and Mines',
      definition:
        'The agency under Uganda’s Ministry of Energy and Mineral Development (headquartered in Entebbe) responsible for the national mining cadastre, exploration licenses (EL), mining leases (ML), and mineral dealer licenses (MDL).'
    },
    {
      term: 'URA',
      full: 'Uganda Revenue Authority',
      definition:
        'The national tax and customs administration responsible for assessing export levies and issuing official Payment Registration Numbers (PRNs) and customs clearance seals.'
    },
    {
      term: 'ICGLR',
      full: 'International Conference on the Great Lakes Region',
      definition:
        'The intergovernmental body operating the Regional Certification Mechanism (RCM) to track mineral origin and prevent conflict financing across East and Central Africa.'
    },
    {
      term: 'ASYCUDA',
      full: 'Automated System for Customs Data (ASYCUDA World)',
      definition:
        'The electronic customs management system used by URA to process export declarations, verify documentation, and track cross-border trade.'
    },
    {
      term: 'AML',
      full: 'Anti-Money Laundering',
      definition:
        'Statutory controls enforced by commercial banks and Uganda’s Financial Intelligence Authority (FIA) to verify source of funds and prevent illicit financial flows.'
    },
    {
      term: 'KYC',
      full: 'Know Your Customer / Counterparty',
      definition:
        'Identity, corporate registration, and beneficial ownership verification required before entering into commercial contracts or field programmes.'
    },
    {
      term: 'PEP',
      full: 'Politically Exposed Person',
      definition:
        'An individual holding a prominent public or state function whose involvement in a transaction requires enhanced compliance scrutiny and anti-bribery review.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <RiskSubnav activePath="/risk-compliance" onNavigate={onNavigate} />

      {/* Header */}
      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
              Risk &amp; Compliance Review Framework · Uganda
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5">
              Evidence-led gold risk and compliance review
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure mb-8">
              Understand licensing, sanctions screening, chain of custody, assay validation and responsible-sourcing controls for East African gold supply chains.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/offer-verification')}
                className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <span>Verify an Active Offer (24–72h)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/risk-compliance/supply-chain')}
                className="px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                Explore Supply-Chain Stages &amp; Map
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/risk-compliance/scam-check')}
                className="px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                Use Scam-Risk Assessment Tool
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Educational Topics (7 Progressive Sections + Statutory vs Internal Methodology + Limitations) */}
      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#9A7418] block mb-1">
                  Progressive Compliance Architecture
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Seven controls for gold supply-chain and counterparty due diligence
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Each section separates statutory legal requirements from our internal verification methodology. Expand any control below to inspect cited regulations and field procedures.
                </p>
              </div>

              {topics.map((topic) => {
                const isOpen = openTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="surface-ivory-card rounded-xl overflow-hidden transition-all"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif-display text-lg font-bold text-slate-900">
                          {topic.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                          aria-expanded={isOpen}
                          className="text-xs font-mono uppercase tracking-wider text-[#9A7418] hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <span>{isOpen ? 'Hide References' : 'Statutory Detail'}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed mt-2.5 reading-measure">
                        {topic.summary}
                      </p>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-stone-200 space-y-2.5 text-xs text-slate-600 bg-stone-50/80 p-4 rounded-lg">
                          <div>
                            <strong className="font-mono uppercase text-[10px] tracking-wider text-slate-900 block">
                              Statutory & Regulatory Framework
                            </strong>
                            <p className="mt-0.5 leading-relaxed">{topic.statutoryReference}</p>
                          </div>
                          <div>
                            <strong className="font-mono uppercase text-[10px] tracking-wider text-slate-900 block">
                              Verification Methodology
                            </strong>
                            <p className="mt-0.5 leading-relaxed">{topic.methodologyNote}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Reviewer, Last-Reviewed Date & Limitations Notice */}
              <div className="surface-ivory-card rounded-xl p-5 sm:p-6 border border-amber-700/30 bg-amber-50/40 mt-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-700 border-b border-stone-200 pb-3">
                  <span>
                    Reviewed by: <strong>Adv. David Kigozi</strong> (Legal Compliance Counsel) &amp; <strong>Dr. Michael Ssemwogerere</strong> (Metallurgical Forensic Lead)
                  </span>
                  <span className="text-[#9A7418] font-bold">Last reviewed: May 2026</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Methodological Limitation Statement:</strong> Document review and registry verification identify counterparty and licensing irregularities, but document review alone does not prove physical gold ownership, purity, origin, or immediate availability. Confirming bullion fineness and weight requires physical custody, full homogeneous melting, and laboratory fire assay cupellation.
                </p>
              </div>
            </div>

            {/* Glossary Sidebar */}
            <div className="lg:col-span-5">
              <div className="surface-ivory-card rounded-2xl p-6 sm:p-7 sticky top-24">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A7418] mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Regulatory &amp; Technical Glossary</span>
                </div>
                <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-4">
                  Key Terms &amp; Institutions
                </h3>
                <dl className="space-y-4 divide-y divide-stone-200">
                  {glossaryItems.map((item) => (
                    <div key={item.term} className="pt-3.5 first:pt-0">
                      <dt className="text-xs font-bold text-slate-900 flex items-baseline gap-2">
                        <span className="font-mono px-2 py-0.5 rounded bg-slate-900 text-[#D4AF37]">
                          {item.term}
                        </span>
                        <span>{item.full}</span>
                      </dt>
                      <dd className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {item.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Routing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block mb-2">
                  Interactive Chain of Custody
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white mb-3">
                  Supply-Chain Stages & Geographic Map
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Inspect the five stages of Uganda’s gold supply chain—from artisanal and industrial extraction to smelting, assay, and Entebbe airport export—and launch the interactive corridor map.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/risk-compliance/supply-chain')}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Open Supply-Chain Stages & Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block mb-2">
                  Self-Guided Screening
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white mb-3">
                  Scam-Risk Assessment Tool
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Evaluate an offer you have received against common commercial, customs, banking, and assay warning signs, and review recommended due-diligence next steps.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/risk-compliance/scam-check')}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Scam-Risk Assessment</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 8.2 SUPPLY CHAIN AND MAP (/risk-compliance/supply-chain)
// ============================================================================
export const SupplyChainPage: React.FC<SharedRiskProps> = ({
  currentLang,
  onNavigate
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showInteractiveMap, setShowInteractiveMap] = useState<boolean>(false);

  const stepIcons = [Pickaxe, Factory, Flame, ShieldAlert, PlaneTakeoff];
  const localizedSteps = getLocalizedSupplyChainSteps(currentLang);
  const currentStep = localizedSteps[activeStep] || localizedSteps[0];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <RiskSubnav activePath="/risk-compliance/supply-chain" onNavigate={onNavigate} />

      <section className="py-12 lg:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                Five-Stage Chain of Custody
              </p>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                Supply-Chain Stages & Geographic Corridors
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed reading-measure">
                Select any of the five custody stages below to examine legitimate counterparties, common intermediary risks, and required verification checks.
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/verification')}
                className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-sm inline-flex items-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <span>Verify an Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Five-Stage Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
            {localizedSteps.map((step, idx) => {
              const Icon = stepIcons[idx] || Pickaxe;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-[#D4AF37] shadow-lg'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-[#D4AF37]' : 'text-slate-400'
                      }`}
                    >
                      STAGE {step.stageNumber}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                  </div>
                  <h2 className="text-sm font-bold text-white mb-1">{step.name}</h2>
                  <p className="text-xs text-slate-400 line-clamp-1">{step.location}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Card */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block mb-1">
                  Stage {currentStep.stageNumber} of 05 · {currentStep.location}
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white mb-4">
                  {currentStep.name}
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Regulated Entity / Counterparty
                  </span>
                  <p className="text-xs font-semibold text-white leading-relaxed">
                    {currentStep.realEntity}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Common Risk at This Stage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentStep.fraudRisk}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verification Protocol</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentStep.dueDiligenceAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Progressive Disclosure Toggle for Interactive Geographic Map */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Interactive Geographic Corridor & Transit Map
                </h4>
                <p className="text-xs text-slate-400">
                  Inspect extraction districts (Mubende, Busia, Karamoja), Kampala smelting hubs, and Entebbe export controls synced with each stage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInteractiveMap((prev) => !prev)}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>
                  {showInteractiveMap ? 'Hide Interactive Map' : 'Load Interactive Supply-Chain Map'}
                </span>
              </button>
            </div>
          </div>

          {/* Lazy-Loaded Interactive Map */}
          {showInteractiveMap && (
            <Suspense
              fallback={
                <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-sm text-slate-400">
                  Loading interactive supply-chain map...
                </div>
              }
            >
              <LazyUgandaSupplyChainMap
                currentLang={currentLang}
                activeStageIndex={activeStep}
                onSelectStage={(idx) => setActiveStep(idx)}
              />
            </Suspense>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// 8.3 SCAM-RISK ASSESSMENT TOOL (/risk-compliance/scam-check)
// ============================================================================
export const ScamCheckPage: React.FC<SharedRiskProps> = ({
  selectedCurrency,
  onNavigate
}) => {
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);

  const toggleRule = (id: string) => {
    setSelectedRuleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedRules = SCAM_RULES.filter((r) => selectedRuleIds.includes(r.id));
  const rawScore = selectedRules.reduce((acc, r) => acc + r.riskScore, 0);
  const riskScore = Math.min(100, rawScore);

  const getAssessmentSummary = () => {
    if (selectedRuleIds.length === 0) {
      return {
        level: 'No Warning Signs Selected',
        badgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
        summary:
          'Select any terms or conditions present in the offer you are evaluating to see the specific commercial or regulatory risks they introduce.',
        nextSteps: [
          'Request the seller’s DGSM Mineral Dealer License (MDL) number and corporate registration details.',
          'Confirm that any physical inspection or assay will take place at an accredited bonded refinery before funds are transferred.',
          'Consider independent 24–72-hour document verification before signing contracts or booking travel.'
        ]
      };
    }
    if (riskScore >= 50) {
      return {
        level: 'High Concentration of Warning Signs',
        badgeClass: 'bg-red-500/15 text-red-300 border-red-500/40',
        summary:
          'The selected terms strongly align with advance-fee or counterfeit documentation patterns frequently observed in unverified East African gold offers.',
        nextSteps: [
          'Do not wire advance taxes, customs bonds, logistics fees, or deposits to private law-firm or third-party accounts.',
          'Do not rely on WhatsApp PDF certificates or handheld surface XRF readings as proof of authenticity.',
          'If you wish to verify whether the named license or company exists in official registries, submit the documents for a 24–72-hour registry check before taking any further step.'
        ]
      };
    }
    return {
      level: 'Elevated Risk Indicators Identified',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
      summary:
        'One or more terms in this proposal deviate from standard institutional bullion settlement and customs procedures in Uganda.',
      nextSteps: [
        'Require independent verification of the seller’s DGSM license and URA tax compliance.',
        'Insist on homogeneous induction melting and fire assay at an accredited refinery prior to settlement.',
        'Use our 24–72-hour verification service if you need an independent written review of the paperwork.'
      ]
    };
  };

  const assessment = getAssessmentSummary();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />
      <RiskSubnav activePath="/risk-compliance/scam-check" onNavigate={onNavigate} />

      <section className="py-12 lg:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              Preliminary Offer Screening Tool
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Scam-Risk Assessment Tool
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed reading-measure">
              Check the commercial, customs, banking, and assay terms present in a gold offer you have received to identify specific structural warning signs and practical next steps.
            </p>
          </div>

          {/* Scope Disclosure: What This Assessment Does and Does Not Establish */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                What this tool establishes
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                This preliminary checklist highlights commercial terms (such as steep spot discounts, upfront tax demands, or private escrow accounts) that contradict standard statutory and market practices in Uganda.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                What this tool does not establish
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                An automated checklist is not a legal verdict or a substitute for primary registry inspection. Passing this checklist does not confirm that a license, permit, or gold parcel is genuine without direct DGSM and URA verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Checklist Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900">
                  Select any terms present in your offer
                </h2>
                {selectedRuleIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedRuleIds([])}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Selection</span>
                  </button>
                )}
              </div>

              {SCAM_RULES.map((rule) => {
                const checked = selectedRuleIds.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleRule(rule.id)}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleRule(rule.id);
                      }
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer ${
                      checked
                        ? 'bg-amber-50/90 border-[#9A7418] shadow-sm'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#9A7418] rounded cursor-pointer"
                        aria-label={rule.label}
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-sm font-bold text-slate-900">{rule.label}</h3>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-slate-600 border border-stone-200">
                            {rule.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>
                        {checked && (
                          <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs text-slate-800 leading-relaxed">
                            <strong className="font-mono uppercase text-[10px] text-[#9A7418] block mb-0.5">
                              Why this is a warning sign:
                            </strong>
                            {rule.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Assessment Output & Practical Next Steps */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B0F17] text-slate-200 border border-slate-800 p-6 sm:p-7 sticky top-24 shadow-xl">
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      Preliminary Indicator Summary
                    </span>
                    <span className="text-sm font-bold text-white">
                      {selectedRuleIds.length} of {SCAM_RULES.length} warning signs selected
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono px-2.5 py-1 rounded border ${assessment.badgeClass}`}
                  >
                    {assessment.level}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {assessment.summary}
                </p>

                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-3">
                    Recommended Practical Next Steps
                  </h3>
                  <ul className="space-y-2.5">
                    {assessment.nextSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-5">
                  <h4 className="text-xs font-bold text-white mb-1">
                    Optional Next Action: 24–72-Hour Document Verification
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    If you hold a written FCO, SPA, mineral license, or export permit and want our field officers to check the serial numbers against official DGSM and URA records ({formatCurrencyPrice(2500, selectedCurrency)}), you can submit the documents online.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/offer-verification')}
                  className="w-full py-3.5 px-5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Proceed to 24–72-Hour Offer Verification</span>
                  <ArrowRight className="w-4 h-4" />
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
// CONTACT & EXECUTIVE BRIEFING REQUESTS (/contact)
// ============================================================================
export const ContactBriefingPage: React.FC<SharedRiskProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<
    'institutional_briefing' | 'offer_verification' | 'expedition_cohort' | 'academic_group'
  >('institutional_briefing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please provide your full name, corporate email address, and enquiry summary.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />

      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
              Kampala &amp; Entebbe Directorate
            </p>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Discuss your verification or field brief
            </h1>
            <p className="text-base text-slate-300 leading-relaxed reading-measure">
              Contact Uganda Gold Expedition about offer verification, field expeditions, research visits or institutional due-diligence briefings.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="surface-ivory-card rounded-2xl p-6 sm:p-8 shadow-sm">
                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="font-serif-display text-2xl font-bold text-slate-900">
                      Enquiry &amp; Briefing Request Received
                    </h2>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{fullName}</strong>. Your request has been logged with our Kampala Secretariat. A directorate officer will respond to <strong>{email}</strong> within one business day.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-slate-900 text-xs font-semibold cursor-pointer"
                      >
                        Send Another Message
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('/offer-verification')}
                        className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                      >
                        Go to Offer Verification
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h2 className="font-serif-display text-2xl font-bold text-slate-900">
                      Submit a Confidential Enquiry
                    </h2>
                    {errorMsg && (
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g., Jonathan Vance"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-org"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Organization / Institution
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Company, Fund, or University"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Corporate or Institutional Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@organization.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-slate-800 mb-1.5"
                        >
                          Direct Telephone Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 20 7946 0000"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Subject / Mandate *
                      </label>
                      <select
                        id="contact-topic"
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                      >
                        <option value="institutional_briefing">
                          Institutional & Private Delegation Briefing (Tier 03)
                        </option>
                        <option value="offer_verification">
                          24–72-Hour Offer Verification Enquiry
                        </option>
                        <option value="expedition_cohort">
                          Professional Trader Expedition Cohort Enquiry (Tier 02)
                        </option>
                        <option value="academic_group">
                          Academic & Research Group / Faculty Enquiry (Tier 01)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Briefing Scope or Question *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide relevant context (e.g., preferred travel dates, delegation size, or document types you wish to verify)..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm focus:outline-none focus:border-[#9A7418]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Submit Request</span>
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="surface-ivory-card rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-4">
                  Secretariat & Operations Desk
                </h3>
                <div className="space-y-3.5 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Official Address &amp; Tax Registration</strong>
                      Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda
                      <span className="block text-[11px] font-mono text-[#9A7418] font-bold mt-0.5">
                        URA TIN 1019482710 · Kampala &amp; Entebbe Liaison Desk
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Compliance & Verification Desk</strong>
                      compliance@ugandagoldexpedition.com
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Confidentiality Standard</strong>
                      All institutional inquiries and uploaded documents are handled under strict client confidentiality and our Non-Transaction Charter.
                    </div>
                  </div>
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
// LEGAL CHARTER, PRIVACY & TERMS (/charter, /privacy, /terms)
// ============================================================================
export const LegalGovernancePage: React.FC<{
  activeTab: 'charter' | 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}> = ({ activeTab, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <IndependenceBanner />

      <div className="bg-[#0B0F17]/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-3">
          <button
            type="button"
            onClick={() => onNavigate('/charter')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              activeTab === 'charter'
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Legal & Non-Transaction Charter
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/privacy')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Privacy & Document Confidentiality
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Terms of Engagement & Vetting
          </button>
        </div>
      </div>

      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'charter' && (
            <div className="space-y-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                  Governance & Independence
                </p>
                <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  Non-Transaction Legal Charter
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Uganda Gold Expedition operates strictly as an independent due-diligence, field-verification, and educational organization. We never act as a buyer, seller, broker, or commission agent in any mineral transaction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {LEGAL_CHARTER_PILLARS.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800"
                  >
                    <span className="text-xs font-mono text-[#D4AF37] block mb-1">
                      ARTICLE {pillar.number} · {pillar.subtitle}
                    </span>
                    <h2 className="font-serif-display text-lg font-bold text-white mb-2">
                      {pillar.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Data Protection & Confidentiality
              </p>
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Privacy & Document Handling Policy
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Documents submitted for 24–72-Hour Offer Verification (such as FCOs, SPAs, DGSM licenses, and URA permits) and personal identification submitted for expedition KYC vetting are compartmentalized and accessible only to assigned compliance officers.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li>
                  • <strong>No Commercial Disclosure:</strong> Client identities, counterparty documents, and verification outcomes are never shared with competing traders, brokers, or third parties.
                </li>
                <li>
                  • <strong>Per-User Access Control:</strong> Client portal records are scoped to authenticated client credentials and protected by role-based security rules.
                </li>
                <li>
                  • <strong>Statutory Retention:</strong> Verification dossiers and digital signatures are retained solely for audit trail integrity and client access.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Service Scope & Conditions
              </p>
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Terms of Engagement, Vetting & Fee Credit Policy
              </h1>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <li>
                  • <strong>24–72-Hour Offer Verification (USD 2,500, VAT incl.):</strong> Covers registry cross-checking of submitted license numbers, customs references, and contract red flags. The 24–72-hour review clock begins once readable documents and fee settlement are confirmed.
                </li>
                <li>
                  • <strong>USD 1,000 Expedition Credit:</strong> Clients who complete a paid 24–72-hour verification may apply USD 1,000 of their verification fee toward any 7-day expedition package booked within 90 days.
                </li>
                <li>
                  • <strong>Expedition Vetting & Full Settlement:</strong> Participation in any 7-day field expedition requires completion of OFAC/UN/EU/UK sanctions and PEP screening, execution of the Non-Transaction Agreement, and single full package settlement prior to cohort mobilization.
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
