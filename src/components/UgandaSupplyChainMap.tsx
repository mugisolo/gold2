import React, { useState } from 'react';
import {
  MapPin,
  Pickaxe,
  Flame,
  ShieldAlert,
  PlaneTakeoff,
  Navigation,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Compass
} from 'lucide-react';
import { Language } from '../types';

export interface MapNode {
  id: string;
  code: string;
  category: 'mining' | 'hub' | 'export' | 'border_checkpoint';
  linkedStageIndex: number; // 0 to 4 mapping to SupplyChainPipeline steps
  coordinates: { x: number; y: number }; // SVG viewBox 0..800 x 0..560
  gps: string;
  elevation: string;
  purityRange: string;
  annualOutputEstimate: string;
  localized: Record<
    Language,
    {
      name: string;
      region: string;
      role: string;
      geologyOrFunction: string;
      transitRouteSummary: string;
      dueDiligenceProtocol: string;
      riskAlert: string;
    }
  >;
}

export interface TransitRoute {
  id: string;
  code: string;
  fromNodeId: string;
  toNodeId: string;
  type: 'primary_ore' | 'eastern_industrial' | 'northern_alluvial' | 'armored_export' | 'border_risk';
  distanceKm: string;
  securityProtocol: string;
  pathD: string;
  linkedStageIndices: number[];
  localized: Record<
    Language,
    {
      name: string;
      mode: string;
      description: string;
    }
  >;
}

const UGANDA_MAP_NODES: MapNode[] = [
  {
    id: 'mubende-kassanda',
    code: 'MUB-01',
    category: 'mining',
    linkedStageIndex: 0,
    coordinates: { x: 315, y: 315 },
    gps: '0.5580° N, 31.3950° E',
    elevation: '1,340m ASL',
    purityRange: '88% – 94% Raw Alluvial & Reef',
    annualOutputEstimate: 'High-Yield Artisanal & SSM Concessions',
    localized: {
      EN: {
        name: 'Mubende – Kassanda Gold Belt',
        region: 'Central-Western Uganda (Kitumbi & Bukuya)',
        role: 'Primary Artisanal & Small-Scale Extraction (Stage 01)',
        geologyOrFunction: 'Proterozoic Birimian-equivalent shear zones, quartz-vein reefs, and high-grade eluvial/alluvial placers.',
        transitRouteSummary: 'Direct 155 km armored highway transit east via Mityana to Kampala MDL consolidation vaults.',
        dueDiligenceProtocol: 'Verify active DGSM Artisanal or Location License (Mining Act 2022) & Biometric Miner Association Registry.',
        riskAlert: 'Unlicensed syndicate pitheads frequently stage fake "tribal sovereign" stockpiles here using brass-plated bars.'
      },
      AR: {
        name: 'حزام الذهب موبيندي – كاساندا',
        region: 'وسط غرب أوغندا (كيتومبي وبوكويا)',
        role: 'الاستخراج الحرفي والصغير الرئيسي (المرحلة 01)',
        geologyOrFunction: 'عروق الكوارتز الحاملة للذهب والرواسب الغرينية عالية النقاوة.',
        transitRouteSummary: 'نقل بري مدرع بطول 155 كم شرقاً عبر ميتيانا إلى خزائن التجميع في كمبالا.',
        dueDiligenceProtocol: 'التحقق من رخصة التعدين النشطة من DGSM وسجل جمعيات المعدنين البيومتري.',
        riskAlert: 'تقوم النقابات غير المرخصة غالباً بتمثيل مخزونات وهمية هنا باستخدام سبائك مطلية بالنحاس.'
      },
      ZH: {
        name: '穆本德 – 卡桑达黄金带 (Mubende-Kassanda)',
        region: '乌干达中西部 (Kitumbi & Bukuya)',
        role: '核心手工与小规模采矿区 (阶段 01)',
        geologyOrFunction: '元古代剪切带石英脉矿床及高品位残积/冲积砂金矿。',
        transitRouteSummary: '经 Mityana 向东 155 公里装甲公路直达坎帕拉持牌集中金库。',
        dueDiligenceProtocol: '核实 2022《矿业法》下的 DGSM 有效采矿许可证及矿工协会生物识别登记。',
        riskAlert: '无证团伙经常在此使用镀铜假金条伪造所谓的“部落主权库存”。'
      },
      FR: {
        name: 'Ceinture Aurifère de Mubende – Kassanda',
        region: 'Centre-Ouest de l’Ouganda (Kitumbi & Bukuya)',
        role: 'Extraction Artisanale et à Petite Échelle (Étape 01)',
        geologyOrFunction: 'Zones de cisaillement filoniennes de quartz et placers alluviaux à haute teneur.',
        transitRouteSummary: 'Transit routier blindé de 155 km vers l’est via Mityana jusqu’aux coffres de Kampala.',
        dueDiligenceProtocol: 'Vérifier la licence DGSM active (Loi Minière 2022) et le registre biométrique des mineurs.',
        riskAlert: 'Des syndicats sans licence mettent souvent en scène de faux stocks ici avec des barres plaquées laiton.'
      }
    }
  },
  {
    id: 'buhweju-ankole',
    code: 'BUH-01',
    category: 'mining',
    linkedStageIndex: 0,
    coordinates: { x: 215, y: 410 },
    gps: '0.3500° S, 30.3000° E',
    elevation: '1,680m ASL',
    purityRange: '91% – 96% High-Purity Alluvial Nuggets',
    annualOutputEstimate: 'Historic High-Purity Placer Basin',
    localized: {
      EN: {
        name: 'Buhweju – Ankole Goldfields',
        region: 'South-Western Uganda (Buhweju & Ibanda)',
        role: 'High-Purity Alluvial & Gorge Extraction (Stage 01)',
        geologyOrFunction: 'Paleoproterozoic Karagwe-Ankolean system hosting Uganda’s highest natural fineness alluvial gold.',
        transitRouteSummary: '310 km South-Western transit corridor via Mbarara and Masaka to Kampala smelting hubs.',
        dueDiligenceProtocol: 'Inspect physical sluice concentrates and DGSM Certificate of Origin before aggregation in Mbarara/Kampala.',
        riskAlert: 'Watch for cross-border DRC gold commingled without ICGLR regional certification.'
      },
      AR: {
        name: 'حقول ذهب بوهويجو – أنكولي',
        region: 'جنوب غرب أوغندا (بوهويجو وإيباندا)',
        role: 'استخراج الذهب الغريني عالي النقاوة (المرحلة 01)',
        geologyOrFunction: 'نظام جيولوجي يحتوي على أعلى نقاوة طبيعية للذهب الغريني في أوغندا.',
        transitRouteSummary: 'ممر نقل بطول 310 كم عبر مبارارا وماساكا إلى مصاهر كمبالا.',
        dueDiligenceProtocol: 'فحص مركزات الذهب الطبيعية وشهادة المنشأ من DGSM قبل التجميع.',
        riskAlert: 'احذر من خلط ذهب الكونغو العابر للحدود دون شهادة ICGLR الإقليمية.'
      },
      ZH: {
        name: '布韦朱 – 安科莱金矿田 (Buhweju-Ankole)',
        region: '乌干达西南部 (Buhweju & Ibanda)',
        role: '高纯度冲积砂金开采区 (阶段 01)',
        geologyOrFunction: '古元古代 Karagwe-Ankolean 成矿系，产出乌干达天然成色最高的冲积砂金。',
        transitRouteSummary: '经姆巴拉拉 (Mbarara) 和马萨卡 (Masaka) 310 公里西南走廊运往坎帕拉冶炼中心。',
        dueDiligenceProtocol: '在集货前核验物理溜槽精矿与 DGSM 原产地证书。',
        riskAlert: '警惕未附带 ICGLR 区域认证而混入的刚果(金)跨境黄金。'
      },
      FR: {
        name: 'Champs Aurifères de Buhweju – Ankole',
        region: 'Sud-Ouest de l’Ouganda (Buhweju & Ibanda)',
        role: 'Extraction Alluviale de Haute Pureté (Étape 01)',
        geologyOrFunction: 'Système Karagwe-Ankoléen abritant l’or alluvial naturel le plus pur d’Ouganda.',
        transitRouteSummary: 'Corridor sud-ouest de 310 km via Mbarara et Masaka vers les fonderies de Kampala.',
        dueDiligenceProtocol: 'Inspecter les concentrés physiques et le certificat d’origine DGSM avant agrégation.',
        riskAlert: 'Attention à l’or transfrontalier de RDC mélangé sans certification régionale CIRGL (ICGLR).'
      }
    }
  },
  {
    id: 'busia-wagagai',
    code: 'BUS-01',
    category: 'mining',
    linkedStageIndex: 0,
    coordinates: { x: 565, y: 345 },
    gps: '0.4667° N, 34.0900° E',
    elevation: '1,210m ASL',
    purityRange: '86% – 92% Hard-Rock Doré & CIL Bullion',
    annualOutputEstimate: 'Industrial Open-Pit & Leaching Belt',
    localized: {
      EN: {
        name: 'Busia – Wagagai Greenstone Belt',
        region: 'Eastern Uganda (Busia, Bugiri & Namayingo)',
        role: 'Industrial Hard-Rock & CIL Leaching Corridor (Stage 01)',
        geologyOrFunction: 'Archean Nyanzian greenstone belt extension from Lake Victoria goldfields; hosts major industrial CIL operations.',
        transitRouteSummary: '205 km Eastern highway corridor via Jinja & Iganga directly to Kampala Industrial Area refineries.',
        dueDiligenceProtocol: 'Audit industrial Mining Lease (ML) coordinates, environmental compliance, and primary smelter pour logs.',
        riskAlert: 'Fraudsters impersonate major Busia industrial mines using cloned websites and forged warehouse receipts.'
      },
      AR: {
        name: 'حزام بوسيا – واغاغاي للصخور الخضراء',
        region: 'شرق أوغندا (بوسيا وبوغيري وناماينغو)',
        role: 'ممر التعدين الصناعي والصخور الصلبة (المرحلة 01)',
        geologyOrFunction: 'امتداد حزام الصخور الخضراء الأركي من حقول بحيرة فيكتوريا؛ يضم عمليات صناعية كبرى.',
        transitRouteSummary: 'ممر طريق سريع بطول 205 كم عبر جينجا وإيغانغا مباشرة إلى مصافي المنطقة الصناعية بكمبالا.',
        dueDiligenceProtocol: 'تدقيق إحداثيات عقد الإيجار التعديني الصناعي (ML) وسجلات الصب الأولية.',
        riskAlert: 'ينتحل المحتالون صفة مناجم بوسيا الصناعية الكبرى باستخدام مواقع مستنسخة وإيصالات مزورة.'
      },
      ZH: {
        name: '布西亚 – 瓦加盖绿岩带 (Busia-Wagagai)',
        region: '乌干达东部 (Busia, Bugiri & Namayingo)',
        role: '工业级硬岩开采与碳浸法 (CIL) 走廊 (阶段 01)',
        geologyOrFunction: '维多利亚湖金矿带延伸的太古代绿岩带，拥有大型工业级采选冶一体化项目。',
        transitRouteSummary: '经金贾 (Jinja) 205 公里东部干线直达坎帕拉工业区精炼厂。',
        dueDiligenceProtocol: '核查工业采矿租约 (ML) 坐标、环评合规性及原生熔炼浇铸记录。',
        riskAlert: '诈骗分子常克隆布西亚大型矿企网站并伪造仓库仓单进行欺诈。'
      },
      FR: {
        name: 'Ceinture de Roches Vertes Busia – Wagagai',
        region: 'Est de l’Ouganda (Busia, Bugiri & Namayingo)',
        role: 'Corridor Industriel Roche Dure & Lixiviation CIL (Étape 01)',
        geologyOrFunction: 'Extension de la ceinture de roches vertes archéennes du lac Victoria ; opérations industrielles majeures.',
        transitRouteSummary: 'Corridor routier est de 205 km via Jinja et Iganga vers la zone industrielle de Kampala.',
        dueDiligenceProtocol: 'Auditer les coordonnées du bail minier industriel (ML) et les registres de coulée primaire.',
        riskAlert: 'Les escrocs usurpent l’identité des grandes mines de Busia avec de faux récépissés d’entrepôt.'
      }
    }
  },
  {
    id: 'karamoja-moroto',
    code: 'KAR-01',
    category: 'mining',
    linkedStageIndex: 0,
    coordinates: { x: 590, y: 145 },
    gps: '2.5345° N, 34.6666° E',
    elevation: '1,385m ASL',
    purityRange: '85% – 93% Alluvial & Shear-Zone Gold',
    annualOutputEstimate: 'Frontier Exploration & Cooperative Concessions',
    localized: {
      EN: {
        name: 'Karamoja Mineral Belt (Moroto & Nakapiripirit)',
        region: 'North-Eastern Uganda (Rupa, Acerer & Lotisan)',
        role: 'Frontier Alluvial & Cooperative Extraction (Stage 01)',
        geologyOrFunction: 'Neoproterozoic Mozambique Belt metamorphic terrains with widespread alluvial and eluvial gold mineralization.',
        transitRouteSummary: '460 km Northern-Eastern transit route via Soroti and Mbale to Kampala licensed buying houses.',
        dueDiligenceProtocol: 'Confirm DGSM Location Licenses and local cooperative chain-of-custody logs prior to regional dispatch.',
        riskAlert: 'High remoteness makes paper-only "Karamoja gold offers" a frequent cover for non-existent cargo.'
      },
      AR: {
        name: 'حزام معادن كاراموجا (موروتو وناكابيريبيريت)',
        region: 'شمال شرق أوغندا (روبا ولوتيسان)',
        role: 'الاستخراج التعاوني والغريني الحدودي (المرحلة 01)',
        geologyOrFunction: 'تضاريس متحولة غنية بتمعدن الذهب الغريني والسطحي.',
        transitRouteSummary: 'مسار نقل بطول 460 كم عبر سوروتي ومبالي إلى دور الشراء المرخصة في كمبالا.',
        dueDiligenceProtocol: 'تأكيد تراخيص الموقع من DGSM وسجلات سلسلة الحيازة التعاونية المحلية.',
        riskAlert: 'بعد المسافة يجعل العروض الورقية من كاراموجا غطاءً شائعاً لشحنات غير موجودة.'
      },
      ZH: {
        name: '卡拉莫贾成矿带 (Karamoja - Moroto)',
        region: '乌干达东北部 (Rupa, Acerer & Lotisan)',
        role: '前沿冲积矿与合作社采矿区 (阶段 01)',
        geologyOrFunction: '新元古代莫桑比克变质带，广泛分布冲积与残积金矿化。',
        transitRouteSummary: '经索罗提 (Soroti) 和姆巴莱 (Mbale) 460 公里东北路线运往坎帕拉持牌收购商。',
        dueDiligenceProtocol: '在发运前核实 DGSM 采矿定位许可及当地合作社监管链日志。',
        riskAlert: '由于地处偏远，仅凭纸面文件的“卡拉莫贾低价金报价”往往是虚构货物的骗局。'
      },
      FR: {
        name: 'Ceinture Minérale du Karamoja (Moroto)',
        region: 'Nord-Est de l’Ouganda (Rupa & Lotisan)',
        role: 'Extraction Coopérative et Alluviale Frontalière (Étape 01)',
        geologyOrFunction: 'Terrains métamorphiques de la ceinture du Mozambique avec minéralisation aurifère alluviale.',
        transitRouteSummary: 'Route nord-est de 460 km via Soroti et Mbale vers les comptoirs agréés de Kampala.',
        dueDiligenceProtocol: 'Confirmer les licences DGSM et les registres de chaîne de traçabilité des coopératives.',
        riskAlert: 'L’éloignement géographique fait des offres papier du Karamoja une couverture fréquente pour des cargaisons fictives.'
      }
    }
  },
  {
    id: 'kampala-hub',
    code: 'KLA-02/03/04',
    category: 'hub',
    linkedStageIndex: 2, // Links to Stage 02 (Consolidation), Stage 03 (Smelting & Assay), Stage 04 (URA Customs)
    coordinates: { x: 425, y: 355 },
    gps: '0.3136° N, 32.5811° E',
    elevation: '1,190m ASL',
    purityRange: '96.5% Doré → 99.9% Refined Bullion',
    annualOutputEstimate: 'National Aggregation, Smelting & URA Customs Hub',
    localized: {
      EN: {
        name: 'Kampala Consolidation, Smelting & URA Customs Hub',
        region: 'Kampala Metropolitan (Amber House & Industrial Area)',
        role: 'MDL Consolidation (02), Fire Assay Smelting (03) & URA ASYCUDA (04)',
        geologyOrFunction: 'Houses licensed Mineral Dealer (MDL) vaults, induction smelting & ISO 11426 fire-assay labs, and URA Customs HQ.',
        transitRouteSummary: 'Receives ore from all 4 mining belts; dispatches sealed bullion 40 km south via Entebbe Expressway to EBB Airport.',
        dueDiligenceProtocol: 'Witness induction melting & drill-core sampling in person; verify live URA ASYCUDA C-Number & 5% export levy receipt.',
        riskAlert: '85% of gold scams occur in rented Kampala offices using surface-plated tungsten bars and forged XRF printouts.'
      },
      AR: {
        name: 'مركز كمبالا للتجميع والصهر وجمارك URA',
        region: 'العاصمة كمبالا (أمبر هاوس والمنطقة الصناعية)',
        role: 'تجميع التجار (02)، الصهر والمعايرة بالنار (03) وجمارك URA (04)',
        geologyOrFunction: 'يضم خزائن تجار المعادن المرخصين، ومختبرات الصهر والمعايرة الحرارية ISO 11426، ومقر جمارك URA.',
        transitRouteSummary: 'يستقبل الخام من أحزمة التعدين الأربعة؛ ويرسل السبائك المختومة 40 كم جنوباً عبر طريق عنتيبي السريع إلى المطار.',
        dueDiligenceProtocol: 'حضور الصهر بالحث وأخذ عينات الحفر شخصياً؛ والتحقق من رقم C-Number في نظام URA ASYCUDA وإيصال ضريبة 5%.',
        riskAlert: 'تحدث 85% من عمليات الاحتيال في مكاتب مستأجرة بكمبالا باستخدام سبائك تنغستن مطلية وتقارير XRF مزورة.'
      },
      ZH: {
        name: '坎帕拉集货、火法冶炼与 URA 海关枢纽 (Kampala Hub)',
        region: '坎帕拉首都区 (Amber House 及工业区)',
        role: '持牌商集货 (02)、火法试金熔炼 (03) 及 URA 海关清算 (04)',
        geologyOrFunction: '汇集持牌矿产商 (MDL) 金库、中频感应熔炼炉、ISO 11426 火法试金实验室及乌干达税务局 (URA) 总部。',
        transitRouteSummary: '接收四大矿区原金；经坎帕拉-恩德培高速向南 40 公里装甲押运至恩德培国际机场。',
        dueDiligenceProtocol: '现场见证感应熔炼与钻芯取样；在 URA ASYCUDA 系统中核验 C-Number 报关单及 5% 出口税完税凭证。',
        riskAlert: '85% 的黄金诈骗发生在坎帕拉临时租用的办公室内，使用表面镀金的钨芯假条和伪造的 XRF 检测单。'
      },
      FR: {
        name: 'Hub de Kampala : Consolidation, Fonderie & Douanes URA',
        region: 'Kampala Métropole (Amber House & Zone Industrielle)',
        role: 'Consolidation MDL (02), Fusion & Essai au Feu (03), Douanes URA (04)',
        geologyOrFunction: 'Abrite les coffres des négociants agréés (MDL), les fonderies à induction, les labos ISO 11426 et le siège URA.',
        transitRouteSummary: 'Reçoit l’or des 4 régions minières ; expédie les lingots scellés à 40 km au sud via l’autoroute vers Entebbe.',
        dueDiligenceProtocol: 'Assister à la fusion par induction et au carottage ; vérifier le numéro C ASYCUDA URA et la taxe de 5%.',
        riskAlert: '85% des fraudes ont lieu dans des bureaux loués à Kampala avec des barres de tungstène plaquées.'
      }
    }
  },
  {
    id: 'entebbe-airside',
    code: 'EBB-05',
    category: 'export',
    linkedStageIndex: 4,
    coordinates: { x: 405, y: 405 },
    gps: '0.0424° N, 32.4435° E',
    elevation: '1,153m ASL',
    purityRange: '99.5% – 99.99% Sealed Export Bullion',
    annualOutputEstimate: 'DGSM Sovereign Cadastre & EBB Airside Vault',
    localized: {
      EN: {
        name: 'Entebbe DGSM Sovereign Registry & EBB Bonded Airside Vault',
        region: 'Entebbe Peninsula (Lake Victoria Corridor)',
        role: 'Sovereign Cadastre Audit & Armored Tarmac Export (Stage 05)',
        geologyOrFunction: 'Headquarters of the Directorate of Geological Survey and Mines (DGSM), Free Zone refineries, and EBB Airport Customs Vault.',
        transitRouteSummary: 'Direct air-bridge dispatch via Emirates SkyCargo, Qatar Airways Cargo, or Turkish Cargo to Dubai (DMCC), Zurich & Istanbul.',
        dueDiligenceProtocol: 'Confirm DGSM Export Permit, ICGLR Certificate, and Sovereign Security Seal before armored handover at EBB tarmac.',
        riskAlert: 'Never wire funds against "airport customs seizure notices" — legitimate exports clear URA/DGSM prior to tarmac entry.'
      },
      AR: {
        name: 'سجل DGSM السيادي بعنتيبي وخزنة مطار EBB الجمركية',
        region: 'شبه جزيرة عنتيبي (ممر بحيرة فيكتوريا)',
        role: 'تدقيق السجل السيادي والتصدير المدرع عبر المطار (المرحلة 05)',
        geologyOrFunction: 'مقر مديرية المسح الجيولوجي والمناجم (DGSM)، مصافي المنطقة الحرة، وخزنة جمارك مطار عنتيبي الدولي.',
        transitRouteSummary: 'شحن جوي مباشر عبر طيران الإمارات للشحن أو القطرية للشحن إلى دبي (DMCC) وزيورخ وإسطنبول.',
        dueDiligenceProtocol: 'تأكيد تصريح التصدير من DGSM وشهادة ICGLR والختم الأمني السيادي قبل التسليم المدرع على مدرج المطار.',
        riskAlert: 'لا تقم أبداً بتحويل أموال مقابل "إشعارات حجز جمركي في المطار" — الصادرات القانونية تُخلص مسبقاً.'
      },
      ZH: {
        name: '恩德培 DGSM 主权矿权局与 EBB 机场保税金库 (Entebbe)',
        region: '恩德培半岛 (维多利亚湖走廊)',
        role: '主权矿权核查与停机坪装甲空运出口 (阶段 05)',
        geologyOrFunction: '乌干达地质调查与矿业局 (DGSM) 总部、自贸区精炼厂及恩德培国际机场 (EBB) 海关保税金库所在地。',
        transitRouteSummary: '通过阿联酋航空货运 (Emirates SkyCargo)、卡塔尔航空货运等直飞迪拜 (DMCC)、苏黎世及伊斯坦布尔。',
        dueDiligenceProtocol: '在恩德培停机坪装甲交接前，核验 DGSM 出口许可证、ICGLR 证书及主权防伪铅封。',
        riskAlert: '切勿轻信所谓的“机场海关扣货罚款通知”而汇款——合法出口在进入停机坪前已完成全部清关。'
      },
      FR: {
        name: 'Registre Souverain DGSM d’Entebbe & Coffre Aéroport EBB',
        region: 'Péninsule d’Entebbe (Corridor du Lac Victoria)',
        role: 'Audit du Cadastre Souverain & Exportation Tarmac Blindée (Étape 05)',
        geologyOrFunction: 'Siège de la Direction des Mines (DGSM), raffineries de la Zone Franche et coffre sous douane de l’aéroport EBB.',
        transitRouteSummary: 'Pont aérien direct via Emirates SkyCargo ou Qatar Cargo vers Dubaï (DMCC), Zurich et Istanbul.',
        dueDiligenceProtocol: 'Confirmer le permis d’exportation DGSM, le certificat CIRGL et le scellé souverain avant remise sur le tarmac.',
        riskAlert: 'Ne payez jamais pour de faux « avis de saisie douanière à l’aéroport ».'
      }
    }
  },
  {
    id: 'mpondwe-border',
    code: 'ICGLR-W',
    category: 'border_checkpoint',
    linkedStageIndex: 3,
    coordinates: { x: 165, y: 335 },
    gps: '0.0408° N, 29.7244° E',
    elevation: '1,180m ASL',
    purityRange: 'Cross-Border Transit Inspection Point',
    annualOutputEstimate: 'ICGLR & URA Western Border Monitor',
    localized: {
      EN: {
        name: 'Mpondwe – Kasese Western Border Checkpoint',
        region: 'Western Border (Uganda – DRC Frontier)',
        role: 'ICGLR Regional Certification & Anti-Smuggling Filter (Stage 04)',
        geologyOrFunction: 'Statutory URA & DGSM border inspection post enforcing OECD Due Diligence Guidance & ICGLR chain-of-custody.',
        transitRouteSummary: 'Monitors western transit corridor through Fort Portal / Kasese toward Kampala.',
        dueDiligenceProtocol: 'Reject any cargo claiming "unregistered DRC transit gold" lacking an authenticated ICGLR Regional Certificate.',
        riskAlert: 'Primary narrative vector for advance-fee scammers peddling fictional "rebel/customs impounded border gold."'
      },
      AR: {
        name: 'نقطة تفتيش مبوندوي – كاسيسي الحدودية الغربية',
        region: 'الحدود الغربية (أوغندا – الكونغو الديمقراطية)',
        role: 'شهادة ICGLR الإقليمية ومكافحة التهريب (المرحلة 04)',
        geologyOrFunction: 'مركز تفتيش حدودي قانوني تابع لـ URA وDGSM يطبق معايير منظمة التعاون الاقتصادي والتنمية (OECD).',
        transitRouteSummary: 'يراقب ممر العبور الغربي عبر فورت بورتال وكاسيسي باتجاه كمبالا.',
        dueDiligenceProtocol: 'رفض أي شحنة تدعي أنها "ذهب عبور غير مسجل" يفتقر إلى شهادة ICGLR الإقليمية المصدقة.',
        riskAlert: 'المسار الأكثر استخداماً في قصص المحتالين الذين يروجون لـ "ذهب محتجز على الحدود".'
      },
      ZH: {
        name: '姆庞德韦 – 卡塞塞西部边境检查站 (Mpondwe ICGLR)',
        region: '西部边境 (乌干达与刚果金交界)',
        role: 'ICGLR 区域认证与反走私核查哨 (阶段 04)',
        geologyOrFunction: 'URA 与 DGSM 法定边境检查站，严格执行 OECD 尽职调查指南与 ICGLR 矿产溯源机制。',
        transitRouteSummary: '监控经由波特尔堡 (Fort Portal) / 卡塞塞通往坎帕拉的西部跨境走廊。',
        dueDiligenceProtocol: '严禁触碰任何缺乏真实 ICGLR 区域认证、声称所谓“刚果金未申报过境黄金”的货源。',
        riskAlert: '预付费诈骗分子最常编造“边境海关扣押低价金”故事的高发节点。'
      },
      FR: {
        name: 'Poste Frontière Ouest de Mpondwe – Kasese',
        region: 'Frontière Ouest (Ouganda – RDC)',
        role: 'Certification Régionale CIRGL & Filtre Anti-Contrebande (Étape 04)',
        geologyOrFunction: 'Poste d’inspection frontalier URA & DGSM appliquant le guide OCDE et la traçabilité CIRGL.',
        transitRouteSummary: 'Surveille le corridor de transit ouest via Fort Portal / Kasese vers Kampala.',
        dueDiligenceProtocol: 'Rejeter toute cargaison revendiquant de « l’or de transit RDC non déclaré » sans certificat CIRGL.',
        riskAlert: 'Vecteur narratif principal des escrocs vendant de l’or fictif « bloqué à la frontière ».'
      }
    }
  }
];

const TRANSIT_ROUTES: TransitRoute[] = [
  {
    id: 'route-mubende-kampala',
    code: 'TR-CENTRAL-01',
    fromNodeId: 'mubende-kassanda',
    toNodeId: 'kampala-hub',
    type: 'primary_ore',
    distanceKm: '155 km',
    securityProtocol: 'DGSM Transit Pass + Armed Escort to MDL Vault',
    pathD: 'M 315 315 Q 370 320 425 355',
    linkedStageIndices: [0, 1, 2],
    localized: {
      EN: {
        name: 'Central Gold Belt Corridor (Mubende → Kampala)',
        mode: 'Armored Road Convoy (A109 Highway)',
        description: 'Primary movement of raw alluvial/reef doré from Mubende-Kassanda pitheads to Kampala licensed MDL consolidators.'
      },
      AR: {
        name: 'ممر حزام الذهب الأوسط (موبيندي ← كمبالا)',
        mode: 'قافلة برية مدرعة (طريق A109)',
        description: 'النقل الرئيسي للذهب الخام من مناجم موبيندي-كاساندا إلى المجمعين المرخصين في كمبالا.'
      },
      ZH: {
        name: '中部黄金走廊 (穆本德 → 坎帕拉)',
        mode: '装甲公路护卫车队 (A109 干线)',
        description: '将穆本德-卡桑达矿坑产出的原生合质金运往坎帕拉持牌矿产商 (MDL) 集中金库。'
      },
      FR: {
        name: 'Corridor Central (Mubende → Kampala)',
        mode: 'Convoi Routier Blindé (Autoroute A109)',
        description: 'Transport principal du doré brut des puits de Mubende-Kassanda vers les négociants agréés de Kampala.'
      }
    }
  },
  {
    id: 'route-buhweju-kampala',
    code: 'TR-SW-02',
    fromNodeId: 'buhweju-ankole',
    toNodeId: 'kampala-hub',
    type: 'primary_ore',
    distanceKm: '310 km',
    securityProtocol: 'Sealed Concentrate Canisters + GPS Telemetry',
    pathD: 'M 215 410 Q 320 400 425 355',
    linkedStageIndices: [0, 1, 2],
    localized: {
      EN: {
        name: 'Ankole – Masaka Bullion Artery (Buhweju → Kampala)',
        mode: 'Secured Bullion Carrier',
        description: 'Transports high-fineness alluvial nuggets from South-Western Ankole gorges to Kampala induction smelters.'
      },
      AR: {
        name: 'شريان أنكولي – ماساكا (بوهويجو ← كمبالا)',
        mode: 'ناقل سبائك مؤمن',
        description: 'ينقل شذرات الذهب الغريني عالي النقاوة من جنوب غرب أنكولي إلى مصاهر الحث في كمبالا.'
      },
      ZH: {
        name: '西南部砂金干线 (布韦朱 → 坎帕拉)',
        mode: 'GPS 铅封押运车',
        description: '将西南部安科莱峡谷的高成色自然砂金运送至坎帕拉中频感应熔炼厂。'
      },
      FR: {
        name: 'Artère Ankole – Masaka (Buhweju → Kampala)',
        mode: 'Transporteur de Lingots Sécurisé',
        description: 'Achemine les pépites alluviales de haute pureté du Sud-Ouest vers les fonderies de Kampala.'
      }
    }
  },
  {
    id: 'route-busia-kampala',
    code: 'TR-EAST-03',
    fromNodeId: 'busia-wagagai',
    toNodeId: 'kampala-hub',
    type: 'eastern_industrial',
    distanceKm: '205 km',
    securityProtocol: 'Industrial Mine Seal + URA Inland Transit Manifest',
    pathD: 'M 565 345 Q 495 340 425 355',
    linkedStageIndices: [0, 1, 2, 3],
    localized: {
      EN: {
        name: 'Eastern Greenstone Industrial Route (Busia → Kampala)',
        mode: 'Armored Industrial Bullion Van',
        description: 'Connects Busia/Wagagai industrial CIL plants across the Nile at Jinja to Kampala fire-assay labs and URA customs.'
      },
      AR: {
        name: 'المسار الصناعي الشرقي (بوسيا ← كمبالا)',
        mode: 'عربة سبائك صناعية مدرعة',
        description: 'يربط مصانع بوسيا/واغاغاي عبر النيل في جينجا بمختبرات المعايرة وجمارك URA في كمبالا.'
      },
      ZH: {
        name: '东部绿岩工业通道 (布西亚 → 坎帕拉)',
        mode: '工业级装甲运金车',
        description: '连接布西亚/瓦加盖工业级浸出厂，跨越金贾尼罗河大桥直达坎帕拉火法试金实验室与海关。'
      },
      FR: {
        name: 'Route Industrielle Est (Busia → Kampala)',
        mode: 'Fourgon Blindé Industriel',
        description: 'Relie les usines CIL de Busia/Wagagai via Jinja aux laboratoires d’essai et douanes de Kampala.'
      }
    }
  },
  {
    id: 'route-karamoja-kampala',
    code: 'TR-NE-04',
    fromNodeId: 'karamoja-moroto',
    toNodeId: 'kampala-hub',
    type: 'northern_alluvial',
    distanceKm: '460 km',
    securityProtocol: 'Cooperative Manifest + Regional Police Escort',
    pathD: 'M 590 145 Q 515 245 425 355',
    linkedStageIndices: [0, 1],
    localized: {
      EN: {
        name: 'North-Eastern Karamoja Feeder (Moroto → Kampala)',
        mode: 'Long-Haul Escorted Transit',
        description: 'Brings cooperative alluvial lots from Moroto and Nakapiripirit through Soroti/Mbale to Kampala aggregators.'
      },
      AR: {
        name: 'مسار شمال شرق كاراموجا (موروتو ← كمبالا)',
        mode: 'نقل طويل المدى بمرافقة أمنية',
        description: 'ينقل دفعات الذهب التعاوني من موروتو عبر سوروتي ومبالي إلى مجمعي كمبالا.'
      },
      ZH: {
        name: '东北部卡拉莫贾支线 (莫罗托 → 坎帕拉)',
        mode: '长途武装护卫运输',
        description: '将莫罗托与卡拉莫贾合作社的冲积金批次经索罗提/姆巴莱运抵坎帕拉集货商。'
      },
      FR: {
        name: 'Axe Nord-Est Karamoja (Moroto → Kampala)',
        mode: 'Transit Longue Distance Escorté',
        description: 'Achemine les lots coopératifs de Moroto via Soroti et Mbale jusqu’aux agrégateurs de Kampala.'
      }
    }
  },
  {
    id: 'route-kampala-entebbe',
    code: 'TR-AIRSIDE-05',
    fromNodeId: 'kampala-hub',
    toNodeId: 'entebbe-airside',
    type: 'armored_export',
    distanceKm: '40 km',
    securityProtocol: 'Brinks / G4S / Malca-Amit Sovereign Tarmac Convoy',
    pathD: 'M 425 355 L 405 405',
    linkedStageIndices: [3, 4],
    localized: {
      EN: {
        name: 'Sovereign Airside Export Corridor (Kampala → Entebbe EBB)',
        mode: 'Armored Bullion Convoy + Air Cargo Bridge',
        description: 'Final 40 km sealed transit along the Kampala–Entebbe Expressway from URA-cleared vaults directly onto EBB tarmac.'
      },
      AR: {
        name: 'ممر التصدير الجوي السيادي (كمبالا ← مطار عنتيبي EBB)',
        mode: 'قافلة سبائك مدرعة + جسر شحن جوي',
        description: 'النقل المختوم النهائي بطول 40 كم عبر طريق كمبالا-عنتيبي السريع مباشرة إلى ساحة مطار عنتيبي.'
      },
      ZH: {
        name: '主权空运出口专线 (坎帕拉 → 恩德培机场 EBB)',
        mode: 'Brinks/G4S 装甲车队 + 国际航空货运',
        description: '沿坎帕拉-恩德培高速公路进行最后 40 公里海关铅封押运，从保税金库直达恩德培国际机场停机坪。'
      },
      FR: {
        name: 'Corridor Souverain d’Exportation Aérienne (Kampala → EBB)',
        mode: 'Convoi Blindé + Pont Cargo Aérien',
        description: 'Transit final scellé de 40 km sur l’autoroute Kampala–Entebbe directement vers le tarmac d’Entebbe.'
      }
    }
  },
  {
    id: 'route-mpondwe-kampala',
    code: 'TR-BORDER-ICGLR',
    fromNodeId: 'mpondwe-border',
    toNodeId: 'kampala-hub',
    type: 'border_risk',
    distanceKm: '375 km',
    securityProtocol: 'Mandatory ICGLR Certificate + URA ASYCUDA Transit Bond',
    pathD: 'M 165 335 Q 285 340 425 355',
    linkedStageIndices: [3],
    localized: {
      EN: {
        name: 'Western Cross-Border Monitored Corridor (Mpondwe → Kampala)',
        mode: 'ICGLR Regulated Transit / High Fraud-Risk Vector',
        description: 'Strictly monitored cross-border transit route; uncertified parcels claiming this route are 99% advance-fee scams.'
      },
      AR: {
        name: 'الممر الحدودي الغربي المراقب (مبوندوي ← كمبالا)',
        mode: 'عبور منظم بـ ICGLR / مسار عالي المخاطر للاحتيال',
        description: 'مسار عبور حدودي خاضع لرقابة صارمة؛ الشحنات غير المصدقة التي تدعي هذا المسار هي احتيال بنسبة 99%.'
      },
      ZH: {
        name: '西部跨境受控走廊 (姆庞德韦 → 坎帕拉)',
        mode: 'ICGLR 监管通道 / 高欺诈风险预警线',
        description: '受严格监管的跨境通道；任何无 ICGLR 证书却声称走此路线的“低价过境金”99% 为诈骗。'
      },
      FR: {
        name: 'Corridor Transfrontalier Surveillé (Mpondwe → Kampala)',
        mode: 'Transit Réglementé CIRGL / Vecteur à Haut Risque',
        description: 'Route transfrontalière sous haute surveillance ; les lots non certifiés sur cet axe sont à 99% frauduleux.'
      }
    }
  }
];

const UI_LABELS: Record<
  Language,
  {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterMining: string;
    filterHubs: string;
    filterRoutes: string;
    syncedWithStage: string;
    selectNodePrompt: string;
    gpsLabel: string;
    purityLabel: string;
    roleLabel: string;
    geologyLabel: string;
    transitLabel: string;
    protocolLabel: string;
    riskLabel: string;
    syncButton: string;
    activeCorridorsTitle: string;
    legendMining: string;
    legendHub: string;
    legendExport: string;
    legendBorder: string;
  }
> = {
  EN: {
    badge: 'Interactive Geospatial Intelligence · Uganda Mining Cadastre & Transit Architecture',
    title: 'Uganda Gold Mining Regions & Supply Chain Transit Map',
    subtitle:
      'Click any mining region, smelting hub, or armored transit corridor to inspect geological purity, URA/DGSM statutory checkpoints, and stage-by-stage transport security.',
    filterAll: 'All Regions & Corridors',
    filterMining: 'Mining Belts (Stage 01)',
    filterHubs: 'Smelting & Customs Hubs (02–04)',
    filterRoutes: 'Export & Border Monitors (04–05)',
    syncedWithStage: 'Synchronized with Pipeline Stage',
    selectNodePrompt: 'Select any node on the map or pipeline track above',
    gpsLabel: 'GPS Coordinates & Elevation',
    purityLabel: 'Typical Fineness / Assay Range',
    roleLabel: 'Supply Chain Role',
    geologyLabel: 'Geological & Institutional Profile',
    transitLabel: 'Armored Transit & Logistics Corridor',
    protocolLabel: 'Mandatory Due Diligence Protocol',
    riskLabel: 'Forensic Red Flag & Fraud Vector',
    syncButton: 'Inspect Corresponding Pipeline Stage',
    activeCorridorsTitle: 'Active Supply Chain Transit Corridors',
    legendMining: 'Primary Gold Mining Belt',
    legendHub: 'Smelting, Assay & URA Hub',
    legendExport: 'DGSM & EBB Airside Export Vault',
    legendBorder: 'ICGLR Border Checkpoint'
  },
  AR: {
    badge: 'الاستخبارات الجغرافية التفاعلية · مناطق التعدين ومسارات النقل في أوغندا',
    title: 'خريطة مناطق تعدين الذهب ومسارات سلسلة التوريد في أوغندا',
    subtitle:
      'انقر فوق أي منطقة تعدين أو مركز صهر أو ممر نقل مدرع لفحص النقاوة الجيولوجية ونقاط تفتيش URA/DGSM وبروتوكولات الأمان.',
    filterAll: 'جميع المناطق والممرات',
    filterMining: 'أحزمة التعدين (المرحلة 01)',
    filterHubs: 'مراكز الصهر والجمارك (02–04)',
    filterRoutes: 'التصدير والرقابة الحدودية (04–05)',
    syncedWithStage: 'متزامن مع مرحلة سلسلة التوريد',
    selectNodePrompt: 'حدد أي موقع على الخريطة لعرض التفاصيل',
    gpsLabel: 'إحداثيات GPS والارتفاع',
    purityLabel: 'نطاق النقاوة والعيار المعتاد',
    roleLabel: 'الدور في سلسلة التوريد',
    geologyLabel: 'الملف الجيولوجي والمؤسسي',
    transitLabel: 'ممر النقل المدرع واللوجستيات',
    protocolLabel: 'بروتوكول العناية الواجبة الإلزامي',
    riskLabel: 'تحذير جنائي ومخاطر الاحتيال',
    syncButton: 'فحص المرحلة المقابلة في السلسلة',
    activeCorridorsTitle: 'ممرات النقل النشطة في سلسلة التوريد',
    legendMining: 'حزام تعدين ذهب رئيسي',
    legendHub: 'مركز صهر ومعايرة وجمارك',
    legendExport: 'خزنة التصدير الجوي وDGSM',
    legendBorder: 'نقطة تفتيش حدودية ICGLR'
  },
  ZH: {
    badge: '交互式地理空间情报 · 乌干达矿权地籍与黄金物流干线',
    title: '乌干达主要金矿产区与供应链运输走廊交互地图',
    subtitle:
      '点击任意金矿产区、熔炼与海关枢纽或装甲运输走廊，查看地质成色、URA/DGSM 法定检查站及分阶段押运规程。',
    filterAll: '全部产区与走廊',
    filterMining: '四大金矿带 (阶段 01)',
    filterHubs: '熔炼与海关枢纽 (02–04)',
    filterRoutes: '空运出口与边境哨 (04–05)',
    syncedWithStage: '已与供应链阶段同步',
    selectNodePrompt: '点击地图上的任意节点查看法证详情',
    gpsLabel: 'GPS 坐标与海拔',
    purityLabel: '典型自然成色 / 化验范围',
    roleLabel: '供应链职能定位',
    geologyLabel: '地质特征与机构职能',
    transitLabel: '装甲运输与物流路线',
    protocolLabel: '强制性尽职调查规程',
    riskLabel: '法证红旗预警与常见骗局',
    syncButton: '查看对应的供应链阶段详情',
    activeCorridorsTitle: '乌干达黄金供应链核心运输走廊',
    legendMining: '主要金矿开采带',
    legendHub: '熔炼、火试金与海关中心',
    legendExport: 'DGSM 矿权局与机场保税库',
    legendBorder: 'ICGLR 边境核查站'
  },
  FR: {
    badge: 'Intelligence Géospatiale Interactive · Cadastre Minier & Corridors de Transit',
    title: 'Carte Interactive des Régions Minières et Routes de Transit en Ouganda',
    subtitle:
      'Cliquez sur une région minière, un centre de fonderie ou un corridor blindé pour inspecter la pureté géologique et les contrôles URA/DGSM.',
    filterAll: 'Toutes Régions & Routes',
    filterMining: 'Ceintures Minières (Étape 01)',
    filterHubs: 'Fonderie & Douanes (02–04)',
    filterRoutes: 'Export & Frontières (04–05)',
    syncedWithStage: 'Synchronisé avec l’Étape de la Chaîne',
    selectNodePrompt: 'Sélectionnez un nœud sur la carte',
    gpsLabel: 'Coordonnées GPS & Altitude',
    purityLabel: 'Pureté Typique / Titre',
    roleLabel: 'Rôle dans la Chaîne',
    geologyLabel: 'Profil Géologique & Institutionnel',
    transitLabel: 'Corridor de Transit Blindé',
    protocolLabel: 'Protocole de Diligence Requise',
    riskLabel: 'Alerte Rouge Forensique',
    syncButton: 'Inspecter l’Étape Correspondante',
    activeCorridorsTitle: 'Corridors de Transit Actifs',
    legendMining: 'Ceinture Minière Principale',
    legendHub: 'Centre Fonderie, Essai & URA',
    legendExport: 'DGSM & Coffre Aéroport EBB',
    legendBorder: 'Poste Frontière CIRGL'
  }
};

interface UgandaSupplyChainMapProps {
  currentLang: Language;
  activeStageIndex: number;
  onSelectStage: (stageIndex: number) => void;
}

export const UgandaSupplyChainMap: React.FC<UgandaSupplyChainMapProps> = ({
  currentLang,
  activeStageIndex,
  onSelectStage
}) => {
  const labels = UI_LABELS[currentLang] || UI_LABELS.EN;
  const [selectedNodeId, setSelectedNodeId] = useState<string>('mubende-kassanda');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-mubende-kampala');
  const [layerFilter, setLayerFilter] = useState<'all' | 'mining' | 'hubs' | 'export'>('all');

  const selectedNode =
    UGANDA_MAP_NODES.find((n) => n.id === selectedNodeId) || UGANDA_MAP_NODES[0];
  const nodeCopy = selectedNode.localized[currentLang] || selectedNode.localized.EN;

  const filteredNodes = UGANDA_MAP_NODES.filter((node) => {
    if (layerFilter === 'all') return true;
    if (layerFilter === 'mining') return node.category === 'mining';
    if (layerFilter === 'hubs') return node.category === 'hub';
    return node.category === 'export' || node.category === 'border_checkpoint';
  });

  const handleSelectNode = (node: MapNode) => {
    setSelectedNodeId(node.id);
    onSelectStage(node.linkedStageIndex);
    // Also highlight a connected route
    const connectedRoute = TRANSIT_ROUTES.find(
      (r) => r.fromNodeId === node.id || r.toNodeId === node.id
    );
    if (connectedRoute) {
      setSelectedRouteId(connectedRoute.id);
    }
  };

  return (
    <div className="mt-10 rounded-xl bg-[#0B0F17] border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Map Header & Layer Filter Bar */}
      <div className="p-6 sm:p-8 border-b border-slate-800 bg-[#111722]/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>{labels.badge}</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            {labels.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* Layer Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setLayerFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              layerFilter === 'all'
                ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37]'
                : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {labels.filterAll}
          </button>
          <button
            onClick={() => {
              setLayerFilter('mining');
              handleSelectNode(UGANDA_MAP_NODES[0]);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              layerFilter === 'mining'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {labels.filterMining}
          </button>
          <button
            onClick={() => {
              setLayerFilter('hubs');
              const kla = UGANDA_MAP_NODES.find((n) => n.id === 'kampala-hub');
              if (kla) handleSelectNode(kla);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              layerFilter === 'hubs'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/60'
                : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {labels.filterHubs}
          </button>
          <button
            onClick={() => {
              setLayerFilter('export');
              const ebb = UGANDA_MAP_NODES.find((n) => n.id === 'entebbe-airside');
              if (ebb) handleSelectNode(ebb);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              layerFilter === 'export'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {labels.filterRoutes}
          </button>
        </div>
      </div>

      {/* Main Split Grid: Interactive Cartographic SVG Map (7 cols) + Node Forensic Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: SVG Map Canvas */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-[#080C14] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative">
          {/* Top Map Telemetry Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[11px] font-mono-data text-slate-400">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>PROJECTION: WGS84 UGANDA SOVEREIGN CADASTRE (0.31°N, 32.58°E)</span>
            </div>
            <div className="px-2.5 py-0.5 rounded bg-[#111722] border border-slate-800 text-[#D4AF37]">
              {labels.syncedWithStage}: 0{activeStageIndex + 1} / 05
            </div>
          </div>

          {/* Interactive SVG Map */}
          <div className="relative w-full aspect-[16/11] rounded-xl bg-[#0B101B] border border-slate-800/90 overflow-hidden">
            <svg
              viewBox="0 0 800 550"
              className="w-full h-full select-none"
              role="img"
              aria-label={labels.title}
            >
              <defs>
                {/* Subtle Coordinate Grid Pattern */}
                <pattern
                  id="uganda-grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="0.6"
                    strokeDasharray="2,2"
                  />
                </pattern>

                {/* Radial Gold Glow for Selected Node */}
                <radialGradient id="gold-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>

                {/* Water Body Fill */}
                <linearGradient id="lake-water" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0C192C" />
                  <stop offset="100%" stopColor="#07101E" />
                </linearGradient>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="550" fill="url(#uganda-grid)" />

              {/* Latitude / Longitude Graticule Labels */}
              <text x="14" y="95" fill="#475569" fontSize="9" fontFamily="monospace">
                3.0°N
              </text>
              <text x="14" y="235" fill="#475569" fontSize="9" fontFamily="monospace">
                1.5°N
              </text>
              <text x="14" y="385" fill="#475569" fontSize="9" fontFamily="monospace">
                0.0° EQUATOR
              </text>
              <line
                x1="0"
                y1="390"
                x2="800"
                y2="390"
                stroke="#334155"
                strokeWidth="0.8"
                strokeDasharray="6,6"
              />
              <text x="205" y="538" fill="#475569" fontSize="9" fontFamily="monospace">
                30.0°E
              </text>
              <text x="415" y="538" fill="#475569" fontSize="9" fontFamily="monospace">
                32.5°E
              </text>
              <text x="615" y="538" fill="#475569" fontSize="9" fontFamily="monospace">
                34.5°E
              </text>

              {/* Neighboring Country Labels */}
              <text
                x="55"
                y="265"
                fill="#475569"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                D.R. CONGO
              </text>
              <text
                x="355"
                y="38"
                fill="#475569"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                SOUTH SUDAN
              </text>
              <text
                x="675"
                y="265"
                fill="#475569"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                KENYA
              </text>
              <text
                x="285"
                y="515"
                fill="#475569"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                TANZANIA
              </text>
              <text
                x="145"
                y="505"
                fill="#475569"
                fontSize="10"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="1"
              >
                RWANDA
              </text>

              {/* Uganda Sovereign Polygon Contour */}
              <path
                d="M 275 75 L 435 60 L 560 65 L 635 125 L 625 225 L 590 315 L 555 375 L 470 435 L 330 465 L 185 470 L 155 415 L 165 325 L 205 245 L 245 165 Z"
                fill="#121A29"
                stroke="#334155"
                strokeWidth="2"
              />

              {/* Geological Gold Belt Highlight Zones (Subtle Polygons) */}
              {/* Mubende-Kassanda Belt */}
              <ellipse
                cx="315"
                cy="315"
                rx="48"
                ry="32"
                fill="#D4AF37"
                fillOpacity="0.08"
                stroke="#D4AF37"
                strokeOpacity="0.25"
                strokeDasharray="3,3"
              />
              {/* Buhweju-Ankole Belt */}
              <ellipse
                cx="215"
                cy="410"
                rx="40"
                ry="26"
                fill="#D4AF37"
                fillOpacity="0.08"
                stroke="#D4AF37"
                strokeOpacity="0.25"
                strokeDasharray="3,3"
              />
              {/* Busia-Wagagai Greenstone Belt */}
              <ellipse
                cx="565"
                cy="345"
                rx="38"
                ry="26"
                fill="#D4AF37"
                fillOpacity="0.08"
                stroke="#D4AF37"
                strokeOpacity="0.25"
                strokeDasharray="3,3"
              />
              {/* Karamoja Belt */}
              <ellipse
                cx="590"
                cy="145"
                rx="42"
                ry="36"
                fill="#D4AF37"
                fillOpacity="0.08"
                stroke="#D4AF37"
                strokeOpacity="0.25"
                strokeDasharray="3,3"
              />

              {/* Major Lakes of Uganda */}
              {/* Lake Victoria (South-East) */}
              <path
                d="M 355 445 Q 415 390 485 385 L 555 375 L 540 485 L 345 485 Z"
                fill="url(#lake-water)"
                stroke="#1E3A5F"
                strokeWidth="1.2"
              />
              <text
                x="435"
                y="455"
                fill="#38BDF8"
                fillOpacity="0.55"
                fontSize="10"
                fontFamily="monospace"
              >
                LAKE VICTORIA
              </text>

              {/* Lake Albert (Western Rift) */}
              <path
                d="M 205 245 Q 235 210 255 175 L 270 185 Q 245 225 220 260 Z"
                fill="url(#lake-water)"
                stroke="#1E3A5F"
                strokeWidth="1"
              />
              <text
                x="170"
                y="205"
                fill="#38BDF8"
                fillOpacity="0.45"
                fontSize="8.5"
                fontFamily="monospace"
              >
                L. Albert
              </text>

              {/* Lake Kyoga (Central) */}
              <path
                d="M 375 245 Q 430 235 485 250 Q 440 270 375 260 Z"
                fill="url(#lake-water)"
                stroke="#1E3A5F"
                strokeWidth="1"
              />
              <text
                x="405"
                y="235"
                fill="#38BDF8"
                fillOpacity="0.45"
                fontSize="8.5"
                fontFamily="monospace"
              >
                L. Kyoga
              </text>

              {/* Supply Chain Transit Route Curves */}
              {TRANSIT_ROUTES.map((route) => {
                const isSelectedRoute = route.id === selectedRouteId;
                const isStageMatched = route.linkedStageIndices.includes(activeStageIndex);

                let strokeColor = '#64748B';
                if (route.type === 'armored_export') strokeColor = '#10B981';
                else if (route.type === 'border_risk') strokeColor = '#F43F5E';
                else if (isSelectedRoute || isStageMatched) strokeColor = '#D4AF37';

                return (
                  <g
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className="cursor-pointer"
                  >
                    {/* Base glow path when active */}
                    {(isSelectedRoute || isStageMatched) && (
                      <path
                        d={route.pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="6"
                        strokeOpacity="0.2"
                        strokeLinecap="round"
                      />
                    )}
                    {/* Main Transit Line */}
                    <path
                      d={route.pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSelectedRoute ? '3' : '2'}
                      strokeDasharray={
                        route.type === 'border_risk'
                          ? '4,5'
                          : route.type === 'armored_export'
                          ? 'none'
                          : '6,4'
                      }
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}

              {/* Interactive Map Nodes */}
              {filteredNodes.map((node) => {
                const isSelected = node.id === selectedNode.id;
                const isStageLinked = node.linkedStageIndex === activeStageIndex;
                const localizedName =
                  node.localized[currentLang]?.name || node.localized.EN.name;

                let dotColor = '#D4AF37'; // Gold for mining
                if (node.category === 'hub') dotColor = '#38BDF8'; // Sky blue for Kampala Hub
                if (node.category === 'export') dotColor = '#10B981'; // Emerald for Entebbe Airside
                if (node.category === 'border_checkpoint') dotColor = '#F43F5E'; // Rose for border checkpoint

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.coordinates.x}, ${node.coordinates.y})`}
                    onClick={() => handleSelectNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Selection Halo */}
                    {(isSelected || isStageLinked) && (
                      <circle r="26" fill="url(#gold-halo)" />
                    )}

                    {/* Outer Ring */}
                    <circle
                      r={isSelected ? '12' : '9'}
                      fill="#0B0F17"
                      stroke={dotColor}
                      strokeWidth={isSelected ? '2.5' : '1.8'}
                    />

                    {/* Inner Core */}
                    <circle r={isSelected ? '5.5' : '4'} fill={dotColor} />

                    {/* Code & Label Pill */}
                    <g transform="translate(0, -18)">
                      <rect
                        x="-58"
                        y="-16"
                        width="116"
                        height="18"
                        rx="4"
                        fill={isSelected ? '#182232' : '#0B0F17'}
                        fillOpacity="0.92"
                        stroke={isSelected ? dotColor : '#334155'}
                        strokeWidth={isSelected ? '1.2' : '0.8'}
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                        fontSize="8.5"
                        fontWeight={isSelected ? '700' : '600'}
                        fontFamily="monospace"
                      >
                        {node.code} · {localizedName.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-[#D4AF37] inline-block shrink-0" />
              <span>{labels.legendMining}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-sky-400 inline-block shrink-0" />
              <span>{labels.legendHub}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shrink-0" />
              <span>{labels.legendExport}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shrink-0" />
              <span>{labels.legendBorder}</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Region / Hub Forensic Dossier Inspector */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-[#111722] flex flex-col justify-between">
          <div className="space-y-4">
            {/* Top Node Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono-data font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                    {selectedNode.code}
                  </span>
                  <span className="text-xs font-mono-data text-slate-400">
                    STAGE 0{selectedNode.linkedStageIndex + 1}
                  </span>
                </div>
                <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white mt-1.5">
                  {nodeCopy.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{nodeCopy.region}</span>
                </p>
              </div>
            </div>

            {/* Key Telemetry Metrics (Tabular-Nums) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                <div className="text-[10px] font-mono-data uppercase text-slate-400">
                  {labels.gpsLabel}
                </div>
                <div className="text-xs font-mono-data font-semibold text-white mt-1">
                  {selectedNode.gps}
                </div>
                <div className="text-[11px] font-mono-data text-slate-400 mt-0.5">
                  {selectedNode.elevation}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                <div className="text-[10px] font-mono-data uppercase text-slate-400">
                  {labels.purityLabel}
                </div>
                <div className="text-xs font-mono-data font-semibold text-[#D4AF37] mt-1">
                  {selectedNode.purityRange}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {selectedNode.annualOutputEstimate}
                </div>
              </div>
            </div>

            {/* Geology & Institutional Function */}
            <div className="p-3.5 rounded-lg bg-[#0B0F17]/90 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {selectedNode.category === 'mining' && (
                  <Pickaxe className="w-3.5 h-3.5 text-[#D4AF37]" />
                )}
                {selectedNode.category === 'hub' && (
                  <Flame className="w-3.5 h-3.5 text-sky-400" />
                )}
                {selectedNode.category === 'export' && (
                  <PlaneTakeoff className="w-3.5 h-3.5 text-emerald-400" />
                )}
                {selectedNode.category === 'border_checkpoint' && (
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>{nodeCopy.role}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {nodeCopy.geologyOrFunction}
              </p>
            </div>

            {/* Transit Route Connection */}
            <div className="p-3.5 rounded-lg bg-[#0B0F17]/90 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>{labels.transitLabel}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {nodeCopy.transitRouteSummary}
              </p>
            </div>

            {/* Mandatory Due Diligence Protocol */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{labels.protocolLabel}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {nodeCopy.dueDiligenceProtocol}
              </p>
            </div>

            {/* Forensic Risk Alert */}
            <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-1.5">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{labels.riskLabel}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {nodeCopy.riskAlert}
              </p>
            </div>
          </div>

          {/* Quick Node Switcher Strip */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap gap-1.5">
              {UGANDA_MAP_NODES.map((node) => {
                const isSelected = node.id === selectedNode.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelectNode(node)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-data transition-colors border ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37] font-bold'
                        : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {node.code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Transit Corridors Strip */}
      <div className="p-5 sm:p-6 bg-[#0E141F] border-t border-slate-800">
        <div className="text-xs font-mono-data uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>{labels.activeCorridorsTitle}</span>
          <span className="text-[#D4AF37]">6 MONITORED TRANSIT VECTORS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRANSIT_ROUTES.map((route) => {
            const routeCopy = route.localized[currentLang] || route.localized.EN;
            const isSelected = route.id === selectedRouteId;

            return (
              <button
                key={route.id}
                onClick={() => {
                  setSelectedRouteId(route.id);
                  const fromNode = UGANDA_MAP_NODES.find(
                    (n) => n.id === route.fromNodeId
                  );
                  if (fromNode) {
                    setSelectedNodeId(fromNode.id);
                    onSelectStage(fromNode.linkedStageIndex);
                  }
                }}
                className={`p-3.5 rounded-lg text-left border transition-all ${
                  isSelected
                    ? 'bg-[#182232] border-[#D4AF37] shadow-md'
                    : 'bg-[#111722] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono-data mb-1">
                  <span
                    className={
                      route.type === 'border_risk'
                        ? 'text-rose-400 font-bold'
                        : route.type === 'armored_export'
                        ? 'text-emerald-400 font-bold'
                        : 'text-[#D4AF37] font-bold'
                    }
                  >
                    {route.code}
                  </span>
                  <span className="text-slate-400">{route.distanceKm}</span>
                </div>
                <div className="text-xs font-bold text-white flex items-center justify-between gap-1">
                  <span className="line-clamp-1">{routeCopy.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {routeCopy.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
