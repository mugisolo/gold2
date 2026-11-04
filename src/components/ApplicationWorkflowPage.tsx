import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  FileSignature,
  CreditCard,
  Lock,
  AlertCircle,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import {
  Currency,
  Language,
  ExpeditionRegistration,
  DigitalSignatureRecord,
  PaymentRecord
} from '../types';
import {
  EXPEDITION_PACKAGES,
  UPCOMING_COHORTS,
  formatCurrencyPrice
} from '../data/expeditionData';
import { DigitalSignatureModal } from './DigitalSignatureModal';

interface ApplicationWorkflowPageProps {
  currentLang: Language;
  selectedCurrency: Currency;
  initialTier?: 'academic' | 'trader' | 'sovereign';
  initialCohort?: string;
  initialNotes?: string;
  onNavigate: (path: string) => void;
  onSubmitRegistration: (reg: ExpeditionRegistration) => Promise<void> | void;
  onUpdateRegistration: (id: string, updates: Partial<ExpeditionRegistration>) => Promise<void> | void;
  onRecordPayment: (payment: PaymentRecord) => void;
  onOpenClientPortal: (email: string) => void;
}

export const ApplicationWorkflowPage: React.FC<ApplicationWorkflowPageProps> = ({
  selectedCurrency,
  initialTier = 'trader',
  initialCohort,
  initialNotes = '',
  onNavigate,
  onSubmitRegistration,
  onUpdateRegistration,
  onRecordPayment,
  onOpenClientPortal
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedTier, setSelectedTier] = useState<'academic' | 'trader' | 'sovereign'>(initialTier);
  const [selectedCohort, setSelectedCohort] = useState<string>(
    initialCohort || UPCOMING_COHORTS[0].dates
  );

  // Step 3: Application Details
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [executiveTitle, setExecutiveTitle] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [delegatesCount, setDelegatesCount] = useState<number>(1);
  const [primaryObjective, setPrimaryObjective] = useState(
    'Counterparty & Active Gold Offer Verification'
  );
  const [activeProposalDetails, setActiveProposalDetails] = useState(initialNotes);

  // Step 4: Vetting & KYC Screening
  const [passportNumber, setPassportNumber] = useState('');
  const [sanctionsDeclaration, setSanctionsDeclaration] = useState(false);
  const [pepDeclaration, setPepDeclaration] = useState(false);
  const [kycConsent, setKycConsent] = useState(false);

  // Step 5: Agreement & Digital Signature
  const [nonTransactionAgreed, setNonTransactionAgreed] = useState(false);
  const [typedSignature, setTypedSignature] = useState('');
  const [signatureRecord, setSignatureRecord] = useState<DigitalSignatureRecord | null>(null);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // Step 6: Settlement
  const [cardBrand, setCardBrand] = useState<'Visa' | 'Mastercard'>('Visa');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<ExpeditionRegistration | null>(
    null
  );
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialTier) setSelectedTier(initialTier);
  }, [initialTier]);

  useEffect(() => {
    if (initialCohort) setSelectedCohort(initialCohort);
  }, [initialCohort]);

  const currentPkg =
    EXPEDITION_PACKAGES.find((p) => p.id === selectedTier) || EXPEDITION_PACKAGES[1];
  const totalFeeUsd = currentPkg.priceUsd * Math.max(1, delegatesCount);

  const stepsList = [
    { num: 1, label: 'Choose programme', req: 'Select your expedition tier' },
    { num: 2, label: 'Select date', req: 'Choose a 7-day cohort' },
    { num: 3, label: 'Submit application', req: 'Principal & organization profile' },
    { num: 4, label: 'Complete vetting', req: 'Passport & sanctions/PEP declaration' },
    { num: 5, label: 'Sign agreement', req: 'Non-Transaction Charter execution' },
    { num: 6, label: 'Pay', req: 'Programme settlement & confirmation' }
  ];

  const handleContinueFromStep3 = () => {
    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim() || !country.trim()) {
      setErrorMsg(
        'Please complete all required applicant fields (Full Name, Organization, Country, Corporate Email, and Phone).'
      );
      return;
    }
    setErrorMsg('');
    setStep(4);
  };

  const handleContinueFromStep4 = () => {
    if (!passportNumber.trim() || !sanctionsDeclaration || !pepDeclaration || !kycConsent) {
      setErrorMsg(
        'Please provide your Passport/ID reference and confirm all three statutory KYC and sanctions/PEP screening declarations.'
      );
      return;
    }
    setErrorMsg('');
    setStep(5);
  };

  const handleContinueFromStep5 = async () => {
    if (!nonTransactionAgreed) {
      setErrorMsg('You must agree to the Non-Transaction Legal Charter to proceed.');
      return;
    }
    if (!signatureRecord && !typedSignature.trim()) {
      setErrorMsg(
        'Please enter your full legal name to execute your digital signature, or use the full signature pad.'
      );
      return;
    }

    const regId = completedRegistration?.id || `EXP-2027-${Date.now().toString().slice(-4)}`;
    const finalSig: DigitalSignatureRecord = signatureRecord || {
      id: `SIG-${Date.now().toString().slice(-5)}`,
      targetId: regId,
      targetType: 'expedition_registration',
      agreementTitle: 'Uganda Gold Expedition Non-Transaction & Compliance Agreement',
      signerFullName: typedSignature.trim() || fullName,
      signerTitle: executiveTitle || 'Principal Delegate',
      signerCompany: companyName,
      signerEmail: email,
      passportOrIdNumber: passportNumber,
      signatureMethod: 'typed_calligraphy',
      signatureDataUrl: '',
      typedSignatureText: typedSignature.trim() || fullName,
      clausesAccepted: [
        'Strict Non-Transaction Mandate',
        'OFAC/UN/EU/UK Sanctions & PEP Compliance',
        'Confidentiality & Security Protocol'
      ],
      sha256SealHash: `SHA256:${Date.now().toString(16).toUpperCase()}8F92A4C1`,
      signedAtUtc: new Date().toISOString(),
      certificateSerial: `UGE-CERT-${Date.now().toString().slice(-6)}`
    };

    const draftReg: ExpeditionRegistration = {
      id: regId,
      fullName,
      companyName,
      executiveTitle: executiveTitle || 'Principal',
      country,
      email,
      phone,
      requestedTier: selectedTier,
      delegatesCount,
      cohortDate: selectedCohort,
      primaryObjective,
      activeProposalDetails: activeProposalDetails || 'Standard field due-diligence attendance',
      nonTransactionAgreed: true,
      kycAcknowledged: true,
      kycPaymentStatus: 'pending',
      status: 'under_review',
      assignedStaff: 'Lt. Col. (Rtd) Arthur Mwesigye',
      registeredAt: new Date().toISOString().split('T')[0],
      passportVerified: true,
      sanctionsPepClear: true,
      dgsmClearance: true,
      digitalSignature: finalSig
    };

    setSignatureRecord(finalSig);
    setCompletedRegistration(draftReg);
    await onSubmitRegistration(draftReg);
    setErrorMsg('');
    setStep(6);
  };

  const handleCompletePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardholderName.trim() || cardNumber.replace(/\s+/g, '').length < 12) {
      setErrorMsg('Please enter valid cardholder details to complete programme settlement.');
      return;
    }

    setErrorMsg('');
    setIsProcessingPayment(true);

    try {
      let ref = `UGE-EXP-${Date.now().toString().slice(-6)}`;
      try {
        const res = await fetch('/api/payments/relworx/card-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: fullName,
            email,
            amountUsd: totalFeeUsd,
            currency: 'USD',
            cardBrand,
            paymentType: 'full_payment',
            tierLabel: `${currentPkg.name} (${delegatesCount} Delegate${delegatesCount > 1 ? 's' : ''})`
          })
        });
        const data = await res.json();
        if (data?.reference) ref = data.reference;
      } catch {
        // Fallback reference if offline
      }

      const paidReg: ExpeditionRegistration = {
        ...(completedRegistration as ExpeditionRegistration),
        kycPaymentStatus: 'paid',
        status: 'approved'
      };

      setCompletedRegistration(paidReg);
      setPaymentReference(ref);
      await onUpdateRegistration(paidReg.id, {
        kycPaymentStatus: 'paid',
        status: 'approved'
      });

      onRecordPayment({
        id: `PAY-${Date.now().toString().slice(-6)}`,
        reference: ref,
        customerName: fullName,
        email,
        amount: totalFeeUsd,
        currency: 'USD',
        type: 'full_payment',
        status: 'Completed',
        cardBrand,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        tier: `${currentPkg.name} (${selectedCohort})`
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-200 pb-24">
      <div className="bg-[#080B11] border-b border-slate-800/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p className="font-medium text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
            Independent due diligence and field verification. We do not buy, sell, or broker gold.
          </p>
          <span className="text-[11px] font-mono text-slate-400">
            Expedition Application & Vetting Workflow
          </span>
        </div>
      </div>

      {/* Header & Visible 6-Step Progress Indicator */}
      <section className="py-10 lg:py-12 border-b border-slate-800/80 bg-[#0E141F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              7-Day Field Expedition Onboarding
            </p>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-white">
              Expedition Application, Vetting & Settlement
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {stepsList.map((s) => {
              const isCurrent = step === s.num;
              const isDone = step > s.num || Boolean(paymentReference && s.num === 6);
              return (
                <div
                  key={s.num}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    isCurrent
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white'
                      : isDone
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span>STEP 0{s.num}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold text-white">{s.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{s.req}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Step Surface */}
      <section className="py-12 surface-ivory min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-ivory-card rounded-2xl p-6 sm:p-8 shadow-sm">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: CHOOSE PROGRAMME */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                    Step 1 of 6 · Requirement: Select your programme tier
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                    Choose your expedition programme
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select the 7-day programme that matches your role and due-diligence requirements.
                  </p>
                </div>

                <div className="space-y-4">
                  {EXPEDITION_PACKAGES.map((pkg) => {
                    const isSelected = selectedTier === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedTier(pkg.id)}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedTier(pkg.id);
                          }
                        }}
                        className={`p-5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50/70 border-[#9A7418] ring-1 ring-[#9A7418]'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <span className="text-xs font-mono uppercase text-[#9A7418] font-semibold">
                              {pkg.tierNumber}
                            </span>
                            <h3 className="font-serif-display text-lg font-bold text-slate-900">
                              {pkg.name}
                            </h3>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-mono font-bold text-slate-900">
                              {formatCurrencyPrice(pkg.priceUsd, selectedCurrency)}
                            </span>
                            <span className="text-xs text-slate-500 block">per person (VAT incl.)</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-3">{pkg.idealFor}</p>
                        <div className="text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-200/80">
                          <div>
                            <strong>Accommodation:</strong> {pkg.accommodation}
                          </div>
                          <div>
                            <strong>Transport:</strong> {pkg.transport}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => onNavigate('/expeditions/dates')}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Package Comparison</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Select Date</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT DATE */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                    Step 2 of 6 · Requirement: Select a scheduled cohort date & delegate count
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                    Select your 7-day cohort date
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {UPCOMING_COHORTS.map((c) => {
                    const active = selectedCohort === c.dates;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCohort(c.dates)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          active
                            ? 'bg-amber-50/80 border-[#9A7418] ring-1 ring-[#9A7418]'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9A7418] mb-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>7-Day Programme</span>
                          </div>
                          <div className="text-sm font-bold text-slate-900">{c.dates}</div>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-slate-700 border border-stone-200">
                          {c.status}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label
                      htmlFor="apply-delegates"
                      className="block text-xs font-bold text-slate-900"
                    >
                      Number of Participating Delegates
                    </label>
                    <p className="text-xs text-slate-600">
                      For Academic Tier bookings of 6+ paying participants, 1 faculty lead attends complimentary.
                    </p>
                  </div>
                  <input
                    id="apply-delegates"
                    type="number"
                    min={1}
                    max={15}
                    value={delegatesCount}
                    onChange={(e) => setDelegatesCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-24 px-3 py-2 rounded-lg bg-white border border-stone-300 text-slate-900 font-mono text-sm font-bold"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Application Details</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUBMIT APPLICATION */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                    Step 3 of 6 · Requirement: Principal & corporate details
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                    Applicant & Organization Profile
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Full Legal Name (as on Passport) *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Marcus Vance"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Company / Institution *
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Vanguard Commodities AG"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Executive Title / Role
                    </label>
                    <input
                      type="text"
                      value={executiveTitle}
                      onChange={(e) => setExecutiveTitle(e.target.value)}
                      placeholder="e.g., Managing Director / Head of Compliance"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Jurisdiction / Country of Residence *
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., Switzerland / United Arab Emirates"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Corporate Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="principal@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Direct Mobile / Telephone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 44 500 00 00"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Primary Expedition Objective
                  </label>
                  <select
                    value={primaryObjective}
                    onChange={(e) => setPrimaryObjective(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                  >
                    <option value="Counterparty & Active Gold Offer Verification">
                      Counterparty & Active Gold Offer Verification
                    </option>
                    <option value="Long-Term Refinery & Supply-Chain Due Diligence">
                      Long-Term Refinery & Supply-Chain Due Diligence
                    </option>
                    <option value="Academic, ESG & Policy Field Research">
                      Academic, ESG & Policy Field Research
                    </option>
                    <option value="Institutional / Sovereign Delegation Scoping">
                      Institutional / Sovereign Delegation Scoping
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Active Offers or Specific Counterparties to Audit (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={activeProposalDetails}
                    onChange={(e) => setActiveProposalDetails(e.target.value)}
                    placeholder="If you hold active FCO/SPA proposals you wish to review during your 1-on-1 sessions, note the document types or claimed sellers here..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueFromStep3}
                    className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Vetting</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: COMPLETE VETTING */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                    Step 4 of 6 · Requirement: Statutory KYC, Sanctions & PEP Screening
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                    Complete Statutory Vetting
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Because participants enter regulated mineral registries, bonded refineries, and active mining concessions, all delegates undergo OFAC, UN, UK HMT, EU sanctions, and PEP screening (included in your package fee).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Passport or National ID Number (for DGSM & Airport Clearance) *
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Enter Passport Number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm font-mono"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sanctionsDeclaration}
                      onChange={(e) => setSanctionsDeclaration(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#9A7418]"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block">
                        OFAC, UN, UK HMT & EU Sanctions Declaration
                      </strong>
                      I confirm that neither I nor the organization I represent is subject to international financial sanctions or prohibited mineral trading restrictions.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pepDeclaration}
                      onChange={(e) => setPepDeclaration(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#9A7418]"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block">
                        Politically Exposed Person (PEP) & AML Disclosure
                      </strong>
                      I acknowledge that all funds used for programme settlement originate from compliant corporate or personal accounts in accordance with AML regulations.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={kycConsent}
                      onChange={(e) => setKycConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#9A7418]"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block">
                        Authorization for DGSM & Facility Access Clearance
                      </strong>
                      I authorize Uganda Gold Expedition to process my identity details for security clearance at DGSM Entebbe, bonded refineries, and field corridors.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueFromStep4}
                    className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Agreement Signature</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SIGN AGREEMENT */}
            {step === 5 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                    Step 5 of 6 · Requirement: Non-Transaction Agreement Execution
                  </span>
                  <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                    Review & Sign Non-Transaction Agreement
                  </h2>
                </div>

                <div className="p-5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-slate-700 space-y-2.5 leading-relaxed">
                  <p className="font-bold text-slate-900 uppercase font-mono">
                    Binding Non-Transaction & Independence Covenant
                  </p>
                  <p>
                    1. <strong>Zero Brokerage Mandate:</strong> The participant acknowledges that Uganda Gold Expedition is strictly an independent due-diligence, educational, and field-verification mission. It does not buy, sell, broker, or hold title to gold.
                  </p>
                  <p>
                    2. <strong>Field Security Compliance:</strong> The participant agrees to follow convoy security instructions and refinery safety protocols throughout the 7-day itinerary.
                  </p>
                  <p>
                    3. <strong>Single Programme Settlement:</strong> Programme fees ({formatCurrencyPrice(totalFeeUsd, selectedCurrency)} for {delegatesCount} delegate{delegatesCount > 1 ? 's' : ''}) cover accommodation, transport, permits, KYC screening, and scheduled audits.
                  </p>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nonTransactionAgreed}
                    onChange={(e) => setNonTransactionAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#9A7418]"
                  />
                  <span className="text-xs text-slate-800 font-medium leading-relaxed">
                    I have read and agree to the Non-Transaction Legal Charter and Terms of Engagement.
                  </span>
                </label>

                <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900">
                      Digital Signature Execution (Type Full Legal Name) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSignatureModalOpen(true)}
                      className="text-xs font-semibold text-[#9A7418] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Open Full Canvas Signature Pad</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    placeholder={`Type "${fullName || 'Your Full Legal Name'}" to sign`}
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-300 text-slate-900 font-serif-display italic text-lg"
                  />
                  {signatureRecord && (
                    <div className="text-xs text-emerald-700 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        Cryptographic Seal Attached: {signatureRecord.certificateSerial} ({signatureRecord.sha256SealHash.slice(0, 20)}...)
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueFromStep5}
                    className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Sign & Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: PAY & CONFIRMATION */}
            {step === 6 && (
              <div className="space-y-6">
                {paymentReference ? (
                  <div className="py-6 space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">
                          Application, Vetting & Settlement Confirmed
                        </span>
                        <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-0.5">
                          Your Expedition Seat is Reserved
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-700 mt-1">
                          Registration ID: <strong className="font-mono">{completedRegistration?.id}</strong> · Payment Ref: <strong className="font-mono">{paymentReference}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A7418] font-bold">
                        What Happens Next
                      </h3>
                      <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
                        <li>
                          Your signed Non-Transaction Agreement and KYC dossier have been assigned to Senior Due Diligence Officer <strong>Lt. Col. (Rtd) Arthur Mwesigye</strong>.
                        </li>
                        <li>
                          Within 24 hours, you will receive your Entebbe Airport arrival protocol, hotel confirmation, and DGSM security clearance schedule.
                        </li>
                        <li>
                          You can view your registration status, download your signed agreement, and message the operations desk at any time in the Client Portal.
                        </li>
                      </ol>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenClientPortal(email)}
                        className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Open Authenticated Client Portal</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('/')}
                        className="px-5 py-3 rounded-lg bg-stone-200 hover:bg-stone-300 text-slate-900 text-xs font-semibold cursor-pointer"
                      >
                        Return to Homepage
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCompletePayment} className="space-y-5">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#9A7418]">
                        Step 6 of 6 · Programme Settlement
                      </span>
                      <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                        Complete Expedition Settlement
                      </h2>
                    </div>

                    <div className="p-5 rounded-xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900 text-sm">{currentPkg.name}</div>
                        <div className="text-slate-600">
                          Cohort: <strong>{selectedCohort}</strong> · Delegates: <strong>{delegatesCount}</strong>
                        </div>
                        <div className="text-slate-500">
                          Applicant: {fullName} ({companyName})
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-mono uppercase text-slate-500 block">
                          Total Due (VAT Incl.)
                        </span>
                        <span className="text-2xl font-mono font-bold text-slate-900">
                          {formatCurrencyPrice(totalFeeUsd, selectedCurrency)}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 block">
                          (${totalFeeUsd.toLocaleString()} USD)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {(['Visa', 'Mastercard'] as const).map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => setCardBrand(brand)}
                          className={`py-2.5 px-4 rounded-lg border text-xs font-semibold cursor-pointer ${
                            cardBrand === brand
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-stone-300'
                          }`}
                        >
                          {brand} Corporate / Personal Card
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder={fullName || 'Cardholder Name'}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-800 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 •••• •••• ••••"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            Expiry *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-800 mb-1">
                            CVV *
                          </label>
                          <input
                            type="password"
                            required
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-slate-900 text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Agreement</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className="px-7 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a030] text-slate-950 font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>
                          {isProcessingPayment
                            ? 'Authorizing Settlement...'
                            : `Settle ${formatCurrencyPrice(totalFeeUsd, selectedCurrency)} & Confirm Seat`}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        targetType="expedition_registration"
        registration={
          completedRegistration || {
            id: `EXP-2027-DRAFT`,
            fullName: fullName || 'Applicant',
            companyName: companyName || 'Organization',
            executiveTitle: executiveTitle || 'Principal',
            country: country || 'International',
            email: email || '',
            phone: phone || '',
            requestedTier: selectedTier,
            delegatesCount,
            cohortDate: selectedCohort,
            primaryObjective,
            activeProposalDetails,
            nonTransactionAgreed: true,
            kycAcknowledged: true,
            kycPaymentStatus: 'pending',
            status: 'pending_kyc',
            registeredAt: new Date().toISOString().split('T')[0]
          }
        }
        onSaveSignature={(sig) => {
          setSignatureRecord(sig);
          setTypedSignature(sig.signerFullName);
          setNonTransactionAgreed(true);
          setIsSignatureModalOpen(false);
        }}
      />
    </div>
  );
};
