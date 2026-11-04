import React, { useState } from 'react';
import {
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Link2,
  Copy,
  Check,
  ArrowLeft,
  BookOpen,
  Search,
  Settings,
  X,
  ExternalLink,
  Plus
} from 'lucide-react';
import { ContentPost, Language, Currency } from '../types';
import { translations } from '../data/translations';
import { formatCurrencyPrice } from '../data/expeditionData';

interface BlogPageProps {
  currentLang?: Language;
  selectedCurrency?: Currency;
  posts: ContentPost[];
  isFullPage?: boolean;
  activeSlug?: string;
  showAdminControls?: boolean;
  onBackToHome?: () => void;
  onNavigate?: (path: string) => void;
  onOpenAdminPanel: () => void;
  onOpenDocVerification: () => void;
  onOpenRegistration: () => void;
}

const LOCALIZED_POST_OVERRIDES: Record<
  Language,
  Record<string, { title: string; summary: string; body: string; authorRole?: string }>
> = {
  EN: {},
  AR: {
    'post-1': {
      title: 'تفكيك جنائي: لماذا تُعد خصومات الذهب بنسبة 15%–25% في شرق أفريقيا فخاخ رسوم مسبقة دائماً',
      summary: 'يشرح كبير خبراء الأدلة الجنائية موغيسا سولومون بياكوتاغا الحقيقة الرياضية والمعدنية لتسويات سبائك الدواري المادية في كمبالا وعنتيبي.',
      authorRole: 'عضو مجلس الإدارة · كبير خبراء الأدلة الجنائية',
      body: `كل أسبوع، يتلقى مكتبنا الجنائي في كمبالا استفسارات عاجلة من مستثمرين في أوروبا والشرق الأوسط وآسيا يحملون عروض شركات (FCOs) تعد بتوريد 50 إلى 500 كجم من سبائك الذهب بخصم 15% إلى 25% أقل من سعر LBMA الفوري.\n\nإليكم الحقيقة الاقتصادية المجردة: الذهب هو أصل نقدي عالمي فوري السيولة. في أحزمة التعدين المرخصة في أوغندا — من موبيندي وكاساندا إلى بوسيا وكاراموجا — تتنافس المصافي والوكلاء المرخصون يومياً لشراء الذهب الخام نقداً وبشكل فوري بنسبة 98% إلى 99.2% من السعر العالمي.\n\nلا يحتاج أي مالك منجم حقيقي إلى منح خصم 18% لجذب مشترٍ أجنبي. الغرض الوحيد من هذا الخصم الوهمي هو إقناع المشتري الأجنبي بدفع 35,000 إلى 150,000 دولار مقدماً كضرائب تصدير مزيفة أو أتعاب محاماة قبل فحص غرام واحد من الذهب.`
    },
    'post-2': {
      title: 'قانون التعدين والمعادن الأوغندي لعام 2022: شهادة ICGLR والامتثال الجمركي لدى URA',
      summary: 'يوضح خبير تجارة المعادن كامانزاي كايجوكا سلسلة الحيازة القانونية الإلزامية لتصدير الذهب بشكل قانوني عبر مطار عنتيبي الدولي.',
      authorRole: 'عضو مجلس الإدارة · خبير تجارة المعادن',
      body: `أحدث قانون التعدين والمعادن الأوغندي لعام 2022 نقلة نوعية في كيفية ترخيص وصهر وفرض الضرائب وتصدير المعادن الثمينة من جمهورية أوغندا.\n\nأولاً: يجب أن تنطلق كل معاملة ذهب قانونية من ترخيص قابل للتحقق في السجل المعدني الإلكتروني بمديرية المسح الجيولوجي والمعادن (DGSM) في عنتيبي.\n\nثانياً: يخضع تتبع المنشأ الإقليمي لآلية الإشهاد الإقليمية للمؤتمر الدولي لمنطقة البحيرات الكبرى (ICGLR RCM).\n\nثالثاً: تُسدد ضرائب التصدير القانونية (5%) حصرياً عبر أرقام تسجيل الدفع الحكومية (PRN) الصادرة من نظام URA ASYCUDA World مباشرة للخزانة العامة، وليس لحسابات مكاتب المحاماة الخاصة.`
    },
    'post-3': {
      title: 'تشريح سبيكة ذهب مزيفة بقلب من التنغستن: لماذا لا يكفي جهاز XRF السطحي أبداً',
      summary: 'داخل مختبرنا المعدني في عنتيبي: كيف تخدع سبائك التنغستن المغلفة بالذهب عيار 24 أجهزة الفحص السطحية وكيف يكشفها الصهر الكامل.',
      authorRole: 'عضو مجلس الإدارة · كبير خبراء الأدلة الجنائية',
      body: `تبلغ كثافة الذهب النقي 19.32 جم/سم³، بينما تبلغ كثافة التنغستن 19.25 جم/سم³ — أي أنهما متطابقان تقريباً في الوزن. يقوم المزورون بتغليف قلب من التنغستن بطبقة سميكة (2 ملم) من الذهب الحقيقي عيار 24.\n\nعندما يستخدم المشتري جهاز XRF المحمول، فإن الأشعة تخترق 10 إلى 50 ميكرومتر فقط وتقرأ الذهب الخارجي بنسبة 99.9%!\n\nلذلك يفرض بروتوكول بعثة أوغندا للذهب الفحص بالموجات فوق الصوتية، يليه الصهر الكامل في فرن الحث وأخذ عينات مزدوجة وإجراء معايرة النار (Fire Assay) عند 1050 درجة مئوية.`
    },
    'post-4': {
      title: 'أمن الوفود الميدانية ولوجستيات المواكب المصفحة B6 عبر حزام الذهب الأوغندي',
      summary: 'يستعرض مدير العمليات والاستراتيجية روني موغارورا البنية الأمنية واللوجستية التي تحمي الوفود الزائرة من مطار عنتيبي إلى المناجم.',
      authorRole: 'عضو مجلس الإدارة · العمليات واللوجستيات والاستراتيجية',
      body: `يتطلب تنفيذ العناية الواجبة الميدانية في شرق أفريقيا تنسيقاً لوجستياً وأمنياً دقيقاً.\n\nبدءاً من الوصول إلى مطار عنتيبي الدولي عبر المسار الدبلوماسي السريع، مروراً بالمواكب المصفحة B6 المتصلة بالأقمار الصناعية والحماية التكتيكية المباشرة إلى مناجم بوسيا وموبيندي، نضمن لوفودنا أقصى درجات الأمان والسرية.`
    }
  },
  ZH: {
    'post-1': {
      title: '取证深度拆解：为什么东非低于现货 15%–25% 的黄金折扣永远是预付费用陷阱',
      summary: '首席取证专家 Mugisa Solomon Byakutaaga 深度剖析坎帕拉与恩德培实物合质金条 (Dore Bar) 结算的数学与冶金真相。',
      authorRole: '董事会董事 · 首席取证专家',
      body: `每周，我们在坎帕拉的取证中心都会收到来自欧洲、中东和亚洲投资人的紧急咨询，他们手中拿着精美的公司正式报价 (FCO)，承诺以低于 LBMA 国际现货 15% 至 25% 的折扣供应 50公斤 至 500公斤 97%+ 纯度的金条。\n\n以下是毫无保留的经济学真相：黄金是全球一级硬通货。在乌干达持牌矿区——从穆本德、卡桑达到布西亚和卡拉莫贾——当地持牌集货商和保税精炼厂每天都在以 LBMA 现货价 98% 至 99.2% 的即期现金争相收购海绵金和合质金条。\n\n没有任何合法矿主需要降价 18% 来吸引外国买家。人为编造的“深度折扣”只有一个心理目的：诱导外国买家在进行火试金化验前，先行垫付 3.5万 至 15万美元的伪造 URA 5% 出口税或私人律师托管费。`
    },
    'post-2': {
      title: '解读《2022年乌干达采矿与矿产法》：ICGLR 区域认证与 URA 海关出口合规指南',
      summary: '矿产贸易专家 Kamanzai Kaijuka 详解经由恩德培国际机场合法出口黄金所必须具备的法定监管链单证。',
      authorRole: '董事会董事 · 矿产贸易专家',
      body: `《2022年乌干达采矿与矿产法》的颁布彻底规范了贵金属在乌干达共和国境内的牌照核发、熔炼、征税与出口流程。对于机构大宗买家和主权基金而言，掌握法定贸易架构是抵御假证的第一道防线。\n\n第一，每一笔合法黄金交易必须源自恩德培地质调查与矿业局 (DGSM) 在线矿权登记系统中可核查的有效牌照。\n\n第二，区域原产地溯源受大湖地区国际会议 (ICGLR) 区域认证机制 (RCM) 管辖。\n\n第三，法定出口税（5%）严格通过官方 URA ASYCUDA World 系统生成的政府缴款注册号 (PRN) 直接缴入国库——绝不通过私人律师事务所账户或第三方货代收取。`
    },
    'post-3': {
      title: '解剖掺钨包金假金条：为什么手持式 XRF 表面光谱扫描远远不够',
      summary: '走进恩德培冶金取证实验室：包裹 24K 真金外壳的烧结钨芯如何欺骗表面扫描仪，以及感应熔炼与火试金如何使其原形毕露。',
      authorRole: '董事会董事 · 首席取证专家',
      body: `纯金的密度为 19.32 g/cm³，而钨的密度为 19.25 g/cm³——两者在重量与排水体积测试中几乎完全一致。高明的造假团伙将 1.5 至 2 毫米厚的真 24K 纯金熔接在烧结钨棒核心外层。\n\n当买家在酒店房间使用手持式 XRF 光谱仪扫描时，射线仅能穿透表面 10–50 微米，读数自然显示“99.9% 纯金”！\n\n因此，乌干达黄金考察团制定了铁律：必须执行超声波声速扫描，随后在认证保税精炼厂进行感应炉整体均匀熔炼、钻孔取双样，并执行 1050°C 经典铅灰吹火试金法 (Fire Assay)。`
    },
    'post-4': {
      title: '高管代表团外勤安保与穿越乌干达黄金矿带的 B6 防弹装甲车队后勤保障',
      summary: '运营、后勤与战略总监 Ronnie Mugarura 揭秘从恩德培停机坪到活跃矿坑全程守护代表团的主权级安保架构。',
      authorRole: '董事会董事 · 运营、后勤与战略总监',
      body: `在东非执行机构级实地尽职调查需要严密的后勤与安全保障。\n\n从恩德培国际机场 (EBB) 停机坪 VIP 外交快速通关，到全程卫星追踪的丰田陆地巡洋舰与 B6 防弹装甲护卫车队直达布西亚工业矿山与穆本德矿区，我们的外勤指挥部确保每一位委托人在绝对安全、保密与高效的环境中完成核查。`
    }
  },
  FR: {
    'post-1': {
      title: 'Déconstruction Forensique : Pourquoi les Remises de 15 % à 25 % sur l’Or en Afrique de l’Est Sont Toujours des Pièges',
      summary: 'L’Expert Principal en Criminalistique Mugisa Solomon Byakutaaga analyse la réalité mathématique et métallurgique des règlements de barres Doré à Kampala et Entebbe.',
      authorRole: 'Directeur · Expert Principal en Criminalistique',
      body: `Chaque semaine, notre bureau forensique de Kampala reçoit des demandes urgentes d'investisseurs européens, moyen-orientaux et asiatiques détenant des offres FCO promettant 50 à 500 kg de barres Doré avec des remises de 15 % à 25 % sous le cours spot LBMA.\n\nVoici la réalité économique : l'or est une monnaie mondiale de rang 1. Dans les ceintures minières agréées d'Ouganda (Mubende, Kassanda, Busia), les raffineries locales achètent l'or brut au comptant entre 98 % et 99,2 % du fixing de Londres.\n\nAucun mineur légitime n'a besoin d'accorder 18 % de rabais. Cette remise artificielle vise uniquement à inciter l'acheteur étranger à payer 35 000 $ à 150 000 $ d'avance pour de fausses taxes d'exportation URA ou frais séquestres.`
    },
    'post-2': {
      title: 'Loi Minière Ougandaise de 2022 : Certification CIRGL (ICGLR) et Conformité Douanière URA',
      summary: 'L’Expert du Négoce des Minéraux Kamanzai Kaijuka détaille la chaîne de traçabilité obligatoire pour exporter légalement via l’aéroport d’Entebbe.',
      authorRole: 'Directeur · Expert du Négoce des Minéraux',
      body: `La Loi sur les Mines et les Minéraux de l'Ouganda de 2022 a profondément modernisé l'octroi de licences, la fusion, la fiscalité et l'exportation des métaux précieux.\n\nPremièrement, toute transaction légale doit provenir d'une licence vérifiable sur le cadastre en ligne de la DGSM à Entebbe.\n\nDeuxièmement, la traçabilité régionale est régie par le Mécanisme Régional de Certification de la CIRGL (ICGLR).\n\nTroisièmement, la taxe statutaire d'exportation de 5 % est payée exclusivement via des numéros PRN officiels générés par URA ASYCUDA World directement au Trésor public.`
    },
    'post-3': {
      title: 'Anatomie d’une Barre Doré Fourrée au Tungstène : Pourquoi le Scan XRF de Surface Est Insuffisant',
      summary: 'Au cœur de notre laboratoire d’Entebbe : comment les cœurs en tungstène plaqués or 24K trompent les spectromètres portables et comment la coupellation les démasque.',
      authorRole: 'Directeur · Expert Principal en Criminalistique',
      body: `La densité de l'or pur est de 19,32 g/cm³ et celle du tungstène de 19,25 g/cm³. Les faussaires enveloppent des tiges de tungstène fritté d'une couche de 2 mm d'or 24 carats véritable.\n\nUn spectromètre XRF portable ne pénètre que de 10 à 50 micromètres et affiche donc « 99,9 % d'or pur » !\n\nC'est pourquoi notre protocole impose un scan par ultrasons suivi d'une fusion complète par induction, d'un double carottage et d'un essai au feu (Fire Assay) à 1050°C.`
    },
    'post-4': {
      title: 'Sécurité des Délégations & Convois Blindés B6 à Travers la Ceinture Aurifère Ougandaise',
      summary: 'Le Directeur des Opérations et de la Stratégie Ronnie Mugarura présente l’architecture sécuritaire protégeant les délégations d’Entebbe jusqu’aux mines.',
      authorRole: 'Directeur · Opérations, Logistique et Stratégie',
      body: `Mener une diligence raisonnable sur le terrain en Afrique de l'Est exige une logistique souveraine sans faille.\n\nDepuis l'accueil diplomatique VIP sur le tarmac d'Entebbe jusqu'aux convois blindés B6 suivis par satellite avec unité de protection rapprochée vers Busia et Mubende, notre direction assure une sécurité et une confidentialité absolues.`
    }
  }
};

export const BlogPage: React.FC<BlogPageProps> = ({
  currentLang = 'EN',
  selectedCurrency = 'USD',
  posts,
  isFullPage = false,
  activeSlug,
  showAdminControls = false,
  onBackToHome,
  onNavigate,
  onOpenAdminPanel,
  onOpenDocVerification,
  onOpenRegistration
}) => {
  const t = translations[currentLang];
  const auditPrice = formatCurrencyPrice(2500, selectedCurrency);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ContentPost | null>(null);
  const [shareModalPost, setShareModalPost] = useState<ContentPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [footerSharePostId, setFooterSharePostId] = useState<string>('');
  const [instagramShareNotice, setInstagramShareNotice] = useState<string | null>(null);

  // Localize posts dynamically for currentLang
  const localizedPosts: ContentPost[] = posts.map((p) => {
    const override = LOCALIZED_POST_OVERRIDES[currentLang]?.[p.id];
    if (!override) return p;
    return {
      ...p,
      title: override.title,
      summary: override.summary,
      body: override.body,
      authorRole: override.authorRole || p.authorRole
    };
  });

  const publishedPosts = localizedPosts.filter((p) => p.published !== false);

  const slugArticle = activeSlug
    ? publishedPosts.find((p) => p.id === activeSlug) || null
    : null;
  const displayedArticle = slugArticle || activeArticle;

  const handleSelectArticle = (post: ContentPost | null) => {
    if (!post) {
      setActiveArticle(null);
      if (activeSlug && onNavigate) {
        onNavigate('/insights');
      }
      return;
    }
    if (onNavigate) {
      onNavigate(`/insights/${post.id}`);
    } else {
      setActiveArticle(post);
    }
  };

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getShareUrl = (post: ContentPost) => {
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://ugandagoldexpedition.org';
    return `${origin}/insights/${post.id}`;
  };

  const getShareLinks = (post: ContentPost) => {
    const articleUrl = getShareUrl(post);
    const encodedUrl = encodeURIComponent(articleUrl);
    const shareTitle = `${post.title} — by ${post.author} | Uganda Gold Expedition`;
    const encodedTitle = encodeURIComponent(shareTitle);

    return {
      articleUrl,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      instagramUrl: 'https://www.instagram.com/',
      formattedSocialCaption: `${post.title}\n\n${post.summary}\n\nAuthored by ${post.author}${
        post.authorRole ? ` (${post.authorRole})` : ''
      }\n\nRead the full dispatch at: ${articleUrl}\n\n#UgandaGoldExpedition #GoldDueDiligence #MineralsTrade #BullionForensics #EastAfrica`
    };
  };

  const handleCopyShareText = (post: ContentPost, platformLabel?: string) => {
    const { formattedSocialCaption } = getShareLinks(post);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(formattedSocialCaption).catch(() => {});
    }
    const key = platformLabel ? `${post.id}-${platformLabel}` : post.id;
    setCopiedId(key);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const categories = [
    'ALL',
    'Intelligence Briefing',
    'Regulatory Alert',
    'Field Dispatch',
    'Market Update'
  ];

  return (
    <section
      id="blog"
      className={`${
        isFullPage ? 'pt-12 pb-20 min-h-screen' : 'py-10 sm:py-12 border-t border-slate-800/80'
      } bg-[#0B0F17] text-slate-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Top Bar when viewing as full page */}
        {isFullPage && onBackToHome && (
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#FEF3C7] transition-colors whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.aboutBackToHome}</span>
            </button>

            {showAdminControls && (
              <button
                onClick={onOpenAdminPanel}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#111722] border border-slate-800 rounded transition-colors whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.blogPublishEditBtn}</span>
              </button>
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
              <span>{t.blogBadge1}</span>
              <span aria-hidden="true">·</span>
              <span>{t.blogBadge2}</span>
              <span aria-hidden="true">·</span>
              <span>{publishedPosts.length}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-white leading-tight">
              {t.blogTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.blogSubtitle}
            </p>
          </div>

          {showAdminControls && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenAdminPanel}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#111722] hover:bg-[#182232] border border-slate-700 rounded transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.blogPublishEditBtn}</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-[#111722] border border-slate-800 rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? t.blogAllCategory : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.blogSearchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#111722] border border-slate-800 focus:border-[#D4AF37] rounded-lg text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="rounded-xl bg-[#111722] border border-slate-800 p-12 text-center space-y-3">
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] rounded"
            >
              {t.blogAllCategory}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {filteredPosts.map((post) => {
              const shareLinks = getShareLinks(post);
              return (
                <article
                  key={post.id}
                  id={`blog-${post.id}`}
                  className="rounded-xl bg-[#111722] border border-slate-800 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div
                      onClick={() => handleSelectArticle(post)}
                      className="relative aspect-[16/9] bg-[#0B0F17] overflow-hidden border-b border-slate-800 cursor-pointer group"
                    >
                      <img
                        src={
                          post.imageUrl ||
                          '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg'
                        }
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent opacity-80" />
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data text-slate-400">
                        <span className="text-[#D4AF37] font-semibold">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date}</span>
                        {post.readTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>

                      <h3
                        onClick={() => handleSelectArticle(post)}
                        className="font-cinzel text-xl font-bold text-white hover:text-[#D4AF37] transition-colors cursor-pointer leading-snug"
                      >
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs text-slate-300">
                        <div>
                          <span className="font-semibold text-white">{post.author}</span>
                          {post.authorRole && (
                            <span className="text-slate-400"> · {post.authorRole}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Read Full Article + Social Media Share Controls */}
                  <div className="px-6 py-4 bg-[#0B0F17]/60 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => handleSelectArticle(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:text-[#FEF3C7] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t.blogReadFullBtn}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 mr-1">{t.blogShareLabel}</span>

                      <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on LinkedIn"
                        className="p-1.5 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={shareLinks.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on X (Twitter)"
                        className="px-2 py-1 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors font-mono-data text-xs font-bold leading-none flex items-center justify-center h-[26px]"
                      >
                        𝕏
                      </a>

                      <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on Facebook"
                        className="p-1.5 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => {
                          handleCopyShareText(post, 'ig');
                          setShareModalPost(post);
                        }}
                        title="Share on Instagram"
                        className="p-1.5 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setShareModalPost(post)}
                        title="Open Social Share Options"
                        className="p-1.5 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-[#D4AF37] transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Dedicated Blog Page Footer Social Media Sharing Widget */}
        {publishedPosts.length > 0 && (() => {
          const selectedFooterPost =
            publishedPosts.find((p) => p.id === footerSharePostId) || publishedPosts[0];
          const footerShareLinks = getShareLinks(selectedFooterPost);
          const isFooterCopied =
            copiedId === `${selectedFooterPost.id}-footer` ||
            copiedId === `${selectedFooterPost.id}-ig-footer`;

          return (
            <div className="mt-8 rounded-2xl bg-[#111722] border border-[#D4AF37]/40 p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <div className="inline-flex items-center gap-2 text-xs font-mono-data uppercase tracking-wider text-[#D4AF37]">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{t.blogShareModalTitle} · One-Click Article Syndication</span>
                  </div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                    Share Forensic Briefings & Regulatory Dispatches
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Select any intelligence briefing below and syndicate directly to LinkedIn, X, Facebook, or Instagram with one click.
                  </p>

                  {/* Article Selector Dropdown for Footer Sharing Widget */}
                  <div className="pt-1 max-w-xl">
                    <label htmlFor="blog-footer-share-select" className="sr-only">
                      Select Article to Share
                    </label>
                    <select
                      id="blog-footer-share-select"
                      value={selectedFooterPost.id}
                      onChange={(e) => {
                        setFooterSharePostId(e.target.value);
                        setInstagramShareNotice(null);
                      }}
                      className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 hover:border-[#D4AF37]/60 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {publishedPosts.map((post) => (
                        <option key={post.id} value={post.id}>
                          {post.title} — ({post.author})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* One-Click Social Media Sharing Buttons (LinkedIn, X, Facebook, Instagram) */}
                <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={footerShareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-lg bg-[#0A66C2]/20 hover:bg-[#0A66C2]/35 border border-[#0A66C2]/50 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
                      title="One-click share to LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-[#38bdf8]" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href={footerShareLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-lg bg-[#0B0F17] hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
                      title="One-click share to X"
                    >
                      <Twitter className="w-4 h-4 text-slate-200" />
                      <span>X</span>
                    </a>

                    <a
                      href={footerShareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2]/35 border border-[#1877F2]/50 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
                      title="One-click share to Facebook"
                    >
                      <Facebook className="w-4 h-4 text-[#60a5fa]" />
                      <span>Facebook</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        handleCopyShareText(selectedFooterPost, 'ig-footer');
                        setInstagramShareNotice(
                          `Instagram caption & link copied for "${selectedFooterPost.title.slice(0, 42)}..." — ready to paste on Instagram!`
                        );
                        setTimeout(() => setInstagramShareNotice(null), 4000);
                      }}
                      className="px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-amber-900/40 hover:from-purple-900/60 hover:to-amber-900/60 border border-pink-500/40 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
                      title="One-click share to Instagram (copies formatted caption & URL)"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>Instagram</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyShareText(selectedFooterPost, 'footer')}
                      className="px-3 py-2.5 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-[#D4AF37]/40 text-xs font-mono-data text-[#D4AF37] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy direct article link"
                    >
                      {isFooterCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t.blogCopiedMsg}</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {instagramShareNotice && (
                    <div className="text-[11px] font-mono-data text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 px-3 py-1 rounded">
                      {instagramShareNotice}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Full Article Reader View / Modal */}
      {displayedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64 sm:h-72 bg-[#0B0F17] border-b border-slate-800">
              <img
                src={
                  displayedArticle.imageUrl ||
                  '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg'
                }
                alt={displayedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-[#0B0F17]/40 to-transparent" />
              <button
                onClick={() => handleSelectArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#0B0F17]/80 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-data text-[#D4AF37]">
                  <span>{displayedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{displayedArticle.date}</span>
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {displayedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="text-xs">
                  <div className="text-white font-bold">{displayedArticle.author}</div>
                  {displayedArticle.authorRole && (
                    <div className="text-[#D4AF37] font-mono-data text-[11px]">
                      {displayedArticle.authorRole}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={getShareLinks(displayedArticle).linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={getShareLinks(displayedArticle).x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    <span className="font-mono-data font-bold text-[#D4AF37]">𝕏</span>
                    <span>X</span>
                  </a>
                  <a
                    href={getShareLinks(displayedArticle).facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Facebook</span>
                  </a>
                  <button
                    onClick={() => {
                      handleCopyShareText(displayedArticle, 'reader-ig');
                      setShareModalPost(displayedArticle);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Instagram</span>
                  </button>
                </div>
              </div>

              <p className="text-base text-slate-200 font-medium leading-relaxed">
                {displayedArticle.summary}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                {displayedArticle.body}
              </div>

              <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">
                    {t.faqBottomTitle}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      handleSelectArticle(null);
                      onOpenDocVerification();
                    }}
                    className="px-3.5 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded whitespace-nowrap cursor-pointer"
                  >
                    {t.navVerifyDoc} ({auditPrice})
                  </button>
                  <button
                    onClick={() => {
                      handleSelectArticle(null);
                      onOpenRegistration();
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#111722] border border-slate-700 rounded whitespace-nowrap cursor-pointer"
                  >
                    {t.navApplyCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Share Studio Modal */}
      {shareModalPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  {t.blogShareModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setShareModalPost(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white line-clamp-2">
                {shareModalPost.title}
              </div>
              <div className="text-[11px] text-slate-400">
                {shareModalPost.author} · {shareModalPost.date}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={getShareLinks(shareModalPost).linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyShareText(shareModalPost, 'linkedin')}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#D4AF37]" />
                  <span>LinkedIn</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={getShareLinks(shareModalPost).x}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyShareText(shareModalPost, 'x')}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono-data font-bold text-[#D4AF37]">𝕏</span>
                  <span>X</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={getShareLinks(shareModalPost).facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyShareText(shareModalPost, 'facebook')}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-[#D4AF37]" />
                  <span>Facebook</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={getShareLinks(shareModalPost).instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyShareText(shareModalPost, 'instagram')}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                  <span>Instagram</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => handleCopyShareText(shareModalPost, 'box')}
                  className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-[#FEF3C7] font-semibold"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t.blogCopiedMsg}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.blogCopyCaptionBtn}</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                readOnly
                rows={4}
                value={getShareLinks(shareModalPost).formattedSocialCaption}
                className="w-full p-3 rounded-lg bg-[#0B0F17] border border-slate-800 text-xs text-slate-300 font-mono-data leading-relaxed outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
