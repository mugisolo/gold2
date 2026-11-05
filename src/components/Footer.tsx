import React from 'react';
import { Globe, MapPin, Coins, Lock } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../data/translations';
import { PWAInstallButton } from './PWAOfflineManager';

interface FooterProps {
  currentLang: Language;
  selectedCurrency?: Currency;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange?: (currency: Currency) => void;
  onNavigate: (path: string) => void;
  onOpenStaffAuth?: () => void;
  onOpenAdminAuth?: () => void;
  onOpenInvoiceReceipt?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  selectedCurrency = 'USD',
  onLanguageChange,
  onCurrencyChange,
  onNavigate,
  onOpenStaffAuth,
  onOpenAdminAuth,
  onOpenInvoiceReceipt,
}) => {
  const t = translations[currentLang];

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer
      role="contentinfo"
      className="bg-[#080B11] border-t border-slate-800/90 text-slate-400 text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-6 border-b border-slate-800/80">
          {/* Col 1: Brand & Independence Statement */}
          <div className="lg:col-span-2 space-y-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-3 font-cinzel font-bold text-base tracking-wider text-white hover:text-[#FEF3C7] transition-colors group"
            >
              <img
                src="/assets/aistudio/uge-logo-emblem-dark.png"
                alt="Uganda Gold Expedition Logo"
                className="w-10 h-10 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <div>
                <div>
                  UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
                </div>
                <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#D4AF37]/90 uppercase mt-0.5">
                  Due Diligence &amp; Field Verification
                </div>
              </div>
            </a>
            <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-md">
              Independent due diligence and field verification. We do not buy, sell, or broker gold.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Structured 7-day supply-chain expeditions and 24–72-hour document verification across
              Uganda’s mineral cadastre, licensed refineries, and mining corridors.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-300 pt-1">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">
                  Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Amber House Secretariat, Kampala · <span className="font-mono-data text-[#D4AF37]">URA TIN 1019482710</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Programmes */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Services &amp; Programmes
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/offer-verification"
                  onClick={(e) => handleLink(e, '/offer-verification')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  24–72-Hour Offer Verification
                </a>
              </li>
              <li>
                <a
                  href="/expeditions"
                  onClick={(e) => handleLink(e, '/expeditions')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Expeditions Overview
                </a>
              </li>
              <li>
                <a
                  href="/expeditions/professional-traders"
                  onClick={(e) => handleLink(e, '/expeditions/professional-traders')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Professional Traders Expedition
                </a>
              </li>
              <li>
                <a
                  href="/expeditions/academic-research"
                  onClick={(e) => handleLink(e, '/expeditions/academic-research')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Academic &amp; Research Expedition
                </a>
              </li>
              <li>
                <a
                  href="/expeditions/institutional-vip"
                  onClick={(e) => handleLink(e, '/expeditions/institutional-vip')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Institutional &amp; VIP Delegations
                </a>
              </li>
              <li>
                <a
                  href="/expeditions/itinerary"
                  onClick={(e) => handleLink(e, '/expeditions/itinerary')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  7-Day Field Itinerary
                </a>
              </li>
              <li>
                <a
                  href="/expeditions/dates-packages"
                  onClick={(e) => handleLink(e, '/expeditions/dates-packages')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Dates, Packages &amp; Inclusions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Risk, Compliance & Research */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Risk &amp; Intelligence
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/risk-compliance"
                  onClick={(e) => handleLink(e, '/risk-compliance')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Risk &amp; Compliance Hub
                </a>
              </li>
              <li>
                <a
                  href="/risk-compliance/supply-chain"
                  onClick={(e) => handleLink(e, '/risk-compliance/supply-chain')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Supply-Chain Stages &amp; Map
                </a>
              </li>
              <li>
                <a
                  href="/risk-compliance/scam-check"
                  onClick={(e) => handleLink(e, '/risk-compliance/scam-check')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Scam-Risk Assessment Tool
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  onClick={(e) => handleLink(e, '/insights')}
                  className="hover:text-[#D4AF37] transition-colors font-semibold text-[#D4AF37]"
                >
                  Insights &amp; Field Briefings
                </a>
              </li>
              <li>
                <a
                  href="/insights/gold-discount-advance-fee-traps"
                  onClick={(e) => handleLink(e, '/insights/gold-discount-advance-fee-traps')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Deep Discount &amp; Advance-Fee Risk
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Mission, Independence &amp; Team
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleLink(e, '/faq')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance, Contact & Portals */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Governance &amp; Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact &amp; Executive Briefings
                </a>
              </li>
              <li>
                <a
                  href="/apply"
                  onClick={(e) => handleLink(e, '/apply')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Expedition Application
                </a>
              </li>
              <li>
                <a
                  href="/portal"
                  onClick={(e) => handleLink(e, '/portal')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Client Portal
                </a>
              </li>
              <li>
                <a
                  href="/charter"
                  onClick={(e) => handleLink(e, '/charter')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Legal &amp; Non-Transaction Charter
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLink(e, '/privacy')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Privacy &amp; Document Handling
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, '/terms')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Terms of Service &amp; Vetting Policy
                </a>
              </li>
              {onOpenInvoiceReceipt && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenInvoiceReceipt}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    Receipt &amp; Invoice Lookup
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Middle Utility Bar: Language Selection, Currency Selection, and Authenticated Operations Access */}
        <div className="py-4 border-b border-slate-800/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.languageLabel}:</span>
              </span>
              <div className="flex items-center gap-1 font-mono-data">
                {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    aria-pressed={currentLang === lang}
                    className={`px-2 py-1 rounded transition-colors ${
                      currentLang === lang
                        ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                        : 'text-slate-400 hover:text-white bg-[#111722]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Display (USD Only) */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.currencyLabel}:</span>
              </span>
              <span className="px-2 py-1 rounded bg-[#D4AF37] text-[#0B0F17] font-mono-data font-bold">
                USD ($)
              </span>
            </div>
          </div>

          {/* Offline Field App Install + Discreet Operational Access for Staff & Administration */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <PWAInstallButton compact />
            {onOpenStaffAuth && (
              <button
                type="button"
                onClick={onOpenStaffAuth}
                className="hover:text-slate-300 transition-colors flex items-center gap-1 py-1"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Sign-In</span>
              </button>
            )}
            {onOpenAdminAuth && (
              <button
                type="button"
                onClick={onOpenAdminAuth}
                className="hover:text-slate-300 transition-colors flex items-center gap-1 py-1"
              >
                <Lock className="w-3 h-3" />
                <span>Administration</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-3xl leading-relaxed">
            Uganda Gold Expedition is an independent due-diligence and field-research organization.
            We do not act as gold dealers, brokers, or commercial intermediaries, and we never take
            custody of precious minerals or transaction funds.
          </p>
          <div className="shrink-0 flex items-center gap-2.5 text-slate-400">
            <img
              src="/favicon.png"
              alt="Uganda Gold Expedition Favicon"
              className="w-6 h-6 object-contain shrink-0"
            />
            <span>© {new Date().getFullYear()} Uganda Gold Expedition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
