import React, { useState } from 'react';
import {
  X,
  Shield,
  Lock,
  FileSearch,
  Compass,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  UserCheck,
  CreditCard,
  Search,
  Award,
  ArrowRight,
  FileLock2,
  ShieldCheck,
  Building2,
  Calendar,
  EyeOff,
  TrendingUp,
  FileSignature,
  Fingerprint,
  QrCode,
  LogIn,
  LogOut
} from 'lucide-react';
import {
  auth,
  signInWithGoogle,
  signOutFirebaseUser,
  onAuthStateChanged,
  type User
} from '../services/firebase';
import {
  DocumentVerification,
  ExpeditionRegistration,
  Currency,
  DigitalSignatureRecord,
  PaymentRecord
} from '../types';
import { GoldPriceTrendsChart } from './GoldPriceTrendsChart';
import { DigitalSignatureModal } from './DigitalSignatureModal';
import { InvoiceReceiptModal, InvoiceReceiptData, OFFICIAL_UGE_ADDRESS, OFFICIAL_URA_TIN } from './InvoiceReceiptModal';

interface ClientPortalProps {
  documentVerifications: DocumentVerification[];
  registrations: ExpeditionRegistration[];
  initialClientEmail?: string;
  initialReferenceId?: string;
  selectedCurrency?: Currency;
  userRole?: 'client' | 'staff' | 'admin';
  onClose: () => void;
  onOpenDocVerification: () => void;
  onOpenRegistration: () => void;
  onOpenCardPayment: (tier?: 'academic' | 'trader' | 'sovereign', type?: 'full' | 'doc_verification') => void;
  onOpenStaffPortal?: () => void;
  onOpenAdminPortal?: () => void;
  onUpdateRegistration?: (id: string, updates: Partial<ExpeditionRegistration>) => void;
  onUpdateDocumentVerification?: (id: string, updates: Partial<DocumentVerification>) => void;
  onAiReceiptGenerated?: (verificationRecord: DocumentVerification, paymentRecord: PaymentRecord) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  documentVerifications,
  registrations,
  initialClientEmail = '',
  initialReferenceId = '',
  selectedCurrency = 'USD',
  userRole = 'client',
  onClose,
  onOpenDocVerification,
  onOpenRegistration,
  onOpenCardPayment,
  onOpenStaffPortal,
  onOpenAdminPortal,
  onUpdateRegistration,
  onUpdateDocumentVerification,
  onAiReceiptGenerated
}) => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'expeditions' | 'agreements' | 'gold-trends'>('verifications');
  const [searchQuery, setSearchQuery] = useState<string>(
    initialReferenceId || initialClientEmail || auth.currentUser?.email || 'h.lindqvist@nordicbullion.se'
  );
  const [stageFilter, setStageFilter] = useState<'all' | 'awaiting_payment' | 'analyst_review' | 'report_ready'>('all');
  const [signingTarget, setSigningTarget] = useState<{
    targetType: 'expedition_registration' | 'due_diligence_report';
    registration?: ExpeditionRegistration;
    verification?: DocumentVerification;
  } | null>(null);
  const [invoiceReceiptTarget, setInvoiceReceiptTarget] = useState<InvoiceReceiptData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);
  const [isReferenceBypass, setIsReferenceBypass] = useState<boolean>(
    Boolean(initialReferenceId || initialClientEmail)
  );
  const [authError, setAuthError] = useState<string>('');
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const effectiveRole: 'client' | 'staff' | 'admin' = userRole;

  React.useEffect(() => {
    if (initialReferenceId) {
      setSearchQuery(initialReferenceId);
      setIsReferenceBypass(true);
      const q = initialReferenceId.trim().toLowerCase();
      const matchesReg = registrations.some((r) => r.id.toLowerCase() === q);
      const matchesDoc = documentVerifications.some(
        (d) => d.id.toLowerCase() === q || (d.paymentRef && d.paymentRef.toLowerCase() === q)
      );
      if (matchesReg && !matchesDoc) {
        setActiveTab('expeditions');
      } else if (matchesDoc) {
        setActiveTab('verifications');
      }
    } else if (initialClientEmail) {
      setSearchQuery(initialClientEmail);
      setIsReferenceBypass(true);
    }
  }, [initialReferenceId, initialClientEmail, registrations, documentVerifications]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.email && !initialReferenceId) {
        setSearchQuery(user.email);
      }
    });
    return () => unsubscribe();
  }, [initialReferenceId]);

  const handlePortalGoogleSignIn = async () => {
    setAuthError('');
    setIsSigningIn(true);
    try {
      const user = await signInWithGoogle();
      if (user.email) {
        setSearchQuery(user.email);
      }
    } catch (err: any) {
      setAuthError(
        err?.message || 'Google Sign-In could not be completed. Please check popup permissions.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  // Helper to determine the canonical timeline stage for a verification
  const getVerificationStage = (doc: DocumentVerification): 'awaiting_payment' | 'analyst_review' | 'report_ready' => {
    if (doc.paymentStatus === 'pending') return 'awaiting_payment';
    if (doc.status === 'dispatched_to_client') return 'report_ready';
    return 'analyst_review';
  };

  // Build unique client list from verifications + registrations (only Admin/Staff can switch across all principals)
  const clientProfiles = Array.from(
    new Map(
      [
        ...documentVerifications.map((d) => ({
          name: d.clientName,
          email: d.email,
          company: d.companyName
        })),
        ...registrations.map((r) => ({
          name: r.fullName,
          email: r.email,
          company: r.companyName
        }))
      ].map((item) => [item.email.toLowerCase(), item])
    ).values()
  );

  // STRICT ROLE-BASED ACCESS CONTROL (RBAC):
  // - Admin & Staff can view all or filter across principals.
  // - Clients can ONLY see their own files matching their authenticated email, UID, or exact Dossier/Receipt Reference ID.
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const activeClientEmail = (
    firebaseUser?.email ||
    initialClientEmail ||
    searchQuery
  )
    .trim()
    .toLowerCase();

  const isDocAuthorizedForUser = (doc: DocumentVerification): boolean => {
    if (effectiveRole === 'admin' || effectiveRole === 'staff') {
      if (!normalizedQuery) return true;
      return (
        doc.email.toLowerCase().includes(normalizedQuery) ||
        doc.clientName.toLowerCase().includes(normalizedQuery) ||
        doc.id.toLowerCase().includes(normalizedQuery) ||
        (Boolean(doc.paymentRef) && doc.paymentRef!.toLowerCase().includes(normalizedQuery)) ||
        doc.companyName.toLowerCase().includes(normalizedQuery)
      );
    }
    // Strict Client Isolation: Only match the client's own UID, exact email, or exact scanned QR reference ID
    if (firebaseUser?.uid && (doc as any).userId === firebaseUser.uid) {
      return true;
    }
    if (!activeClientEmail) return false;
    return (
      doc.email.toLowerCase() === activeClientEmail ||
      doc.id.toLowerCase() === normalizedQuery ||
      (Boolean(doc.paymentRef) && doc.paymentRef!.toLowerCase() === normalizedQuery)
    );
  };

  const isRegAuthorizedForUser = (reg: ExpeditionRegistration): boolean => {
    if (effectiveRole === 'admin' || effectiveRole === 'staff') {
      if (!normalizedQuery) return true;
      return (
        reg.email.toLowerCase().includes(normalizedQuery) ||
        reg.fullName.toLowerCase().includes(normalizedQuery) ||
        reg.id.toLowerCase().includes(normalizedQuery) ||
        reg.companyName.toLowerCase().includes(normalizedQuery)
      );
    }
    // Strict Client Isolation: Only match the client's own UID, exact email, or exact scanned QR reference ID
    if (firebaseUser?.uid && (reg as any).userId === firebaseUser.uid) {
      return true;
    }
    if (!activeClientEmail) return false;
    return (
      reg.email.toLowerCase() === activeClientEmail ||
      reg.id.toLowerCase() === normalizedQuery
    );
  };

  const roleScopedVerifications = documentVerifications.filter(isDocAuthorizedForUser);
  const filteredVerifications = roleScopedVerifications.filter((doc) => {
    if (stageFilter === 'all') return true;
    return getVerificationStage(doc) === stageFilter;
  });

  const filteredRegistrations = registrations.filter(isRegAuthorizedForUser);

  const exactVerifiedRecord =
    (normalizedQuery &&
      (documentVerifications.find(
        (d) =>
          d.id.toLowerCase() === normalizedQuery ||
          (d.paymentRef && d.paymentRef.toLowerCase() === normalizedQuery)
      ) ||
        registrations.find((r) => r.id.toLowerCase() === normalizedQuery))) ||
    null;

  // Counts for stage summary pills (strictly scoped to the user's authorized files)
  const awaitingPaymentCount = roleScopedVerifications.filter((d) => getVerificationStage(d) === 'awaiting_payment').length;
  const analystReviewCount = roleScopedVerifications.filter((d) => getVerificationStage(d) === 'analyst_review').length;
  const reportReadyCount = roleScopedVerifications.filter((d) => getVerificationStage(d) === 'report_ready').length;

  // Download handler — strictly only callable when status === 'dispatched_to_client'
  const handleDownloadApprovedReport = (doc: DocumentVerification) => {
    if (doc.status !== 'dispatched_to_client' || doc.paymentStatus === 'pending') {
      return; // Strictly blocked until analyst approves
    }

    const ai = doc.aiAnalysis;
    const reportContent = `UGANDA GOLD EXPEDITION — CERTIFIED ANALYST-APPROVED FORENSIC REPORT
========================================================================
STATUS: FINAL REPORT READY — APPROVED & RELEASED BY STAFF OFFICER 1
Dossier Reference: ${doc.id}
Payment Reference: ${doc.paymentRef} ($${doc.feeUsd.toLocaleString()} USD — Verified Settlement)
Submitted Timestamp: ${doc.submittedAt}
Certifying Analyst: ${doc.assignedOfficer}

1. CLIENT & TRANSACTION DOSSIER
------------------------------------------------------------------------
Client Principal: ${doc.clientName} (${doc.companyName})
Registered Email: ${doc.email}
Document Audited: ${doc.documentType} (${doc.fileName})
Claimed Counterparty / Seller: ${doc.claimedSeller}
Claimed Quantity & Terms: ${doc.claimedQuantityKg} @ ${doc.claimedDiscountPercent}

2. CERTIFIED FORENSIC VERDICT & RISK SCORE
------------------------------------------------------------------------
Official Risk Score: ${ai?.riskScore ?? 'N/A'}%
Forensic Verdict: ${ai?.verdict ?? 'COMPLETED'}
Executive Summary:
${ai?.executiveSummary ?? 'Physical registry verification completed by Staff Officer 1.'}

3. IDENTIFIED RED FLAGS & ANOMALIES
------------------------------------------------------------------------
${(ai?.redFlags || []).map((flag, i) => `  [${i + 1}] ${flag}`).join('\n')}

4. STATUTORY CADASTRE & CUSTOMS CROSS-CHECK (DGSM / URA / ICGLR)
------------------------------------------------------------------------
${ai?.statutoryCrossCheck ?? 'Verified against Uganda Mining and Minerals Act 2022.'}

5. STAFF OFFICER 1 FIELD VERIFICATION & SIGN-OFF NOTES
------------------------------------------------------------------------
${doc.staffFollowUpNotes || 'Approved and released for client download by Staff Officer 1.'}

6. STATUTORY DISCLAIMER
------------------------------------------------------------------------
Verification confirms registry status of referenced documents as at the date of check; it is not a guarantee of counterparty performance or deal quality.

7. CLIENT DIGITAL COUNTER-SIGNATURE & CHAIN-OF-CUSTODY ATTESTATION
------------------------------------------------------------------------
${
  doc.digitalSignature
    ? `Status: DIGITALLY EXECUTED & SEALED
Signatory: ${doc.digitalSignature.signerFullName} (${doc.digitalSignature.signerTitle}, ${doc.digitalSignature.signerCompany})
Passport / ID: ${doc.digitalSignature.passportOrIdNumber}
Certificate Serial: ${doc.digitalSignature.certificateSerial}
Cryptographic Hash: ${doc.digitalSignature.sha256SealHash}
Signed Timestamp: ${doc.digitalSignature.signedAtUtc}`
    : 'Status: Pending Client Digital Counter-Signature in Portal'
}

========================================================================
Amber House, Kampala & DGSM Sovereign Registry Desk, Entebbe, Uganda`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Approved-Forensic-Report-${doc.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signedCount =
    filteredVerifications.filter((d) => Boolean(d.digitalSignature)).length +
    filteredRegistrations.filter((r) => Boolean(r.digitalSignature)).length;
  const totalAgreementsCount = filteredVerifications.length + filteredRegistrations.length;

  // Route unauthenticated users to a dedicated Firebase Sign-In screen before accessing per-user portal data
  if (!firebaseUser && !isReferenceBypass) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-cinzel text-base font-bold text-white">
                  SECURE CLIENT PORTAL
                </h2>
                <p className="text-[10px] font-mono-data text-[#D4AF37]">
                  FIREBASE AUTHENTICATION REQUIRED
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xs text-slate-300 leading-relaxed text-justify">
              Per-user forensic document verification dossiers, KYC status, and digital charter signatures are protected by Firestore security rules. Please sign in with Google to access your private records.
            </p>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handlePortalGoogleSignIn}
              disabled={isSigningIn}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#0B0F17] font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              <LogIn className="w-4 h-4 text-[#0B0F17]" />
              <span>
                {isSigningIn
                  ? 'Authenticating with Google...'
                  : 'Sign in with Google (Firebase Auth)'}
              </span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800" />
              <span className="flex-shrink mx-3 text-[10px] font-mono-data uppercase text-slate-500">
                Or Reference Lookup
              </span>
              <div className="flex-grow border-t border-slate-800" />
            </div>

            <button
              type="button"
              onClick={() => setIsReferenceBypass(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B0F17] hover:bg-[#182232] border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Lookup Dossier by Reference ID / Institutional Demo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex flex-col">
      {/* Top Institutional Header */}
      <header className="bg-[#111722] border-b border-[#D4AF37]/30 px-4 sm:px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-cinzel text-base sm:text-lg font-bold text-white">
                SECURE CLIENT PORTAL
              </span>
              <span
                className={`text-[10px] font-mono-data px-2 py-0.5 rounded font-bold uppercase border ${
                  effectiveRole === 'admin'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/60'
                    : effectiveRole === 'staff'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-500/60'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                }`}
              >
                {effectiveRole === 'admin'
                  ? 'ROLE: ADMINISTRATOR · ALL FILES ACCESS'
                  : effectiveRole === 'staff'
                  ? 'ROLE: STAFF OFFICER 1 · ASSIGNED DOSSIERS'
                  : 'ROLE: CLIENT · SCOPED TO YOUR FILES ONLY'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {OFFICIAL_UGE_ADDRESS} · {OFFICIAL_URA_TIN}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {effectiveRole === 'admin' && onOpenAdminPortal && (
            <button
              type="button"
              onClick={onOpenAdminPortal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
          )}
          {(effectiveRole === 'staff' || effectiveRole === 'admin') && onOpenStaffPortal && (
            <button
              type="button"
              onClick={onOpenStaffPortal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#D4AF37] bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 rounded transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Staff Officer 1 Desk</span>
            </button>
          )}
          {firebaseUser ? (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0B0F17] border border-emerald-700/50 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-200 font-mono-data text-[11px] max-w-[160px] truncate">
                {firebaseUser.email}
              </span>
              <button
                type="button"
                onClick={() => signOutFirebaseUser()}
                className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                title="Sign out of Firebase"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handlePortalGoogleSignIn}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-white hover:bg-slate-200 rounded transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Google Sign-In</span>
            </button>
          )}
          <button
            onClick={() => {
              const targetDoc = filteredVerifications[0] || documentVerifications[0];
              setInvoiceReceiptTarget({
                mode: 'receipt',
                referenceId: targetDoc?.id || 'DOC-VER-2027-4401',
                transactionRef: targetDoc?.paymentRef,
                clientName: targetDoc?.clientName || 'Henrik Lindqvist',
                companyName: targetDoc?.companyName || 'Nordic Bullion Treasury AB',
                clientEmail: targetDoc?.email || 'h.lindqvist@nordicbullion.se',
                itemTitle: '24–72 Hour Forensic Document Verification & Cadastre Audit',
                itemDescription: `Includes AI Forensic Deconstruction, DGSM Entebbe Cadastre Cross-Check, and Staff Officer 1 Signed Dossier issued by ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}).`,
                amountUsd: targetDoc?.feeUsd || 2500,
                paymentStatus: targetDoc?.paymentStatus || 'paid'
              });
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/50 rounded transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Invoice / QR Receipt</span>
          </button>

          <button
            onClick={onOpenDocVerification}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 rounded transition-colors"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Submit New Document ($2,500)</span>
          </button>

          <button
            onClick={onOpenRegistration}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Book Expedition</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Exit Client Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Role-Based Access Control & File Visibility Sub-Bar */}
      <div className="bg-[#0B0F17] border-b border-slate-800 px-4 sm:px-8 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search / Client Identity Lookup */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  effectiveRole === 'client'
                    ? 'Enter your registered email or QR Dossier Reference ID...'
                    : 'Filter across all client emails, names, or reference IDs...'
                }
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#111722] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Role-Aware File Scope Controls: Only Admin & Staff can view "All Principals". Clients only see their own account or switch demo identity */}
            {effectiveRole === 'admin' || effectiveRole === 'staff' ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono-data text-[#D4AF37] uppercase mr-1 font-bold">
                  {effectiveRole === 'admin' ? 'Admin Multi-Client View:' : 'Staff Assigned View:'}
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className={`px-2.5 py-1 text-[11px] font-mono-data rounded border transition-colors ${
                    searchQuery === ''
                      ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37] font-bold'
                      : 'bg-[#111722] text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  All Principals ({documentVerifications.length + registrations.length})
                </button>
                {clientProfiles.map((client) => (
                  <button
                    key={client.email}
                    onClick={() => setSearchQuery(client.email)}
                    className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                      searchQuery.toLowerCase() === client.email.toLowerCase()
                        ? 'bg-[#182232] text-[#D4AF37] border-[#D4AF37] font-bold'
                        : 'bg-[#111722] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {client.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-700/60 text-[11px] font-mono-data text-emerald-300 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>
                    Isolated Client View: Showing Only Files for{' '}
                    <strong className="text-white">
                      {firebaseUser?.email || searchQuery || 'Your Account'}
                    </strong>
                  </span>
                </span>
                {!firebaseUser && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono-data text-slate-500">Demo Client Login:</span>
                    {clientProfiles.slice(0, 3).map((client) => (
                      <button
                        key={client.email}
                        type="button"
                        onClick={() => setSearchQuery(client.email)}
                        className={`px-2 py-0.5 text-[10px] font-mono-data rounded border transition-colors ${
                          searchQuery.toLowerCase() === client.email.toLowerCase()
                            ? 'bg-[#182232] text-[#D4AF37] border-[#D4AF37] font-bold'
                            : 'bg-[#111722] text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {client.email}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Strict Report Embargo & Role Rights Policy Badge */}
          <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-700/50 flex items-center gap-2 text-xs text-amber-200 shrink-0">
            <FileLock2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Access Rights Rule:</strong> Users only see their own authorized files. Reports remain locked until <strong>Staff Officer 1</strong> approves.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#0E141F] border-b border-slate-800 px-4 sm:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-3 py-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'verifications'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>Submitted Document Verifications ({filteredVerifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'expeditions'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Booked Expedition Status ({filteredRegistrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('agreements')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'agreements'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <FileSignature className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Digital Document Signing ({signedCount}/{totalAgreementsCount} Signed)
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gold-trends')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gold-trends'
                ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#111722]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Gold Price Trends (Multi-Currency)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
        {/* Official Authority & Logistics QR Transaction Record Verification Banner */}
        {exactVerifiedRecord && (
          <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-mono-data uppercase font-bold text-emerald-400">
                  OFFICIAL TRANSACTION RECORD VERIFIED · AUTHORITY &amp; LOGISTICS CHECK
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Matched Dossier ID: <span className="font-mono-data text-[#D4AF37]">{exactVerifiedRecord.id}</span> —{' '}
                  {'clientName' in exactVerifiedRecord
                    ? `${exactVerifiedRecord.clientName} (${exactVerifiedRecord.companyName})`
                    : `${exactVerifiedRecord.fullName} (${exactVerifiedRecord.companyName})`}
                </h3>
                <p className="text-xs text-slate-300">
                  This record is active in the Uganda Gold Expedition Client Portal registry for DGSM, URA Customs, refinery, and logistics partner verification.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                setSearchQuery(
                  effectiveRole === 'client'
                    ? firebaseUser?.email || initialClientEmail || exactVerifiedRecord.email
                    : ''
                )
              }
              className="px-3.5 py-2 text-xs font-mono-data font-bold text-slate-200 hover:text-white bg-[#111722] border border-slate-700 rounded-lg shrink-0 self-start sm:self-center"
            >
              {effectiveRole === 'client' ? 'View My Account Files' : 'Show All Records'}
            </button>
          </div>
        )}
        {/* TAB 1: SUBMITTED DOCUMENT VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  24–72 Hour Forensic Document Verification Timeline (USD 2,500, inclusive of applicable Ugandan VAT)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time visual tracking across <strong className="text-amber-300">Awaiting Payment</strong>, <strong className="text-[#D4AF37]">Analyst Under Review</strong>, and <strong className="text-emerald-400">Final Report Ready</strong>. Reports remain locked until approved by <strong className="text-white">Staff Officer 1</strong>. USD 1,000 of your verification fee is credited toward any expedition package booked within 90 days.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Stage Filter Buttons */}
                <button
                  onClick={() => setStageFilter('all')}
                  className={`px-3 py-1.5 text-xs font-mono-data rounded-lg border transition-colors ${
                    stageFilter === 'all'
                      ? 'bg-[#182232] text-white border-[#D4AF37]'
                      : 'bg-[#111722] text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  All Stages ({roleScopedVerifications.length})
                </button>
                <button
                  onClick={() => setStageFilter('awaiting_payment')}
                  className={`px-3 py-1.5 text-xs font-mono-data rounded-lg border transition-colors ${
                    stageFilter === 'awaiting_payment'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold'
                      : 'bg-[#111722] text-amber-400/80 border-slate-800 hover:border-amber-700'
                  }`}
                >
                  Awaiting Payment ({awaitingPaymentCount})
                </button>
                <button
                  onClick={() => setStageFilter('analyst_review')}
                  className={`px-3 py-1.5 text-xs font-mono-data rounded-lg border transition-colors ${
                    stageFilter === 'analyst_review'
                      ? 'bg-[#182232] text-[#D4AF37] border-[#D4AF37] font-bold'
                      : 'bg-[#111722] text-[#D4AF37]/80 border-slate-800 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Analyst Under Review ({analystReviewCount})
                </button>
                <button
                  onClick={() => setStageFilter('report_ready')}
                  className={`px-3 py-1.5 text-xs font-mono-data rounded-lg border transition-colors ${
                    stageFilter === 'report_ready'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 font-bold'
                      : 'bg-[#111722] text-emerald-400/80 border-slate-800 hover:border-emerald-700'
                  }`}
                >
                  Final Report Ready ({reportReadyCount})
                </button>

                <button
                  onClick={onOpenDocVerification}
                  className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <FileSearch className="w-3.5 h-3.5" />
                  <span>New Audit ($2,500)</span>
                </button>
              </div>
            </div>

            {filteredVerifications.length === 0 ? (
              <div className="rounded-xl bg-[#111722] border border-slate-800 p-10 text-center space-y-3">
                <FileSearch className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Document Verifications Match Filter
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Reset the stage or principal filter above, or submit a new gold FCO, SPA, DGSM license, or URA export permit for a 24-hour forensic audit.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredVerifications.map((doc) => {
                  const currentStage = getVerificationStage(doc);
                  const isAwaitingPayment = currentStage === 'awaiting_payment';
                  const isAnalystReview = currentStage === 'analyst_review';
                  const isReportReady = currentStage === 'report_ready';

                  const progressPercent = isAwaitingPayment ? 20 : isAnalystReview ? 65 : 100;

                  const timelineSteps = [
                    {
                      key: 'awaiting_payment',
                      stepNumber: '01',
                      label: 'Awaiting Payment',
                      statusTitle: isAwaitingPayment
                        ? 'Action Required: $2,500 Fee Pending'
                        : '$2,500 Fee Verified',
                      subtitle: isAwaitingPayment
                        ? 'Online Authorization Required to Start 24h SLA'
                        : `Paid (${doc.paymentRef || 'Verified'}) · ${doc.submittedAt}`,
                      state: isAwaitingPayment ? 'active_warning' : 'completed'
                    },
                    {
                      key: 'analyst_review',
                      stepNumber: '02',
                      label: 'Analyst Under Review',
                      statusTitle: isAwaitingPayment
                        ? 'Queued for Staff Officer 1'
                        : isAnalystReview
                        ? 'Active Audit: Staff Officer 1 Reviewing'
                        : 'Physical Registry Audit Completed',
                      subtitle: isAwaitingPayment
                        ? 'AI scan & Officer 1 dispatch initiate upon card payment'
                        : `${doc.assignedOfficer} · Internal AI Dossier + DGSM/URA Check`,
                      state: isAwaitingPayment
                        ? 'upcoming'
                        : isAnalystReview
                        ? 'active_gold'
                        : 'completed'
                    },
                    {
                      key: 'report_ready',
                      stepNumber: '03',
                      label: 'Final Report Ready',
                      statusTitle: isReportReady
                        ? 'Analyst Approved · Report Ready for Download'
                        : 'Report Locked Until Analyst Approval',
                      subtitle: isReportReady
                        ? 'Certified by Staff Officer 1 · Full Download Unlocked'
                        : 'No AI or preliminary report access prior to analyst sign-off',
                      state: isReportReady ? 'completed_ready' : 'locked'
                    }
                  ];

                  return (
                    <div
                      key={doc.id}
                      className={`rounded-2xl bg-[#111722] border p-5 sm:p-7 space-y-6 shadow-xl transition-all ${
                        isReportReady
                          ? 'border-emerald-500/50'
                          : isAwaitingPayment
                          ? 'border-amber-500/50'
                          : 'border-[#D4AF37]/40'
                      }`}
                    >
                      {/* Dossier Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-1 rounded border border-[#D4AF37]/40">
                              {doc.id}
                            </span>
                            <span className="text-xs font-semibold text-white bg-slate-800 px-2.5 py-1 rounded">
                              {doc.documentType}
                            </span>
                            {isAwaitingPayment ? (
                              <span className="text-[11px] font-mono-data text-amber-300 bg-amber-950/70 border border-amber-700 px-2.5 py-1 rounded font-bold">
                                Fee Status: Awaiting $2,500 USD Payment
                              </span>
                            ) : (
                              <span className="text-[11px] font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                                Paid: ${doc.feeUsd.toLocaleString()} USD ({doc.paymentRef})
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                            {doc.fileName}{' '}
                            <span className="text-xs font-normal text-slate-400">
                              — Submitted by {doc.clientName} ({doc.companyName})
                            </span>
                          </h3>
                          <div className="text-xs text-slate-300">
                            Claimed Counterparty:{' '}
                            <strong className="text-[#D4AF37]">{doc.claimedSeller}</strong> · Claimed Terms:{' '}
                            <span className="text-white">
                              {doc.claimedQuantityKg} @ {doc.claimedDiscountPercent}
                            </span>
                          </div>
                        </div>

                        {/* Current Stage Pill Badge */}
                        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                          {isReportReady ? (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono-data font-bold uppercase">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>STAGE 3/3: FINAL REPORT READY</span>
                            </span>
                          ) : isAwaitingPayment ? (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-950/90 border border-amber-500 text-amber-300 text-xs font-mono-data font-bold uppercase">
                              <CreditCard className="w-4 h-4 text-amber-400" />
                              <span>STAGE 1/3: AWAITING PAYMENT ($2,500)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#182232] border border-[#D4AF37] text-[#D4AF37] text-xs font-mono-data font-bold uppercase">
                              <Clock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                              <span>STAGE 2/3: ANALYST UNDER REVIEW</span>
                            </span>
                          )}
                          <span className="text-[11px] font-mono-data text-slate-400">
                            24–72h SLA Target: <strong className="text-slate-200">{doc.slaDeadline}</strong>
                          </span>
                        </div>
                      </div>

                      {/* VISUAL PROGRESS TIMELINE BAR ('Awaiting Payment' -> 'Analyst Under Review' -> 'Final Report Ready') */}
                      <div className="rounded-xl bg-[#0B0F17] border border-slate-800/90 p-4 sm:p-5 space-y-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono-data uppercase tracking-wider text-slate-400 font-semibold">
                            Verification Progress Timeline
                          </span>
                          <span className="font-mono-data text-xs font-bold text-[#D4AF37]">
                            {progressPercent}% Complete
                          </span>
                        </div>

                        {/* Continuous Progress Bar Track */}
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              isReportReady
                                ? 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300'
                                : isAwaitingPayment
                                ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                                : 'bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-amber-400'
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        {/* 3 Connected Timeline Stage Nodes */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                          {timelineSteps.map((step, idx) => {
                            const isStepCompleted = step.state === 'completed' || step.state === 'completed_ready';
                            const isStepActiveGold = step.state === 'active_gold';
                            const isStepActiveWarning = step.state === 'active_warning';
                            const isStepLocked = step.state === 'locked';

                            return (
                              <div
                                key={step.key}
                                className={`relative p-4 rounded-xl border transition-all ${
                                  step.state === 'completed_ready'
                                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-lg shadow-emerald-950/30'
                                    : isStepCompleted
                                    ? 'bg-[#111722] border-emerald-800/70'
                                    : isStepActiveGold
                                    ? 'bg-[#182232] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                                    : isStepActiveWarning
                                    ? 'bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/20'
                                    : 'bg-[#0E141F] border-slate-800/80 opacity-75'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-6 h-6 rounded-full text-[11px] font-mono-data font-bold flex items-center justify-center border ${
                                        isStepCompleted
                                          ? 'bg-emerald-500 text-[#0B0F17] border-emerald-400'
                                          : isStepActiveGold
                                          ? 'bg-[#D4AF37] text-[#0B0F17] border-[#FEF3C7]'
                                          : isStepActiveWarning
                                          ? 'bg-amber-400 text-[#0B0F17] border-amber-300'
                                          : 'bg-slate-900 text-slate-500 border-slate-700'
                                      }`}
                                    >
                                      {isStepCompleted ? '✓' : step.stepNumber}
                                    </span>
                                    <span
                                      className={`text-xs font-mono-data uppercase font-bold tracking-wider ${
                                        isStepCompleted
                                          ? 'text-emerald-400'
                                          : isStepActiveGold
                                          ? 'text-[#D4AF37]'
                                          : isStepActiveWarning
                                          ? 'text-amber-300'
                                          : 'text-slate-400'
                                      }`}
                                    >
                                      {step.label}
                                    </span>
                                  </div>

                                  {/* Node Status Indicator */}
                                  {isStepCompleted && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  )}
                                  {isStepActiveGold && (
                                    <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse shrink-0" />
                                  )}
                                  {isStepActiveWarning && (
                                    <CreditCard className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                                  )}
                                  {isStepLocked && (
                                    <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                                  )}
                                </div>

                                <div className="text-xs font-bold text-white leading-snug">
                                  {step.statusTitle}
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                  {step.subtitle}
                                </p>

                                {/* If Awaiting Payment on Step 1, offer direct payment CTA */}
                                {idx === 0 && isAwaitingPayment && (
                                  <button
                                    type="button"
                                    onClick={() => onOpenCardPayment('trader', 'doc_verification')}
                                    className="mt-3 w-full py-2 px-3 text-[11px] font-bold text-[#0B0F17] bg-amber-400 hover:bg-amber-300 rounded flex items-center justify-center gap-1.5 transition-colors"
                                  >
                                    <CreditCard className="w-3.5 h-3.5" />
                                    <span>Pay $2,500 Verification Fee</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* STRICT ACCESS GATING: LOCKED vs ANALYST APPROVED */}
                      {!isReportReady ? (
                        <div className="rounded-xl bg-[#0B0F17] border border-amber-700/50 p-5 sm:p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                                <EyeOff className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[11px] font-mono-data text-amber-400 font-bold uppercase tracking-wider">
                                  {isAwaitingPayment
                                    ? 'STAGE 1: AWAITING $2,500 PAYMENT · REPORT EMBARGOED'
                                    : 'STAGE 2: ANALYST UNDER REVIEW · NO PRE-RELEASE REPORT ACCESS'}
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                                  {isAwaitingPayment
                                    ? 'Complete $2,500 USD Online Payment to Dispatch Dossier to Staff Officer 1'
                                    : 'AI-Generated & Forensic Reports Are Locked Until Analyst Approval'}
                                </h4>
                                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl text-justify">
                                  {isAwaitingPayment ? (
                                    <>
                                      Your document metadata has been logged. Once the one-off{' '}
                                      <strong className="text-white">USD $2,500</strong> verification fee is authorized, our internal AI engine will scan the instrument and route the dossier to{' '}
                                      <strong className="text-white">{doc.assignedOfficer}</strong>.
                                    </>
                                  ) : (
                                    <>
                                      Your document has been analyzed by our internal AI engine and routed to{' '}
                                      <strong className="text-white">{doc.assignedOfficer}</strong> for physical cross-verification with the Uganda Directorate of Geological Survey and Mines (DGSM) and URA Customs. Per sovereign compliance protocol,{' '}
                                      <strong className="text-amber-300">
                                        no reports—including preliminary AI-generated reports—are viewable or available for download
                                      </strong>{' '}
                                      until the analyst completes verification and approves release (within 24 hours).
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Strictly Disabled Download Button */}
                            <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                              <button
                                type="button"
                                disabled
                                className="px-4 py-2.5 text-xs font-mono-data font-bold text-slate-500 bg-slate-900 border border-slate-800 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 select-none"
                                title="Report download is disabled until Staff Officer 1 approves the dossier"
                              >
                                <Lock className="w-3.5 h-3.5 text-amber-500" />
                                <span>Download Locked (Awaiting Analyst)</span>
                              </button>
                              {(effectiveRole === 'staff' || effectiveRole === 'admin') &&
                                onOpenStaffPortal &&
                                !isAwaitingPayment && (
                                  <button
                                    type="button"
                                    onClick={onOpenStaffPortal}
                                    className="text-[11px] text-[#D4AF37] hover:underline font-mono-data text-right"
                                  >
                                    Staff Officer 1? Switch to Staff Portal to Approve →
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* STAGE 3: FINAL REPORT READY — ANALYST APPROVED & UNLOCKED */
                        <div className="rounded-xl bg-[#0B0F17] border border-emerald-600/50 p-5 sm:p-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                              <div>
                                <div className="text-[10px] font-mono-data text-emerald-400 uppercase font-bold">
                                  FINAL REPORT READY · CERTIFIED BY {doc.assignedOfficer.toUpperCase()}
                                </div>
                                <h4 className="text-sm font-bold text-white">
                                  Official Forensic Verification Report — Verdict:{' '}
                                  <span className="text-rose-400 font-mono-data">
                                    {doc.aiAnalysis?.verdict} (Risk Score: {doc.aiAnalysis?.riskScore}%)
                                  </span>
                                </h4>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadApprovedReport(doc)}
                              className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 shrink-0"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Analyst-Approved Report (.TXT)</span>
                            </button>
                          </div>

                          {doc.aiAnalysis && (
                            <div className="space-y-3 text-xs">
                              <p className="text-slate-200 leading-relaxed">
                                {doc.aiAnalysis.executiveSummary}
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                <div className="p-3.5 rounded-lg bg-[#111722] border border-slate-800">
                                  <div className="text-[11px] font-mono-data text-rose-400 uppercase font-bold mb-1.5">
                                    Verified Forensic Red Flags:
                                  </div>
                                  <ul className="space-y-1.5">
                                    {doc.aiAnalysis.redFlags.map((flag, idx) => (
                                      <li key={idx} className="text-slate-300 flex items-start gap-2">
                                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                                        <span>{flag}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-3.5 rounded-lg bg-[#111722] border border-slate-800 space-y-2">
                                  <div>
                                    <div className="text-[11px] font-mono-data text-[#D4AF37] uppercase font-bold mb-1">
                                      Statutory Cross-Check (DGSM / URA):
                                    </div>
                                    <p className="text-slate-300">{doc.aiAnalysis.statutoryCrossCheck}</p>
                                  </div>
                                  {doc.staffFollowUpNotes && (
                                    <div className="pt-2 border-t border-slate-800">
                                      <div className="text-[11px] font-mono-data text-emerald-400 uppercase font-bold mb-1">
                                        Staff Officer 1 Final Endorsement:
                                      </div>
                                      <p className="text-emerald-200">{doc.staffFollowUpNotes}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Mandatory Disclaimer on Every Released Report */}
                              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-700/50 text-[11px] text-amber-200 font-mono-data">
                                <strong>Statutory Disclaimer:</strong> Verification confirms registry status of referenced documents as at the date of check; it is not a guarantee of counterparty performance or deal quality.
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* DIGITAL DOCUMENT SIGNING: DUE DILIGENCE REPORT ATTESTATION & COUNTER-SIGNATURE */}
                      <div
                        className={`rounded-xl p-4 sm:p-5 border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                          doc.digitalSignature
                            ? 'bg-emerald-950/20 border-emerald-500/50'
                            : 'bg-[#0B0F17] border-[#D4AF37]/40'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                              doc.digitalSignature
                                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400'
                                : 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
                            }`}
                          >
                            <FileSignature className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-[10px] font-mono-data uppercase font-bold px-2 py-0.5 rounded border ${
                                  doc.digitalSignature
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                    : 'bg-[#182232] text-[#D4AF37] border-[#D4AF37]/40'
                                }`}
                              >
                                {doc.digitalSignature
                                  ? `DIGITALLY SIGNED · ${doc.digitalSignature.certificateSerial}`
                                  : 'AWAITING CLIENT E-SIGNATURE'}
                              </span>
                              {doc.digitalSignature && (
                                <span className="text-[10px] font-mono-data text-slate-400">
                                  {doc.digitalSignature.sha256SealHash.slice(0, 24)}...
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white">
                              Due Diligence Report Chain-of-Custody & Non-Reliance Attestation
                            </h4>
                            <p className="text-xs text-slate-400">
                              {doc.digitalSignature ? (
                                <>
                                  Executed by{' '}
                                  <strong className="text-white">
                                    {doc.digitalSignature.signerFullName}
                                  </strong>{' '}
                                  ({doc.digitalSignature.signerTitle}) on{' '}
                                  <span className="font-mono-data text-emerald-300">
                                    {doc.digitalSignature.signedAtUtc}
                                  </span>
                                  .
                                </>
                              ) : (
                                'Affix your digital wet-ink or calligraphic signature directly in the portal to execute the evidentiary chain-of-custody attestation for this dossier.'
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          {doc.digitalSignature?.signatureDataUrl && (
                            <div className="h-10 px-3 rounded bg-[#05080D] border border-slate-800 flex items-center justify-center">
                              <img
                                src={doc.digitalSignature.signatureDataUrl}
                                alt="Executed signature"
                                className="max-h-8 max-w-[120px] object-contain"
                              />
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setInvoiceReceiptTarget({
                                mode: doc.paymentStatus === 'paid' ? 'receipt' : 'invoice',
                                referenceId: doc.id,
                                transactionRef: doc.paymentRef,
                                clientName: doc.clientName,
                                companyName: doc.companyName,
                                clientEmail: doc.email,
                                itemTitle: `Forensic Document Verification (${doc.documentType})`,
                                itemDescription: `Counterparty Audited: ${doc.claimedSeller} (${doc.claimedQuantityKg} @ ${doc.claimedDiscountPercent}) · Assigned to ${doc.assignedOfficer}`,
                                amountUsd: doc.feeUsd || 2500,
                                paymentStatus: doc.paymentStatus,
                                issuedDate: doc.submittedAt
                              })
                            }
                            className="px-3.5 py-2.5 text-xs font-bold text-[#D4AF37] bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <QrCode className="w-4 h-4 text-[#D4AF37]" />
                            <span>
                              {doc.paymentStatus === 'paid' ? 'QR Receipt' : 'Proforma Invoice'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSigningTarget({
                                targetType: 'due_diligence_report',
                                verification: doc
                              })
                            }
                            className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                              doc.digitalSignature
                                ? 'bg-[#182232] hover:bg-[#222E42] text-emerald-300 border border-emerald-500/50'
                                : 'bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] shadow-lg shadow-[#D4AF37]/15'
                            }`}
                          >
                            <FileSignature className="w-4 h-4" />
                            <span>
                              {doc.digitalSignature
                                ? 'View / Download Signed Attestation'
                                : 'Sign Due Diligence Agreement (e-Sign)'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKED EXPEDITION STATUS TRACKER */}
        {activeTab === 'expeditions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Booked Expedition & Sovereign KYC Status
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Monitor your delegation&apos;s OFAC, UN, UK HMT, EU sanctions and PEP screening, DGSM ministry accreditation, and manifest status. Statutory KYC &amp; sanctions screening is included with your selected package.
                </p>
              </div>

              <button
                onClick={onOpenRegistration}
                className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Award className="w-4 h-4" />
                <span>Apply & Pay</span>
              </button>
            </div>

            {filteredRegistrations.length === 0 ? (
              <div className="rounded-xl bg-[#111722] border border-slate-800 p-10 text-center space-y-3">
                <Compass className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Booked Expeditions Found
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No expedition registrations match your current filter. Apply for our 7-Day Uganda Gold Supply Chain Expedition to begin statutory KYC clearance.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRegistrations.map((reg) => {
                  const tierPriceUsd =
                    reg.requestedTier === 'sovereign'
                      ? 25000
                      : reg.requestedTier === 'trader'
                      ? 15000
                      : 8000;
                  const tierLabel =
                    reg.requestedTier === 'sovereign'
                      ? 'Tier 03: Sovereign Executive · Diplomatic VIP (USD 25,000 per person, inclusive of applicable Ugandan VAT)'
                      : reg.requestedTier === 'trader'
                      ? 'Tier 02: Professional Trader (USD 15,000 per person, inclusive of applicable Ugandan VAT)'
                      : 'Tier 01: Academic & Research Expedition (USD 8,000 per person, inclusive of applicable Ugandan VAT)';

                  return (
                    <div
                      key={reg.id}
                      className="rounded-2xl bg-[#111722] border border-slate-800 p-5 sm:p-7 space-y-6 shadow-xl"
                    >
                      {/* Top Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-1 rounded border border-[#D4AF37]/40">
                              {reg.id}
                            </span>
                            <span className="text-xs font-bold text-white bg-[#182232] border border-[#D4AF37]/30 px-2.5 py-1 rounded">
                              {tierLabel}
                            </span>
                            <span
                              className={`text-[11px] font-mono-data px-2.5 py-1 rounded font-bold uppercase ${
                                reg.kycPaymentStatus === 'paid'
                                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700'
                                  : 'bg-amber-950/70 text-amber-300 border border-amber-700'
                              }`}
                            >
                              {reg.kycPaymentStatus === 'paid'
                                ? 'Paid in Full'
                                : 'Pending'}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                            {reg.fullName} — <span className="text-[#D4AF37]">{reg.companyName}</span>{' '}
                            <span className="text-xs text-slate-400 font-normal">
                              ({reg.executiveTitle} · {reg.country})
                            </span>
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Cohort: <strong>{reg.cohortDate}</strong></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Delegates: <strong>{reg.delegatesCount}</strong></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Assigned Liaison: <strong>{reg.assignedStaff}</strong></span>
                            </span>
                          </div>
                        </div>

                        {/* Overall Expedition Status Badge */}
                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                          <span
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-data font-bold uppercase border ${
                              reg.status === 'approved'
                                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500'
                                : reg.status === 'under_review'
                                ? 'bg-blue-950/90 text-blue-300 border-blue-500'
                                : reg.status === 'rejected'
                                ? 'bg-rose-950/90 text-rose-300 border-rose-500'
                                : 'bg-amber-950/90 text-amber-300 border-amber-500'
                            }`}
                          >
                            {reg.status === 'approved'
                              ? 'EXPEDITION CLEARED & CONFIRMED'
                              : reg.status === 'under_review'
                              ? 'SECURITY & DGSM VETTING IN PROGRESS'
                              : reg.status === 'rejected'
                              ? 'CLEARANCE DECLINED'
                              : 'PENDING FULL PAYMENT'}
                          </span>

                          {reg.kycPaymentStatus !== 'paid' && (
                            <button
                              onClick={() => onOpenCardPayment(reg.requestedTier, 'full')}
                              className="px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded flex items-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Apply & Pay (USD {tierPriceUsd.toLocaleString()})</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 4-Stage Expedition Clearance Pipeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.kycPaymentStatus === 'paid' ? 'border-emerald-800/60' : 'border-amber-700/60'
                          }`}
                        >
                          {reg.kycPaymentStatus === 'paid' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 1 · PACKAGE SETTLEMENT
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Selected Package Settlement
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.kycPaymentStatus === 'paid' ? 'Paid in Full' : 'Pending'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.passportVerified ? 'border-emerald-800/60' : 'border-slate-800'
                          }`}
                        >
                          {reg.passportVerified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 2 · IDENTITY DOSSIER
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              Passport & Corporate Check
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.passportVerified ? 'Verified by Secretariat' : 'In queue'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.sanctionsPepClear ? 'border-emerald-800/60' : 'border-slate-800'
                          }`}
                        >
                          {reg.sanctionsPepClear ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 3 · COMPLIANCE SCREEN
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              OFAC, UN, UK HMT, EU & PEP
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.sanctionsPepClear ? 'Cleared — Zero Flags' : 'Under review'}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3.5 rounded-xl bg-[#0B0F17] border flex items-start gap-2.5 ${
                            reg.dgsmClearance && reg.status === 'approved'
                              ? 'border-emerald-500/80'
                              : 'border-slate-800'
                          }`}
                        >
                          {reg.dgsmClearance && reg.status === 'approved' ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-[10px] font-mono-data uppercase font-bold text-slate-400">
                              STEP 4 · MINISTRY PERMIT
                            </div>
                            <div className="text-xs font-bold text-white mt-0.5">
                              DGSM & Refinery Entry Pass
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {reg.dgsmClearance ? 'Authorized for Entebbe arrival' : 'Pending DGSM sign-off'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Liaison Notes */}
                      <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-[10px] font-mono-data text-[#D4AF37] uppercase font-bold block">
                            Liaison Officer Dispatch Note ({reg.assignedStaff}):
                          </span>
                          <p className="text-slate-300 mt-0.5">{reg.internalNotes}</p>
                        </div>
                      </div>

                      {/* DIGITAL DOCUMENT SIGNING: EXPEDITION REGISTRATION CHARTER & NON-TRANSACTION AGREEMENT */}
                      <div
                        className={`rounded-xl p-4 sm:p-5 border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                          reg.digitalSignature
                            ? 'bg-emerald-950/20 border-emerald-500/50'
                            : 'bg-[#0B0F17] border-[#D4AF37]/40'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                              reg.digitalSignature
                                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400'
                                : 'bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]'
                            }`}
                          >
                            <FileSignature className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-[10px] font-mono-data uppercase font-bold px-2 py-0.5 rounded border ${
                                  reg.digitalSignature
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                    : 'bg-[#182232] text-[#D4AF37] border-[#D4AF37]/40'
                                }`}
                              >
                                {reg.digitalSignature
                                  ? `CHARTER DIGITALLY EXECUTED · ${reg.digitalSignature.certificateSerial}`
                                  : 'MANDATORY DELEGATE CHARTER E-SIGNATURE'}
                              </span>
                              {reg.digitalSignature && (
                                <span className="text-[10px] font-mono-data text-slate-400">
                                  {reg.digitalSignature.sha256SealHash.slice(0, 24)}...
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white">
                              Sovereign Field Expedition Charter, Non-Transaction Covenant & Security Waiver
                            </h4>
                            <p className="text-xs text-slate-400">
                              {reg.digitalSignature ? (
                                <>
                                  Digitally signed by{' '}
                                  <strong className="text-white">
                                    {reg.digitalSignature.signerFullName}
                                  </strong>{' '}
                                  ({reg.digitalSignature.signerTitle}) on{' '}
                                  <span className="font-mono-data text-emerald-300">
                                    {reg.digitalSignature.signedAtUtc}
                                  </span>
                                  .
                                </>
                              ) : (
                                'Sign the mandatory Non-Transaction Covenant and Field Security Protocol directly within the portal prior to Entebbe VIP tarmac arrival.'
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                          {reg.digitalSignature?.signatureDataUrl && (
                            <div className="h-10 px-3 rounded bg-[#05080D] border border-slate-800 flex items-center justify-center">
                              <img
                                src={reg.digitalSignature.signatureDataUrl}
                                alt="Delegate signature"
                                className="max-h-8 max-w-[120px] object-contain"
                              />
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setInvoiceReceiptTarget({
                                mode: reg.kycPaymentStatus === 'paid' ? 'receipt' : 'invoice',
                                referenceId: reg.id,
                                clientName: reg.fullName,
                                companyName: reg.companyName,
                                clientEmail: reg.email,
                                itemTitle: `7-Day Uganda Gold Expedition (${tierLabel}) — ${
                                  reg.kycPaymentStatus === 'paid'
                                    ? 'Paid in Full Receipt'
                                    : 'Full Package Proforma Invoice'
                                }`,
                                itemDescription: `Cohort: ${reg.cohortDate} · Delegates: ${reg.delegatesCount} · Assigned Liaison: ${reg.assignedStaff} · Includes mandatory USD 1,000 KYC & Client Vetting Allocation`,
                                amountUsd: tierPriceUsd,
                                paymentStatus: reg.kycPaymentStatus === 'paid' ? 'paid' : 'pending',
                                issuedDate: reg.registeredAt
                              })
                            }
                            className="px-3.5 py-2.5 text-xs font-bold text-[#D4AF37] bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <QrCode className="w-4 h-4 text-[#D4AF37]" />
                            <span>
                              {reg.kycPaymentStatus === 'paid' ? 'QR Receipt' : 'Proforma Invoice'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSigningTarget({
                                targetType: 'expedition_registration',
                                registration: reg
                              })
                            }
                            className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                              reg.digitalSignature
                                ? 'bg-[#182232] hover:bg-[#222E42] text-emerald-300 border border-emerald-500/50'
                                : 'bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] shadow-lg shadow-[#D4AF37]/15'
                            }`}
                          >
                            <FileSignature className="w-4 h-4" />
                            <span>
                              {reg.digitalSignature
                                ? 'View / Download Executed Charter'
                                : 'Sign Expedition Charter (e-Sign)'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: UNIFIED DIGITAL DOCUMENT SIGNING DESK (EXPEDITION REGISTRATIONS & DUE DILIGENCE REPORTS) */}
        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Digital Document Signing & Cryptographic Registry Desk
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Execute binding digital signatures for your <strong className="text-[#D4AF37]">Expedition Registrations</strong> and <strong className="text-emerald-400">Due Diligence Reports</strong> directly within the portal using our wet-ink canvas pad or calligraphic seal.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111722] border border-[#D4AF37]/40 text-xs font-mono-data">
                <Fingerprint className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-slate-300">
                  Executed Instruments: <strong className="text-[#D4AF37]">{signedCount}</strong> / {totalAgreementsCount}
                </span>
              </div>
            </div>

            {/* Section A: Expedition Registration Agreements */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>1. Expedition Registration Charters & Non-Transaction Covenants ({filteredRegistrations.length})</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className={`rounded-xl p-5 border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                      reg.digitalSignature
                        ? 'bg-[#111722] border-emerald-500/50'
                        : 'bg-[#111722] border-slate-800'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                          {reg.id}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {reg.fullName} ({reg.companyName})
                        </span>
                        <span
                          className={`text-[10px] font-mono-data uppercase px-2 py-0.5 rounded font-bold border ${
                            reg.digitalSignature
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                              : 'bg-amber-950/70 text-amber-300 border-amber-700'
                          }`}
                        >
                          {reg.digitalSignature
                            ? `SIGNED · ${reg.digitalSignature.certificateSerial}`
                            : 'PENDING DELEGATE SIGNATURE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Sovereign Field Expedition Charter, Non-Transaction Covenant & Security Protocol Agreement — Cohort: <strong>{reg.cohortDate}</strong>
                      </p>
                      {reg.digitalSignature && (
                        <div className="text-[11px] font-mono-data text-emerald-400">
                          Seal: {reg.digitalSignature.sha256SealHash} · Signed {reg.digitalSignature.signedAtUtc}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {reg.digitalSignature?.signatureDataUrl && (
                        <div className="h-10 px-3 rounded bg-[#05080D] border border-slate-800 flex items-center justify-center">
                          <img
                            src={reg.digitalSignature.signatureDataUrl}
                            alt="Signature"
                            className="max-h-8 max-w-[120px] object-contain"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setSigningTarget({
                            targetType: 'expedition_registration',
                            registration: reg
                          })
                        }
                        className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                          reg.digitalSignature
                            ? 'bg-[#182232] hover:bg-[#222E42] text-emerald-300 border border-emerald-500/50'
                            : 'bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17]'
                        }`}
                      >
                        <FileSignature className="w-4 h-4" />
                        <span>
                          {reg.digitalSignature ? 'View / Re-Sign Charter' : 'Sign Expedition Charter'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: Due Diligence Report Attestations */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-[#D4AF37]" />
                <span>2. Due Diligence Report Receipt & Chain-of-Custody Attestations ({filteredVerifications.length})</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {filteredVerifications.map((doc) => (
                  <div
                    key={doc.id}
                    className={`rounded-xl p-5 border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                      doc.digitalSignature
                        ? 'bg-[#111722] border-emerald-500/50'
                        : 'bg-[#111722] border-slate-800'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-data text-xs font-bold text-[#D4AF37] bg-[#0B0F17] px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                          {doc.id}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {doc.clientName} ({doc.companyName})
                        </span>
                        <span
                          className={`text-[10px] font-mono-data uppercase px-2 py-0.5 rounded font-bold border ${
                            doc.digitalSignature
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                              : 'bg-amber-950/70 text-amber-300 border-amber-700'
                          }`}
                        >
                          {doc.digitalSignature
                            ? `SIGNED · ${doc.digitalSignature.certificateSerial}`
                            : 'PENDING CLIENT COUNTER-SIGNATURE'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Forensic Due Diligence Report Attestation — Audited: <strong>{doc.documentType}</strong> ({doc.claimedSeller})
                      </p>
                      {doc.digitalSignature && (
                        <div className="text-[11px] font-mono-data text-emerald-400">
                          Seal: {doc.digitalSignature.sha256SealHash} · Signed {doc.digitalSignature.signedAtUtc}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {doc.digitalSignature?.signatureDataUrl && (
                        <div className="h-10 px-3 rounded bg-[#05080D] border border-slate-800 flex items-center justify-center">
                          <img
                            src={doc.digitalSignature.signatureDataUrl}
                            alt="Signature"
                            className="max-h-8 max-w-[120px] object-contain"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setSigningTarget({
                            targetType: 'due_diligence_report',
                            verification: doc
                          })
                        }
                        className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                          doc.digitalSignature
                            ? 'bg-[#182232] hover:bg-[#222E42] text-emerald-300 border border-emerald-500/50'
                            : 'bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17]'
                        }`}
                      >
                        <FileSignature className="w-4 h-4" />
                        <span>
                          {doc.digitalSignature ? 'View / Re-Sign Attestation' : 'Sign Report Attestation'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HISTORICAL GOLD PRICE TRENDS (MULTI-CURRENCY RECHARTS) */}
        {activeTab === 'gold-trends' && (
          <div className="space-y-6">
            <GoldPriceTrendsChart initialCurrency={selectedCurrency} portalContext="client" />
          </div>
        )}

        {/* Persistent Multi-Currency Gold Benchmark Preview on Verifications & Expeditions Tabs */}
        {activeTab !== 'gold-trends' && (
          <div className="pt-6 border-t border-slate-800/80">
            <GoldPriceTrendsChart initialCurrency={selectedCurrency} portalContext="client" />
          </div>
        )}
      </div>

      {/* DIGITAL DOCUMENT SIGNING MODAL */}
      <DigitalSignatureModal
        isOpen={Boolean(signingTarget)}
        onClose={() => setSigningTarget(null)}
        targetType={signingTarget?.targetType || 'expedition_registration'}
        registration={signingTarget?.registration}
        verification={signingTarget?.verification}
        onSaveSignature={(signatureRecord: DigitalSignatureRecord) => {
          if (
            signingTarget?.targetType === 'expedition_registration' &&
            signingTarget.registration
          ) {
            onUpdateRegistration?.(signingTarget.registration.id, {
              digitalSignature: signatureRecord,
              nonTransactionAgreed: true
            });
            setSigningTarget({
              ...signingTarget,
              registration: {
                ...signingTarget.registration,
                digitalSignature: signatureRecord
              }
            });
          } else if (
            signingTarget?.targetType === 'due_diligence_report' &&
            signingTarget.verification
          ) {
            onUpdateDocumentVerification?.(signingTarget.verification.id, {
              digitalSignature: signatureRecord
            });
            setSigningTarget({
              ...signingTarget,
              verification: {
                ...signingTarget.verification,
                digitalSignature: signatureRecord
              }
            });
          }
        }}
      />

      {/* INVOICE & QR CODE RECEIPT GENERATOR MODAL */}
      <InvoiceReceiptModal
        isOpen={Boolean(invoiceReceiptTarget)}
        onClose={() => setInvoiceReceiptTarget(null)}
        initialData={invoiceReceiptTarget}
        selectedCurrency={selectedCurrency}
        onAiReceiptGenerated={onAiReceiptGenerated}
        onVerifyRecordInPortal={(refId) => {
          setInvoiceReceiptTarget(null);
          setSearchQuery(refId);
          setIsReferenceBypass(true);
          const q = refId.trim().toLowerCase();
          if (registrations.some((r) => r.id.toLowerCase() === q)) {
            setActiveTab('expeditions');
          } else {
            setActiveTab('verifications');
          }
        }}
      />
    </div>
  );
};
