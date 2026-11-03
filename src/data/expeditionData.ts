import { ItineraryDay, PackageTier, ScamRule, Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'US Dollar (USD)' },
  EUR: { symbol: '€', rate: 0.92, label: 'Euro (EUR)' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'UAE Dirham (AED)' },
  GBP: { symbol: '£', rate: 0.79, label: 'British Pound (GBP)' },
  CNY: { symbol: '¥', rate: 7.23, label: 'Chinese Yuan (CNY)' },
  UGX: { symbol: 'UGX ', rate: 3720, label: 'Ugandan Shilling (UGX)' },
};

export function formatCurrencyPrice(amountUsd: number, currency: Currency = 'USD'): string {
  const rateObj = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(amountUsd * rateObj.rate);
  return `${rateObj.symbol}${converted.toLocaleString()}`;
}

export const UPCOMING_COHORTS = [
  { id: 'cohort-1', dates: 'Cohort 01: Jan 17–23, 2027', status: '4 Seats Remaining' },
  { id: 'cohort-2', dates: 'Cohort 02: Mar 14–20, 2027', status: 'Open for Vetting' },
  { id: 'cohort-3', dates: 'Cohort 03: May 16–22, 2027', status: 'Open for Vetting' },
  { id: 'cohort-4', dates: 'Cohort 04: Jul 11–17, 2027', status: 'Open for Vetting' },
  { id: 'cohort-5', dates: 'Cohort 05: Sep 19–25, 2027', status: 'Open for Vetting' },
  { id: 'cohort-6', dates: 'Cohort 06: Nov 14–20, 2027', status: 'Open for Vetting' },
];

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: 1,
    title: "Regulators & The Sovereign Cadastre",
    subtitle: "Ministry of Energy & Mineral Development & DGSM Entebbe",
    location: "Entebbe & Amber House, Kampala",
    timeSlot: "08:30 – 17:30",
    focus: "Official Mineral Cadastre, License Validity & Legal Due Diligence",
    description: "Begin at the Directorate of Geological Survey and Mines (DGSM) headquarters in Entebbe. Delegates undergo live system demonstrations verifying authentic exploration licenses (EL), mining leases (ML), and mineral dealer licenses (MDL). Learn how to access the national online mining cadastre portal to audit concession boundaries in real-time.",
    keyActivities: [
      "Live DGSM cadastre lookup of active vs expired concession rights",
      "Executive briefing with senior mineral registrars and legal directors",
      "Deconstruction of the Uganda Mining and Minerals Act 2022 legal framework",
      "Reviewing official registry seals, watermark standards, and ICGLR regional databases"
    ],
    riskDeconstructed: "Unlicensed scammers who pitch fictitious concessions using fabricated government letters and expired exploration permits.",
    executiveDeliverable: "Official DGSM Cadastre Verification Toolkit & Uganda Mining Act 2022 Statutory Compliance Handbook."
  },
  {
    day: 2,
    title: "The Scam Academy & Forensic Metallurgy",
    subtitle: "Controlled Intermediary Pitch Deconstruction & Physical Testing",
    location: "Secure Intelligence Facility, Entebbe",
    timeSlot: "09:00 – 18:00",
    focus: "Hands-on Forensic Deconstruction of Counterfeit Contracts & Fake Bars",
    description: "A secure, controlled environment where former intelligence analysts and metallurgical experts expose the exact mechanics of regional gold fraud. Examine real-world seized counterfeit documents, fake URA receipts, bogus UN/ICGLR transit permits, and handle cut-away brass, copper, and tungsten-doped bars.",
    keyActivities: [
      "Forensic document audit: Spotting photopolymer fake stamps, forged ministerial signatures & counterfeit ICGLR seals",
      "Physical testing bench: Density immersion tests, ultrasonic velocity probes, and handheld XRF spectrometer limits",
      "Deconstructing the '25% Below Spot' math and the anatomy of advance-fee customs fraud",
      "Live roleplay: Analyzing actual WhatsApp/Telegram pitch decks and fake escrow agreements"
    ],
    riskDeconstructed: "Deceptive advance fee customs clearance requests, fake bonded warehouse storage notes, and gold-plated copper/brass bars.",
    executiveDeliverable: "38-Point Counterparty Risk Forensic Dossier & Physical Assay Verification Checklist.",
    image: "/src/assets/images/scam_academy_forensics_1793632189342.jpg"
  },
  {
    day: 3,
    title: "Artisanal Mines: The Reality of the Pithead",
    subtitle: "Boots-on-the-Ground Field Inspection in Mubende & Kassanda",
    location: "Mubende – Kassanda Gold Corridor",
    timeSlot: "06:30 – 19:00",
    focus: "Raw Extraction Economics, Sluicing, Purity & Middleman Markups",
    description: "Travel via Armored 4x4 Convoy to the operational artisanal pitheads in Central Uganda. Witness firsthand artisanal gold panning, gravity concentration, and local mercury-amalgam methods. Observe how raw dust is weighed, the true local spot discount (often only 1-3% below international spot at the pithead), and why 'cheap local gold' is a mathematical myth.",
    keyActivities: [
      "Walk the operational pits and interact with licensed artisanal mining associations",
      "Observe live gravity sluicing and panning from raw quartz vein material",
      "Verify real pit-head transactional prices and weigh raw sponge gold on field scales",
      "Examine local security protocols, community agreements, and regional supply chain middlemen"
    ],
    riskDeconstructed: "The 'Village Elder with 500kg of cheap dust' myth: understanding actual artisanal output limits (grams, not metric tons).",
    executiveDeliverable: "Field Geology & Artisanal Supply Flow Chart with Real Pit-Head Unit Economics."
  },
  {
    day: 4,
    title: "Industrial Scale Extraction & Processing",
    subtitle: "Wagagai Gold Project & Modern Mining Corridors, Busia",
    location: "Busia Mineral Belt, Eastern Uganda",
    timeSlot: "07:00 – 18:30",
    focus: "Modern Open Pit, Underground Leaching & Institutional Supply Chain",
    description: "A contrast to artisanal mining: visit large-scale industrial gold operations in the Busia belt. Tour multi-million-dollar modern processing plants, carbon-in-leach (CIL) circuits, industrial ball mills, and state-of-the-art tailings facilities. Meet institutional mine engineers to understand industrial Dore bar production and formal chain-of-custody.",
    keyActivities: [
      "Guided site tour of industrial leaching tanks, crushing plants, and smelting rooms",
      "Briefing with corporate mine executives on mineral reserves and bankable feasibility studies",
      "Reviewing institutional ESG protocols, environmental compliance, and tailings management",
      "Understanding institutional off-take contracts and direct international refinery conduits"
    ],
    riskDeconstructed: "Scammers claiming industrial mine ownership using photos of foreign or government infrastructure.",
    executiveDeliverable: "Industrial Gold Production Benchmark Report & Offtake Contract Verification Template."
  },
  {
    day: 5,
    title: "Bonded Refineries, Fire Assay & Tax Architecture",
    subtitle: "Entebbe & Kampala Accredited Smelting & Customs Clearances",
    location: "Kampala Industrial Area & Entebbe Free Zone",
    timeSlot: "09:00 – 17:30",
    focus: "Fire Assay (Cupellation), Chemical Aqua Regia & URA 5% Export Levy",
    description: "Step inside high-security bonded refineries. Stand by the furnace during live smelting and watch the classic ISO-accredited Fire Assay (cupellation) process. Meet directly with Uganda Revenue Authority (URA) Customs officials to understand the statutory 5% export levy, electronic Single Customs Territory documentation, and international shipping protocols.",
    keyActivities: [
      "Witness live smelting of Dore bars into 999.9 fine gold standard investment bars",
      "Hands-on demonstration of Fire Assay cupellation and chemical analysis precision",
      "In-depth briefing with URA customs agents on ASYCUDA World export filings",
      "Examining genuine ICGLR transit certificates, export permits, and assay certificates"
    ],
    riskDeconstructed: "Fraudulent 'diplomatic courier' shipments, fake bonded refinery escrow receipts, and fabricated tax waivers.",
    executiveDeliverable: "The Gold Export Taxation & Customs Protocol Manual with genuine URA sample document suite."
  },
  {
    day: 6,
    title: "Safe-Trader Gala & Institutional Roundtable",
    subtitle: "Closed-Door Session with Tier-1 Bankers, Legal Counsel & Armored Transit",
    location: "Kampala Serena Hotel Grand Ballroom",
    timeSlot: "10:00 – 21:00",
    focus: "Banking AML/CFT Compliance, Escrow Mechanics & Secure Armored Logistics",
    description: "An exclusive institutional symposium bringing together Tier-1 Ugandan commercial bank compliance heads, senior mining attorneys from top East African law firms, and executives from international security freight carriers (e.g. Brinks, G4S). Discuss clean cross-border payment structures, conditional bank escrow (MT103 field 72 / clean documentary credits), and insured logistics.",
    keyActivities: [
      "Private panel: Bank compliance officers on incoming wire origin vetting and AML/KYC requirements",
      "Legal workshop: Structuring bulletproof Sales & Purchase Agreements (SPA) under Ugandan and English law",
      "Secure logistics briefing: Armored tarmac transfer protocols from refinery vault directly into airline hold",
      "Gala dinner & networking with vetted mining executives, accredited refiners, and state ambassadors"
    ],
    riskDeconstructed: "Payment through personal lawyer escrow accounts, bogus non-SWIFT financial instruments (fake MT760/MT799).",
    executiveDeliverable: "Institutional Gold SPA Contract Template & Approved Tier-1 Bank Escrow Routing Guide."
  },
  {
    day: 7,
    title: "Strategic Debrief & Intelligence Certification",
    subtitle: "Individual Counterparty Risk Audit & Official Due Diligence Certification",
    location: "Private Executive Suite, Lake Victoria Serena Golf Resort",
    timeSlot: "09:30 – 15:00",
    focus: "One-on-One Deal Audit, Custom Risk Mitigation Strategy & Formal Graduation",
    description: "The culmination of the 7-day expedition. Delegates sit in confidential 1-on-1 sessions with chief intelligence officers to audit any live proposals, sellers, or paperwork they are currently evaluating. Receive the official Uganda Gold Due Diligence & Anti-Fraud Certification, formalizing your accredited status as an informed, fraud-immune market participant.",
    keyActivities: [
      "Confidential counterparty audit: Deep-dive background check on active sellers or contracts you hold",
      "Formulation of personal risk-mitigation playbook tailored to your jurisdiction (UAE, EU, USA, Asia)",
      "Official certificate conferral ceremony and inclusion into the Verified Buyer Intelligence Network",
      "Final executive departure transfer to Entebbe International Airport (VIP diplomatic lounge access for Tier 3)"
    ],
    riskDeconstructed: "Residual cognitive blindspots; transitioning from theoretical knowledge to bulletproof field operations.",
    executiveDeliverable: "Official Certificate of Due Diligence Completion & Personalized 1-on-1 Counterparty Audit Report."
  }
];

export const EXPEDITION_PACKAGES: PackageTier[] = [
  {
    id: 'academic',
    name: "Academic & Research Expedition",
    tierNumber: "Tier 01",
    tagline: "For compliance officers, investigative researchers, and policy analysts.",
    priceUsd: 8000,
    idealFor: "ESG analysts, academic researchers, regulatory compliance specialists, and risk auditors.",
    accommodation: "4-Star Kampala Business Hotel (Private Executive Room, Full Board)",
    transport: "High-spec air-conditioned group executive coach with dedicated security escort",
    features: [
      "Access to DGSM Entebbe mineral registry and Cadastre briefings",
      "Day 3 Artisanal mining corridor field observation (Mubende/Kassanda)",
      "Day 5 Bonded refinery assay observation and URA customs presentation",
      "Official Mining and Minerals Act 2022 legal reference compilation",
      "Comprehensive East Africa Gold Supply Chain Research Dossier",
      "All meals, internal logistics, field permits, and personal protective equipment (PPE)",
      "Certificate of Expedition Completion for academic and compliance records",
      "Group & Academic Rate: book 6+ paying delegates and one accompanying lecturer/staff member joins complimentary (full program access, board and field days). Minimum cohort: 6 paying delegates."
    ],
    deliverables: [
      "Statutory Regulatory Reference Binder",
      "Artisanal Supply Chain Field Notes & Flowchart",
      "Digital Access to Cadastre Verification Portal Guide"
    ]
  },
  {
    id: 'trader',
    name: "Professional Trader Expedition",
    tierNumber: "Tier 02",
    tagline: "For commodity desks, bullion traders, and family office principals.",
    priceUsd: 15000,
    highlighted: true,
    idealFor: "Physical gold buyers, commodity desk managers, bullion brokers, and import/export directors.",
    accommodation: "5-Star Kampala Serena Hotel (Deluxe Executive Suite, Full Luxury Board)",
    transport: "Private dedicated 4x4 Land Cruiser SUV convoy with specialized security personnel",
    features: [
      "Complete 7-day all-inclusive expedition access across all official sites",
      "Full hands-on access to Day 2 'The Scam Academy' forensic testing laboratory",
      "Direct closed-door session with DGSM Senior Commissioners and Mining Registrars",
      "Industrial mine field operations access at Busia / Wagagai gold project",
      "Hands-on Fire Assay and XRF spectrometer testing session in accredited refinery",
      "Seat at the Day 6 Institutional Safe-Trader Roundtable & Gala Dinner",
      "1-on-1 confidential audit of up to two (2) active gold offers you currently hold (additional audits at the USD 1,500 client rate)",
      "Standard Sales & Purchase Agreement (SPA) vetted by top Ugandan mining counsel"
    ],
    deliverables: [
      "38-Point Counterparty Forensic Audit Dossier",
      "Vetted Ugandan Gold Attorney & Accredited Escrow Contact Directory",
      "Official Physical Supply Chain Due Diligence Certificate",
      "Verified Exporter & Bonded Refinery Directory"
    ]
  },
  {
    id: 'sovereign',
    name: "Sovereign Executive · Diplomatic VIP",
    tierNumber: "Tier 03",
    tagline: "For sovereign wealth funds, central bank observers, and diplomatic VIP principals.",
    priceUsd: 45000,
    idealFor: "Sovereign fund trustees, central bank delegations, billionaire family offices, and mining chairmen.",
    accommodation: "Presidential Lake Villa Suite at Lake Victoria Serena Golf Resort & Spa",
    transport: "Dedicated B6 armored executive motorcade & close-protection tactical detail for all field movements (Chartered helicopter transfers available on request at USD 3,000 per flight hour.)",
    exclusiveBonus: "Forensic audit of up to five (5) active transaction proposals + 12-Month Counterparty Verification Retainer covering up to twelve (12) remote verifications",
    features: [
      "Entebbe International Airport Tarmac Diplomatic Fast-Track & VIP Lounge clearance",
      "Dedicated B6 armored executive motorcade & close-protection tactical detail for all field movements",
      "Chartered helicopter transfers available on request at USD 3,000 per flight hour.",
      "Private 1-on-1 ministerial audience with Ministry of Energy & Mineral Development leadership",
      "Full priority access across all 7 itinerary days with dedicated personal intelligence attaché",
      "Forensic audit of up to five (5) active transaction proposals during the expedition + 12-Month Counterparty Verification Retainer covering up to twelve (12) remote verifications (one per calendar month; additional verifications at USD 1,500 client rate)",
      "Direct VIP seat at the Safe-Trader Gala VIP Head Table with state ambassadors and bank CEOs"
    ],
    deliverables: [
      "Bespoke Institutional Sourcing & Counterparty Risk Strategy Playbook",
      "12-Month Counterparty Verification Retainer (up to 12 remote verifications; additional at USD 1,500 client rate)",
      "Sovereign Gold Acquisition Legal & Tax Structuring Dossier",
      "Exclusive Platinum Gold Due Diligence Sovereign Credential"
    ]
  }
];

export const MARKET_REALITIES = [
  {
    id: 'discrepancy',
    metric: "$700M+",
    metricSub: "Monthly Export Value",
    title: "The Massive Supply Discrepancy",
    tag: "Transit Hub Reality",
    description: "Uganda's official customs records reveal hundreds of millions of dollars in monthly gold exports, vastly exceeding domestic geological extraction. The country serves as East Africa's primary regional processing and smelting bridge.",
    implication: "Without forensic chain-of-custody tracking, international buyers inadvertently step into conflict minerals, smuggling pipelines, or fabricated transit records.",
    keyStat: "94% of transit flows originate outside national borders; verification of cross-border ICGLR stamps is critical."
  },
  {
    id: 'discount-trap',
    metric: "25% OFF",
    metricSub: "The Classic Bait",
    title: "The 'Discount Gold' Trap",
    tag: "Advance Fee Anatomy",
    description: "London Bullion Market Association (LBMA) gold is the most liquid monetary commodity on Earth, trading at tight spot margins. Any offer proposing gold at 10%, 15%, or 25% below spot is a mathematical impossibility designed to lure deposits.",
    implication: "The seller demands $40,000 – $250,000 in upfront 'export taxes', 'customs bonds', or 'security logistics'—only for the escrow lawyer and gold to vanish.",
    keyStat: "Real pithead gold trades at only 1-3% below spot; deep discounts are universally fraudulent."
  },
  {
    id: 'forgery-industry',
    metric: "99.8%",
    metricSub: "Counterfeit Rate in WhatsApp Deals",
    title: "The Forgery Industry",
    tag: "Synthetic Documentation",
    description: "A sophisticated cottage industry manufactures photorealistic fake export permits, forged DGSM signatures, fraudulent URA customs stamps, and counterfeit Bank of Uganda clearance certificates that easily fool foreign buyers on paper.",
    implication: "Relying on PDF documents sent via WhatsApp or email without on-site cadastre cross-referencing guarantees total capital loss.",
    keyStat: "Over 40 counterfeit document varieties are cataloged and deconstructed in our Day 2 Scam Academy."
  }
];

export const SCAM_RULES: ScamRule[] = [
  {
    id: 'deep-discount',
    label: "Offered at > 10% Below LBMA Spot Price",
    description: "Seller promises gold bars or dust at 12% to 30% discount below international LBMA spot price.",
    riskScore: 35,
    category: 'pricing',
    explanation: "FATAL RED FLAG: Gold is universally convertible currency. No legitimate miner or refiner gives away free millions when local refiners pay 98-99% of spot in cash within 2 hours."
  },
  {
    id: 'advance-export-tax',
    label: "Buyer Required to Pay Upfront Tax / Security Levy",
    description: "Seller asks buyer to wire $30k–$150k for 'URA 5% export clearance', 'UN transit certificate', or 'customs bonded warehouse fee' before shipment.",
    riskScore: 30,
    category: 'customs',
    explanation: "CLASSIC ADVANCE-FEE FRAUD: Under authentic trade architecture, export levies are paid directly through official URA tax portal against genuine assay, or cleared through bonded bank letters of credit."
  },
  {
    id: 'fake-escrow-lawyer',
    label: "Payment to Private Law Firm Escrow Account in Kampala",
    description: "Seller insists funds be held in a private lawyer's account in Kampala rather than a Tier-1 institutional commercial bank with MT103 conditional field 72.",
    riskScore: 25,
    category: 'banking',
    explanation: "COLLUSION HAZARD: Rogue legal practitioners frequently create one-off escrow accounts and release funds the moment unverified paperwork is presented, leaving the buyer with zero legal recourse."
  },
  {
    id: 'drc-origin-untraceable',
    label: "Claimed Origin in DRC / South Sudan with WhatsApp Certificates",
    description: "Gold alleged to be from artisanal mines in Eastern DRC or South Sudan, accompanied by photo-scanned ICGLR / CEEC certificates.",
    riskScore: 20,
    category: 'documentation',
    explanation: "CHAIN OF CUSTODY VIOLATION: Unverified transit gold violates the Regional Certification Mechanism. Over 90% of WhatsApp ICGLR certificates are forged with fake QR codes leading to cloned verification servers."
  },
  {
    id: 'cif-dubai-free-shipping',
    label: "Seller Promises 'CIF Dubai / Zurich' with Advance Security Fee",
    description: "Seller claims they will fly the gold to buyer's destination refinery at their cost, but requests buyer to pay 'cargo insurance' or 'private charter flight security'.",
    riskScore: 25,
    category: 'customs',
    explanation: "THE GHOST CARRIER SCAM: Scammers pose as private freight companies, issuing bogus airway bills (AWB) from nonexistent air couriers, repeatedly demanding fees for 'customs impoundment release'."
  },
  {
    id: 'refusal-physical-refinery-assay',
    label: "Refusal of Immediate Independent Fire Assay in Entebbe",
    description: "Seller will only allow visual inspection at a hotel suite or private office, refusing to walk into an accredited bonded refinery for drill & fire assay before funds transfer.",
    riskScore: 30,
    category: 'pricing',
    explanation: "COUNTERFEIT BULLION: Genuine sellers welcome certified refinery fire assay. Hesitation indicates gilded brass, tungsten-powder cores, or alloyed scrap."
  }
];

export const LEGAL_CHARTER_PILLARS = [
  {
    number: "01",
    title: "Strict Zero Transaction Policy",
    subtitle: "Absolute Independence",
    content: "The Uganda Gold Expedition is exclusively an educational, anti-fraud, and due-diligence mission. We do not sell, purchase, broker, trade, or hold legal title to any physical gold, mineral concessions, or bullion. We accept zero commissions, referral kickbacks, or trading finder fees from any miner, refiner, or trader."
  },
  {
    number: "02",
    title: "Mandatory KYC & Sanctions Screening",
    subtitle: "OFAC, UN, UK HMT, EU Sanctions & PEP Screening",
    content: "Every expedition package includes the mandatory USD 1,000 KYC & Client Vetting Allocation covering background screening, OFAC, UN, UK HMT, EU sanctions and PEP screening, and government liaison processing. This allocation is strictly non-refundable once vetting commences; should an applicant not pass vetting, the full balance above the $1,000 allocation is refunded within 14 business days."
  },
  {
    number: "03",
    title: "Mining and Minerals Act 2022 Compliance",
    subtitle: "Statutory & International Alignment",
    content: "All field operations, site visits, and cadastre inspections strictly observe the Uganda Mining and Minerals Act 2022, the ICGLR Regional Certification Mechanism (RCM), the OECD Due Diligence Guidance for Responsible Supply Chains, and Bank of Uganda AML/CFT statutory statutes."
  },
  {
    number: "04",
    title: "Rigorous Vetting & Access Control",
    subtitle: "Protecting Integrity & Safety",
    content: "Participation is not open to the general public. Every prospective attendee must submit corporate verification, executive passport details, undergo OFAC, UN, UK HMT, EU sanctions and PEP screening, and sign a binding Non-Transaction Agreement. We actively screen and reject illicit brokers, fraudulent syndicates, and bad-faith intermediaries."
  }
];
