import React from 'react';
import {
  ShieldCheck,
  FileSearch,
  Compass,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Scale,
  Microscope,
  Building2,
  FileCheck2,
  MapPin
} from 'lucide-react';
import { Currency, ContentPost } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';
import { INITIAL_POSTS } from '../data/portalData';

interface HomePageProps {
  currency: Currency;
  onNavigate: (path: string) => void;
  onOpenDocVerifyModal: () => void;
  onOpenRegistrationModal: (tierId?: string) => void;
  posts?: ContentPost[];
}

export const HomePage: React.FC<HomePageProps> = ({
  currency,
  onNavigate,
  onOpenDocVerifyModal,
  posts
}) => {
  const displayPosts = (posts && posts.length > 0 ? posts : INITIAL_POSTS)
    .filter((p) => p.published)
    .slice(0, 4);

  return (
    <div className="bg-[#0B0F17] text-[#F6F3EC]">
      {/* HERO SECTION */}
      <section className="relative min-h-[540px] flex items-center pt-20 pb-14 overflow-hidden border-b border-[#C8A44D]/20">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg"
            alt="Granite laboratory inspection bench with precision XRF analyzer and gold doré bar in Uganda"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-[#0B0F17]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#C8A44D]/10 border border-[#C8A44D]/35 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C8A44D]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A44D] font-semibold">
                Independent verification · Field expeditions · Uganda
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6F3EC] tracking-tight leading-[1.1] mb-6">
              Verify the offer. Understand the supply chain.
            </h1>

            <p className="text-base sm:text-lg text-[#F6F3EC]/85 leading-relaxed mb-8 max-w-2xl">
              Independent gold offer verification and guided field expeditions across Uganda’s physical supply chain. Review documents, test assumptions and understand the evidence before committing capital.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('/offer-verification')}
                className="px-7 py-4 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#C8A44D]/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <FileSearch className="w-4 h-4" />
                <span>Verify an Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/expeditions')}
                className="px-7 py-4 rounded-xl bg-[#121826]/90 hover:bg-[#1a2234] text-[#F6F3EC] border border-[#C8A44D]/40 hover:border-[#C8A44D] font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#C8A44D]" />
                <span>Explore Expeditions</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* THREE DIRECT AUDIENCE ROUTES IMMEDIATELY BELOW HERO */}
      <section className="py-12 bg-[#121826] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] mb-2">
              Select Your Primary Objective
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
              Direct routes for verification, field due diligence, and research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Route 1: I have an active offer */}
            <div
              onClick={() => onNavigate('/offer-verification')}
              className="group rounded-2xl bg-[#0B0F17] border border-[#C8A44D]/35 hover:border-[#C8A44D] p-7 transition-all flex flex-col justify-between cursor-pointer shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#C8A44D]/15 border border-[#C8A44D]/40 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5 text-[#C8A44D]" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C8A44D] bg-[#C8A44D]/10 px-2.5 py-1 rounded">
                    24–72 Hour Review
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors mb-3">
                  I have an active offer
                </h3>
                <p className="text-sm text-[#9AA4B2] leading-relaxed mb-6">
                  Submit a Full Corporate Offer (FCO), draft Sales &amp; Purchase Agreement (SPA), DGSM mineral licence, or customs file for independent document review and Entebbe registry verification before wiring funds.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C8A44D]">
                <span>Go to Offer Verification ({formatCurrencyPrice(2500, currency)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Route 2: I need field due diligence */}
            <div
              onClick={() => onNavigate('/expeditions')}
              className="group rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-[#C8A44D]/60 p-7 transition-all flex flex-col justify-between cursor-pointer shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#C8A44D]/10 border border-[#C8A44D]/30 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-[#C8A44D]" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9AA4B2] bg-white/5 px-2.5 py-1 rounded">
                    7-Day Field Programme
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors mb-3">
                  I need field due diligence
                </h3>
                <p className="text-sm text-[#9AA4B2] leading-relaxed mb-6">
                  Join a guided Uganda field expedition for professional bullion traders or institutional delegations covering the DGSM cadastre, Mubende and Busia mine sites, fire-assay laboratories, and URA customs compliance.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors">
                <span>Explore Field Expeditions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Route 3: I am researching gold supply chains */}
            <div
              onClick={() => onNavigate('/expeditions/academic-research')}
              className="group rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-[#C8A44D]/60 p-7 transition-all flex flex-col justify-between cursor-pointer shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#C8A44D]/10 border border-[#C8A44D]/30 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#C8A44D]" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#9AA4B2] bg-white/5 px-2.5 py-1 rounded">
                    Academic &amp; Policy
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors mb-3">
                  I am researching gold supply chains
                </h3>
                <p className="text-sm text-[#9AA4B2] leading-relaxed mb-6">
                  Participate in a structured Uganda field programme for university researchers, ESG analysts, and policy teams examining artisanal and industrial gold traceability, regulatory frameworks, and responsible sourcing.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors">
                <span>View Academic Research Programme</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT INDEPENDENCE STATEMENT (IVORY BACKGROUND WITH LIGHT-BACKGROUND LOGO) */}
      <section className="py-12 bg-[#F6F3EC] text-[#0B0F17] border-b border-[#0B0F17]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-start">
              <img
                src="/assets/aistudio/uganda-gold-expedition-logo-for-light-backgrounds_79479d7f.png"
                alt="Uganda Gold Expedition emblem on light background"
                className="h-20 w-auto object-contain mb-4"
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8A6D2B] font-bold">
                Strict Non-Transaction Mandate
              </span>
            </div>

            <div className="lg:col-span-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B0F17] mb-3">
                We do not broker, buy, or sell gold.
              </h2>
              <p className="text-sm sm:text-base text-[#121826]/85 leading-relaxed mb-4">
                Uganda Gold Expedition operates exclusively as an independent verification and field due-diligence organization. We accept no brokerage commissions, seller finder fees, or trading margins. Our role is to examine documents, cross-check public and regulatory records under the Uganda Mining and Minerals Act 2022, and guide visiting delegations through the physical supply chain so decisions rest on verifiable evidence.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-xs font-bold uppercase tracking-wider text-[#0B0F17] hover:text-[#8A6D2B] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read our independence mandate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[#0B0F17]/30">•</span>
                <button
                  onClick={() => onNavigate('/risk-compliance')}
                  className="text-xs font-bold uppercase tracking-wider text-[#0B0F17] hover:text-[#8A6D2B] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review risk &amp; compliance controls</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCISE METHODOLOGY SUMMARY */}
      <section className="py-14 bg-[#0B0F17] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] mb-2">
                Due-Diligence Methodology
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
                Four-stage evidence review across documents, registries, laboratories, and sites
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/risk-compliance')}
              className="text-xs font-bold uppercase tracking-wider text-[#C8A44D] hover:underline inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
            >
              <span>Full 7-Part Compliance Framework</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STAGE 01</span>
                <Building2 className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                Counterparty &amp; Registry Checks
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Cross-reference seller corporate identity, beneficial ownership, and claimed mineral dealer or mining licences against the DGSM cadastre in Entebbe.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STAGE 02</span>
                <Scale className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                Commercial &amp; Advance-Fee Review
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Assess FCO and SPA pricing terms, escrow structures, and tax payment clauses against statutory URA ASYCUDA World customs procedures.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STAGE 03</span>
                <Microscope className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                Assay &amp; Sampling Validation
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Separate surface XRF screening from ultrasonic core inspection, homogeneous induction melting, and ISO 11426 fire assay cupellation.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STAGE 04</span>
                <MapPin className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                On-Site Supply-Chain Inspection
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Verify pithead extraction, processing throughput, ICGLR regional certification, and customs sealing across Mubende, Kassanda, Busia, and Entebbe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED INSIGHTS */}
      <section className="py-14 bg-[#121826] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] mb-2">
                Selected Field Intelligence
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
                Briefings on offer risk, regulation, field methods, and metallurgy
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/insights')}
              className="text-xs font-bold uppercase tracking-wider text-[#C8A44D] hover:underline inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>View All Insights</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayPosts.map((post) => {
              const slug = post.slug || post.id;
              return (
                <article
                  key={post.id}
                  onClick={() => onNavigate(`/insights/${slug}`)}
                  className="group rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-[#C8A44D]/50 p-6 transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#C8A44D]/15 text-[#C8A44D] font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs font-mono text-[#9AA4B2]">
                        Updated {post.updatedDate || post.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors mb-2.5">
                      {post.h1 || post.title}
                    </h3>
                    <p className="text-sm text-[#9AA4B2] leading-relaxed mb-4">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9AA4B2]">
                    <span>By {post.author}</span>
                    <span className="font-bold uppercase tracking-wider text-[#C8A44D] inline-flex items-center gap-1">
                      Read Briefing <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL VERIFICATION CTA */}
      <section className="py-14 bg-[#0B0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#121826] via-[#121826] to-[#1a2234] border border-[#C8A44D]/40 p-8 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8A44D] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>24–72 Hour Independent Document &amp; Registry Review</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC] mb-3">
                  Evaluating an active gold offer or planning a Uganda field review?
                </h2>
                <p className="text-sm sm:text-base text-[#9AA4B2] leading-relaxed mb-4">
                  Submit an FCO, SPA, or DGSM mineral licence for a structured 24–72 hour verification report ({formatCurrencyPrice(2500, currency)}), or speak with our team regarding an upcoming trader, academic, or institutional field expedition.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#F6F3EC]/80">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    DGSM Cadastre Check
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    Counterparty &amp; Sanctions Screening
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                    Written Evidence Report
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => onNavigate('/offer-verification')}
                  className="w-full py-4 px-6 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>Verify an Offer</span>
                </button>
                <button
                  onClick={onOpenDocVerifyModal}
                  className="w-full py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-[#F6F3EC] border border-white/15 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Rapid Submission Intake</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
