import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../types';

/**
 * Instant, zero-latency dictionary covering core UI phrases, headlines, buttons,
 * navigation, and common strings across all pages of Uganda Gold Expedition.
 * Any string not in this dictionary is automatically translated in batches via /api/translate
 * and cached in localStorage + memory for instant subsequent rendering.
 */
export const INSTANT_DICTIONARY: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  AR: {
    // Global & Independence Bar
    'Independent due diligence and field verification. We do not buy, sell, or broker gold.':
      'العناية الواجبة المستقلة والتحقق الميداني. نحن لا نشتري أو نبيع أو نتوسط في تجارة الذهب.',
    'UGANDA GOLD': 'رحلة ذهب أوغندا',
    'EXPEDITION': 'الاستقصائية',
    'Due Diligence & Field Verification': 'العناية الواجبة والتحقق الميداني',
    'Expeditions': 'البعثات الميدانية',
    'Offer Verification': 'التحقق من العروض',
    'Risk & Compliance': 'المخاطر والامتثال',
    'About': 'من نحن',
    'Insights': 'الرؤى والتقارير',
    'Client Portal': 'بوابة العملاء',
    'Verify an Offer': 'تحقق من عرض ذهب',
    'Verify a Gold Offer': 'تحقق من عرض ذهب الآن',
    'Explore the 7-Day Expedition': 'استكشف البعثة الميدانية (7 أيام)',
    'Start Verification': 'ابدأ التحقق الآن',
    'Explore Expeditions': 'استكشف البعثات الميدانية',
    'Start Application': 'ابدأ طلب الانضمام',
    'Active gold offer or visit?': 'هل لديك عرض ذهب نشط أو ترغب بزيارة ميدانية؟',
    '24–72h Verification · 7-Day Expedition': 'تحقق خلال 24–72 ساعة · بعثة ميدانية 7 أيام',

    // Homepage Hero & Pathways
    'Kampala & Entebbe, Uganda · Independent Advisory':
      'كمبالا وعنتيبي، أوغندا · استشارات رقابية مستقلة',
    'Verify the offer. Understand the supply chain. Before you commit capital.':
      'تحقق من العرض. افهم سلسلة التوريد. قبل أن تلتزم برأس المال.',
    'Independent document verification for active gold offers, and structured field expeditions across Uganda’s gold supply chain.':
      'تحقق مستندي مستقل لعروض الذهب النشطة، وبعثات ميدانية منظمة عبر سلسلة توريد الذهب في أوغندا.',
    'What brings you here?': 'ما الذيقادك إلى هنا؟',
    'Select the pathway that matches your current situation.':
      'اختر المسار الذي يناسب وضعك الحالي.',
    'I have received an offer': 'لقد تلقيتُ عرضاً للذهب',
    'Verify documents, licensing, and counterparty claims before committing funds.':
      'تحقق من المستندات والتراخيص وادعاءات الطرف المقابل قبل تحويل أي أموال.',
    'Review Verification Process': 'مراجعة إجراءات التحقق',
    'I want to conduct field due diligence': 'أرغب في إجراء عناية واجبة ميدانية',
    'Explore a structured, in-person supply-chain expedition.':
      'استكشف بعثة ميدانية منظمة حضورياً عبر سلسلة التوريد.',
    'Explore 7-Day Programmes': 'استكشف برامج الـ 7 أيام',
    'I represent an institution or research group': 'أمثل مؤسسة أو مجموعة بحثية',
    'Arrange a tailored delegation, research programme, or confidential briefing.':
      'رتب وفداً مخصصاً أو برنامجاً بحثياً أو إحاطة تنفيذية سرية.',
    'Institutional & Academic Options': 'الخيارات المؤسسية والأكاديمية',

    // Two-Service Comparison
    'Two clear ways we work with you': 'طريقتان واضحتان للعمل معك',
    'Whether you need to evaluate a specific set of documents this week or understand the physical market on the ground, our services are structured with defined scope and deliverables.':
      'سواء كنت بحاجة لتقييم مستندات محددة هذا الأسبوع أو فهم السوق الفعلي ميدانياً، فإن خدماتنا مصممة بنطاق ومخرجات محددة.',
    'Service 01 · Remote': 'الخدمة 01 · عن بُعد',
    '24–72-Hour Verification': 'التحقق خلال 24–72 ساعة',
    'Remote starting point for buyers holding an active offer, license, or contract.':
      'نقطة انطلاق عن بُعد للمشترين الذين لديهم عرض نشط أو ترخيص أو عقد.',
    'Service 02 · In-Person': 'الخدمة 02 · حضورياً في الميدان',
    '7-Day Expedition': 'البعثة الميدانية لمدة 7 أيام',
    'In-person field programme across Entebbe, Kampala, Mubende, and Busia.':
      'برنامج ميداني حضوري يشمل عنتيبي وكمبالا وموبيندي وبوسيا.',
    'How 24–72-hour verification works': 'كيف يعمل التحقق خلال 24–72 ساعة',
    'A structured three-step review before you travel or enter transaction negotiations.':
      'مراجعة منظمة من ثلاث خطوات قبل السفر أو الدخول في مفاوضات الصفقة.',
    'Full 24–72-hour verification specifications →': 'المواصفات الكاملة للتحقق خلال 24–72 ساعة ←',
    '1. Submit': '1. تقديم المستندات',
    '2. Verify': '2. الفحص والتحقق',
    '3. Decide': '3. اتخاذ القرار',

    // 7-Day Preview & Leadership
    'Inside the 7-day supply-chain expedition': 'داخل البعثة الميدانية لسلسلة التوريد (7 أيام)',
    'Select any day below to preview the focus area and participant outcome.':
      'اختر أي يوم أدناه لمعاينة مجال التركيز والنتيجة المكتسبة للمشاركين.',
    'View Full 7-Day Itinerary': 'عرض جدول الـ 7 أيام الكامل',
    'Compare Expedition Packages': 'مقارنة باقات البعثات',
    'Independence, methodology, and field leadership': 'الاستقلالية والمنهجية والقيادة الميدانية',
    'Why our assessments remain objective': 'لماذا تظل تقييماتنا موضوعية ومحايدة',
    'Leadership & Specialist Team': 'فريق القيادة والخبراء المتخصصين',
    'Full team & methodology →': 'الفريق الكامل والمنهجية ←',
    'Decide your next step with clear evidence': 'حدد خطوتك التالية بناءً على أدلة واضحة',

    // Common Page Headers & Actions
    'Submit Documents for Verification': 'تقديم المستندات للتحقق',
    'Frequently Asked Questions': 'الأسئلة الشائعة',
    'Contact & Executive Briefings': 'التواصل والإحاطات التنفيذية',
    'Expedition Application': 'طلب الانضمام للبعثة',
    'Services & Programmes': 'الخدمات والبرامج',
    'Risk & Intelligence': 'المخاطر والمعلومات الرقابية',
    'Governance & Support': 'الحوكمة والدعم',
    'Staff Sign-In': 'دخول الموظفين',
    'Administration': 'الإدارة',
    'Sign Out': 'تسجيل الخروج',
    'My Client Files': 'ملفات العميل الخاصة بي',
    'Staff Officer 1 Desk': 'مكتب ضابط الصف الأول',
    'Admin Console': 'لوحة تحكم الإدارة',
    'Download as PDF': 'تحميل كملف PDF',
    'Print A4': 'طباعة A4',
    'Download HTML': 'تحميل HTML',
    'Invoice': 'فاتورة',
    'QR Receipt': 'إيصال رمز QR'
  },

  ZH: {
    // Global & Independence Bar
    'Independent due diligence and field verification. We do not buy, sell, or broker gold.':
      '独立尽职调查与实地核验机构。我们不购买、不出售、也不经纪黄金交易。',
    'UGANDA GOLD': '乌干达黄金',
    'EXPEDITION': '实地考察团',
    'Due Diligence & Field Verification': '独立尽职调查与实地核验',
    'Expeditions': '实地考察',
    'Offer Verification': '报价核验',
    'Risk & Compliance': '风险与合规',
    'About': '关于我们',
    'Insights': '研究与洞察',
    'Client Portal': '客户门户',
    'Verify an Offer': '核验黄金报价',
    'Verify a Gold Offer': '核验黄金报价',
    'Explore the 7-Day Expedition': '探索 7 天实地考察项目',
    'Start Verification': '开始报价核验',
    'Explore Expeditions': '了解实地考察',
    'Start Application': '开始考察申请',
    'Active gold offer or visit?': '持有黄金报价或计划实地考察？',
    '24–72h Verification · 7-Day Expedition': '24–72小时文件核验 · 7天实地考察',

    // Homepage Hero & Pathways
    'Kampala & Entebbe, Uganda · Independent Advisory':
      '乌干达坎帕拉与恩德培 · 独立尽调顾问机构',
    'Verify the offer. Understand the supply chain. Before you commit capital.':
      '在投入资金之前：先核验报价真伪，再摸清真实供应链。',
    'Independent document verification for active gold offers, and structured field expeditions across Uganda’s gold supply chain.':
      '针对现有黄金报价提供独立文件核验，并组织覆盖乌干达黄金供应链全流程的 7 天结构化实地考察。',
    'What brings you here?': '请选择您当前的需求场景',
    'Select the pathway that matches your current situation.':
      '选择最符合您当前情况的服务路径。',
    'I have received an offer': '我收到了一份黄金报价',
    'Verify documents, licensing, and counterparty claims before committing funds.':
      '在支付任何资金前，核验矿权许可证、海关文件及交易对手声明。',
    'Review Verification Process': '查看文件核验流程',
    'I want to conduct field due diligence': '我想进行实地尽职调查',
    'Explore a structured, in-person supply-chain expedition.':
      '参加结构化的乌干达黄金供应链实地考察项目。',
    'Explore 7-Day Programmes': '探索 7 天考察项目',
    'I represent an institution or research group': '我代表机构或学术研究团队',
    'Arrange a tailored delegation, research programme, or confidential briefing.':
      '安排定制机构代表团、学术研究考察或机密高管简报。',
    'Institutional & Academic Options': '查看机构与学术方案',

    // Two-Service Comparison
    'Two clear ways we work with you': '我们为您提供两项核心服务',
    'Whether you need to evaluate a specific set of documents this week or understand the physical market on the ground, our services are structured with defined scope and deliverables.':
      '无论您是需要本周内核查特定交易文件，还是希望亲赴现场了解真实黄金市场，我们的服务都具备明确的核查范围与交付成果。',
    'Service 01 · Remote': '服务 01 · 远程核验',
    '24–72-Hour Verification': '24–72 小时报价文件核验',
    'Remote starting point for buyers holding an active offer, license, or contract.':
      '适合持有现有黄金报价单（FCO）、矿业许可证或买卖合同（SPA）的买家作为远程核查起点。',
    'Service 02 · In-Person': '服务 02 · 实地考察',
    '7-Day Expedition': '7 天供应链实地考察',
    'In-person field programme across Entebbe, Kampala, Mubende, and Busia.':
      '覆盖恩德培、坎帕拉、穆本德和布西亚矿区的 7 天实地尽调项目。',
    'How 24–72-hour verification works': '24–72 小时文件核验如何运作',
    'A structured three-step review before you travel or enter transaction negotiations.':
      '在您启程差旅或进入正式交易谈判前，通过三个清晰步骤完成官方注册局核查。',
    'Full 24–72-hour verification specifications →': '查看 24–72 小时核验完整规范 →',
    '1. Submit': '1. 提交文件',
    '2. Verify': '2. 档案核查',
    '3. Decide': '3. 决策报告',

    // 7-Day Preview & Leadership
    'Inside the 7-day supply-chain expedition': '7 天供应链实地考察日程预览',
    'Select any day below to preview the focus area and participant outcome.':
      '点击下方任意天数，预览当日考察重点与参团收获。',
    'View Full 7-Day Itinerary': '查看完整 7 天行程',
    'Compare Expedition Packages': '对比考察套餐与档期',
    'Independence, methodology, and field leadership': '独立章程、核查方法与专家团队',
    'Why our assessments remain objective': '为什么我们的评估保持客观中立',
    'Leadership & Specialist Team': '领导层与专业尽调团队',
    'Full team & methodology →': '查看完整团队与方法论 →',
    'Decide your next step with clear evidence': '基于确凿证据决定您的下一步行动',

    // Common Page Headers & Actions
    'Submit Documents for Verification': '提交文件进行核验',
    'Frequently Asked Questions': '常见问题解答 (FAQ)',
    'Contact & Executive Briefings': '联系我们与高管简报预约',
    'Expedition Application': '实地考察申请表',
    'Services & Programmes': '服务与考察项目',
    'Risk & Intelligence': '风险合规与研究情报',
    'Governance & Support': '合规治理与客户支持',
    'Staff Sign-In': '员工登录',
    'Administration': '管理后台',
    'Sign Out': '退出登录',
    'My Client Files': '我的客户档案',
    'Staff Officer 1 Desk': '一级参谋官工作台',
    'Admin Console': '管理员控制台',
    'Download as PDF': '下载 PDF',
    'Print A4': '打印 A4',
    'Download HTML': '下载 HTML',
    'Invoice': '商业发票',
    'QR Receipt': '二维码收据'
  },

  FR: {
    // Global & Independence Bar
    'Independent due diligence and field verification. We do not buy, sell, or broker gold.':
      'Diligence raisonnable indépendante et vérification sur le terrain. Nous n’achetons, ne vendons ni ne négocions d’or.',
    'UGANDA GOLD': 'UGANDA GOLD',
    'EXPEDITION': 'EXPÉDITION',
    'Due Diligence & Field Verification': 'Diligence Raisonnable & Vérification Terrain',
    'Expeditions': 'Expéditions',
    'Offer Verification': 'Vérification d’Offre',
    'Risk & Compliance': 'Risques & Conformité',
    'About': 'À Propos',
    'Insights': 'Analyses',
    'Client Portal': 'Portail Client',
    'Verify an Offer': 'Vérifier une Offre',
    'Verify a Gold Offer': 'Vérifier une Offre d’Or',
    'Explore the 7-Day Expedition': 'Explorer l’Expédition de 7 Jours',
    'Start Verification': 'Lancer la Vérification',
    'Explore Expeditions': 'Explorer les Expéditions',
    'Start Application': 'Démarrer la Candidature',
    'Active gold offer or visit?': 'Offre d’or active ou visite terrain ?',
    '24–72h Verification · 7-Day Expedition': 'Vérification 24–72h · Expédition de 7 Jours',

    // Homepage Hero & Pathways
    'Kampala & Entebbe, Uganda · Independent Advisory':
      'Kampala & Entebbe, Ouganda · Conseil Indépendant',
    'Verify the offer. Understand the supply chain. Before you commit capital.':
      'Vérifiez l’offre. Comprenez la chaîne d’approvisionnement. Avant d’engager vos capitaux.',
    'Independent document verification for active gold offers, and structured field expeditions across Uganda’s gold supply chain.':
      'Vérification documentaire indépendante pour les offres d’or actives et expéditions structurées sur le terrain à travers la chaîne d’approvisionnement aurifère en Ouganda.',
    'What brings you here?': 'Quelle est votre situation actuelle ?',
    'Select the pathway that matches your current situation.':
      'Sélectionnez le parcours correspondant à votre besoin actuel.',
    'I have received an offer': 'J’ai reçu une offre d’or',
    'Verify documents, licensing, and counterparty claims before committing funds.':
      'Vérifiez les documents, les licences minières et les déclarations de la contrepartie avant d’engager des fonds.',
    'Review Verification Process': 'Voir le Processus de Vérification',
    'I want to conduct field due diligence': 'Je souhaite mener une diligence sur le terrain',
    'Explore a structured, in-person supply-chain expedition.':
      'Découvrez une expédition structurée en personne sur la chaîne d’approvisionnement.',
    'Explore 7-Day Programmes': 'Explorer les Programmes de 7 Jours',
    'I represent an institution or research group':
      'Je représente une institution ou un groupe de recherche',
    'Arrange a tailored delegation, research programme, or confidential briefing.':
      'Organisez une délégation sur mesure, un programme de recherche ou un briefing confidentiel.',
    'Institutional & Academic Options': 'Options Institutionnelles & Académiques',

    // Two-Service Comparison
    'Two clear ways we work with you': 'Deux modes d’intervention clairs à vos côtés',
    'Whether you need to evaluate a specific set of documents this week or understand the physical market on the ground, our services are structured with defined scope and deliverables.':
      'Que vous deviez évaluer un dossier documentaire précis cette semaine ou comprendre le marché physique sur place, nos services offrent un périmètre et des livrables clairement définis.',
    'Service 01 · Remote': 'Service 01 · À Distance',
    '24–72-Hour Verification': 'Vérification en 24 à 72 Heures',
    'Remote starting point for buyers holding an active offer, license, or contract.':
      'Point de départ à distance pour les acheteurs disposant d’une offre active, d’une licence ou d’un contrat.',
    'Service 02 · In-Person': 'Service 02 · Sur le Terrain',
    '7-Day Expedition': 'Expédition de 7 Jours',
    'In-person field programme across Entebbe, Kampala, Mubende, and Busia.':
      'Programme de terrain en personne à travers Entebbe, Kampala, Mubende et Busia.',
    'How 24–72-hour verification works': 'Comment fonctionne la vérification en 24–72 heures',
    'A structured three-step review before you travel or enter transaction negotiations.':
      'Un examen structuré en trois étapes avant de voyager ou d’entamer des négociations commerciales.',
    'Full 24–72-hour verification specifications →':
      'Spécifications complètes de la vérification 24–72h →',
    '1. Submit': '1. Soumettre',
    '2. Verify': '2. Vérifier',
    '3. Decide': '3. Décider',

    // 7-Day Preview & Leadership
    'Inside the 7-day supply-chain expedition':
      'Aperçu de l’expédition de 7 jours sur la chaîne d’approvisionnement',
    'Select any day below to preview the focus area and participant outcome.':
      'Sélectionnez un jour ci-dessous pour prévisualiser le thème et les acquis pour les participants.',
    'View Full 7-Day Itinerary': 'Voir l’Itinéraire Complet de 7 Jours',
    'Compare Expedition Packages': 'Comparer les Forfaits d’Expédition',
    'Independence, methodology, and field leadership':
      'Indépendance, méthodologie et direction des opérations',
    'Why our assessments remain objective': 'Pourquoi nos évaluations restent objectives',
    'Leadership & Specialist Team': 'Direction & Équipe d’Experts',
    'Full team & methodology →': 'Équipe complète et méthodologie →',
    'Decide your next step with clear evidence':
      'Décidez de votre prochaine étape sur la base de preuves vérifiées',

    // Common Page Headers & Actions
    'Submit Documents for Verification': 'Soumettre des Documents pour Vérification',
    'Frequently Asked Questions': 'Foire Aux Questions (FAQ)',
    'Contact & Executive Briefings': 'Contact & Briefings Exécutifs',
    'Expedition Application': 'Candidature à l’Expédition',
    'Services & Programmes': 'Services & Programmes',
    'Risk & Intelligence': 'Risques & Intelligence Réglementaire',
    'Governance & Support': 'Gouvernance & Support',
    'Staff Sign-In': 'Accès Personnel',
    'Administration': 'Administration',
    'Sign Out': 'Déconnexion',
    'My Client Files': 'Mes Dossiers Clients',
    'Staff Officer 1 Desk': 'Bureau Officier d’État-Major 1',
    'Admin Console': 'Console d’Administration',
    'Download as PDF': 'Télécharger en PDF',
    'Print A4': 'Imprimer A4',
    'Download HTML': 'Télécharger HTML',
    'Invoice': 'Facture',
    'QR Receipt': 'Reçu QR'
  }
};

const STORAGE_PREFIX = 'uge_site_autotranslate_v2_';

// WeakMaps to store original English text for every DOM Text node and Element attribute
const originalTextNodeMap = new WeakMap<Text, string>();
const lastTranslatedValueMap = new WeakMap<Text, string>();
const originalAttrMap = new WeakMap<Element, Record<string, string>>();

// In-memory runtime cache initialized from INSTANT_DICTIONARY + localStorage
const runtimeCache: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  AR: { ...INSTANT_DICTIONARY.AR },
  ZH: { ...INSTANT_DICTIONARY.ZH },
  FR: { ...INSTANT_DICTIONARY.FR }
};

function loadPersistedCache(lang: Exclude<Language, 'EN'>) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${lang}`);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, string>;
      Object.assign(runtimeCache[lang], parsed, INSTANT_DICTIONARY[lang]);
    }
  } catch {
    // Ignore storage read errors
  }
}

function savePersistedCache(lang: Exclude<Language, 'EN'>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(runtimeCache[lang]));
  } catch {
    // Ignore storage quota errors
  }
}

// Initialize caches on module load
if (typeof window !== 'undefined') {
  loadPersistedCache('AR');
  loadPersistedCache('ZH');
  loadPersistedCache('FR');
}

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'CODE',
  'PRE',
  'SVG',
  'PATH',
  'TEXTAREA',
  'INPUT'
]);

function shouldSkipText(str: string): boolean {
  const trimmed = str.trim();
  if (!trimmed || trimmed.length < 2) return true;
  // Skip pure numbers, currencies, dates, emails, URLs, or reference codes
  if (/^[\d\s.,:$€£¥%+–—/()-]+$/.test(trimmed)) return true;
  if (/^(https?:\/\/|www\.|[^\s@]+@[^\s@]+\.[^\s@]+)$/i.test(trimmed)) return true;
  if (/^(DOC-VER-|REG-2027-|UGE-|INV-UGE-|RCT-UGE-|URA TIN)/i.test(trimmed)) return true;
  if (/^(EN|AR|ZH|FR|USD|EUR|AED|GBP|CNY|UGX)$/.test(trimmed)) return true;
  return false;
}

function shouldSkipNode(node: Node): boolean {
  let curr: Node | null = node.parentNode;
  while (curr && curr.nodeType === Node.ELEMENT_NODE) {
    const el = curr as HTMLElement;
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.getAttribute('data-no-translate') === 'true') return true;
    if (el.getAttribute('translate') === 'no') return true;
    curr = curr.parentNode;
  }
  return false;
}

function applyTranslationPreservingWhitespace(rawNodeText: string, translatedTrimmed: string): string {
  const leadingMatch = rawNodeText.match(/^\s*/);
  const trailingMatch = rawNodeText.match(/\s*$/);
  const leading = leadingMatch ? leadingMatch[0] : '';
  const trailing = trailingMatch ? trailingMatch[0] : '';
  return `${leading}${translatedTrimmed}${trailing}`;
}

interface SiteAutoTranslatorProps {
  currentLang: Language;
  currentPath: string;
  onStatusChange?: (isTranslating: boolean) => void;
}

export const SiteAutoTranslator: React.FC<SiteAutoTranslatorProps> = ({
  currentLang,
  currentPath,
  onStatusChange
}) => {
  const [, setTick] = useState(0);
  const inFlightStringsRef = useRef<Set<string>>(new Set());
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.lang =
      currentLang === 'AR'
        ? 'ar'
        : currentLang === 'ZH'
        ? 'zh-CN'
        : currentLang === 'FR'
        ? 'fr'
        : 'en';

    const restoreAllToEnglish = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let currentNode = walker.nextNode();
      while (currentNode) {
        const textNode = currentNode as Text;
        const orig = originalTextNodeMap.get(textNode);
        if (orig !== undefined && textNode.nodeValue !== orig) {
          textNode.nodeValue = orig;
          lastTranslatedValueMap.set(textNode, orig);
        }
        currentNode = walker.nextNode();
      }

      const elementsWithAttrs = document.body.querySelectorAll('[placeholder], [title], [aria-label]');
      elementsWithAttrs.forEach((el) => {
        const saved = originalAttrMap.get(el);
        if (!saved) return;
        if (saved.placeholder && el.getAttribute('placeholder') !== saved.placeholder) {
          el.setAttribute('placeholder', saved.placeholder);
        }
        if (saved.title && el.getAttribute('title') !== saved.title) {
          el.setAttribute('title', saved.title);
        }
        if (saved.ariaLabel && el.getAttribute('aria-label') !== saved.ariaLabel) {
          el.setAttribute('aria-label', saved.ariaLabel);
        }
      });
    };

    if (currentLang === 'EN') {
      restoreAllToEnglish();
      onStatusChange?.(false);
      return;
    }

    const targetLang = currentLang as Exclude<Language, 'EN'>;
    const dict = runtimeCache[targetLang];

    const scanAndTranslateDOM = async () => {
      const uncachedMap = new Map<string, Text[]>();
      const uncachedAttrList: Array<{ el: Element; attr: string; source: string }> = [];

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let currentNode = walker.nextNode();

      while (currentNode) {
        const textNode = currentNode as Text;
        if (!shouldSkipNode(textNode)) {
          const currentVal = textNode.nodeValue || '';
          const lastSetVal = lastTranslatedValueMap.get(textNode);

          // If React updated this text node with new English content, update originalTextNodeMap
          if (!originalTextNodeMap.has(textNode) || (lastSetVal !== undefined && currentVal !== lastSetVal)) {
            originalTextNodeMap.set(textNode, currentVal);
          }

          const origRaw = originalTextNodeMap.get(textNode) || currentVal;
          const origTrimmed = origRaw.trim();

          if (!shouldSkipText(origTrimmed)) {
            const cachedTranslation = dict[origTrimmed];
            if (cachedTranslation) {
              const formatted = applyTranslationPreservingWhitespace(origRaw, cachedTranslation);
              if (textNode.nodeValue !== formatted) {
                textNode.nodeValue = formatted;
              }
              lastTranslatedValueMap.set(textNode, formatted);
            } else {
              const existingList = uncachedMap.get(origTrimmed) || [];
              existingList.push(textNode);
              uncachedMap.set(origTrimmed, existingList);
            }
          }
        }
        currentNode = walker.nextNode();
      }

      // Translate input placeholders and button titles
      const elementsWithAttrs = document.body.querySelectorAll('[placeholder], [title]');
      elementsWithAttrs.forEach((el) => {
        if ((el as HTMLElement).getAttribute('data-no-translate') === 'true') return;
        let saved = originalAttrMap.get(el);
        if (!saved) {
          saved = {
            placeholder: el.getAttribute('placeholder') || '',
            title: el.getAttribute('title') || '',
            ariaLabel: el.getAttribute('aria-label') || ''
          };
          originalAttrMap.set(el, saved);
        }

        (['placeholder', 'title'] as const).forEach((attrName) => {
          const origVal = saved![attrName]?.trim();
          if (origVal && !shouldSkipText(origVal)) {
            const cached = dict[origVal];
            if (cached) {
              if (el.getAttribute(attrName) !== cached) {
                el.setAttribute(attrName, cached);
              }
            } else {
              uncachedAttrList.push({ el, attr: attrName, source: origVal });
            }
          }
        });
      });

      // Collect all unique strings not yet in flight
      const stringsToRequest: string[] = [];
      uncachedMap.forEach((_nodes, str) => {
        if (!inFlightStringsRef.current.has(`${targetLang}:${str}`)) {
          stringsToRequest.push(str);
        }
      });
      uncachedAttrList.forEach(({ source }) => {
        if (
          !stringsToRequest.includes(source) &&
          !inFlightStringsRef.current.has(`${targetLang}:${source}`)
        ) {
          stringsToRequest.push(source);
        }
      });

      if (stringsToRequest.length === 0) {
        onStatusChange?.(false);
        return;
      }

      onStatusChange?.(true);

      // Process in batches of 45 strings for fast, reliable response
      const BATCH_SIZE = 45;
      for (let i = 0; i < stringsToRequest.length; i += BATCH_SIZE) {
        const chunk = stringsToRequest.slice(i, i + BATCH_SIZE);
        chunk.forEach((s) => inFlightStringsRef.current.add(`${targetLang}:${s}`));

        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetLang,
              texts: chunk
            })
          });
          const data = await res.json();
          if (data.success && data.translations) {
            const received = data.translations as Record<string, string>;
            Object.entries(received).forEach(([src, translated]) => {
              if (translated) {
                runtimeCache[targetLang][src] = translated;
              }
            });
            savePersistedCache(targetLang);

            // Apply newly received translations to live DOM nodes
            chunk.forEach((src) => {
              const translated = runtimeCache[targetLang][src];
              if (!translated) return;
              const nodes = uncachedMap.get(src) || [];
              nodes.forEach((tNode) => {
                const origRaw = originalTextNodeMap.get(tNode) || tNode.nodeValue || src;
                const formatted = applyTranslationPreservingWhitespace(origRaw, translated);
                if (tNode.nodeValue !== formatted) {
                  tNode.nodeValue = formatted;
                }
                lastTranslatedValueMap.set(tNode, formatted);
              });
            });

            uncachedAttrList.forEach(({ el, attr, source }) => {
              const translated = runtimeCache[targetLang][source];
              if (translated && el.getAttribute(attr) !== translated) {
                el.setAttribute(attr, translated);
              }
            });
          }
        } catch {
          // Ignore network errors and retain original English text gracefully
        } finally {
          chunk.forEach((s) => inFlightStringsRef.current.delete(`${targetLang}:${s}`));
        }
      }

      onStatusChange?.(false);
      setTick((t) => t + 1);
    };

    // Run immediately on route or language change
    scanAndTranslateDOM();

    // Observe DOM mutations (such as switching tabs, opening modals, expanding accordions)
    const observer = new MutationObserver(() => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        scanAndTranslateDOM();
      }, 120);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentLang, currentPath, onStatusChange]);

  return null;
};
