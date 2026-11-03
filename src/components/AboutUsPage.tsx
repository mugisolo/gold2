import React from 'react';
import { Shield, MapPin, ArrowLeft, Settings, CheckCircle2, FileSearch, ExternalLink } from 'lucide-react';
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
  onBackToHome?: () => void;
  onOpenRegistration: () => void;
  onOpenDocVerification: () => void;
  onOpenAdminPanel: () => void;
  onNavigateToBlog: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  currentLang = 'EN',
  selectedCurrency = 'USD',
  aboutContent,
  boardMembers,
  photos,
  isFullPage = false,
  onBackToHome,
  onOpenRegistration,
  onOpenDocVerification,
  onOpenAdminPanel,
  onNavigateToBlog
}) => {
  const t = translations[currentLang];
  const localizedAbout = getLocalizedAboutContent(currentLang, aboutContent);
  const localizedBoard = getLocalizedBoardMembers(currentLang, boardMembers);
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  };

  return (
    <section
      id="about-us"
      className={`${
        isFullPage ? 'pt-28 pb-12 min-h-screen' : 'py-10 sm:py-12 border-t border-slate-800/80'
      } bg-[#0B0F17] text-slate-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Breadcrumb / Navigation Bar when viewing as full page */}
        {isFullPage && onBackToHome && (
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#FEF3C7] transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.aboutBackToHome}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToBlog}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 rounded transition-colors whitespace-nowrap"
              >
                {t.aboutReadBlogBtn}
              </button>
              <button
                onClick={onOpenAdminPanel}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 rounded transition-colors whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.aboutEditAdminBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 1: Institutional Mandate & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
              <span>{t.aboutBadge1}</span>
              <span aria-hidden="true">·</span>
              <span>Est. {localizedAbout.establishedYear}</span>
              <span aria-hidden="true">·</span>
              <span>{t.aboutBadge2}</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {localizedAbout.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {localizedAbout.subheadline}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed pt-2">
              {localizedAbout.overviewParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRegistration}
                className="px-5 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors whitespace-nowrap"
              >
                {t.aboutRegisterBtn}
              </button>
              <button
                onClick={onOpenDocVerification}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#111722] hover:bg-[#182232] border border-[#D4AF37]/40 rounded transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <FileSearch className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {t.aboutAuditBtn} ({auditPrice})
                </span>
              </button>
              {!isFullPage && (
                <button
                  onClick={onOpenAdminPanel}
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 rounded transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.aboutEditAdminBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Institutional Charter Box */}
          <div className="lg:col-span-5 bg-[#111722] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono-data text-[#D4AF37]">{t.aboutCharterBadge}</div>
                <h2 className="font-cinzel text-lg font-bold text-white mt-0.5">
                  {t.aboutCharterTitle}
                </h2>
              </div>
              <Shield className="w-6 h-6 text-[#D4AF37] shrink-0" />
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              &ldquo;{localizedAbout.missionStatement}&rdquo;
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <div className="text-slate-500 font-mono-data mb-1">{t.aboutStatutoryLabel}</div>
                <p className="text-slate-300 leading-relaxed">{localizedAbout.statutoryMandate}</p>
              </div>

              <div>
                <div className="text-slate-500 font-mono-data mb-1">{t.aboutSecretariatLabel}</div>
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{localizedAbout.headquarters}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800/80">
                <div className="font-mono-data text-lg font-bold text-white">$140M+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.aboutKpi1Label}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800/80">
                <div className="font-mono-data text-lg font-bold text-[#D4AF37]">100%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.aboutKpi2Label}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800/80">
                <div className="font-mono-data text-lg font-bold text-white">24h</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.aboutKpi3Label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Board of Directors & Executive Leadership */}
        <div className="space-y-10 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
                <span>{t.aboutBoardBadge1}</span>
                <span aria-hidden="true">·</span>
                <span>{t.aboutBoardBadge2}</span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {t.aboutBoardTitle}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.aboutBoardSubtitle}
              </p>
            </div>

            <button
              onClick={onOpenAdminPanel}
              className="self-start md:self-auto px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 hover:border-slate-700 rounded transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.aboutBoardEditBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {localizedBoard.map((member, idx) => (
              <article
                key={member.id}
                className="rounded-xl bg-[#111722] border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Director Visual Header */}
                  <div className="relative h-56 bg-[#0B0F17] overflow-hidden border-b border-slate-800">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={`${member.name} — ${member.role}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-75"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-[#0B0F17]/50 to-transparent" />

                    {/* Editorial Index & Monogram */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-mono-data text-[#D4AF37] font-semibold">
                        0{idx + 1} · {t.aboutBoardBadge2}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#0B0F17]/90 border border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-sm font-bold text-[#D4AF37]">
                        {getInitials(member.name)}
                      </div>
                    </div>

                    {/* Name & Primary Title Overlay */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="font-cinzel text-xl font-bold text-white leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#D4AF37] mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Director Biography & Credentials */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-mono-data text-slate-500">
                        {t.aboutCoreMandate}
                      </div>
                      <div className="text-xs font-medium text-slate-200 mt-0.5 leading-snug">
                        {member.specialty}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {member.bio}
                    </p>

                    {member.credentials && member.credentials.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        <div className="text-[11px] font-mono-data text-slate-500">
                          {t.aboutKeyCredentials}
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

                {/* Footer bar */}
                <div className="px-6 py-3.5 bg-[#0B0F17]/60 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono-data text-[11px]">
                    {t.aboutDirectorateFooter}
                  </span>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-[#FEF3C7] font-medium transition-colors"
                    >
                      <span>{t.aboutExecProfile}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section 3: Field & Vault Photo Gallery (Managed via Admin Panel) */}
        {photos.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
                  <span>{t.aboutGalleryBadge}</span>
                  <span aria-hidden="true">·</span>
                  <span>{photos.length}</span>
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white">
                  {t.aboutGalleryTitle}
                </h3>
              </div>

              <button
                onClick={onOpenAdminPanel}
                className="self-start sm:self-auto px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 rounded transition-colors whitespace-nowrap"
              >
                {t.aboutGalleryEditBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl overflow-hidden bg-[#111722] border border-slate-800 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-[#0B0F17] overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-mono-data text-slate-400">
                      <span className="text-[#D4AF37]">{photo.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{photo.dateAdded}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{photo.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
