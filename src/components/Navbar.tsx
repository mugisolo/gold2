import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, Currency } from '../types';

export type PublicRoute =
  | '/'
  | '/verification'
  | '/expeditions'
  | '/expeditions/professional'
  | '/expeditions/academic'
  | '/expeditions/institutional'
  | '/expeditions/itinerary'
  | '/expeditions/dates'
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
  },
  AR: {
    expeditions: 'البعثات الميدانية',
    verification: 'التحقق من العروض',
    riskCompliance: 'المخاطر والامتثال',
    about: 'من نحن',
    insights: 'الرؤى والتقارير',
    clientPortal: 'بوابة العملاء',
    verifyOfferCta: 'افحص عرضاً الآن',
  },
  ZH: {
    expeditions: '实地考察',
    verification: '报价核验',
    riskCompliance: '风险与合规',
    about: '关于我们',
    insights: '研究与洞察',
    clientPortal: '客户门户',
    verifyOfferCta: '核验黄金报价',
  },
  FR: {
    expeditions: 'Expéditions',
    verification: 'Vérification d’Offre',
    riskCompliance: 'Risques & Conformité',
    about: 'À Propos',
    insights: 'Analyses',
    clientPortal: 'Portail Client',
    verifyOfferCta: 'Vérifier une Offre',
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  currentPath,
  onNavigate,
  onLanguageChange,
}) => {
  const labels = NAV_LABELS[currentLang] || NAV_LABELS.EN;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: labels.expeditions, path: '/expeditions', matchPrefix: '/expeditions' },
    { label: labels.verification, path: '/verification', matchPrefix: '/verification' },
    { label: labels.riskCompliance, path: '/risk-compliance', matchPrefix: '/risk-compliance' },
    { label: labels.about, path: '/about', matchPrefix: '/about' },
    { label: labels.insights, path: '/insights', matchPrefix: '/insights' },
  ];

  const isActive = (matchPrefix: string) =>
    currentPath === matchPrefix || currentPath.startsWith(`${matchPrefix}/`);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/90 py-3'
          : 'bg-[#0B0F17] border-b border-slate-800/70 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Emblem + Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5 sm:gap-3 font-cinzel text-base sm:text-lg tracking-wider font-bold text-white hover:text-[#FEF3C7] transition-colors whitespace-nowrap shrink-0 group"
          >
            <img
              src="/assets/aistudio/uge-logo-emblem-dark.png"
              alt="Uganda Gold Expedition Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
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
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
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

          {/* Zone 3: Compact Language Selector + Small Client Portal Text Link + One Prominent Gold Button ("Verify an Offer") */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {onLanguageChange && (
              <div
                data-no-translate="true"
                aria-label="Site Language Selector"
                className="inline-flex items-center gap-0.5 rounded-lg bg-[#111722] border border-slate-800 p-0.5 font-mono-data text-[11px]"
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
              className={`text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                currentPath.startsWith('/portal')
                  ? 'text-[#D4AF37] underline underline-offset-4'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {labels.clientPortal}
            </a>

            <a
              href="/verification"
              onClick={(e) => handleLinkClick(e, '/verification')}
              className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {labels.verifyOfferCta}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2.5">
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
              href="/verification"
              onClick={(e) => handleLinkClick(e, '/verification')}
              className="px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              {labels.verifyOfferCta}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-300 hover:text-white rounded-md border border-slate-800 bg-[#111722]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

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
                href="/verification"
                onClick={(e) => handleLinkClick(e, '/verification')}
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
