import React, { useState, useEffect } from 'react';
import {
  Shield,
  Menu,
  X,
  Globe,
  CreditCard,
  Award,
  Lock,
  FileSearch,
  Coins,
  QrCode,
  ChevronRight
} from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface NavbarProps {
  currentLang: Language;
  selectedCurrency: Currency;
  activePage: 'home' | 'about' | 'blog';
  onNavigatePage: (page: 'home' | 'about' | 'blog', sectionId?: string) => void;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange: (currency: Currency) => void;
  onOpenRegistration: () => void;
  onOpenCardPayment: () => void;
  onOpenDocVerification: () => void;
  onOpenClientPortal: () => void;
  onOpenPortalAuth: () => void;
  onOpenAdminPanel: () => void;
  onOpenInvoiceReceipt?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  selectedCurrency,
  activePage,
  onNavigatePage,
  onLanguageChange,
  onCurrencyChange,
  onOpenRegistration,
  onOpenCardPayment,
  onOpenDocVerification,
  onOpenClientPortal,
  onOpenPortalAuth,
  onOpenAdminPanel,
  onOpenInvoiceReceipt
}) => {
  const t = translations[currentLang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('uge_custom_logo_url') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleLogoSync = () => {
      try {
        setCustomLogoUrl(localStorage.getItem('uge_custom_logo_url') || '');
      } catch {
        // ignore
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('uge-logo-updated', handleLogoSync);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('uge-logo-updated', handleLogoSync);
    };
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomLogoUrl(dataUrl);
      try {
        localStorage.setItem('uge_custom_logo_url', dataUrl);
        window.dispatchEvent(new Event('uge-logo-updated'));
      } catch {
        // ignore
      }
    };
    reader.readAsDataURL(file);
  };

  const auditPriceFormatted = formatCurrencyPrice(2500, selectedCurrency);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-2.5'
          : 'bg-[#0B0F17]/90 backdrop-blur-sm border-b border-slate-800/80 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Enabled Logo Spot + Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <label
              title="Official Logo Spot (Click to upload custom brand logo)"
              className="relative group w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#111722] border border-[#D4AF37]/60 hover:border-[#FEF3C7] flex items-center justify-center overflow-hidden cursor-pointer shadow-md shadow-[#D4AF37]/10 shrink-0 transition-all"
            >
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="Uganda Gold Expedition Logo"
                  className="w-full h-full object-contain p-0.5"
                />
              ) : (
                <svg
                  viewBox="0 0 64 64"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  aria-label="Uganda Gold Expedition Crest"
                >
                  <path
                    d="M32 6L52 15V31C52 45 43.2 54.8 32 58.5C20.8 54.8 12 45 12 31V15L32 6Z"
                    fill="#131A26"
                    stroke="#D4AF37"
                    strokeWidth="3"
                  />
                  <path d="M21 35L25.5 24H38.5L43 35H21Z" fill="#D4AF37" />
                  <text
                    x="32"
                    y="47"
                    textAnchor="middle"
                    fill="#FEF3C7"
                    fontFamily="Cinzel, Georgia, serif"
                    fontWeight="bold"
                    fontSize="10"
                  >
                    UGE
                  </text>
                </svg>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => onNavigatePage('home')}
              className="font-cinzel text-sm sm:text-base md:text-lg tracking-wider font-bold text-white hover:text-[#FEF3C7] transition-colors whitespace-nowrap shrink-0"
            >
              UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
            </button>
          </div>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <button
              onClick={() => onNavigatePage('home', 'expedition')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'home' ? 'text-white' : ''
              }`}
            >
              {t.navExpedition}
            </button>
            <button
              onClick={() => onNavigatePage('about')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'about'
                  ? 'text-[#D4AF37] underline underline-offset-4'
                  : ''
              }`}
            >
              {t.navAboutUs}
            </button>
            <button
              onClick={() => onNavigatePage('blog')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${
                activePage === 'blog'
                  ? 'text-[#D4AF37] underline underline-offset-4'
                  : ''
              }`}
            >
              {t.navBlog}
            </button>
            <button
              onClick={() => onNavigatePage('home', 'packages')}
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
            >
              {t.navPackages}
            </button>
            <button
              onClick={() => onNavigatePage('home', 'faq')}
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
            >
              {t.navFaq}
            </button>
          </nav>

          {/* Zone 3: Global Language & Currency Switcher + Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Language Switcher */}
            <div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-[#131A26] border border-slate-800 text-xs"
              title={t.languageLabel}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 rounded font-mono-data text-[11px] transition-colors ${
                    currentLang === lang
                      ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Desktop Currency Switcher */}
            <div
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-[#131A26] border border-slate-800 text-xs"
              title={t.currencyLabel}
            >
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent text-white font-mono-data font-bold text-[11px] outline-none cursor-pointer"
                aria-label={t.currencyLabel}
              >
                {(['USD', 'EUR', 'AED', 'GBP', 'CNY', 'UGX'] as Currency[]).map((curr) => (
                  <option key={curr} value={curr} className="bg-[#111722] text-white">
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Portal & e-Sign Quick Button */}
            <button
              onClick={onOpenClientPortal}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/50 rounded transition-colors whitespace-nowrap shrink-0"
              title={t.navClientPortal}
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.navClientPortal}</span>
            </button>

            {/* Invoice & QR Receipt Quick Button */}
            {onOpenInvoiceReceipt && (
              <button
                onClick={onOpenInvoiceReceipt}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#131A26] hover:bg-[#182232] border border-[#D4AF37]/40 rounded transition-colors whitespace-nowrap shrink-0"
                title="Generate Invoice & QR Code Receipt"
              >
                <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>QR Receipt</span>
              </button>
            )}

            {/* Admin Panel Quick Button */}
            <button
              onClick={onOpenAdminPanel}
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#131A26] hover:bg-[#182232] border border-slate-800 hover:border-slate-700 rounded transition-colors whitespace-nowrap shrink-0"
              title={t.navAdminPanel}
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.navAdminPanel}</span>
            </button>

            {/* Primary CTA: Register */}
            <button
              onClick={onOpenRegistration}
              className="px-3.5 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors whitespace-nowrap shrink-0"
            >
              {t.navApplyCta}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded border border-slate-800 bg-[#131A26]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Guided 5-Step Process Flow Bar for Fast Section & Action Navigation */}
        <div className="hidden md:flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-slate-800/70 text-[11px] font-mono-data overflow-x-auto">
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <span className="text-[#D4AF37] font-bold uppercase">Process Flow:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={onOpenDocVerification}
              className="px-2 py-0.5 rounded bg-[#131A26] hover:bg-[#182232] text-slate-300 hover:text-[#D4AF37] border border-slate-800 transition-colors whitespace-nowrap"
            >
              1. 24–72 Hour Forensic Document Verification ({auditPriceFormatted})
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigatePage('home', 'scam-immunity')}
              className="px-2 py-0.5 rounded bg-[#131A26] hover:bg-[#182232] text-slate-300 hover:text-[#D4AF37] border border-slate-800 transition-colors whitespace-nowrap"
            >
              2. Scam Diagnostic
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigatePage('home', 'food-chain')}
              className="px-2 py-0.5 rounded bg-[#131A26] hover:bg-[#182232] text-slate-300 hover:text-[#D4AF37] border border-slate-800 transition-colors whitespace-nowrap"
            >
              3. Supply Chain Map
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigatePage('home', 'packages')}
              className="px-2 py-0.5 rounded bg-[#131A26] hover:bg-[#182232] text-slate-300 hover:text-[#D4AF37] border border-slate-800 transition-colors whitespace-nowrap"
            >
              4. Select Tier (KYC Included)
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            <button
              type="button"
              onClick={onOpenClientPortal}
              className="px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 transition-colors whitespace-nowrap"
            >
              5. e-Sign & QR Receipt
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 bg-[#0B0F17] pb-3 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('home', 'expedition');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-[#D4AF37]"
            >
              {t.navExpedition}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('about');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs font-semibold text-[#D4AF37]"
            >
              {t.navAboutUs}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('blog');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs font-semibold text-[#D4AF37]"
            >
              {t.navBlog}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('home', 'scam-immunity');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-[#D4AF37]"
            >
              {t.navScamImmunity}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('home', 'packages');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-[#D4AF37]"
            >
              {t.navPackages}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigatePage('home', 'faq');
              }}
              className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-[#D4AF37]"
            >
              {t.navFaq}
            </button>

            {/* Language Selector in Mobile */}
            <div className="px-3 py-2 flex flex-wrap items-center gap-2 border-t border-slate-800/80">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs text-slate-400">{t.languageLabel}:</span>
              {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-0.5 text-xs rounded ${
                    currentLang === lang
                      ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                      : 'text-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Currency Selector in Mobile */}
            <div className="px-3 py-2 flex flex-wrap items-center gap-2 border-t border-slate-800/80">
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs text-slate-400">{t.currencyLabel}:</span>
              {(['USD', 'EUR', 'AED', 'GBP', 'CNY', 'UGX'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-0.5 text-xs font-mono-data rounded ${
                    selectedCurrency === curr
                      ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                      : 'text-slate-300'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-[#D4AF37] bg-[#182232] border border-[#D4AF37]/50 rounded flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.navAdminPanel}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientPortal();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-600/60 rounded flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.navClientPortal}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDocVerification();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-white bg-[#182232] border border-[#D4AF37]/60 rounded flex items-center justify-center gap-2"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {t.navVerifyDoc} ({auditPriceFormatted})
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegistration();
                }}
                className="w-full text-center px-3 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] rounded"
              >
                {t.navApplyCta}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCardPayment();
                }}
                className="w-full text-center px-3 py-2 text-xs font-semibold text-white bg-[#131A26] border border-slate-700 rounded flex items-center justify-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.navPayCard}</span>
              </button>

              {onOpenInvoiceReceipt && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInvoiceReceipt();
                  }}
                  className="w-full text-center px-3 py-2 text-xs font-bold text-[#D4AF37] bg-[#131A26] border border-[#D4AF37]/50 rounded flex items-center justify-center gap-2"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Invoice & QR Code Receipt</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortalAuth();
                }}
                className="w-full text-center px-3 py-2 text-xs text-slate-300 bg-[#0B0F17] border border-slate-800 rounded flex items-center justify-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.navRoleSwitcher}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
