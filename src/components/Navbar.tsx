import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Menu,
  X,
  Search,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Language, Currency, ContentPost } from '../types';
import { INITIAL_POSTS } from '../data/portalData';

export type PublicRoute =
  | '/'
  | '/offer-verification'
  | '/expeditions'
  | '/expeditions/professional-traders'
  | '/expeditions/academic-research'
  | '/expeditions/institutional-vip'
  | '/expeditions/itinerary'
  | '/expeditions/dates-packages'
  | '/risk-compliance'
  | '/risk-compliance/supply-chain'
  | '/risk-compliance/scam-check'
  | '/about'
  | '/insights'
  | '/faq'
  | '/contact'
  | '/apply'
  | '/portal'
  | '/charter'
  | '/privacy'
  | '/terms'
  | string;

interface NavbarProps {
  currentLang: Language;
  selectedCurrency: Currency;
  currentPath: string;
  posts?: ContentPost[];
  onNavigate: (path: string) => void;
  onLanguageChange?: (lang: Language) => void;
  onCurrencyChange?: (currency: Currency) => void;
  onOpenRegistration?: () => void;
  onOpenCardPayment?: () => void;
  onOpenDocVerification?: () => void;
  onOpenClientPortal?: () => void;
  onOpenPortalAuth?: () => void;
  onOpenAdminPanel?: () => void;
  onOpenInvoiceReceipt?: () => void;
}

export interface SiteSearchItem {
  id: string;
  type: 'insight' | 'faq' | 'compliance';
  typeLabel: string;
  title: string;
  snippet: string;
  badge: string;
  path: string;
  keywords: string;
}

const STATIC_FAQ_INDEX: SiteSearchItem[] = [
  {
    id: 'faq-sc-1',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'Why do Full Corporate Offers (FCOs) advertising 15%–25% discounts below LBMA spot warrant independent scrutiny?',
    snippet:
      'Licensed aggregators and refineries in Uganda buy doré near international spot rates after purity and refining adjustments. Deep discount claims frequently accompany advance-fee requests.',
    badge: 'Gold Supply Chain',
    path: '/faq?q=discount',
    keywords: 'fco discount 15% 25% lbma spot fraud scam advance fee',
  },
  {
    id: 'faq-sc-2',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'How does the legitimate East African physical gold supply chain operate from pithead to export?',
    snippet:
      'Operates across four verifiable tiers: licensed concessions (Busia, Mubende, Kassanda), DGSM Mineral Dealer Licenses, Kampala/Entebbe refineries, and URA ASYCUDA / ICGLR export.',
    badge: 'Gold Supply Chain',
    path: '/faq?q=supply%20chain',
    keywords: 'supply chain pithead export busia mubende kassanda dgsm mdl',
  },
  {
    id: 'faq-sc-3',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'Can a foreign buyer legally purchase gold claiming "UN Transit Stamps" or "DRC Diplomatic Immunity"?',
    snippet:
      'No. The UN does not issue commercial bullion transit stamps and diplomatic pouches cannot transport commercial gold. All lawful movements require ICGLR RCM and URA declarations.',
    badge: 'Gold Supply Chain',
    path: '/faq?q=UN%20Transit',
    keywords: 'un transit stamps drc diplomatic immunity skr safe keeping receipt icglr',
  },
  {
    id: 'faq-sc-4',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'Does the Uganda Gold Expedition broker, buy, or sell physical gold?',
    snippet:
      'Strictly no. We operate under an absolute Non-Transaction Charter and never act as brokers, dealers, or intermediaries.',
    badge: 'Non-Transaction Charter',
    path: '/faq?q=broker',
    keywords: 'broker buy sell non-transaction charter independence custody',
  },
  {
    id: 'faq-dd-1',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'Why is a handheld XRF scan insufficient to verify physical gold Dore bars?',
    snippet:
      'Handheld XRF only penetrates 10–50 micrometers and misses sintered tungsten cores. Full induction melting, dual-sample drilling, and 1050°C Fire Assay Cupellation are mandatory.',
    badge: 'Due Diligence Process',
    path: '/faq?q=XRF',
    keywords: 'xrf tungsten fire assay cupellation ultrasonic density 1050',
  },
  {
    id: 'faq-dd-2',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'How does the $2,500 24–72 Hour Forensic Document Verification service work?',
    snippet:
      'Submit an FCO, SPA, DGSM license, or URA customs document for physical registry cross-checking at DGSM Entebbe and URA ASYCUDA within 24–72 hours ($1,000 credited toward an expedition).',
    badge: 'Due Diligence Process',
    path: '/faq?q=2,500',
    keywords: '2500 24-72 hour forensic document verification fco spa staff officer 1',
  },
  {
    id: 'faq-dd-3',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'How are legitimate Uganda Revenue Authority (URA) export taxes paid?',
    snippet:
      'Statutory 5% export levies are assessed inside URA ASYCUDA World, generating an official government Payment Registration Number (PRN) payable to the Uganda Consolidated Fund.',
    badge: 'Due Diligence Process',
    path: '/faq?q=URA',
    keywords: 'ura export tax 5% asycuda world prn payment registration number law firm escrow',
  },
  {
    id: 'faq-dd-4',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'How do we verify if a seller holds a genuine Mineral Dealer License (MDL) or Mining Lease?',
    snippet:
      'Our compliance desk conducts a direct serial lookup inside the DGSM online Mineral Cadastre Registry in Entebbe to detect expired or forged PDF licenses.',
    badge: 'Due Diligence Process',
    path: '/faq?q=Mineral%20Dealer%20License',
    keywords: 'mdl mineral dealer license mining lease dgsm cadastre entebbe whatsapp pdf',
  },
  {
    id: 'faq-tl-1',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'How does sanctions, PEP, and statutory KYC vetting work for expedition delegates?',
    snippet:
      'Every applicant undergoes OFAC, UN, UK HMT, EU sanctions and PEP screening alongside Ministry of Energy security accreditation, included in every expedition package.',
    badge: 'Travel Logistics',
    path: '/faq?q=KYC',
    keywords: 'sanctions pep kyc vetting ofac un uk hmt eu accreditation',
  },
  {
    id: 'faq-tl-2',
    type: 'faq',
    typeLabel: 'FAQ Entry',
    title: 'What security, transport, and accommodation logistics are provided during the 7-day expedition?',
    snippet:
      'Includes Entebbe VIP fast-track clearance, 5-star Serena accommodation, and GPS-tracked executive convoys (upgraded to B6 armored motorcades for Tier 03 delegations).',
    badge: 'Travel Logistics',
    path: '/faq?q=security',
    keywords: 'security transport accommodation b6 armored convoy serena entebbe vip',
  },
];

const STATIC_COMPLIANCE_INDEX: SiteSearchItem[] = [
  {
    id: 'comp-1',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'How Uganda’s Regulated Gold Supply Chain Works (Mining Act 2022 & ICGLR)',
    snippet:
      'Four verifiable nodes: licensed extraction, DGSM-licensed mineral dealers, accredited Kampala/Entebbe refineries, and URA customs clearance at Entebbe International Airport.',
    badge: 'Statutory Guide',
    path: '/risk-compliance',
    keywords: 'mining and minerals act 2022 icglr rcm oecd due diligence supply chain guide',
  },
  {
    id: 'comp-2',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Why Deep-Discount Gold Offers Are Red Flags (LBMA Spot Parity)',
    snippet:
      'Licensed aggregators and refineries in Kampala and Entebbe purchase doré daily within 1% to 3% of international spot prices. Deep discounts are engineered to induce advance fees.',
    badge: 'Pricing & Market Reality',
    path: '/risk-compliance',
    keywords: 'deep discount red flags lbma spot parity advance fee pricing',
  },
  {
    id: 'comp-3',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Common Documentation & Payment Frauds (URA ASYCUDA PRN vs. Law Firm Escrow)',
    snippet:
      'How to spot altered mineral dealer licenses, fake UN transit clearances, and fraudulent requests to wire taxes to private law-firm accounts instead of URA PRNs.',
    badge: 'Fraud Prevention',
    path: '/risk-compliance',
    keywords: 'documentation payment fraud ura asycuda prn escrow forged license',
  },
  {
    id: 'comp-4',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Assay & Metallurgical Verification Basics (ISO 11426 Fire Assay vs. XRF)',
    snippet:
      'Why surface XRF spectrometers fail to detect tungsten-core bars and how homogeneous induction melting and 1,050°C fire assay cupellation guarantee purity.',
    badge: 'Metallurgical Standard',
    path: '/risk-compliance',
    keywords: 'iso 11426 fire assay cupellation xrf tungsten induction melting metallurgy',
  },
  {
    id: 'comp-5',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Licensing, Customs & Export Compliance (DGSM, MDL, ICGLR & 5% Export Levy)',
    snippet:
      'Mandatory statutory checklist for legal export through Entebbe International Airport: active MDL/refining license, assay certificate, ICGLR certificate, and URA ASYCUDA PRN.',
    badge: 'Export Compliance',
    path: '/risk-compliance',
    keywords: 'licensing customs export compliance dgsm mdl icglr 5% export levy entebbe',
  },
  {
    id: 'comp-6',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Interactive 5-Stage Uganda Gold Supply-Chain Map & Corridor Guide',
    snippet:
      'Inspect the 5 stages of Uganda’s supply chain across Mubende, Kassanda, Busia, Karamoja, Kampala refineries, and Entebbe DGSM & URA checkpoints.',
    badge: 'Interactive Supply-Chain Map',
    path: '/risk-compliance/supply-chain',
    keywords: 'supply chain map stages mubende kassanda busia karamoja kampala entebbe',
  },
  {
    id: 'comp-7',
    type: 'compliance',
    typeLabel: 'Risk & Compliance Guide',
    title: 'Interactive Scam-Risk Assessment Tool & Offer Diagnostic',
    snippet:
      'Screen an active gold offer against pricing discounts, upfront fee demands, tax routing, and assay conditions to calculate immediate counterparty risk.',
    badge: 'Diagnostic Tool',
    path: '/risk-compliance/scam-check',
    keywords: 'scam risk assessment tool diagnostic calculator red flag check offer',
  },
];

const NAV_LABELS: Record<
  Language,
  {
    expeditions: string;
    verification: string;
    riskCompliance: string;
    about: string;
    insights: string;
    clientPortal: string;
    verifyOfferCta: string;
    searchPlaceholder: string;
  }
> = {
  EN: {
    expeditions: 'Expeditions',
    verification: 'Offer Verification',
    riskCompliance: 'Risk & Compliance',
    about: 'About',
    insights: 'Insights',
    clientPortal: 'Client Portal',
    verifyOfferCta: 'Verify an Offer',
    searchPlaceholder: 'Search insights, FAQs, guides...',
  },
  AR: {
    expeditions: 'البعثات الميدانية',
    verification: 'التحقق من العروض',
    riskCompliance: 'المخاطر والامتثال',
    about: 'من نحن',
    insights: 'المدونة والرؤى',
    clientPortal: 'بوابة العملاء',
    verifyOfferCta: 'افحص عرضاً الآن',
    searchPlaceholder: 'ابحث في التقارير والأسئلة والامتثال...',
  },
  ZH: {
    expeditions: '实地考察',
    verification: '报价核验',
    riskCompliance: '风险与合规',
    about: '关于我们',
    insights: '博客与洞察',
    clientPortal: '客户门户',
    verifyOfferCta: '核验黄金报价',
    searchPlaceholder: '搜索洞察文章、常见问题、合规指南...',
  },
  FR: {
    expeditions: 'Expéditions',
    verification: 'Vérification d’Offre',
    riskCompliance: 'Risques & Conformité',
    about: 'À Propos',
    insights: 'Blog & Analyses',
    clientPortal: 'Portail Client',
    verifyOfferCta: 'Vérifier une Offre',
    searchPlaceholder: 'Rechercher articles, FAQ, guides...',
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  currentPath,
  posts = INITIAL_POSTS,
  onNavigate,
  onLanguageChange,
}) => {
  const labels = NAV_LABELS[currentLang] || NAV_LABELS.EN;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sitewide Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'insight' | 'faq' | 'compliance'>('all');
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown on outside click or Escape key, and support Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Build unified local search index combining Insights articles, FAQ entries, and Risk-Compliance guides
  const searchIndex = useMemo<SiteSearchItem[]>(() => {
    const activePosts = (posts && posts.length > 0 ? posts : INITIAL_POSTS).filter(
      (p) => p.published !== false
    );

    const insightItems: SiteSearchItem[] = activePosts.map((post) => {
      const slug = post.slug || post.id;
      return {
        id: `insight-${slug}`,
        type: 'insight',
        typeLabel: 'Insights Library',
        title: post.h1 || post.title,
        snippet: post.summary,
        badge: post.category,
        path: `/insights/${slug}`,
        keywords: `${post.title} ${post.h1 || ''} ${post.summary} ${post.body} ${post.author} ${post.category} ${(
          post.tags || []
        ).join(' ')}`.toLowerCase(),
      };
    });

    return [...insightItems, ...STATIC_FAQ_INDEX, ...STATIC_COMPLIANCE_INDEX];
  }, [posts]);

  // Filter search index locally based on query and selected category tab
  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);

    return searchIndex.filter((item) => {
      if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false;
      }
      if (terms.length === 0) {
        return true;
      }
      const haystack = `${item.title} ${item.snippet} ${item.badge} ${item.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [searchIndex, searchQuery, activeFilter]);

  const countsByType = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const matchesQuery = (item: SiteSearchItem) => {
      if (terms.length === 0) return true;
      const haystack = `${item.title} ${item.snippet} ${item.badge} ${item.keywords}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    };

    const allMatched = searchIndex.filter(matchesQuery);
    return {
      all: allMatched.length,
      insight: allMatched.filter((i) => i.type === 'insight').length,
      faq: allMatched.filter((i) => i.type === 'faq').length,
      compliance: allMatched.filter((i) => i.type === 'compliance').length,
    };
  }, [searchIndex, searchQuery]);

  const navItems = [
    { label: labels.expeditions, path: '/expeditions', matchPrefix: '/expeditions' },
    { label: labels.verification, path: '/offer-verification', matchPrefix: '/offer-verification' },
    { label: labels.riskCompliance, path: '/risk-compliance', matchPrefix: '/risk-compliance' },
    { label: labels.about, path: '/about', matchPrefix: '/about' },
    { label: labels.insights, path: '/insights', matchPrefix: '/insights' },
  ];

  const isActive = (matchPrefix: string) => {
    if (matchPrefix === '/offer-verification') {
      return currentPath === '/offer-verification' || currentPath === '/verification';
    }
    if (matchPrefix === '/insights') {
      return (
        currentPath === '/insights' ||
        currentPath.startsWith('/insights/') ||
        currentPath === '/blog' ||
        currentPath.startsWith('/blog/')
      );
    }
    return currentPath === matchPrefix || currentPath.startsWith(`${matchPrefix}/`);
  };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    onNavigate(path);
  };

  const handleSelectSearchResult = (item: SiteSearchItem) => {
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    onNavigate(item.path);
  };

  const getTypeIcon = (type: SiteSearchItem['type']) => {
    if (type === 'insight') return <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />;
    if (type === 'faq') return <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    return <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
  };

  return (
    <header
      role="banner"
      ref={searchContainerRef}
      className={`sticky top-0 left-0 right-0 z-40 w-full max-w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/90 py-2'
          : 'bg-[#0B0F17] border-b border-slate-800/70 py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 w-full relative">
        <div className="flex items-center justify-between gap-2 xl:gap-3 min-w-0">
          {/* Zone 1: Brand Emblem + Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2 font-cinzel text-xs sm:text-sm tracking-wide font-bold text-white hover:text-[#FEF3C7] transition-colors whitespace-nowrap shrink-0 group"
          >
            <img
              src="/assets/aistudio/uge-logo-emblem-dark.png"
              alt="Uganda Gold Expedition Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span>
                UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Five Primary Navigation Items */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-3 xl:gap-4 text-xs font-medium text-slate-300 min-w-0"
          >
            {navItems.map((item) => {
              const active = isActive(item.matchPrefix);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-[#D4AF37] underline underline-offset-8 decoration-2 decoration-[#D4AF37]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Sitewide Search Bar + Compact Language Selector + Client Portal + Verify an Offer */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Sitewide Header Search Input */}
            <div className="relative w-44 xl:w-52">
              <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder={labels.searchPlaceholder}
                aria-label="Search Insights, FAQs, and Risk-Compliance Guides"
                className="w-full pl-8 pr-7 py-1.5 text-[11px] bg-[#111722] border border-slate-700/90 focus:border-[#D4AF37] rounded-lg text-white placeholder-slate-400 outline-none transition-colors text-left"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search query"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden xl:inline-block absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono-data text-slate-500 border border-slate-800 rounded px-1 pointer-events-none">
                  ⌘K
                </span>
              )}
            </div>

            {onLanguageChange && (
              <div
                data-no-translate="true"
                aria-label="Site Language Selector"
                className="inline-flex items-center gap-0.5 rounded-md bg-[#111722] border border-slate-800 p-0.5 font-mono-data text-[10px]"
              >
                {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    aria-pressed={currentLang === lang}
                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                      currentLang === lang
                        ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            <a
              href="/portal"
              onClick={(e) => handleLinkClick(e, '/portal')}
              className={`text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                currentPath.startsWith('/portal')
                  ? 'text-[#D4AF37] underline underline-offset-4'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {labels.clientPortal}
            </a>

            <a
              href="/offer-verification"
              onClick={(e) => handleLinkClick(e, '/offer-verification')}
              className="px-3 py-1.5 text-[11px] font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {labels.verifyOfferCta}
            </a>
          </div>

          {/* Mobile Search & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              aria-label="Open sitewide search"
              className={`p-1.5 rounded-md border transition-colors ${
                isSearchOpen
                  ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37]'
                  : 'bg-[#111722] text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {onLanguageChange && (
              <div
                data-no-translate="true"
                className="inline-flex items-center gap-0.5 rounded-md bg-[#111722] border border-slate-800 p-0.5 font-mono-data text-[10px]"
              >
                {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      currentLang === lang
                        ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            <a
              href="/offer-verification"
              onClick={(e) => handleLinkClick(e, '/offer-verification')}
              className="px-2.5 py-1.5 text-[11px] font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              {labels.verifyOfferCta}
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setIsSearchOpen(false);
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-1.5 text-slate-300 hover:text-white rounded-md border border-slate-800 bg-[#111722]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sitewide Search Results Popover Panel (Desktop & Mobile) */}
        {isSearchOpen && (
          <div
            role="dialog"
            aria-label="Sitewide Search Results"
            className="mt-2.5 lg:mt-0 lg:absolute lg:right-6 lg:top-full lg:w-[540px] max-w-full rounded-xl bg-[#111722] border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-50"
          >
            {/* Mobile Search Input inside Popover */}
            <div className="p-3 border-b border-slate-800 lg:hidden">
              <div className="relative">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={labels.searchPlaceholder}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-xs bg-[#0B0F17] border border-slate-700 focus:border-[#D4AF37] rounded-lg text-white placeholder-slate-400 outline-none text-left"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-3.5 py-2.5 bg-[#0B0F17]/90 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: `All (${countsByType.all})` },
                    { id: 'insight', label: `Insights (${countsByType.insight})` },
                    { id: 'faq', label: `FAQs (${countsByType.faq})` },
                    { id: 'compliance', label: `Compliance Guides (${countsByType.compliance})` },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono-data transition-colors whitespace-nowrap cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                        : 'bg-[#111722] text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-white p-1 shrink-0 cursor-pointer"
                aria-label="Close search results"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestion Chips when search query is empty */}
            {!searchQuery.trim() && (
              <div className="px-4 py-2 bg-[#0E1420] border-b border-slate-800/80 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono-data uppercase tracking-wider text-slate-400 mr-1">
                  Quick topics:
                </span>
                {['XRF vs Fire Assay', '15% Discount', 'DGSM License', 'URA 5% Tax', 'ICGLR'].map(
                  (chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setSearchQuery(chip)}
                      className="px-2 py-0.5 rounded bg-[#111722] hover:bg-[#182232] border border-slate-700 hover:border-[#D4AF37]/50 text-[10px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Filtered Results List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
              {filteredResults.length === 0 ? (
                <div className="p-6 text-center space-y-2">
                  <p className="text-xs text-slate-300 font-semibold">
                    No matching Insights, FAQs, or Risk-Compliance guides found for &ldquo;
                    {searchQuery}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="px-3 py-1.5 rounded bg-[#D4AF37] text-[#0B0F17] text-xs font-bold cursor-pointer"
                  >
                    Reset Search Filter
                  </button>
                </div>
              ) : (
                filteredResults.slice(0, 10).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSearchResult(item)}
                    className="w-full p-3.5 hover:bg-[#182232]/90 transition-colors text-left flex items-start justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-[10px] font-mono-data uppercase tracking-wider text-[#D4AF37] font-semibold">
                          {item.typeLabel}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-[10px] font-mono-data text-slate-400">
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#D4AF37] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))
              )}
            </div>

            {/* Footer Links inside Search Popover */}
            <div className="px-4 py-2.5 bg-[#080B11] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <span>
                Showing {Math.min(filteredResults.length, 10)} of {filteredResults.length} matches
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="/insights"
                  onClick={(e) => handleLinkClick(e, '/insights')}
                  className="text-[#D4AF37] hover:underline"
                >
                  All Insights
                </a>
                <a
                  href="/faq"
                  onClick={(e) => handleLinkClick(e, '/faq')}
                  className="text-[#D4AF37] hover:underline"
                >
                  All FAQs
                </a>
                <a
                  href="/risk-compliance"
                  onClick={(e) => handleLinkClick(e, '/risk-compliance')}
                  className="text-[#D4AF37] hover:underline"
                >
                  Compliance Hub
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Accessible Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-800 space-y-1"
          >
            {navItems.map((item) => {
              const active = isActive(item.matchPrefix);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#182232] text-[#D4AF37] font-semibold'
                      : 'text-slate-200 hover:bg-[#111722] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between px-3">
              <a
                href="/portal"
                onClick={(e) => handleLinkClick(e, '/portal')}
                className="text-xs font-medium text-slate-300 hover:text-[#D4AF37] py-1.5"
              >
                {labels.clientPortal}
              </a>

              <a
                href="/offer-verification"
                onClick={(e) => handleLinkClick(e, '/offer-verification')}
                className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg"
              >
                {labels.verifyOfferCta}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
