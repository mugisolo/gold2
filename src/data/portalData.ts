import type { ContentPost, PhotoItem, StaffMember, FieldLog, PaymentRecord, ExpeditionRegistration, DocumentVerification, BoardMember, AboutContent, AdminAuditLog } from '../types.ts';

export const INITIAL_ABOUT_CONTENT: AboutContent = {
  headline: 'Sovereign Physical Due Diligence & Anti-Fraud Intelligence Across East Africa',
  subheadline: 'Founded to eliminate advance-fee bullion fraud and equip institutional principals, family offices, and sovereign treasuries with verifiable, on-the-ground supply chain reality.',
  missionStatement: 'We do not broker, buy, or sell gold. Our sole mandate is independent physical verification, metallurgical assay validation, and statutory compliance auditing under the Uganda Mining and Minerals Act 2022.',
  overviewParagraphs: [
    'The East African gold corridor—centered around Uganda’s licensed refineries, Entebbe customs vaults, and regional artisanal belts in Mubende, Kassanda, Busia, and Karamoja—has become one of Africa’s most dynamic bullion hubs. Yet international capital allocators lose hundreds of millions of dollars annually to sophisticated advance-fee syndicates peddling fabricated 15%–25% LBMA discounts, forged DGSM mineral licenses, and counterfeit URA customs declarations.',
    'Uganda Gold Expedition was established by a multidisciplinary board of forensic investigators, minerals trade specialists, and field operations strategists to create an impenetrable firewall between legitimate institutional buyers and criminal syndicates. Before a principal wires a single dollar, our directorate walks them physically through the Directorate of Geological Survey and Mines (DGSM) cadastre in Entebbe, licensed Kampala fire-assay laboratories, and active pithead operations.',
    'Operating under a strict Non-Transaction Charter, our independence guarantees zero commercial conflict of interest. Every verification dossier, laboratory cupellation test, and 7-day field immersion is governed by empirical evidence, statutory registry verification, and chain-of-custody discipline.'
  ],
  statutoryMandate: 'Aligned with the Uganda Mining and Minerals Act 2022, ICGLR Regional Certification Mechanism (RCM), URA ASYCUDA World Customs Protocols, and OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas.',
  headquarters: 'Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda (URA TIN 1019482710) & Amber House Secretariat, Kampala',
  establishedYear: '2019'
};

export const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'board-1',
    name: 'Mugisa Solomon Byakutaaga',
    role: 'Lead Forensics Expert',
    designation: 'Board of Directors',
    specialty: 'Bullion Counterfeit Deconstruction, Metallurgical Assay Auditing & Financial Crime Intelligence',
    bio: 'Mugisa Solomon Byakutaaga serves as Board Director and Lead Forensics Expert for the Uganda Gold Expedition. He directs the forensic examination of Full Corporate Offers (FCOs), Sales & Purchase Agreements (SPAs), DGSM mineral dealer licenses, and physical Dore bar metallurgy. Under his leadership, our forensic desk has intercepted over $140M in fraudulent advance-fee contracts and exposed sintered tungsten-core bullion counterfeits across the Great Lakes corridor.',
    credentials: [
      'Lead Architect, Scam Immunity Matrix & 24–72 Hour Forensic Document Verification Protocol',
      'Senior Specialist in XRF Surface vs. Ultrasonic & Fire Assay Cupellation Auditing',
      'Statutory Counterparty Due Diligence & AML/KYC Compliance Lead'
    ],
    imageUrl: '/src/assets/images/scam_academy_forensics_1793632189342.jpg',
    linkedinUrl: 'https://www.linkedin.com/'
  },
  {
    id: 'board-2',
    name: 'Kamanzai Kaijuka',
    role: 'Minerals Trade Expert',
    designation: 'Board of Directors',
    specialty: 'Cross-Border Bullion Economics, ICGLR Certification & LBMA Spot Parity Structuring',
    bio: 'Kamanzai Kaijuka serves on the Board of Directors as Minerals Trade Expert, overseeing regional bullion market structure, refinery offtake economics, and statutory export compliance. With deep institutional command of East African mineral flows, URA 5% export levy frameworks, and international bullion settlement mechanics, he advises visiting delegations on distinguishing legitimate aggregator margins from economically impossible discount decoys.',
    credentials: [
      'Board Advisor on Uganda Mining & Minerals Act 2022 Commercial Compliance',
      'Specialist in ICGLR Regional Certification Mechanism (RCM) & Refinery Chain-of-Custody',
      'Senior Analyst on Great Lakes Artisanal & Industrial Gold Pricing Dynamics'
    ],
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    linkedinUrl: 'https://www.linkedin.com/'
  },
  {
    id: 'board-3',
    name: 'Ronnie Mugarura',
    role: 'Operations, Logistics and Strategy',
    designation: 'Board of Directors',
    specialty: 'Sovereign Field Security, B6 Armored Convoy Operations & Diplomatic Protocol',
    bio: 'Ronnie Mugarura serves on the Board of Directors leading Operations, Logistics and Strategy. He orchestrates the end-to-end execution of our 7-day physical supply chain expeditions—coordinating Entebbe VIP diplomatic clearances, dedicated B6 armored executive motorcades, close-protection tactical details to Busia and Mubende concessions, and secure entry into bonded refineries and government ministries.',
    credentials: [
      'Director of Sovereign Expedition Logistics & B6 Armored Convoy Operations',
      'Strategic Liaison for Concession Site Access across Mubende, Kassanda & Busia',
      'Architect of Multi-Tier Executive Delegation Operations & Close-Protection Tactical Detail'
    ],
    imageUrl: '/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg',
    linkedinUrl: 'https://www.linkedin.com/'
  }
];

export const INITIAL_POSTS: ContentPost[] = [
  {
    id: 'post-1',
    title: 'Forensic Deconstruction: Why 15%–25% Gold Discounts in East Africa Are Always Advance-Fee Traps',
    category: 'Intelligence Briefing',
    summary: 'Lead Forensics Expert Mugisa Solomon Byakutaaga breaks down the mathematical and metallurgical reality of physical Dore bar settlements in Kampala and Entebbe.',
    body: `Every week, our forensic desk in Kampala receives urgent inquiries from European, Middle Eastern, and Asian principals holding glossy Full Corporate Offers (FCOs) promising 50kg to 500kg of 97%+ pure Au Dore bars at discounts of 15% to 25% below LBMA spot.

Here is the unvarnished economic reality: gold is global tier-1 money. In Uganda's licensed artisanal and industrial mining belts—from Mubende and Kassanda to Busia and Karamoja—licensed aggregators and bonded refineries compete daily to buy raw sponge gold and Dore bars with immediate spot cash at 98% to 99.2% of the London fix.

No legitimate miner or license holder in Uganda or the wider Great Lakes region ever needs to discount physical gold by 18% to attract a foreign buyer, nor do they lack the working capital to clear customs. The artificial "deep discount" is engineered for one psychological purpose: to induce a foreign buyer to pay $35,000 to $150,000 upfront for fabricated URA 5% export taxes, DGSM documentation fees, or private legal escrow retainers before a single gram of gold is fire-assayed at an accredited refinery.

Before wiring a single dollar, demand verified DGSM Mineral Cadastre coordinates and independent fire-assay cupellation under buyer supervision.`,
    author: 'Mugisa Solomon Byakutaaga',
    authorRole: 'Director · Lead Forensics Expert',
    date: '2026-05-02',
    published: true,
    imageUrl: '/src/assets/images/scam_academy_forensics_1793632189342.jpg',
    readTime: '6 min read',
    tags: ['Forensic Audit', 'Advance-Fee Fraud', 'LBMA Pricing', 'Due Diligence']
  },
  {
    id: 'post-2',
    title: 'Navigating the Uganda Mining and Minerals Act 2022: ICGLR Certification & URA Export Compliance',
    category: 'Regulatory Alert',
    summary: 'Minerals Trade Expert Kamanzai Kaijuka outlines the mandatory statutory chain of custody required for lawful gold export through Entebbe International Airport.',
    body: `The enactment of the Uganda Mining and Minerals Act 2022 fundamentally modernized how precious minerals are licensed, smelted, taxed, and exported from the Republic of Uganda. For institutional commodity buyers and sovereign funds, understanding the statutory architecture is the primary defense against counterfeit paperwork.

First, every lawful gold transaction must originate from a verifiable license in the Directorate of Geological Survey and Mines (DGSM) online Mineral Cadastre in Entebbe. Paper PDFs sent over WhatsApp or email bearing scanned stamps are routinely forged using expired quarry or exploration numbers.

Second, regional origin traceability is governed by the International Conference on the Great Lakes Region (ICGLR) Regional Certification Mechanism (RCM). Legitimate bonded refineries in Kampala and Entebbe maintain strict chain-of-custody logs matched with Uganda Revenue Authority (URA) ASYCUDA World customs assessments.

Crucially, statutory export levies (5% on refined/unrefined gold exports) are assessed directly through official URA government payment portals generates via ASYCUDA PRNs—never through private commercial law firm bank accounts or third-party logistics agents.`,
    author: 'Kamanzai Kaijuka',
    authorRole: 'Director · Minerals Trade Expert',
    date: '2026-04-28',
    published: true,
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    readTime: '5 min read',
    tags: ['Mining Act 2022', 'ICGLR', 'URA Customs', 'Trade Compliance']
  },
  {
    id: 'post-3',
    title: 'Field Dispatch: Executing Secure Multi-Site Concession Audits Across Busia and Kassanda',
    category: 'Field Dispatch',
    summary: 'Director of Operations Ronnie Mugarura details how physical pithead inspections and B6 armored convoy operations eliminate broker smoke-and-mirrors.',
    body: `Fraudulent gold syndicates thrive in the gap between five-star hotel lobbies in Kampala and the actual geological realities of Uganda's mining districts. Brokers routinely stage theatrical meetings in rented boardrooms while claiming ownership of massive industrial concessions they have never set foot on.

During our 7-Day Uganda Gold Expedition, our Operations & Strategy Directorate eliminates this information asymmetry by taking principals directly to the source. Utilizing diplomatic protocol clearances, dedicated B6 armored executive motorcades, and close-protection tactical details from Entebbe, delegates inspect active greenstone belt hard-rock mines in Busia and alluvial/eluvial operations in Mubende and Kassanda.

On the ground, delegates witness gravity concentrators, ball mills, and carbon-in-leach (CIL) circuits in real time, interviewing licensed mine engineers and verifying geological output capacity against the tonnage promised in seller offers. Walking the physical supply chain transforms abstract paper risk into verifiable operational certainty.`,
    author: 'Ronnie Mugarura',
    authorRole: 'Director · Operations, Logistics and Strategy',
    date: '2026-04-24',
    published: true,
    imageUrl: '/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg',
    readTime: '5 min read',
    tags: ['Field Logistics', 'Busia Gold Belt', 'Concession Audit', 'Operations']
  },
  {
    id: 'post-4',
    title: 'Metallurgical Alert: Detecting Sintered Tungsten-Core Dore Bars Beyond Surface XRF Scans',
    category: 'Intelligence Briefing',
    summary: 'Why handheld X-Ray Fluorescence (XRF) analyzers fail on thick gold-cladded counterfeit bars—and why destructive fire assay cupellation is non-negotiable.',
    body: `Our Entebbe forensic laboratory recently deconstructed three counterfeit Dore bars presented to a visiting European family office. On a standard handheld XRF spectrometer, the bars registered 99.6% Au purity.

Why did the XRF pass a counterfeit bar? X-Ray Fluorescence is strictly a surface-level diagnostic tool; its beam penetrates only 10 to 50 micrometers into the metal skin. Criminal metallurgists increasingly electroplate or fuse a 1.5mm jacket of genuine 24-karat gold around a core of sintered tungsten rods—chosen because tungsten's atomic density (19.25 g/cm³) is virtually identical to pure gold (19.32 g/cm³), defeating basic weight-and-displacement checks.

To guarantee metallurgical integrity, our protocol mandates two non-negotiable procedures at a licensed Kampala or Entebbe refinery: (1) Ultrasonic pulse-echo velocity scanning across all axes to detect internal acoustic impedance boundaries, and (2) full homogeneous melting in an induction furnace followed by dual-sample drillings and 1050°C Fire Assay Cupellation before any financial settlement is authorized.`,
    author: 'Mugisa Solomon Byakutaaga & Dr. Michael Ssemwogerere',
    authorRole: 'Forensic Metallurgy Desk',
    date: '2026-04-19',
    published: true,
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    readTime: '7 min read',
    tags: ['Metallurgy', 'XRF vs Fire Assay', 'Tungsten Counterfeit', 'Lab Protocol']
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Sovereign Metallurgical Inspection Vault',
    caption: 'Granite inspection bench with precision XRF analyzer and pure gold Dore bar under forensic lighting.',
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-05-01'
  },
  {
    id: 'photo-2',
    title: 'Scam Academy Forensics Desk',
    caption: 'Fire assay crucibles, digital micro-balance displaying troy ounces, and seized counterfeit title deeds.',
    imageUrl: '/src/assets/images/scam_academy_forensics_1793632189342.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-04-29'
  },
  {
    id: 'photo-3',
    title: 'Dedicated B6 Armored Executive Motorcade & Tactical Detail',
    caption: 'Armored 4x4 executive convoy and close-protection tactical detail connecting Entebbe tarmac with Busia and Mubende concessions.',
    imageUrl: '/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg',
    category: 'VIP Transport',
    dateAdded: '2026-04-25'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    email: 'mwesigye@ugandagold.org',
    role: 'Senior Due Diligence Officer',
    accessLevel: 'staff',
    phone: '+256 772 400 119',
    activeCasesCount: 6
  },
  {
    id: 'staff-2',
    name: 'Dr. Michael Ssemwogerere',
    email: 'ssemwogerere@ugandagold.org',
    role: 'Metallurgical Forensic Lead',
    accessLevel: 'staff',
    phone: '+256 701 332 890',
    activeCasesCount: 4
  },
  {
    id: 'staff-3',
    name: 'Adv. David Kigozi',
    email: 'kigozi@ugandagold.org',
    role: 'Legal Compliance Counsel',
    accessLevel: 'staff',
    phone: '+256 782 551 240',
    activeCasesCount: 6
  },
  {
    id: 'staff-4',
    name: 'Eng. Sarah Nakato',
    email: 'nakato@ugandagold.org',
    role: 'Field Logistics Lead',
    accessLevel: 'staff',
    phone: '+256 754 118 702',
    activeCasesCount: 3
  }
];

export const INITIAL_DOCUMENT_VERIFICATIONS: DocumentVerification[] = [
  {
    id: 'DOC-VER-2026-4401',
    clientName: 'Henrik Lindqvist',
    companyName: 'Nordic Bullion Treasury AB',
    email: 'h.lindqvist@nordicbullion.se',
    phone: '+46 8 501 2290',
    documentType: 'Full Corporate Offer (FCO)',
    claimedSeller: 'Victoria Nile Gold Syndicate Ltd',
    claimedQuantityKg: '150 kg',
    claimedDiscountPercent: '22% below LBMA',
    documentTextOrNotes: 'FCO claims 150kg Au Dore bars stored at Entebbe customs warehouse. Requests $65,000 USD wire to private legal counsel escrow for URA 5% export clearance before buyer can view bars.',
    fileName: 'FCO_VictoriaNile_150KG_Stamped.pdf',
    feeUsd: 2500,
    paymentStatus: 'paid',
    paymentRef: 'UGE-CARD-DOC-4401',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'assigned_to_staff_1',
    submittedAt: '2026-05-01 11:20 UTC',
    slaDeadline: '2026-05-04 11:20 UTC (Within 24–72 Hours)',
    aiAnalysis: {
      riskScore: 98,
      verdict: 'CRITICAL COUNTERFEIT RISK',
      executiveSummary: 'AI Forensic Deconstruction confirms textbook Advance-Fee Gold Fraud. A 22% discount on liquid bullion is economically impossible, and URA never collects export tax via private attorney escrow accounts.',
      redFlags: [
        '22% below LBMA spot discount is a mathematical impossibility in physical bullion markets.',
        'Upfront $65,000 fee routed to a private lawyer account instead of official URA ASYCUDA tax portal.',
        'Seller entity "Victoria Nile Gold Syndicate Ltd" does not hold an active Mineral Dealer License (MDL) in the DGSM Cadastre.'
      ],
      statutoryCrossCheck: 'Violates Section 142 of the Uganda Mining and Minerals Act 2022 & URA Single Customs Territory statutory payment rules.',
      staffActionPlan: [
        'Staff Officer 1 to pull official DGSM negative registry certificate for client dossier.',
        'Cross-reference attorney escrow bank coordinates with FIA financial intelligence alert list.',
        'Compile final signed PDF audit report and dispatch to Henrik Lindqvist within 24–72 hour SLA.'
      ]
    },
    staffFollowUpNotes: 'DGSM search confirmed entity is unlicensed. Preparing final stamped verification report for client dispatch.'
  },
  {
    id: 'DOC-VER-2026-3910',
    clientName: 'Alexander Vance',
    companyName: 'Apex Precious Metals DMCC',
    email: 'a.vance@apexmetals.ae',
    phone: '+971 50 882 1902',
    documentType: 'DGSM Mineral License',
    claimedSeller: 'Kassanda Consolidated Gold Mines Ltd',
    claimedQuantityKg: '200 kg',
    claimedDiscountPercent: '18% below LBMA',
    documentTextOrNotes: 'Submitted alleged DGSM License #MDL-2026-0094 and URA customs bond forms for 200kg Dore bars from Kassanda.',
    fileName: 'DGSM_License_Kassanda_0094.pdf',
    feeUsd: 2500,
    paymentStatus: 'paid',
    paymentRef: 'UGE-CARD-DOC-3910',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'dispatched_to_client',
    submittedAt: '2026-04-28 08:40 UTC',
    slaDeadline: '2026-04-29 08:40 UTC (Completed in 24–72h SLA)',
    aiAnalysis: {
      riskScore: 94,
      verdict: 'CRITICAL COUNTERFEIT RISK',
      executiveSummary: 'Forged DGSM Mineral Dealer License detected. Serial number #MDL-2026-0094 belongs to an expired industrial limestone quarry permit, and the QR holographic seal is digitally superimposed.',
      redFlags: [
        'License serial #MDL-2026-0094 is registered to a non-precious minerals quarry in Tororo, not Kassanda.',
        '18% discount offer coupled with advance security logistics fee prior to Entebbe refinery fire assay.',
        'Counterfeit Commissioner signature stamp from 2019 regulatory template.'
      ],
      statutoryCrossCheck: 'Confirmed fraudulent instrument under Uganda Mining and Minerals Act 2022.',
      staffActionPlan: [
        'Verified physical DGSM registry ledger in Entebbe.',
        'Issued certified negative verification certificate to client.'
      ]
    },
    staffFollowUpNotes: 'APPROVED & RELEASED BY STAFF OFFICER 1: Physical check at Entebbe DGSM Cadastre confirmed license #MDL-2026-0094 is a forgery. Full report unlocked for client download.'
  },
  {
    id: 'DOC-VER-2026-5102',
    clientName: 'Elena Rostova',
    companyName: 'Helvetic Bullion Partners SA',
    email: 'elena@helveticbullion.ch',
    phone: '+41 22 819 0422',
    documentType: 'URA Customs / Export Permit',
    claimedSeller: 'East African Sovereign Bullion Logistics',
    claimedQuantityKg: '85 kg',
    claimedDiscountPercent: '15% below LBMA',
    documentTextOrNotes: 'Submitted alleged URA ASYCUDA World export declaration and UN transit stamp for 85kg Dore bars awaiting Entebbe airfreight.',
    fileName: 'URA_ExportPermit_85KG_Draft.pdf',
    feeUsd: 2500,
    paymentStatus: 'pending',
    paymentRef: 'AWAITING-CARD-AUTH',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'analyzing',
    submittedAt: '2026-05-02 09:05 UTC',
    slaDeadline: '24–72h Clock Starts Upon $2,500 Payment'
  }
];

export const INITIAL_REGISTRATIONS: ExpeditionRegistration[] = [
  {
    id: 'REG-2026-8812',
    fullName: 'Alexander Vance',
    companyName: 'Apex Precious Metals DMCC',
    executiveTitle: 'Chief Investment Officer',
    country: 'United Arab Emirates',
    email: 'a.vance@apexmetals.ae',
    phone: '+971 50 882 1902',
    requestedTier: 'sovereign',
    delegatesCount: 2,
    cohortDate: 'Cohort 01: Jan 17–23, 2027',
    primaryObjective: 'Physical Gold Sourcing & Direct Refinery Verification',
    activeProposalDetails: 'Received an offer for 200kg Dore bars at 18% discount from an alleged Kassanda concession. Need forensic validation.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'approved',
    assignedStaff: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    internalNotes: 'OFAC, UN, UK HMT, EU sanctions and PEP screening clear. Corporate trade license validated in Dubai DMCC registry. Full package payment (USD 25,000 per person, inclusive of applicable Ugandan VAT) confirmed.',
    registeredAt: '2026-04-20',
    passportVerified: true,
    sanctionsPepClear: true,
    dgsmClearance: true,
    digitalSignature: {
      id: 'SIG-881201',
      targetId: 'REG-2026-8812',
      targetType: 'expedition_registration',
      agreementTitle: 'Sovereign Field Expedition Charter, Non-Transaction Covenant & Security Protocol Agreement',
      signerFullName: 'Alexander Vance',
      signerTitle: 'Chief Investment Officer',
      signerCompany: 'Apex Precious Metals DMCC',
      signerEmail: 'a.vance@apexmetals.ae',
      passportOrIdNumber: 'PASS-UAE-7749201',
      signatureMethod: 'typed_calligraphy',
      signatureDataUrl: '',
      typedSignatureText: 'Alexander Vance',
      clausesAccepted: [
        'Article I (Strict Non-Transaction Covenant): I acknowledge that Uganda Gold Expedition is strictly an educational, forensic inspection, and due diligence mission under the Uganda Mining and Minerals Act 2022, and does not broker, buy, or sell physical bullion during field operations.',
        'Article II (Statutory KYC & Sanctions Screening Compliance): I consent to OFAC, UN, UK HMT, EU sanctions and PEP screening included with my selected expedition package for DGSM Entebbe and bonded refinery security accreditation.',
        'Article III (Field Security & Chain-of-Custody Compliance): I agree to abide by all safety directives issued by the Operations & Strategy Directorate during dedicated B6 armored executive motorcade ground transfers and active mine pithead inspections.'
      ],
      sha256SealHash: 'SHA256:9F84A2C1E77B3409D1128AF04E7C88B2',
      signedAtUtc: '2026-04-21 09:42:18 UTC',
      certificateSerial: 'UGE-CERT-2026-881204'
    }
  },
  {
    id: 'REG-2026-9041',
    fullName: 'Elena Rostova',
    companyName: 'Helvetic Bullion Partners SA',
    executiveTitle: 'Managing Partner',
    country: 'Switzerland',
    email: 'elena@helveticbullion.ch',
    phone: '+41 22 819 0422',
    requestedTier: 'trader',
    delegatesCount: 1,
    cohortDate: 'Cohort 01: Jan 17–23, 2027',
    primaryObjective: 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: 'Auditing 2 WhatsApp contracts with alleged UN transit stamps.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'under_review',
    assignedStaff: 'Adv. David Kigozi',
    internalNotes: 'Paid in Full (USD 15,000, inclusive of applicable Ugandan VAT). OFAC, UN, UK HMT, EU sanctions and PEP screening complete; awaiting DGSM security registry cross-match.',
    registeredAt: '2026-04-27',
    passportVerified: true,
    sanctionsPepClear: true,
    dgsmClearance: false
  },
  {
    id: 'REG-2026-9218',
    fullName: 'Zhang Wei',
    companyName: 'Sino-East Resource Fund',
    executiveTitle: 'Director of African Commodities',
    country: 'China',
    email: 'zhang.wei@sinoeast-res.com',
    phone: '+86 139 1022 8411',
    requestedTier: 'sovereign',
    delegatesCount: 3,
    cohortDate: 'Cohort 02: Mar 14–20, 2027',
    primaryObjective: 'Mining Concession Acquisition & Cadastre Title Audit',
    activeProposalDetails: 'Evaluating exploration permits in Karamoja gold belt.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'pending',
    status: 'pending_kyc',
    assignedStaff: 'Eng. Sarah Nakato',
    internalNotes: 'Registration received. Pending package settlement before OFAC, UN, UK HMT, EU sanctions and PEP screening commences.',
    registeredAt: '2026-05-01',
    passportVerified: false,
    sanctionsPepClear: false,
    dgsmClearance: false
  }
];

export const INITIAL_FIELD_LOGS: FieldLog[] = [
  {
    id: 'LOG-701',
    staffName: 'Eng. Sarah Nakato',
    location: 'Mubende Artisanal Belt (Pit 4B)',
    logDate: '2026-04-30',
    title: 'Gravity Concentrator Inspection & Safety Perimeter',
    observations: 'Inspected 3 operational licensed pits. Panning yield consistent with 2.8g/ton rock vein. Local miners reported 2 unauthorized brokers soliciting fake export paperwork.',
    riskAssessment: 'Medium',
    testResults: 'Raw sponge gold density test: 17.8 g/cm³ (approx. 88% Au content).'
  },
  {
    id: 'LOG-702',
    staffName: 'Dr. Michael Ssemwogerere',
    location: 'Kampala Bonded Refinery No. 2',
    logDate: '2026-04-26',
    title: 'Fire Assay Calibration & URA Customs Electronic Seal',
    observations: 'Calibrated laboratory cupellation muffle furnace at 1050°C. Witnessed URA electronic seal application on 25kg export lot destined for Emirates flight.',
    riskAssessment: 'Low',
    testResults: 'Cupellation assay verified 999.6 fine purity. ASYCUDA customs declaration matching.'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-8800',
    reference: 'UGE-PAY-DOC-4401',
    customerName: 'Henrik Lindqvist',
    email: 'h.lindqvist@nordicbullion.se',
    amount: 2500,
    currency: 'USD',
    type: 'doc_verification',
    status: 'Completed',
    cardBrand: 'Online Settlement',
    date: '2026-05-01 11:18',
    tier: '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)'
  },
  {
    id: 'PAY-8801',
    reference: 'UGE-PAY-8812',
    customerName: 'Alexander Vance',
    email: 'a.vance@apexmetals.ae',
    amount: 25000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Online Settlement',
    date: '2026-04-20 14:22',
    tier: 'Sovereign Executive · Diplomatic VIP (Paid in Full, VAT Incl.)'
  },
  {
    id: 'PAY-8802',
    reference: 'UGE-PAY-9041',
    customerName: 'Elena Rostova',
    email: 'elena@helveticbullion.ch',
    amount: 15000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Online Settlement',
    date: '2026-04-27 09:14',
    tier: 'Professional Trader (Paid in Full, VAT Incl.)'
  },
  {
    id: 'PAY-8803',
    reference: 'UGE-PAY-7119',
    customerName: 'Tariq Al-Mansoor',
    email: 'tariq@almansoor-gold.ae',
    amount: 15000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Online Settlement',
    date: '2026-04-18 16:45',
    tier: 'Professional Trader (Paid in Full, VAT Incl.)'
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'AUDIT-2026-9012',
    timestamp: '2026-05-02 10:15:24 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin',
    category: 'content_update',
    action: 'Published Intelligence Article',
    targetId: 'gold-discount-advance-fee-traps',
    details: 'Published article "Why deep gold discounts demand independent verification" to public Insights library.'
  },
  {
    id: 'AUDIT-2026-9011',
    timestamp: '2026-05-01 16:42:10 UTC',
    actorEmail: 'mwesigye@ugandagold.org',
    actorRole: 'staff',
    category: 'document_approval',
    action: 'Approved & Dispatched 24–72h Verification Report',
    targetId: 'DOC-VER-2026-3910',
    details: 'Released certified DGSM Mineral License verification report for Jean-Luc Moreau (Geneva Sovereign Partners) following physical Entebbe registry audit.'
  },
  {
    id: 'AUDIT-2026-9010',
    timestamp: '2026-04-28 14:08:51 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin',
    category: 'user_role_change',
    action: 'Updated Staff Access Role',
    targetId: 'staff-1',
    details: 'Verified Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye) access level as Senior Due Diligence Officer (staff) with full dossier clearance privileges.'
  },
  {
    id: 'AUDIT-2026-9009',
    timestamp: '2026-04-25 09:30:12 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin',
    category: 'kyc_clearance',
    action: 'Approved Delegate KYC & DGSM Clearance',
    targetId: 'REG-2026-8812',
    details: 'Approved Sovereign Executive registration for Alexander Vance (Apex Precious Metals DMCC) after OFAC, UN, UK HMT, EU & PEP screening.'
  },
  {
    id: 'AUDIT-2026-9008',
    timestamp: '2026-04-22 11:19:05 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin',
    category: 'ux_config',
    action: 'Synchronized Global UX/UI Configuration',
    targetId: 'uiConfig/global',
    details: 'Enforced Zero-Trust Firestore Security Rules for per-user /uxPreferences/{userId} and /uiConfig/global.'
  }
];

