import React from 'react';
import {
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  FileText,
  Building2,
  AlertTriangle,
  Scale,
  Compass,
  FileWarning
} from 'lucide-react';
import { Currency } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';

interface VerificationPageProps {
  currency: Currency;
  onOpenDocVerifyModal: () => void;
  onNavigate: (path: string) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  currency,
  onOpenDocVerifyModal,
  onNavigate
}) => {
  return (
    <div className="bg-[#0B0F17] text-[#F6F3EC] min-h-screen pt-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative py-12 border-b border-[#C8A44D]/20 bg-gradient-to-b from-[#121826] to-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A44D]/10 border border-[#C8A44D]/35 mb-5">
                <Clock className="w-3.5 h-3.5 text-[#C8A44D]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8A44D] font-semibold">
                  24–72 Hour Independent Document &amp; Registry Review
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F3EC] tracking-tight leading-tight mb-5">
                Verify a gold offer before you commit funds
              </h1>

              <p className="text-base sm:text-lg text-[#F6F3EC]/85 leading-relaxed mb-7 max-w-2xl">
                Submit an FCO, SPA, mineral licence or supporting transaction file for independent review. Our process combines document checks, registry verification and field follow-up within 24–72 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenDocVerifyModal}
                  className="px-7 py-4 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#C8A44D]/20 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>Start a Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/risk-compliance')}
                  className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#F6F3EC] border border-white/15 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-[#C8A44D]" />
                  <span>Review Compliance Standards</span>
                </button>
              </div>
            </div>

            {/* FEE & TURNAROUND SUMMARY CARD */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-[#121826] border border-[#C8A44D]/40 p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#9AA4B2] block">
                      Standard Review Fee
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#C8A44D]">
                      {formatCurrencyPrice(2500, currency)}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#2E8B57]/20 text-[#2E8B57] border border-[#2E8B57]/30 font-bold">
                    VAT Inclusive
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#F6F3EC]/85 mb-6">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                    <span>Turnaround: <strong>24–72 hours</strong> from confirmed submission</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                    <span>Direct cross-check with DGSM Mineral Cadastre in Entebbe</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                    <span>Counterparty, OFAC, UN, UK HMT, EU sanctions &amp; PEP screening</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A44D] shrink-0 mt-0.5" />
                    <span>Signed written evidence report &amp; URA-compliant tax receipt</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenDocVerifyModal}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start a Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP VERIFICATION PROCESS */}
      <section className="py-12 border-b border-white/10 bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] mb-2">
              Verification Workflow
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC]">
              Submit securely → Document review → Registry and field checks → Evidence-led report
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STEP 01</span>
                <Lock className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                1. Submit securely
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Upload the FCO, SPA, DGSM mineral licence, assay certificate, or URA customs draft via encrypted intake along with the seller’s stated corporate details and pricing terms.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STEP 02</span>
                <FileText className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                2. Document review
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Our document review desk analyzes contract structure, LBMA pricing parity, advance-fee clauses, escrow routing, stamp authenticity, and document metadata consistency.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STEP 03</span>
                <Building2 className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                3. Registry and field checks
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Senior Due Diligence Officer (Staff Officer 1) verifies licence serial numbers, holder identity, and concession coordinates against the DGSM Mineral Cadastre in Entebbe and URSB corporate records.
              </p>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#C8A44D]">STEP 04</span>
                <ShieldCheck className="w-5 h-5 text-[#C8A44D]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                4. Evidence-led report
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
                Receive a signed verification dossier detailing registry findings, sanctions screening status, identified red flags, and recommended next steps within 24–72 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPE, DELIVERABLES, EXCLUSIONS & CONFIDENTIALITY */}
      <section className="py-12 border-b border-white/10 bg-[#121826]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scope & What the client receives */}
            <div className="rounded-2xl bg-[#0B0F17] border border-white/10 p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#2E8B57]" />
                <h2 className="font-serif text-xl font-bold text-[#F6F3EC]">
                  Scope &amp; Client Deliverables
                </h2>
              </div>
              <p className="text-xs text-[#9AA4B2] mb-4">
                Each 24–72 hour verification engagement covers up to one primary transaction file and its supporting annexes:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#F6F3EC]/85">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>DGSM Cadastre Status Check:</strong> Verification of Mineral Dealer Licence (MDL), Exploration Licence (EL), or Mining Lease (ML) serial numbers, expiry, and mineral class.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Counterparty &amp; Sanctions Screening:</strong> Corporate registration cross-check (URSB) and OFAC, UN, UK HMT, EU sanctions, and PEP screening of named principals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Commercial &amp; Customs Clause Review:</strong> Evaluation of proposed payment terms, escrow bank coordinates, ICGLR references, and URA ASYCUDA tax payment mechanisms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Written Verification Dossier:</strong> Signed PDF report with documented findings, risk classification, and actionable recommendations.</span>
                </li>
              </ul>
            </div>

            {/* Exclusions & Methodological Limitations */}
            <div className="rounded-2xl bg-[#0B0F17] border border-[#C97A1E]/40 p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <FileWarning className="w-5 h-5 text-[#C97A1E]" />
                <h2 className="font-serif text-xl font-bold text-[#F6F3EC]">
                  Exclusions &amp; Limitations
                </h2>
              </div>
              <p className="text-xs text-[#9AA4B2] mb-4">
                We distinguish between remote document/registry verification and physical bullion testing:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#F6F3EC]/85">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C97A1E] shrink-0 mt-0.5" />
                  <span><strong>Document review alone does not prove gold ownership, purity, origin, or physical availability.</strong> A valid licence or company registration does not confirm that a specific lot of gold exists in a vault.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C97A1E] shrink-0 mt-0.5" />
                  <span><strong>No Remote Metallurgical Assay:</strong> Confirming bar fineness requires physical custody, full homogeneous induction melting, and ISO 11426 fire assay cupellation at an accredited laboratory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C97A1E] shrink-0 mt-0.5" />
                  <span><strong>Non-Brokerage &amp; Non-Legal Representation:</strong> We do not negotiate commercial prices, act as escrow agents, or issue statutory government permits.</span>
                </li>
              </ul>
            </div>

            {/* Confidentiality, Turnaround & Fee Controls */}
            <div className="rounded-2xl bg-[#0B0F17] border border-white/10 p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Lock className="w-5 h-5 text-[#C8A44D]" />
                <h2 className="font-serif text-xl font-bold text-[#F6F3EC]">
                  Confidentiality &amp; Fee Controls
                </h2>
              </div>
              <p className="text-xs text-[#9AA4B2] mb-4">
                Strict operational safeguards protect principal identity and submitted files:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#F6F3EC]/85">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Zero Counterparty Tip-Off:</strong> Registry and cadastre checks are conducted discreetly without alerting the named seller or broker unless explicitly authorized by the client.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Isolated Case Records:</strong> Submitted FCOs, SPAs, and client identities are never indexed in public pages, sitemaps, or shared directories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8A44D] font-bold">•</span>
                  <span><strong>Transparent Fixed Fee:</strong> {formatCurrencyPrice(2500, currency)} per standalone verification dossier (inclusive of 18% Ugandan VAT). Expedition delegates receive preferential client rates ({formatCurrencyPrice(1500, currency)}) for additional audits beyond their tier allocation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL GOVERNANCE & AUTHORITATIVE SOURCES */}
      <section className="py-12 bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#121826] border border-white/10 p-6 sm:p-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C8A44D] block mb-1">
                  Methodology &amp; Regulatory Governance
                </span>
                <h2 className="font-serif text-xl font-bold text-[#F6F3EC]">
                  Statutory basis vs. internal verification methodology
                </h2>
              </div>
              <div className="text-xs font-mono text-[#9AA4B2]">
                <div>Reviewed by: <strong className="text-[#F6F3EC]">Mugisa Solomon Byakutaaga</strong> (Lead Forensics Specialist) &amp; <strong className="text-[#F6F3EC]">Adv. David Kigozi</strong> (Legal Compliance Counsel)</div>
                <div>Last reviewed: <strong className="text-[#C8A44D]">May 2026</strong></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#9AA4B2] leading-relaxed">
              <div>
                <h3 className="font-bold text-[#F6F3EC] mb-2">Statutory Legal Requirements (Uganda)</h3>
                <p>
                  Mineral licensing, dealing, refining, and export in Uganda are governed by the <strong>Uganda Mining and Minerals Act, 2022</strong> (enacted October 2022), administered by the Directorate of Geological Survey and Mines (DGSM) under the Ministry of Energy and Mineral Development (MEMD), alongside <strong>Uganda Revenue Authority (URA) ASYCUDA World</strong> customs procedures and the <strong>ICGLR Regional Certification Mechanism (RCM)</strong>.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#F6F3EC] mb-2">Uganda Gold Expedition Internal Methodology</h3>
                <p>
                  Our 24–72 hour review is an independent private due-diligence service aligned with the <strong>OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas (3rd Edition)</strong>. When desktop registry verification confirms a licensed counterparty, we recommend physical site and refinery verification through our guided field expedition before capital commitment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#121826] to-[#1a2234] border border-[#C8A44D]/40 p-7">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F6F3EC] mb-1">
                Ready to verify an active gold offer?
              </h2>
              <p className="text-sm text-[#9AA4B2]">
                Submit your FCO, SPA, or mineral licence now for a 24–72 hour written verification report.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDocVerifyModal}
                className="px-7 py-4 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <FileSearch className="w-4 h-4" />
                <span>Start a Verification</span>
              </button>
              <button
                onClick={() => onNavigate('/expeditions')}
                className="px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-[#F6F3EC] border border-white/15 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#C8A44D]" />
                <span>Explore Field Expeditions</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
