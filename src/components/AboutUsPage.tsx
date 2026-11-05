import React from 'react';
import {
  Shield,
  MapPin,
  Settings,
  CheckCircle2,
  FileSearch,
  ExternalLink,
  ArrowRight,
  XCircle
} from 'lucide-react';
import { AboutContent, BoardMember, PhotoItem, Language, Currency } from '../types';
import {
  translations,
  getLocalizedAboutContent,
  getLocalizedBoardMembers
} from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface AboutUsPageProps {
  currentLang?: Language;
  selectedCurrency?: Currency;
  aboutContent: AboutContent;
  boardMembers: BoardMember[];
  photos: PhotoItem[];
  isFullPage?: boolean;
  showAdminControls?: boolean;
  onBackToHome?: () => void;
  onOpenRegistration: () => void;
  onOpenDocVerification: () => void;
  onOpenAdminPanel: () => void;
  onNavigateToBlog: () => void;
  onNavigate?: (path: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  currentLang = 'EN',
  selectedCurrency = 'USD',
  aboutContent,
  boardMembers,
  photos,
  isFullPage = true,
  showAdminControls = false,
  onOpenRegistration,
  onOpenDocVerification,
  onOpenAdminPanel,
  onNavigate
}) => {
  const t = translations[currentLang];
  const localizedAbout = getLocalizedAboutContent(currentLang, aboutContent);
  const localizedBoard = getLocalizedBoardMembers(currentLang, boardMembers);
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');

  return (
    <div id="about-us" className="min-h-screen bg-[#0B0F17] text-slate-300 pb-24">
      {/* Independence Banner */}
      <div className="bg-[#080B11] border-b border-slate-800/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p className="font-medium text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            Independent due diligence and field verification. We do not buy, sell, or broker gold.
          </p>
          {showAdminControls && (
            <button
              type="button"
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Edit About & Board in Admin Panel</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 1: Mission & Why the Organization Exists */}
      <section className="py-14 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                <span>Mission & Independence</span>
                <span aria-hidden="true">·</span>
                <span>Est. {localizedAbout.establishedYear}</span>
                <span aria-hidden="true">·</span>
                <span>Kampala & Entebbe</span>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white leading-[1.12] tracking-tight">
                Independent due diligence, conducted in the field
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure">
                {localizedAbout.subheadline}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed pt-2 reading-measure">
                {localizedAbout.overviewParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Single Primary Conversion Action + Secondary */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => (onNavigate ? onNavigate('/offer-verification') : onOpenDocVerification())}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-[#D4AF37] hover:bg-[#c5a030] rounded-lg transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>Verify an Offer ({auditPrice})</span>
                </button>
                <button
                  type="button"
                  onClick={() => (onNavigate ? onNavigate('/expeditions') : onOpenRegistration())}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore 7-Day Expeditions</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Strict Non-Transaction & Independence Policy Card */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    Strict Non-Transaction Policy
                  </div>
                  <h2 className="font-serif-display text-xl font-bold text-white mt-0.5">
                    Why Independence Matters
                  </h2>
                </div>
                <Shield className="w-6 h-6 text-[#D4AF37] shrink-0" />
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                &ldquo;{localizedAbout.missionStatement}&rdquo;
              </p>

              <div className="space-y-4 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <div className="text-slate-400 font-mono uppercase tracking-wider mb-1">
                    Statutory &amp; Regulatory Scope
                  </div>
                  <p className="text-slate-300 leading-relaxed">{localizedAbout.statutoryMandate}</p>
                </div>

                <div>
                  <div className="text-slate-400 font-mono uppercase tracking-wider mb-1">
                    Field Operations Base
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{localizedAbout.headquarters}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who the Service Is For & Who It Is Not For + Field Capability */}
      <section className="py-16 surface-ivory border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A7418] block mb-1">
                Mandate &amp; Field Scope
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                Independence Charter &amp; Operational Boundaries
              </h2>
            </div>
            <img
              src="/assets/aistudio/uganda-gold-expedition-logo-for-light-backgrounds_79479d7f.png"
              alt="Uganda Gold Expedition emblem on light background"
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold block mb-2">
                Who This Service Is For
              </span>
              <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-4">
                Legitimate Market Participants
              </h3>
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Bullion traders, commodity desks, and private principals evaluating active gold offers or long-term supply agreements.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Institutional investors, sovereign funds, and family offices requiring discrete field due diligence before capital allocation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Academic researchers, ESG auditors, and policy specialists studying mineral traceability and regulatory frameworks.
                  </span>
                </li>
              </ul>
            </div>

            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7">
              <span className="text-xs font-mono uppercase tracking-wider text-red-700 font-semibold block mb-2">
                Who This Service Is Not For
              </span>
              <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-4">
                Excluded Mandates
              </h3>
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    Anyone seeking a broker, commission agent, or intermediary to source or sell physical gold parcels.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    Counterparties attempting to bypass Uganda Revenue Authority (URA) customs declarations, DGSM licensing, or ICGLR origin tracking.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    Applicants who decline statutory OFAC, UN, UK HMT, EU sanctions, or PEP screening.
                  </span>
                </li>
              </ul>
            </div>

            <div className="surface-ivory-card rounded-2xl p-6 sm:p-7">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418] font-semibold block mb-2">
                Field Access & Operational Capability
              </span>
              <h3 className="font-serif-display text-xl font-bold text-slate-900 mb-4">
                On-the-Ground Execution
              </h3>
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                  <span>
                    <strong>Registry Access:</strong> Direct in-person cadastre and license verification at DGSM headquarters in Entebbe.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                  <span>
                    <strong>Metallurgical Supervision:</strong> Witnessed induction melting and ISO-11426 cupellation fire assay at accredited refineries.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7418] shrink-0 mt-0.5" />
                  <span>
                    <strong>Secure Field Logistics:</strong> Escorted 4x4 and B6 armored convoy capability across Mubende, Kassanda, and Busia corridors.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Governance & Leadership */}
      <section className="py-16 lg:py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              {t.aboutBoardBadge1} · {t.aboutBoardBadge2}
            </div>
            <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-white">
              Governance & Leadership
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our leadership combines metallurgical verification, mineral trade law, and secure field operations across Uganda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {localizedBoard.map((member, idx) => (
              <article
                key={member.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-56 bg-[#0B0F17] overflow-hidden border-b border-slate-800">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={`${member.name} — ${member.role}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-[#0B0F17]/40 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                        0{idx + 1} · {member.designation}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-[#0B0F17]/90 border border-[#D4AF37]/40 flex items-center justify-center font-serif-display text-xs font-bold text-[#D4AF37]">
                        {getInitials(member.name)}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-serif-display text-xl font-bold text-white leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#D4AF37] mt-0.5">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Core Focus
                      </div>
                      <div className="text-xs font-medium text-slate-200 mt-0.5 leading-snug">
                        {member.specialty}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{member.bio}</p>

                    {member.credentials && member.credentials.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Areas of Responsibility
                        </div>
                        <ul className="space-y-1.5">
                          {member.credentials.map((cred, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{cred}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#0B0F17]/60 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Kampala & Entebbe Directorate
                  </span>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-amber-200 font-medium transition-colors"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Annotated Field Photography */}
      {photos.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Field Documentation · {photos.length} Photographs
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Annotated Field & Laboratory Photography
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Documented inspections across Entebbe assay laboratories, Mubende artisanal sites, and Busia processing operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <figure
                  key={photo.id}
                  className="rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-[#0B0F17] overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="text-[#D4AF37]">{photo.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{photo.dateAdded}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{photo.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
