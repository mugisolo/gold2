export interface SeoBreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoRouteEntry {
  path: string;
  title: string;
  description: string;
  h1: string;
  primaryIntent: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  schemaType: 'WebPage' | 'Service' | 'Article' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  indexable: boolean;
  breadcrumbs: SeoBreadcrumbItem[];
  serviceName?: string;
  serviceType?: string;
  articleMeta?: {
    author: string;
    authorRole: string;
    reviewer: string;
    reviewerRole: string;
    datePublished: string;
    dateModified: string;
    section: 'Offer Risk' | 'Regulation' | 'Field Methods' | 'Metallurgy';
  };
}

export interface EditorialContentBrief {
  id: string;
  number: string;
  workingTitle: string;
  editorialCategory: 'Offer Risk' | 'Regulation' | 'Field Methods' | 'Metallurgy';
  readerQuestion: string;
  requiredEvidence: string[];
  expertReviewer: string;
  primarySource: string;
  relatedServicePage: {
    label: string;
    path: string;
  };
  relatedArticles: Array<{
    title: string;
    path: string;
  }>;
}

export const SITE_ORIGIN = 'https://goldsafaris.com';
export const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/og-goldsafaris-1200x630.jpg`;

export const PERMANENT_REDIRECTS: Record<string, string> = {
  '/verification': '/offer-verification',
  '/packages': '/expeditions/dates-packages',
  '/expeditions/dates': '/expeditions/dates-packages',
  '/expeditions/professional': '/expeditions/professional-traders',
  '/expeditions/academic': '/expeditions/academic-research',
  '/expeditions/institutional': '/expeditions/institutional-vip',
  '/blog': '/insights',
  '/about-us': '/about',
  '/insights/post-1': '/insights/gold-discount-advance-fee-traps',
  '/blog/post-1': '/insights/gold-discount-advance-fee-traps',
  '/insights/post-2': '/insights/uganda-mining-minerals-act-compliance',
  '/blog/post-2': '/insights/uganda-mining-minerals-act-compliance',
  '/insights/post-3': '/insights/secure-multi-site-concession-audits',
  '/blog/post-3': '/insights/secure-multi-site-concession-audits',
  '/insights/post-4': '/insights/tungsten-core-bars-xrf-fire-assay',
  '/blog/post-4': '/insights/tungsten-core-bars-xrf-fire-assay',
  '/blog/gold-discount-advance-fee-traps': '/insights/gold-discount-advance-fee-traps',
  '/blog/uganda-mining-minerals-act-compliance': '/insights/uganda-mining-minerals-act-compliance',
  '/blog/secure-multi-site-concession-audits': '/insights/secure-multi-site-concession-audits',
  '/blog/tungsten-core-bars-xrf-fire-assay': '/insights/tungsten-core-bars-xrf-fire-assay',
};

export const PRIVATE_NOINDEX_PREFIXES: string[] = [
  '/portal',
  '/client',
  '/staff',
  '/admin',
  '/apply',
  '/payment',
  '/login',
  '/register',
];

export const PUBLIC_SEO_ROUTES: Record<string, SeoRouteEntry> = {
  '/': {
    path: '/',
    title: 'Uganda Gold Due Diligence & Expeditions | Gold Safaris',
    description:
      'Independent gold offer verification, supply-chain due diligence and guided field expeditions in Uganda for traders, researchers and institutions.',
    h1: 'Verify the offer. Understand the supply chain.',
    primaryIntent: 'Uganda gold due diligence',
    canonicalUrl: `${SITE_ORIGIN}/`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  '/expeditions': {
    path: '/expeditions',
    title: 'Uganda Gold Due Diligence Expeditions | Gold Safaris',
    description:
      'Explore guided Uganda gold expeditions covering licensing, mines, refineries, assay methods, customs compliance and counterparty risk.',
    h1: 'Field-led gold supply-chain due diligence',
    primaryIntent: 'Uganda gold expedition',
    canonicalUrl: `${SITE_ORIGIN}/expeditions`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Uganda Gold Supply-Chain Due Diligence Expeditions',
    serviceType: 'Field Due Diligence and Supply-Chain Verification Programme',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
    ],
  },
  '/offer-verification': {
    path: '/offer-verification',
    title: 'Gold Offer Verification in Uganda | 24–72 Hour Review',
    description:
      'Submit an FCO, SPA or mineral licence for independent document review and field verification before you commit funds or enter a transaction.',
    h1: 'Verify a gold offer before you commit funds',
    primaryIntent: 'gold offer verification Uganda',
    canonicalUrl: `${SITE_ORIGIN}/offer-verification`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Independent Gold Offer & Document Verification in Uganda',
    serviceType: 'Counterparty Document and Mineral Registry Verification',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Offer Verification', path: '/offer-verification' },
    ],
  },
  '/risk-compliance': {
    path: '/risk-compliance',
    title: 'Gold Supply-Chain Risk & Compliance | Uganda',
    description:
      'Understand licensing, sanctions screening, chain of custody, assay validation and responsible-sourcing controls for East African gold supply chains.',
    h1: 'Evidence-led gold risk and compliance review',
    primaryIntent: 'Uganda gold compliance',
    canonicalUrl: `${SITE_ORIGIN}/risk-compliance`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Risk & Compliance', path: '/risk-compliance' },
    ],
  },
  '/about': {
    path: '/about',
    title: 'About Uganda Gold Expedition | Independent Due Diligence',
    description:
      'Meet the team and review the independence mandate, field methodology and compliance standards behind Uganda Gold Expedition.',
    h1: 'Independent due diligence, conducted in the field',
    primaryIntent: 'Uganda Gold Expedition team',
    canonicalUrl: `${SITE_ORIGIN}/about`,
    ogType: 'website',
    schemaType: 'AboutPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  '/insights': {
    path: '/insights',
    title: 'Gold Due Diligence Insights | Uganda Gold Expedition',
    description:
      'Field briefings on gold offer fraud, document verification, assay limits, Ugandan regulation and responsible mineral supply chains.',
    h1: 'Field intelligence for better gold decisions',
    primaryIntent: 'Uganda gold insights',
    canonicalUrl: `${SITE_ORIGIN}/insights`,
    ogType: 'website',
    schemaType: 'CollectionPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
    ],
  },
  '/expeditions/professional-traders': {
    path: '/expeditions/professional-traders',
    title: 'Gold Due Diligence for Traders | Uganda Field Expedition',
    description:
      'A field expedition for bullion traders, commodity desks and family offices assessing counterparties, offers, assays and export controls.',
    h1: 'Field due diligence for professional gold traders',
    primaryIntent: 'gold trader due diligence Uganda',
    canonicalUrl: `${SITE_ORIGIN}/expeditions/professional-traders`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Uganda Gold Field Expedition for Professional Traders',
    serviceType: 'Commercial Gold Counterparty and Supply-Chain Field Due Diligence',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
      { name: 'Professional Traders', path: '/expeditions/professional-traders' },
    ],
  },
  '/expeditions/academic-research': {
    path: '/expeditions/academic-research',
    title: 'Academic Gold Supply-Chain Research Expedition | Uganda',
    description:
      'A structured Uganda field programme for researchers, compliance students and policy teams studying gold supply chains and due diligence.',
    h1: 'Study gold supply chains where they operate',
    primaryIntent: 'Uganda gold research expedition',
    canonicalUrl: `${SITE_ORIGIN}/expeditions/academic-research`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Academic Gold Supply-Chain Research Expedition in Uganda',
    serviceType: 'Mineral Governance and Supply-Chain Field Study Programme',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
      { name: 'Academic Research', path: '/expeditions/academic-research' },
    ],
  },
  '/expeditions/institutional-vip': {
    path: '/expeditions/institutional-vip',
    title: 'Institutional Gold Due Diligence Delegations | Uganda',
    description:
      'Confidential Uganda field delegations for institutions and VIP principals requiring tailored supply-chain, compliance and counterparty review.',
    h1: 'Confidential field delegations for institutions',
    primaryIntent: 'institutional gold due diligence Uganda',
    canonicalUrl: `${SITE_ORIGIN}/expeditions/institutional-vip`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Institutional Gold Due Diligence Delegations in Uganda',
    serviceType: 'Bespoke Institutional Supply-Chain and Counterparty Field Review',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
      { name: 'Institutional Delegations', path: '/expeditions/institutional-vip' },
    ],
  },
  '/expeditions/itinerary': {
    path: '/expeditions/itinerary',
    title: '7-Day Uganda Gold Expedition Itinerary | Gold Safaris',
    description:
      'Review the seven-day field itinerary covering regulatory checks, document analysis, mine visits, refinery assay, customs and deal review.',
    h1: 'Seven days across the physical supply chain',
    primaryIntent: '7 day Uganda gold expedition',
    canonicalUrl: `${SITE_ORIGIN}/expeditions/itinerary`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
      { name: '7-Day Itinerary', path: '/expeditions/itinerary' },
    ],
  },
  '/expeditions/dates-packages': {
    path: '/expeditions/dates-packages',
    title: 'Uganda Gold Expedition Dates & Packages | Gold Safaris',
    description:
      'Compare expedition formats, inclusions, scheduled cohorts and application requirements for professional, academic and institutional visitors.',
    h1: 'Choose the right expedition format',
    primaryIntent: 'Uganda gold expedition packages',
    canonicalUrl: `${SITE_ORIGIN}/expeditions/dates-packages`,
    ogType: 'website',
    schemaType: 'Service',
    serviceName: 'Uganda Gold Expedition Formats, Dates & Packages',
    serviceType: 'Field Due-Diligence Expedition Programme Formats',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Expeditions', path: '/expeditions' },
      { name: 'Dates & Packages', path: '/expeditions/dates-packages' },
    ],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Uganda Gold Expedition | Gold Safaris',
    description:
      'Contact Uganda Gold Expedition about offer verification, field expeditions, research visits or institutional due-diligence delegations.',
    h1: 'Discuss your verification or field brief',
    primaryIntent: 'contact Uganda Gold Expedition',
    canonicalUrl: `${SITE_ORIGIN}/contact`,
    ogType: 'website',
    schemaType: 'ContactPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  '/insights/gold-discount-advance-fee-traps': {
    path: '/insights/gold-discount-advance-fee-traps',
    title: 'Gold Discount Offers and Advance-Fee Risk | Gold Safaris',
    description:
      'Learn why unusually large gold discounts warrant scrutiny, how advance-fee schemes operate and which independent checks to request before paying.',
    h1: 'Why deep gold discounts demand independent verification',
    primaryIntent: 'gold discount scam',
    canonicalUrl: `${SITE_ORIGIN}/insights/gold-discount-advance-fee-traps`,
    ogType: 'article',
    schemaType: 'Article',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      {
        name: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
    ],
    articleMeta: {
      author: 'Mugisa Solomon Byakutaaga',
      authorRole: 'Director · Lead Forensics Expert',
      reviewer: 'Kamanzai Kaijuka',
      reviewerRole: 'Director · Minerals Trade Expert',
      datePublished: '2026-05-02',
      dateModified: '2026-05-04',
      section: 'Offer Risk',
    },
  },
  '/insights/uganda-mining-minerals-act-compliance': {
    path: '/insights/uganda-mining-minerals-act-compliance',
    title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
    description:
      'A practical overview of licensing, ICGLR certification and customs compliance checks for Uganda gold supply-chain due diligence.',
    h1: 'Uganda gold regulation: a practical compliance framework',
    primaryIntent: 'Uganda Mining and Minerals Act 2022',
    canonicalUrl: `${SITE_ORIGIN}/insights/uganda-mining-minerals-act-compliance`,
    ogType: 'article',
    schemaType: 'Article',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      {
        name: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
    ],
    articleMeta: {
      author: 'Kamanzai Kaijuka',
      authorRole: 'Director · Minerals Trade Expert',
      reviewer: 'Adv. David Kigozi',
      reviewerRole: 'Legal Compliance Counsel',
      datePublished: '2026-04-28',
      dateModified: '2026-05-04',
      section: 'Regulation',
    },
  },
  '/insights/secure-multi-site-concession-audits': {
    path: '/insights/secure-multi-site-concession-audits',
    title: 'Field Guide to Multi-Site Gold Concession Audits',
    description:
      'A field framework for planning secure, evidence-led visits across multiple mining sites, including records, sampling and chain-of-custody controls.',
    h1: 'Planning secure, evidence-led multi-site concession audits',
    primaryIntent: 'gold concession audit Uganda',
    canonicalUrl: `${SITE_ORIGIN}/insights/secure-multi-site-concession-audits`,
    ogType: 'article',
    schemaType: 'Article',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      {
        name: 'Field Guide to Multi-Site Gold Concession Audits',
        path: '/insights/secure-multi-site-concession-audits',
      },
    ],
    articleMeta: {
      author: 'Ronnie Mugarura',
      authorRole: 'Director · Operations, Logistics and Strategy',
      reviewer: 'Eng. Sarah Nakato',
      reviewerRole: 'Field Logistics Lead',
      datePublished: '2026-04-24',
      dateModified: '2026-05-04',
      section: 'Field Methods',
    },
  },
  '/insights/tungsten-core-bars-xrf-fire-assay': {
    path: '/insights/tungsten-core-bars-xrf-fire-assay',
    title: 'Tungsten-Core Gold Bars: XRF Limits and Fire Assay',
    description:
      'Understand why surface XRF readings may miss tungsten-core bars and where independent sampling and fire assay fit within a verification process.',
    h1: 'Detecting tungsten-core bars beyond surface XRF',
    primaryIntent: 'tungsten core gold bars',
    canonicalUrl: `${SITE_ORIGIN}/insights/tungsten-core-bars-xrf-fire-assay`,
    ogType: 'article',
    schemaType: 'Article',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      {
        name: 'Tungsten-Core Gold Bars: XRF Limits and Fire Assay',
        path: '/insights/tungsten-core-bars-xrf-fire-assay',
      },
    ],
    articleMeta: {
      author: 'Mugisa Solomon Byakutaaga',
      authorRole: 'Director · Lead Forensics Expert',
      reviewer: 'Dr. Michael Ssemwogerere',
      reviewerRole: 'Metallurgical Forensic Lead',
      datePublished: '2026-04-19',
      dateModified: '2026-05-04',
      section: 'Metallurgy',
    },
  },
  // Supporting Public Reference Pages
  '/risk-compliance/supply-chain': {
    path: '/risk-compliance/supply-chain',
    title: 'Uganda Gold Supply-Chain Stages & Map | Gold Safaris',
    description:
      'Explore the five stages of Uganda’s regulated gold supply chain across extraction corridors, mineral dealers, refineries and export checkpoints.',
    h1: 'Supply-Chain Stages & Geographic Corridors',
    primaryIntent: 'Uganda gold supply chain stages',
    canonicalUrl: `${SITE_ORIGIN}/risk-compliance/supply-chain`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Risk & Compliance', path: '/risk-compliance' },
      { name: 'Supply-Chain Stages & Map', path: '/risk-compliance/supply-chain' },
    ],
  },
  '/risk-compliance/scam-check': {
    path: '/risk-compliance/scam-check',
    title: 'Active Gold Offer Risk-Assessment Tool | Gold Safaris',
    description:
      'Screen an active gold offer against pricing, customs, banking and assay warning signs and review practical due-diligence next steps.',
    h1: 'Scam-Risk Assessment Tool',
    primaryIntent: 'gold offer risk assessment',
    canonicalUrl: `${SITE_ORIGIN}/risk-compliance/scam-check`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Risk & Compliance', path: '/risk-compliance' },
      { name: 'Scam-Risk Assessment Tool', path: '/risk-compliance/scam-check' },
    ],
  },
  '/faq': {
    path: '/faq',
    title: 'Gold Due Diligence Frequently Asked Questions | Gold Safaris',
    description:
      'Answers to common questions on Ugandan mineral licensing, chain of custody, assay methods, export procedures and field expedition logistics.',
    h1: 'Frequently Asked Questions on Gold Due Diligence',
    primaryIntent: 'Uganda gold due diligence FAQ',
    canonicalUrl: `${SITE_ORIGIN}/faq`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  '/charter': {
    path: '/charter',
    title: 'Non-Transaction Legal Charter | Uganda Gold Expedition',
    description:
      'Review the strict non-transaction charter governing Uganda Gold Expedition’s independent due-diligence and field-verification mandate.',
    h1: 'Non-Transaction Legal Charter',
    primaryIntent: 'Uganda Gold Expedition charter',
    canonicalUrl: `${SITE_ORIGIN}/charter`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Legal Charter', path: '/charter' },
    ],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy & Document Confidentiality Policy | Gold Safaris',
    description:
      'How Uganda Gold Expedition protects submitted verification documents, counterparty files and participant identification data.',
    h1: 'Privacy & Document Handling Policy',
    primaryIntent: 'Uganda Gold Expedition privacy policy',
    canonicalUrl: `${SITE_ORIGIN}/privacy`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Engagement & Vetting Policy | Gold Safaris',
    description:
      'Review the terms of engagement, scope limitations, sanctions screening requirements and expedition credit policy for Uganda Gold Expedition.',
    h1: 'Terms of Engagement, Vetting & Fee Credit Policy',
    primaryIntent: 'Uganda Gold Expedition terms',
    canonicalUrl: `${SITE_ORIGIN}/terms`,
    ogType: 'website',
    schemaType: 'WebPage',
    indexable: true,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Engagement', path: '/terms' },
    ],
  },
};

export const PRIVATE_NOINDEX_ROUTES: Record<
  string,
  { title: string; description: string; h1: string }
> = {
  '/portal': {
    title: 'Client Portal | Uganda Gold Expedition',
    description: 'Authenticated client portal for verification dossiers and expedition records.',
    h1: 'Authenticated Client Portal',
  },
  '/client': {
    title: 'Client Workspace | Uganda Gold Expedition',
    description: 'Restricted client workspace for due-diligence documentation.',
    h1: 'Client Workspace',
  },
  '/staff': {
    title: 'Staff Officer Workspace | Uganda Gold Expedition',
    description: 'Restricted verification officer workspace.',
    h1: 'Staff Officer Workspace',
  },
  '/admin': {
    title: 'Administration | Uganda Gold Expedition',
    description: 'Restricted administrative console.',
    h1: 'Administrative Console',
  },
  '/apply': {
    title: 'Expedition Application & KYC Vetting | Uganda Gold Expedition',
    description:
      'Complete your expedition application, sanctions screening consent and Non-Transaction Agreement.',
    h1: 'Expedition Application & KYC Vetting',
  },
  '/payment': {
    title: 'Programme Settlement | Uganda Gold Expedition',
    description: 'Secure settlement portal for verification and expedition services.',
    h1: 'Programme Settlement',
  },
  '/login': {
    title: 'Sign In | Uganda Gold Expedition',
    description: 'Sign in to access your authenticated portal.',
    h1: 'Portal Sign In',
  },
  '/register': {
    title: 'Delegate Registration | Uganda Gold Expedition',
    description: 'Register for an upcoming Uganda Gold Expedition cohort.',
    h1: 'Delegate Registration',
  },
};

export const EDITORIAL_CONTENT_BRIEFS: EditorialContentBrief[] = [
  {
    id: 'brief-1',
    number: '01',
    workingTitle: 'How to verify a Ugandan mineral dealer licence',
    editorialCategory: 'Regulation',
    readerQuestion:
      'How can a prospective counterparty verify whether a Ugandan Mineral Dealer Licence (MDL) or Mining Lease PDF is active, authentic and covers precious metals?',
    requiredEvidence: [
      'DGSM online Mineral Cadastre Registry lookup procedure in Entebbe',
      'Comparison of licence classes (Exploration Licence, Mining Lease, Mineral Dealer Licence) under the Mining and Minerals Act 2022',
      'Examples of common document discrepancies (expired quarry permits, mismatched holder names, altered validity dates)',
    ],
    expertReviewer: 'Kamanzai Kaijuka (Minerals Trade Expert) & Adv. David Kigozi (Legal Compliance Counsel)',
    primarySource:
      'Republic of Uganda, Mining and Minerals Act 2022 (Gazetted October 2022) & Directorate of Geological Survey and Mines (DGSM) Cadastre Guidelines',
    relatedServicePage: {
      label: 'Submit a mineral licence for 24–72 hour verification',
      path: '/offer-verification',
    },
    relatedArticles: [
      {
        title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
      {
        title: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
    ],
  },
  {
    id: 'brief-2',
    number: '02',
    workingTitle: 'FCO vs SPA: what each document can and cannot establish',
    editorialCategory: 'Offer Risk',
    readerQuestion:
      'What is the legal and operational difference between a Full Corporate Offer (FCO) and a Sale and Purchase Agreement (SPA), and why does neither document prove physical gold availability?',
    requiredEvidence: [
      'Clause-by-clause comparison of non-binding commercial representations in an FCO versus enforceable conditions precedent in an SPA',
      'Analysis of why assay, title transfer and payment conditions must be tied to independent refinery verification',
      'Checklist of red-flag payment and penalty clauses frequently inserted into draft SPAs',
    ],
    expertReviewer: 'Mugisa Solomon Byakutaaga (Lead Forensics Expert) & Adv. David Kigozi (Legal Compliance Counsel)',
    primarySource:
      'Uganda Contract Act (Cap. 73) & OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas (3rd Ed.)',
    relatedServicePage: {
      label: 'Request an independent FCO or SPA document review',
      path: '/offer-verification',
    },
    relatedArticles: [
      {
        title: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
      {
        title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
    ],
  },
  {
    id: 'brief-3',
    number: '03',
    workingTitle: 'XRF vs fire assay: sampling, capabilities and limitations',
    editorialCategory: 'Metallurgy',
    readerQuestion:
      'When is non-destructive X-ray fluorescence (XRF) useful, and why is homogeneous melting with fire assay cupellation required before financial settlement?',
    requiredEvidence: [
      'Penetration depth data for handheld XRF spectrometers (10–50 micrometers) on doré and bullion bars',
      'Acoustic velocity and density comparison between pure gold (19.32 g/cm³) and sintered tungsten (19.25 g/cm³)',
      'Step-by-step protocol for induction melting, dual pin/drill sampling and ISO 11426 cupellation at 1,050°C',
    ],
    expertReviewer: 'Dr. Michael Ssemwogerere (Metallurgical Forensic Lead) & Mugisa Solomon Byakutaaga (Lead Forensics Expert)',
    primarySource:
      'ISO 11426:2021 (Determination of gold in gold jewellery alloys and bullion — Cupellation method)',
    relatedServicePage: {
      label: 'Examine refinery assay methods on the professional trader expedition',
      path: '/expeditions/professional-traders',
    },
    relatedArticles: [
      {
        title: 'Tungsten-Core Gold Bars: XRF Limits and Fire Assay',
        path: '/insights/tungsten-core-bars-xrf-fire-assay',
      },
      {
        title: 'Field Guide to Multi-Site Gold Concession Audits',
        path: '/insights/secure-multi-site-concession-audits',
      },
    ],
  },
  {
    id: 'brief-4',
    number: '04',
    workingTitle: 'ICGLR chain-of-custody evidence for regional mineral flows',
    editorialCategory: 'Regulation',
    readerQuestion:
      'What documentary and physical traceability evidence is required under the ICGLR Regional Certification Mechanism (RCM) for gold moving through the Great Lakes region?',
    requiredEvidence: [
      'Structure of the ICGLR Regional Certification Mechanism (mine site inspection, chain-of-custody tracking, regional certificate issuance)',
      'Distinction between lawful regional transit documentation and unverified messaging-app PDFs claiming "UN transit stamps"',
      'Alignment between ICGLR certificates, OECD Annex II risk management and Ugandan customs declarations',
    ],
    expertReviewer: 'Kamanzai Kaijuka (Minerals Trade Expert)',
    primarySource:
      'ICGLR Regional Certification Mechanism (RCM) Manual (2nd Ed.) & OECD Due Diligence Guidance Supplement on Gold',
    relatedServicePage: {
      label: 'Review chain-of-custody standards in the Risk & Compliance Hub',
      path: '/risk-compliance',
    },
    relatedArticles: [
      {
        title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
      {
        title: 'Field Guide to Multi-Site Gold Concession Audits',
        path: '/insights/secure-multi-site-concession-audits',
      },
    ],
  },
  {
    id: 'brief-5',
    number: '05',
    workingTitle: 'How to plan an evidence-led mine and refinery visit',
    editorialCategory: 'Field Methods',
    readerQuestion:
      'What preparation, site-access approvals and verification protocols are needed to conduct an effective mine and refinery due-diligence visit in Uganda?',
    requiredEvidence: [
      'Pre-visit registry verification checklist (concession coordinates, licence holder identity, site safety clearances)',
      'On-site observation criteria for artisanal sluicing/panning pits versus industrial crushing and Carbon-in-Leach (CIL) circuits',
      'Chain-of-custody controls when transporting or observing samples between extraction sites and refineries',
    ],
    expertReviewer: 'Ronnie Mugarura (Director of Operations, Logistics and Strategy) & Eng. Sarah Nakato (Field Logistics Lead)',
    primarySource:
      'Uganda Mining and Minerals Act 2022 & Directorate of Operations Field Inspection Standard (2026)',
    relatedServicePage: {
      label: 'Review the seven-day field itinerary across Uganda',
      path: '/expeditions/itinerary',
    },
    relatedArticles: [
      {
        title: 'Field Guide to Multi-Site Gold Concession Audits',
        path: '/insights/secure-multi-site-concession-audits',
      },
      {
        title: 'Tungsten-Core Gold Bars: XRF Limits and Fire Assay',
        path: '/insights/tungsten-core-bars-xrf-fire-assay',
      },
    ],
  },
  {
    id: 'brief-6',
    number: '06',
    workingTitle: 'A document checklist for responsible gold sourcing',
    editorialCategory: 'Regulation',
    readerQuestion:
      'Which corporate, regulatory, metallurgical and customs documents should institutional compliance teams assemble before approving an East African gold counterparty?',
    requiredEvidence: [
      'Beneficial ownership, corporate registry and OFAC/EU/UK/UN sanctions & PEP screening records',
      'Active DGSM licensing evidence, refinery accreditation records and ISO 11426 fire assay reports',
      'URA ASYCUDA World export declarations, official Payment Registration Numbers (PRNs) and ICGLR origin certificates',
    ],
    expertReviewer: 'Kamanzai Kaijuka (Minerals Trade Expert) & Lt. Col. (Rtd) Arthur Mwesigye (Senior Due Diligence Officer)',
    primarySource:
      'OECD Due Diligence Guidance for Responsible Supply Chains of Minerals (Five-Step Framework) & Uganda Anti-Money Laundering Act',
    relatedServicePage: {
      label: 'Explore academic and institutional research expeditions',
      path: '/expeditions/academic-research',
    },
    relatedArticles: [
      {
        title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
      {
        title: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
    ],
  },
  {
    id: 'brief-7',
    number: '07',
    workingTitle: 'An active gold offer risk-review checklist',
    editorialCategory: 'Offer Risk',
    readerQuestion:
      'What sequential checks should a buyer or family office perform within the first 48 hours of receiving a solicited or unsolicited East African gold offer?',
    requiredEvidence: [
      'Pricing benchmark comparison against local Kampala and Entebbe refinery purchase rates',
      'Verification of proposed payment routing (refinery/bank settlement after assay vs advance-fee demands)',
      'Cross-referencing of named licences, signatories and storage claims against primary registries',
    ],
    expertReviewer: 'Mugisa Solomon Byakutaaga (Lead Forensics Expert)',
    primarySource:
      'Financial Intelligence Authority (FIA) Uganda Typologies on Precious Metals Fraud & LBMA Precious Metals Code',
    relatedServicePage: {
      label: 'Verify an active gold offer before committing funds',
      path: '/offer-verification',
    },
    relatedArticles: [
      {
        title: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
      {
        title: 'Tungsten-Core Gold Bars: XRF Limits and Fire Assay',
        path: '/insights/tungsten-core-bars-xrf-fire-assay',
      },
    ],
  },
  {
    id: 'brief-8',
    number: '08',
    workingTitle: 'Ugandan customs and export documents: questions to verify before payment',
    editorialCategory: 'Regulation',
    readerQuestion:
      'How do Uganda Revenue Authority (URA) customs declarations and statutory export levies work, and why should buyers never wire tax or clearance funds to private third-party accounts?',
    requiredEvidence: [
      'Workflow of URA ASYCUDA World export declarations and official Payment Registration Number (PRN) generation',
      'Verification of customs seal procedures at Entebbe International Airport',
      'Indicators of fabricated customs holds, fake bonded warehouse receipts and unauthorized escrow accounts',
    ],
    expertReviewer: 'Kamanzai Kaijuka (Minerals Trade Expert) & Adv. David Kigozi (Legal Compliance Counsel)',
    primarySource:
      'East African Community Customs Management Act 2004 (as amended) & Uganda Revenue Authority ASYCUDA World Export Procedures',
    relatedServicePage: {
      label: 'Submit customs or export documents for independent verification',
      path: '/offer-verification',
    },
    relatedArticles: [
      {
        title: 'Uganda Mining and Minerals Act 2022: Compliance Guide',
        path: '/insights/uganda-mining-minerals-act-compliance',
      },
      {
        title: 'Gold Discount Offers and Advance-Fee Risk',
        path: '/insights/gold-discount-advance-fee-traps',
      },
    ],
  },
];

export function normalizePublicPath(rawPath: string): string {
  if (!rawPath) return '/';
  const withoutQuery = rawPath.split('?')[0].split('#')[0].trim();
  if (!withoutQuery || withoutQuery === '/') return '/';
  const lower = withoutQuery.toLowerCase();
  if (lower.length > 1 && lower.endsWith('/')) {
    return lower.slice(0, -1);
  }
  return lower;
}

export function getRedirectDestination(rawPath: string): string | null {
  const withoutQuery = rawPath.split('?')[0].split('#')[0].trim();
  const queryPart = rawPath.includes('?') ? '?' + rawPath.split('?').slice(1).join('?') : '';

  const normalized = normalizePublicPath(withoutQuery);
  if (PERMANENT_REDIRECTS[normalized]) {
    return PERMANENT_REDIRECTS[normalized] + queryPart;
  }

  // Redirect trailing slash on non-root public paths
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
    const stripped = withoutQuery.replace(/\/+$/, '');
    if (PUBLIC_SEO_ROUTES[stripped.toLowerCase()]) {
      return stripped.toLowerCase() + queryPart;
    }
  }

  return null;
}

export function isPrivateNoIndexPath(rawPath: string): boolean {
  const norm = normalizePublicPath(rawPath);
  return PRIVATE_NOINDEX_PREFIXES.some(
    (prefix) => norm === prefix || norm.startsWith(`${prefix}/`)
  );
}

export interface ResolvedSeoMetadata {
  status: 200 | 404;
  path: string;
  title: string;
  description: string;
  h1: string;
  robots: 'index,follow' | 'noindex,nofollow,noarchive';
  canonicalUrl: string;
  ogType: 'website' | 'article';
  jsonLd: Record<string, unknown>;
}

export function resolveSeoMetadata(rawPath: string): ResolvedSeoMetadata {
  const norm = normalizePublicPath(rawPath);

  // 1. Check Private / Noindex routes
  if (isPrivateNoIndexPath(norm)) {
    const basePrefix =
      PRIVATE_NOINDEX_PREFIXES.find((p) => norm === p || norm.startsWith(`${p}/`)) || '/portal';
    const meta = PRIVATE_NOINDEX_ROUTES[basePrefix] || PRIVATE_NOINDEX_ROUTES['/portal'];
    const canonicalUrl = `${SITE_ORIGIN}${basePrefix}`;
    return {
      status: 200,
      path: norm,
      title: meta.title,
      description: meta.description,
      h1: meta.h1,
      robots: 'noindex,nofollow,noarchive',
      canonicalUrl,
      ogType: 'website',
      jsonLd: buildStructuredDataGraph({
        path: basePrefix,
        title: meta.title,
        description: meta.description,
        h1: meta.h1,
        primaryIntent: 'restricted portal',
        canonicalUrl,
        ogType: 'website',
        schemaType: 'WebPage',
        indexable: false,
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: meta.h1, path: basePrefix }],
      }),
    };
  }

  // 2. Check Public Canonical Routes
  const publicRoute = PUBLIC_SEO_ROUTES[norm];
  if (publicRoute) {
    return {
      status: 200,
      path: publicRoute.path,
      title: publicRoute.title,
      description: publicRoute.description,
      h1: publicRoute.h1,
      robots: 'index,follow',
      canonicalUrl: publicRoute.canonicalUrl,
      ogType: publicRoute.ogType,
      jsonLd: buildStructuredDataGraph(publicRoute),
    };
  }

  // 3. Unknown route -> 404 Not Found
  return {
    status: 404,
    path: norm,
    title: 'Page Not Found (404) | Uganda Gold Expedition | Gold Safaris',
    description:
      'The requested page could not be found. Explore independent gold offer verification, risk and compliance guides, or field expeditions in Uganda.',
    h1: 'Page not found',
    robots: 'noindex,nofollow,noarchive',
    canonicalUrl: `${SITE_ORIGIN}${norm}`,
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Not Found (404)',
      description: 'The requested page could not be found on Gold Safaris / Uganda Gold Expedition.',
      url: `${SITE_ORIGIN}${norm}`,
    },
  };
}

export function buildStructuredDataGraph(route: SeoRouteEntry): Record<string, unknown> {
  const orgNode: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Uganda Gold Expedition',
    alternateName: 'Gold Safaris',
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/assets/aistudio/uge-logo-emblem-dark.png`,
      width: 512,
      height: 512,
    },
    description:
      'Independent gold offer verification, supply-chain due diligence and guided field expeditions in Uganda for traders, researchers and institutions.',
    address: {
      '@type': 'PostalAddress',
      postOfficeBoxNumber: 'P.O. Box 122234',
      streetAddress: 'Bugonga, Entebbe & Amber House Secretariat, Kampala',
      addressLocality: 'Entebbe',
      addressCountry: 'UG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Due Diligence & Verification Desk',
      email: 'compliance@ugandagoldexpedition.com',
      areaServed: 'UG',
      availableLanguage: ['en'],
    },
  };

  const websiteNode: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: 'Uganda Gold Expedition | Gold Safaris',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    inLanguage: 'en',
  };

  const breadcrumbNode: Record<string, unknown> = {
    '@type': 'BreadcrumbList',
    '@id': `${route.canonicalUrl}#breadcrumb`,
    itemListElement: route.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${crumb.path}`,
    })),
  };

  const webPageNode: Record<string, unknown> = {
    '@type':
      route.schemaType === 'AboutPage' ||
      route.schemaType === 'ContactPage' ||
      route.schemaType === 'CollectionPage'
        ? route.schemaType
        : 'WebPage',
    '@id': `${route.canonicalUrl}#webpage`,
    url: route.canonicalUrl,
    name: route.title,
    headline: route.h1,
    description: route.description,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: { '@id': `${SITE_ORIGIN}/#organization` },
    breadcrumb: { '@id': `${route.canonicalUrl}#breadcrumb` },
    inLanguage: 'en',
  };

  const graph: Array<Record<string, unknown>> = [orgNode, websiteNode, webPageNode, breadcrumbNode];

  if (route.schemaType === 'Service' && route.serviceName) {
    graph.push({
      '@type': 'Service',
      '@id': `${route.canonicalUrl}#service`,
      name: route.serviceName,
      serviceType: route.serviceType || 'Mineral Supply-Chain Due Diligence',
      description: route.description,
      url: route.canonicalUrl,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      areaServed: {
        '@type': 'Country',
        name: 'Uganda',
      },
    });
  }

  if (route.schemaType === 'Article' && route.articleMeta) {
    graph.push({
      '@type': 'Article',
      '@id': `${route.canonicalUrl}#article`,
      mainEntityOfPage: { '@id': `${route.canonicalUrl}#webpage` },
      headline: route.h1,
      name: route.title,
      description: route.description,
      articleSection: route.articleMeta.section,
      datePublished: route.articleMeta.datePublished,
      dateModified: route.articleMeta.dateModified,
      author: {
        '@type': 'Person',
        name: route.articleMeta.author,
        jobTitle: route.articleMeta.authorRole,
      },
      reviewedBy: {
        '@type': 'Person',
        name: route.articleMeta.reviewer,
        jobTitle: route.articleMeta.reviewerRole,
      },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      image: [SOCIAL_IMAGE_URL],
      inLanguage: 'en',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function escapeHtmlAttr(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildSeoHeadBlock(meta: ResolvedSeoMetadata): string {
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeCanonical = escapeHtmlAttr(meta.canonicalUrl);
  const safeImage = escapeHtmlAttr(SOCIAL_IMAGE_URL);
  const jsonLdString = JSON.stringify(meta.jsonLd);

  return [
    `<!-- SEO_HEAD_START -->`,
    `    <title>${safeTitle}</title>`,
    `    <meta name="description" content="${safeDesc}" />`,
    `    <meta name="robots" content="${meta.robots}" />`,
    `    <link rel="canonical" href="${safeCanonical}" />`,
    `    <link rel="alternate" hreflang="en" href="${safeCanonical}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${safeCanonical}" />`,
    `    <meta property="og:site_name" content="Uganda Gold Expedition | Gold Safaris" />`,
    `    <meta property="og:type" content="${meta.ogType}" />`,
    `    <meta property="og:title" content="${safeTitle}" />`,
    `    <meta property="og:description" content="${safeDesc}" />`,
    `    <meta property="og:url" content="${safeCanonical}" />`,
    `    <meta property="og:image" content="${safeImage}" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="Uganda Gold Expedition independent document verification and field due diligence" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${safeTitle}" />`,
    `    <meta name="twitter:description" content="${safeDesc}" />`,
    `    <meta name="twitter:image" content="${safeImage}" />`,
    `    <script id="uge-json-ld" type="application/ld+json">${jsonLdString}</script>`,
    `    <!-- SEO_HEAD_END -->`,
  ].join('\n');
}

export function injectSeoHeadIntoHtml(rawHtml: string, rawPath: string): {
  html: string;
  meta: ResolvedSeoMetadata;
  status: 200 | 404;
  isNoIndex: boolean;
} {
  const meta = resolveSeoMetadata(rawPath);
  const headBlock = buildSeoHeadBlock(meta);
  const status = meta.status;
  const isNoIndex = meta.robots.startsWith('noindex');

  const markerRegex = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
  if (markerRegex.test(rawHtml)) {
    return {
      html: rawHtml.replace(markerRegex, headBlock),
      meta,
      status,
      isNoIndex,
    };
  }

  // Fallback if markers were stripped by bundler: strip old title/description/og/twitter/canonical/ld+json and inject before </head>
  const cleaned = rawHtml
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']alternate["']\s+hreflang=[^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
    .replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  return {
    html: cleaned.replace('</head>', `${headBlock}\n  </head>`),
    meta,
    status,
    isNoIndex,
  };
}

export function generateSitemapXml(): string {
  const indexableRoutes = Object.values(PUBLIC_SEO_ROUTES).filter((r) => r.indexable);
  const lastmod = '2026-05-04';

  const urlEntries = indexableRoutes
    .map((route) => {
      const priority =
        route.path === '/'
          ? '1.0'
          : route.path === '/offer-verification' ||
            route.path === '/expeditions' ||
            route.path === '/risk-compliance'
          ? '0.9'
          : route.path.startsWith('/expeditions/') || route.path === '/insights' || route.path === '/about'
          ? '0.8'
          : '0.7';
      return [
        '  <url>',
        `    <loc>${route.canonicalUrl}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
  ].join('\n');
}

export function generateRobotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /portal',
    'Disallow: /client',
    'Disallow: /staff',
    'Disallow: /admin',
    'Disallow: /apply',
    'Disallow: /payment',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');
}
