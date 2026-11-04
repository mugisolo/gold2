import React, { useState, useRef } from 'react';
import {
  FileSearch,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  Lock,
  Upload,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  FileText,
  Loader2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { DocumentVerification, Currency, Language } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';

interface VerificationPageProps {
  currentLang: Language;
  selectedCurrency: Currency;
  onVerificationCreated: (verification: DocumentVerification) => void;
  onNavigate: (path: string) => void;
  onOpenClientPortalWithEmail: (email: string) => void;
}

type VerificationStep = 1 | 2 | 3 | 4 | 5;

export const VerificationPage: React.FC<VerificationPageProps> = ({
  selectedCurrency,
  onVerificationCreated,
  onNavigate,
  onOpenClientPortalWithEmail,
}) => {
  const workflowRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<VerificationStep>(1);

  // Step 1: Scope acknowledgement
  const [scopeConfirmed, setScopeConfirmed] = useState(false);

  // Step 2: Document upload & specifications
  const [documentType, setDocumentType] =
    useState<DocumentVerification['documentType']>('Full Corporate Offer (FCO)');
  const [claimedSeller, setClaimedSeller] = useState('');
  const [claimedQuantityKg, setClaimedQuantityKg] = useState('');
  const [claimedDiscountPercent, setClaimedDiscountPercent] = useState('');
  const [documentTextOrNotes, setDocumentTextOrNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [fileMimeType, setFileMimeType] = useState('');

  // Step 3: Contact & consent details
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confidentialityConsent, setConfidentialityConsent] = useState(false);
  const [embargoAcknowledged, setEmbargoAcknowledged] = useState(false);

  // Step 4 & 5: Payment & Submission state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [completedVerification, setCompletedVerification] =
    useState<DocumentVerification | null>(null);
  const [relworxCheckoutUrl, setRelworxCheckoutUrl] = useState('');

  const priceDisplay = formatCurrencyPrice(2500, selectedCurrency);
  const creditDisplay = formatCurrencyPrice(1000, selectedCurrency);

  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileMimeType(file.type || 'application/pdf');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Clean = result.includes(',') ? result.split(',')[1] : result;
      setFileBase64(base64Clean);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSampleOffer = () => {
    setDocumentType('Full Corporate Offer (FCO)');
    setClaimedSeller('Victoria Nile Gold Consortium Ltd');
    setClaimedQuantityKg('150 kg Au Dore Bars');
    setClaimedDiscountPercent('18% below LBMA spot');
    setFileName('Sample_FCO_VictoriaNile_150KG.pdf');
    setDocumentTextOrNotes(
      'Seller offers 150kg of Dore gold bars allegedly stored in Entebbe bonded warehouse and requests USD 55,000 upfront to a private law firm account for URA 5% export clearance prior to refinery fire assay.'
    );
    setErrorMsg('');
  };

  const validateAndProceed = (targetStep: VerificationStep) => {
    setErrorMsg('');
    if (targetStep === 2 && !scopeConfirmed) {
      setErrorMsg('Please confirm that you have reviewed the 24–72-hour verification scope before continuing.');
      return;
    }
    if (targetStep === 3) {
      if (!claimedSeller.trim()) {
        setErrorMsg('Please enter the claimed seller or counterparty entity name.');
        return;
      }
      if (!documentTextOrNotes.trim() && !fileName) {
        setErrorMsg('Please attach a document file or paste the relevant contract clauses/license numbers.');
        return;
      }
    }
    if (targetStep === 4) {
      if (!clientName.trim() || !email.trim() || !email.includes('@')) {
        setErrorMsg('Please provide your full name and a valid email address for report delivery.');
        return;
      }
      if (!confidentialityConsent || !embargoAcknowledged) {
        setErrorMsg('Please confirm both the confidentiality consent and report release terms.');
        return;
      }
    }
    setStep(targetStep);
  };

  const handleCompletePaymentAndSubmit = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const paymentRes = await fetch('/api/payments/relworx-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 2500,
          currency: 'USD',
          payment_type: 'doc_verification',
          description: `24–72-Hour Offer Verification (${documentType}) — USD 2,500`,
          customer_email: email,
          customer_name: clientName,
          package_tier: '24–72-Hour Offer Verification ($2,500)',
        }),
      });
      const paymentData = await paymentRes.json();
      if (paymentData.payment_url) {
        setRelworxCheckoutUrl(paymentData.payment_url);
      }

      const verifyRes = await fetch('/api/verification/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          email,
          phone,
          documentType,
          claimedSeller,
          claimedQuantityKg,
          claimedDiscountPercent,
          documentTextOrNotes,
          fileName: fileName || `${documentType.replace(/\s+/g, '_')}.pdf`,
          fileBase64,
          fileMimeType,
          paymentRef: paymentData.reference,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.verification) {
        setCompletedVerification(verifyData.verification);
        onVerificationCreated(verifyData.verification);
        setStep(5);
      } else {
        setErrorMsg(verifyData.message || 'Verification submission could not be completed.');
      }
    } catch {
      setErrorMsg('Network error while submitting verification request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Review Scope' },
    { num: 2, label: 'Upload Documents' },
    { num: 3, label: 'Contact & Consent' },
    { num: 4, label: 'Pay' },
    { num: 5, label: 'Confirmation & Tracking' },
  ];

  return (
    <div>
      {/* Dark Hero Header */}
      <section className="bg-[#0B0F17] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-data uppercase tracking-wider text-[#D4AF37]">
              <FileSearch className="w-4 h-4" />
              <span>Remote Due Diligence · 24–72-Hour Turnaround</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white leading-tight">
              24–72-Hour Offer Verification
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed reading-measure">
              Have you received a Full Corporate Offer (FCO), Sales &amp; Purchase Agreement (SPA),
              mineral license, or export permit? Verify the documents and counterparty claims before
              you wire funds or book travel.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToWorkflow}
                className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-sm inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                <span>Start Confidential Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Warm Ivory Informational Sections: Scope, What Can/Cannot Be Verified, Required Docs, Sample Deliverable, Price */}
      <section className="surface-ivory py-14 sm:py-20 border-b border-[#E2DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* 1. What Can and Cannot Be Verified */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="surface-ivory-card border rounded-xl p-7 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>What Can Be Verified Remotely (24–72 Hours)</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">DGSM Mineral License Status:</strong> Whether a
                  claimed Exploration License (EL), Mining Lease (ML), or Mineral Dealer License
                  (MDL) serial number exists, is active, and matches the named holder in Entebbe.
                </li>
                <li>
                  <strong className="text-slate-900">Customs &amp; Tax Claims:</strong> Whether
                  referenced Uganda Revenue Authority (URA) export procedures, ASYCUDA payment
                  channels, and ICGLR certificate formats follow statutory rules.
                </li>
                <li>
                  <strong className="text-slate-900">Commercial &amp; Pricing Terms:</strong>{' '}
                  Evaluation of proposed discounts, escrow mechanisms, and logistics terms against
                  licensed Kampala refinery benchmarks.
                </li>
                <li>
                  <strong className="text-slate-900">Documentary Integrity:</strong> Identification
                  of altered stamps, recycled license numbers, or non-standard payment demands.
                </li>
              </ul>
            </div>

            <div className="surface-ivory-card border rounded-xl p-7 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>What Cannot Be Verified Without Physical Inspection</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li>
                  <strong className="text-slate-900">Physical Bullion Purity:</strong> No PDF assay
                  certificate or photograph can prove the internal composition of a gold bar.
                  Physical purity requires homogeneous induction melting and fire assay cupellation.
                </li>
                <li>
                  <strong className="text-slate-900">Vault Custody &amp; Quantity:</strong> Confirming
                  that a specific quantity of gold physically sits inside a bonded facility requires
                  in-person vault inspection.
                </li>
                <li>
                  <strong className="text-slate-900">Future Seller Performance:</strong> A valid
                  license confirms regulatory standing at the time of inspection, not a commercial
                  guarantee of future delivery.
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Required Documents, Timeframe, Confidentiality & Price Policy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A751F]">
                <FileText className="w-4 h-4" />
                <span>Accepted Documents</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Required Submission Material
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Submit at least one primary document or contract excerpt along with the claimed
                counterparty name:
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
                <li>• Full Corporate Offer (FCO) or Letter of Intent</li>
                <li>• Draft Sales &amp; Purchase Agreement (SPA)</li>
                <li>• DGSM Mineral Dealer or Mining License</li>
                <li>• URA Customs Declaration or Export Permit</li>
                <li>• ICGLR Certificate or Refinery Assay Report</li>
              </ul>
            </div>

            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A751F]">
                <Clock className="w-4 h-4" />
                <span>Service Timeframe &amp; Confidentiality</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                When the 24–72h Clock Begins
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The 24–72-hour turnaround window begins once your document submission and verification
                fee settlement are confirmed.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Strict Confidentiality:</strong> Submitted files
                are handled solely by our verification analyst desk and are never shared with
                brokers, competing buyers, or third parties.
              </p>
            </div>

            <div className="surface-ivory-card border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A751F]">
                <Shield className="w-4 h-4" />
                <span>Fee &amp; Expedition Credit Policy</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                {priceDisplay} (VAT Inclusive)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                One-off fee of <strong className="text-slate-900">USD 2,500</strong> (inclusive of
                applicable Ugandan VAT) per offer dossier.
              </p>
              <p className="text-xs sm:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-3 leading-relaxed">
                <strong>90-Day Expedition Credit:</strong> {creditDisplay} (USD 1,000) of your
                verification fee is credited toward any 7-day expedition package booked within 90
                days.
              </p>
            </div>
          </div>

          {/* 3. Sample Report / Deliverable Outline */}
          <div className="surface-ivory-card border rounded-xl p-7 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A751F]">
                  Deliverable Specification
                </span>
                <h2 className="font-cinzel text-2xl font-bold text-slate-900 mt-1">
                  Sample Verification Report Outline
                </h2>
              </div>
              <span className="font-mono-data text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded border border-slate-200">
                Released in Client Portal Upon Analyst Sign-Off
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <div className="font-mono-data font-bold text-[#9A751F]">Section 01</div>
                <div className="font-bold text-slate-900">Counterparty &amp; Registry Check</div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Verification of corporate registration and DGSM Mineral Cadastre license status,
                  holder name, mineral class, and expiry date.
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono-data font-bold text-[#9A751F]">Section 02</div>
                <div className="font-bold text-slate-900">Documentary &amp; Stamp Audit</div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Examination of permit serials, URA customs references, ICGLR certificate format,
                  and signatory authenticity.
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono-data font-bold text-[#9A751F]">Section 03</div>
                <div className="font-bold text-slate-900">Commercial &amp; Escrow Structure</div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Assessment of offered price/discount against local refinery spot parity and review
                  of proposed banking or escrow payment terms.
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono-data font-bold text-[#9A751F]">Section 04</div>
                <div className="font-bold text-slate-900">Findings, Limitations &amp; Next Steps</div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Clear summary of verified facts, identified warning signs, scope limitations, and
                  recommended actions before committing capital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURE STEPPED VERIFICATION WORKFLOW */}
      <section ref={workflowRef} className="bg-[#0B0F17] text-slate-200 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37]">
              Confidential Submission Workflow
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Submit an Offer for 24–72-Hour Verification
            </h2>
            <p className="text-sm text-slate-400">
              Complete the steps below to submit your documents and initiate registry verification.
            </p>
          </div>

          {/* Visible Progress Stepper */}
          <nav aria-label="Verification Progress" className="grid grid-cols-5 gap-2">
            {steps.map((s) => {
              const isCurrent = step === s.num;
              const isDone = step > s.num;
              return (
                <div
                  key={s.num}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    isCurrent
                      ? 'bg-[#182232] border-[#D4AF37] text-white'
                      : isDone
                      ? 'bg-emerald-950/30 border-emerald-700/60 text-emerald-300'
                      : 'bg-[#111722] border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="font-mono-data text-[11px] font-bold">
                    Step 0{s.num}
                  </div>
                  <div className="text-xs font-semibold mt-0.5 truncate">{s.label}</div>
                </div>
              );
            })}
          </nav>

          {errorMsg && (
            <div
              role="alert"
              className="p-4 rounded-lg bg-rose-950/70 border border-rose-700 text-xs text-rose-200 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step Card Container */}
          <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 sm:p-8 shadow-xl">
            {/* STEP 1: REVIEW SCOPE */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono-data text-[#D4AF37] uppercase">
                    Step 1 of 5 · Before You Begin
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                    Review Service Scope &amp; Requirements
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <p>Before proceeding to document upload, please confirm the following:</p>
                  <ul className="space-y-2 pl-4 list-disc text-slate-300">
                    <li>
                      You have the counterparty or seller entity name and at least one offer
                      document, license number, or contract text ready to submit.
                    </li>
                    <li>
                      You understand that this 24–72-hour service verifies documentary, licensing,
                      and regulatory claims, and does not replace physical fire assay of bullion.
                    </li>
                    <li>
                      The verification fee is <strong>USD 2,500</strong> (inclusive of applicable
                      Ugandan VAT), with <strong>USD 1,000</strong> credited toward any 7-day
                      expedition booked within 90 days.
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer text-xs sm:text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={scopeConfirmed}
                    onChange={(e) => setScopeConfirmed(e.target.checked)}
                    className="mt-1 rounded border-slate-700 text-[#D4AF37]"
                  />
                  <span>
                    I understand the scope and limitations of the 24–72-hour verification service
                    and have my offer details ready.
                  </span>
                </label>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => validateAndProceed(2)}
                    className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Continue to Document Upload</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: UPLOAD DOCUMENTS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono-data text-[#D4AF37] uppercase">
                      Step 2 of 5 · Document &amp; Counterparty Details
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                      Upload Offer Documents &amp; Claims
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadSampleOffer}
                    className="text-xs font-mono-data text-[#D4AF37] hover:underline self-start sm:self-auto"
                  >
                    Load Example Offer for Testing
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ver-doc-type"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Primary Document Type *
                    </label>
                    <select
                      id="ver-doc-type"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    >
                      <option value="Full Corporate Offer (FCO)">Full Corporate Offer (FCO)</option>
                      <option value="Sales & Purchase Agreement (SPA)">
                        Sales &amp; Purchase Agreement (SPA)
                      </option>
                      <option value="DGSM Mineral License">
                        DGSM Mineral Dealer / Mining License
                      </option>
                      <option value="URA Customs / Export Permit">
                        URA Customs / Export Permit
                      </option>
                      <option value="ICGLR Certificate">ICGLR Regional Origin Certificate</option>
                      <option value="Refinery Assay Report">Refinery Fire Assay Certificate</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ver-seller"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Claimed Seller / Counterparty Entity *
                    </label>
                    <input
                      id="ver-seller"
                      type="text"
                      required
                      placeholder="e.g. Victoria Nile Gold Consortium Ltd"
                      value={claimedSeller}
                      onChange={(e) => setClaimedSeller(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ver-qty"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Claimed Quantity (kg / bars)
                    </label>
                    <input
                      id="ver-qty"
                      type="text"
                      placeholder="e.g. 150 kg Dore Bars"
                      value={claimedQuantityKg}
                      onChange={(e) => setClaimedQuantityKg(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ver-discount"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Proposed Price or Discount
                    </label>
                    <input
                      id="ver-discount"
                      type="text"
                      placeholder="e.g. 18% below LBMA spot"
                      value={claimedDiscountPercent}
                      onChange={(e) => setClaimedDiscountPercent(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                {/* Mobile-Friendly Document Upload */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Attach Document File (PDF, JPG, PNG)
                  </label>
                  <label className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-lg bg-[#0B0F17] border border-dashed border-slate-700 hover:border-[#D4AF37] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <Upload className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span>
                        {fileName
                          ? `Attached file: ${fileName}`
                          : 'Tap or click to upload PDF or image scan from your device'}
                      </span>
                    </div>
                    <span className="px-3 py-1.5 rounded bg-[#182232] text-[#D4AF37] font-mono-data text-xs shrink-0">
                      Select File
                    </span>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="ver-notes"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Contract Clauses, License Numbers, or Specific Questions *
                  </label>
                  <textarea
                    id="ver-notes"
                    rows={4}
                    placeholder="Paste key clauses, license serial numbers, escrow bank instructions, or specific claims you want verified..."
                    value={documentTextOrNotes}
                    onChange={(e) => setDocumentTextOrNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-lg bg-[#0B0F17] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => validateAndProceed(3)}
                    className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Continue to Contact &amp; Consent</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & CONSENT DETAILS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono-data text-[#D4AF37] uppercase">
                    Step 3 of 5 · Client Delivery &amp; Consent
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                    Provide Contact &amp; Consent Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ver-client-name"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="ver-client-name"
                      type="text"
                      required
                      placeholder="e.g. Henrik Lindqvist"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ver-company"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Organization / Company
                    </label>
                    <input
                      id="ver-company"
                      type="text"
                      placeholder="e.g. Nordic Bullion Treasury AB"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ver-email"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Email for Report Delivery &amp; Portal Access *
                    </label>
                    <input
                      id="ver-email"
                      type="email"
                      required
                      placeholder="henrik@nordicbullion.se"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ver-phone"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Direct Phone / WhatsApp
                    </label>
                    <input
                      id="ver-phone"
                      type="tel"
                      placeholder="+46 8 501 2290"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={confidentialityConsent}
                      onChange={(e) => setConfidentialityConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-[#D4AF37]"
                    />
                    <span>
                      <strong>Confidential Handling &amp; Non-Transaction Acknowledgement:</strong>{' '}
                      I authorize Uganda Gold Expedition to conduct registry and compliance checks on
                      the submitted material. I understand Uganda Gold Expedition does not broker,
                      buy, or sell gold.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={embargoAcknowledged}
                      onChange={(e) => setEmbargoAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-[#D4AF37]"
                    />
                    <span>
                      <strong>Analyst Sign-Off Protocol:</strong> I understand that preliminary
                      automated scans are routed to the assigned verification officer and that the
                      final report is released in the Client Portal only after analyst review and
                      approval within 24–72 hours.
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-lg bg-[#0B0F17] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => validateAndProceed(4)}
                    className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAY */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono-data text-[#D4AF37] uppercase">
                    Step 4 of 5 · Verification Fee Settlement
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                    Review Submission Summary &amp; Pay
                  </h3>
                </div>

                <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Client Name &amp; Email:</span>
                    <span className="text-white font-semibold">
                      {clientName} ({email})
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Document Type:</span>
                    <span className="text-white font-semibold">{documentType}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Claimed Counterparty:</span>
                    <span className="text-[#D4AF37] font-semibold">{claimedSeller}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400">Turnaround Timeframe:</span>
                    <span className="text-slate-200">24–72 Hours from payment confirmation</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-slate-300 font-bold">Total Verification Fee:</span>
                    <div className="text-right">
                      <span className="font-mono-data text-2xl font-bold text-[#D4AF37]">
                        $2,500 USD
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        ({priceDisplay} · Inclusive of applicable Ugandan VAT · $1,000 expedition
                        credit)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-lg bg-[#0B0F17] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleCompletePaymentAndSubmit}
                    className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Settlement &amp; Creating Dossier...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay USD 2,500 &amp; Submit Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMATION & TRACKING STATUS */}
            {step === 5 && completedVerification && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[11px] font-mono-data text-emerald-400 uppercase font-bold">
                        Verification Recorded · Reference {completedVerification.id}
                      </div>
                      <h3 className="text-base font-bold text-white">
                        Dossier Assigned for 24–72-Hour Registry Review
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono-data text-xs text-amber-300 bg-amber-950/80 border border-amber-700 px-3 py-1 rounded">
                    24–72h SLA Active
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3 text-xs">
                  <h4 className="font-bold text-white uppercase tracking-wider font-mono-data">
                    What Happens Next
                  </h4>
                  <ol className="space-y-2 text-slate-300 list-decimal pl-4">
                    <li>
                      Your submission has been assigned to{' '}
                      <strong className="text-white">{completedVerification.assignedOfficer}</strong>
                      .
                    </li>
                    <li>
                      Physical cross-checks against the DGSM Mineral Cadastre in Entebbe and URA
                      customs records are underway.
                    </li>
                    <li>
                      Once the reviewing officer signs off on the findings within 24–72 hours, your
                      report is unlocked for viewing and download in the Client Portal.
                    </li>
                  </ol>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 font-mono-data">
                    <div className="p-3 rounded bg-[#111722] border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">CASE REFERENCE</span>
                      <span className="text-[#D4AF37] font-bold">{completedVerification.id}</span>
                    </div>
                    <div className="p-3 rounded bg-[#111722] border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">PAYMENT REFERENCE</span>
                      <span className="text-emerald-400 font-bold">
                        {completedVerification.paymentRef}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {relworxCheckoutUrl && (
                    <a
                      href={relworxCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-[#182232] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>View Payment Session</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={() => onOpenClientPortalWithEmail(completedVerification.email)}
                      className="px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-2 transition-colors"
                    >
                      <span>Track Status in Client Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
