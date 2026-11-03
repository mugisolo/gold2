import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Coins, Check, Navigation, X } from 'lucide-react';
import { Language, Currency, GeoLocationProposal } from '../types';
import { translations } from '../data/translations';

interface GeoLocationProposalBannerProps {
  currentLang: Language;
  selectedCurrency: Currency;
  onApplySettings: (lang: Language, currency: Currency) => void;
}

const LANGUAGE_LABELS: Record<Language, string> = {
  EN: 'English (EN)',
  AR: 'العربية (AR)',
  ZH: '中文 (ZH)',
  FR: 'Français (FR)'
};

const REGIONAL_HUBS: Array<{
  id: string;
  label: string;
  countryCode: string;
  countryName: string;
  cityOrRegion: string;
  lang: Language;
  currency: Currency;
}> = [
  {
    id: 'dubai',
    label: 'Dubai / MENA (AR · AED)',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    cityOrRegion: 'Dubai DMCC / Abu Dhabi',
    lang: 'AR',
    currency: 'AED'
  },
  {
    id: 'geneva-paris',
    label: 'Geneva / Paris (FR · EUR)',
    countryCode: 'CH',
    countryName: 'Switzerland & France',
    cityOrRegion: 'Geneva / Paris Bullion Hub',
    lang: 'FR',
    currency: 'EUR'
  },
  {
    id: 'shanghai-hk',
    label: 'Shanghai / HK (ZH · CNY)',
    countryCode: 'CN',
    countryName: 'China / Hong Kong SAR',
    cityOrRegion: 'Shanghai / Hong Kong Gold Exchange',
    lang: 'ZH',
    currency: 'CNY'
  },
  {
    id: 'london',
    label: 'London LBMA (EN · GBP)',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    cityOrRegion: 'London Bullion Market (LBMA)',
    lang: 'EN',
    currency: 'GBP'
  },
  {
    id: 'kampala',
    label: 'Kampala / Entebbe (EN · UGX)',
    countryCode: 'UG',
    countryName: 'Republic of Uganda',
    cityOrRegion: 'Kampala & Entebbe Directorate',
    lang: 'EN',
    currency: 'UGX'
  },
  {
    id: 'newyork',
    label: 'New York / Global (EN · USD)',
    countryCode: 'US',
    countryName: 'United States / International',
    cityOrRegion: 'New York COMEX / Global',
    lang: 'EN',
    currency: 'USD'
  }
];

function detectFromClientTimezoneAndLocale(): GeoLocationProposal {
  const tz =
    (typeof Intl !== 'undefined' &&
      Intl.DateTimeFormat().resolvedOptions().timeZone) ||
    'UTC';
  const navLang =
    (typeof navigator !== 'undefined' && navigator.language) || 'en-US';
  const lowerTz = tz.toLowerCase();
  const lowerLang = navLang.toLowerCase();

  // Check East Africa / Uganda
  if (lowerTz.includes('kampala') || lowerTz.includes('nairobi') || lowerTz.includes('entebbe')) {
    return {
      countryCode: 'UG',
      countryName: 'Uganda / East Africa',
      cityOrRegion: tz,
      proposedLang: 'EN',
      proposedCurrency: 'UGX',
      detectionMethod: 'timezone_locale'
    };
  }

  // Check Middle East / Gulf
  if (
    lowerTz.includes('dubai') ||
    lowerTz.includes('riyadh') ||
    lowerTz.includes('qatar') ||
    lowerTz.includes('kuwait') ||
    lowerTz.includes('muscat') ||
    lowerTz.includes('bahrain') ||
    lowerTz.includes('cairo') ||
    lowerLang.startsWith('ar')
  ) {
    return {
      countryCode: 'AE',
      countryName: 'Middle East & Gulf (MENA)',
      cityOrRegion: tz,
      proposedLang: 'AR',
      proposedCurrency: 'AED',
      detectionMethod: 'timezone_locale'
    };
  }

  // Check Greater China / Singapore / East Asia
  if (
    lowerTz.includes('shanghai') ||
    lowerTz.includes('hong_kong') ||
    lowerTz.includes('chongqing') ||
    lowerTz.includes('taipei') ||
    lowerTz.includes('macau') ||
    lowerLang.startsWith('zh')
  ) {
    return {
      countryCode: 'CN',
      countryName: 'Greater China / Asia Hub',
      cityOrRegion: tz,
      proposedLang: 'ZH',
      proposedCurrency: 'CNY',
      detectionMethod: 'timezone_locale'
    };
  }

  // Check UK
  if (lowerTz.includes('london') || lowerLang.includes('en-gb')) {
    return {
      countryCode: 'GB',
      countryName: 'United Kingdom',
      cityOrRegion: tz,
      proposedLang: 'EN',
      proposedCurrency: 'GBP',
      detectionMethod: 'timezone_locale'
    };
  }

  // Check Francophone Europe & Africa
  if (
    lowerTz.includes('paris') ||
    lowerTz.includes('brussels') ||
    lowerTz.includes('zurich') ||
    lowerTz.includes('geneva') ||
    lowerTz.includes('kinshasa') ||
    lowerTz.includes('abidjan') ||
    lowerTz.includes('dakar') ||
    lowerLang.startsWith('fr')
  ) {
    return {
      countryCode: 'FR',
      countryName: 'Francophone / European Hub',
      cityOrRegion: tz,
      proposedLang: 'FR',
      proposedCurrency: 'EUR',
      detectionMethod: 'timezone_locale'
    };
  }

  // Check other European timezones
  if (lowerTz.startsWith('europe/')) {
    return {
      countryCode: 'EU',
      countryName: 'European Union',
      cityOrRegion: tz,
      proposedLang: 'EN',
      proposedCurrency: 'EUR',
      detectionMethod: 'timezone_locale'
    };
  }

  return {
    countryCode: 'UG',
    countryName: 'Uganda / East Africa',
    cityOrRegion: 'Africa/Kampala',
    proposedLang: 'EN',
    proposedCurrency: 'UGX',
    detectionMethod: 'timezone_locale'
  };
}

function mapCoordinatesToProposal(lat: number, lon: number): GeoLocationProposal {
  // East Africa / Uganda bounding box
  if (lat >= -5 && lat <= 6 && lon >= 28 && lon <= 42) {
    return {
      countryCode: 'UG',
      countryName: 'Republic of Uganda (GPS Verified)',
      cityOrRegion: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · Kampala/Entebbe`,
      proposedLang: 'EN',
      proposedCurrency: 'UGX',
      detectionMethod: 'gps_coordinates'
    };
  }
  // Middle East / Arabian Peninsula
  if (lat >= 12 && lat <= 36 && lon >= 34 && lon <= 60) {
    return {
      countryCode: 'AE',
      countryName: 'UAE / Gulf Region (GPS Verified)',
      cityOrRegion: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · MENA Hub`,
      proposedLang: 'AR',
      proposedCurrency: 'AED',
      detectionMethod: 'gps_coordinates'
    };
  }
  // East Asia / China
  if (lat >= 18 && lat <= 50 && lon >= 95 && lon <= 135) {
    return {
      countryCode: 'CN',
      countryName: 'Greater China (GPS Verified)',
      cityOrRegion: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · Asia Hub`,
      proposedLang: 'ZH',
      proposedCurrency: 'CNY',
      detectionMethod: 'gps_coordinates'
    };
  }
  // UK & Ireland
  if (lat >= 49.8 && lat <= 60 && lon >= -10 && lon <= 2) {
    return {
      countryCode: 'GB',
      countryName: 'United Kingdom (GPS Verified)',
      cityOrRegion: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · London LBMA`,
      proposedLang: 'EN',
      proposedCurrency: 'GBP',
      detectionMethod: 'gps_coordinates'
    };
  }
  // Western / Central Europe (France, Switzerland, Belgium, Germany, etc.)
  if (lat >= 36 && lat <= 55 && lon >= -5 && lon <= 25) {
    const isFrancophoneZone = lon >= -5 && lon <= 8.5 && lat >= 42 && lat <= 51;
    return {
      countryCode: isFrancophoneZone ? 'FR' : 'EU',
      countryName: isFrancophoneZone ? 'France / Switzerland (GPS Verified)' : 'European Union (GPS Verified)',
      cityOrRegion: `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · Europe`,
      proposedLang: isFrancophoneZone ? 'FR' : 'EN',
      proposedCurrency: 'EUR',
      detectionMethod: 'gps_coordinates'
    };
  }

  return {
    countryCode: 'US',
    countryName: 'Americas / Global (GPS Verified)',
    cityOrRegion: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
    proposedLang: 'EN',
    proposedCurrency: 'USD',
    detectionMethod: 'gps_coordinates'
  };
}

export const GeoLocationProposalBanner: React.FC<GeoLocationProposalBannerProps> = ({
  currentLang,
  selectedCurrency,
  onApplySettings
}) => {
  const t = translations[currentLang];
  const [isVisible, setIsVisible] = useState(true);
  const [proposal, setProposal] = useState<GeoLocationProposal>(() =>
    detectFromClientTimezoneAndLocale()
  );
  const [draftLang, setDraftLang] = useState<Language>(proposal.proposedLang);
  const [draftCurrency, setDraftCurrency] = useState<Currency>(proposal.proposedCurrency);
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [appliedConfirmation, setAppliedConfirmation] = useState(false);

  // On mount, query server /api/geo/detect and combine with client timezone/locale
  useEffect(() => {
    const clientProposal = detectFromClientTimezoneAndLocale();
    fetch('/api/geo/detect')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          const useServer =
            data.countryCode &&
            data.countryCode !== 'INTL' &&
            data.countryCode !== 'ZZ' &&
            data.countryCode !== 'US';
          const merged: GeoLocationProposal = useServer
            ? {
                countryCode: data.countryCode,
                countryName: data.countryName,
                cityOrRegion: data.cityOrRegion || clientProposal.cityOrRegion,
                proposedLang: data.proposedLang,
                proposedCurrency: data.proposedCurrency,
                detectionMethod: 'ip_headers'
              }
            : clientProposal;

          setProposal(merged);
          setDraftLang(merged.proposedLang);
          setDraftCurrency(merged.proposedCurrency);
        }
      })
      .catch(() => {
        setProposal(clientProposal);
        setDraftLang(clientProposal.proposedLang);
        setDraftCurrency(clientProposal.proposedCurrency);
      });
  }, []);

  const handleDetectExactGps = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    setIsLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gpsProp = mapCoordinatesToProposal(
          pos.coords.latitude,
          pos.coords.longitude
        );
        setProposal(gpsProp);
        setDraftLang(gpsProp.proposedLang);
        setDraftCurrency(gpsProp.proposedCurrency);
        onApplySettings(gpsProp.proposedLang, gpsProp.proposedCurrency);
        setIsLocatingGps(false);
        setAppliedConfirmation(true);
        setTimeout(() => setAppliedConfirmation(false), 3000);
      },
      () => {
        setIsLocatingGps(false);
      },
      { timeout: 6000 }
    );
  };

  const handleSelectRegionalHub = (hub: (typeof REGIONAL_HUBS)[number]) => {
    const nextProposal: GeoLocationProposal = {
      countryCode: hub.countryCode,
      countryName: hub.countryName,
      cityOrRegion: hub.cityOrRegion,
      proposedLang: hub.lang,
      proposedCurrency: hub.currency,
      detectionMethod: 'manual_preset'
    };
    setProposal(nextProposal);
    setDraftLang(hub.lang);
    setDraftCurrency(hub.currency);
    onApplySettings(hub.lang, hub.currency);
    setAppliedConfirmation(true);
    setTimeout(() => setAppliedConfirmation(false), 2500);
  };

  const handleApplyProposed = () => {
    onApplySettings(draftLang, draftCurrency);
    setAppliedConfirmation(true);
    setTimeout(() => setAppliedConfirmation(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#0B0F17] border-t border-[#D4AF37]/30 text-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Geolocation Detection Summary & Proposed Defaults */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-mono-data font-bold text-[#D4AF37]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{t.geoDetectedBadge}:</span>
            </span>
            <span className="font-semibold text-white">
              {proposal.countryName}
              {proposal.cityOrRegion ? ` (${proposal.cityOrRegion})` : ''}
            </span>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <span className="text-slate-300">{t.geoProposalText}</span>
          </div>

          {/* Right: Proposed Language & Currency Selectors + Apply / GPS Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Proposed Language Selector */}
            <div className="inline-flex items-center gap-1.5 bg-[#111722] border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-slate-400 text-[11px]">{t.geoProposedLangLabel}:</span>
              <select
                value={draftLang}
                onChange={(e) => {
                  const newLang = e.target.value as Language;
                  setDraftLang(newLang);
                  onApplySettings(newLang, draftCurrency);
                }}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
                aria-label="Proposed Language"
              >
                {(['EN', 'AR', 'ZH', 'FR'] as Language[]).map((lang) => (
                  <option key={lang} value={lang} className="bg-[#111722] text-white">
                    {LANGUAGE_LABELS[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Proposed Currency Selector */}
            <div className="inline-flex items-center gap-1.5 bg-[#111722] border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-slate-400 text-[11px]">{t.geoProposedCurrLabel}:</span>
              <select
                value={draftCurrency}
                onChange={(e) => {
                  const newCurr = e.target.value as Currency;
                  setDraftCurrency(newCurr);
                  onApplySettings(draftLang, newCurr);
                }}
                className="bg-transparent text-[#D4AF37] font-mono-data font-bold outline-none cursor-pointer text-xs"
                aria-label="Proposed Currency"
              >
                {(['USD', 'EUR', 'AED', 'GBP', 'CNY', 'UGX'] as Currency[]).map((curr) => (
                  <option key={curr} value={curr} className="bg-[#111722] text-white">
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply Proposed Button */}
            <button
              type="button"
              onClick={handleApplyProposed}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5" />
              <span>
                {appliedConfirmation
                  ? `${draftLang} · ${draftCurrency} Active`
                  : `${t.geoApplyBtn} (${draftLang} · ${draftCurrency})`}
              </span>
            </button>

            {/* Browser GPS Detection Button */}
            <button
              type="button"
              onClick={handleDetectExactGps}
              disabled={isLocatingGps}
              className="px-2.5 py-1.5 rounded-lg bg-[#111722] hover:bg-[#182232] border border-slate-700 text-slate-300 hover:text-white text-xs inline-flex items-center gap-1 transition-colors whitespace-nowrap"
              title="Use Browser Geolocation GPS to auto-configure Language & Currency"
            >
              <Navigation className="w-3 h-3 text-[#D4AF37]" />
              <span>{isLocatingGps ? t.geoGpsLocating : t.geoUseGpsBtn}</span>
            </button>

            {/* Dismiss Banner */}
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title={t.geoDismissBtn}
              aria-label="Dismiss geolocation banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Regional Hub Presets Strip for 1-Click Location / Language / Currency Switching */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-0.5">
          <span className="text-[11px] font-mono-data text-slate-400 whitespace-nowrap shrink-0">
            {t.geoSimHubsLabel}
          </span>
          {REGIONAL_HUBS.map((hub) => {
            const isCurrent =
              currentLang === hub.lang && selectedCurrency === hub.currency;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => handleSelectRegionalHub(hub)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono-data transition-colors whitespace-nowrap shrink-0 border ${
                  isCurrent
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FEF3C7] font-bold'
                    : 'bg-[#111722] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {hub.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
