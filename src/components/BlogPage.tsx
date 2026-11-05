import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  User,
  ShieldCheck,
  FileSearch,
  Compass,
  BookOpen,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { ContentPost, Currency, Language } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';
import { EDITORIAL_CONTENT_BRIEFS } from '../data/seoRoutes';

interface BlogPageProps {
  posts: ContentPost[];
  activePostId?: string | null;
  currentLang: Language;
  selectedCurrency: Currency;
  onNavigate: (path: string) => void;
}

const LEGACY_POST_ID_TO_SLUG: Record<string, string> = {
  'post-1': 'gold-discount-advance-fee-traps',
  'post-2': 'uganda-mining-minerals-act-compliance',
  'post-3': 'secure-multi-site-concession-audits',
  'post-4': 'tungsten-core-bars-xrf-fire-assay'
};

export const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  activePostId,
  selectedCurrency,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const publishedPosts = posts.filter((p) => p.published);

  const categories = ['All', 'Offer Risk', 'Regulation', 'Field Methods', 'Metallurgy'];

  const normalizeCategory = (cat: string): string => {
    if (cat === 'Intelligence Briefing') return 'Offer Risk';
    if (cat === 'Regulatory Alert') return 'Regulation';
    if (cat === 'Field Dispatch') return 'Field Methods';
    return cat;
  };

  // Resolve active article by slug or id (including legacy post-1..4)
  const resolvedSlug = activePostId ? LEGACY_POST_ID_TO_SLUG[activePostId] || activePostId : null;
  const activePost = resolvedSlug
    ? publishedPosts.find(
        (p) =>
          p.slug === resolvedSlug ||
          p.id === resolvedSlug ||
          p.id === activePostId
      )
    : null;

  if (activePost) {
    const postSlug = activePost.slug || activePost.id;
    const relatedPosts = publishedPosts.filter((p) => (p.slug || p.id) !== postSlug).slice(0, 3);
    const matchingBrief = EDITORIAL_CONTENT_BRIEFS.find((b) =>
      b.relatedArticles.some((art) => art.path === `/insights/${postSlug}`)
    );

    return (
      <div className="min-h-screen bg-[#0B0F17] text-[#F6F3EC] pt-20 pb-20">
        {/* Breadcrumb Bar */}
        <div className="bg-[#121826] border-b border-white/10 py-3 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#9AA4B2]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('/insights')}
                className="inline-flex items-center gap-1.5 text-[#C8A44D] hover:underline font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Insights</span>
              </button>
              <span>/</span>
              <span className="font-mono uppercase text-[11px] text-[#F6F3EC]/80">
                {normalizeCategory(activePost.category)}
              </span>
            </div>
            <span className="font-mono text-[11px]">
              Canonical: https://goldsafaris.com/insights/{postSlug}
            </span>
          </div>
        </div>

        {/* Article Header & H1 */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <header className="mb-8 pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C8A44D]/15 border border-[#C8A44D]/40 text-[#C8A44D] text-xs font-mono uppercase tracking-wider font-semibold">
                {normalizeCategory(activePost.category)}
              </span>
              <span className="text-xs font-mono text-[#9AA4B2] inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C8A44D]" />
                {activePost.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F3EC] tracking-tight leading-tight mb-5">
              {activePost.h1 || activePost.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9AA4B2] leading-relaxed mb-6">
              {activePost.summary}
            </p>

            {/* Named Author, Qualified Reviewer, Publication & Updated Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#121826] border border-white/10 text-xs">
              <div>
                <span className="font-mono uppercase text-[10px] text-[#9AA4B2] block mb-0.5">
                  Author
                </span>
                <div className="font-bold text-[#F6F3EC] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C8A44D] shrink-0" />
                  <span>{activePost.author}</span>
                </div>
                <span className="text-[11px] text-[#9AA4B2] block mt-0.5">{activePost.authorRole}</span>
              </div>

              <div>
                <span className="font-mono uppercase text-[10px] text-[#9AA4B2] block mb-0.5">
                  Reviewed By
                </span>
                <div className="font-bold text-[#F6F3EC] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                  <span>{activePost.reviewer || 'Adv. David Kigozi'}</span>
                </div>
                <span className="text-[11px] text-[#9AA4B2] block mt-0.5">
                  {activePost.reviewerRole || 'Legal & Regulatory Compliance Counsel'}
                </span>
              </div>

              <div>
                <span className="font-mono uppercase text-[10px] text-[#9AA4B2] block mb-0.5">
                  Published Date
                </span>
                <div className="font-mono font-bold text-[#F6F3EC] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C8A44D]" />
                  <span>{activePost.date}</span>
                </div>
              </div>

              <div>
                <span className="font-mono uppercase text-[10px] text-[#9AA4B2] block mb-0.5">
                  Last Reviewed / Updated
                </span>
                <div className="font-mono font-bold text-[#C8A44D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A44D]" />
                  <span>{activePost.updatedDate || activePost.date}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <figure className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-[#121826]">
            <img
              src={activePost.imageUrl}
              alt={activePost.imageAlt || activePost.title}
              className="w-full max-h-[420px] object-cover"
            />
            {activePost.imageAlt && (
              <figcaption className="px-4 py-2.5 text-xs text-[#9AA4B2] font-mono border-t border-white/10">
                {activePost.imageAlt}
              </figcaption>
            )}
          </figure>

          {/* Article Body */}
          <div className="space-y-5 text-base text-[#F6F3EC]/90 leading-relaxed mb-10">
            {activePost.body.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Authoritative Sources & Methodological Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl bg-[#121826] border border-white/10 p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C8A44D] mb-3">
                <BookOpen className="w-4 h-4" />
                <span>Authoritative Sources &amp; Standards Cited</span>
              </div>
              <ul className="space-y-2 text-xs text-[#9AA4B2] leading-relaxed">
                {(
                  activePost.sources || [
                    'Uganda Mining and Minerals Act, 2022 (Parliament of Uganda, enacted October 2022)',
                    'ICGLR Regional Certification Mechanism (RCM) Manual & OECD Due Diligence Guidance (3rd Edition)',
                    'ISO 11426:2021 Fire Assay Cupellation & URA ASYCUDA World Customs Export Procedures'
                  ]
                ).map((src, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C8A44D] font-bold">•</span>
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#121826] border border-[#C97A1E]/40 p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C97A1E] mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Scope &amp; Methodological Limitations</span>
              </div>
              <p className="text-xs text-[#F6F3EC]/85 leading-relaxed">
                {activePost.limitations ||
                  'Document review and regulatory cross-checks identify structural risk indicators in commercial offers; however, document review alone does not prove physical gold ownership, purity, origin, or immediate availability without physical inspection and laboratory fire assay.'}
              </p>
              {matchingBrief && (
                <p className="text-[11px] font-mono text-[#9AA4B2] mt-3 pt-3 border-t border-white/10">
                  Primary Authority Reference:{' '}
                  <strong className="text-[#F6F3EC]">{matchingBrief.primarySource}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pb-8 mb-10 border-b border-white/10">
            <Tag className="w-4 h-4 text-[#C8A44D]" />
            {(activePost.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-[#9AA4B2] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Relevant Next Step CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-[#121826] to-[#1a2234] border border-[#C8A44D]/40 p-7 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C8A44D] block mb-1">
                  Recommended Next Step
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#F6F3EC] mb-2">
                  Apply this briefing to an active offer or field review
                </h2>
                <p className="text-sm text-[#9AA4B2]">
                  Submit your FCO, SPA, or mineral licence for a 24–72 hour verification ({formatCurrencyPrice(2500, selectedCurrency)}) or explore our 7-day field expedition.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate(activePost.nextStepPath || '/offer-verification')}
                  className="px-6 py-3.5 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{activePost.nextStepLabel || 'Verify an Offer'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/expeditions')}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#F6F3EC] border border-white/15 font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#C8A44D]" />
                  <span>Explore Expeditions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Briefings */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F6F3EC] mb-5">
                Further Field Intelligence
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((rel) => {
                  const rSlug = rel.slug || rel.id;
                  return (
                    <div
                      key={rel.id}
                      onClick={() => onNavigate(`/insights/${rSlug}`)}
                      className="rounded-xl bg-[#121826] border border-white/10 hover:border-[#C8A44D]/50 p-5 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8A44D] block mb-2">
                          {normalizeCategory(rel.category)}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#F6F3EC] mb-2">
                          {rel.h1 || rel.title}
                        </h3>
                        <p className="text-xs text-[#9AA4B2] line-clamp-3 mb-4">{rel.summary}</p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C8A44D] inline-flex items-center gap-1">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // Filter posts by category
  const filteredPosts =
    selectedCategory === 'All'
      ? publishedPosts
      : publishedPosts.filter((p) => normalizeCategory(p.category) === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F6F3EC] pt-20 pb-20">
      {/* Header */}
      <section className="py-12 border-b border-[#C8A44D]/20 bg-gradient-to-b from-[#121826] to-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] mb-3">
              Editorial Briefings &amp; Due-Diligence Library
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F3EC] tracking-tight leading-tight mb-4">
              Field intelligence for better gold decisions
            </h1>
            <p className="text-base sm:text-lg text-[#9AA4B2] leading-relaxed mb-6">
              Field briefings on gold offer fraud, document verification, assay limits, Ugandan regulation and responsible mineral supply chains.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C8A44D] text-[#0B0F17] font-bold shadow-md'
                        : 'bg-[#121826] text-[#9AA4B2] hover:text-[#F6F3EC] border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="py-12 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => {
              const slug = post.slug || post.id;
              return (
                <article
                  key={post.id}
                  onClick={() => onNavigate(`/insights/${slug}`)}
                  className="group rounded-2xl bg-[#121826] border border-white/10 hover:border-[#C8A44D]/60 overflow-hidden transition-all flex flex-col justify-between cursor-pointer shadow-lg"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-[#0B0F17]">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-[#0B0F17]/90 border border-[#C8A44D]/40 text-[#C8A44D] text-[11px] font-mono uppercase tracking-wider font-semibold">
                          {normalizeCategory(post.category)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-mono text-[#9AA4B2] mb-2.5">
                        <span>Published {post.date}</span>
                        <span>Updated {post.updatedDate || post.date}</span>
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6F3EC] group-hover:text-[#C8A44D] transition-colors mb-3">
                        {post.h1 || post.title}
                      </h2>

                      <p className="text-sm text-[#9AA4B2] leading-relaxed mb-4">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="text-[#9AA4B2]">
                      <span className="text-[#F6F3EC] font-semibold block">{post.author}</span>
                      <span>Reviewed by {post.reviewer || 'Adv. David Kigozi'}</span>
                    </div>
                    <span className="font-bold uppercase tracking-wider text-[#C8A44D] inline-flex items-center gap-1">
                      Read Briefing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 9 Editorial Content Briefs & Topic Matrix */}
      <section className="py-12 bg-[#121826] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8A44D] block mb-2">
              Search-Content &amp; Research Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F6F3EC] mb-2">
              Core due-diligence reference briefs across Offer Risk, Regulation, Field Methods &amp; Metallurgy
            </h2>
            <p className="text-sm text-[#9AA4B2] max-w-3xl">
              Each editorial brief addresses a specific technical question raised by commercial buyers, compliance officers, and academic researchers evaluating East African gold supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EDITORIAL_CONTENT_BRIEFS.map((brief) => {
              const targetPath =
                brief.relatedArticles[0]?.path || brief.relatedServicePage.path;
              return (
                <div
                  key={brief.id}
                  onClick={() => onNavigate(targetPath)}
                  className="rounded-xl bg-[#0B0F17] border border-white/10 hover:border-[#C8A44D]/50 p-5 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#C8A44D]/15 text-[#C8A44D] font-semibold">
                        {brief.editorialCategory}
                      </span>
                      <span className="text-[11px] font-mono text-[#9AA4B2]">
                        Brief #{brief.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#F6F3EC] mb-2">
                      {brief.workingTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9AA4B2] leading-relaxed mb-3">
                      {brief.readerQuestion}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#9AA4B2] truncate max-w-[70%]">
                      Reviewer: {brief.expertReviewer}
                    </span>
                    <span className="text-[#C8A44D] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      Open Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Verification CTA */}
      <section className="py-12 bg-[#0B0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#121826] to-[#1a2234] border border-[#C8A44D]/40 p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F6F3EC] mb-1">
                Need an independent review of an active FCO, SPA, or licence?
              </h2>
              <p className="text-sm text-[#9AA4B2]">
                Submit your transaction file for a 24–72 hour document and Entebbe cadastre review ({formatCurrencyPrice(2500, selectedCurrency)}).
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/offer-verification')}
              className="px-6 py-3.5 rounded-xl bg-[#C8A44D] hover:bg-[#d8b55d] text-[#0B0F17] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <FileSearch className="w-4 h-4" />
              <span>Verify an Offer</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
