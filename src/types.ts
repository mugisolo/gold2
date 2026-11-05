export type Language = 'EN' | 'AR' | 'ZH' | 'FR';

export type Currency = 'USD';

export interface GeoLocationProposal {
  countryCode: string;
  countryName: string;
  cityOrRegion: string;
  proposedLang: Language;
  proposedCurrency: Currency;
  detectionMethod: 'ip_headers' | 'timezone_locale' | 'gps_coordinates' | 'manual_preset';
}

export interface ItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  location: string;
  timeSlot: string;
  focus: string;
  description: string;
  keyActivities: string[];
  riskDeconstructed: string;
  executiveDeliverable: string;
  image?: string;
}

export interface PackageTier {
  id: 'academic' | 'trader' | 'sovereign';
  name: string;
  tierNumber: string;
  tagline: string;
  priceUsd: number;
  highlighted?: boolean;
  idealFor: string;
  accommodation: string;
  transport: string;
  features: string[];
  deliverables: string[];
  exclusiveBonus?: string;
}

export interface ScamRule {
  id: string;
  label: string;
  description: string;
  riskScore: number;
  category: 'pricing' | 'banking' | 'customs' | 'documentation';
  explanation: string;
}

export interface DigitalSignatureRecord {
  id: string;
  targetId: string;
  targetType: 'expedition_registration' | 'due_diligence_report';
  agreementTitle: string;
  signerFullName: string;
  signerTitle: string;
  signerCompany: string;
  signerEmail: string;
  passportOrIdNumber: string;
  signatureMethod: 'drawn_canvas' | 'typed_calligraphy';
  signatureDataUrl: string;
  typedSignatureText?: string;
  clausesAccepted: string[];
  sha256SealHash: string;
  signedAtUtc: string;
  certificateSerial: string;
}

export interface ExpeditionRegistration {
  id: string;
  fullName: string;
  companyName: string;
  executiveTitle: string;
  country: string;
  email: string;
  phone: string;
  requestedTier: 'academic' | 'trader' | 'sovereign';
  delegatesCount: number;
  cohortDate: string;
  primaryObjective: string;
  activeProposalDetails: string;
  nonTransactionAgreed: boolean;
  kycAcknowledged: boolean; // Confirms non-refundable USD 1000 KYC allocation included in package
  kycPaymentStatus: 'paid' | 'pending' | 'waived';
  status: 'pending_kyc' | 'under_review' | 'approved' | 'flagged' | 'rejected';
  assignedStaff?: string;
  internalNotes?: string;
  registeredAt: string;
  passportVerified?: boolean;
  sanctionsPepClear?: boolean;
  dgsmClearance?: boolean;
  digitalSignature?: DigitalSignatureRecord;
}

export interface DocumentVerification {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  documentType: 'Full Corporate Offer (FCO)' | 'Sales & Purchase Agreement (SPA)' | 'DGSM Mineral License' | 'URA Customs / Export Permit' | 'ICGLR Certificate' | 'Refinery Assay Report';
  claimedSeller: string;
  claimedQuantityKg: string;
  claimedDiscountPercent: string;
  documentTextOrNotes: string;
  fileName?: string;
  feeUsd: number; // 2500
  paymentStatus: 'paid' | 'pending';
  paymentRef?: string;
  assignedOfficer: string; // Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye
  status: 'analyzing' | 'assigned_to_staff_1' | 'dispatched_to_client';
  submittedAt: string;
  slaDeadline: string;
  aiAnalysis?: {
    riskScore: number;
    verdict: 'CRITICAL COUNTERFEIT RISK' | 'HIGH FRAUD PROBABILITY' | 'MODERATE ANOMALIES' | 'PRELIMINARY PASS (FIELD VERIFICATION REQUIRED)';
    executiveSummary: string;
    redFlags: string[];
    statutoryCrossCheck: string;
    staffActionPlan: string[];
  };
  staffFollowUpNotes?: string;
  digitalSignature?: DigitalSignatureRecord;
}

export interface ContentPost {
  id: string;
  slug?: string;
  title: string;
  h1?: string;
  seoTitle?: string;
  seoDescription?: string;
  category: 'Offer Risk' | 'Regulation' | 'Field Methods' | 'Metallurgy' | 'Field Dispatch' | 'Regulatory Alert' | 'Intelligence Briefing' | 'Market Update';
  summary: string;
  body: string;
  author: string;
  authorRole?: string;
  reviewer?: string;
  reviewerRole?: string;
  date: string;
  updatedDate?: string;
  published: boolean;
  imageUrl?: string;
  imageAlt?: string;
  readTime?: string;
  tags?: string[];
  sources?: string[];
  limitations?: string;
  nextStepLabel?: string;
  nextStepPath?: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Field Operations' | 'Assay Lab' | 'VIP Transport' | 'Refinery' | 'Concessions';
  dateAdded: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  designation: 'Board of Directors' | 'Executive Directorate' | 'Advisory Council';
  specialty: string;
  bio: string;
  credentials: string[];
  imageUrl?: string;
  linkedinUrl?: string;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  missionStatement: string;
  overviewParagraphs: string[];
  statutoryMandate: string;
  headquarters: string;
  establishedYear: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'Senior Due Diligence Officer' | 'Metallurgical Forensic Lead' | 'Legal Compliance Counsel' | 'Field Logistics Lead';
  accessLevel?: 'admin' | 'staff' | 'client';
  phone: string;
  activeCasesCount: number;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: 'admin' | 'staff';
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
}

export interface FieldLog {
  id: string;
  staffName: string;
  location: string;
  logDate: string;
  title: string;
  observations: string;
  riskAssessment: 'Low' | 'Medium' | 'High' | 'Severe';
  testResults?: string;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  amount: number;
  currency: string;
  type: 'full_payment' | 'doc_verification';
  status: 'Completed' | 'Pending' | 'Failed';
  cardBrand: 'Online Settlement' | 'Visa' | 'Mastercard';
  date: string;
  tier: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  persona?: 'forensics' | 'trade' | 'logistics';
  modelUsed?: string;
}

export interface WabaDispatchLog {
  id: string;
  registrationId: string;
  memberName: string;
  memberPhone: string;
  recipientDesk: string;
  templateType: 'urgent_assay_escort' | 'audit_status_ping' | 'tarmac_arrival' | 'custom_dispatch';
  messageBody: string;
  status: 'Delivered via WABA' | 'Queued' | 'Dispatched';
  timestamp: string;
}

export interface FaqItem {
  id: string;
  category: 'supply_chain' | 'due_diligence' | 'travel_logistics';
  categoryLabel: string;
  question: string;
  answer: string;
  statutoryRef?: string;
}


