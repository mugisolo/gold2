import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  MessageSquare,
  FileSearch,
  Award,
  ShieldCheck
} from 'lucide-react';
import { FaqItem, Language, Currency } from '../types';
import { translations, getLocalizedFaqs } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface FaqSectionProps {
  currentLang?: Language;
  selectedCurrency?: Currency;
  onOpenChatAndWaba: (defaultMode?: 'chat' | 'waba') => void;
  onOpenDocVerification: () => void;
  onOpenRegistration: () => void;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-sc-1',
    category: 'supply_chain',
    categoryLabel: 'Gold Supply Chain',
    question: 'Why are Full Corporate Offers (FCOs) offering 15%–25% discounts below LBMA spot always fraudulent?',
    answer:
      'Physical gold is a Tier-1 global monetary asset with instant liquidity. Across Uganda’s licensed mining districts—including Mubende, Kassanda, Busia, and Karamoja—licensed local aggregators and bonded refineries compete daily to buy raw sponge gold and Dore bars for immediate cash at 98% to 99.2% of the international LBMA fix. No legitimate mine owner or license holder ever needs to sell physical gold at a 15%–25% discount to a foreign buyer, nor do they require a buyer to advance "export tax" or "customs clearance" funds. Deep discounts are psychological bait engineered exclusively for advance-fee fraud.',
    statutoryRef: 'LBMA Physical Bullion Parity & Bank of Uganda Settlement Standards'
  },
  {
    id: 'faq-sc-2',
    category: 'supply_chain',
    categoryLabel: 'Gold Supply Chain',
    question: 'How does the legitimate East African physical gold supply chain actually operate from pithead to export?',
    answer:
      'The lawful supply chain operates across four verifiable tiers: (1) Artisanal & Industrial Extraction at licensed concessions in Busia, Mubende, Kassanda, and Buhweju; (2) Licensed Regional Aggregators holding valid DGSM Mineral Dealer Licenses (MDLs) who smelt raw sponge into preliminary Dore bars; (3) Bonded Refineries & Assay Laboratories in Kampala and Entebbe that perform homogeneous induction melting and 1050°C Fire Assay Cupellation; and (4) Statutory Export via Entebbe International Airport under URA ASYCUDA World customs seals and ICGLR Regional Certification.',
    statutoryRef: 'Uganda Mining and Minerals Act 2022 · Part VII (Value Addition & Trade)'
  },
  {
    id: 'faq-sc-3',
    category: 'supply_chain',
    categoryLabel: 'Gold Supply Chain',
    question: 'Can a foreign buyer legally purchase gold claiming "UN Transit Stamps" or "DRC Diplomatic Immunity"?',
    answer:
      'No. The United Nations does not issue commercial bullion transit stamps, and diplomatic pouches cannot lawfully transport commercial gold tonnage. Any contract, SKR (Safe Keeping Receipt), or WhatsApp pitch referencing "UN custom seals," "rebel-held tax-free stock," or "diplomatic box clearance" is a 100% fabricated advance-fee instrument. All lawful cross-border mineral movements in the Great Lakes region require ICGLR Regional Certification Mechanism (RCM) traceability and URA Single Customs Territory declarations.',
    statutoryRef: 'ICGLR Regional Certification Mechanism (RCM) & OECD Due Diligence Annex II'
  },
  {
    id: 'faq-sc-4',
    category: 'supply_chain',
    categoryLabel: 'Gold Supply Chain',
    question: 'Does the Uganda Gold Expedition broker, buy, or sell physical gold?',
    answer:
      'Strictly no. The Uganda Gold Expedition operates under an absolute Non-Transaction Charter. We do not act as brokers, dealers, mandates, or commercial intermediaries, and we never take custody of bullion or transaction funds. Our sole mandate is independent forensic due diligence, statutory cadastre verification, and physical supply chain education so principals do not lose capital to syndicates.',
    statutoryRef: 'Sovereign Non-Transaction Advisory Charter'
  },
  {
    id: 'faq-dd-1',
    category: 'due_diligence',
    categoryLabel: 'Due Diligence Process',
    question: 'Why is a handheld XRF scan insufficient to verify physical gold Dore bars?',
    answer:
      'Handheld X-Ray Fluorescence (XRF) spectrometers only penetrate 10 to 50 micrometers into the surface of a metal bar. Sophisticated counterfeiters fuse a 1.5mm to 2mm jacket of genuine 24-karat gold around a core of sintered tungsten rods—because tungsten’s density (19.25 g/cm³) nearly matches pure gold (19.32 g/cm³). Our forensic protocol under Lead Forensics Expert Mugisa Solomon Byakutaaga mandates ultrasonic pulse-echo velocity scanning followed by full homogeneous melting in an induction furnace, dual-sample drilling, and 1050°C Fire Assay Cupellation.',
    statutoryRef: 'ISO 11426 Determination of Gold in Gold Jewelry Alloys & Bullion — Cupellation Method'
  },
  {
    id: 'faq-dd-2',
    category: 'due_diligence',
    categoryLabel: 'Due Diligence Process',
    question: 'How does the $2,500 One-Off 24-Hour Document Verification service work?',
    answer:
      'When you submit a Full Corporate Offer (FCO), Sales & Purchase Agreement (SPA), DGSM license, or URA customs document with the USD $2,500 verification fee, our Gemini AI Forensic Engine performs an immediate structural deconstruction and routes the dossier to Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye). Within 24 hours, our field team physically cross-checks the license serials at the DGSM Mineral Cadastre in Entebbe and verifies URA ASYCUDA records. Per strict compliance rules, no reports (including AI findings) are unlocked for client view or download until Staff Officer 1 completes verification and approves release.',
    statutoryRef: '24-Hour Forensic Dossier SLA & Staff Officer 1 Embargo Protocol'
  },
  {
    id: 'faq-dd-3',
    category: 'due_diligence',
    categoryLabel: 'Due Diligence Process',
    question: 'How are legitimate Uganda Revenue Authority (URA) export taxes paid?',
    answer:
      'Statutory export levies on gold (5% under current fiscal statutes) are assessed exclusively inside the official URA ASYCUDA World customs system, which generates a unique government Payment Registration Number (PRN) payable directly to the Uganda Consolidated Fund via authorized commercial banks. URA never collects export taxes through private law firm escrow accounts, personal bank accounts, or third-party logistics agents.',
    statutoryRef: 'Uganda Revenue Authority (URA) ASYCUDA World Statutory Payment Protocol'
  },
  {
    id: 'faq-dd-4',
    category: 'due_diligence',
    categoryLabel: 'Due Diligence Process',
    question: 'How do we verify if a seller holds a genuine Mineral Dealer License (MDL) or Mining Lease?',
    answer:
      'During Day 2 of the expedition (or within 24 hours via our Document Verification service), our legal and trade compliance desk led by Kamanzai Kaijuka conducts a direct biometric and serial lookup inside the Ministry of Energy and Mineral Development’s Directorate of Geological Survey and Mines (DGSM) online Mineral Cadastre Registry in Entebbe. Over 95% of PDF licenses circulated on WhatsApp use expired quarry numbers or digitally forged Commissioner stamps.',
    statutoryRef: 'DGSM National Mineral Cadastre Registry · Entebbe Headquarters'
  },
  {
    id: 'faq-tl-1',
    category: 'travel_logistics',
    categoryLabel: 'Travel Logistics',
    question: 'Why is USD $1,000 of the expedition registration fee strictly non-refundable?',
    answer:
      'Because our delegates enter sovereign government ministries, bonded customs vaults, high-security gold refineries, and active mining concessions, every applicant must undergo mandatory background vetting prior to arrival. Upon registration, USD $1,000 is immediately allocated to international KYC screening, Interpol clearance verification, and Ministry of Energy diplomatic security accreditations. Consequently, the USD $1,000 KYC fee is strictly non-refundable under all circumstances.',
    statutoryRef: 'Mandatory Sovereign KYC & Ministry Security Accreditation Protocol'
  },
  {
    id: 'faq-tl-2',
    category: 'travel_logistics',
    categoryLabel: 'Travel Logistics',
    question: 'What security, transport, and accommodation logistics are provided during the 7-day expedition?',
    answer:
      'Orchestrated by Board Director Ronnie Mugarura (Operations, Logistics and Strategy), all delegates receive VIP fast-track diplomatic clearance upon landing at Entebbe International Airport (EBB). Five-star accommodation is arranged at the Kampala Serena Hotel or Lake Victoria Serena Golf Resort & Spa. Ground movements utilize GPS-tracked executive convoys (upgraded to B6 armored vehicles and chartered Bell 412 twin-engine helicopters for Tier 3 Sovereign Executive delegations) with dedicated close-protection security officers.',
    statutoryRef: 'Directorate of Operations & High-Security Field Protocol'
  },
  {
    id: 'faq-tl-3',
    category: 'travel_logistics',
    categoryLabel: 'Travel Logistics',
    question: 'What payment methods are accepted for KYC deposits, expedition packages, and document audits?',
    answer:
      'All financial settlements—including the $1,000 KYC deposit, $2,500 24-hour Document Verification fee, and full expedition package fees ($6,000 / $10,000 / $20,000)—are processed strictly via our encrypted online payment gateway or verified institutional bank wire for full anti-money-laundering (AML) auditability.',
    statutoryRef: 'Financial Intelligence Authority (FIA) AML Compliance & Institutional Settlement Protocol'
  },
  {
    id: 'faq-tl-4',
    category: 'travel_logistics',
    categoryLabel: 'Travel Logistics',
    question: 'How do registered members access the WhatsApp Business (WABA) hotline and AI Concierge?',
    answer:
      'Once registered (with your Registration ID, e.g., REG-2026-8812, or registered corporate email), you unlock instant access to our Registered Member WhatsApp Business API (WABA) Concierge and Multi-Turn Gemini AI Advisory Desk. Registered delegates can dispatch encrypted WABA alerts directly to Lead Forensics Expert Mugisa Solomon Byakutaaga, Minerals Trade Expert Kamanzai Kaijuka, Operations Director Ronnie Mugarura, or Staff Officer 1.',
    statutoryRef: 'Registered Delegate WABA Encrypted Communications Channel'
  }
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  currentLang = 'EN',
  selectedCurrency = 'USD',
  onOpenChatAndWaba,
  onOpenDocVerification,
  onOpenRegistration
}) => {
  const t = translations[currentLang];
  const localizedFaqs = getLocalizedFaqs(currentLang, FAQ_ITEMS);
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);
  const kycPrice = formatCurrencyPrice(1000, selectedCurrency);

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'supply_chain' | 'due_diligence' | 'travel_logistics'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-sc-1', 'faq-dd-1', 'faq-tl-1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = localizedFaqs.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <section
      id="faq"
      className="py-10 sm:py-12 bg-[#0B0F17] border-t border-slate-800/80 text-slate-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
              <span>{t.faqBadge1}</span>
              <span aria-hidden="true">·</span>
              <span>{t.faqBadge2}</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.faqTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenChatAndWaba('chat')}
              className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.faqAskAiBtn}</span>
            </button>
            <button
              onClick={() => onOpenChatAndWaba('waba')}
              className="px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/50 rounded transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.faqWabaBtn}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs & Search Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-[#111722] border border-slate-800 rounded-lg overflow-x-auto">
            {[
              { id: 'all', label: `${t.faqCatAll} (${localizedFaqs.length})` },
              { id: 'supply_chain', label: t.faqCatSupply },
              { id: 'due_diligence', label: t.faqCatDiligence },
              { id: 'travel_logistics', label: t.faqCatLogistics }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.faqSearchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#111722] border border-slate-800 focus:border-[#D4AF37] rounded-lg text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl bg-[#111722] border transition-colors ${
                  isOpen ? 'border-[#D4AF37]/50' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono-data text-slate-400">
                      <span className="text-[#D4AF37] font-semibold">
                        0{idx + 1} · {item.categoryLabel}
                      </span>
                      {item.statutoryRef && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="hidden sm:inline text-slate-500">
                            {item.statutoryRef}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-lg bg-[#0B0F17] border border-slate-800 flex items-center justify-center text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 border-[#D4AF37]/50' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                      {item.answer}
                    </p>
                    {item.statutoryRef && (
                      <div className="text-[11px] font-mono-data text-slate-500 pt-1">
                        <span className="text-slate-300">{item.statutoryRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Bar */}
        <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="font-cinzel text-xl font-bold text-white">
              {t.faqBottomTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.faqBottomDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenChatAndWaba('chat')}
              className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors whitespace-nowrap"
            >
              {t.faqAskAiBtn}
            </button>
            <button
              onClick={onOpenDocVerification}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0B0F17] hover:bg-[#182232] border border-[#D4AF37]/40 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {t.navVerifyDoc} ({auditPrice})
              </span>
            </button>
            <button
              onClick={onOpenRegistration}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {t.navApplyCta} ({kycPrice} KYC)
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
