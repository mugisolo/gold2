import React from 'react';
import { Shield, Globe, Lock, MapPin, AlertCircle, KeyRound, Coins, QrCode } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';
import { GeoLocationProposalBanner } from './GeoLocationProposalBanner';

interface FooterProps {
  currentLang: Language;
  selectedCurrency?: Currency;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange?: (currency: Currency) => void;
  onApplyGeoSettings?: (lang: Language, currency: Currency) => void;
  onNavigatePage: (page: 'home' | 'about' | 'blog', sectionId?: string) => void;
  onOpenCharter: () => void;
  onOpenRegistration: () => void;
  onOpenPortalAuth: () => void;
  onOpenAdminPanel: () => void;
  onOpenInvoiceReceipt?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  selectedCurrency = 'USD',
  onLanguageChange,
  onCurrencyChange,
  onApplyGeoSettings,
  onNavigatePage,
  onOpenRegistration,
  onOpenPortalAuth,
  onOpenAdminPanel,
  onOpenInvoiceReceipt
}) => {
  const t = translations[currentLang];
  const kycPrice = formatCurrencyPrice(1000, selectedCurrency);
  const [customLogoUrl, setCustomLogoUrl] = React.useState<string>(() => {
    try {
      return localStorage.getItem('uge_custom_logo_url') || '';
    } catch {
      return '';
    }
  });

  React.useEffect(() => {
    const handleLogoSync = () => {
      try {
        setCustomLogoUrl(localStorage.getItem('uge_custom_logo_url') || '');
      } catch {
        // ignore
      }
    };
    window.addEventListener('uge-logo-updated', handleLogoSync);
    return () => window.removeEventListener('uge-logo-updated', handleLogoSync);
  }, []);

  return (
    <footer className="bg-[#080B11] border-t border-slate-800 text-slate-400 text-xs">
      {/* Geolocation Detection & Proposed Default Language + Currency Banner at the Footer */}
      <GeoLocationProposalBanner
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        onApplySettings={(lang, curr) => {
          if (onApplyGeoSettings) {
            onApplyGeoSettings(lang, curr);
          } else {
            onLanguageChange(lang);
            onCurrencyChange?.(curr);
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Brand & Mandate */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-cinzel font-bold text-base tracking-wider">
              <div className="w-9 h-9 rounded-lg border border-[#D4AF37]/60 bg-[#111722] flex items-center justify-center text-[#D4AF37] overflow-hidden shrink-0 shadow-md shadow-[#D4AF37]/10">
                {customLogoUrl ? (
                  <img
                    src={customLogoUrl}
                    alt="Uganda Gold Expedition Logo"
                    className="w-full h-full object-contain p-0.5"
                  />
                ) : (
                  <svg
                    viewBox="0 0 64 64"
                    className="w-7 h-7"
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
              </div>
              <span>
                UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed text-justify">
              {t.footerTagline}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-mono-data">
              <Lock className="w-3.5 h-3.5" />
              <span>{t.footerStrictMandate}</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-2">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              {t.footerNavTitle}
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigatePage('about')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navAboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('blog')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navBlog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('home', 'expedition')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navExpedition}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('home', 'scam-immunity')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navScamImmunity}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('home', 'packages')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navPackages}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('home', 'faq')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  {t.navFaq}
                </button>
              </li>
            </ul>
          </div>

          {/* Board of Directors Overview */}
          <div className="space-y-2">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              {t.footerBoardTitle}
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Mugisa Solomon Byakutaaga</strong>
                <span className="block text-[11px] text-slate-500">Lead Forensics Expert</span>
              </li>
              <li>
                <strong className="text-slate-200">Kamanzai Kaijuka</strong>
                <span className="block text-[11px] text-slate-500">Minerals Trade Expert</span>
              </li>
              <li>
                <strong className="text-slate-200">Ronnie Mugarura</strong>
                <span className="block text-[11px] text-slate-500">
                  Operations, Logistics and Strategy
                </span>
              </li>
            </ul>
          </div>

          {/* Operational Facilities & Portal Access */}
          <div className="space-y-3">
            <div className="text-xs font-mono-data uppercase tracking-wider text-white font-bold mb-3">
              {t.footerSecretariatTitle}
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Amber House, Kampala & DGSM Mineral Headquarters, Entebbe, Republic of Uganda
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={onOpenRegistration}
                className="w-full py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
              >
                {t.navApplyCta} ({kycPrice} KYC)
              </button>

              <button
                onClick={onOpenAdminPanel}
                className="w-full py-2 text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#111722] hover:bg-[#182232] border border-[#D4AF37]/40 rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.navAdminPanel}</span>
              </button>

              <button
                onClick={onOpenPortalAuth}
                className="w-full py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#111722] hover:bg-[#182232] border border-slate-700 rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.navRoleSwitcher}</span>
              </button>

              {onOpenInvoiceReceipt && (
                <button
                  onClick={onOpenInvoiceReceipt}
                  className="w-full py-2 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-600/50 rounded transition-colors flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Invoice & QR Code Receipt</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KYC Mandatory Notice & Statutory Disclaimer */}
        <div className="p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800/80 mb-5 text-[11px] text-slate-400 leading-snug space-y-1.5">
          <div className="flex items-start gap-2 text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">{t.footerKycDisclosureTitle} </strong>
              {kycPrice} (USD $1,000) {t.footerKycDisclosureText}
            </span>
          </div>

          <p>{t.footerDisclaimer}</p>
        </div>

        {/* Bottom Bar: Copyright & Language / Currency Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/60 text-[11px]">
          <div>{t.footerRights}</div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Multi-language Switcher in Footer */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.languageLabel}:</span>
              </span>
              <div className="flex items-center gap-1.5 font-mono-data">
                {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                  <button
                    key={lang}
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
            </div>

            {/* Currency Switcher in Footer */}
            {onCurrencyChange && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.currencyLabel}:</span>
                </span>
                <div className="flex items-center gap-1 font-mono-data">
                  {(['USD', 'EUR', 'AED', 'GBP', 'CNY', 'UGX'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => onCurrencyChange(curr)}
                      className={`px-1.5 py-0.5 rounded transition-colors ${
                        selectedCurrency === curr
                          ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
