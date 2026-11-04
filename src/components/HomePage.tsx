import React, { useState } from 'react';
import {
  ArrowRight,
  FileSearch,
  Compass,
  Building2,
  CheckCircle2,
  Shield,
  FileText,
  Upload,
  SearchCheck,
  Calendar,
} from 'lucide-react';
import { Language, Currency, BoardMember, PhotoItem } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';

interface HomePageProps {
  currentLang: Language;
  selectedCurrency: Currency;
  boardMembers: BoardMember[];
  photos: PhotoItem[];
  showHeroBanner?: boolean;
  showGoldTicker?: boolean;
  onNavigate: (path: string) => void;
}

interface DayPreviewItem {
  day: number;
  shortTheme: string;
  location: string;
  conciseSummary: string;
  participantOutcome: string;
}

const SEVEN_DAY_PREVIEW: DayPreviewItem[] = [
  {
    day: 1,
    shortTheme: 'Mineral Cadastre & Licensing',
    location: 'Entebbe & Kampala',
    conciseSummary:
      'Review how exploration, mining, and mineral dealer licenses are recorded and verified in the official DGSM national cadastre.',
    participantOutcome:
      'Gain the ability to independently check whether a concession or dealer license is active, expired, or misattributed.',
  },
  {
    day: 2,
    shortTheme: 'Document & Assay Verification Lab',
    location: 'Entebbe Facility',
    conciseSummary:
      'Examine common documentary discrepancies and compare surface XRF readings against ultrasonic and fire-assay testing methods.',
    participantOutcome:
      'Understand the technical limits of non-destructive testing and recognize red flags in commercial gold offers.',
  },
  {
    day: 3,
    shortTheme: 'Artisanal Extraction & Field Economics',
    location: 'Mubende – Kassanda Corridor',
    conciseSummary:
      'Observe licensed artisanal extraction, local aggregation, and real pithead pricing structures on the ground.',
    participantOutcome:
      'Understand why deep discounts below international spot prices do not align with local market economics.',
  },
  {
    day: 4,
    shortTheme: 'Industrial Mining & Processing',
    location: 'Busia Gold Belt',
    conciseSummary:
      'Visit industrial-scale extraction and leaching circuits to see how formal mine output and chain-of-custody logs are maintained.',
    participantOutcome:
      'Distinguish genuine industrial production capacity from unverifiable third-party brokerage claims.',
  },
  {
    day: 5,
    shortTheme: 'Refinery Fire Assay & Customs Procedure',
    location: 'Kampala & Entebbe',
    conciseSummary:
      'Observe induction melting, fire assay cupellation, and official Uganda Revenue Authority (URA) export documentation workflows.',
    participantOutcome:
      'Learn how lawful export levies and ICGLR regional certificates are assessed and cleared through official channels.',
  },
  {
    day: 6,
    shortTheme: 'Banking, Legal & Logistics Roundtable',
    location: 'Kampala',
    conciseSummary:
      'Meet with commercial banking compliance specialists, mining counsel, and insured logistics providers on transaction structure.',
    participantOutcome:
      'Establish practical frameworks for compliant payment routing, contract structure, and secure airfreight custody.',
  },
  {
    day: 7,
    shortTheme: 'Counterparty Review & Debrief',
    location: 'Entebbe / Lake Victoria',
    conciseSummary:
      'Conduct a private review of your specific questions or active documentation and consolidate your due-diligence checklist.',
    participantOutcome:
      'Leave with a structured decision framework and documented verification protocol tailored to your organization.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  selectedCurrency,
  boardMembers,
  photos,
  showHeroBanner = true,
  onNavigate,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const activePreview =
    SEVEN_DAY_PREVIEW.find((d) => d.day === selectedDay) || SEVEN_DAY_PREVIEW[0];
  const verificationPrice = formatCurrencyPrice(2500, selectedCurrency);

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div>
      {/* SECTION 1 — INDEPENDENCE STATEMENT */}
      {showHeroBanner && (
        <div className="bg-[#111722] border-b border-slate-800/90 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-slate-200 font-medium">
            <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Independent due diligence and field verification. We do not buy, sell, or broker gold.
            </span>
          </div>
        </div>
      )}

      {/* SECTION 2 — FOCUSED HERO */}
      <section className="relative min-h-[68vh] flex items-center py-16 sm:py-24 overflow-hidden bg-[#0B0F17] border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg"
            alt="Metallurgical inspection and document verification in Uganda"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-[#0B0F17]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            <h1
              className="font-cinzel text-3xl sm:text-5xl lg:text-[3.35rem] font-bold text-white leading-[1.15] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Verify the offer. Understand the supply chain.{' '}
              <span className="gold-gradient-text">Before you commit capital.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure">
              Independent document verification for active gold offers, and structured field
              expeditions across Uganda’s gold supply chain.
            </p>

            {/* Strictly Two Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="/verification"
                onClick={(e) => handleLink(e, '/verification')}
                className="px-6 py-3.5 rounded-lg font-bold text-sm text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/15 whitespace-nowrap"
              >
                <span>Verify a Gold Offer</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/expeditions"
                onClick={(e) => handleLink(e, '/expeditions')}
                className="px-6 py-3.5 rounded-lg font-semibold text-sm text-white bg-[#131A26] hover:bg-[#1B2434] border border-slate-700 hover:border-[#D4AF37]/60 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Explore the 7-Day Expedition</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — “WHAT BRINGS YOU HERE?” (Warm Ivory Neutral Surface) */}
      <section className="surface-ivory py-16 sm:py-20 border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9A751F] mb-2">
              Select Your Starting Point
            </p>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What brings you here?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 reading-measure">
              Choose the pathway that matches your current stage of evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Pathway Card 1 */}
            <a
              href="/verification"
              onClick={(e) => handleLink(e, '/verification')}
              className="group surface-ivory-card border rounded-xl p-7 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all text-left"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-[#0B0F17] text-[#D4AF37] flex items-center justify-center">
                  <FileSearch className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 group-hover:text-[#9A751F] transition-colors">
                  I have received an offer
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Verify documents, licensing, and counterparty claims before committing funds.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#9A751F]">
                <span>24–72-Hour Offer Verification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            {/* Pathway Card 2 */}
            <a
              href="/expeditions"
              onClick={(e) => handleLink(e, '/expeditions')}
              className="group surface-ivory-card border rounded-xl p-7 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all text-left"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-[#0B0F17] text-[#D4AF37] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 group-hover:text-[#9A751F] transition-colors">
                  I want to conduct field due diligence
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explore a structured, in-person supply-chain expedition.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#9A751F]">
                <span>Explore 7-Day Expeditions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            {/* Pathway Card 3 */}
            <a
              href="/expeditions/institutional"
              onClick={(e) => handleLink(e, '/expeditions/institutional')}
              className="group surface-ivory-card border rounded-xl p-7 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all text-left"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-[#0B0F17] text-[#D4AF37] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-slate-900 group-hover:text-[#9A751F] transition-colors">
                  I represent an institution or research group
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Arrange a tailored delegation, research programme, or confidential briefing.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#9A751F]">
                <span>Institutional &amp; Academic Options</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TWO-SERVICE COMPARISON (Warm Ivory Surface) */}
      <section className="bg-[#F1EDE4] text-slate-900 py-16 sm:py-20 border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9A751F] mb-2">
              Core Services
            </p>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Two Ways to Conduct Due Diligence
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 reading-measure">
              Begin remotely with a targeted document check, or travel to Uganda for a structured
              seven-day field programme.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: 24–72-Hour Verification */}
            <div className="bg-white border border-[#E2DDD3] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9A751F]">
                      Remote Starting Point
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-slate-900 mt-1">
                      24–72-Hour Verification
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-data text-xl font-bold text-slate-900">
                      {verificationPrice}
                    </span>
                    <span className="block text-[11px] text-slate-500">One-off dossier</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">Remote starting point:</strong> Evaluate
                      paperwork before booking travel or committing capital.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">For an active offer or documents:</strong>{' '}
                      Submit an FCO, SPA, DGSM mineral license, URA export permit, or assay report.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">Defined verification deliverable:</strong>{' '}
                      Written registry and compliance findings delivered within 24–72 hours, with
                      USD 1,000 credited toward an expedition within 90 days.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <a
                  href="/verification"
                  onClick={(e) => handleLink(e, '/verification')}
                  className="w-full py-3 px-5 rounded-lg bg-[#0B0F17] hover:bg-slate-800 text-[#D4AF37] font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Start Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: 7-Day Expedition */}
            <div className="bg-white border border-[#E2DDD3] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9A751F]">
                      In-Person Field Programme
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-slate-900 mt-1">
                      7-Day Expedition
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-data text-sm font-bold text-slate-900">
                      3 Tailored Tracks
                    </span>
                    <span className="block text-[11px] text-slate-500">Scheduled &amp; Private</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">In-person field programme:</strong> Seven
                      days across Entebbe, Kampala, Mubende, and Busia.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">
                        For broader market and supply-chain understanding:
                      </strong>{' '}
                      Designed for traders, researchers, and institutional delegations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#9A751F] shrink-0 mt-1" />
                    <span>
                      <strong className="text-slate-900">
                        Structured visits, training, and audits:
                      </strong>{' '}
                      Cadastre lookups, refinery fire assay demonstrations, mine visits, and banking
                      compliance sessions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <a
                  href="/expeditions"
                  onClick={(e) => handleLink(e, '/expeditions')}
                  className="w-full py-3 px-5 rounded-lg bg-[#D4AF37] hover:bg-[#c39e2c] text-[#0B0F17] font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore Expeditions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW VERIFICATION WORKS */}
      <section className="surface-ivory py-16 sm:py-20 border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9A751F] mb-2">
                Verification Process
              </p>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                How Verification Works
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 reading-measure">
                A clear three-step process for reviewing active gold offers and regulatory
                documents.
              </p>
            </div>

            <a
              href="/verification"
              onClick={(e) => handleLink(e, '/verification')}
              className="text-xs font-bold text-[#9A751F] hover:text-slate-900 inline-flex items-center gap-1.5 underline underline-offset-4 shrink-0"
            >
              <span>Read complete verification methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-xs font-bold text-[#9A751F]">01. Submit</span>
                <Upload className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Upload documents securely
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload documents and counterparty details securely, including claimed license
                numbers, offer terms, and seller entities.
              </p>
            </div>

            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-xs font-bold text-[#9A751F]">02. Verify</span>
                <SearchCheck className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Registry &amp; compliance review
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Relevant records and physical or regulatory claims are examined against DGSM
                cadastre entries, URA customs procedures, and market benchmarks.
              </p>
            </div>

            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-xs font-bold text-[#9A751F]">03. Receive</span>
                <FileText className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Receive findings &amp; next steps
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive a findings report with documented scope, methodological limitations, and
                recommended next steps within 24–72 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — EXPEDITION PREVIEW (Dark Obsidian Section for Expedition Storytelling) */}
      <section className="bg-[#0B0F17] text-slate-300 py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">
                Seven-Day Field Programme
              </p>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Expedition Preview
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 reading-measure">
                Select any day below to preview its core theme and participant outcome.
              </p>
            </div>

            <a
              href="/expeditions/itinerary"
              onClick={(e) => handleLink(e, '/expeditions/itinerary')}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
            >
              <span>View Full Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 7-Day Selector Strip */}
          <div
            role="tablist"
            aria-label="Seven-Day Expedition Timeline"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6"
          >
            {SEVEN_DAY_PREVIEW.map((item) => {
              const active = item.day === selectedDay;
              return (
                <button
                  key={item.day}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDay(item.day)}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    active
                      ? 'bg-[#182232] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#111722] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="font-mono-data text-xs font-bold text-[#D4AF37]">
                    Day 0{item.day}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1 line-clamp-2">
                    {item.shortTheme}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Concise Selected Day Summary */}
          <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono-data font-bold text-[#D4AF37]">
                  Day 0{activePreview.day}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activePreview.location}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {activePreview.shortTheme}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed reading-measure">
                {activePreview.conciseSummary}
              </p>
            </div>

            <div className="lg:col-span-5 p-5 rounded-lg bg-[#0B0F17] border border-slate-800/90 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Participant Capability &amp; Outcome
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activePreview.participantOutcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — EVIDENCE AND TRUST */}
      <section className="surface-ivory py-16 sm:py-20 border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9A751F] mb-2">
              Governance, Methodology &amp; Field Capability
            </p>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built on Independence and Verifiable Evidence
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 reading-measure">
              Our work relies on primary registry checks, accredited metallurgical testing, and
              strict separation from commercial gold brokerage.
            </p>
          </div>

          {/* 3-Column Leadership & Deliverable Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Independence & Non-Transaction Policy */}
            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A751F]">
                01. Non-Transaction Policy
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Zero Commercial Conflict of Interest
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We do not buy, sell, broker, or hold title to gold, nor do we accept commissions
                from miners, refiners, or sellers. Our findings are prepared solely for the client
                commissioning the review.
              </p>
              <div className="pt-2">
                <a
                  href="/charter"
                  onClick={(e) => handleLink(e, '/charter')}
                  className="text-xs font-bold text-slate-900 hover:text-[#9A751F] inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Review Legal Charter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Sample Verification Deliverable Outline */}
            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A751F]">
                02. Defined Deliverable
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                What a Verification Report Includes
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>• Counterparty corporate &amp; DGSM license status check</li>
                <li>• Assessment of pricing, payment, and escrow clauses</li>
                <li>• Review of URA customs &amp; ICGLR certificate claims</li>
                <li>• Explicit statement of verification scope and limitations</li>
              </ul>
              <div className="pt-2">
                <a
                  href="/verification"
                  onClick={(e) => handleLink(e, '/verification')}
                  className="text-xs font-bold text-slate-900 hover:text-[#9A751F] inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <span>View sample deliverable outline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Leadership & Expertise */}
            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A751F]">
                03. Multidisciplinary Directorate
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Leadership &amp; Field Specialists
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {boardMembers.slice(0, 3).map((member) => (
                  <li key={member.id} className="border-b border-slate-100 pb-2 last:border-none">
                    <strong className="text-slate-900 block">{member.name}</strong>
                    <span className="text-xs text-slate-500">{member.role}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="text-xs font-bold text-slate-900 hover:text-[#9A751F] inline-flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Meet the full team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Authentic Field Photography with Captions */}
          {photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {photos.slice(0, 3).map((photo) => (
                <figure
                  key={photo.id}
                  className="surface-ivory-card border rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-4 space-y-1">
                    <div className="text-[11px] text-slate-500">
                      <span>{photo.category}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{photo.dateAdded}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{photo.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="bg-[#0B0F17] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CTA Box 1 */}
            <div className="rounded-xl bg-[#111722] border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37]">
                  24–72-Hour Turnaround
                </p>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  Have an active offer?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Submit an FCO, SPA, license, or customs document for independent verification
                  before committing funds.
                </p>
              </div>
              <div>
                <a
                  href="/verification"
                  onClick={(e) => handleLink(e, '/verification')}
                  className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors"
                >
                  <span>Start Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CTA Box 2 */}
            <div className="rounded-xl bg-[#111722] border border-slate-800 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37]">
                  2027 Cohort Calendar
                </p>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  Planning a field visit?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Review upcoming 7-day expedition dates, audience tracks, and package inclusions.
                </p>
              </div>
              <div>
                <a
                  href="/expeditions/dates"
                  onClick={(e) => handleLink(e, '/expeditions/dates')}
                  className="px-6 py-3.5 rounded-lg bg-[#182232] hover:bg-[#223046] text-white border border-[#D4AF37]/50 font-bold text-xs inline-flex items-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Explore Expedition Dates</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
