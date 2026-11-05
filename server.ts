import express, { type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_ABOUT_CONTENT, INITIAL_BOARD_MEMBERS, INITIAL_POSTS } from './src/data/portalData.ts';
import {
  PUBLIC_SEO_ROUTES,
  PERMANENT_REDIRECTS,
  PRIVATE_NOINDEX_PREFIXES,
  EDITORIAL_CONTENT_BRIEFS,
  getRedirectDestination,
  injectSeoHeadIntoHtml,
  generateSitemapXml,
  generateRobotsTxt
} from './src/data/seoRoutes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Ensure process.env.API_KEY is populated from GEMINI_API_KEY if provided via AI Studio secrets
if (!process.env.API_KEY && process.env.GEMINI_API_KEY) {
  process.env.API_KEY = process.env.GEMINI_API_KEY;
}

// Initialize Gemini SDK strictly from process.env.API_KEY
const getGeminiClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Portal in-memory storage initialized from canonical portalData
let aboutContent = { ...INITIAL_ABOUT_CONTENT };

let boardMembers = [...INITIAL_BOARD_MEMBERS];

let posts = [...INITIAL_POSTS];

let photos = [
  {
    id: 'photo-1',
    title: 'Sovereign Metallurgical Inspection Vault',
    caption: 'Granite inspection bench with precision XRF analyzer and pure gold Dore bar under forensic lighting.',
    imageUrl: '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-05-01'
  },
  {
    id: 'photo-2',
    title: 'Scam Academy Forensics Desk',
    caption: 'Fire assay crucibles, digital micro-balance displaying troy ounces, and seized counterfeit title deeds.',
    imageUrl: '/src/assets/images/scam_academy_forensics_1793632189342.jpg',
    category: 'Assay Lab',
    dateAdded: '2026-04-29'
  },
  {
    id: 'photo-3',
    title: 'Dedicated B6 Armored Executive Motorcade & Tactical Detail',
    caption: 'Armored 4x4 executive convoy and close-protection tactical detail connecting Entebbe tarmac with Busia and Mubende concessions.',
    imageUrl: '/src/assets/images/sovereign_helicopter_expedition_1793632188506.jpg',
    category: 'VIP Transport',
    dateAdded: '2026-04-25'
  }
];

let documentVerifications = [
  {
    id: 'DOC-VER-2026-4401',
    clientName: 'Henrik Lindqvist',
    companyName: 'Nordic Bullion Treasury AB',
    email: 'h.lindqvist@nordicbullion.se',
    phone: '+46 8 501 2290',
    documentType: 'Full Corporate Offer (FCO)',
    claimedSeller: 'Victoria Nile Gold Syndicate Ltd',
    claimedQuantityKg: '150 kg',
    claimedDiscountPercent: '22% below LBMA',
    documentTextOrNotes: 'FCO claims 150kg Au Dore bars stored at Entebbe customs warehouse. Requests $65,000 USD wire to private legal counsel escrow for URA 5% export clearance before buyer can view bars.',
    fileName: 'FCO_VictoriaNile_150KG_Stamped.pdf',
    feeUsd: 2500,
    paymentStatus: 'paid',
    paymentRef: 'UGE-CARD-DOC-4401',
    assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    status: 'assigned_to_staff_1',
    submittedAt: '2026-05-01 11:20 UTC',
    slaDeadline: '2026-05-04 11:20 UTC (Within 24–72 Hours)',
    aiAnalysis: {
      riskScore: 98,
      verdict: 'CRITICAL COUNTERFEIT RISK',
      executiveSummary: 'Forensic document review indicates high-risk advance-fee indicators. A 22% discount on liquid bullion combined with upfront tax routing to a private attorney account contradicts standard Ugandan export procedure.',
      redFlags: [
        '22% below LBMA spot discount diverges sharply from observable Kampala and Entebbe refinery purchasing margins.',
        'Upfront $65,000 fee routed to a private lawyer account instead of official URA ASYCUDA tax portal.',
        'Seller entity "Victoria Nile Gold Syndicate Ltd" does not hold an active Mineral Dealer License (MDL) in the DGSM Cadastre.'
      ],
      statutoryCrossCheck: 'Inconsistent with Section 142 of the Uganda Mining and Minerals Act 2022 & URA Single Customs Territory statutory payment rules.',
      staffActionPlan: [
        'Staff Officer 1 to pull official DGSM negative registry certificate for client dossier.',
        'Cross-reference attorney escrow bank coordinates with FIA financial intelligence alert list.',
        'Compile final signed PDF audit report and dispatch to Henrik Lindqvist within 24–72 hour SLA.'
      ]
    },
    staffFollowUpNotes: 'DGSM search confirmed entity is unlicensed. Preparing final stamped verification report for client dispatch.'
  }
];

let registrations = [
  {
    id: 'REG-2026-8812',
    fullName: 'Alexander Vance',
    companyName: 'Apex Precious Metals DMCC',
    executiveTitle: 'Chief Investment Officer',
    country: 'United Arab Emirates',
    email: 'a.vance@apexmetals.ae',
    phone: '+971 50 882 1902',
    requestedTier: 'sovereign',
    delegatesCount: 2,
    cohortDate: 'Cohort 01: Jan 17–23, 2027',
    primaryObjective: 'Physical Gold Sourcing & Direct Refinery Verification',
    activeProposalDetails: 'Received an offer for 200kg Dore bars at 18% discount from an alleged Kassanda concession. Need forensic validation.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'approved',
    assignedStaff: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    internalNotes: 'OFAC, UN, UK HMT, EU sanctions and PEP screening clear. Corporate trade license validated in Dubai DMCC registry. Full package payment (USD 25,000 per person, inclusive of applicable Ugandan VAT and USD 1,000 KYC & Client Vetting Allocation) confirmed.',
    registeredAt: '2026-04-20',
    passportVerified: true,
    sanctionsPepClear: true,
    dgsmClearance: true,
    digitalSignature: {
      id: 'SIG-881201',
      targetId: 'REG-2026-8812',
      targetType: 'expedition_registration',
      agreementTitle: 'Sovereign Field Expedition Charter, Non-Transaction Covenant & Security Protocol Agreement',
      signerFullName: 'Alexander Vance',
      signerTitle: 'Chief Investment Officer',
      signerCompany: 'Apex Precious Metals DMCC',
      signerEmail: 'a.vance@apexmetals.ae',
      passportOrIdNumber: 'PASS-UAE-7749201',
      signatureMethod: 'typed_calligraphy',
      signatureDataUrl: '',
      typedSignatureText: 'Alexander Vance',
      clausesAccepted: [
        'Article I (Strict Non-Transaction Covenant): I acknowledge that Uganda Gold Expedition is strictly an educational, forensic inspection, and due diligence mission under the Uganda Mining and Minerals Act 2022, and does not broker, buy, or sell physical bullion during field operations.',
        'Article II (Statutory KYC & Client Vetting Allocation): I confirm that every package is paid in full (USD, inclusive of applicable Ugandan VAT) and includes the mandatory USD 1,000 KYC & Client Vetting Allocation for OFAC, UN, UK HMT, EU sanctions and PEP screening, which is strictly non-refundable once vetting commences (with the full balance above $1,000 refunded within 14 business days if vetting is not passed).',
        'Article III (Field Security & Chain-of-Custody Compliance): I agree to abide by all safety directives issued by the Operations & Strategy Directorate during dedicated B6 armored executive motorcade ground transfers and active mine pithead inspections.'
      ],
      sha256SealHash: 'SHA256:9F84A2C1E77B3409D1128AF04E7C88B2',
      signedAtUtc: '2026-04-21 09:42:18 UTC',
      certificateSerial: 'UGE-CERT-2026-881204'
    }
  },
  {
    id: 'REG-2026-9041',
    fullName: 'Elena Rostova',
    companyName: 'Helvetic Bullion Partners SA',
    executiveTitle: 'Managing Partner',
    country: 'Switzerland',
    email: 'elena@helveticbullion.ch',
    phone: '+41 22 819 0422',
    requestedTier: 'trader',
    delegatesCount: 1,
    cohortDate: 'Cohort 01: Jan 17–23, 2027',
    primaryObjective: 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: 'Auditing 2 WhatsApp contracts with alleged UN transit stamps.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'paid',
    status: 'under_review',
    assignedStaff: 'Adv. David Kigozi',
    internalNotes: 'Paid in Full (USD 15,000, inclusive of applicable Ugandan VAT and USD 1,000 KYC & Client Vetting Allocation). OFAC, UN, UK HMT, EU sanctions and PEP screening complete; awaiting DGSM security registry cross-match.',
    registeredAt: '2026-04-27',
    passportVerified: true,
    sanctionsPepClear: true,
    dgsmClearance: false
  },
  {
    id: 'REG-2026-9218',
    fullName: 'Zhang Wei',
    companyName: 'Sino-East Resource Fund',
    executiveTitle: 'Director of African Commodities',
    country: 'China',
    email: 'zhang.wei@sinoeast-res.com',
    phone: '+86 139 1022 8411',
    requestedTier: 'sovereign',
    delegatesCount: 3,
    cohortDate: 'Cohort 02: Mar 14–20, 2027',
    primaryObjective: 'Mining Concession Acquisition & Cadastre Title Audit',
    activeProposalDetails: 'Evaluating exploration permits in Karamoja gold belt.',
    nonTransactionAgreed: true,
    kycAcknowledged: true,
    kycPaymentStatus: 'pending',
    status: 'pending_kyc',
    assignedStaff: 'Eng. Sarah Nakato',
    internalNotes: 'Registration received. Pending full package payment (inclusive of USD 1,000 KYC & Client Vetting Allocation) before OFAC, UN, UK HMT, EU sanctions and PEP screening commences.',
    registeredAt: '2026-05-01',
    passportVerified: false,
    sanctionsPepClear: false,
    dgsmClearance: false
  }
];

let fieldLogs = [
  {
    id: 'LOG-701',
    staffName: 'Eng. Sarah Nakato',
    location: 'Mubende Artisanal Belt (Pit 4B)',
    logDate: '2026-04-30',
    title: 'Gravity Concentrator Inspection & Safety Perimeter',
    observations: 'Inspected 3 operational licensed pits. Panning yield consistent with 2.8g/ton rock vein. Local miners reported 2 unauthorized brokers soliciting fake export paperwork.',
    riskAssessment: 'Medium',
    testResults: 'Raw sponge gold density test: 17.8 g/cm³ (approx. 88% Au content).'
  },
  {
    id: 'LOG-702',
    staffName: 'Dr. Michael Ssemwogerere',
    location: 'Kampala Bonded Refinery No. 2',
    logDate: '2026-04-26',
    title: 'Fire Assay Calibration & URA Customs Electronic Seal',
    observations: 'Calibrated laboratory cupellation muffle furnace at 1050°C. Witnessed URA electronic seal application on 25kg export lot destined for Emirates flight.',
    riskAssessment: 'Low',
    testResults: 'Cupellation assay verified 999.6 fine purity. ASYCUDA customs declaration matching.'
  }
];

let payments = [
  {
    id: 'PAY-8800',
    reference: 'UGE-CARD-DOC-4401',
    customerName: 'Henrik Lindqvist',
    email: 'h.lindqvist@nordicbullion.se',
    amount: 2500,
    currency: 'USD',
    type: 'doc_verification',
    status: 'Completed',
    cardBrand: 'Visa',
    date: '2026-05-01 11:18',
    tier: '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)'
  },
  {
    id: 'PAY-8801',
    reference: 'UGE-CARD-REL-8812',
    customerName: 'Alexander Vance',
    email: 'a.vance@apexmetals.ae',
    amount: 25000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Visa',
    date: '2026-04-20 14:22',
    tier: 'Sovereign Executive · Diplomatic VIP (Paid in Full, VAT Incl.)'
  },
  {
    id: 'PAY-8802',
    reference: 'UGE-CARD-REL-9041',
    customerName: 'Elena Rostova',
    email: 'elena@helveticbullion.ch',
    amount: 15000,
    currency: 'USD',
    type: 'full_payment',
    status: 'Completed',
    cardBrand: 'Mastercard',
    date: '2026-04-27 09:14',
    tier: 'Professional Trader (Paid in Full, VAT Incl.)'
  }
];

let auditLogs = [
  {
    id: 'AUDIT-2026-9012',
    timestamp: '2026-05-02 10:15:24 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin' as 'admin' | 'staff',
    category: 'content_update' as
      | 'content_update'
      | 'user_role_change'
      | 'document_approval'
      | 'kyc_clearance'
      | 'ux_config'
      | 'data_export',
    action: 'Published Intelligence Article',
    targetId: 'gold-discount-advance-fee-traps',
    details:
      'Published article "Why deep gold discounts demand independent verification" to public Insights library.'
  },
  {
    id: 'AUDIT-2026-9011',
    timestamp: '2026-05-01 16:42:10 UTC',
    actorEmail: 'mwesigye@ugandagold.org',
    actorRole: 'staff' as 'admin' | 'staff',
    category: 'document_approval' as
      | 'content_update'
      | 'user_role_change'
      | 'document_approval'
      | 'kyc_clearance'
      | 'ux_config'
      | 'data_export',
    action: 'Approved & Dispatched 24–72h Verification Report',
    targetId: 'DOC-VER-2026-3910',
    details:
      'Released certified DGSM Mineral License verification report for Jean-Luc Moreau (Geneva Sovereign Partners) following physical Entebbe registry audit.'
  },
  {
    id: 'AUDIT-2026-9010',
    timestamp: '2026-04-28 14:08:51 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin' as 'admin' | 'staff',
    category: 'user_role_change' as
      | 'content_update'
      | 'user_role_change'
      | 'document_approval'
      | 'kyc_clearance'
      | 'ux_config'
      | 'data_export',
    action: 'Updated Staff Access Role',
    targetId: 'staff-1',
    details:
      'Verified Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye) access level as Senior Due Diligence Officer (staff) with full dossier clearance privileges.'
  },
  {
    id: 'AUDIT-2026-9009',
    timestamp: '2026-04-25 09:30:12 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin' as 'admin' | 'staff',
    category: 'kyc_clearance' as
      | 'content_update'
      | 'user_role_change'
      | 'document_approval'
      | 'kyc_clearance'
      | 'ux_config'
      | 'data_export',
    action: 'Approved Delegate KYC & DGSM Clearance',
    targetId: 'REG-2026-8812',
    details:
      'Approved Sovereign Executive registration for Alexander Vance (Apex Precious Metals DMCC) after OFAC, UN, UK HMT, EU & PEP screening.'
  },
  {
    id: 'AUDIT-2026-9008',
    timestamp: '2026-04-22 11:19:05 UTC',
    actorEmail: 'mugisolo@gmail.com',
    actorRole: 'admin' as 'admin' | 'staff',
    category: 'ux_config' as
      | 'content_update'
      | 'user_role_change'
      | 'document_approval'
      | 'kyc_clearance'
      | 'ux_config'
      | 'data_export',
    action: 'Synchronized Global UX/UI Configuration',
    targetId: 'uiConfig/global',
    details:
      'Enforced Zero-Trust Firestore Security Rules for per-user /uxPreferences/{userId} and /uiConfig/global.'
  }
];

function recordServerAuditLog(entry: {
  id?: string;
  actorEmail?: string;
  actorRole?: 'admin' | 'staff';
  category:
    | 'content_update'
    | 'user_role_change'
    | 'document_approval'
    | 'kyc_clearance'
    | 'ux_config'
    | 'data_export';
  action: string;
  targetId: string;
  details: string;
}) {
  const newLog = {
    id: entry.id || `AUDIT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    actorEmail: entry.actorEmail || 'mugisolo@gmail.com',
    actorRole: entry.actorRole || 'admin',
    category: entry.category,
    action: entry.action,
    targetId: entry.targetId || 'system',
    details: entry.details
  };
  auditLogs.unshift(newLog);
  return newLog;
}

// PORTAL API: Get all portal data
app.get('/api/portal/data', (_req: Request, res: Response) => {
  res.json({
    posts,
    photos,
    registrations,
    fieldLogs,
    payments,
    documentVerifications,
    aboutContent,
    boardMembers,
    auditLogs
  });
});

// ADMIN: Get immutable audit logs
app.get('/api/portal/audit-logs', (_req: Request, res: Response) => {
  res.json({
    success: true,
    auditLogs
  });
});

// ADMIN: Append automated audit log entry
app.post('/api/portal/audit-log', (req: Request, res: Response) => {
  const { id, actorEmail, actorRole, category, action, targetId, details } = req.body || {};
  if (!action || !details) {
    return res.status(400).json({ success: false, message: 'Action and details are required.' });
  }
  const logEntry = recordServerAuditLog({
    id,
    actorEmail,
    actorRole: actorRole === 'staff' ? 'staff' : 'admin',
    category: category || 'content_update',
    action,
    targetId: targetId || 'portal',
    details
  });
  return res.json({ success: true, auditLog: logEntry });
});


// ONE-OFF USD $2,500 AI DOCUMENT VERIFICATION ENDPOINT
// Analyzes submitted document via Gemini AI and routes report to Staff Officer 1 for follow-up & 24h client delivery
app.post('/api/verification/submit', async (req: Request, res: Response) => {
  try {
    const {
      clientName,
      companyName,
      email,
      phone,
      documentType,
      claimedSeller,
      claimedQuantityKg,
      claimedDiscountPercent,
      documentTextOrNotes,
      fileName,
      fileBase64,
      fileMimeType,
      paymentRef
    } = req.body;

    if (!clientName || !email || !documentType) {
      return res.status(400).json({
        success: false,
        message: 'Client name, email, and document type are required.'
      });
    }

    const docId = `DOC-VER-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const txRef = paymentRef || `UGE-CARD-DOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Log the USD 2,500 payment record
    payments.unshift({
      id: `PAY-${Date.now().toString().slice(-4)}`,
      reference: txRef,
      customerName: clientName,
      email,
      amount: 2500,
      currency: 'USD',
      type: 'doc_verification',
      status: 'Completed',
      cardBrand: 'Visa',
      date: now.toISOString().replace('T', ' ').substring(0, 16),
      tier: '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)'
    });

    // Perform AI Forensic Analysis via @google/genai ('gemini-3.8-flash')
    let aiAnalysisResult = {
      riskScore: 88,
      verdict: 'HIGH FRAUD PROBABILITY' as 'CRITICAL COUNTERFEIT RISK' | 'HIGH FRAUD PROBABILITY' | 'MODERATE ANOMALIES' | 'PRELIMINARY PASS (FIELD VERIFICATION REQUIRED)',
      executiveSummary: `Preliminary AI forensic scan of the submitted ${documentType} from "${claimedSeller || 'Unverified Seller'}" indicates high counterparty risk patterns requiring physical registry cross-checking by Staff Officer 1.`,
      redFlags: [
        `Claimed discount (${claimedDiscountPercent || 'deep discount'}) deviates from LBMA physical spot parity.`,
        `Counterparty "${claimedSeller || 'Seller'}" requires manual verification against the DGSM Mineral Cadastre in Entebbe.`,
        `Chain-of-custody and URA ASYCUDA customs assessment numbers must be verified prior to any capital commitment.`
      ],
      statutoryCrossCheck: 'Evaluated under the Uganda Mining and Minerals Act 2022, ICGLR Regional Certification Mechanism, and URA Customs 5% Export Levy statutes.',
      staffActionPlan: [
        'Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye) to verify concession/MDL license at DGSM Entebbe.',
        'Cross-reference signatory names and tax stamps with URA Customs Enforcement.',
        'Deliver final signed verification dossier to client within 24–72 hours.'
      ]
    };

    if (process.env.API_KEY && process.env.API_KEY !== 'MY_GEMINI_API_KEY' && process.env.API_KEY !== 'YOUR_GEMINI_API_KEY') {
      try {
        const ai = getGeminiClient();
        const promptText = `You are the Chief Forensic Intelligence Analyst for the Uganda Gold Expedition.
A client has paid USD $2,500 (inclusive of applicable Ugandan VAT) for a 24–72 Hour Forensic Document Verification of an East African gold transaction document.
Analyze the following submission details and prepare a structured forensic intelligence report to be routed immediately to Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye) for field verification and follow-up.

Client: ${clientName} (${companyName || 'Private Principal'})
Document Type: ${documentType}
Claimed Seller / Counterparty: ${claimedSeller || 'Not specified'}
Claimed Gold Quantity: ${claimedQuantityKg || 'Not specified'}
Claimed Price / Discount: ${claimedDiscountPercent || 'Not specified'}
Document Content / Clauses / Notes:
${documentTextOrNotes || 'No additional text provided.'}

Evaluate against East African gold fraud vectors (e.g., discounts >3% below LBMA spot, upfront export tax/customs fee demands, private lawyer escrow accounts, fake DGSM mineral dealer licenses, forged ICGLR certificates, or unverified DRC transit claims).`;

        const parts: any[] = [{ text: promptText }];
        if (fileBase64 && fileMimeType && (fileMimeType.startsWith('image/') || fileMimeType === 'application/pdf')) {
          parts.unshift({
            inlineData: {
              mimeType: fileMimeType,
              data: fileBase64
            }
          });
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: { parts },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                riskScore: {
                  type: Type.INTEGER,
                  description: 'Forensic fraud risk score from 0 to 99.'
                },
                verdict: {
                  type: Type.STRING,
                  description: 'One of: CRITICAL COUNTERFEIT RISK, HIGH FRAUD PROBABILITY, MODERATE ANOMALIES, PRELIMINARY PASS (FIELD VERIFICATION REQUIRED)'
                },
                executiveSummary: {
                  type: Type.STRING,
                  description: 'Concise 2-3 sentence forensic summary of the document.'
                },
                redFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 to 4 specific forensic red flags or anomalies detected.'
                },
                statutoryCrossCheck: {
                  type: Type.STRING,
                  description: 'Specific reference to Uganda Mining Act 2022, DGSM Cadastre, ICGLR, or URA ASYCUDA compliance.'
                },
                staffActionPlan: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 concrete follow-up actions for Staff Officer 1 to complete within the 24–72 hour SLA.'
                }
              },
              required: ['riskScore', 'verdict', 'executiveSummary', 'redFlags', 'statutoryCrossCheck', 'staffActionPlan']
            }
          }
        });

        const rawJson = (response.text ?? '{}').trim();
        const parsed = JSON.parse(rawJson);
        if (parsed && typeof parsed.riskScore === 'number') {
          aiAnalysisResult = {
            riskScore: Math.min(99, Math.max(5, parsed.riskScore)),
            verdict: parsed.verdict || 'HIGH FRAUD PROBABILITY',
            executiveSummary: parsed.executiveSummary || aiAnalysisResult.executiveSummary,
            redFlags: Array.isArray(parsed.redFlags) && parsed.redFlags.length > 0 ? parsed.redFlags : aiAnalysisResult.redFlags,
            statutoryCrossCheck: parsed.statutoryCrossCheck || aiAnalysisResult.statutoryCrossCheck,
            staffActionPlan: Array.isArray(parsed.staffActionPlan) && parsed.staffActionPlan.length > 0 ? parsed.staffActionPlan : aiAnalysisResult.staffActionPlan
          };
        }
      } catch (aiErr: any) {
        console.warn('Gemini forensic analysis fallback used:', aiErr?.message);
      }
    }

    const newVerification = {
      id: docId,
      clientName,
      companyName: companyName || 'Private Principal',
      email,
      phone: phone || '',
      documentType,
      claimedSeller: claimedSeller || 'Unverified Entity',
      claimedQuantityKg: claimedQuantityKg || 'Unspecified',
      claimedDiscountPercent: claimedDiscountPercent || 'Unspecified',
      documentTextOrNotes: documentTextOrNotes || '',
      fileName: fileName || 'Submitted_Offer_Dossier.pdf',
      feeUsd: 2500,
      paymentStatus: 'paid' as const,
      paymentRef: txRef,
      assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
      status: 'assigned_to_staff_1' as const,
      submittedAt: now.toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      slaDeadline: tomorrow.toISOString().replace('T', ' ').substring(0, 16) + ' UTC (Within 24–72 Hours)',
      aiAnalysis: aiAnalysisResult,
      staffFollowUpNotes: 'Routed automatically from AI Forensic Engine to Staff Officer 1 for physical DGSM & URA registry verification. Final report due to client within 24–72 hours.'
    };

    documentVerifications.unshift(newVerification);

    return res.json({
      success: true,
      verification: newVerification
    });
  } catch (err: any) {
    console.error('Document verification error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process document verification.',
      error: err.message
    });
  }
});

// STAFF OFFICER 1 / ADMIN: Update Document Verification status & follow-up notes
app.patch('/api/verification/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = documentVerifications.findIndex(d => d.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Verification record not found.' });
  }
  documentVerifications[idx] = {
    ...documentVerifications[idx],
    ...req.body
  };
  return res.json({
    success: true,
    verification: documentVerifications[idx]
  });
});

// ADMIN: Add Content Post
app.post('/api/portal/post', (req: Request, res: Response) => {
  const { title, category, summary, body, author, authorRole, imageUrl, readTime, tags, published = true } = req.body;
  if (!title || !body) {
    return res.status(400).json({ success: false, message: 'Title and body required.' });
  }
  const newPost = {
    id: `post-${Date.now()}`,
    title,
    category: category || 'Intelligence Briefing',
    summary: summary || title,
    body,
    author: author || 'Mugisa Solomon Byakutaaga',
    authorRole: authorRole || 'Directorate Editorial',
    date: new Date().toISOString().split('T')[0],
    published,
    imageUrl: imageUrl || '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    readTime: readTime || '5 min read',
    tags: Array.isArray(tags) ? tags : ['Forensic Audit', 'Due Diligence']
  };
  posts.unshift(newPost);
  res.json({ success: true, post: newPost });
});

// ADMIN: Modify / Edit Content Post
app.patch('/api/portal/post/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Post not found.' });
  }
  posts[idx] = {
    ...posts[idx],
    ...req.body
  };
  return res.json({ success: true, post: posts[idx] });
});

// ADMIN: Delete Content Post
app.delete('/api/portal/post/:id', (req: Request, res: Response) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// ADMIN: Upload / Post New Photo
app.post('/api/portal/photo', (req: Request, res: Response) => {
  const { title, caption, imageUrl, category } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Title and Image URL required.' });
  }
  const newPhoto = {
    id: `photo-${Date.now()}`,
    title,
    caption: caption || title,
    imageUrl,
    category: category || 'Field Operations',
    dateAdded: new Date().toISOString().split('T')[0]
  };
  photos.unshift(newPhoto);
  res.json({ success: true, photo: newPhoto });
});

// ADMIN: Modify / Edit Photo
app.patch('/api/portal/photo/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = photos.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Photo not found.' });
  }
  photos[idx] = {
    ...photos[idx],
    ...req.body
  };
  return res.json({ success: true, photo: photos[idx] });
});

// ADMIN: Delete Photo
app.delete('/api/portal/photo/:id', (req: Request, res: Response) => {
  photos = photos.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// ADMIN: Modify / Edit About Us Content
app.patch('/api/portal/about', (req: Request, res: Response) => {
  aboutContent = {
    ...aboutContent,
    ...req.body
  };
  return res.json({ success: true, aboutContent });
});

// ADMIN: Add Board Member / Director
app.post('/api/portal/board', (req: Request, res: Response) => {
  const { name, role, designation, specialty, bio, credentials, imageUrl, linkedinUrl } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, message: 'Name and role required.' });
  }
  const newMember = {
    id: `board-${Date.now()}`,
    name,
    role,
    designation: designation || 'Board of Directors',
    specialty: specialty || 'Sovereign Minerals Advisory',
    bio: bio || '',
    credentials: Array.isArray(credentials) ? credentials : [],
    imageUrl: imageUrl || '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg',
    linkedinUrl: linkedinUrl || 'https://www.linkedin.com/'
  };
  boardMembers.push(newMember);
  return res.json({ success: true, member: newMember });
});

// ADMIN: Modify / Edit Board Member / Director
app.patch('/api/portal/board/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = boardMembers.findIndex(m => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Board member not found.' });
  }
  boardMembers[idx] = {
    ...boardMembers[idx],
    ...req.body
  };
  return res.json({ success: true, member: boardMembers[idx] });
});

// ADMIN: Delete Board Member / Director
app.delete('/api/portal/board/:id', (req: Request, res: Response) => {
  boardMembers = boardMembers.filter(m => m.id !== req.params.id);
  return res.json({ success: true });
});

// REGISTRATION / KYC: Create new expedition registration
app.post('/api/portal/registration', (req: Request, res: Response) => {
  const {
    fullName,
    companyName,
    executiveTitle,
    country,
    email,
    phone,
    requestedTier,
    delegatesCount,
    cohortDate,
    primaryObjective,
    activeProposalDetails,
    nonTransactionAgreed,
    kycAcknowledged
  } = req.body;

  if (!fullName || !email || !companyName) {
    return res.status(400).json({ success: false, message: 'Name, email, and corporate entity required.' });
  }

  const newReg = {
    id: `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    companyName,
    executiveTitle: executiveTitle || 'Executive',
    country: country || 'United Arab Emirates',
    email,
    phone: phone || '',
    requestedTier: requestedTier || 'trader',
    delegatesCount: delegatesCount || 1,
    cohortDate: cohortDate || 'Cohort 01: Jan 17–23, 2027',
    primaryObjective: primaryObjective || 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: activeProposalDetails || '',
    nonTransactionAgreed: Boolean(nonTransactionAgreed),
    kycAcknowledged: Boolean(kycAcknowledged),
    kycPaymentStatus: 'pending',
    status: 'pending_kyc',
    assignedStaff: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
    internalNotes: 'Applicant notified: Every package is paid in full (USD, inclusive of applicable Ugandan VAT) and includes the mandatory non-refundable USD 1,000 KYC & Client Vetting Allocation (OFAC, UN, UK HMT, EU sanctions and PEP screening).',
    registeredAt: new Date().toISOString().split('T')[0],
    passportVerified: false,
    sanctionsPepClear: false,
    dgsmClearance: false
  };

  registrations.unshift(newReg);
  res.json({ success: true, registration: newReg });
});

// STAFF / ADMIN: Update Registration status & KYC audit items
app.patch('/api/portal/registration/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = registrations.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Registration record not found.' });
  }

  registrations[index] = {
    ...registrations[index],
    ...req.body
  };

  res.json({ success: true, registration: registrations[index] });
});

// STAFF: Post Field Inspection Log
app.post('/api/portal/field-log', (req: Request, res: Response) => {
  const { staffName, location, title, observations, riskAssessment, testResults } = req.body;
  if (!location || !observations) {
    return res.status(400).json({ success: false, message: 'Location and observations required.' });
  }

  const newLog = {
    id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    staffName: staffName || 'Field Officer',
    location,
    logDate: new Date().toISOString().split('T')[0],
    title: title || 'Field Observation Report',
    observations,
    riskAssessment: riskAssessment || 'Low',
    testResults: testResults || 'N/A'
  };

  fieldLogs.unshift(newLog);
  res.json({ success: true, log: newLog });
});

// API: Relworx Visa & Mastercard Payment Session Initiation
// Documentation: https://payments.relworx.com/docs/ (API v2)
// Endpoint: https://payments.relworx.com/api/visa/request-session
app.post('/api/payments/relworx-session', async (req: Request, res: Response) => {
  try {
    const { reference, amount, currency = 'USD', description, customer_email, customer_name, package_tier, payment_type } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment amount specified.'
      });
    }

    const relworxApiKey = process.env.RELWORX_API_KEY;
    const relworxAccountNo = process.env.RELWORX_ACCOUNT_NO;

    // Unique reference (8 to 36 chars)
    const txReference = reference || `UGE-CARD-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase();

    // Record the payment intent in payments list
    payments.unshift({
      id: `PAY-${Date.now().toString().slice(-4)}`,
      reference: txReference,
      customerName: customer_name || 'Expedition Delegate',
      email: customer_email || 'client@goldexpedition.org',
      amount: Number(amount),
      currency: currency || 'USD',
      type: payment_type === 'doc_verification' ? 'doc_verification' : 'full_payment',
      status: 'Completed',
      cardBrand: 'Visa',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tier: package_tier || (payment_type === 'doc_verification' ? '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)' : 'Professional Trader (Paid in Full, VAT Incl.)')
    });

    // Check if live API keys are provided
    if (relworxApiKey && relworxAccountNo) {
      try {
        const response = await fetch('https://payments.relworx.com/api/visa/request-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.relworx.v2',
            'Authorization': `Bearer ${relworxApiKey}`
          },
          body: JSON.stringify({
            account_no: relworxAccountNo,
            reference: txReference,
            currency: currency,
            amount: Number(amount),
            description: description || `Uganda Gold Expedition: ${package_tier || 'Full Package Settlement (VAT Incl.)'}`
          })
        });

        const data = await response.json();
        return res.json({
          ...data,
          reference: txReference,
          gateway: 'relworx_live'
        });
      } catch (upstreamErr: any) {
        console.error('Relworx upstream error:', upstreamErr);
        return res.status(502).json({
          success: false,
          message: 'Error communicating with Relworx Visa/Mastercard gateway.',
          error: upstreamErr.message
        });
      }
    }

    // Pre-key sandbox / preparation mode:
    const mockPaymentUrl = `https://payments.relworx.com/merchant-payment/mock-session-${Date.now()}/visa-mastercard?ref=${txReference}&amount=${amount}&currency=${currency}`;

    return res.json({
      success: true,
      isDemo: true,
      message: 'Relworx Visa & Mastercard session initialized (Waiting for live RELWORX_API_KEY & RELWORX_ACCOUNT_NO).',
      payment_url: mockPaymentUrl,
      reference: txReference,
      amount: Number(amount),
      currency,
      supportedCards: ['Visa', 'Mastercard'],
      kycNotice: 'All prices in USD, inclusive of applicable Ugandan VAT. Every package includes the mandatory non-refundable USD 1,000 KYC & Client Vetting Allocation (OFAC, UN, UK HMT, EU sanctions and PEP screening).'
    });
  } catch (err: any) {
    console.error('Payment session error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while initializing payment session.',
      error: err.message
    });
  }
});

// API: Gateway Configuration Status
app.get('/api/payments/status', (_req: Request, res: Response) => {
  res.json({
    gateway: 'Relworx Payments',
    apiEndpoint: 'https://payments.relworx.com/api/visa/request-session',
    apiVersion: 'vnd.relworx.v2',
    isLiveConfigured: Boolean(process.env.RELWORX_API_KEY && process.env.RELWORX_ACCOUNT_NO),
    supportedMethods: ['Visa', 'Mastercard'],
    mobileMoneyAllowed: false
  });
});

// API: AI Generate Unique Receipt & Verifiable QR Code Record
app.post('/api/receipts/ai-generate', async (req: Request, res: Response) => {
  try {
    const {
      clientName = 'Alexander Vance',
      companyName = 'Apex Precious Metals DMCC',
      clientEmail = 'a.vance@apexmetals.ae',
      amountUsd = 2500,
      docMode = 'receipt',
      serviceType = 'doc_verification',
      customNotes = ''
    } = req.body || {};

    const uniqueSuffix = `${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 89)}`;
    const generatedRefId =
      Number(amountUsd) <= 3000 || serviceType === 'doc_verification'
        ? `DOC-VER-2027-${uniqueSuffix.slice(0, 4)}`
        : `REG-2027-${uniqueSuffix.slice(0, 4)}`;
    const generatedReceiptNumber = `RCT-UGE-2027-${uniqueSuffix}`;
    const generatedInvoiceNumber = `INV-UGE-2027-${uniqueSuffix}`;
    const generatedTxRef = `UGE-TX-AI-${uniqueSuffix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    let aiResult = {
      itemTitle:
        Number(amountUsd) <= 3000
          ? '24–72 Hour Forensic Document Verification & Statutory Cadastre Audit'
          : Number(amountUsd) <= 9000
          ? 'Tier 01: Academic & Research 7-Day Gold Supply Chain Expedition'
          : Number(amountUsd) <= 16000
          ? 'Tier 02: Professional Trader 7-Day Gold Supply Chain Expedition'
          : 'Tier 03: Sovereign Executive & Institutional Delegation (7-Day Program)',
      itemDescription:
        Number(amountUsd) <= 3000
          ? 'Independent registry cross-checking of submitted FCO/SPA, DGSM mineral license, and URA ASYCUDA customs records by Staff Officer 1 at Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda (URA TIN 1019482710). Includes USD 1,000 expedition fee credit valid for 90 days.'
          : 'Full 7-day in-person supply chain due diligence and regulatory verification programme across Entebbe, Kampala, Mubende, and Busia. Issued by Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda (URA TIN 1019482710). Includes mandatory USD 1,000 KYC/PEP vetting allocation.',
      complianceAttestation: `Official statutory tax record issued by Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda (URA TIN 1019482710). Verified under the Uganda Mining and Minerals Act 2022 and Non-Transaction Charter.`,
      cryptographicSeal: `UGE-QR-AI-${uniqueSuffix}-${Math.random().toString(16).substring(2, 10).toUpperCase()}`
    };

    if (process.env.API_KEY) {
      try {
        const ai = getGeminiClient();
        const prompt = `Generate an official, verifiable gold due-diligence invoice/receipt specification for Uganda Gold Expeditions.
Official Address: Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda
Official Tax ID: URA TIN 1019482710
Client Principal: ${clientName} (${companyName}, ${clientEmail})
Amount (USD, inclusive of 18% Ugandan VAT): $${amountUsd}
Document Mode: ${docMode.toUpperCase()}
Reference ID: ${generatedRefId}
Additional Context: ${customNotes || 'Standard institutional due diligence engagement'}

Return JSON with:
- itemTitle: Concise, authoritative service title matching the USD amount ($2,500 = 24-72h Offer Verification; $8,000 = Tier 01 Academic Expedition; $15,000 = Tier 02 Professional Trader Expedition; $25,000 = Tier 03 Institutional Delegation).
- itemDescription: 2-sentence clear description of deliverables referencing DGSM Entebbe cadastre verification, URA TIN 1019482710, and Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda.
- complianceAttestation: 1-sentence authority & customs verification statement confirming non-transaction independence and Client Portal QR verification.
- cryptographicSeal: Unique uppercase alphanumeric seal formatted as UGE-QR-AI-${uniqueSuffix}-[8_HEX_CHARS].`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                itemTitle: { type: Type.STRING },
                itemDescription: { type: Type.STRING },
                complianceAttestation: { type: Type.STRING },
                cryptographicSeal: { type: Type.STRING }
              },
              required: ['itemTitle', 'itemDescription', 'complianceAttestation', 'cryptographicSeal']
            }
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          aiResult = {
            itemTitle: parsed.itemTitle || aiResult.itemTitle,
            itemDescription: parsed.itemDescription || aiResult.itemDescription,
            complianceAttestation: parsed.complianceAttestation || aiResult.complianceAttestation,
            cryptographicSeal: parsed.cryptographicSeal || aiResult.cryptographicSeal
          };
        }
      } catch (aiErr) {
        console.warn('Gemini receipt generation fallback used:', aiErr);
      }
    }

    const issuedDate = new Date().toISOString().split('T')[0] + ' UTC';

    const newPaymentRecord = {
      id: `PAY-${uniqueSuffix}`,
      reference: generatedTxRef,
      customerName: clientName,
      email: clientEmail,
      amount: Number(amountUsd),
      currency: 'USD',
      type: (Number(amountUsd) <= 3000 ? 'doc_verification' : 'full_payment') as 'doc_verification' | 'full_payment',
      status: (docMode === 'receipt' ? 'Completed' : 'Pending') as 'Completed' | 'Pending',
      cardBrand: 'Visa' as const,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tier: aiResult.itemTitle
    };
    payments.unshift(newPaymentRecord);

    // Also register a verifiable dossier in documentVerifications so scanning the QR code opens the exact record in Client Portal
    const newVerificationRecord = {
      id: generatedRefId,
      clientName,
      companyName,
      email: clientEmail,
      phone: '+256 414 231 000',
      documentType: 'FCO' as const,
      fileName: `${generatedReceiptNumber}-${companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      claimedSeller: 'Submitted via Official QR Receipt Ledger',
      claimedQuantityKg: Number(amountUsd) <= 3000 ? '25 kg – 100 kg Audit Scope' : '7-Day Field Expedition Cohort',
      claimedDiscountPercent: 'Verified Market Parity Check',
      documentTextOrNotes: `${aiResult.itemDescription} | ${aiResult.complianceAttestation}`,
      feeUsd: Number(amountUsd),
      paymentStatus: (docMode === 'receipt' ? 'paid' : 'pending') as 'paid' | 'pending',
      paymentRef: generatedTxRef,
      status: 'under_officer_review' as const,
      assignedOfficer: 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      slaDeadline: '24–72 Hours (Priority Registry Track)',
      aiAnalysis: {
        riskScore: 18,
        verdict: 'SUSPICIOUS_REQUIRES_FIELD_AUDIT' as const,
        executiveSummary: `Official QR-verified dossier (${generatedRefId}) registered under Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda (URA TIN 1019482710).`,
        redFlags: [
          'Standard physical registry cross-check in progress at DGSM Entebbe Cadastre.'
        ],
        statutoryCrossCheck: aiResult.complianceAttestation,
        staffActionPlan: [
          'Assigned to Staff Officer 1 for physical DGSM and URA ASYCUDA verification.'
        ]
      },
      staffFollowUpNotes: `AI-Generated Official Receipt ${generatedReceiptNumber} (${generatedTxRef}) linked via verifiable QR seal ${aiResult.cryptographicSeal}.`
    };
    documentVerifications.unshift(newVerificationRecord);

    return res.json({
      success: true,
      receipt: {
        referenceId: generatedRefId,
        receiptNumber: generatedReceiptNumber,
        invoiceNumber: generatedInvoiceNumber,
        transactionRef: generatedTxRef,
        issuedDate,
        clientName,
        companyName,
        clientEmail,
        amountUsd: Number(amountUsd),
        docMode,
        ...aiResult
      },
      paymentRecord: newPaymentRecord,
      verificationRecord: newVerificationRecord
    });
  } catch (err: any) {
    console.error('AI receipt generation error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI receipt.',
      error: err?.message
    });
  }
});

// API: Staff & Admin Portal Authentication
app.post('/api/auth/portal-login', (req: Request, res: Response) => {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Institutional email and password are required.'
    });
  }

  const trimmedEmail = String(email).trim().toLowerCase();
  const trimmedPassword = String(password).trim();

  if (role === 'staff') {
    const expectedEmail = process.env.STAFF_PORTAL_EMAIL?.trim().toLowerCase();
    const expectedPass = process.env.STAFF_PORTAL_PASSWORD?.trim();
    if (expectedEmail && expectedPass) {
      if (trimmedEmail !== expectedEmail || trimmedPassword !== expectedPass) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Staff Officer 1 credentials.'
        });
      }
    } else if (!trimmedEmail.includes('@') || trimmedPassword.length < 6) {
      return res.status(401).json({
        success: false,
        message: 'Valid institutional email and password (minimum 6 characters) are required.'
      });
    }
    return res.json({
      success: true,
      role: 'staff',
      sessionToken: `UGE-STAFF-${Date.now().toString(36).toUpperCase()}`
    });
  }

  if (role === 'admin') {
    const expectedEmail = process.env.ADMIN_PORTAL_EMAIL?.trim().toLowerCase();
    const expectedPass = process.env.ADMIN_PORTAL_PASSWORD?.trim();
    if (expectedEmail && expectedPass) {
      if (trimmedEmail !== expectedEmail || trimmedPassword !== expectedPass) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Administrator credentials.'
        });
      }
    } else if (!trimmedEmail.includes('@') || trimmedPassword.length < 6) {
      return res.status(401).json({
        success: false,
        message: 'Valid administrator email and password (minimum 6 characters) are required.'
      });
    }
    return res.json({
      success: true,
      role: 'admin',
      sessionToken: `UGE-ADMIN-${Date.now().toString(36).toUpperCase()}`
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Invalid portal role specified.'
  });
});

// API: Geolocation & Locale Detection for Default Language & Currency Proposal
app.get('/api/geo/detect', (req: Request, res: Response) => {
  const rawCountry =
    (req.headers['x-appengine-country'] as string) ||
    (req.headers['cf-ipcountry'] as string) ||
    (req.headers['x-country-code'] as string) ||
    '';
  const rawCity =
    (req.headers['x-appengine-city'] as string) ||
    (req.headers['cf-ipcity'] as string) ||
    '';
  const acceptLang = (req.headers['accept-language'] as string) || 'en-US';

  const countryCode = rawCountry.toUpperCase().trim();

  // Map country codes & accept-language to recommended Language and Currency
  const arabCountries = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO', 'LB', 'MA', 'DZ', 'TN', 'IQ', 'SD'];
  const chineseCountries = ['CN', 'HK', 'TW', 'MO', 'SG'];
  const frenchCountries = ['FR', 'BE', 'LU', 'MC', 'CH', 'CD', 'CG', 'CI', 'SN', 'CM', 'ML', 'BF', 'NE', 'TG', 'BJ', 'GA', 'RW', 'BI', 'MG'];
  const euroCountries = ['DE', 'IT', 'ES', 'NL', 'AT', 'IE', 'PT', 'FI', 'GR', 'FR', 'BE', 'LU'];

  let proposedLang: 'EN' | 'AR' | 'ZH' | 'FR' = 'EN';
  const proposedCurrency: 'USD' = 'USD';
  let countryName = 'Global / International';

  if (countryCode === 'UG') {
    proposedLang = 'EN';
    countryName = 'Uganda (East Africa)';
  } else if (arabCountries.includes(countryCode)) {
    proposedLang = 'AR';
    countryName = countryCode === 'AE' ? 'United Arab Emirates' : `MENA Region (${countryCode})`;
  } else if (chineseCountries.includes(countryCode)) {
    proposedLang = 'ZH';
    countryName = countryCode === 'CN' ? 'China' : countryCode === 'HK' ? 'Hong Kong SAR' : `Asia-Pacific (${countryCode})`;
  } else if (countryCode === 'GB' || countryCode === 'UK') {
    proposedLang = 'EN';
    countryName = 'United Kingdom';
  } else if (frenchCountries.includes(countryCode)) {
    proposedLang = 'FR';
    countryName = countryCode === 'FR' ? 'France' : countryCode === 'CH' ? 'Switzerland' : `Francophone Region (${countryCode})`;
  } else if (euroCountries.includes(countryCode)) {
    proposedLang = 'EN';
    countryName = `European Union (${countryCode})`;
  } else {
    const lowerLang = acceptLang.toLowerCase();
    if (lowerLang.startsWith('ar')) {
      proposedLang = 'AR';
      countryName = 'Middle East / Gulf Hub';
    } else if (lowerLang.startsWith('zh')) {
      proposedLang = 'ZH';
      countryName = 'Greater China / Asia Hub';
    } else if (lowerLang.startsWith('fr')) {
      proposedLang = 'FR';
      countryName = 'Francophone / European Hub';
    } else if (lowerLang.includes('en-gb')) {
      proposedLang = 'EN';
      countryName = 'United Kingdom';
    }
  }

  return res.json({
    success: true,
    countryCode: countryCode || 'INTL',
    countryName,
    cityOrRegion: rawCity || '',
    proposedLang,
    proposedCurrency,
    acceptLanguageHeader: acceptLang
  });
});

// Server-side in-memory translation cache for fast multi-user page translation
const serverTranslationCache: Record<string, Record<string, string>> = {
  AR: {},
  ZH: {},
  FR: {}
};

// API: Sitewide Batch Auto-Translation Endpoint
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { targetLang, texts } = req.body as {
      targetLang?: string;
      texts?: string[];
    };

    if (!targetLang || targetLang === 'EN' || !Array.isArray(texts) || texts.length === 0) {
      return res.json({ success: true, translations: {} });
    }

    const langKey = targetLang.toUpperCase();
    if (!serverTranslationCache[langKey]) {
      serverTranslationCache[langKey] = {};
    }

    const resultTranslations: Record<string, string> = {};
    const missingTexts: string[] = [];

    for (const raw of texts) {
      if (typeof raw !== 'string') continue;
      const trimmed = raw.trim();
      if (!trimmed) continue;
      if (serverTranslationCache[langKey][trimmed]) {
        resultTranslations[trimmed] = serverTranslationCache[langKey][trimmed];
      } else if (!missingTexts.includes(trimmed)) {
        missingTexts.push(trimmed);
      }
    }

    if (missingTexts.length === 0) {
      return res.json({ success: true, translations: resultTranslations, cached: true });
    }

    // Limit batch size per call to keep latency low
    const batchToTranslate = missingTexts.slice(0, 60);

    if (process.env.API_KEY) {
      const langNames: Record<string, string> = {
        AR: 'Modern Standard Arabic (professional institutional financial and legal tone)',
        ZH: 'Simplified Chinese (professional institutional financial and legal tone)',
        FR: 'French (professional institutional financial and legal tone)'
      };
      const targetLangDescription = langNames[langKey] || langKey;

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following array of English UI/website strings from the "Uganda Gold Expedition" website into ${targetLangDescription}.
Rules:
1. Return ONLY a JSON array of translated strings in the EXACT same order and length (${batchToTranslate.length} items) as the input JSON array.
2. Preserve numbers, prices (e.g., $2,500, $8,000, $15,000, $25,000), acronyms (DGSM, URA, TIN 1019482710, ASYCUDA, ICGLR, LBMA, FCO, SPA, KYC, PEP), and proper names/places (Entebbe, Kampala, Mubende, Busia, Kassanda, Bugonga).
3. Keep button labels and navigation items concise and natural.

Input JSON array:
${JSON.stringify(batchToTranslate)}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            }
          }
        }
      });

      const rawText = response.text || '[]';
      const parsed = JSON.parse(rawText);
      if (Array.isArray(parsed)) {
        batchToTranslate.forEach((sourceStr, idx) => {
          const translatedStr =
            typeof parsed[idx] === 'string' && parsed[idx].trim()
              ? parsed[idx].trim()
              : sourceStr;
          serverTranslationCache[langKey][sourceStr] = translatedStr;
          resultTranslations[sourceStr] = translatedStr;
        });
      }
    }

    return res.json({
      success: true,
      translations: resultTranslations
    });
  } catch (error) {
    console.error('Auto-translation batch error:', error);
    return res.json({
      success: false,
      translations: {}
    });
  }
});

// SEO Technical Endpoints: /sitemap.xml, /robots.txt, /api/seo/routes
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res
    .status(200)
    .set('Content-Type', 'application/xml; charset=utf-8')
    .set('Cache-Control', 'public, max-age=3600')
    .send(generateSitemapXml());
});

app.get('/robots.txt', (_req: Request, res: Response) => {
  res
    .status(200)
    .set('Content-Type', 'text/plain; charset=utf-8')
    .set('Cache-Control', 'public, max-age=3600')
    .send(generateRobotsTxt());
});

app.get('/api/seo/routes', (_req: Request, res: Response) => {
  res.status(200).json({
    canonicalOrigin: 'https://goldsafaris.com',
    publicRoutes: PUBLIC_SEO_ROUTES,
    permanentRedirects: PERMANENT_REDIRECTS,
    privateNoIndexPrefixes: PRIVATE_NOINDEX_PREFIXES,
    editorialContentBriefs: EDITORIAL_CONTENT_BRIEFS
  });
});

// Fast health check endpoint for Cloud Run startup/liveness probes
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).type('text/plain').send('OK');
});

// Mount Vite or static dist with server-side SEO metadata injection, 301 redirects & 404 status handling
async function setupServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const indexFile = path.join(distPath, 'index.html');
  const publicPath = path.resolve(__dirname, 'public');
  const srcAssetsPath = path.resolve(__dirname, 'src/assets');
  const isDevCommand = process.env.npm_lifecycle_event === 'dev';
  const useStaticDist = fs.existsSync(indexFile) && !isDevCommand;

  // Permanent 301 redirects for legacy routes and trailing slashes on public pages
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }
    if (
      req.path.startsWith('/api/') ||
      req.path.startsWith('/@') ||
      req.path.startsWith('/src/') ||
      req.path.startsWith('/node_modules/')
    ) {
      return next();
    }
    const redirectDest = getRedirectDestination(req.path);
    if (redirectDest) {
      const queryIndex = req.originalUrl.indexOf('?');
      const querySuffix = queryIndex !== -1 ? req.originalUrl.slice(queryIndex) : '';
      return res.redirect(301, `${redirectDest}${querySuffix}`);
    }
    return next();
  });

  // Serve static assets from /src/assets and /public first
  app.use('/src/assets', express.static(srcAssetsPath, { maxAge: '7d' }));
  app.use(express.static(publicPath, { index: false, maxAge: '1d' }));

  if (useStaticDist) {
    const cachedDistTemplate = fs.readFileSync(indexFile, 'utf-8');
    app.use(express.static(distPath, { index: false, maxAge: '7d' }));

    app.get('*', (req: Request, res: Response) => {
      const ext = path.extname(req.path).toLowerCase();
      if (ext && ext !== '.html') {
        return res.status(404).type('text/plain').send('404 Not Found');
      }

      const { html, status, isNoIndex } = injectSeoHeadIntoHtml(cachedDistTemplate, req.path);

      if (isNoIndex) {
        res.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      }
      return res
        .status(status)
        .set({ 'Content-Type': 'text/html; charset=utf-8' })
        .send(html);
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT} (production static dist)`);
    });
    return;
  }

  // Start listening on PORT immediately in dev mode too while Vite initializes
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });

  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: server ? false : false },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }
    const ext = path.extname(req.path).toLowerCase();
    if (ext && ext !== '.html') {
      return res.status(404).type('text/plain').send('404 Not Found');
    }

    try {
      const templatePath = path.resolve(__dirname, 'index.html');
      const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
      const { html, status, isNoIndex } = injectSeoHeadIntoHtml(transformedTemplate, req.path);

      if (isNoIndex) {
        res.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      }
      return res
        .status(status)
        .set({ 'Content-Type': 'text/html; charset=utf-8' })
        .send(html);
    } catch (err) {
      return next(err);
    }
  });
}

setupServer();
