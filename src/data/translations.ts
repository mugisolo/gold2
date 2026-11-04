import { Language, ItineraryDay, PackageTier, ScamRule, FaqItem, AboutContent, BoardMember } from '../types';
import {
  ITINERARY_DAYS,
  EXPEDITION_PACKAGES,
  SCAM_RULES,
  MARKET_REALITIES,
  LEGAL_CHARTER_PILLARS
} from './expeditionData';

export interface SupplyChainStepTranslation {
  id: string;
  stageNumber: string;
  name: string;
  location: string;
  realEntity: string;
  fraudRisk: string;
  dueDiligenceAction: string;
}

export interface TranslationStrings {
  // Navigation & Global
  navExpedition: string;
  navAboutUs: string;
  navBlog: string;
  navFoodChain: string;
  navScamImmunity: string;
  navPackages: string;
  navFaq: string;
  navCharter: string;
  navApplyCta: string;
  navAdminPanel: string;
  navClientPortal: string;
  navVerifyDoc: string;
  navPayCard: string;
  navRoleSwitcher: string;
  languageLabel: string;
  currencyLabel: string;

  // Geolocation Proposal Banner
  geoDetectedBadge: string;
  geoProposalText: string;
  geoApplyBtn: string;
  geoUseGpsBtn: string;
  geoGpsLocating: string;
  geoDismissBtn: string;
  geoProposedLangLabel: string;
  geoProposedCurrLabel: string;
  geoSimHubsLabel: string;

  // Hero
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroPillar1Title: string;
  heroPillar1Sub: string;
  heroPillar2Title: string;
  heroPillar2Sub: string;
  heroPillar3Title: string;
  heroPillar3Sub: string;
  heroCtaPrimary: string;
  heroCtaDocAudit: string;
  heroCtaPackages: string;
  heroCtaCardPay: string;
  heroCtaBriefing: string;
  heroDisclaimerTitle: string;
  heroDisclaimerText: string;
  heroKycNoticeTitle: string;
  heroKycNoticeText: string;
  heroStat1Label: string;
  heroStat1Sub: string;
  heroStat2Label: string;
  heroStat2Sub: string;
  heroStat3Label: string;
  heroStat3Sub: string;
  heroStat4Label: string;
  heroStat4Sub: string;

  // About Us Page
  aboutBackToHome: string;
  aboutReadBlogBtn: string;
  aboutEditAdminBtn: string;
  aboutBadge1: string;
  aboutBadge2: string;
  aboutRegisterBtn: string;
  aboutAuditBtn: string;
  aboutCharterBadge: string;
  aboutCharterTitle: string;
  aboutStatutoryLabel: string;
  aboutSecretariatLabel: string;
  aboutKpi1Label: string;
  aboutKpi2Label: string;
  aboutKpi3Label: string;
  aboutBoardBadge1: string;
  aboutBoardBadge2: string;
  aboutBoardTitle: string;
  aboutBoardSubtitle: string;
  aboutBoardEditBtn: string;
  aboutCoreMandate: string;
  aboutKeyCredentials: string;
  aboutDirectorateFooter: string;
  aboutExecProfile: string;
  aboutGalleryBadge: string;
  aboutGalleryTitle: string;
  aboutGalleryEditBtn: string;

  // Market Reality
  realitySectionBadge1: string;
  realitySectionBadge2: string;
  realitySectionTitle: string;
  realitySectionSubtitle: string;
  realityAuditBtn: string;
  realityImplicationLabel: string;
  realityTableTitle: string;
  realityTableSub: string;
  realityColVector: string;
  realityColPitch: string;
  realityColGround: string;

  // Supply Chain Pipeline
  supplyBadge1: string;
  supplyBadge2: string;
  supplyTitle: string;
  supplySubtitle: string;
  supplyStageWord: string;
  supplyCounterpartyLabel: string;
  supplyTrapTitle: string;
  supplyTrapWarning: string;
  supplyVerifyTitle: string;
  supplyVerifyNote: string;

  // Itinerary
  itineraryBadge1: string;
  itineraryBadge2: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  itineraryDayWord: string;
  itineraryRegisterBtn: string;
  itineraryMandateLabel: string;
  itineraryActivitiesLabel: string;
  itineraryRiskLabel: string;
  itineraryDeliverableLabel: string;
  itineraryPrevDay: string;
  itineraryNextDay: string;

  // Scam Immunity Tool
  scamBadge1: string;
  scamBadge2: string;
  scamToolTitle: string;
  scamToolSubtitle: string;
  scamSelectConditionsLabel: string;
  scamResetBtn: string;
  scamForensicAnalysisLabel: string;
  scamScoreHeader: string;
  scamVerdictCritical: string;
  scamVerdictCriticalDesc: string;
  scamVerdictHigh: string;
  scamVerdictHighDesc: string;
  scamVerdictElevated: string;
  scamVerdictElevatedDesc: string;
  scamVerdictClean: string;
  scamVerdictCleanDesc: string;
  scamNextStepsTitle: string;
  scamNextStep1: string;
  scamNextStep2: string;
  scamNextStep3: string;
  scamSubmitDocBtn: string;
  scamRegisterAuditBtn: string;

  // Pricing Packages
  packagesBadge1: string;
  packagesBadge2: string;
  packagesTitle: string;
  packagesSubtitle: string;
  packagesCurrencyLabel: string;
  packagesDatesLabel: string;
  packagesPopularBadge: string;
  packagesPerDelegate: string;
  packagesKycAllocationNote: string;
  packagesKycWarning: string;
  packagesIdealForLabel: string;
  packagesAccommodationLabel: string;
  packagesTransportLabel: string;
  packagesIncludedLabel: string;
  packagesDeliverablesLabel: string;
  packagesRegisterBtn: string;
  packagesPayDepositBtn: string;
  packagesPayFullBtn: string;
  packagesSovereignHeadline: string;
  packagesSovereignDesc: string;
  packagesSovereignBtn: string;

  // Blog Page
  blogBadge1: string;
  blogBadge2: string;
  blogTitle: string;
  blogSubtitle: string;
  blogPublishEditBtn: string;
  blogAllCategory: string;
  blogSearchPlaceholder: string;
  blogReadFullBtn: string;
  blogShareLabel: string;
  blogShareModalTitle: string;
  blogCopyCaptionBtn: string;
  blogCopiedMsg: string;

  // FAQ Section
  faqBadge1: string;
  faqBadge2: string;
  faqTitle: string;
  faqSubtitle: string;
  faqAskAiBtn: string;
  faqWabaBtn: string;
  faqCatAll: string;
  faqCatSupply: string;
  faqCatDiligence: string;
  faqCatLogistics: string;
  faqSearchPlaceholder: string;
  faqBottomTitle: string;
  faqBottomDesc: string;

  // Legal Charter & Footer
  charterBadge1: string;
  charterBadge2: string;
  charterTitle: string;
  charterSubtitle: string;
  charterAdvisoryTitle: string;
  charterAdvisoryText: string;
  footerTagline: string;
  footerStrictMandate: string;
  footerNavTitle: string;
  footerBoardTitle: string;
  footerSecretariatTitle: string;
  footerKycDisclosureTitle: string;
  footerKycDisclosureText: string;
  footerDisclaimer: string;
  footerRights: string;
}

export const translations: Record<Language, TranslationStrings> = {
  EN: {
    navExpedition: 'Expedition',
    navAboutUs: 'About Us',
    navBlog: 'Blog',
    navFoodChain: 'Supply Chain',
    navScamImmunity: 'Scam Immunity',
    navPackages: 'Packages',
    navFaq: 'FAQ',
    navCharter: 'Legal Charter',
    navApplyCta: 'Apply & Pay',
    navAdminPanel: 'Admin Panel',
    navClientPortal: 'Client Portal',
    navVerifyDoc: '24–72 Hour Forensic Document Verification',
    navPayCard: 'Online Payment',
    navRoleSwitcher: 'Staff & Portal Switcher',
    languageLabel: 'Language',
    currencyLabel: 'Currency',

    geoDetectedBadge: 'Geolocation Detected',
    geoProposalText: 'Based on your location, we recommend setting your default language and display currency to:',
    geoApplyBtn: 'Apply Recommended Settings',
    geoUseGpsBtn: 'Detect Exact GPS',
    geoGpsLocating: 'Locating via GPS...',
    geoDismissBtn: 'Keep Current',
    geoProposedLangLabel: 'Language',
    geoProposedCurrLabel: 'Currency',
    geoSimHubsLabel: 'Quick Regional Hubs:',

    heroBadge: 'Sovereign Physical Due Diligence · 24–72 Hour Forensic Document Verification',
    heroTitleLine1: 'Don’t Wire a Single Dollar',
    heroTitleHighlight: 'Until You Walk the Supply Chain.',
    heroTitleLine2: 'Or Verify Your Offer in 24–72 Hours.',
    heroSubtitle: "The world's only hands-on anti-fraud & due-diligence expedition across East Africa's gold trade architecture. Can't fly immediately? Submit any Full Corporate Offer (FCO), SPA, or license for a one-off 24–72 Hour Forensic Document Verification by our AI + Field Officer desk.",
    heroPillar1Title: '7-Day Physical Immersion',
    heroPillar1Sub: 'DGSM Cadastre, Refineries & Mines',
    heroPillar2Title: '24–72 Hour Forensic Document Verification',
    heroPillar2Sub: 'One-Off AI + Staff Officer 1 Verification',
    heroPillar3Title: 'Sovereign Chain of Custody',
    heroPillar3Sub: 'ICGLR, URA & Accredited Assay Verification',
    heroCtaPrimary: 'Apply for 7-Day Expedition',
    heroCtaDocAudit: '24–72 Hour Forensic Document Verification',
    heroCtaPackages: 'Explore 3 Expedition Tiers',
    heroCtaCardPay: 'Online Payment',
    heroCtaBriefing: 'Executive Briefing',
    heroDisclaimerTitle: 'Non-Transaction Mandate:',
    heroDisclaimerText: 'Strictly an educational and forensic due-diligence mission. We do NOT broker, buy, or sell gold.',
    heroKycNoticeTitle: 'KYC & Sanctions Vetting:',
    heroKycNoticeText: 'Included in every package (OFAC, UN, UK HMT, EU sanctions and PEP screening).',
    heroStat1Label: '7-Day Field Immersion',
    heroStat1Sub: 'Entebbe, Kampala, Mubende & Busia',
    heroStat2Label: '24–72 Hour Forensic Document Verification',
    heroStat2Sub: '24–72h AI + Staff Officer 1 Field Check',
    heroStat3Label: 'KYC & Sanctions Vetting',
    heroStat3Sub: 'Included in Every Package',
    heroStat4Label: 'Strict Non-Transaction',
    heroStat4Sub: '100% Independent Advisory Mandate',

    aboutBackToHome: 'Back to Expedition Overview',
    aboutReadBlogBtn: 'Read Intelligence Blog',
    aboutEditAdminBtn: 'Edit in Admin Panel',
    aboutBadge1: 'About Uganda Gold Expedition',
    aboutBadge2: 'Strict Non-Transaction Mandate',
    aboutRegisterBtn: 'Apply & Pay',
    aboutAuditBtn: '24–72 Hour Forensic Document Verification',
    aboutCharterBadge: 'Institutional Charter',
    aboutCharterTitle: 'Sovereign Independence Guarantee',
    aboutStatutoryLabel: 'Statutory Alignment',
    aboutSecretariatLabel: 'Operational Secretariats',
    aboutKpi1Label: 'Fraud Offers Intercepted',
    aboutKpi2Label: 'Fire Assay Verified',
    aboutKpi3Label: 'Forensic Dossier SLA',
    aboutBoardBadge1: 'Governance & Leadership',
    aboutBoardBadge2: 'Board of Directors',
    aboutBoardTitle: 'Board Members & Executive Directors',
    aboutBoardSubtitle: "Our Board of Directors unites East Africa's foremost authorities in metallurgical forensics, cross-border minerals trade law, and sovereign field logistics.",
    aboutBoardEditBtn: 'Add / Edit Board Members',
    aboutCoreMandate: 'Core Mandate',
    aboutKeyCredentials: 'Key Responsibilities & Credentials',
    aboutDirectorateFooter: 'Kampala & Entebbe Directorate',
    aboutExecProfile: 'Executive Profile',
    aboutGalleryBadge: 'Verified Field & Vault Documentation',
    aboutGalleryTitle: 'On-the-Ground Inspection Gallery',
    aboutGalleryEditBtn: 'Add / Modify Photos in Admin Panel',

    realitySectionBadge1: 'EMPIRICAL MARKET REALITY',
    realitySectionBadge2: 'THE $700M PARADOX',
    realitySectionTitle: 'Why Foreign Gold Buyers Lose Millions in Kampala',
    realitySectionSubtitle: 'Understanding the structural anatomy of the East African gold corridor is the difference between institutional security and total capital destruction.',
    realityAuditBtn: 'Audit Your Current Deal',
    realityImplicationLabel: 'Capital Implication',
    realityTableTitle: 'The Scammer’s Pitch vs. On-The-Ground Reality',
    realityTableSub: 'Every fraudulent syndicate relies on the exact same script. Here is what you will verify firsthand during the expedition.',
    realityColVector: 'Transaction Vector',
    realityColPitch: 'The WhatsApp / Broker Pitch (Fraud)',
    realityColGround: 'On-The-Ground Uganda Reality (Verified)',

    supplyBadge1: 'THE REAL SUPPLY CHAIN ARCHITECTURE',
    supplyBadge2: 'END-TO-END PHYSICAL CHAIN OF CUSTODY',
    supplyTitle: 'The East African Gold Food Chain',
    supplySubtitle: 'Deconstruct every link from the red-earth pitheads of Mubende to the tarmac bonded vault at Entebbe. See exactly where illegal syndicates insert fraudulent choke points.',
    supplyStageWord: 'STAGE',
    supplyCounterpartyLabel: 'Institutional Counterparty:',
    supplyTrapTitle: 'The Counterfeit Vulnerability & Trap',
    supplyTrapWarning: 'Warning: Unaudited paper guarantees at this stage lead to irrevocable wire losses.',
    supplyVerifyTitle: 'Uganda Gold Expedition Physical Verification',
    supplyVerifyNote: 'Delegates inspect physical registers, live tests, and official government seals in person.',

    itineraryBadge1: 'THE 7-DAY FIELD BLUEPRINT',
    itineraryBadge2: 'RESTRICTED EXECUTIVE SCHEDULE',
    itineraryTitle: '7-Day Physical Supply Chain Immersion',
    itinerarySubtitle: 'Walk every node of the gold trade from the Ministry mineral cadastre in Entebbe to artisanal pits, industrial mines, and bonded airport vaults.',
    itineraryDayWord: 'DAY',
    itineraryRegisterBtn: 'Apply & Pay',
    itineraryMandateLabel: 'Session Strategic Mandate',
    itineraryActivitiesLabel: 'Key Field Activities & Audit Points',
    itineraryRiskLabel: 'Risk Neutralized',
    itineraryDeliverableLabel: 'Executive Deliverable',
    itineraryPrevDay: '← Previous Day',
    itineraryNextDay: 'Next Day →',

    scamBadge1: 'FORENSIC DIAGNOSTIC SUITE',
    scamBadge2: 'INSTANT RED-FLAG AUDIT',
    scamToolTitle: 'The Scam Immunity Matrix & Deal Diagnostic',
    scamToolSubtitle: 'Audit your active gold offer against our 6-point forensic red-flag detector before committing capital.',
    scamSelectConditionsLabel: 'Select Observed Proposal Conditions',
    scamResetBtn: 'Reset All',
    scamForensicAnalysisLabel: 'Forensic Analysis:',
    scamScoreHeader: 'Forensic Vulnerability Score',
    scamVerdictCritical: 'CRITICAL FRAUD CERTAINTY',
    scamVerdictCriticalDesc: 'The offer exhibits textbook advance-fee confidence trick characteristics. Do not wire funds under any circumstances.',
    scamVerdictHigh: 'HIGH INSTITUTIONAL HAZARD',
    scamVerdictHighDesc: 'Multiple high-risk indicators detected. Contractual terms violate statutory East African customs protocols.',
    scamVerdictElevated: 'ELEVATED VULNERABILITY',
    scamVerdictElevatedDesc: 'Non-standard transaction conditions identified. Independent physical verification required.',
    scamVerdictClean: 'CLEAN BASELINE (NO FLAGS CHECKED)',
    scamVerdictCleanDesc: 'Select the parameters from your current proposal to run a forensic risk diagnosis.',
    scamNextStepsTitle: 'Mandatory Due Diligence Next Steps:',
    scamNextStep1: 'Cross-check seller license number on the official Uganda DGSM online portal.',
    scamNextStep2: 'Never wire advance funds for taxes, export levies, or UN transit clearance.',
    scamNextStep3: 'Demand drill and fire assay inside an accredited Entebbe bonded refinery.',
    scamSubmitDocBtn: '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)',
    scamRegisterAuditBtn: 'Apply & Pay for 7-Day Expedition',

    packagesBadge1: 'INSTITUTIONAL PARTICIPATION TIERS',
    packagesBadge2: 'ACCREDITED FIELD IMMERSION',
    packagesTitle: 'Executive Expedition Packages',
    packagesSubtitle: 'Tailored immersion tracks for academic researchers, professional bullion traders, and sovereign principals. All prices in USD, inclusive of applicable Ugandan VAT.',
    packagesCurrencyLabel: 'Currency Display:',
    packagesDatesLabel: '2027 Scheduled Expedition Windows:',
    packagesPopularBadge: 'Most Selected by Commodity Desks',
    packagesPerDelegate: '/ person',
    packagesKycAllocationNote: 'KYC & Sanctions Vetting Included (OFAC, UN, UK HMT, EU & PEP)',
    packagesKycWarning: 'All prices in USD, inclusive of applicable Ugandan VAT. Select and pay only for the exact expedition tier or forensic verification service you require. Statutory OFAC, UN, UK HMT, EU sanctions and PEP screening and government liaison processing are included in every expedition package with no separate standalone KYC deposit.',
    packagesIdealForLabel: 'Ideal Delegate Profile',
    packagesAccommodationLabel: 'Accommodation Standard',
    packagesTransportLabel: 'Field Transport & Security',
    packagesIncludedLabel: 'Included Immersion Access',
    packagesDeliverablesLabel: 'Executive Deliverables',
    packagesRegisterBtn: 'Apply & Pay',
    packagesPayDepositBtn: 'Apply & Pay',
    packagesPayFullBtn: 'Apply & Pay',
    packagesSovereignHeadline: 'Sovereign Executive · Diplomatic VIP Custom Delegations',
    packagesSovereignDesc: 'Tier 03 delegates travel via dedicated B6 armored executive motorcade & close-protection tactical detail for all field movements across Entebbe, Mubende, and Busia, accompanied by diplomatic police protection and our chief metallurgical analyst. Chartered helicopter transfers available on request at USD 3,000 per flight hour.',
    packagesSovereignBtn: 'Apply & Pay — Sovereign Executive · Diplomatic VIP',

    blogBadge1: 'Public Intelligence Journal',
    blogBadge2: 'Open Access & Social Shareable',
    blogTitle: 'Forensic Dispatches, Field Audits & Minerals Trade Blog',
    blogSubtitle: 'Open-access regulatory alerts, metallurgical assay briefings, and field dispatches authored by our Board of Directors and field specialists. Share directly on LinkedIn, X, Facebook, and Instagram.',
    blogPublishEditBtn: 'Publish / Edit Posts',
    blogAllCategory: 'All Dispatches',
    blogSearchPlaceholder: 'Search articles, authors, topics...',
    blogReadFullBtn: 'Read Full Dispatch',
    blogShareLabel: 'Share:',
    blogShareModalTitle: 'Share Dispatch Across Social Networks',
    blogCopyCaptionBtn: 'Copy Caption & Link',
    blogCopiedMsg: 'Copied to Clipboard!',

    faqBadge1: 'Institutional Knowledge Base',
    faqBadge2: 'Supply Chain · Due Diligence · Travel Logistics',
    faqTitle: 'Frequently Asked Questions & Statutory Briefing',
    faqSubtitle: 'Direct answers from our Board of Directors regarding East African bullion pricing realities, metallurgical assay verification, URA customs protocols, and sovereign travel security.',
    faqAskAiBtn: 'Ask AI Forensic Advisor',
    faqWabaBtn: 'Member WhatsApp (WABA)',
    faqCatAll: 'All Questions',
    faqCatSupply: 'Gold Supply Chain',
    faqCatDiligence: 'Due Diligence Process',
    faqCatLogistics: 'Travel Logistics & Security',
    faqSearchPlaceholder: 'Search supply chain, XRF, URA, KYC, B6 convoy...',
    faqBottomTitle: 'Have a Specific Contract or Delegation Requirement?',
    faqBottomDesc: 'Submit an FCO, SPA, or DGSM mineral license for a 24–72 Hour Offer Verification or apply for an upcoming 7-day field expedition cohort.',

    charterBadge1: 'STATUTORY INDEPENDENCE & ETHICS',
    charterBadge2: 'MANDATORY GOVERNANCE FRAMEWORK',
    charterTitle: 'The Sovereign Legal & Governance Charter',
    charterSubtitle: 'Operating under strict compliance with the Uganda Mining and Minerals Act 2022 and international anti-money laundering standards.',
    charterAdvisoryTitle: 'Regulatory Advisory & Statutory Standing:',
    charterAdvisoryText: 'The Uganda Gold Expedition is administered under strict observance of Section 240 of the Uganda Mining and Minerals Act 2022. It does not provide financial investment solicitation or banking deposit facilities. All delegates operate as independent participants responsible for their own subsequent commercial decisions.',
    footerTagline: "East Africa's authoritative physical supply chain due diligence, metallurgical assay audit, and anti-fraud immersion mission.",
    footerStrictMandate: 'Strict Non-Transaction Advisory',
    footerNavTitle: 'Institution & Dispatches',
    footerBoardTitle: 'Board of Directors',
    footerSecretariatTitle: 'Inspection Secretariats',
    footerKycDisclosureTitle: 'Statutory Compliance & Sanctions Screening:',
    footerKycDisclosureText: 'All expedition packages include OFAC, UN, UK HMT, EU sanctions and PEP screening and government liaison processing.',
    footerDisclaimer: 'The Uganda Gold Expedition is an independent executive diligence and forensic research symposium. We do not act as gold dealers, brokers, intermediaries, or commercial representatives of any mining entity, refinery, or banking institution. We strictly do NOT buy, sell, or take custody of precious minerals.',
    footerRights: '© 2026 Uganda Gold Expedition. All rights reserved. Sovereign Intelligence & Anti-Fraud Due Diligence.'
  },

  AR: {
    navExpedition: 'البعثة الميدانية',
    navAboutUs: 'من نحن ومجلس الإدارة',
    navBlog: 'المدونة والتقارير',
    navFoodChain: 'سلسلة التوريد',
    navScamImmunity: 'مناعة الاحتيال',
    navPackages: 'الباقات والأسعار',
    navFaq: 'الأسئلة الشائعة',
    navCharter: 'الميثاق القانوني',
    navApplyCta: 'قدّم وادفع',
    navAdminPanel: 'لوحة التحكم (الإدارة)',
    navClientPortal: 'بوابة العملاء',
    navVerifyDoc: 'التحقق الجنائي من الوثائق خلال 24–72 ساعة',
    navPayCard: 'الدفع الإلكتروني الآمن',
    navRoleSwitcher: 'تبديل بوابة الموظفين',
    languageLabel: 'اللغة',
    currencyLabel: 'العملة',

    geoDetectedBadge: 'تم تحديد الموقع الجغرافي',
    geoProposalText: 'بناءً على موقعك الجغرافي، نقترح ضبط اللغة الافتراضية وعملة العرض على:',
    geoApplyBtn: 'تطبيق الإعدادات المقترحة',
    geoUseGpsBtn: 'تحديد الموقع عبر GPS',
    geoGpsLocating: 'جاري تحديد الموقع...',
    geoDismissBtn: 'الإبقاء على الحالي',
    geoProposedLangLabel: 'اللغة',
    geoProposedCurrLabel: 'العملة',
    geoSimHubsLabel: 'المراكز الإقليمية السريعة:',

    heroBadge: 'العناية الواجبة الميدانية · التحقق الجنائي من الوثائق خلال 24–72 ساعة',
    heroTitleLine1: 'لا تحوّل دولاراً واحداً',
    heroTitleHighlight: 'حتى تمشي في سلسلة التوريد بنفسك.',
    heroTitleLine2: 'أو افحص عرض الذهب خلال 24–72 ساعة.',
    heroSubtitle: 'البعثة الميدانية الوحيدة في العالم لمكافحة الاحتيال والتدقيق المباشر في تجارة الذهب بشرق أفريقيا. لا يمكنك السفر فوراً؟ أرسل أي عرض شركات (FCO) أو عقد (SPA) أو ترخيص للتحقق الجنائي من الوثائق خلال 24–72 ساعة عبر الذكاء الاصطناعي والضابط الميداني.',
    heroPillar1Title: 'بعثة ميدانية لمدة 7 أيام',
    heroPillar1Sub: 'السجل المعدني DGSM والمصافي والمناجم',
    heroPillar2Title: 'التحقق الجنائي من الوثائق (24–72 ساعة)',
    heroPillar2Sub: 'تدقيق الذكاء الاصطناعي + الضابط الميداني 1',
    heroPillar3Title: 'سلسلة الحيازة القانونية',
    heroPillar3Sub: 'التحقق من شهادات ICGLR وجمارك URA والمصافي',
    heroCtaPrimary: 'التقديم لبعثة الـ 7 أيام',
    heroCtaDocAudit: 'التحقق الجنائي من الوثائق خلال 24–72 ساعة',
    heroCtaPackages: 'استكشاف باقات البعثة الثلاث',
    heroCtaCardPay: 'الدفع الإلكتروني الآمن',
    heroCtaBriefing: 'الإحاطة التنفيذية',
    heroDisclaimerTitle: 'ميثاق عدم التداول:',
    heroDisclaimerText: 'مهمة تعليمية واستقصائية بحتة للعناية الواجبة. نحن لا نتوسط ولا نشتري ولا نبيع الذهب.',
    heroKycNoticeTitle: 'فحص KYC والعقوبات الدولية:',
    heroKycNoticeText: 'مشمول في كل باقة (فحص عقوبات OFAC والأمم المتحدة وUK HMT والاتحاد الأوروبي وفحص PEP).',
    heroStat1Label: '7 أيام من التدقيق الميداني',
    heroStat1Sub: 'عنتيبي، كمبالا، موبيندي وبوسيا',
    heroStat2Label: 'التحقق الجنائي من الوثائق (24–72 ساعة)',
    heroStat2Sub: 'فحص خلال 24–72 ساعة عبر الضابط الميداني 1',
    heroStat3Label: 'فحص KYC والعقوبات الدولية',
    heroStat3Sub: 'مشمول في كل باقة',
    heroStat4Label: 'حياد تام وعدم وساطة',
    heroStat4Sub: 'استشارات رقابية مستقلة بنسبة 100%',

    aboutBackToHome: 'العودة إلى الصفحة الرئيسية',
    aboutReadBlogBtn: 'قراءة مدونة الاستخبارات',
    aboutEditAdminBtn: 'تعديل في لوحة الإدارة',
    aboutBadge1: 'عن بعثة أوغندا للذهب',
    aboutBadge2: 'ميثاق صارم لعدم التداول',
    aboutRegisterBtn: 'قدّم وادفع',
    aboutAuditBtn: 'التحقق الجنائي من الوثائق خلال 24–72 ساعة',
    aboutCharterBadge: 'الميثاق المؤسسي',
    aboutCharterTitle: 'ضمان الاستقلالية السيادية',
    aboutStatutoryLabel: 'الامتثال القانوني والتنظيمي',
    aboutSecretariatLabel: 'المقرات والمكاتب الميدانية',
    aboutKpi1Label: 'عروض احتيالية تم إحباطها',
    aboutKpi2Label: 'فحص المعايرة بالنار (Fire Assay)',
    aboutKpi3Label: 'موعد تسليم التقرير الجنائي',
    aboutBoardBadge1: 'الحوكمة والقيادة',
    aboutBoardBadge2: 'مجلس الإدارة',
    aboutBoardTitle: 'أعضاء مجلس الإدارة والمديرون التنفيذيون',
    aboutBoardSubtitle: 'يجمع مجلس إدارتنا أبرز الخبراء في شرق أفريقيا في الفحص الجنائي للمعادن، وقوانين تجارة الذهب العابرة للحدود، والعمليات اللوجستية السيادية.',
    aboutBoardEditBtn: 'إضافة / تعديل أعضاء المجلس',
    aboutCoreMandate: 'الاختصاص الرئيسي',
    aboutKeyCredentials: 'المسؤوليات والاعتمادات المهنية',
    aboutDirectorateFooter: 'مديرية كمبالا وعنتيبي',
    aboutExecProfile: 'الملف التنفيذي',
    aboutGalleryBadge: 'توثيق ميداني ومخبري معتمد',
    aboutGalleryTitle: 'معرض التفتيش الميداني والمصافي',
    aboutGalleryEditBtn: 'إضافة / تعديل الصور في لوحة الإدارة',

    realitySectionBadge1: 'حقائق السوق الميدانية',
    realitySectionBadge2: 'مفارقة الـ 700 مليون دولار',
    realitySectionTitle: 'لماذا يخسر المشترون الأجانب الملايين في كمبالا',
    realitySectionSubtitle: 'إن فهم البنية الحقيقية لممر الذهب في شرق أفريقيا هو الفارق بين الأمان المؤسسي وخسارة رأس المال بالكامل.',
    realityAuditBtn: 'افحص عرضك الحالي الآن',
    realityImplicationLabel: 'الأثر المالي والمخاطر',
    realityTableTitle: 'مزاعم الوسطاء مقابل الحقيقة الميدانية في أوغندا',
    realityTableSub: 'تعتمد جميع شبكات الاحتيال على نفس السيناريو. إليك ما ستتحقق منه بنفسك خلال البعثة.',
    realityColVector: 'محور المعاملة',
    realityColPitch: 'عرض الواتساب / الوسيط (احتيال)',
    realityColGround: 'الحقيقة الميدانية في أوغندا (موثقة)',

    supplyBadge1: 'الهيكل الحقيقي لسلسلة التوريد',
    supplyBadge2: 'سلسلة الحيازة المادية الكاملة',
    supplyTitle: 'سلسلة التوريد الكاملة للذهب في شرق أفريقيا',
    supplySubtitle: 'تفكيك كل حلقة بدءاً من مناجم موبيندي وحتى الخزائن الجمركية في مطار عنتيبي، وكشف نقاط الاختناق التي يستغلها المحتالون.',
    supplyStageWord: 'المرحلة',
    supplyCounterpartyLabel: 'الجهة المؤسسية المعتمدة:',
    supplyTrapTitle: 'ثغرة التزوير وفخ الاحتيال',
    supplyTrapWarning: 'تحذير: الاعتماد على الضمانات الورقية غير المدققة في هذه المرحلة يؤدي إلى خسارة الحوالات المالية.',
    supplyVerifyTitle: 'التحقق الميداني لبعثة أوغندا للذهب',
    supplyVerifyNote: 'يقوم المشاركون بفحص السجلات الرسمية والاختبارات المخبرية والأختام الحكومية حضورياً.',

    itineraryBadge1: 'المخطط الميداني لمدة 7 أيام',
    itineraryBadge2: 'جدول تنفيذي مخصص للمشاركين',
    itineraryTitle: 'برنامج الانغماس الميداني في سلسلة التوريد (7 أيام)',
    itinerarySubtitle: 'تعرّف ميدانياً على كل حلقة من تجارة الذهب بدءاً من السجل المعدني بوزارة الطاقة في عنتيبي وصولاً إلى المناجم والمصافي المعتمدة.',
    itineraryDayWord: 'اليوم',
    itineraryRegisterBtn: 'قدّم وادفع',
    itineraryMandateLabel: 'المهمة الاستراتيجية لليوم',
    itineraryActivitiesLabel: 'الأنشطة الميدانية ونقاط التدقيق',
    itineraryRiskLabel: 'المخاطر التي يتم تحييدها',
    itineraryDeliverableLabel: 'المخرجات التنفيذية للمشارك',
    itineraryPrevDay: '← اليوم السابق',
    itineraryNextDay: 'اليوم التالي →',

    scamBadge1: 'منظومة التشخيص الجنائي',
    scamBadge2: 'فحص فوري لعلامات الاحتيال',
    scamToolTitle: 'مصفوفة مناعة الاحتيال وتشخيص الصفقات',
    scamToolSubtitle: 'افحص عرض الذهب الذي لديك مقابل كاشف العلامات الحمراء المكون من 6 معايير قبل تحويل أي أموال.',
    scamSelectConditionsLabel: 'حدد الشروط الموجودة في العرض المقدم لك',
    scamResetBtn: 'إعادة ضبط',
    scamForensicAnalysisLabel: 'التحليل الجنائي:',
    scamScoreHeader: 'مؤشر خطورة الاحتيال الجنائي',
    scamVerdictCritical: 'احتيال مؤكد بدرجة حرجة',
    scamVerdictCriticalDesc: 'يُظهر العرض خصائص كلاسيكية لاحتيال الرسوم المسبقة. لا تقم بتحويل أي أموال تحت أي ظرف.',
    scamVerdictHigh: 'مخاطر مؤسسية عالية جداً',
    scamVerdictHighDesc: 'تم رصد عدة مؤشرات عالية الخطورة تنتهك البروتوكولات الجمركية والقانونية في شرق أفريقيا.',
    scamVerdictElevated: 'ثغرات ومخاطر مرتفعة',
    scamVerdictElevatedDesc: 'شروط غير قياسية تتطلب تحققاً ميدانياً ومخبرياً مستقلاً.',
    scamVerdictClean: 'خط أساس نظيف (لم يتم تحديد علامات)',
    scamVerdictCleanDesc: 'اختر الشروط الموجودة في عرضك الحالي لإجراء تشخيص فوري للمخاطر.',
    scamNextStepsTitle: 'خطوات العناية الواجبة الإلزامية:',
    scamNextStep1: 'تحقق من رقم ترخيص البائع عبر البوابة الرسمية لمديرية المسح الجيولوجي والمعادن (DGSM).',
    scamNextStep2: 'لا تحول أبداً دفعات مقدمة للضرائب أو رسوم التصدير أو تصاريح العبور.',
    scamNextStep3: 'اطلب صهر الذهب وإجراء معايرة النار (Fire Assay) داخل مصفاة معتمدة في عنتيبي.',
    scamSubmitDocBtn: 'التحقق الجنائي من الوثائق خلال 24–72 ساعة (2,500 دولار شاملة الضريبة)',
    scamRegisterAuditBtn: 'قدّم وادفع لبعثة الـ 7 أيام',

    packagesBadge1: 'فئات المشاركة المؤسسية',
    packagesBadge2: 'تدقيق ميداني معتمد',
    packagesTitle: 'باقات البعثة التنفيذية',
    packagesSubtitle: 'مسارات ميدانية مصممة للباحثين، وتجار السبائك المحترفين، والصناديق السيادية. جميع الأسعار بالدولار الأمريكي شاملة ضريبة القيمة المضافة الأوغندية.',
    packagesCurrencyLabel: 'عملة العرض:',
    packagesDatesLabel: 'مواعيد البعثات المجدولة لعام 2027:',
    packagesPopularBadge: 'الأكثر اختياراً من مكاتب تداول السلع',
    packagesPerDelegate: '/ للشخص',
    packagesKycAllocationNote: 'شاملة فحص KYC وقوائم العقوبات الدولية (OFAC, UN, UK HMT, EU & PEP)',
    packagesKycWarning: 'جميع الأسعار بالدولار الأمريكي شاملة ضريبة القيمة المضافة الأوغندية. اختر وادفع فقط مقابل الباقة أو خدمة التحقق التي تحتاجها، مع شمول فحص العقوبات الدولية والاعتماد الحكومي في كل باقة دون رسوم KYC منفصلة.',
    packagesIdealForLabel: 'الفئة المستهدفة',
    packagesAccommodationLabel: 'مستوى الإقامة الفندقية',
    packagesTransportLabel: 'النقل الميداني والحماية الأمنية',
    packagesIncludedLabel: 'صلاحيات الوصول الميداني المشمولة',
    packagesDeliverablesLabel: 'الوثائق والمخرجات التنفيذية',
    packagesRegisterBtn: 'قدّم وادفع',
    packagesPayDepositBtn: 'قدّم وادفع',
    packagesPayFullBtn: 'قدّم وادفع',
    packagesSovereignHeadline: 'التنفيذي السيادي · كبار الشخصيات الدبلوماسية (Sovereign Executive · Diplomatic VIP)',
    packagesSovereignDesc: 'ينتقل مشاركو الفئة الثالثة عبر موكب سيارات تنفيذي مصفح من فئة B6 ووحدة حماية تكتيكية مخصصة لجميع التحركات الميدانية، بمرافقة أمنية دبلوماسية وكبير محللي المعادن. تتوفر رحلات الهليكوبتر المستأجرة عند الطلب مقابل 3,000 دولار أمريكي لكل ساعة طيران.',
    packagesSovereignBtn: 'قدّم وادفع — المسار السيادي Tier 03',

    blogBadge1: 'مجلة الاستخبارات العامة',
    blogBadge2: 'متاحة للجميع وقابلة للمشاركة',
    blogTitle: 'التقارير الجنائية والتدقيق الميداني ومدونة تجارة المعادن',
    blogSubtitle: 'تنبيهات تنظيمية وتقارير معايرة المعادن ومقالات ميدانية بقلم أعضاء مجلس الإدارة. شاركها مباشرة عبر لينكدإن وX وفيسبوك وإنستغرام.',
    blogPublishEditBtn: 'نشر / تعديل المقالات',
    blogAllCategory: 'جميع التقارير',
    blogSearchPlaceholder: 'ابحث في المقالات، المؤلفين، المواضيع...',
    blogReadFullBtn: 'قراءة التقرير الكامل',
    blogShareLabel: 'مشاركة:',
    blogShareModalTitle: 'مشاركة التقرير عبر شبكات التواصل الاجتماعي',
    blogCopyCaptionBtn: 'نسخ النص والرابط',
    blogCopiedMsg: 'تم النسخ إلى الحافظة!',

    faqBadge1: 'قاعدة المعرفة المؤسسية',
    faqBadge2: 'سلسلة التوريد · العناية الواجبة · اللوجستيات والأمن',
    faqTitle: 'الأسئلة الشائعة والإحاطة القانونية',
    faqSubtitle: 'إجابات مباشرة من مجلس الإدارة حول واقع تسعير الذهب في شرق أفريقيا، وفحص المعايرة بالنار، وإجراءات جمارك URA، وأمن الوفود.',
    faqAskAiBtn: 'اسأل المستشار الذكي (AI)',
    faqWabaBtn: 'واتساب الأعضاء (WABA)',
    faqCatAll: 'جميع الأسئلة',
    faqCatSupply: 'سلسلة توريد الذهب',
    faqCatDiligence: 'إجراءات العناية الواجبة',
    faqCatLogistics: 'اللوجستيات وأمن السفر',
    faqSearchPlaceholder: 'ابحث عن سلسلة التوريد، XRF، الضرائب، KYC...',
    faqBottomTitle: 'هل لديك عقد محدد أو متطلبات خاصة لوفدك؟',
    faqBottomDesc: 'استشر مستشار الذكاء الاصطناعي الجنائي فوراً، أو تواصل عبر قناة واتساب للأعضاء المسجلين (WABA)، أو أرسل وثيقتك للتحقق الجنائي من الوثائق خلال 24–72 ساعة.',

    charterBadge1: 'الاستقلالية القانونية والأخلاقيات',
    charterBadge2: 'إطار الحوكمة الإلزامي',
    charterTitle: 'الميثاق القانوني والحوكمة السيادية',
    charterSubtitle: 'نعمل وفق امتثال صارم لقانون التعدين والمعادن الأوغندي لعام 2022 والمعايير الدولية لمكافحة غسل الأموال.',
    charterAdvisoryTitle: 'تنويه تنظيمي ووضع قانوني:',
    charterAdvisoryText: 'تُدار بعثة أوغندا للذهب وفق التزام صارم بالمادة 240 من قانون التعدين والمعادن الأوغندي لعام 2022. وهي لا تقدم أي دعوة لاستثمارات مالية أو تسهيلات إيداع مصرفي.',
    footerTagline: 'المهمة الرسمية الرائدة في شرق أفريقيا للعناية الواجبة الميدانية وفحص السبائك ومكافحة احتيال الذهب.',
    footerStrictMandate: 'استشارات رقابية صارمة دون تداول',
    footerNavTitle: 'المؤسسة والتقارير',
    footerBoardTitle: 'مجلس الإدارة',
    footerSecretariatTitle: 'مقرات التفتيش الميداني',
    footerKycDisclosureTitle: 'الامتثال القانوني وفحص العقوبات:',
    footerKycDisclosureText: 'تشمل جميع الباقات فحص الخلفية وقوائم العقوبات (OFAC, UN, UK HMT, EU) وفحص PEP.',
    footerDisclaimer: 'بعثة أوغندا للذهب هي هيئة مستقلة للعناية الواجبة والأبحاث الجنائية. نحن لا نعمل كتجار ذهب أو وسطاء أو سماسرة، ولا نشتري أو نبيع أو نحتفظ بالمعادن الثمينة.',
    footerRights: '© 2026 بعثة أوغندا للذهب. جميع الحقوق محفوظة. الاستخبارات السيادية والعناية الواجبة.'
  },

  ZH: {
    navExpedition: '实地考察团',
    navAboutUs: '关于我们与董事会',
    navBlog: '洞察博客',
    navFoodChain: '供应链架构',
    navScamImmunity: '防诈诊断',
    navPackages: '考察套餐',
    navFaq: '常见问题',
    navCharter: '法律宪章',
    navApplyCta: '申请并付款',
    navAdminPanel: '管理后台',
    navClientPortal: '客户门户',
    navVerifyDoc: '24–72小时文件取证核验',
    navPayCard: '在线费用结算',
    navRoleSwitcher: '员工与门户切换',
    languageLabel: '语言',
    currencyLabel: '货币',

    geoDetectedBadge: '已识别您的地理位置',
    geoProposalText: '根据您的所在地，我们建议将默认语言和显示货币设置为：',
    geoApplyBtn: '应用推荐设置',
    geoUseGpsBtn: 'GPS 精确定位',
    geoGpsLocating: '正在通过 GPS 定位...',
    geoDismissBtn: '保持当前设置',
    geoProposedLangLabel: '语言',
    geoProposedCurrLabel: '货币',
    geoSimHubsLabel: '快速切换区域中心：',

    heroBadge: '主权级实地尽职调查 · 24–72小时文件取证核验',
    heroTitleLine1: '在亲自走完供应链之前',
    heroTitleHighlight: '绝不汇出一分钱。',
    heroTitleLine2: '或在24–72小时内核验您的黄金报价。',
    heroSubtitle: '全球唯一深入东非黄金贸易体系的实战反欺诈与尽职调查考察团。无法立即飞赴乌干达？提交任何公司正式报价 (FCO)、买卖协议 (SPA) 或采矿牌照，即可获得24–72小时 AI + 一级外勤军官文件取证核验报告。',
    heroPillar1Title: '7天实地深度考察',
    heroPillar1Sub: 'DGSM 矿业登记处、精炼厂与矿山',
    heroPillar2Title: '24–72小时文件取证核验',
    heroPillar2Sub: '单次 AI + 一级外勤军官实地核查',
    heroPillar3Title: '主权级实物监管链',
    heroPillar3Sub: 'ICGLR、URA 海关与认证化验核查',
    heroCtaPrimary: '申请参加7天考察团',
    heroCtaDocAudit: '24–72小时文件取证核验',
    heroCtaPackages: '查看3大考察等级',
    heroCtaCardPay: '在线费用结算',
    heroCtaBriefing: '高管简报',
    heroDisclaimerTitle: '严禁交易原则：',
    heroDisclaimerText: '本项目纯属教育与取证尽职调查任务。我们绝不居间、购买或出售任何黄金。',
    heroKycNoticeTitle: 'KYC 与制裁名单审查：',
    heroKycNoticeText: '包含在每个考察套餐中（涵盖 OFAC、联合国、UK HMT、欧盟制裁名单及 PEP 筛查）。',
    heroStat1Label: '7天全流程实地考察',
    heroStat1Sub: '恩德培、坎帕拉、穆本德与布西亚',
    heroStat2Label: '24–72小时文件取证核验',
    heroStat2Sub: '24–72小时 AI + 一级外勤军官实地核查',
    heroStat3Label: 'KYC 与制裁名单审查',
    heroStat3Sub: '包含在每个考察套餐中',
    heroStat4Label: '严格零交易立场',
    heroStat4Sub: '100% 独立第三方顾问授权',

    aboutBackToHome: '返回考察团概览',
    aboutReadBlogBtn: '阅读情报博客',
    aboutEditAdminBtn: '在管理后台编辑',
    aboutBadge1: '关于乌干达黄金考察团',
    aboutBadge2: '严格零交易授权',
    aboutRegisterBtn: '申请并付款',
    aboutAuditBtn: '24–72小时文件取证核验',
    aboutCharterBadge: '机构宪章',
    aboutCharterTitle: '主权独立性保障',
    aboutStatutoryLabel: '法定合规标准',
    aboutSecretariatLabel: '运营秘书处与驻地',
    aboutKpi1Label: '已拦截欺诈报价总额',
    aboutKpi2Label: '火试金法验证率',
    aboutKpi3Label: '取证报告交付时效',
    aboutBoardBadge1: '治理与领导层',
    aboutBoardBadge2: '董事会成员',
    aboutBoardTitle: '董事会成员与执行董事',
    aboutBoardSubtitle: '我们的董事会汇聚了东非在冶金取证、跨境矿产贸易法以及主权级外勤后勤领域的最高权威专家。',
    aboutBoardEditBtn: '添加 / 编辑董事会成员',
    aboutCoreMandate: '核心职责',
    aboutKeyCredentials: '主要职责与专业资质',
    aboutDirectorateFooter: '坎帕拉与恩德培指挥部',
    aboutExecProfile: '高管档案',
    aboutGalleryBadge: '经核实的矿区与金库影像',
    aboutGalleryTitle: '实地考察与精炼厂图库',
    aboutGalleryEditBtn: '在管理后台添加 / 修改照片',

    realitySectionBadge1: '实证市场真相',
    realitySectionBadge2: '7亿美元出口悖论',
    realitySectionTitle: '为什么外国黄金买家在坎帕拉损失数百万美元',
    realitySectionSubtitle: '透彻理解东非黄金走廊的真实底层结构，是机构资金安全与本金血本无归之间的分水岭。',
    realityAuditBtn: '立即诊断您手中的报价',
    realityImplicationLabel: '资金风险警示',
    realityTableTitle: '骗局话术 vs. 乌干达实地真相',
    realityTableSub: '所有跨国黄金诈骗团伙都使用同一套剧本。以下是将在考察期间亲自核实的真相。',
    realityColVector: '交易环节',
    realityColPitch: 'WhatsApp / 经纪人话术（骗局）',
    realityColGround: '乌干达实地核验真相（真实）',

    supplyBadge1: '真实供应链底层架构',
    supplyBadge2: '端到端实物监管链',
    supplyTitle: '东非黄金供应链全流程解析',
    supplySubtitle: '从穆本德红土矿坑到恩德培机场保税金库，逐一拆解每一个交易环节，精准揭示诈骗集团设局的致命节点。',
    supplyStageWord: '阶段',
    supplyCounterpartyLabel: '法定对应机构：',
    supplyTrapTitle: '伪造漏洞与欺诈陷阱',
    supplyTrapWarning: '警告：在此阶段轻信未经核实的纸面担保将导致无法追回的电汇损失。',
    supplyVerifyTitle: '乌干达黄金考察团实地核验动作',
    supplyVerifyNote: '考察团代表将亲自现场核查政府登记簿、实时冶金测试及官方印章。',

    itineraryBadge1: '7天实地考察蓝图',
    itineraryBadge2: '高管专属受限行程',
    itineraryTitle: '7天黄金供应链实地深度考察行程',
    itinerarySubtitle: '从恩德培能源与矿产部矿权登记处，到手工矿坑、现代化工业矿山及机场保税金库，走完每一个核心节点。',
    itineraryDayWord: '第',
    itineraryRegisterBtn: '申请并付款',
    itineraryMandateLabel: '当日战略目标',
    itineraryActivitiesLabel: '核心实地考察与审计要点',
    itineraryRiskLabel: '已化解的风险点',
    itineraryDeliverableLabel: '高管交付成果',
    itineraryPrevDay: '← 前一天',
    itineraryNextDay: '后一天 →',

    scamBadge1: '取证诊断套件',
    scamBadge2: '即时红旗风险审计',
    scamToolTitle: '防诈免疫矩阵与交易风险诊断仪',
    scamToolSubtitle: '在投入任何资金之前，使用我们的6点取证红旗检测器对您当前的黄金报价进行全面体检。',
    scamSelectConditionsLabel: '勾选您收到的报价中包含的条款',
    scamResetBtn: '重置全部',
    scamForensicAnalysisLabel: '取证分析：',
    scamScoreHeader: '取证脆弱性风险评分',
    scamVerdictCritical: '极度确定的欺诈陷阱',
    scamVerdictCriticalDesc: '该报价呈现教科书式的预付费用诈骗特征。在任何情况下均切勿汇款。',
    scamVerdictHigh: '高危机构风险',
    scamVerdictHighDesc: '检测到多项高风险指标，合同条款严重违反东非法定海关与税务规程。',
    scamVerdictElevated: '中度风险暴露',
    scamVerdictElevatedDesc: '发现非标准交易条件，必须进行独立实地与冶金核验。',
    scamVerdictClean: '基础状态（未勾选风险项）',
    scamVerdictCleanDesc: '请在左侧勾选您当前报价中的条款以运行取证风险诊断。',
    scamNextStepsTitle: '强制性尽职调查下一步建议：',
    scamNextStep1: '在乌干达地质调查与矿业局 (DGSM) 官方门户核查卖方牌照编号。',
    scamNextStep2: '绝不为税费、出口税或所谓的联合国过境许可预付任何资金。',
    scamNextStep3: '要求在恩德培认证保税精炼厂内进行钻孔取样与火试金法 (Fire Assay) 检测。',
    scamSubmitDocBtn: '24–72小时文件取证核验（2,500美元，含增值税）',
    scamRegisterAuditBtn: '申请并付款参加7天考察团',

    packagesBadge1: '机构参团等级',
    packagesBadge2: '权威实地深度考察',
    packagesTitle: '高管考察团套餐方案',
    packagesSubtitle: '专为学术合规研究员、专业贵金属交易员以及主权基金与外交贵宾定制的实地考察通道。所有价格均以美元计价，含适用的乌干达增值税。',
    packagesCurrencyLabel: '显示货币：',
    packagesDatesLabel: '2027年预定考察团期：',
    packagesPopularBadge: '大宗商品交易台首选方案',
    packagesPerDelegate: '/ 每人',
    packagesKycAllocationNote: '包含 KYC 与制裁名单审查 (OFAC, UN, UK HMT, EU & PEP)',
    packagesKycWarning: '所有价格均以美元计价，含适用的乌干达增值税。您只需根据需求自由选择并支付所选的考察套餐或取证核验服务，所有考察套餐均已包含 OFAC、联合国、英国财政部、欧盟制裁名单与 PEP 筛查，无单独的 KYC 押金。',
    packagesIdealForLabel: '适用代表群体',
    packagesAccommodationLabel: '住宿标准',
    packagesTransportLabel: '实地交通与安保配置',
    packagesIncludedLabel: '包含的实地准入权限',
    packagesDeliverablesLabel: '高管交付文件包',
    packagesRegisterBtn: '申请并付款',
    packagesPayDepositBtn: '申请并付款',
    packagesPayFullBtn: '申请并付款',
    packagesSovereignHeadline: '主权高管 · 外交贵宾定制代表团 (Sovereign Executive · Diplomatic VIP)',
    packagesSovereignDesc: '第三等级 (Tier 03) 代表全程配备专属 B6 防弹装甲行政车队与贴身战术护卫分队往返恩德培、穆本德与布西亚矿区，并由首席冶金分析师随行。如需包租直升机转运，可按每飞行小时 3,000 美元另行申请。',
    packagesSovereignBtn: '申请并付款 — Tier 03 主权高管 · 外交贵宾',

    blogBadge1: '公开情报期刊',
    blogBadge2: '开放获取与社媒分享',
    blogTitle: '取证简报、实地审计与矿产贸易博客',
    blogSubtitle: '由董事会成员与外勤专家撰写的监管预警、火试金分析简报及实地考察记录。支持一键分享至 LinkedIn、X、Facebook 和 Instagram。',
    blogPublishEditBtn: '发布 / 编辑文章',
    blogAllCategory: '全部简报',
    blogSearchPlaceholder: '搜索文章标题、作者、关键词...',
    blogReadFullBtn: '阅读完整简报',
    blogShareLabel: '分享：',
    blogShareModalTitle: '将简报分享至社交媒体网络',
    blogCopyCaptionBtn: '复制文案与链接',
    blogCopiedMsg: '已复制到剪贴板！',

    faqBadge1: '机构知识库',
    faqBadge2: '供应链 · 尽职调查 · 差旅与安保',
    faqTitle: '常见问题解答与法定合规简报',
    faqSubtitle: '董事会针对东非黄金定价真相、冶金火试金核验、URA 海关税务流程及主权级差旅安保的权威解答。',
    faqAskAiBtn: '咨询 AI 取证顾问',
    faqWabaBtn: '注册会员 WhatsApp (WABA)',
    faqCatAll: '全部问题',
    faqCatSupply: '黄金供应链',
    faqCatDiligence: '尽职调查流程',
    faqCatLogistics: '差旅后勤与安保',
    faqSearchPlaceholder: '搜索供应链、XRF光谱、URA税务、KYC、B6防弹车队...',
    faqBottomTitle: '持有特定合同或有专属代表团需求？',
    faqBottomDesc: '立即咨询多轮对话 Gemini AI 取证顾问，通过注册会员专属 WhatsApp Business (WABA) 专线联系专家，或提交 FCO/SPA 进行24–72小时文件取证核验。',

    charterBadge1: '法定独立性与职业道德',
    charterBadge2: '强制性治理框架',
    charterTitle: '主权法律与治理宪章',
    charterSubtitle: '严格遵循《2022年乌干达采矿与矿产法》及国际反洗钱 (AML/CFT) 准则运作。',
    charterAdvisoryTitle: '监管声明与法定地位：',
    charterAdvisoryText: '乌干达黄金考察团严格依据《2022年乌干达采矿与矿产法》第240条运作。本项目不提供任何金融投资招揽或银行存款便利。所有参团代表均作为独立主体对其后续商业决策负责。',
    footerTagline: '东非极具权威的黄金实物供应链尽职调查、冶金化验审计与反欺诈实地考察机构。',
    footerStrictMandate: '严格零交易独立顾问',
    footerNavTitle: '机构与简报',
    footerBoardTitle: '董事会成员',
    footerSecretariatTitle: '核查秘书处驻地',
    footerKycDisclosureTitle: '法定合规与制裁筛查声明：',
    footerKycDisclosureText: '所有考察套餐均包含背景筛查、OFAC、联合国、英国财政部、欧盟制裁名单及 PEP 核查。',
    footerDisclaimer: '乌干达黄金考察团是独立的高管尽职调查与取证研究机构。我们绝不充当黄金交易商、经纪人或中间商，也绝不买卖或托管任何贵金属。',
    footerRights: '© 2026 乌干达黄金考察团 版权所有 · 主权情报与反欺诈尽职调查。'
  },

  FR: {
    navExpedition: 'L’Expédition',
    navAboutUs: 'À Propos & Directoire',
    navBlog: 'Blog & Dépêches',
    navFoodChain: 'Chaîne d’Approvisionnement',
    navScamImmunity: 'Immunité Anti-Fraude',
    navPackages: 'Forfaits & Tarifs',
    navFaq: 'FAQ',
    navCharter: 'Charte Légale',
    navApplyCta: 'Postuler & Payer',
    navAdminPanel: 'Panneau Admin',
    navClientPortal: 'Portail Client',
    navVerifyDoc: 'Vérification Forensique de Documents en 24–72h',
    navPayCard: 'Règlement en Ligne',
    navRoleSwitcher: 'Portail Staff & Rôles',
    languageLabel: 'Langue',
    currencyLabel: 'Devise',

    geoDetectedBadge: 'Position Géographique Détectée',
    geoProposalText: 'Selon votre localisation, nous vous proposons de définir votre langue et votre devise par défaut sur :',
    geoApplyBtn: 'Appliquer les Paramètres',
    geoUseGpsBtn: 'Position GPS Exacte',
    geoGpsLocating: 'Localisation GPS...',
    geoDismissBtn: 'Conserver Actuel',
    geoProposedLangLabel: 'Langue',
    geoProposedCurrLabel: 'Devise',
    geoSimHubsLabel: 'Hubs Régionaux Rapides :',

    heroBadge: 'Diligence Raisonnable Physique · Vérification Forensique de Documents en 24–72h',
    heroTitleLine1: 'Ne Virez Pas un Seul Dollar',
    heroTitleHighlight: 'Avant d’Avoir Parcouru la Filière.',
    heroTitleLine2: 'Ou Vérifiez Votre Offre en 24 à 72 Heures.',
    heroSubtitle: "L'unique expédition pratique anti-fraude et de diligence raisonnable au cœur de l'architecture du commerce de l'or en Afrique de l'Est. Impossible de voyager immédiatement ? Soumettez toute FCO, SPA ou licence pour une Vérification Forensique de Documents en 24–72 Heures par IA + Officier de Terrain.",
    heroPillar1Title: 'Immersion Terrain de 7 Jours',
    heroPillar1Sub: 'Cadastre DGSM, Raffineries & Mines',
    heroPillar2Title: 'Vérification Forensique en 24–72h',
    heroPillar2Sub: 'Vérification IA + Officier d’État-Major 1',
    heroPillar3Title: 'Chaîne de Traçabilité Souveraine',
    heroPillar3Sub: 'Vérification CIRGL, URA & Coupellation',
    heroCtaPrimary: 'Postuler pour l’Expédition de 7 Jours',
    heroCtaDocAudit: 'Vérification Forensique de Documents en 24–72h',
    heroCtaPackages: 'Explorer les 3 Forfaits',
    heroCtaCardPay: 'Règlement en Ligne',
    heroCtaBriefing: 'Briefing Exécutif',
    heroDisclaimerTitle: 'Mandat Strict de Non-Transaction :',
    heroDisclaimerText: 'Mission exclusivement éducative et de diligence forensique. Nous ne faisons ni courtage, ni achat, ni vente d’or.',
    heroKycNoticeTitle: 'Filtrage KYC & Sanctions :',
    heroKycNoticeText: 'inclus dans chaque forfait (filtrage des sanctions OFAC, ONU, UK HMT, UE et PEP).',
    heroStat1Label: 'Immersion Terrain 7 Jours',
    heroStat1Sub: 'Entebbe, Kampala, Mubende & Busia',
    heroStat2Label: 'Vérification Forensique en 24–72h',
    heroStat2Sub: 'Vérification IA + Officier 1 en 24–72h',
    heroStat3Label: 'Filtrage KYC & Sanctions',
    heroStat3Sub: 'Inclus dans Chaque Forfait',
    heroStat4Label: 'Zéro Transaction Commerciale',
    heroStat4Sub: 'Conseil 100 % Indépendant',

    aboutBackToHome: 'Retour à l’Aperçu de l’Expédition',
    aboutReadBlogBtn: 'Lire le Blog Renseignement',
    aboutEditAdminBtn: 'Modifier dans l’Admin',
    aboutBadge1: 'À Propos de l’Uganda Gold Expedition',
    aboutBadge2: 'Mandat Strict de Non-Transaction',
    aboutRegisterBtn: 'Postuler & Payer',
    aboutAuditBtn: 'Vérification Forensique de Documents en 24–72h',
    aboutCharterBadge: 'Charte Institutionnelle',
    aboutCharterTitle: 'Garantie d’Indépendance Souveraine',
    aboutStatutoryLabel: 'Alignement Statutaire',
    aboutSecretariatLabel: 'Secrétariats Opérationnels',
    aboutKpi1Label: 'Offres Frauduleuses Interceptées',
    aboutKpi2Label: 'Vérifié par Coupellation (Fire Assay)',
    aboutKpi3Label: 'SLA Dossier Forensique',
    aboutBoardBadge1: 'Gouvernance & Direction',
    aboutBoardBadge2: 'Conseil d’Administration',
    aboutBoardTitle: 'Membres du Conseil & Directeurs Exécutifs',
    aboutBoardSubtitle: "Notre Conseil d'Administration réunit les plus hautes autorités d'Afrique de l'Est en criminalistique métallurgique, droit minier transfrontalier et logistique souveraine.",
    aboutBoardEditBtn: 'Ajouter / Modifier les Directeurs',
    aboutCoreMandate: 'Mandat Principal',
    aboutKeyCredentials: 'Responsabilités Clés & Accréditations',
    aboutDirectorateFooter: 'Directoire de Kampala & Entebbe',
    aboutExecProfile: 'Profil Exécutif',
    aboutGalleryBadge: 'Documentation Terrain & Coffres Vérifiée',
    aboutGalleryTitle: 'Galerie d’Inspection sur le Terrain',
    aboutGalleryEditBtn: 'Ajouter / Modifier les Photos dans l’Admin',

    realitySectionBadge1: 'RÉALITÉ EMPIRIQUE DU MARCHÉ',
    realitySectionBadge2: 'LE PARADOXE DES 700 M$',
    realitySectionTitle: 'Pourquoi les Acheteurs Étrangers Perdent des Millions à Kampala',
    realitySectionSubtitle: "Comprendre l'anatomie réelle du corridor aurifère est-africain fait toute la différence entre la sécurité institutionnelle et la perte totale de capital.",
    realityAuditBtn: 'Auditer Votre Offre Actuelle',
    realityImplicationLabel: 'Implication pour le Capital',
    realityTableTitle: 'Le Discours du Fraudeur vs La Réalité du Terrain',
    realityTableSub: 'Chaque syndicat frauduleux utilise exactement le même scénario. Voici ce que vous vérifierez en personne.',
    realityColVector: 'Vecteur de Transaction',
    realityColPitch: 'Le Pitch WhatsApp / Courtier (Fraude)',
    realityColGround: 'Réalité Terrain en Ouganda (Vérifiée)',

    supplyBadge1: 'L’ARCHITECTURE RÉELLE DE LA FILIÈRE',
    supplyBadge2: 'CHAÎNE DE TRAÇABILITÉ PHYSIQUE BOUT-EN-BOUT',
    supplyTitle: 'La Chaîne Alimentaire de l’Or en Afrique de l’Est',
    supplySubtitle: "Déconstruisez chaque maillon, des puits artisanaux de Mubende jusqu'à la chambre forte sous douane d'Entebbe. Identifiez où les syndicats insèrent leurs pièges.",
    supplyStageWord: 'ÉTAPE',
    supplyCounterpartyLabel: 'Contrepartie Institutionnelle :',
    supplyTrapTitle: 'La Vulnérabilité & Le Piège de Contrefaçon',
    supplyTrapWarning: 'Avertissement : Les garanties papier non auditées à ce stade entraînent des pertes irrévocables.',
    supplyVerifyTitle: 'Vérification Physique Uganda Gold Expedition',
    supplyVerifyNote: 'Les délégués inspectent les registres physiques, les tests en direct et les sceaux officiels en personne.',

    itineraryBadge1: 'LE PLAN DE TERRAIN EN 7 JOURS',
    itineraryBadge2: 'PROGRAMME EXÉCUTIF RESTREINT',
    itineraryTitle: 'Immersion Physique de 7 Jours dans la Filière Or',
    itinerarySubtitle: "Parcourez chaque nœud du commerce de l'or, du cadastre minier d'Entebbe aux mines artisanales, mines industrielles et raffineries sous douane.",
    itineraryDayWord: 'JOUR',
    itineraryRegisterBtn: 'Postuler & Payer',
    itineraryMandateLabel: 'Mandat Stratégique de la Session',
    itineraryActivitiesLabel: 'Activités Clés sur le Terrain & Points d’Audit',
    itineraryRiskLabel: 'Risque Neutralisé',
    itineraryDeliverableLabel: 'Livrable Exécutif',
    itineraryPrevDay: '← Jour Précédent',
    itineraryNextDay: 'Jour Suivant →',

    scamBadge1: 'SUITE DE DIAGNOSTIC FORENSIQUE',
    scamBadge2: 'AUDIT INSTANTANÉ DES SIGNAUX D’ALERTE',
    scamToolTitle: 'Matrice d’Immunité Anti-Fraude & Diagnostic d’Offre',
    scamToolSubtitle: 'Auditez votre offre d’or active grâce à notre détecteur forensique en 6 points avant tout engagement financier.',
    scamSelectConditionsLabel: 'Sélectionnez les Conditions Observées dans l’Offre',
    scamResetBtn: 'Tout Réinitialiser',
    scamForensicAnalysisLabel: 'Analyse Forensique :',
    scamScoreHeader: 'Score de Vulnérabilité Forensique',
    scamVerdictCritical: 'CERTITUDE CRITIQUE DE FRAUDE',
    scamVerdictCriticalDesc: "L'offre présente toutes les caractéristiques d'une fraude aux frais avancés. Ne virez aucun fonds sous aucun prétexte.",
    scamVerdictHigh: 'RISQUE INSTITUTIONNEL ÉLEVÉ',
    scamVerdictHighDesc: 'Plusieurs indicateurs à haut risque détectés. Les termes violent les protocoles douaniers est-africains.',
    scamVerdictElevated: 'VULNÉRABILITÉ ÉLEVÉE',
    scamVerdictElevatedDesc: 'Conditions non standard identifiées. Une vérification physique indépendante est indispensable.',
    scamVerdictClean: 'LIGNE DE BASE SAINE (AUCUN SIGNAL COCHÉ)',
    scamVerdictCleanDesc: 'Cochez les paramètres de votre proposition actuelle pour lancer le diagnostic forensique.',
    scamNextStepsTitle: 'Prochaines Étapes Obligatoires de Diligence :',
    scamNextStep1: 'Vérifiez le numéro de licence du vendeur sur le portail officiel DGSM Ouganda.',
    scamNextStep2: 'Ne virez jamais d’avance pour des taxes, droits d’exportation ou certificats ONU.',
    scamNextStep3: 'Exigez une fusion par induction et coupellation (Fire Assay) en raffinerie agréée à Entebbe.',
    scamSubmitDocBtn: 'Vérification Forensique de Documents en 24–72h (2 500 $, TVA incl.)',
    scamRegisterAuditBtn: 'Postuler & Payer pour l’Expédition de 7 Jours',

    packagesBadge1: 'NIVEAUX DE PARTICIPATION INSTITUTIONNELLE',
    packagesBadge2: 'IMMERSION TERRAIN ACCRÉDITÉE',
    packagesTitle: 'Forfaits d’Expédition Exécutive',
    packagesSubtitle: 'Parcours sur mesure pour chercheurs en conformité, négociants en métaux précieux et délégations souveraines. Tous les prix sont en USD, TVA ougandaise applicable incluse.',
    packagesCurrencyLabel: 'Devise d’Affichage :',
    packagesDatesLabel: 'Sessions d’Expédition Programmées en 2027 :',
    packagesPopularBadge: 'Le Plus Choisi par les Tables de Négoce',
    packagesPerDelegate: '/ personne',
    packagesKycAllocationNote: 'Filtrage KYC & Sanctions Inclus (OFAC, ONU, UK HMT, UE & PEP)',
    packagesKycWarning: 'Tous les prix sont en USD, TVA ougandaise applicable incluse. Choisissez et payez uniquement pour le forfait d’expédition ou le service de vérification forensique souhaité. Le filtrage des sanctions OFAC, ONU, UK HMT, UE et PEP est inclus dans chaque forfait sans frais KYC séparés.',
    packagesIdealForLabel: 'Profil de Délégué Idéal',
    packagesAccommodationLabel: 'Standard d’Hébergement',
    packagesTransportLabel: 'Transport Terrain & Sécurité',
    packagesIncludedLabel: 'Accès d’Immersion Inclus',
    packagesDeliverablesLabel: 'Livrables Exécutifs',
    packagesRegisterBtn: 'Postuler & Payer',
    packagesPayDepositBtn: 'Postuler & Payer',
    packagesPayFullBtn: 'Postuler & Payer',
    packagesSovereignHeadline: 'Exécutif Souverain · VIP Diplomatique (Sovereign Executive · Diplomatic VIP)',
    packagesSovereignDesc: "Les délégués Tier 03 se déplacent en cortège exécutif blindé B6 dédié avec détachement tactique de protection rapprochée pour tous les mouvements sur le terrain à Entebbe, Mubende et Busia. Transferts par hélicoptère affrété disponibles sur demande à 3 000 USD par heure de vol.",
    packagesSovereignBtn: 'Postuler & Payer — Parcours Souverain Tier 03',

    blogBadge1: 'Journal Public de Renseignement',
    blogBadge2: 'Accès Libre & Partage Social',
    blogTitle: 'Dépêches Forensiques, Audits de Terrain & Blog Négoce Minier',
    blogSubtitle: "Alertes réglementaires, briefings d'essais métallurgiques et dépêches de terrain rédigés par notre Conseil d'Administration. Partagez directement sur LinkedIn, X, Facebook et Instagram.",
    blogPublishEditBtn: 'Publier / Modifier les Articles',
    blogAllCategory: 'Toutes les Dépêches',
    blogSearchPlaceholder: 'Rechercher articles, auteurs, sujets...',
    blogReadFullBtn: 'Lire la Dépêche Complète',
    blogShareLabel: 'Partager :',
    blogShareModalTitle: 'Partager la Dépêche sur les Réseaux Sociaux',
    blogCopyCaptionBtn: 'Copier Légende & Lien',
    blogCopiedMsg: 'Copié dans le Presse-Papiers !',

    faqBadge1: 'Base de Connaissances Institutionnelle',
    faqBadge2: 'Filière Or · Diligence Raisonnable · Logistique & Sécurité',
    faqTitle: 'Questions Fréquentes & Briefing Statutaire',
    faqSubtitle: "Réponses directes de notre Conseil d'Administration concernant la réalité des prix LBMA en Afrique de l'Est, la coupellation Fire Assay, les douanes URA et la sécurité des délégations.",
    faqAskAiBtn: 'Consulter le Conseiller IA',
    faqWabaBtn: 'WhatsApp Membres (WABA)',
    faqCatAll: 'Toutes les Questions',
    faqCatSupply: 'Filière Or & Prix',
    faqCatDiligence: 'Processus de Diligence',
    faqCatLogistics: 'Logistique & Sécurité',
    faqSearchPlaceholder: 'Rechercher filière, XRF, douanes URA, KYC, convoi B6...',
    faqBottomTitle: 'Vous Avez un Contrat Spécifique ou une Exigence de Délégation ?',
    faqBottomDesc: 'Consultez immédiatement notre conseiller IA forensique Gemini, connectez-vous via le canal WhatsApp Business (WABA) réservé aux membres inscrits, ou soumettez une FCO/SPA pour une Vérification Forensique de Documents en 24–72 Heures.',

    charterBadge1: 'INDÉPENDANCE STATUTAIRE & ÉTHIQUE',
    charterBadge2: 'CADRE DE GOUVERNANCE OBLIGATOIRE',
    charterTitle: 'La Charte Légale et de Gouvernance Souveraine',
    charterSubtitle: 'Opérant en stricte conformité avec la Loi sur les Mines et les Minéraux de l’Ouganda de 2022 et les normes internationales LCB-FT.',
    charterAdvisoryTitle: 'Avis Réglementaire & Statut Légal :',
    charterAdvisoryText: "L'Uganda Gold Expedition est administrée dans le strict respect de l'article 240 de la Loi de 2022 sur les mines et les minéraux de l'Ouganda. Elle ne fournit aucune sollicitation d'investissement financier ni facilité de dépôt bancaire.",
    footerTagline: "Mission de référence en Afrique de l'Est pour la diligence physique de la filière aurifère, l'audit métallurgique et l'immersion anti-fraude.",
    footerStrictMandate: 'Conseil Strictement Sans Transaction',
    footerNavTitle: 'Institution & Dépêches',
    footerBoardTitle: 'Conseil d’Administration',
    footerSecretariatTitle: 'Secrétariats d’Inspection',
    footerKycDisclosureTitle: 'Conformité Statutaire & Filtrage des Sanctions :',
    footerKycDisclosureText: "Chaque forfait comprend le filtrage des sanctions OFAC, ONU, UK HMT, UE et PEP ainsi que les liaisons gouvernementales.",
    footerDisclaimer: "L'Uganda Gold Expedition est un symposium indépendant de diligence exécutive et de recherche forensique. Nous n'agissons pas en tant que négociants, courtiers ou intermédiaires, et nous n'achetons, ne vendons ni ne détenons aucun métal précieux.",
    footerRights: '© 2026 Uganda Gold Expedition. Tous droits réservés. Renseignement Souverain & Diligence Anti-Fraude.'
  }
};

// Localized About Us Content helper
export function getLocalizedAboutContent(lang: Language, base: AboutContent): AboutContent {
  if (lang === 'EN') return base;
  if (lang === 'AR') {
    return {
      ...base,
      headline: 'العناية الواجبة الميدانية السيادية واستخبارات مكافحة الاحتيال في شرق أفريقيا',
      subheadline: 'تأسست للقضاء على احتيال الرسوم المسبقة في تجارة السبائك وتزويد المستثمرين المؤسسيين والمكاتب العائلية والخزائن السيادية بحقائق ميدانية موثقة لسلسلة التوريد.',
      missionStatement: 'نحن لا نتوسط ولا نشتري ولا نبيع الذهب. مهمتنا الوحيدة هي التحقق الميداني المستقل، وتدقيق المعايرة المخبرية، ومراجعة الامتثال القانوني بموجب قانون التعدين والمعادن الأوغندي لعام 2022.',
      overviewParagraphs: [
        'أصبح ممر الذهب في شرق أفريقيا — المتمركز حول المصافي المرخصة في أوغندا والخزائن الجمركية في عنتيبي ومناطق التعدين في موبيندي وكاساندا وبوسيا وكاراموجا — أحد أكثر مراكز السبائك حيوية في أفريقيا. ومع ذلك، يخسر المستثمرون الدوليون مئات الملايين من الدولارات سنوياً بسبب شبكات احتيال متطورة تروج لخصومات وهمية بنسبة 15% إلى 25% عن سعر LBMA وتراخيص مزورة.',
        'تأسست بعثة أوغندا للذهب على يد مجلس إدارة متعدد التخصصات يضم خبراء في التحقيقات الجنائية وتجارة المعادن والعمليات اللوجستية الميدانية لبناء جدار حماية منيع بين المشترين المؤسسيين والشبكات الإجرامية. قبل تحويل دولار واحد، يصطحب فريقنا المشاركين ميدانياً إلى السجل المعدني DGSM في عنتيبي ومختبرات المعايرة بالنار في كمبالا ومواقع التعدين النشطة.',
        'نعمل بموجب ميثاق صارم لعدم التداول، مما يضمن استقلالية تامة وعدم وجود أي تضارب في المصالح التجارية. تخضع كل وثيقة فحص واختبار بوتقة وبرنامج ميداني لمدة 7 أيام للأدلة التجريبية والتحقق الرسمي من السجلات الحكومية.'
      ],
      statutoryMandate: 'متوافق مع قانون التعدين والمعادن الأوغندي لعام 2022، وآلية الإشهاد الإقليمية للمؤتمر الدولي لمنطقة البحيرات الكبرى (ICGLR)، وبروتوكولات جمارك URA ASYCUDA World، وإرشادات منظمة التعاون الاقتصادي والتنمية (OECD).',
      headquarters: 'الأمانة العامة في آمبر هاوس، كمبالا ومكتب ارتباط التفتيش DGSM، عنتيبي، جمهورية أوغندا'
    };
  }
  if (lang === 'ZH') {
    return {
      ...base,
      headline: '东非主权级实物尽职调查与反欺诈取证情报机构',
      subheadline: '旨在彻底根除预付费用黄金诈骗，为机构投资者、家族办公室和主权财资机构提供可核实的实地供应链真相。',
      missionStatement: '我们绝不居间、购买或出售黄金。我们的唯一职责是依据《2022年乌干达采矿与矿产法》进行独立实地核查、冶金火试金验证及法定合规审计。',
      overviewParagraphs: [
        '以乌干达持牌精炼厂、恩德培海关保税金库以及穆本德、卡桑达、布西亚和卡拉莫贾矿带为核心的东非黄金走廊，已成为非洲最具活力的贵金属枢纽之一。然而，国际资本配置者每年因轻信伪造的 LBMA 15%–25% 深度折扣、假冒 DGSM 采矿牌照及伪造 URA 海关申报单而损失数亿美元。',
        '乌干达黄金考察团由取证调查专家、矿产贸易专家和外勤战略专家组成的跨学科董事会创立，旨在为合法机构买家与跨国诈骗集团之间建立一道不可逾越的防火墙。在委托人汇出一分钱之前，我们的董事会将带领他们亲自走进恩德培地质调查与矿业局 (DGSM) 矿权登记处、坎帕拉认证火试金实验室以及活跃矿坑现场。',
        '我们严格遵循《零交易宪章》，完全独立的立场确保零商业利益冲突。每一份24–72小时取证核验报告、每一次实验室火试金灰吹测试以及为期7天的实地考察，均建立在实证数据与官方注册表核查之上。'
      ],
      statutoryMandate: '严格遵循《2022年乌干达采矿与矿产法》、大湖地区国际会议 (ICGLR) 区域认证机制 (RCM)、乌干达税务局 (URA) ASYCUDA World 海关规程及经合组织 (OECD) 尽职调查指南。',
      headquarters: '乌干达共和国坎帕拉 Amber House 秘书处 & 恩德培 DGSM 核查联络办公室'
    };
  }
  return {
    ...base,
    headline: 'Diligence Raisonnable Physique Souveraine & Renseignement Anti-Fraude en Afrique de l’Est',
    subheadline: 'Fondée pour éliminer la fraude aux frais avancés sur les lingots et doter les investisseurs institutionnels, family offices et trésoreries souveraines d’une réalité terrain vérifiable.',
    missionStatement: 'Nous ne faisons ni courtage, ni achat, ni vente d’or. Notre seul mandat est la vérification physique indépendante, la validation métallurgique par coupellation et l’audit de conformité statutaire.',
    overviewParagraphs: [
      "Le corridor aurifère d'Afrique de l'Est — centré autour des raffineries agréées d'Ouganda, des chambres fortes sous douane d'Entebbe et des ceintures minières de Mubende, Kassanda, Busia et Karamoja — est devenu l'un des hubs les plus dynamiques d'Afrique. Pourtant, les investisseurs internationaux perdent chaque année des centaines de millions de dollars face à des syndicats sophistiqués proposant des remises fictives de 15 % à 25 % sous le cours LBMA.",
      "L'Uganda Gold Expedition a été établie par un directoire pluridisciplinaire d'experts forensiques, de spécialistes du négoce minier et de stratèges opérationnels pour ériger un pare-feu infranchissable entre les acheteurs légitimes et les réseaux criminels. Avant qu'un donneur d'ordre ne vire un seul dollar, notre équipe l'accompagne physiquement au cadastre DGSM d'Entebbe, dans les laboratoires de coupellation de Kampala et sur les sites d'extraction.",
      "Opérant sous une Charte de Non-Transaction stricte, notre indépendance garantit une absence totale de conflit d'intérêts commercial. Chaque dossier de vérification en 24–72h, chaque essai au feu et chaque immersion de 7 jours repose sur des preuves empiriques et des registres officiels."
    ],
    statutoryMandate: "Aligné sur la Loi sur les Mines et les Minéraux de l'Ouganda de 2022, le Mécanisme Régional de Certification de la CIRGL (ICGLR), les protocoles douaniers URA ASYCUDA World et le Guide de l'OCDE sur le devoir de diligence.",
    headquarters: 'Secrétariat Amber House, Kampala & Bureau de Liaison DGSM, Entebbe, République d’Ouganda'
  };
}

// Localized Board Members helper (keeps names exact while translating roles, bios & credentials)
export function getLocalizedBoardMembers(lang: Language, members: BoardMember[]): BoardMember[] {
  if (lang === 'EN') return members;

  return members.map((m) => {
    const lowerName = m.name.toLowerCase();
    if (lowerName.includes('mugisa')) {
      if (lang === 'AR') {
        return {
          ...m,
          role: 'كبير خبراء الأدلة الجنائية والتدقيق المخبري (Lead Forensics Expert)',
          specialty: 'تفكيك سبائك الذهب المزيفة، وتدقيق المعايرة بالنار، واستخبارات الجرائم المالية',
          bio: 'يشغل موغيسا سولومون بياكوتاغا منصب عضو مجلس الإدارة وكبير خبراء الأدلة الجنائية في بعثة أوغندا للذهب. يقود الفحص الجنائي لعروض الشركات (FCOs) وعقود البيع والشراء (SPAs) وتراخيص تداول المعادن وفحص معادن سبائك الدواري. تحت قيادته، أحبط مكتبنا الجنائي صفقات احتيالية بقيمة تتجاوز 140 مليون دولار وكشف سبائك الذهب المحشوة بالتنغستن في منطقة البحيرات الكبرى.',
          credentials: [
            'المهندس الرئيسي لمصفوفة مناعة الاحتيال وبروتوكول التحقق الجنائي من الوثائق خلال 24–72 ساعة',
            'خبير أول في الفحص بالموجات فوق الصوتية ومعايرة النار (Fire Assay) مقارنة بفحص XRF السطحي',
            'رئيس قسم العناية الواجبة للأطراف المقابلة والامتثال لمكافحة غسل الأموال (AML/KYC)'
          ]
        };
      }
      if (lang === 'ZH') {
        return {
          ...m,
          role: '首席取证专家 (Lead Forensics Expert)',
          specialty: '假冒金条拆解分析、冶金火试金审计与金融犯罪情报',
          bio: 'Mugisa Solomon Byakutaaga 担任乌干达黄金考察团董事会董事兼首席取证专家。他全面负责对公司正式报价 (FCO)、买卖协议 (SPA)、DGSM 矿产交易商牌照以及实物合质金条 (Dore Bar) 冶金成分的取证审查。在他的领导下，我们的取证团队已成功拦截超过1.4亿美元的预付费用欺诈合同，并多次识破大湖地区掺钨包金假金条骗局。',
          credentials: [
            '防诈免疫矩阵与24–72小时文件取证核验规程首席架构师',
            'XRF 表面光谱 vs. 超声波探伤与 1050°C 火试金灰吹法审计高级专家',
            '交易对手尽职调查及反洗钱/客户身份审查 (AML/KYC) 合规负责人'
          ]
        };
      }
      if (lang === 'FR') {
        return {
          ...m,
          role: 'Expert Principal en Criminalistique (Lead Forensics Expert)',
          specialty: 'Déconstruction des Contrefaçons de Lingots, Audit Métallurgique & Renseignement Financier',
          bio: 'Mugisa Solomon Byakutaaga siège au Conseil d’Administration en tant qu’Expert Principal en Criminalistique (Lead Forensics Expert). Il dirige l’examen forensique des offres FCO, des contrats SPA, des licences minières DGSM et de la métallurgie physique des barres Doré. Sous sa direction, notre bureau forensique a intercepté plus de 140 M$ de contrats frauduleux et démasqué les lingots fourrés au tungstène fritté.',
          credentials: [
            'Architecte Principal de la Matrice d’Immunité Anti-Fraude & du Protocole de Vérification Forensique 24–72h',
            'Spécialiste Senior des Audits par Ultrasons et Coupellation (Fire Assay) face aux limites XRF',
            'Directeur de la Diligence Raisonnable des Contreparties et de la Conformité LCB-FT / KYC'
          ]
        };
      }
    }

    if (lowerName.includes('kamanzai')) {
      if (lang === 'AR') {
        return {
          ...m,
          role: 'خبير تجارة المعادن والامتثال القانوني (Minerals Trade Expert)',
          specialty: 'اقتصاديات السبائك العابرة للحدود، وشهادات ICGLR، وهيكلة التسعير وفق معيار LBMA',
          bio: 'يشغل كامانزاي كايجوكا عضوية مجلس الإدارة كخبير في تجارة المعادن، حيث يشرف على هيكلة سوق السبائك الإقليمية واقتصاديات المصافي والامتثال القانوني للتصدير. بفضل خبرته المؤسسية العميقة في تدفقات المعادن بشرق أفريقيا وضريبة التصدير البالغة 5% لدى هيئة الإيرادات الأوغندية (URA)، يقدم المشورة للوفود الزائرة للتمييز بين هوامش السوق الحقيقية وعروض الخصم الوهمية.',
          credentials: [
            'مستشار مجلس الإدارة للامتثال التجاري لقانون التعدين والمعادن الأوغندي لعام 2022',
            'أخصائي في آلية الإشهاد الإقليمية (ICGLR RCM) وسلسلة حيازة المصافي المعتمدة',
            'محلل أول لديناميكيات تسعير الذهب الحرفي والصناعي في منطقة البحيرات الكبرى'
          ]
        };
      }
      if (lang === 'ZH') {
        return {
          ...m,
          role: '矿产贸易专家 (Minerals Trade Expert)',
          specialty: '跨境贵金属经济学、ICGLR 区域认证及 LBMA 现货平价结构',
          bio: 'Kamanzai Kaijuka 担任董事会董事兼矿产贸易专家，负责监管区域黄金市场结构、精炼厂包销经济学及法定出口合规事务。凭借对东非矿产流向、乌干达税务局 (URA) 5% 法定出口税框架及国际结算机制的深厚掌控，他指导来访代表团精准区分合法的矿区集货商利差与违背经济学规律的虚假折扣诱饵。',
          credentials: [
            '《2022年乌干达采矿与矿产法》商业合规董事会顾问',
            'ICGLR 区域认证机制 (RCM) 与精炼厂监管链溯源专家',
            '大湖地区手工与工业黄金定价动态高级分析师'
          ]
        };
      }
      if (lang === 'FR') {
        return {
          ...m,
          role: 'Expert du Négoce des Minéraux (Minerals Trade Expert)',
          specialty: 'Économie Transfrontalière de l’Or, Certification CIRGL (ICGLR) & Parité Spot LBMA',
          bio: "Kamanzai Kaijuka siège au Conseil d'Administration en tant qu'Expert du Négoce des Minéraux, supervisant la structure du marché régional, l'économie des raffineries et la conformité statutaire à l'exportation. Fort d'une maîtrise approfondie des flux miniers est-africains et de la taxe d'exportation URA de 5 %, il conseille les délégations pour distinguer les marges légitimes des leurres frauduleux.",
          credentials: [
            'Conseiller du Directoire sur la Conformité Commerciale de la Loi Minière Ougandaise de 2022',
            'Spécialiste du Mécanisme Régional de Certification CIRGL (RCM) et de la Chaîne de Traçabilité',
            'Analyste Senior de la Dynamique des Prix de l’Or Artisanal et Industriel des Grands Lacs'
          ]
        };
      }
    }

    if (lowerName.includes('ronnie')) {
      if (lang === 'AR') {
        return {
          ...m,
          role: 'مدير العمليات واللوجستيات والاستراتيجية (Operations, Logistics & Strategy)',
          specialty: 'الأمن الميداني السيادي، وعمليات المواكب المصفحة B6، والبروتوكول الدبلوماسي',
          bio: 'يشغل روني موغارورا عضوية مجلس الإدارة لقيادة العمليات واللوجستيات والاستراتيجية. يدير التنفيذ الشامل لبعثاتنا الميدانية التي تمتد لسبعة أيام — بدءاً من تنسيق التصاريح الدبلوماسية لكبار الشخصيات في مطار عنتيبي، والمواكب التنفيذية المصفحة B6، ووحدات الحماية التكتيكية لمناجم بوسيا وموبيندي، وصولاً إلى الدخول الآمن للمصافي الجمركية والوزارات الحكومية.',
          credentials: [
            'مدير اللوجستيات السيادية للبعثات وعمليات المواكب المصفحة B6',
            'مسؤول الارتباط الاستراتيجي لدخول مواقع التعدين في موبيندي وكاساندا وبوسيا',
            'مهندس عمليات الوفود التنفيذية متعددة الفئات ووحدات الحماية التكتيكية'
          ]
        };
      }
      if (lang === 'ZH') {
        return {
          ...m,
          role: '运营、后勤与战略总监 (Operations, Logistics and Strategy)',
          specialty: '主权级外勤安保、B6防弹装甲车队行动与外交礼宾规程',
          bio: 'Ronnie Mugarura 担任董事会董事，主管运营、后勤与战略。他统筹执行为期7天的黄金供应链实地考察任务——协调恩德培国际机场 VIP 外交快速通关、专属 B6 级防弹装甲行政车队护航、前往布西亚与穆本德矿区的贴身战术安保分队，以及进入保税精炼厂和政府部委的高安全级别通行许可。',
          credentials: [
            '主权考察团后勤与 B6 防弹装甲车队运营总监',
            '穆本德、卡桑达及布西亚矿区现场准入战略联络官',
            '多等级高管代表团运营与贴身战术保护架构师'
          ]
        };
      }
      if (lang === 'FR') {
        return {
          ...m,
          role: 'Directeur des Opérations, de la Logistique et de la Stratégie',
          specialty: 'Sécurité de Terrain Souveraine, Convois Blindés B6 & Protocole Diplomatique',
          bio: "Ronnie Mugarura siège au Conseil d'Administration à la tête des Opérations, de la Logistique et de la Stratégie. Il orchestre l'exécution de bout en bout de nos expéditions de 7 jours — coordonnant les accréditations diplomatiques VIP à l'aéroport d'Entebbe, les cortèges exécutifs blindés B6 dédiés, les détachements tactiques de protection rapprochée vers Busia et Mubende, et l'accès sécurisé aux raffineries sous douane.",
          credentials: [
            'Directeur de la Logistique d’Expédition Souveraine et des Opérations de Convois Blindés B6',
            'Liaison Stratégique pour l’Accès aux Concessions Minières de Mubende, Kassanda et Busia',
            'Architecte des Opérations de Délégations Exécutives Multi-Niveaux et Protection Tactique'
          ]
        };
      }
    }

    return m;
  });
}

// Localized Supply Chain Steps
export function getLocalizedSupplyChainSteps(lang: Language): SupplyChainStepTranslation[] {
  if (lang === 'AR') {
    return [
      {
        id: 'extraction',
        stageNumber: '01',
        name: 'الاستخراج ومصدر المنجم',
        location: 'موبيندي، كاساندا، بوسيا، كاراموجا',
        realEntity: 'جمعيات التعدين الحرفي المرخصة وعقود التعدين الكبرى',
        fraudRisk: 'مناجم وهمية، ادعاءات كاذبة بوجود مخزون 500 كجم، واستخدام غير قانوني للزئبق.',
        dueDiligenceAction: 'تدقيق إحداثيات GPS ميدانياً عبر بوابة السجل المعدني DGSM والتحقق المباشر من كميات الإنتاج.'
      },
      {
        id: 'consolidation',
        stageNumber: '02',
        name: 'تجميع الوكلاء الإقليميين',
        location: 'مراكز التداول المحلية ومجمعو كمبالا',
        realEntity: 'حاملو تراخيص تجارة المعادن (MDL) المعتمدون',
        fraudRisk: 'وسطاء غير مرخصين يدعون تفويضاً سيادياً، وتهريب عبر الحدود دون شهادة ICGLR.',
        dueDiligenceAction: 'مراجعة الرقم الضريبي للتاجر، والامتثال الضريبي لدى URA، وسجلات تتبع ICGLR.'
      },
      {
        id: 'smelting-assay',
        stageNumber: '03',
        name: 'الصهر ومعايرة النار (Cupellation)',
        location: 'مصافي الذهب الجمركية (عنتيبي / كمبالا)',
        realEntity: 'المصاهر والمختبرات المعدنية المعتمدة بشهادة ISO',
        fraudRisk: 'الاكتفاء بفحص XRF السطحي الذي يفشل في كشف قضبان التنغستن أو النحاس المطلي بالذهب، وشهادات الفحص الورقية المزورة.',
        dueDiligenceAction: 'الصهر الكامل بالحث وأخذ عينات بالحفر متبوعاً بمعايرة النار الكلاسيكية في مختبر معتمد.'
      },
      {
        id: 'customs-taxation',
        stageNumber: '04',
        name: 'جمارك URA وضريبة التصدير القانونية',
        location: 'مديرية الجمارك في هيئة الإيرادات الأوغندية (URA)',
        realEntity: 'النافذة الإلكترونية الموحدة (ASYCUDA World)',
        fraudRisk: 'أختام تخليص ضريبي مزيفة، وطلبات دفع رسوم التصدير نقداً أو لحسابات محامين خاصة.',
        dueDiligenceAction: 'التحقق المباشر من أرقام التقييم الإلكترونية (PRN) عبر البوابة الحكومية الرسمية.'
      },
      {
        id: 'armored-dispatch',
        stageNumber: '05',
        name: 'النقل المصفح والتصدير الجوي',
        location: 'الخزنة الجمركية بمطار عنتيبي الدولي (EBB)',
        realEntity: 'شركات النقل الأمني المعتمدة (Brinks, Malca-Amit, G4S)',
        fraudRisk: 'نقل بسيارات خاصة غير محروسة، وخدعة المراسلين الدبلوماسيين، وبوالص الشحن الجوي الوهمية.',
        dueDiligenceAction: 'بيان شحن أمني مسلح مباشرة إلى عنبر الطائرة تحت إشراف جمركي ثنائي (إلى دبي أو زيورخ).'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        id: 'extraction',
        stageNumber: '01',
        name: '矿坑开采与源头产地',
        location: '穆本德、卡桑达、布西亚、卡拉莫贾',
        realEntity: '持牌手工采矿协会与大型采矿租约持有人',
        fraudRisk: '虚构矿山、根本不存在的“500公斤廉价金砂库存”、非法汞齐淘金。',
        dueDiligenceAction: '对照 DGSM 矿权门户进行实地 GPS 边界审计；现场核实真实日产量。'
      },
      {
        id: 'consolidation',
        stageNumber: '02',
        name: '区域矿产商集货整合',
        location: '地方交易中心与坎帕拉集货商',
        realEntity: '持有矿产交易商牌照 (MDL) 的合法实体',
        fraudRisk: '无牌中间商冒充政府特许代表；从刚果(金)非法走私且无 ICGLR 溯源证书。',
        dueDiligenceAction: '审计交易商税务识别号、URA 预扣税合规记录及 ICGLR 监管链台账。'
      },
      {
        id: 'smelting-assay',
        stageNumber: '03',
        name: '熔炼与火试金灰吹法 (Cupellation)',
        location: '保税黄金精炼厂（恩德培 / 坎帕拉）',
        realEntity: 'ISO 认证冶金熔炼厂与实验室',
        fraudRisk: '仅做表面 XRF 光谱扫描（无法识别内部钨芯或铜合金假金条）；伪造纸质化验单。',
        dueDiligenceAction: '感应炉整体熔炼、钻孔取样，并在认证实验室内进行 1050°C 经典铅灰吹火试金法检测。'
      },
      {
        id: 'customs-taxation',
        stageNumber: '04',
        name: 'URA 海关与法定 5% 出口税',
        location: '乌干达税务局 (URA) 海关总署',
        realEntity: 'URA 电子单一窗口系统 (ASYCUDA World)',
        fraudRisk: '伪造完税印章、要求买家向私人律师账户预付出口税、伪造乌干达央行申报单。',
        dueDiligenceAction: '通过政府官方税务门户直接核验电子缴款注册号 (PRN) 与 ASYCUDA 报关单。'
      },
      {
        id: 'armored-dispatch',
        stageNumber: '05',
        name: '防弹押运与停机坪空运出口',
        location: '恩德培国际机场 (EBB) 保税金库',
        realEntity: '国际认证安保物流 (Brinks, Malca-Amit, G4S)',
        fraudRisk: '私人车辆无押运运输、虚假的“外交官随身押运”、根本不存在的幽灵航空货运提单。',
        dueDiligenceAction: '武装安保押运直达飞机货舱，完成双边海关清关发往迪拜或苏黎世。'
      }
    ];
  }
  if (lang === 'FR') {
    return [
      {
        id: 'extraction',
        stageNumber: '01',
        name: 'Extraction & Origine au Puits',
        location: 'Mubende, Kassanda, Busia, Karamoja',
        realEntity: 'Associations Minières Artisanales Agréées & Concessions Industrielles',
        fraudRisk: 'Mines fictives, stocks inexistants de 500 kg, orpaillage illégal au mercure.',
        dueDiligenceAction: 'Audit physique des limites GPS sur le portail du Cadastre DGSM ; vérification directe des volumes.'
      },
      {
        id: 'consolidation',
        stageNumber: '02',
        name: 'Consolidation par les Négociants Régionaux',
        location: 'Centres de Négoce Locaux & Agrégateurs de Kampala',
        realEntity: 'Titulaires de Licence de Négociant en Minéraux (MDL)',
        fraudRisk: 'Intermédiaires sans licence revendiquant un mandat souverain ; contrebande sans certificat CIRGL.',
        dueDiligenceAction: 'Audit de l’identifiant fiscal du négociant, de la conformité URA et des registres CIRGL (ICGLR).'
      },
      {
        id: 'smelting-assay',
        stageNumber: '03',
        name: 'Fusion & Essai au Feu (Coupellation)',
        location: 'Raffineries d’Or sous Douane (Entebbe / Kampala)',
        realEntity: 'Fonderies & Laboratoires Métallurgiques Accrédités ISO',
        fraudRisk: 'Scans XRF de surface uniquement (qui manquent les cœurs en tungstène ou alliages de cuivre) ; faux certificats papier.',
        dueDiligenceAction: 'Fusion homogène par induction, forage de carottes et coupellation au plomb à 1050°C en laboratoire accrédité.'
      },
      {
        id: 'customs-taxation',
        stageNumber: '04',
        name: 'Douanes URA & Taxe Statutaire d’Exportation (5%)',
        location: 'Direction des Douanes de l’Uganda Revenue Authority (URA)',
        realEntity: 'Guichet Unique Électronique URA (ASYCUDA World)',
        fraudRisk: 'Faux cachets fiscaux, demandes de paiement anticipé des taxes à des cabinets privés, fausses déclarations.',
        dueDiligenceAction: 'Vérification directe des numéros d’enregistrement de paiement (PRN) sur le portail gouvernemental.'
      },
      {
        id: 'armored-dispatch',
        stageNumber: '05',
        name: 'Transit Blindé & Exportation Côté Piste',
        location: 'Chambre Forte sous Douane de l’Aéroport d’Entebbe (EBB)',
        realEntity: 'Logistique Sécurisée Accréditée (Brinks, Malca-Amit, G4S)',
        fraudRisk: 'Transport en véhicule privé sans escorte, faux courriers diplomatiques, fausses lettres de transport aérien (AWB).',
        dueDiligenceAction: 'Transfert blindé armé directement jusqu’à la soute de l’avion sous contrôle douanier bilatéral (CIF Zurich/Dubaï).'
      }
    ];
  }
  return [
    {
      id: 'extraction',
      stageNumber: '01',
      name: 'Extraction & Pithead Origin',
      location: 'Mubende, Kassanda, Busia, Karamoja',
      realEntity: 'Licensed Artisanal Mining Associations & Large Scale Leases',
      fraudRisk: 'Fictitious mines, non-existent 500kg stockpiles, illegal mercury panning, zero environmental rehabilitation.',
      dueDiligenceAction: 'Physical GPS boundary audit against DGSM Cadastre portal; direct verification of extraction volumes.'
    },
    {
      id: 'consolidation',
      stageNumber: '02',
      name: 'Regional Dealer Consolidation',
      location: 'Local Trading Hubs & Kampala Aggregators',
      realEntity: 'Mineral Dealer License (MDL) Holders',
      fraudRisk: 'Unlicensed intermediaries claiming sovereign mandate; illicit cross-border smuggling from DRC without ICGLR trace.',
      dueDiligenceAction: 'Audit of dealer tax identification, URA withholding tax compliance, and ICGLR chain-of-custody logbooks.'
    },
    {
      id: 'smelting-assay',
      stageNumber: '03',
      name: 'Smelting & Fire Assay (Cupellation)',
      location: 'Bonded Gold Refineries (Entebbe / Kampala)',
      realEntity: 'ISO-Accredited Metallurgical Smelters & Laboratories',
      fraudRisk: 'Surface-only XRF scans that miss hollow tungsten bars or copper-alloy cores; forged paper assay certificates.',
      dueDiligenceAction: 'Core-drilling molten sampling followed by classical lead cupellation Fire Assay in accredited laboratory.'
    },
    {
      id: 'customs-taxation',
      stageNumber: '04',
      name: 'URA Customs & Statutory Export Levy',
      location: 'Uganda Revenue Authority (URA) Customs Directorate',
      realEntity: 'URA Electronic Single Window (ASYCUDA World)',
      fraudRisk: 'Fake tax clearance stamps, requests for cash export fee payoffs, counterfeit Bank of Uganda declarations.',
      dueDiligenceAction: 'Direct verification of electronic assessment numbers through official government revenue portal.'
    },
    {
      id: 'armored-dispatch',
      stageNumber: '05',
      name: 'Armored Transit & Airside Export',
      location: 'Entebbe International Airport (EBB) Bonded Vault',
      realEntity: 'Accredited Secure Logistics (Brinks, Malca-Amit, G4S)',
      fraudRisk: 'Unescorted private vehicle transport, fake diplomat passenger couriers, non-manifest air cargo scams.',
      dueDiligenceAction: 'Armed security manifest directly to airline hold under bilateral customs clearance (CIF Zurich/Dubai).'
    }
  ];
}

// Localized Market Realities
export function getLocalizedMarketRealities(lang: Language) {
  if (lang === 'EN') return MARKET_REALITIES;
  if (lang === 'AR') {
    return [
      {
        id: 'discrepancy',
        metric: '+700 مليون دولار',
        metricSub: 'قيمة الصادرات الشهرية',
        title: 'فجوة الإمدادات الضخمة',
        tag: 'حقيقة مركز العبور الإقليمي',
        description: 'تكشف السجلات الجمركية الرسمية في أوغندا عن صادرات ذهب شهرية بمئات الملايين من الدولارات، مما يتجاوز بكثير الاستخراج الجيولوجي المحلي. تعمل البلاد كجسر رئيسي للمعالجة والصهر في شرق أفريقيا.',
        implication: 'بدون تتبع جنائي لسلسلة الحيازة، يقع المشترون الدوليون في فخ معادن النزاعات أو شبكات التهريب أو سجلات العبور المزيفة.',
        keyStat: '94% من تدفقات العبور تنشأ خارج الحدود الوطنية؛ لذا فإن التحقق من أختام ICGLR أمر بالغ الأهمية.'
      },
      {
        id: 'discount-trap',
        metric: 'خصم 25%',
        metricSub: 'الطُعم الكلاسيكي للاحتيال',
        title: 'فخ "الذهب المخفض"',
        tag: 'تشريح احتيال الرسوم المسبقة',
        description: 'الذهب المعتمد وفق معيار LBMA هو الأصل النقدي الأكثر سيولة على وجه الأرض. أي عرض يقترح بيع الذهب بخصم 10% أو 15% أو 25% أقل من السعر الفوري هو استحالة رياضية مصممة لاستدراج الدفعات المقدمة.',
        implication: 'يطلب البائع من 40,000 إلى 250,000 دولار مقدماً كـ "ضرائب تصدير" أو "تأمين جمركي" — ليختفي بعدها المحامي والذهب تماماً.',
        keyStat: 'يُتداول الذهب الحقيقي عند فوهة المنجم بخصم 1-3% فقط عن السعر الفوري؛ الخصومات الكبيرة احتيالية دائماً.'
      },
      {
        id: 'forgery-industry',
        metric: '99.8%',
        metricSub: 'نسبة التزوير في صفقات الواتساب',
        title: 'صناعة الوثائق المزورة',
        tag: 'مستندات مصطنعة عالية الدقة',
        description: 'تقوم شبكات متخصصة بتصنيع تصاريح تصدير مزيفة وتوقيعات منسوبة لـ DGSM وأختام جمارك URA وشهادات تخليص مزورة تخدع المشترين الأجانب بسهولة على الورق.',
        implication: 'الاعتماد على ملفات PDF المرسلة عبر الواتساب أو البريد الإلكتروني دون مطابقة ميدانية للسجل المعدني يضمن خسارة رأس المال بالكامل.',
        keyStat: 'يتم تفكيك أكثر من 40 نوعاً من الوثائق المزورة عملياً في مختبر اليوم الثاني من البعثة.'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        id: 'discrepancy',
        metric: '$7亿+',
        metricSub: '月度黄金出口额',
        title: '巨大的供应量剪刀差',
        tag: '区域转口枢纽真相',
        description: '乌干达官方海关记录显示每月黄金出口额高达数亿美元，远超其本土矿山开采量。该国实际上承担着东非首要的区域黄金加工与熔炼桥梁角色。',
        implication: '如果缺乏取证级监管链溯源，国际买家极易误入冲突矿产、走私管道或完全伪造的过境记录陷阱。',
        keyStat: '94% 的过境黄金源自邻国；核验跨境 ICGLR 区域认证印章真伪至关重要。'
      },
      {
        id: 'discount-trap',
        metric: '25% 折扣',
        metricSub: '经典诈骗诱饵',
        title: '“高折扣黄金”致命陷阱',
        tag: '预付费用诈骗解剖',
        description: '伦敦金银市场协会 (LBMA) 黄金是地球上流动性最强的货币资产。任何声称低于国际现货价 10%、15% 或 25% 的黄金报价在数学和经济学上都是绝对不可能的，纯粹是为了骗取定金。',
        implication: '卖方会要求买方预付 4万 至 25万美元的“出口税”、“海关保税费”或“安保费”——随后托管律师与黄金人间蒸发。',
        keyStat: '矿坑源头真实黄金仅比国际现货低 1%–3%；一切深度折扣报价 100% 属于诈骗。'
      },
      {
        id: 'forgery-industry',
        metric: '99.8%',
        metricSub: 'WhatsApp 报价单伪造率',
        title: '高度产业化的假证工厂',
        tag: '高仿合成文件',
        description: '成熟的地下假证产业专门制造照片级逼真的假出口许可证、伪造的 DGSM 官员签名、假 URA 海关印章以及伪造的乌干达央行清关证书，极易在纸面上蒙蔽外国买家。',
        implication: '仅凭 WhatsApp 或邮件收到的 PDF 文件而不进行现场矿权登记处交叉核对，必然导致本金全损。',
        keyStat: '我们在第2天“防诈学院”实验室中收录并现场拆解超过 40 种真实缴获的伪造文件。'
      }
    ];
  }
  return [
    {
      id: 'discrepancy',
      metric: '700 M$+',
      metricSub: 'Valeur Mensuelle des Exportations',
      title: 'La Disproportion Massive de l’Offre',
      tag: 'Réalité du Hub de Transit',
      description: "Les registres douaniers officiels de l'Ouganda révèlent des centaines de millions de dollars d'exportations mensuelles d'or, dépassant largement l'extraction nationale. Le pays sert de pont régional de fusion et d'affinage.",
      implication: 'Sans suivi forensique de la chaîne de traçabilité, les acheteurs internationaux tombent dans les minerais de conflit ou des documents de transit fabriqués.',
      keyStat: '94 % des flux de transit proviennent hors des frontières ; la vérification des sceaux CIRGL (ICGLR) est vitale.'
    },
    {
      id: 'discount-trap',
      metric: '-25 %',
      metricSub: 'L’Appât Classique',
      title: 'Le Piège de « l’Or à Prix Cassé »',
      tag: 'Anatomie des Frais Avancés',
      description: "L'or LBMA est la matière première monétaire la plus liquide au monde. Toute offre proposant de l'or à 10 %, 15 % ou 25 % sous le cours spot est une impossibilité mathématique conçue pour soutirer des acomptes.",
      implication: "Le vendeur exige 40 000 $ à 250 000 $ d'avance pour des « taxes d'exportation » ou « frais de douane » — avant que l'avocat séquestre et l'or ne disparaissent.",
      keyStat: 'Le vrai or au puits de mine se négocie à seulement 1 à 3 % sous le spot ; les fortes remises sont toujours frauduleuses.'
    },
    {
      id: 'forgery-industry',
      metric: '99,8 %',
      metricSub: 'Taux de Contrefaçon sur WhatsApp',
      title: 'L’Industrie de la Falsification',
      tag: 'Documentation Synthétique',
      description: "Une véritable industrie parallèle fabrique de faux permis d'exportation photoréalistes, des signatures DGSM falsifiées, de faux cachets URA et des certificats contrefaits de la Banque d'Ouganda.",
      implication: 'Se fier à des fichiers PDF envoyés par WhatsApp ou e-mail sans vérification sur place au cadastre garantit une perte totale du capital.',
      keyStat: 'Plus de 40 variétés de faux documents sont cataloguées et déconstruites lors du Jour 2 à la Scam Academy.'
    }
  ];
}

// Localized Scam Rules
export function getLocalizedScamRules(lang: Language): ScamRule[] {
  if (lang === 'EN') return SCAM_RULES;
  if (lang === 'AR') {
    return [
      {
        id: 'deep-discount',
        label: 'عرض الذهب بخصم يتجاوز 10% تحت سعر LBMA الفوري',
        description: 'يعد البائع بتوريد سبائك أو تراب ذهب بخصم يتراوح بين 12% و30% أقل من سعر بورصة لندن (LBMA).',
        riskScore: 35,
        category: 'pricing',
        explanation: 'علامة حمراء قاتلة: الذهب عملة عالمية فورية السيولة. تدفع المصافي المحلية في كمبالا 98-99% من السعر الفوري نقداً خلال ساعتين، فلا يوجد أي مبرر لبيع الذهب بخصم كبير.'
      },
      {
        id: 'advance-export-tax',
        label: 'مطالبة المشتري بدفع ضرائب التصدير أو رسوم الأمن مقدماً',
        description: 'يطلب البائع تحويل 30 إلى 150 ألف دولار لتسديد "ضريبة تصدير URA بنسبة 5%" أو "شهادة عبور الأمم المتحدة" قبل الشحن.',
        riskScore: 30,
        category: 'customs',
        explanation: 'احتيال الرسوم المسبقة الكلاسيكي: في التجارة القانونية، تُدفع رسوم التصدير مباشرة عبر بوابة URA الحكومية الرسمية بعد المعايرة، أو عبر اعتمادات بنكية موثقة.'
      },
      {
        id: 'fake-escrow-lawyer',
        label: 'الدفع إلى حساب ضمان (Escrow) لمكتب محاماة خاص في كمبالا',
        description: 'يصر البائع على إيداع الأموال في حساب محامٍ خاص بدلاً من بنك تجاري من الفئة الأولى وفق نظام SWIFT MT103.',
        riskScore: 25,
        category: 'banking',
        explanation: 'خطر التواطؤ: غالباً ما يتم فتح حسابات ضمان صورية وصرف الأموال فور تقديم أوراق غير محققة، مما يترك المشتري دون أي حماية قانونية.'
      },
      {
        id: 'drc-origin-untraceable',
        label: 'ادعاء المصدر من الكونغو أو جنوب السودان بشهادات مصورة عبر الواتساب',
        description: 'ذهب يُزعم أنه من مناجم حرفية مصحوباً بصور ممسوحة ضوئياً لشهادات ICGLR أو CEEC.',
        riskScore: 20,
        category: 'documentation',
        explanation: 'انتهاك سلسلة الحيازة: أكثر من 90% من شهادات ICGLR المتداولة عبر الواتساب مزورة وتحتوي على رموز QR تقود إلى مواقع تحقق وهمية منسوخة.'
      },
      {
        id: 'cif-dubai-free-shipping',
        label: 'وعد البائع بالشحن المجاني (CIF دبي / زيورخ) مقابل رسوم تأمين مسبقة',
        description: 'يدعي البائع أنه سينقل الذهب جواً على نفقته، لكنه يطلب من المشتري دفع "تأمين الشحنة" أو "أمن الطائرة الخاصة".',
        riskScore: 25,
        category: 'customs',
        explanation: 'خدعة الناقل الوهمي: ينتحل المحتالون صفة شركات شحن ويصدرون بوالص شحن جوي (AWB) وهمية للمطالبة بمبالغ متكررة للإفراج الجمركي.'
      },
      {
        id: 'refusal-physical-refinery-assay',
        label: 'رفض إجراء معايرة النار (Fire Assay) الفورية في مصفاة معتمدة بعنتيبي',
        description: 'يسمح البائع فقط بمعاينة بصرية في فندق أو مكتب خاص، ويرفض دخول مصفاة جمركية معتمدة لصهر السبيكة وفحصها قبل التحويل.',
        riskScore: 30,
        category: 'pricing',
        explanation: 'سبائك مزيفة: البائعون الحقيقيون يرحبون بمعايرة النار في المصفاة المعتمدة. التردد يعني وجود نحاس مطلي بالذهب أو قلب من التنغستن.'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        id: 'deep-discount',
        label: '报价低于 LBMA 国际现货价 10% 以上',
        description: '卖方承诺以低于国际 LBMA 现货价 12% 至 30% 的折扣供应金条或金砂。',
        riskScore: 35,
        category: 'pricing',
        explanation: '致命红旗：黄金是全球硬通货。坎帕拉当地持牌精炼厂在2小时内即可支付 98%–99% 的现货现金，任何合法矿主绝不可能白送数百万美元利润。'
      },
      {
        id: 'advance-export-tax',
        label: '要求买方预付出口税、清关费或安保费',
        description: '卖方要求买方在发货前电汇 3万–15万美元用于缴纳“URA 5% 出口税”、“联合国过境证”或“保税仓费”。',
        riskScore: 30,
        category: 'customs',
        explanation: '典型预付费用诈骗：在合法贸易体系下，出口税仅凭真实化验单通过 URA 官方税务门户生成 PRN 直接缴入国库，或通过银行信用证结算。'
      },
      {
        id: 'fake-escrow-lawyer',
        label: '要求将资金汇入坎帕拉私人律师事务所托管账户 (Escrow)',
        description: '卖方坚持要求将资金存入坎帕拉某私人律师账户，而非一级商业银行的有条件银行托管账户。',
        riskScore: 25,
        category: 'banking',
        explanation: '串通欺诈风险：不良执业者经常设立一次性托管账户，一旦收到伪造文件便立即放款分赃，买方将面临零法律救济。'
      },
      {
        id: 'drc-origin-untraceable',
        label: '声称源自刚果(金)/南苏丹且仅提供 WhatsApp 扫描证书',
        description: '声称黄金来自刚果(金)东部手工矿，仅附带手机拍照或扫描的 ICGLR / CEEC 证书。',
        riskScore: 20,
        category: 'documentation',
        explanation: '违反监管链规定：超过 90% 在 WhatsApp 上流传的 ICGLR 证书均为伪造，其二维码指向克隆的假冒验证网站。'
      },
      {
        id: 'cif-dubai-free-shipping',
        label: '卖方承诺“CIF 迪拜/苏黎世免费空运”但索要前期保险费',
        description: '卖方声称承担空运费用将黄金运至买方精炼厂，但要求买方先支付“货运保险”或“包机安保费”。',
        riskScore: 25,
        category: 'customs',
        explanation: '幽灵货代骗局：诈骗团伙冒充货运公司签发虚假空运提单 (AWB)，随后以“海关扣押放行”为由连环勒索费用。'
      },
      {
        id: 'refusal-physical-refinery-assay',
        label: '拒绝在恩德培认证保税精炼厂进行独立火试金检测',
        description: '卖方仅允许在酒店套房或私人办公室目视看货，拒绝在付款前进入认证保税精炼厂进行熔炼钻孔与火试金化验。',
        riskScore: 30,
        category: 'pricing',
        explanation: '假冒金条铁证：真正的卖家无不欢迎权威精炼厂火试金检测。任何推诿均表明货物为镀金黄铜或钨芯假金条。'
      }
    ];
  }
  return [
    {
      id: 'deep-discount',
      label: 'Offre à > 10 % sous le Cours Spot LBMA',
      description: 'Le vendeur promet des lingots ou de la poudre d’or avec une remise de 12 % à 30 % sous le cours international LBMA.',
      riskScore: 35,
      category: 'pricing',
      explanation: 'SIGNAL FATAL : L’or est une devise universellement liquide. Aucun mineur légitime ne cède des millions quand les raffineries locales paient 98-99 % du spot en espèces en 2 heures.'
    },
    {
      id: 'advance-export-tax',
      label: 'L’Acheteur Doit Payer d’Avance la Taxe d’Exportation ou Frais de Sécurité',
      description: 'Le vendeur demande de virer 30 k$ à 150 k$ pour la « taxe URA de 5 % », un « certificat ONU » ou des frais d’entrepôt avant expédition.',
      riskScore: 30,
      category: 'customs',
      explanation: 'FRAUDE AUX FRAIS AVANCÉS : Les taxes d’exportation sont payées directement via le portail officiel URA ASYCUDA contre essai authentique.'
    },
    {
      id: 'fake-escrow-lawyer',
      label: 'Paiement sur le Compte Séquestre d’un Cabinet d’Avocats Privé à Kampala',
      description: 'Le vendeur insiste pour que les fonds soient déposés chez un avocat privé plutôt que dans une banque commerciale de rang 1.',
      riskScore: 25,
      category: 'banking',
      explanation: 'RISQUE DE COLLUSION : Des praticiens véreux ouvrent des comptes séquestres éphémères et libèrent les fonds dès présentation de faux papiers.'
    },
    {
      id: 'drc-origin-untraceable',
      label: 'Origine Prétendue RDC / Soudan du Sud avec Certificats WhatsApp',
      description: 'Or prétendument issu de mines artisanales en RDC orientale, accompagné de certificats CIRGL / CEEC scannés.',
      riskScore: 20,
      category: 'documentation',
      explanation: 'VIOLATION DE TRAÇABILITÉ : Plus de 90 % des certificats CIRGL sur WhatsApp sont falsifiés avec de faux codes QR renvoyant vers des serveurs clonés.'
    },
    {
      id: 'cif-dubai-free-shipping',
      label: 'Promesse « CIF Dubaï / Zurich » avec Frais d’Assurance Avancés',
      description: 'Le vendeur affirme expédier l’or à ses frais mais demande à l’acheteur de payer « l’assurance cargo » ou la « sécurité du vol charter ».',
      riskScore: 25,
      category: 'customs',
      explanation: 'ARNAQUE AU TRANSPORTEUR FANTÔME : Les fraudeurs émettent de fausses lettres de transport aérien (AWB) et réclament sans fin des frais de déblocage douanier.'
    },
    {
      id: 'refusal-physical-refinery-assay',
      label: 'Refus d’Essai au Feu (Fire Assay) Immédiat en Raffinerie Agréée à Entebbe',
      description: 'Le vendeur n’autorise qu’une inspection visuelle à l’hôtel et refuse d’entrer en raffinerie sous douane pour forage et coupellation.',
      riskScore: 30,
      category: 'pricing',
      explanation: 'LINGOTS CONTREFAITS : Les vendeurs légitimes acceptent toujours la coupellation en raffinerie certifiée. L’hésitation trahit du laiton doré ou un cœur en tungstène.'
    }
  ];
}

// Localized Legal Charter Pillars
export function getLocalizedCharterPillars(lang: Language) {
  if (lang === 'EN') return LEGAL_CHARTER_PILLARS;
  if (lang === 'AR') {
    return [
      {
        number: '01',
        title: 'سياسة عدم التداول الصارمة',
        subtitle: 'استقلالية مطلقة',
        content: 'بعثة أوغندا للذهب هي مهمة تعليمية واستقصائية بحتة لمكافحة الاحتيال والعناية الواجبة. نحن لا نبيع ولا نشتري ولا نتوسط ولا نمتلك أي ذهب مادي أو امتيازات تعدين، ولا نقبل أي عمولات أو رسوم وساطة من أي منجم أو مصفاة أو تاجر.'
      },
      {
        number: '02',
        title: 'فحص KYC وقوائم العقوبات الدولية',
        subtitle: 'فحص عقوبات OFAC والأمم المتحدة وUK HMT والاتحاد الأوروبي وفحص PEP',
        content: 'تشمل كل باقة بعثة فحص الخلفية وقوائم عقوبات OFAC والأمم المتحدة وUK HMT والاتحاد الأوروبي وفحص الشخصيات السياسية البارزة (PEP) وإجراءات الارتباط الحكومي دون أي رسوم KYC منفصلة.'
      },
      {
        number: '03',
        title: 'الامتثال لقانون التعدين والمعادن لعام 2022',
        subtitle: 'التوافق القانوني والدولي',
        content: 'تلتزم جميع العمليات الميدانية والزيارات وتدقيق السجلات التزاماً صارماً بقانون التعدين والمعادن الأوغندي لعام 2022، وآلية الإشهاد الإقليمية (ICGLR RCM)، وإرشادات منظمة التعاون الاقتصادي والتنمية (OECD)، ولوائح بنك أوغندا لمكافحة غسل الأموال.'
      },
      {
        number: '04',
        title: 'التدقيق الأمني الصارم والتحكم في الوصول',
        subtitle: 'حماية النزاهة والسلامة',
        content: 'المشاركة غير مفتوحة للجمهور العام. يجب على كل مشارك تقديم وثائق الشركة وجواز السفر التنفيذي والخضوع لفحص عقوبات OFAC والأمم المتحدة وUK HMT والاتحاد الأوروبي وفحص PEP وتوقيع اتفاقية عدم تداول ملزمة.'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        number: '01',
        title: '严格的零交易政策',
        subtitle: '绝对独立立场',
        content: '乌干达黄金考察团纯属教育、反欺诈与尽职调查任务。我们不出售、购买、居间、交易或持有任何实物黄金、矿权或金条的所有权。我们绝不接受任何矿主、精炼厂或贸易商的佣金、回扣或居间介绍费。'
      },
      {
        number: '02',
        title: '法定 KYC 与制裁名单筛查',
        subtitle: 'OFAC、联合国、UK HMT、欧盟制裁名单及 PEP 审查',
        content: '每个考察套餐均包含背景审查、OFAC、联合国、英国财政部 (UK HMT)、欧盟制裁名单及政治公众人物 (PEP) 筛查和政府联络审批，无任何单独的 KYC 押金费用。'
      },
      {
        number: '03',
        title: '严格遵循《2022年采矿与矿产法》',
        subtitle: '法定与国际标准对齐',
        content: '所有实地考察、矿区访问及矿权核查均严格遵守《2022年乌干达采矿与矿产法》、大湖地区区域认证机制 (ICGLR RCM)、经合组织 (OECD) 负责任供应链尽职调查指南及乌干达央行反洗钱法规。'
      },
      {
        number: '04',
        title: '严格的背景审查与准入控制',
        subtitle: '保障诚信与安全',
        content: '本项目不对公众开放。每位申请参团的高管必须提交企业资质验证、护照详情，接受 OFAC、联合国、UK HMT、欧盟制裁名单及 PEP 审查，并签署具有法律约束力的《非交易协议》。'
      }
    ];
  }
  return [
    {
      number: '01',
      title: 'Politique Stricte de Zéro Transaction',
      subtitle: 'Indépendance Absolue',
      content: "L'Uganda Gold Expedition est exclusivement une mission éducative, anti-fraude et de diligence raisonnable. Nous ne vendons, n'achetons, ne courtons ni ne détenons aucun titre sur de l'or physique ou des concessions minières. Nous n'acceptons aucune commission."
    },
    {
      number: '02',
      title: 'Filtrage KYC & Sanctions Statutaire',
      subtitle: 'Filtrage des Sanctions OFAC, ONU, UK HMT, UE & PEP',
      content: "Chaque forfait d'expédition comprend la vérification des antécédents, le filtrage des sanctions OFAC, ONU, UK HMT, UE et PEP, ainsi que les liaisons gouvernementales, sans frais KYC séparés."
    },
    {
      number: '03',
      title: 'Conformité à la Loi Minière de 2022',
      subtitle: 'Alignement Statutaire & International',
      content: "Toutes les opérations de terrain et inspections cadastrales respectent strictement la Loi sur les Mines et les Minéraux de l'Ouganda de 2022, le mécanisme CIRGL (RCM), les lignes directrices de l'OCDE et les statuts LCB-FT."
    },
    {
      number: '04',
      title: 'Filtrage Rigoureux & Contrôle d’Accès',
      subtitle: 'Protection de l’Intégrité & de la Sécurité',
      content: "La participation n'est pas ouverte au grand public. Chaque candidat doit soumettre une vérification d'entreprise, son passeport exécutif, passer le filtrage des sanctions OFAC, ONU, UK HMT, UE et PEP, et signer un Accord de Non-Transaction contraignant."
    }
  ];
}

// Localized Package Tiers
export function getLocalizedPackages(lang: Language): PackageTier[] {
  if (lang === 'EN') return EXPEDITION_PACKAGES;
  if (lang === 'AR') {
    return [
      {
        ...EXPEDITION_PACKAGES[0],
        name: 'بعثة الأبحاث والامتثال الأكاديمي',
        tierNumber: 'الفئة 01',
        tagline: 'لمسؤولي الامتثال والباحثين الاستقصائيين ومحللي السياسات.',
        idealFor: 'محللو الحوكمة البيئية والاجتماعية (ESG)، الباحثون الأكاديميون، أخصائيو الامتثال التنظيمي، ومدققو المخاطر.',
        accommodation: 'فندق أعمال 4 نجوم في كمبالا (غرفة تنفيذية خاصة، إقامة كاملة)',
        transport: 'حافلة تنفيذية مكيفة عالية المواصفات مع مرافقة أمنية مخصصة',
        features: [
          'الوصول إلى السجل المعدني DGSM في عنتيبي وإحاطات الكادستر',
          'اليوم الثالث: معاينة ميدانية لممر التعدين الحرفي (موبيندي / كاساندا)',
          'اليوم الخامس: مراقبة المعايرة في المصفاة الجمركية وعرض جمارك URA',
          'المرجع القانوني الكامل لقانون التعدين والمعادن الأوغندي لعام 2022',
          'ملف أبحاث شامل لسلسلة توريد الذهب في شرق أفريقيا',
          'جميع الوجبات واللوجستيات الداخلية وتصاريح الميدان ومعدات الوقاية الشخصية',
          'شهادة إتمام البعثة للسجلات الأكاديمية والامتثال',
          'سعر المجموعات والجامعات: عند حجز 6 مشاركين دافعين أو أكثر، ينضم محاضر أو عضو هيئة تدريس مرافق مجاناً (وصول كامل للبرنامج والإقامة والأيام الميدانية). الحد الأدنى للفوج: 6 مشاركين دافعين.'
        ],
        deliverables: [
          'مجلد المراجع التنظيمية والقانونية',
          'ملاحظات ومخطط تدفق سلسلة التوريد الحرفية',
          'دليل الوصول الرقمي لبوابة التحقق من السجل المعدني'
        ]
      },
      {
        ...EXPEDITION_PACKAGES[1],
        name: 'بعثة المتداول المحترف والشركات',
        tierNumber: 'الفئة 02',
        tagline: 'لمكاتب تداول السلع، وتجار السبائك، ومديري المكاتب العائلية.',
        idealFor: 'مشترو الذهب المادي، مديرو مكاتب السلع، وسطاء السبائك، ومديرو الاستيراد والتصدير.',
        accommodation: 'فندق كمبالا سيرينا 5 نجوم (جناح تنفيذي فاخر، إقامة كاملة فاخرة)',
        transport: 'موكب سيارات دفع رباعي خاص (Land Cruiser 4x4) مع أفراد أمن متخصصين',
        features: [
          'وصول شامل لمدة 7 أيام إلى جميع المواقع الرسمية والميدانية',
          'وصول عملي كامل في اليوم الثاني إلى مختبر "أكاديمية كشف الاحتيال" الجنائي',
          'جلسة مغلقة مباشرة مع كبار مفوضي ومسجلي المعادن في DGSM',
          'دخول ميداني لعمليات التعدين الصناعي في مشروع بوسيا / واغاغاي للذهب',
          'جلسة عملية لاختبار معايرة النار (Fire Assay) وجهاز XRF داخل مصفاة معتمدة',
          'مقعد في الطاولة المستديرة المؤسسية وحفل العشاء في اليوم السادس',
          'تدقيق جنائي سري (1 إلى 1) لما يصل إلى عرضي ذهب (2) لديك حالياً (عمليات التدقيق الإضافية بسعر العميل البالغ 1,500 دولار أمريكي)',
          'نموذج عقد بيع وشراء (SPA) قياسي معتمد من كبار محامي التعدين في أوغندا'
        ],
        deliverables: [
          'ملف التدقيق الجنائي للمخاطر المكون من 38 نقطة',
          'دليل المحامين المعتمدين وحسابات الضمان البنكية الموثوقة في أوغندا',
          'الشهادة الرسمية للعناية الواجبة الميدانية لسلسلة التوريد',
          'دليل المصدرين المعتمدين والمصافي الجمركية المرخصة'
        ]
      },
      {
        ...EXPEDITION_PACKAGES[2],
        name: 'Sovereign Executive · Diplomatic VIP',
        tierNumber: 'الفئة 03',
        tagline: 'للصناديق السيادية، ومراقبي البنوك المركزية، وكبار الشخصيات الدبلوماسية.',
        idealFor: 'أمناء الصناديق السيادية، وفود البنوك المركزية، المكاتب العائلية للمليارديرات، ورؤساء شركات التعدين.',
        accommodation: 'جناح الفيلا الرئاسية في منتجع بحيرة فيكتوريا سيرينا للجولف والسبا',
        transport: 'موكب سيارات تنفيذي مصفح مخصص من فئة B6 ووحدة حماية تكتيكية لجميع التحركات الميدانية (تتوفر رحلات الهليكوبتر المستأجرة عند الطلب مقابل 3,000 دولار أمريكي لكل ساعة طيران.)',
        exclusiveBonus: 'تدقيق جنائي لما يصل إلى خمسة (5) عروض معاملات نشطة + عقد تحقق من الأطراف المقابلة لمدة 12 شهراً يغطي ما يصل إلى اثنتي عشرة (12) عملية تحقق عن بُعد',
        features: [
          'مسار دبلوماسي سريع من أرض مطار عنتيبي الدولي واستراحة كبار الشخصيات',
          'موكب سيارات تنفيذي مصفح مخصص من فئة B6 ووحدة حماية تكتيكية لجميع التحركات الميدانية',
          'تتوفر رحلات الهليكوبتر المستأجرة عند الطلب مقابل 3,000 دولار أمريكي لكل ساعة طيران.',
          'لقاء وزاري خاص (1 إلى 1) مع قيادات وزارة الطاقة وتنمية المعادن',
          'أولوية وصول كاملة طوال الأيام السبعة مع ملحق استخباراتي شخصي مخصص',
          'تدقيق جنائي لما يصل إلى خمسة (5) عروض معاملات نشطة خلال البعثة + عقد تحقق من الأطراف المقابلة لمدة 12 شهراً يغطي ما يصل إلى اثنتي عشرة (12) عملية تحقق عن بُعد (عملية واحدة لكل شهر تقويمي؛ التحققات الإضافية بسعر العميل 1,500 دولار أمريكي)',
          'مقعد شرفي على الطاولة الرئيسية في حفل العشاء مع السفراء ورؤساء البنوك'
        ],
        deliverables: [
          'دليل استراتيجية التوريد المؤسسي وإدارة مخاطر الأطراف المقابلة المخصص',
          'عقد التحقق من الأطراف المقابلة لمدة 12 شهراً (حتى 12 عملية تحقق عن بُعد؛ الإضافية بسعر 1,500 دولار أمريكي)',
          'ملف الهيكلة القانونية والضريبية للاستحواذ السيادي على الذهب',
          'الاعتماد السيادي البلاتيني الحصري للعناية الواجبة للذهب'
        ]
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        ...EXPEDITION_PACKAGES[0],
        name: '学术与合规研究考察团',
        tierNumber: '等级 01',
        tagline: '专为合规官、调查研究员与政策分析师设计。',
        idealFor: 'ESG 分析师、学术研究人员、监管合规专家及风险审计师。',
        accommodation: '坎帕拉四星级商务酒店（私人行政客房，含全餐）',
        transport: '高规格空调行政大巴，配备专职安保护卫随行',
        features: [
          '进入恩德培 DGSM 矿产登记处并参加矿权系统简报会',
          '第3天：手工采矿走廊实地考察（穆本德 / 卡桑达）',
          '第5天：保税精炼厂火试金观摩与 URA 海关税务专题报告',
          '《2022年乌干达采矿与矿产法》官方权威法规汇编',
          '完整的《东非黄金供应链深度研究档案》',
          '包含全程餐饮、内部交通、矿区通行证及个人防护装备 (PPE)',
          '颁发学术与合规记录专用的《考察团结业证书》',
          '团体与学术优惠：预订 6 名及以上付费代表，可随行 1 名免费讲师/教职人员（享有完整行程、食宿及实地考察日权限）。最低成团人数：6 名付费代表。'
        ],
        deliverables: [
          '法定监管参考汇编手册',
          '手工黄金供应链实地调研笔记与流程图',
          '矿权核查门户网站数字访问指南'
        ]
      },
      {
        ...EXPEDITION_PACKAGES[1],
        name: '专业交易员实战考察团',
        tierNumber: '等级 02',
        tagline: '专为大宗商品交易台、贵金属贸易商及家族办公室负责人打造。',
        idealFor: '实物黄金买家、大宗商品交易台经理、贵金属经纪人及进出口总监。',
        accommodation: '坎帕拉塞雷纳五星级酒店 Kampala Serena Hotel（豪华行政套房，尊享全餐）',
        transport: '专属丰田陆地巡洋舰 (Land Cruiser 4x4) 越野车队，配特种安保人员',
        features: [
          '7天全包式实地考察权限，涵盖所有政府与核心矿区站点',
          '第2天“防诈学院”取证检测实验室全套实操权限',
          '与 DGSM 高级专员及矿权注册官进行闭门直接会谈',
          '进入布西亚 / 瓦加盖 (Wagagai) 大型工业化金矿生产现场',
          '在认证保税精炼厂内亲手操作火试金法与 XRF 光谱仪对比测试',
          '出席第6天机构安全贸易商圆桌峰会暨晚宴',
          '由首席专家对您当前持有的最多两份 (2) 黄金报价进行一对一保密审计（额外审计按 1,500 美元客户优惠价计费）',
          '获取经乌干达顶级矿业律师审核的标准《黄金买卖协议 (SPA)》模板'
        ],
        deliverables: [
          '《38点交易对手取证审计档案》',
          '经核实的乌干达矿业律师与一级银行托管通讯录',
          '官方《实物供应链尽职调查认证证书》',
          '经核实的合法出口商与保税精炼厂名录'
        ]
      },
      {
        ...EXPEDITION_PACKAGES[2],
        name: 'Sovereign Executive · Diplomatic VIP',
        tierNumber: '等级 03',
        tagline: '专为主权财富基金、央行观察员及外交贵宾掌门人定制。',
        idealFor: '主权基金受托人、中央银行代表团、亿万家族办公室及矿业集团董事长。',
        accommodation: '维多利亚湖塞雷纳高尔夫度假村总统湖景别墅套房 (Presidential Villa)',
        transport: '全程配备专属 B6 防弹装甲行政车队与贴身战术护卫分队（如需包租直升机转运，可按每飞行小时 3,000 美元另行申请）',
        exclusiveBonus: '考察期间最多五份 (5) 活跃交易提案的取证审计 + 涵盖最多十二次 (12) 远程核查的 12 个月交易对手核验常年顾问服务',
        features: [
          '恩德培国际机场停机坪外交快速通道与 VIP 贵宾室清关礼遇',
          '所有实地行程均配备专属 B6 防弹装甲行政车队与贴身战术保护分队',
          '包租直升机转运服务可按需提供，费用为每飞行小时 3,000 美元。',
          '与乌干达能源与矿产开发部高层领导进行一对一私密会晤',
          '全部7天行程最高优先级通道，配备专属私人情报随员',
          '考察期间对最多五份 (5) 活跃交易提案进行取证审计 + 12个月交易对手核验常年顾问服务（涵盖最多 12 次远程核验，每个日历月 1 次；额外核验按 1,500 美元客户优惠价计费）',
          '就座安全贸易商晚宴主宾席，与驻乌大使及商业银行行长共进晚餐'
        ],
        deliverables: [
          '定制版《机构采购与交易对手风险战略手册》',
          '12个月交易对手背景核查常年顾问合约（最多12次远程核验；额外核验按 1,500 美元客户优惠价计费）',
          '《主权黄金收购法律与税务架构设计档案》',
          '专属铂金级《黄金尽职调查主权认证勋章》'
        ]
      }
    ];
  }
  return [
    {
      ...EXPEDITION_PACKAGES[0],
      name: 'Expédition Académique & Recherche',
      tierNumber: 'Niveau 01',
      tagline: 'Pour les responsables conformité, chercheurs d’investigation et analystes politiques.',
      idealFor: 'Analystes ESG, chercheurs universitaires, spécialistes de la conformité réglementaire et auditeurs de risques.',
      accommodation: 'Hôtel d’Affaires 4 Étoiles à Kampala (Chambre Exécutive Privée, Pension Complète)',
      transport: 'Autocar exécutif climatisé haute spécification avec escorte de sécurité dédiée',
      features: [
        'Accès au registre minier DGSM d’Entebbe et briefings sur le Cadastre',
        'Jour 3 : Observation sur le terrain du corridor minier artisanal (Mubende/Kassanda)',
        'Jour 5 : Observation de coupellation en raffinerie sous douane et présentation douanière URA',
        'Compilation juridique de référence de la Loi Minière Ougandaise de 2022',
        'Dossier de recherche complet sur la filière aurifère en Afrique de l’Est',
        'Tous les repas, logistique interne, permis de terrain et équipements de protection (EPI)',
        'Certificat d’achèvement d’expédition pour dossiers académiques et conformité',
        'Tarif Groupe & Académique : réservez pour 6+ délégués payants et un conférencier/membre du personnel accompagnant participe gratuitement (accès complet au programme, pension et journées terrain). Cohorte minimale : 6 délégués payants.'
      ],
      deliverables: [
        'Classeur de Référence Réglementaire Statutaire',
        'Notes de Terrain & Organigramme de la Filière Artisanale',
        'Guide d’Accès Numérique au Portail de Vérification du Cadastre'
      ]
    },
    {
      ...EXPEDITION_PACKAGES[1],
      name: 'Expédition Négociant Professionnel',
      tierNumber: 'Niveau 02',
      tagline: 'Pour les tables de matières premières, négociants en lingots et dirigeants de family offices.',
      idealFor: 'Acheteurs d’or physique, directeurs de tables de négoce, courtiers en lingots et directeurs import/export.',
      accommodation: 'Hôtel 5 Étoiles Kampala Serena (Suite Exécutive Deluxe, Pension Complète Luxe)',
      transport: 'Convoi privé dédié de 4x4 Land Cruiser SUV avec personnel de sécurité spécialisé',
      features: [
        'Accès tout compris de 7 jours sur l’ensemble des sites officiels et miniers',
        'Accès pratique complet au laboratoire forensique « La Scam Academy » du Jour 2',
        'Session à huis clos avec les Commissaires Seniors et Conservateurs du DGSM',
        'Accès aux opérations minières industrielles sur le projet aurifère de Busia / Wagagai',
        'Session pratique de coupellation (Fire Assay) et spectrométrie XRF en raffinerie agréée',
        'Place à la Table Ronde Institutionnelle & Dîner de Gala du Jour 6',
        'Audit confidentiel individuel de jusqu’à deux (2) offres d’or actives que vous détenez (audits supplémentaires au tarif client de 1 500 USD)',
        'Modèle de contrat SPA standard validé par les meilleurs avocats miniers ougandais'
      ],
      deliverables: [
        'Dossier d’Audit Forensique des Contreparties en 38 Points',
        'Annuaire Vérifié des Avocats Miniers & Comptes Séquestres Bancaires Agréés',
        'Certificat Officiel de Diligence Raisonnable Physique de la Filière',
        'Répertoire des Exportateurs Vérifiés & Raffineries sous Douane'
      ]
    },
    {
      ...EXPEDITION_PACKAGES[2],
      name: 'Sovereign Executive · Diplomatic VIP',
      tierNumber: 'Niveau 03',
      tagline: 'Pour les fonds souverains, observateurs de banques centrales et délégations VIP diplomatiques.',
      idealFor: 'Administrateurs de fonds souverains, délégations de banques centrales, family offices milliardaires.',
      accommodation: 'Suite Villa Présidentielle du Lac au Lake Victoria Serena Golf Resort & Spa',
      transport: 'Cortège exécutif blindé B6 dédié & détachement tactique de protection rapprochée pour tous les déplacements sur le terrain (Transferts par hélicoptère affrété disponibles sur demande à 3 000 USD par heure de vol.)',
      exclusiveBonus: 'Audit forensique de jusqu’à cinq (5) propositions de transactions actives + Contrat de Rétention de Vérification des Contreparties de 12 Mois couvrant jusqu’à douze (12) vérifications à distance',
      features: [
        'Passage rapide diplomatique sur le tarmac de l’aéroport d’Entebbe & salon VIP',
        'Cortège exécutif blindé B6 dédié & détachement tactique de protection rapprochée pour tous les déplacements sur le terrain',
        'Transferts par hélicoptère affrété disponibles sur demande à 3 000 USD par heure de vol.',
        'Audience ministérielle privée 1-à-1 avec la direction du Ministère de l’Énergie et des Minéraux',
        'Accès prioritaire complet sur les 7 jours avec attaché de renseignement personnel dédié',
        'Audit forensique de jusqu’à cinq (5) propositions de transactions actives pendant l’expédition + Contrat de Rétention de Vérification des Contreparties de 12 Mois couvrant jusqu’à douze (12) vérifications à distance (une par mois calendaire ; vérifications supplémentaires au tarif client de 1 500 USD)',
        'Siège d’honneur à la Table Principale VIP du Gala avec les ambassadeurs et PDG de banques'
      ],
      deliverables: [
        'Manuel Stratégique Sur Mesure d’Approvisionnement Institutionnel & Risque Contrepartie',
        'Contrat de Vérification des Contreparties de 12 Mois (jusqu’à 12 vérifications à distance ; supplémentaires à 1 500 USD)',
        'Dossier de Structuration Juridique & Fiscale d’Acquisition Souveraine d’Or',
        'Accréditation Souveraine Platine Exclusive de Diligence Raisonnable'
      ]
    }
  ];
}

// Localized 7-Day Itinerary
export function getLocalizedItinerary(lang: Language): ItineraryDay[] {
  if (lang === 'EN') return ITINERARY_DAYS;
  if (lang === 'AR') {
    return [
      {
        ...ITINERARY_DAYS[0],
        title: 'الجهات التنظيمية والسجل المعدني السيادي',
        subtitle: 'وزارة الطاقة وتنمية المعادن ومديرية المسح الجيولوجي والمعادن (DGSM) في عنتيبي',
        location: 'عنتيبي وآمبر هاوس، كمبالا',
        focus: 'السجل المعدني الرسمي، صلاحية التراخيص والعناية الواجبة القانونية',
        description: 'ابدأ في المقر الرئيسي لمديرية المسح الجيولوجي والمعادن (DGSM) في عنتيبي. يشهد المشاركون عروضاً حية للتحقق من تراخيص الاستكشاف (EL) وعقود التعدين (ML) وتراخيص تجارة المعادن (MDL)، وكيفية تدقيق حدود الامتيازات في الوقت الفعلي.',
        keyActivities: [
          'فحص مباشر في نظام السجل المعدني DGSM لمقارنة الحقوق النشطة مقابل المنتهية',
          'إحاطة تنفيذية مع كبار مسجلي المعادن والمديرين القانونيين',
          'تفكيك الإطار القانوني لقانون التعدين والمعادن الأوغندي لعام 2022',
          'مراجعة الأختام الرسمية ومعايير العلامات المائية وقواعد بيانات ICGLR الإقليمية'
        ],
        riskDeconstructed: 'المحتالون غير المرخصين الذين يروجون لامتيازات وهمية باستخدام خطابات حكومية مزورة وتصاريح منتهية.',
        executiveDeliverable: 'حقيبة أدوات التحقق من السجل المعدني DGSM ودليل الامتثال لقانون التعدين 2022.'
      },
      {
        ...ITINERARY_DAYS[1],
        title: 'أكاديمية كشف الاحتيال والفحص الجنائي للمعادن',
        subtitle: 'تفكيك عروض الوسطاء والاختبار الفيزيائي للسبائك',
        location: 'منشأة الاستخبارات الآمنة، عنتيبي',
        focus: 'التفكيك الجنائي العملي للعقود المزورة والسبائك المغشوشة',
        description: 'بيئة آمنة ومضبوطة يكشف فيها محللو الاستخبارات وخبراء المعادن الآليات الدقيقة لاحتيال الذهب الإقليمي. افحص وثائق مزورة حقيقية مصادرة، وإيصالات URA المزيفة، وتعامل عملياً مع سبائك النحاس والتنغستن المقصوصة.',
        keyActivities: [
          'التدقيق الجنائي للوثائق: كشف الأختام المزيفة والتوقيعات الوزارية المقلدة وأختام ICGLR الوهمية',
          'طاولة الاختبار الفيزيائي: اختبارات الكثافة بالغمر، ومسابير الموجات فوق الصوتية، وحدود أجهزة XRF المحمولة',
          'تفكيك خرافة "خصم 25% تحت السعر الفوري" وتشريح احتيال الرسوم الجمركية المسبقة',
          'محاكاة حية: تحليل عروض الواتساب والتلغرام الحقيقية واتفاقيات الضمان المزيفة'
        ],
        riskDeconstructed: 'طلبات رسوم التخليص الجمركي المسبقة، وإيصالات التخزين المزيفة، وسبائك النحاس والتنغستن المطلية بالذهب.',
        executiveDeliverable: 'ملف التدقيق الجنائي المكون من 38 نقطة وقائمة التحقق المخبرية.'
      },
      {
        ...ITINERARY_DAYS[2],
        title: 'المناجم الحرفية: حقيقة فوهة المنجم',
        subtitle: 'تفتيش ميداني مباشر في موبيندي وكاساندا',
        location: 'ممر الذهب موبيندي – كاساندا',
        focus: 'اقتصاديات الاستخراج الخام، والغسل، والنقاء وهوامش الوسطاء',
        description: 'انتقل عبر موكب دفع رباعي آمن إلى مناجم التعدين الحرفي العاملة في وسط أوغندا. شاهد بنفسك غسل الذهب والتركيز بالجاذبية، وكيف يُوزن الذهب الخام، ولماذا يُعد "الذهب المحلي الرخيص" أسطورة رياضية.',
        keyActivities: [
          'التجول في حفر التعدين العاملة والتفاعل مع جمعيات التعدين الحرفي المرخصة',
          'مشاهدة عمليات الغسل الفعلي واستخراج الذهب من عروق الكوارتز الخام',
          'التحقق من أسعار البيع الحقيقية عند فوهة المنجم (خصم 1-3% فقط عن السعر العالمي)',
          'فحص البروتوكولات الأمنية المحلية وسلسلة الوسطاء الإقليميين'
        ],
        riskDeconstructed: 'أسطورة "شيخ القرية الذي يمتلك 500 كجم من تراب الذهب الرخيص": فهم حدود الإنتاج الحقيقية.',
        executiveDeliverable: 'مخطط تدفق الإمدادات الحرفية واقتصاديات الوحدة الحقيقية عند المنجم.'
      },
      {
        ...ITINERARY_DAYS[3],
        title: 'الاستخراج والمعالجة على النطاق الصناعي',
        subtitle: 'مشروع واغاغاي للذهب وممرات التعدين الحديثة، بوسيا',
        location: 'حزام بوسيا المعدني، شرق أوغندا',
        focus: 'التعدين السطحي الحديث، والاستخلاص الكيميائي وسلسلة التوريد المؤسسية',
        description: 'في مقابل التعدين الحرفي: قم بزيارة عمليات الذهب الصناعية واسعة النطاق في حزام بوسيا. تجول في مصانع المعالجة الحديثة بملايين الدولارات، ودوائر الكربون في الرشح (CIL)، والتقِ بمهندسي المناجم لفهم إنتاج سبائك الدواري الصناعية.',
        keyActivities: [
          'جولة ميدانية في أحواض الاستخلاص الصناعية ومحطات التكسير وغرف الصهر',
          'إحاطة مع المديرين التنفيذيين للمنجم حول الاحتياطيات المعدنية ودراسات الجدوى البنكية',
          'مراجعة بروتوكولات الحوكمة البيئية والاجتماعية (ESG) وإدارة المخلفات',
          'فهم عقود الشراء المؤسسية (Offtake) وقنوات المصافي الدولية المباشرة'
        ],
        riskDeconstructed: 'المحتالون الذين يدعون ملكية مناجم صناعية باستخدام صور لبنية تحتية حكومية أو أجنبية.',
        executiveDeliverable: 'تقرير معايير إنتاج الذهب الصناعي ونموذج التحقق من عقود الشراء.'
      },
      {
        ...ITINERARY_DAYS[4],
        title: 'المصافي الجمركية، ومعايرة النار والهيكل الضريبي',
        subtitle: 'الصهر المعتمد والتخليص الجمركي في عنتيبي وكمبالا',
        location: 'المنطقة الصناعية بكمبالا والمنطقة الحرة بعنتيبي',
        focus: 'معايرة النار (Cupellation)، والتحليل الكيميائي وضريبة التصدير 5% لدى URA',
        description: 'ادخل إلى المصافي الجمركية عالية الحراسة. قف بجانب الفرن أثناء الصهر الحي وشاهد عملية معايرة النار (Fire Assay) المعتمدة من ISO. التقِ مباشرة بمسؤولي جمارك هيئة الإيرادات الأوغندية (URA) لفهم ضريبة التصدير البالغة 5%.',
        keyActivities: [
          'مشاهدة الصهر الحي لسبائك الدواري وتحويلها إلى سبائك نقية عيار 999.9',
          'عرض عملي لمعايرة النار (Cupellation) ودقة التحليل الكيميائي',
          'إحاطة معمقة مع ضباط جمارك URA حول إقرارات التصدير في نظام ASYCUDA World',
          'فحص شهادات عبور ICGLR الأصلية وتصاريح التصدير وشهادات المعايرة'
        ],
        riskDeconstructed: 'شحنات "الحقيبة الدبلوماسية" الاحتيالية، وإيصالات الضمان المزيفة، والإعفاءات الضريبية المفبركة.',
        executiveDeliverable: 'دليل بروتوكول ضرائب وجمارك تصدير الذهب مع نماذج وثائق URA الأصلية.'
      },
      {
        ...ITINERARY_DAYS[5],
        title: 'حفل المتداول الآمن والطاولة المستديرة المؤسسية',
        subtitle: 'جلسة مغلقة مع مسؤولي البنوك من الفئة الأولى والمستشارين القانونيين وشركات النقل المصفح',
        location: 'قاعة الاحتفالات الكبرى بفندق كمبالا سيرينا',
        focus: 'الامتثال المصرفي AML/CFT، وآليات الضمان البنكي واللوجستيات المصفحة',
        description: 'ندوة مؤسسية حصرية تجمع رؤساء الامتثال في البنوك التجارية الأوغندية من الفئة الأولى، وكبار محامي التعدين، ومديري شركات الشحن الأمني الدولية (مثل Brinks وG4S) لمناقشة هيكلة المدفوعات الآمنة.',
        keyActivities: [
          'حلقة نقاش خاصة: مسؤولو الامتثال البنكي حول تدقيق مصدر الحوالات ومتطلبات AML/KYC',
          'ورشة عمل قانونية: صياغة اتفاقيات بيع وشراء (SPA) محكمة بموجب القانون الأوغندي والإنجليزي',
          'إحاطة اللوجستيات الآمنة: بروتوكولات النقل المصفح من خزنة المصفاة مباشرة إلى الطائرة',
          'عشاء رسمي وتواصل مع المديرين التنفيذيين للمناجم والمصافي المعتمدة والسفراء'
        ],
        riskDeconstructed: 'الدفع عبر حسابات محامين خاصة، والأدوات المالية الوهمية غير المعتمدة في سويفت.',
        executiveDeliverable: 'نموذج عقد SPA مؤسسي ودليل مسارات الضمان البنكي المعتمد.'
      },
      {
        ...ITINERARY_DAYS[6],
        title: 'الإحاطة الاستراتيجية الختامية ومنح شهادة الاستخبارات',
        subtitle: 'تدقيق فردي لمخاطر الأطراف المقابلة ومنح الشهادة الرسمية للعناية الواجبة',
        location: 'الجناح التنفيذي الخاص، منتجع بحيرة فيكتوريا سيرينا',
        focus: 'تدقيق الصفقات فردياً (1 إلى 1)، واستراتيجية تخفيف المخاطر والتخرج الرسمي',
        description: 'تتويج بعثة الأيام السبعة. يجلس المشاركون في جلسات سرية فردية مع كبار ضباط الاستخبارات لتدقيق أي عروض أو بائعين أو مستندات يقيمونها حالياً، واستلام الشهادة الرسمية للعناية الواجبة.',
        keyActivities: [
          'تدقيق سري للأطراف المقابلة: فحص معمق لخلفية البائعين أو العقود التي تحملها',
          'صياغة خطة عمل شخصية لتخفيف المخاطر مصممة لسلطتك القضائية (الإمارات، أوروبا، أمريكا، آسيا)',
          'حفل منح الشهادات الرسمية والانضمام إلى شبكة استخبارات المشترين المعتمدين',
          'نقل المغادرة التنفيذي إلى مطار عنتيبي الدولي (استراحة كبار الشخصيات الدبلوماسية للفئة الثالثة)'
        ],
        riskDeconstructed: 'نقاط العمى المعرفية المتبقية؛ الانتقال من المعرفة النظرية إلى العمليات الميدانية المحصنة.',
        executiveDeliverable: 'شهادة إتمام العناية الواجبة الرسمية وتقرير التدقيق الفردي للأطراف المقابلة.'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        ...ITINERARY_DAYS[0],
        title: '监管机构与主权矿权登记系统',
        subtitle: '乌干达能源与矿产开发部 & 恩德培地质调查与矿业局 (DGSM)',
        location: '恩德培 & 坎帕拉 Amber House',
        focus: '官方矿权登记系统、牌照有效性核查与法律尽职调查',
        description: '首站前往位于恩德培的地质调查与矿业局 (DGSM) 总部。代表们将现场观摩官方系统实时核验勘探牌照 (EL)、采矿租约 (ML) 及矿产交易商牌照 (MDL) 的真伪，学习如何登录国家在线矿权门户实时审计矿区坐标边界。',
        keyActivities: [
          'DGSM 矿权系统现场实操：比对有效矿权与过期/作废矿权',
          '与高级矿产注册官及法规司长进行闭门高管简报会',
          '深度拆解《2022年乌干达采矿与矿产法》法律框架',
          '核查官方注册印章、防伪水印标准及 ICGLR 大湖地区区域数据库'
        ],
        riskDeconstructed: '无牌诈骗分子利用伪造的政府公函与过期勘探许可证推销子虚乌有的矿山。',
        executiveDeliverable: '《DGSM 矿权核查工具包》与《2022年乌干达矿业法法定合规手册》。'
      },
      {
        ...ITINERARY_DAYS[1],
        title: '“防诈学院”与冶金取证实验室',
        subtitle: '中间商骗局话术拆解与实物金条真伪测试',
        location: '恩德培高安全情报设施',
        focus: '假冒合同与掺假金条的亲手取证拆解',
        description: '在安全受控的实验室环境中，前情报分析师与冶金专家将为您彻底揭开区域黄金诈骗的运作内幕。亲手检验真实缴获的伪造文件、假 URA 税单、假联合国过境证，并现场测试切开的黄铜、铜合金及掺钨假金条。',
        keyActivities: [
          '文件取证审计：识别光敏假印章、伪造部长签名及假冒 ICGLR 防伪贴',
          '物理测试实验台：阿基米德排水密度测试、超声波声速探伤及手持式 XRF 光谱仪局限性演示',
          '拆解“低于现货25%折扣”的数学骗局与预付海关费诈骗全流程',
          '实战演练：剖析真实的 WhatsApp/Telegram 诈骗演示文稿与虚假托管协议'
        ],
        riskDeconstructed: '欺诈性预付清关费请求、假保税仓保管单 (SKR) 以及镀金铜条/钨芯假金条。',
        executiveDeliverable: '《38点交易对手风险取证档案》与《实物化验核查清单》。'
      },
      {
        ...ITINERARY_DAYS[2],
        title: '手工采矿区：矿坑源头的真实经济账',
        subtitle: '穆本德与卡桑达矿区实地考察',
        location: '穆本德 – 卡桑达黄金走廊',
        focus: '原矿开采经济学、溜槽选矿、纯度与中间商加价结构',
        description: '搭乘安保越野车队深入乌干达中部的活跃手工采矿坑口。亲眼见证手工淘金、重选溜槽及当地提炼工艺。现场观察原金砂过秤，了解真实的矿坑源头折扣（仅比国际现货低 1%–3%），彻底看清为何“廉价当地金砂”纯属神话。',
        keyActivities: [
          '走进活跃矿坑，与持牌手工采矿协会负责人直接交流',
          '现场观摩原生石英脉矿石的破碎、重选溜槽与淘金过程',
          '核实矿坑源头真实交易价格，在矿区天平上现场称量海绵金',
          '考察矿区安保规程、社区协议及区域集货中间商体系'
        ],
        riskDeconstructed: '打破“部落长老手握500公斤廉价金砂”的神话：认清手工矿真实产量上限（以克计而非吨）。',
        executiveDeliverable: '《矿区地质与手工黄金供应流程图（含真实矿坑单位经济模型）》。'
      },
      {
        ...ITINERARY_DAYS[3],
        title: '现代化工业规模开采与选冶厂',
        subtitle: '瓦加盖 (Wagagai) 金矿项目与布西亚现代采矿带',
        location: '乌干达东部布西亚矿带',
        focus: '现代化露天/地下开采、碳浆法 (CIL) 浸出与机构供应链',
        description: '与手工采矿形成鲜明对比：参访布西亚矿带的大型工业化金矿。参观斥资数千万美元建设的现代化选矿厂、碳浆法 (CIL) 浸出车间、工业球磨机及高标准尾矿库。与矿山总工程师面对面探讨工业合质金条 (Dore Bar) 生产与正规监管链。',
        keyActivities: [
          '实地参观工业浸出槽、破碎车间及高安全级别熔炼室',
          '听取矿业公司高管关于矿产储量与银行级可行性研究报告的简报',
          '审查机构 ESG 合规规程、环保标准及尾矿管理体系',
          '深入了解机构包销合同 (Offtake) 与直通国际精炼厂的供货管道'
        ],
        riskDeconstructed: '盗用外国或大型国企矿山照片冒充自己拥有工业金矿的诈骗分子。',
        executiveDeliverable: '《工业黄金生产基准报告》与《包销合同核验模板》。'
      },
      {
        ...ITINERARY_DAYS[4],
        title: '保税精炼厂、火试金灰吹法与税务架构',
        subtitle: '恩德培与坎帕拉认证熔炼厂及海关清关实务',
        location: '坎帕拉工业区 & 恩德培自由贸易区',
        focus: '1050°C 火试金灰吹法 (Cupellation)、王水化学分析与 URA 5% 法定出口税',
        description: '走进戒备森严的保税精炼厂。站在感应熔炼炉旁见证实时熔炼，并观摩 ISO 认证的经典火试金灰吹法 (Fire Assay) 全过程。直接与乌干达税务局 (URA) 海关官员会面，透彻掌握法定 5% 出口税、单一关税区电子单证及国际空运规程。',
        keyActivities: [
          '现场见证合质金条熔炼提纯为 999.9 标准投资金条',
          '亲手观摩火试金铅灰吹法与化学分析精度对比',
          'URA 海关官员深度解析 ASYCUDA World 出口报关系统与缴款单 (PRN)',
          '检验真实的 ICGLR 区域过境证书、出口许可证及权威化验单样本'
        ],
        riskDeconstructed: '欺诈性的“外交邮袋押运”、假保税精炼厂托管收据及捏造的免税批文。',
        executiveDeliverable: '《黄金出口税务与海关规程手册（附真实 URA 官方单证样本集）》。'
      },
      {
        ...ITINERARY_DAYS[5],
        title: '安全贸易商晚宴暨机构圆桌峰会',
        subtitle: '与一级商业银行合规总监、矿业大律师及防弹押运巨头闭门会谈',
        location: '坎帕拉塞雷纳酒店大宴会厅',
        focus: '银行反洗钱 (AML/CFT) 合规、托管机制与停机坪防弹物流',
        description: '这是一场独家机构研讨会，汇聚了乌干达一级商业银行合规负责人、东非顶级律所资深矿业合伙人以及国际安保物流高管（如 Brinks、G4S）。共同探讨合规跨境支付结构、有条件银行托管 (MT103 Field 72 / 跟单信用证) 及全额投保物流。',
        keyActivities: [
          '银行闭门论坛：合规官详解跨境电汇资金来源审查与 AML/KYC 准入要求',
          '法律实战工坊：如何在乌干达法与英国法下起草滴水不漏的《黄金买卖协议 (SPA)》',
          '安保物流简报：从精炼厂金库直达飞机货舱的停机坪防弹押运规程',
          '尊享晚宴与高端社交：结识经核实的矿业高管、持牌精炼商及各国驻乌使节'
        ],
        riskDeconstructed: '要求打款至私人律师托管账户、伪造的非 SWIFT 金融工具（假 MT760/MT799）。',
        executiveDeliverable: '《机构级黄金 SPA 合同标准模板》与《认证一级银行托管路径指南》。'
      },
      {
        ...ITINERARY_DAYS[6],
        title: '战略复盘总结与主权情报认证典礼',
        subtitle: '一对一交易对手风险审计 & 颁发官方尽职调查认证证书',
        location: '维多利亚湖塞雷纳高尔夫度假村私人行政套房',
        focus: '一对一项目审计、定制风险缓释战略与正式结业授证',
        description: '7天深度考察的圆满收官之日。代表们将与首席情报官进行一对一保密会谈，对当前正在评估的任何黄金报价、卖家或合同进行全面审计。获颁官方《乌干达黄金尽职调查与反欺诈认证证书》，正式加入具备免疫力的权威买家情报网络。',
        keyActivities: [
          '保密交易对手审计：对您手中的活跃卖家或合同进行深度背景调查',
          '针对您的司法管辖区（阿联酋、欧盟、美国、亚洲）制定专属风险防控方案',
          '官方认证证书颁授仪式，正式纳入“认证买家情报网络”',
          '专属礼宾车队送机至恩德培国际机场（Tier 3 尊享外交贵宾厅通道）'
        ],
        riskDeconstructed: '消除残余认知盲区；从理论认知全面升级为坚不可摧的实地安全作业能力。',
        executiveDeliverable: '《官方尽职调查结业认证证书》与《一对一专属交易对手审计报告》。'
      }
    ];
  }
  return [
    {
      ...ITINERARY_DAYS[0],
      title: 'Régulateurs & Le Cadastre Souverain',
      subtitle: 'Ministère de l’Énergie et du Développement Minier & DGSM Entebbe',
      location: 'Entebbe & Amber House, Kampala',
      focus: 'Cadastre Minier Officiel, Validité des Licences & Diligence Juridique',
      description: "Débutez au siège de la Direction de la Géologie et des Mines (DGSM) à Entebbe. Les délégués assistent à des démonstrations en direct vérifiant les licences d'exploration (EL), baux miniers (ML) et licences de négociant (MDL) sur le portail cadastral national.",
      keyActivities: [
        'Recherche en direct sur le cadastre DGSM des concessions actives vs expirées',
        'Briefing exécutif avec les conservateurs miniers seniors et directeurs juridiques',
        'Déconstruction du cadre légal de la Loi Minière Ougandaise de 2022',
        'Examen des sceaux officiels, normes de filigrane et bases régionales CIRGL (ICGLR)'
      ],
      riskDeconstructed: 'Escrocs sans licence proposant des concessions fictives avec de fausses lettres ministérielles.',
      executiveDeliverable: 'Kit de Vérification du Cadastre DGSM & Manuel de Conformité Statutaire 2022.'
    },
    {
      ...ITINERARY_DAYS[1],
      title: 'La Scam Academy & Métallurgie Forensique',
      subtitle: 'Déconstruction des Pitchs d’Intermédiaires & Essais Physiques',
      location: 'Installation de Renseignement Sécurisée, Entebbe',
      focus: 'Déconstruction Forensique Pratique des Faux Contrats et Lingots Truqués',
      description: "Un environnement contrôlé où d'anciens analystes du renseignement et experts métallurgistes exposent la mécanique exacte de la fraude aurifère. Examinez de vrais documents contrefaits saisis, de faux reçus URA et manipulez des barres de laiton et de tungstène découpées.",
      keyActivities: [
        'Audit forensique documentaire : repérer les faux tampons photopolymères et sceaux CIRGL contrefaits',
        'Banc d’essai physique : tests de densité par immersion, sondes à ultrasons et limites des spectromètres XRF',
        'Déconstruction mathématique du mythe « -25 % sous le Spot » et de la fraude aux frais avancés',
        'Jeu de rôle en direct : analyse de vrais pitchs WhatsApp/Telegram et faux contrats séquestres'
      ],
      riskDeconstructed: 'Demandes frauduleuses de frais de dédouanement avancés, fausses notes d’entrepôt et lingots fourrés au tungstène.',
      executiveDeliverable: 'Dossier Forensique de Risque Contrepartie en 38 Points & Checklist d’Essai Physique.'
    },
    {
      ...ITINERARY_DAYS[2],
      title: 'Mines Artisanales : La Réalité du Puits',
      subtitle: 'Inspection de Terrain à Mubende & Kassanda',
      location: 'Corridor Aurifère de Mubende – Kassanda',
      focus: 'Économie de l’Extraction Brute, Lavage, Pureté & Marges des Intermédiaires',
      description: "Voyagez en convoi 4x4 sécurisé vers les puits artisanaux opérationnels du centre de l'Ouganda. Observez l'orpaillage, la concentration gravimétrique, la pesée de l'or brut et pourquoi « l'or local pas cher » est un mythe mathématique.",
      keyActivities: [
        'Parcours des puits en activité et échange avec les associations minières artisanales agréées',
        'Observation du lavage gravimétrique à partir du quartz aurifère brut',
        'Vérification des prix réels au puits (seulement 1 à 3 % sous le spot international)',
        'Examen des protocoles de sécurité locaux et de la chaîne des collecteurs régionaux'
      ],
      riskDeconstructed: 'Le mythe du « Chef de village détenant 500 kg de poudre d’or à bas prix » : comprendre les limites réelles de production.',
      executiveDeliverable: 'Organigramme des Flux Artisanaux & Économie Unitaire Réelle au Puits.'
    },
    {
      ...ITINERARY_DAYS[3],
      title: 'Extraction & Traitement à l’Échelle Industrielle',
      subtitle: 'Projet Aurifère de Wagagai & Corridors Miniers Modernes, Busia',
      location: 'Ceinture Minière de Busia, Est de l’Ouganda',
      focus: 'Mine Moderne à Ciel Ouvert, Lixiviation CIL & Chaîne d’Approvisionnement Institutionnelle',
      description: "En contraste avec l'exploitation artisanale : visitez les opérations industrielles à grande échelle de Busia. Parcourez les usines de traitement modernes, les circuits de lixiviation au carbone (CIL) et rencontrez les ingénieurs miniers.",
      keyActivities: [
        'Visite guidée des cuves de lixiviation industrielles, usines de concassage et salles de fusion',
        'Briefing avec les dirigeants miniers sur les réserves et études de faisabilité bancables',
        'Examen des protocoles ESG institutionnels, conformité environnementale et gestion des résidus',
        'Compréhension des contrats d’enlèvement (Offtake) et conduits directs vers les raffineries'
      ],
      riskDeconstructed: 'Escrocs revendiquant la propriété de mines industrielles à l’aide de photos d’infrastructures étrangères.',
      executiveDeliverable: 'Rapport de Référence sur la Production Industrielle & Modèle de Vérification Offtake.'
    },
    {
      ...ITINERARY_DAYS[4],
      title: 'Raffineries sous Douane, Coupellation & Fiscalité',
      subtitle: 'Fusion Accréditée & Dédouanement à Entebbe et Kampala',
      location: 'Zone Industrielle de Kampala & Zone Franche d’Entebbe',
      focus: 'Essai au Feu (Coupellation), Analyse Chimique & Taxe d’Exportation URA de 5 %',
      description: "Entrez dans des raffineries sous douane de haute sécurité. Assistez à la fusion en direct et au processus classique de coupellation (Fire Assay) accrédité ISO. Rencontrez les douaniers de l'URA pour comprendre la taxe statutaire de 5 %.",
      keyActivities: [
        'Observation en direct de la fusion de barres Doré en lingots d’investissement 999,9',
        'Démonstration pratique de la coupellation au feu et de la précision de l’analyse chimique',
        'Briefing approfondi avec les agents des douanes URA sur les déclarations ASYCUDA World',
        'Examen d’authentiques certificats de transit CIRGL, permis d’exportation et certificats d’essai'
      ],
      riskDeconstructed: 'Expéditions frauduleuses par « valise diplomatique », faux reçus séquestres et fausses exonérations fiscales.',
      executiveDeliverable: 'Manuel du Protocole Fiscal & Douanier d’Exportation avec suite de documents URA authentiques.'
    },
    {
      ...ITINERARY_DAYS[5],
      title: 'Gala Safe-Trader & Table Ronde Institutionnelle',
      subtitle: 'Session à Huis Clos avec Banquiers de Rang 1, Avocats Miniers & Transport Blindé',
      location: 'Grand Salon de l’Hôtel Kampala Serena',
      focus: 'Conformité Bancaire LCB-FT, Mécanismes Séquestres & Logistique Blindée',
      description: "Un symposium institutionnel exclusif réunissant les directeurs de conformité des banques commerciales de rang 1, les avocats miniers seniors et les dirigeants de transporteurs sécurisés internationaux (Brinks, G4S).",
      keyActivities: [
        'Panel privé : responsables conformité bancaire sur la vérification de l’origine des fonds et exigences KYC',
        'Atelier juridique : structurer des contrats SPA blindés en droit ougandais et anglais',
        'Briefing logistique sécurisée : transfert blindé sur le tarmac directement du coffre à la soute',
        'Dîner de gala et réseautage avec dirigeants miniers vérifiés, raffineurs agréés et ambassadeurs'
      ],
      riskDeconstructed: 'Paiements via comptes séquestres d’avocats privés et faux instruments SWIFT (MT760/MT799 fictifs).',
      executiveDeliverable: 'Modèle de Contrat SPA Institutionnel & Guide de Routage Séquestre Bancaire Rang 1.'
    },
    {
      ...ITINERARY_DAYS[6],
      title: 'Débriefing Stratégique & Certification Renseignement',
      subtitle: 'Audit Individuel des Contreparties & Certification Officielle de Diligence',
      location: 'Suite Exécutive Privée, Lake Victoria Serena Golf Resort',
      focus: 'Audit d’Offre 1-à-1, Stratégie Sur Mesure d’Atténuation des Risques & Remise des Diplômes',
      description: "Le point d'orgue de l'expédition de 7 jours. Les délégués siègent en sessions confidentielles individuelles avec nos officiers en chef pour auditer toute proposition active et reçoivent la Certification Officielle.",
      keyActivities: [
        'Audit confidentiel de contrepartie : vérification approfondie des vendeurs ou contrats que vous détenez',
        'Formulation de votre plan personnel d’atténuation des risques adapté à votre juridiction',
        'Cérémonie officielle de remise des certificats et intégration au Réseau d’Acheteurs Vérifiés',
        'Transfert exécutif final vers l’aéroport international d’Entebbe (accès salon VIP diplomatique pour Tier 3)'
      ],
      riskDeconstructed: 'Angles morts cognitifs résiduels ; passage de la théorie à des opérations de terrain blindées.',
      executiveDeliverable: 'Certificat Officiel de Diligence Raisonnable & Rapport d’Audit Individuel de Contrepartie.'
    }
  ];
}

// Localized FAQ items
export function getLocalizedFaqs(lang: Language, defaultFaqs: FaqItem[]): FaqItem[] {
  if (lang === 'EN') return defaultFaqs;
  if (lang === 'AR') {
    return [
      {
        id: 'faq-sc-1',
        category: 'supply_chain',
        categoryLabel: 'سلسلة توريد الذهب',
        question: 'لماذا تُعد عروض الشركات (FCOs) التي تقدم خصومات 15%–25% أقل من سعر LBMA احتيالية دائماً؟',
        answer: 'الذهب المادي أصل نقدي عالمي من الفئة الأولى يتمتع بسيولة فورية. في جميع مناطق التعدين المرخصة في أوغندا (موبيندي، كاساندا، بوسيا، كاراموجا)، تتنافس المصافي والوكلاء المرخصون يومياً لشراء الذهب الخام وسبائك الدواري نقداً وبشكل فوري بنسبة 98% إلى 99.2% من سعر بورصة لندن (LBMA). لا يحتاج أي مالك منجم شرعي إلى بيع الذهب بخصم 15%–25% لمشترٍ أجنبي، ولا يطلب من المشتري دفع "ضرائب تصدير" مقدماً.',
        statutoryRef: 'معيار تكافؤ السبائك LBMA ومعايير التسوية في بنك أوغندا'
      },
      {
        id: 'faq-sc-2',
        category: 'supply_chain',
        categoryLabel: 'سلسلة توريد الذهب',
        question: 'كيف تعمل سلسلة توريد الذهب القانونية في شرق أفريقيا من المنجم إلى التصدير؟',
        answer: 'تعمل السلسلة القانونية عبر أربع مراحل موثقة: (1) الاستخراج الحرفي والصناعي في امتيازات مرخصة؛ (2) الوكلاء الإقليميون المرخصون حاملو رخصة تاجر معادن (MDL) من DGSM؛ (3) المصافي الجمركية ومختبرات المعايرة في كمبالا وعنتيبي التي تجري الصهر المتجانس ومعايرة النار عند 1050 درجة مئوية؛ و(4) التصدير القانوني عبر مطار عنتيبي الدولي تحت أختام جمارك URA ASYCUDA وشهادة ICGLR.',
        statutoryRef: 'قانون التعدين والمعادن الأوغندي لعام 2022 · الجزء السابع'
      },
      {
        id: 'faq-sc-3',
        category: 'supply_chain',
        categoryLabel: 'سلسلة توريد الذهب',
        question: 'هل يمكن لمشترٍ أجنبي شراء ذهب يدعي وجود "أختام عبور الأمم المتحدة" أو "حصانة دبلوماسية"؟',
        answer: 'قطعاً لا. لا تصدر الأمم المتحدة أختام عبور تجارية للسبائك، ولا يجوز قانوناً نقل أطنان الذهب التجاري في الحقائب الدبلوماسية. أي عقد أو إيصال حفظ (SKR) يشير إلى "أختام جمركية للأمم المتحدة" أو "شحن دبلوماسي معفى من الضرائب" هو أداة احتيال مفبركة بنسبة 100%.',
        statutoryRef: 'آلية الإشهاد الإقليمية للمؤتمر الدولي لمنطقة البحيرات الكبرى (ICGLR RCM)'
      },
      {
        id: 'faq-sc-4',
        category: 'supply_chain',
        categoryLabel: 'سلسلة توريد الذهب',
        question: 'هل تقوم بعثة أوغندا للذهب بالوساطة أو شراء أو بيع الذهب المادي؟',
        answer: 'كلا بشكل قاطع. تعمل بعثة أوغندا للذهب بموجب ميثاق صارم لعدم التداول. نحن لا نعمل كوسطاء أو تجار أو وكلاء، ولا نستلم أبداً حيازة السبائك أو أموال الصفقات. مهمتنا الوحيدة هي العناية الواجبة الجنائية المستقلة والتحقق الميداني.',
        statutoryRef: 'ميثاق الاستشارات السيادي لعدم التداول'
      },
      {
        id: 'faq-dd-1',
        category: 'due_diligence',
        categoryLabel: 'إجراءات العناية الواجبة',
        question: 'لماذا يُعد الفحص بجهاز XRF المحمول غير كافٍ للتحقق من سبائك الذهب (Dore Bars)؟',
        answer: 'أجهزة الأشعة السينية المحمولة (XRF) تخترق فقط من 10 إلى 50 ميكرومتر في سطح السبيكة. يقوم المزورون المحترفون بتغليف قضبان التنغستن (الذي تبلغ كثافته 19.25 جم/سم³ وهي مطابقة تقريباً للذهب النقي 19.32 جم/سم³) بطبقة خارجية بسمك 2 ملم من الذهب الحقيقي عيار 24. لذلك يفرض بروتوكولنا تحت إشراف الخبير موغيسا سولومون بياكوتاغا الفحص بالموجات فوق الصوتية والصهر الكامل بالحث ومعايرة النار عند 1050 درجة مئوية.',
        statutoryRef: 'معيار ISO 11426 لتحديد الذهب بطريقة معايرة النار (Cupellation)'
      },
      {
        id: 'faq-dd-2',
        category: 'due_diligence',
        categoryLabel: 'إجراءات العناية الواجبة',
        question: 'كيف تعمل خدمة التحقق الجنائي من الوثائق خلال 24–72 ساعة (2,500 دولار أمريكي شاملة الضريبة)؟',
        answer: 'عند إرسال عرض FCO أو عقد SPA أو ترخيص DGSM مقابل رسوم 2,500 دولار أمريكي (شاملة ضريبة القيمة المضافة الأوغندية)، يقوم محرك الذكاء الاصطناعي Gemini بإجراء تفكيك جنائي فوري وإحالة الملف إلى الضابط الميداني الأول (المقدم متقاعد آرثر مويسيغي). خلال 24–72 ساعة، يتحقق فريقنا ميدانياً من أرقام التراخيص في السجل المعدني بعنتيبي وسجلات جمارك URA. يُحتسب مبلغ 1,000 دولار أمريكي من رسوم التحقق كرصيد يُخصم من أي باقة بعثة يتم حجزها خلال 90 يوماً. وفقاً لقواعد الامتثال، لا يتم فتح أي تقارير للعميل حتى يكمل الضابط الميداني الأول التحقق ويعتمد الإصدار.',
        statutoryRef: 'اتفاقية مستوى الخدمة (24–72 ساعة) وبروتوكول اعتماد الضابط الميداني 1'
      },
      {
        id: 'faq-dd-3',
        category: 'due_diligence',
        categoryLabel: 'إجراءات العناية الواجبة',
        question: 'كيف يتم دفع ضرائب التصدير القانونية لهيئة الإيرادات الأوغندية (URA)؟',
        answer: 'تُقدر رسوم التصدير القانونية على الذهب (5%) حصرياً داخل نظام جمارك URA ASYCUDA World الرسمي، الذي يصدر رقم تسجيل دفع حكومي فريد (PRN) يُدفع مباشرة إلى صندوق الخزانة الأوغندي عبر البنوك المعتمدة. لا تحصل URA أبداً أي ضرائب عبر حسابات مكاتب المحاماة الخاصة.',
        statutoryRef: 'بروتوكول الدفع القانوني لجمارك URA ASYCUDA World'
      },
      {
        id: 'faq-dd-4',
        category: 'due_diligence',
        categoryLabel: 'إجراءات العناية الواجبة',
        question: 'كيف نتحقق مما إذا كان البائع يحمل رخصة تاجر معادن (MDL) أو عقد تعدين حقيقي؟',
        answer: 'خلال اليوم الثاني من البعثة (أو خلال 24–72 ساعة عبر خدمة التحقق الجنائي من الوثائق)، يجري مكتب الامتثال التجاري بقيادة كامانزاي كايجوكا فحصاً مباشراً للأرقام التسلسلية داخل السجل المعدني الإلكتروني بمديرية المسح الجيولوجي والمعادن (DGSM) في عنتيبي.',
        statutoryRef: 'السجل المعدني الوطني DGSM · المقر الرئيسي في عنتيبي'
      },
      {
        id: 'faq-tl-1',
        category: 'travel_logistics',
        categoryLabel: 'اللوجستيات وأمن السفر',
        question: 'كيف يتم إجراء فحص العقوبات الدولية وKYC للمشاركين في البعثة؟',
        answer: 'تشمل كل باقة بعثة فحص الخلفية وفحص قوائم العقوبات والشخصيات السياسية البارزة (OFAC, UN, UK HMT, EU sanctions and PEP screening) وإجراءات الاعتماد الحكومي دون أي رسوم KYC منفصلة — حيث يختار المشارك ويدفع فقط مقابل الباقة أو الخدمة التي يريدها.',
        statutoryRef: 'بروتوكول KYC السيادي وفحص عقوبات OFAC, UN, UK HMT, EU وPEP'
      },
      {
        id: 'faq-tl-2',
        category: 'travel_logistics',
        categoryLabel: 'اللوجستيات وأمن السفر',
        question: 'ما هي الترتيبات الأمنية ووسائل النقل والإقامة الموفرة خلال البعثة؟',
        answer: 'تحت إشراف عضو مجلس الإدارة روني موغارورا (مدير العمليات واللوجستيات والاستراتيجية)، يحصل جميع المشاركين على تخليص دبلوماسي سريع لكبار الشخصيات في مطار عنتيبي الدولي، وإقامة 5 نجوم في فندق كمبالا سيرينا، ومواكب دفع رباعي محروسة ووحدات حماية تكتيكية ومواكب مصفحة B6.',
        statutoryRef: 'مديرية العمليات وبروتوكول الأمن الميداني العالي'
      },
      {
        id: 'faq-tl-3',
        category: 'travel_logistics',
        categoryLabel: 'اللوجستيات وأمن السفر',
        question: 'ما هي طرق الدفع المقبولة لباقات البعثة والتحقق الجنائي من الوثائق؟',
        answer: 'تُدفع جميع الباقات دفعة واحدة بالكامل (8,000 / 15,000 / 25,000 دولار أمريكي للشخص شاملة ضريبة القيمة المضافة الأوغندية) وكذلك خدمة التحقق الجنائي من الوثائق خلال 24–72 ساعة (2,500 دولار أمريكي شاملة الضريبة) حصرياً عبر بوابة الدفع الإلكتروني المشفرة أو الحوالات البنكية المؤسسية الموثقة.',
        statutoryRef: 'امتثال هيئة الاستخبارات المالية (FIA) وبروتوكول التسوية المؤسسية'
      }
    ];
  }
  if (lang === 'ZH') {
    return [
      {
        id: 'faq-sc-1',
        category: 'supply_chain',
        categoryLabel: '黄金供应链',
        question: '为什么提供低于 LBMA 现货价 15%–25% 折扣的公司正式报价 (FCO) 100% 是诈骗？',
        answer: '实物黄金是具有即时流动性的全球一级货币资产。在乌干达所有持牌矿区（包括穆本德、卡桑达、布西亚和卡拉莫贾），当地持牌集货商与保税精炼厂每天都在以国际 LBMA 定盘价 98% 至 99.2% 的即期现金竞相收购原金砂与合质金条 (Dore Bars)。没有任何合法矿主需要向外国买家提供 15%–25% 的折扣，更不会要求买家垫付“出口税”或“清关费”。深度折扣纯粹是为预付费用诈骗设计的心理诱饵。',
        statutoryRef: 'LBMA 实物贵金属平价准则与乌干达央行结算标准'
      },
      {
        id: 'faq-sc-2',
        category: 'supply_chain',
        categoryLabel: '黄金供应链',
        question: '合法的东非实物黄金供应链从矿坑到出口究竟是如何运作的？',
        answer: '合法供应链分为四个可核查的层级：(1) 布西亚、穆本德等持牌矿区的手工与工业开采；(2) 持有有效 DGSM 矿产交易商牌照 (MDL) 的区域集货商将海绵金初炼为合质金条；(3) 坎帕拉与恩德培的保税精炼厂及化验室进行感应熔炼与 1050°C 火试金灰吹法检测；(4) 在 URA ASYCUDA World 海关封条与 ICGLR 区域认证下经恩德培国际机场合法出口。',
        statutoryRef: '《2022年乌干达采矿与矿产法》第七部分（增值与贸易）'
      },
      {
        id: 'faq-sc-3',
        category: 'supply_chain',
        categoryLabel: '黄金供应链',
        question: '外国买家能否合法购买声称带有“联合国过境印章”或“刚果(金)外交豁免权”的黄金？',
        answer: '绝对不能。联合国从不签发商业黄金过境印章，外交邮袋也绝不能合法运输大宗商业黄金。任何提及“联合国海关封条”、“免税叛军库存”或“外交特权清关”的合同、保管单 (SKR) 或 WhatsApp 报价，100% 是伪造的预付费用诈骗工具。',
        statutoryRef: 'ICGLR 区域认证机制 (RCM) 与经合组织 (OECD) 尽职调查指南附件二'
      },
      {
        id: 'faq-sc-4',
        category: 'supply_chain',
        categoryLabel: '黄金供应链',
        question: '乌干达黄金考察团是否居间、购买或出售实物黄金？',
        answer: '严格不参与任何交易。乌干达黄金考察团在《绝对零交易宪章》下运作。我们不充当经纪人、交易商或商业中间人，也从不托管金条或交易资金。我们的唯一职责是独立取证尽职调查、法定矿权核查与实地供应链教育，保护投资人本金免遭诈骗集团侵吞。',
        statutoryRef: '主权零交易顾问宪章'
      },
      {
        id: 'faq-dd-1',
        category: 'due_diligence',
        categoryLabel: '尽职调查流程',
        question: '为什么手持式 XRF 光谱仪扫描不足以验证合质金条 (Dore Bars) 的真伪？',
        answer: '手持式 X 射线荧光 (XRF) 光谱仪仅能穿透金属表面 10 至 50 微米。高明的造假者会将 1.5–2 毫米厚的真 24K 纯金包裹在烧结钨棒核心外部——因为钨的密度 (19.25 g/cm³) 与纯金 (19.32 g/cm³) 几乎完全一致。因此，在首席取证专家 Mugisa Solomon Byakutaaga 制定的规程下，必须执行超声波脉冲声速探伤、感应炉整体均匀熔炼、双样钻孔取芯以及 1050°C 火试金灰吹法 (Fire Assay Cupellation)。',
        statutoryRef: 'ISO 11426 黄金合金与金条纯度测定标准 — 火试金灰吹法'
      },
      {
        id: 'faq-dd-2',
        category: 'due_diligence',
        categoryLabel: '尽职调查流程',
        question: '24–72小时文件取证核验服务（2,500美元，含增值税）是如何运作的？',
        answer: '当您提交 FCO、SPA 合同、DGSM 牌照或 URA 海关文件并支付 2,500 美元（含适用乌干达增值税）核验费后，我们的 Gemini AI 取证引擎会立即进行结构化拆解，并将案卷派发给一级外勤军官（退役中校 Arthur Mwesigye）。在24–72小时内，外勤团队将前往恩德培 DGSM 矿权登记处实地核对牌照序列号并核查 URA ASYCUDA 记录。您支付的核验费中有 1,000 美元可在 90 天内预订任何考察团套餐时直接抵扣。在一级军官完成实地核验并批准发布前，任何报告均处于锁定状态。',
        statutoryRef: '24–72小时取证档案 SLA 与一级外勤军官审核发布规程'
      },
      {
        id: 'faq-dd-3',
        category: 'due_diligence',
        categoryLabel: '尽职调查流程',
        question: '合法的乌干达税务局 (URA) 黄金出口税是如何缴纳的？',
        answer: '黄金法定出口税（现行税法为 5%）仅在官方 URA ASYCUDA World 海关系统内核定，系统会生成唯一的政府缴款注册号 (PRN)，由纳税人通过授权商业银行直接缴入乌干达国家统一基金账户。URA 绝不会通过私人律师事务所托管账户、个人账户或第三方物流代理收取出口税。',
        statutoryRef: '乌干达税务局 (URA) ASYCUDA World 法定缴税规程'
      },
      {
        id: 'faq-dd-4',
        category: 'due_diligence',
        categoryLabel: '尽职调查流程',
        question: '我们如何核实卖家是否持有真正的矿产交易商牌照 (MDL) 或采矿租约？',
        answer: '在考察团第2天（或通过24–72小时文件取证核验服务），由董事会矿产贸易专家 Kamanzai Kaijuka 领导的合规团队将在恩德培能源与矿产开发部下属的地质调查与矿业局 (DGSM) 国家在线矿权注册系统中进行直接序列号与生物特征核查。WhatsApp 上流传的 PDF 牌照超过 95% 盗用了过期采石场编号或使用了数字伪造印章。',
        statutoryRef: 'DGSM 国家矿权注册中心 · 恩德培总部'
      },
      {
        id: 'faq-tl-1',
        category: 'travel_logistics',
        categoryLabel: '差旅后勤与安保',
        question: '参团代表的制裁名单与法定 KYC 审查是如何进行的？',
        answer: '由于参团代表将进入主权政府部委、海关保税金库、高安全级别精炼厂及活跃矿区，每个考察套餐均已包含背景调查、OFAC、联合国、英国财政部 (UK HMT)、欧盟制裁名单及政治公众人物 (PEP) 筛查和政府联络审批，不收取任何单独的 KYC 押金——委托人只需选择并支付自己所需的套餐或取证服务。',
        statutoryRef: '法定 KYC 及 OFAC、UN、UK HMT、EU 制裁名单与 PEP 筛查规程'
      },
      {
        id: 'faq-tl-2',
        category: 'travel_logistics',
        categoryLabel: '差旅后勤与安保',
        question: '7天考察期间提供怎样的安保、交通与住宿标准？',
        answer: '由董事会董事 Ronnie Mugarura（运营、后勤与战略总监）全程统筹，所有代表在抵达恩德培国际机场 (EBB) 时均享受 VIP 外交快速通关礼遇，下榻五星级坎帕拉塞雷纳酒店 (Kampala Serena Hotel) 或维多利亚湖塞雷纳高尔夫度假村。地面交通采用 GPS 全程追踪的行政越野车队及专属 B6 防弹装甲行政车队与贴身要员保护官。',
        statutoryRef: '运营总监署与高安全等级外勤规程'
      },
      {
        id: 'faq-tl-3',
        category: 'travel_logistics',
        categoryLabel: '差旅后勤与安保',
        question: '考察套餐及文件取证核验支持哪些支付方式？',
        answer: '所有财务结算——包括 2,500 美元的 24–72 小时文件取证核验费以及全额考察套餐费（每人 8,000 / 15,000 / 25,000 美元，均含适用乌干达增值税，一次性全额支付，不设分期）——均严格通过我们的加密在线支付网关或经核实的机构银行电汇处理，确保反洗钱 (AML) 审计合规。',
        statutoryRef: '金融情报局 (FIA) 反洗钱合规与机构结算规程'
      }
    ];
  }
  return [
    {
      id: 'faq-sc-1',
      category: 'supply_chain',
      categoryLabel: 'Filière Or & Prix',
      question: 'Pourquoi les offres FCO proposant des remises de 15 % à 25 % sous le cours spot LBMA sont-elles toujours frauduleuses ?',
      answer: "L'or physique est un actif monétaire mondial de rang 1 doté d'une liquidité instantanée. Dans tous les districts miniers agréés d'Ouganda (Mubende, Kassanda, Busia, Karamoja), les agrégateurs locaux et raffineries sous douane se disputent chaque jour l'achat d'or brut et de barres Doré au comptant entre 98 % et 99,2 % du fixing LBMA. Aucun propriétaire de mine légitime n'a jamais besoin d'accorder un rabais de 15 % à 25 % à un acheteur étranger, ni de lui demander d'avancer des « taxes d'exportation ».",
      statutoryRef: 'Parité Physique LBMA & Normes de Règlement de la Banque d’Ouganda'
    },
    {
      id: 'faq-sc-2',
      category: 'supply_chain',
      categoryLabel: 'Filière Or & Prix',
      question: 'Comment fonctionne réellement la chaîne d’approvisionnement légale de l’or en Afrique de l’Est ?',
      answer: "La filière légale opère sur quatre niveaux vérifiables : (1) Extraction artisanale et industrielle sur concessions agréées ; (2) Agrégateurs régionaux titulaires d'une Licence de Négociant en Minéraux (MDL) valide du DGSM ; (3) Raffineries sous douane et laboratoires à Kampala et Entebbe effectuant une fusion par induction homogène et une coupellation à 1050°C ; et (4) Exportation statutaire via l'aéroport d'Entebbe sous scellés douaniers URA ASYCUDA World et certification CIRGL (ICGLR).",
      statutoryRef: 'Loi sur les Mines et les Minéraux de l’Ouganda 2022 · Partie VII'
    },
    {
      id: 'faq-sc-3',
      category: 'supply_chain',
      categoryLabel: 'Filière Or & Prix',
      question: 'Un acheteur étranger peut-il légalement acheter de l’or revendiquant des « Tampons ONU » ou une « Immunité Diplomatique RDC » ?',
      answer: "Non. Les Nations Unies n'émettent aucun tampon de transit commercial pour l'or, et les valises diplomatiques ne peuvent légalement transporter du tonnage d'or commercial. Tout contrat, SKR ou pitch WhatsApp mentionnant des « scellés douaniers ONU » ou un « dédouanement par boîte diplomatique » est un instrument de fraude aux frais avancés fabriqué à 100 %.",
      statutoryRef: 'Mécanisme Régional de Certification CIRGL (RCM) & Annexe II OCDE'
    },
    {
      id: 'faq-sc-4',
      category: 'supply_chain',
      categoryLabel: 'Filière Or & Prix',
      question: 'L’Uganda Gold Expedition fait-elle du courtage, de l’achat ou de la vente d’or physique ?',
      answer: "Strictement non. L'Uganda Gold Expedition opère sous une Charte de Non-Transaction absolue. Nous n'agissons ni comme courtiers, ni comme négociants ou mandataires, et nous ne prenons jamais la garde de lingots ou de fonds de transaction. Notre seul mandat est la diligence raisonnable forensique indépendante.",
      statutoryRef: 'Charte Consultative Souveraine de Non-Transaction'
    },
    {
      id: 'faq-dd-1',
      category: 'due_diligence',
      categoryLabel: 'Processus de Diligence',
      question: 'Pourquoi un scan XRF portable est-il insuffisant pour vérifier des barres Doré ?',
      answer: "Les spectromètres à fluorescence X (XRF) portables ne pénètrent que de 10 à 50 micromètres à la surface du métal. Les faussaires fusionnent une enveloppe de 1,5 à 2 mm d'or 24 carats véritable autour d'un cœur de tiges de tungstène fritté — car la densité du tungstène (19,25 g/cm³) est quasi identique à celle de l'or pur (19,32 g/cm³). Notre protocole dirigé par Mugisa Solomon Byakutaaga impose le scan par ultrasons suivi d'une fusion complète par induction, d'un double carottage et d'une coupellation (Fire Assay) à 1050°C.",
      statutoryRef: 'Norme ISO 11426 Détermination de l’Or par Méthode de Coupellation'
    },
    {
      id: 'faq-dd-2',
      category: 'due_diligence',
      categoryLabel: 'Processus de Diligence',
      question: 'Comment fonctionne le service de Vérification Forensique de Documents en 24–72 Heures (2 500 USD, TVA incluse) ?',
      answer: "Lorsque vous soumettez une FCO, un SPA, une licence DGSM ou un document douanier URA avec les frais de 2 500 USD (TVA ougandaise applicable incluse), notre moteur forensique Gemini IA effectue une déconstruction structurelle immédiate et transmet le dossier à l'Officier d'État-Major 1 (Lt. Col. Rtd. Arthur Mwesigye). En 24 à 72 heures, notre équipe vérifie physiquement les numéros de série au Cadastre Minier DGSM d'Entebbe et dans ASYCUDA World. 1 000 USD de vos frais de vérification sont crédités sur tout forfait d'expédition réservé dans les 90 jours. Aucun rapport n'est déverrouillé avant la validation finale de l'Officier 1.",
      statutoryRef: 'SLA Dossier Forensique 24–72h & Protocole d’Embargo Officier 1'
    },
    {
      id: 'faq-dd-3',
      category: 'due_diligence',
      categoryLabel: 'Processus de Diligence',
      question: 'Comment sont payées les taxes d’exportation légitimes de l’Uganda Revenue Authority (URA) ?',
      answer: "Les droits d'exportation statutaires sur l'or (5 %) sont évalués exclusivement dans le système douanier officiel URA ASYCUDA World, qui génère un Numéro d'Enregistrement de Paiement (PRN) gouvernemental unique payable directement au Fonds Consolidé de l'Ouganda via des banques commerciales agréées — jamais sur le compte séquestre d'un avocat privé.",
      statutoryRef: 'Protocole de Paiement Statutaire URA ASYCUDA World'
    },
    {
      id: 'faq-dd-4',
      category: 'due_diligence',
      categoryLabel: 'Processus de Diligence',
      question: 'Comment vérifier si un vendeur détient une véritable Licence de Négociant en Minéraux (MDL) ?',
      answer: "Lors du Jour 2 de l'expédition (ou en 24–72 heures via notre service de Vérification Forensique de Documents), notre bureau juridique et commercial dirigé par Kamanzai Kaijuka effectue une vérification directe dans le Registre National du Cadastre Minier du DGSM à Entebbe. Plus de 95 % des licences PDF circulant sur WhatsApp utilisent des numéros expirés ou de faux cachets.",
      statutoryRef: 'Registre National du Cadastre Minier DGSM · Siège d’Entebbe'
    },
    {
      id: 'faq-tl-1',
      category: 'travel_logistics',
      categoryLabel: 'Logistique & Sécurité',
      question: 'Comment fonctionne le filtrage des sanctions et le contrôle KYC pour les délégués ?',
      answer: "Chaque forfait d'expédition inclut la vérification des antécédents, le filtrage des sanctions et des personnes politiquement exposées (OFAC, ONU, UK HMT, UE sanctions et PEP screening) ainsi que les liaisons gouvernementales, sans aucun dépôt KYC séparé — vous choisissez et payez uniquement le forfait ou service souhaité.",
      statutoryRef: 'Protocole KYC & Filtrage des Sanctions OFAC, ONU, UK HMT, UE et PEP'
    },
    {
      id: 'faq-tl-2',
      category: 'travel_logistics',
      categoryLabel: 'Logistique & Sécurité',
      question: 'Quelle logistique de sécurité, de transport et d’hébergement est fournie pendant les 7 jours ?',
      answer: "Orchestrée par notre directeur Ronnie Mugarura (Opérations, Logistique et Stratégie), chaque délégation bénéficie d'un passage diplomatique VIP rapide à l'aéroport d'Entebbe (EBB), d'un hébergement 5 étoiles au Kampala Serena Hotel, et de convois exécutifs suivis par GPS et cortèges exécutifs blindés B6 avec officiers de protection rapprochée.",
      statutoryRef: 'Direction des Opérations & Protocole de Terrain Haute Sécurité'
    },
    {
      id: 'faq-tl-3',
      category: 'travel_logistics',
      categoryLabel: 'Logistique & Sécurité',
      question: 'Quels modes de paiement sont acceptés pour les forfaits d’expédition et les vérifications documentaires ?',
      answer: "Tous les règlements financiers — y compris les forfaits d'expédition réglés intégralement en un seul paiement (8 000 / 15 000 / 25 000 USD par personne, TVA ougandaise incluse) et la Vérification Forensique de Documents en 24–72h (2 500 USD, TVA incluse) — sont traités strictement via notre passerelle de paiement en ligne sécurisée ou par virement bancaire institutionnel vérifié.",
      statutoryRef: 'Conformité LCB-FT de la Financial Intelligence Authority (FIA)'
    }
  ];
}
