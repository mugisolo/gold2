import React, { useState } from 'react';
import { 
  X, 
  FileSearch, 
  Upload, 
  CreditCard, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Loader2, 
  Download, 
  ExternalLink,
  ArrowRight,
  Lock
} from 'lucide-react';
import { DocumentVerification } from '../types';

interface DocumentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationCreated: (verification: DocumentVerification) => void;
  onOpenClientPortal?: (clientEmail: string) => void;
}

export const DocumentVerificationModal: React.FC<DocumentVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationCreated,
  onOpenClientPortal
}) => {
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [documentType, setDocumentType] = useState<DocumentVerification['documentType']>('Full Corporate Offer (FCO)');
  const [claimedSeller, setClaimedSeller] = useState('');
  const [claimedQuantityKg, setClaimedQuantityKg] = useState('');
  const [claimedDiscountPercent, setClaimedDiscountPercent] = useState('');
  const [documentTextOrNotes, setDocumentTextOrNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [fileMimeType, setFileMimeType] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [completedVerification, setCompletedVerification] = useState<DocumentVerification | null>(null);
  const [relworxCheckoutUrl, setRelworxCheckoutUrl] = useState('');

  if (!isOpen) return null;

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

  const handleLoadSampleFraudOffer = () => {
    setDocumentType('Full Corporate Offer (FCO)');
    setClaimedSeller('Kampala Royal Bullion Consortium Ltd');
    setClaimedQuantityKg('250 kg Au Dore Bars (97.6% Purity)');
    setClaimedDiscountPercent('20% Below LBMA Spot');
    setFileName('FCO_KampalaRoyalBullion_250KG.pdf');
    setDocumentTextOrNotes(
      'Seller offers 250kg of artisanal Dore gold bars currently held in Entebbe Customs Bonded Warehouse. Buyer is required to wire $55,000 USD upfront for 5% URA Export Tax & ICGLR clearance into the escrow account of Seller Legal Counsel before physical refinery fire assay.'
    );
  };

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !claimedSeller) {
      setErrorMsg('Please complete your name, corporate email, and the claimed seller/counterparty name.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('Please confirm the USD $2,500 one-off verification service terms.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Initialize Relworx Visa / Mastercard Session for USD $2,500
      const paymentRes = await fetch('/api/payments/relworx-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 2500,
          currency: 'USD',
          payment_type: 'doc_verification',
          description: `24–72 Hour Forensic Document Verification (${documentType}) — USD 2,500, inclusive of applicable Ugandan VAT`,
          customer_email: email,
          customer_name: clientName,
          package_tier: '24–72 Hour Forensic Document Verification ($2,500)'
        })
      });
      const paymentData = await paymentRes.json();
      if (paymentData.payment_url) {
        setRelworxCheckoutUrl(paymentData.payment_url);
      }

      // 2. Submit Document for AI Forensic Analysis & Routing to Staff Officer 1
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
          paymentRef: paymentData.reference
        })
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.verification) {
        setCompletedVerification(verifyData.verification);
        onVerificationCreated(verifyData.verification);
      } else {
        setErrorMsg(verifyData.message || 'Verification submission failed.');
      }
    } catch (err: any) {
      setErrorMsg('Network error while connecting to forensic verification engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <FileSearch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                24–72 Hour Forensic Document Verification (USD 2,500, inclusive of applicable Ugandan VAT)
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono-data">
                AI FORENSIC DECONSTRUCTION + STAFF OFFICER 1 AUDIT · 24–72 HOUR REPORT
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

        {!completedVerification ? (
          <form onSubmit={handleSubmitVerification} className="p-6 sm:p-8 space-y-5 max-h-[82vh] overflow-y-auto">
            
            {/* Workflow Summary Banner */}
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">1. USD 2,500 (VAT Incl.)</span>
                  <span className="text-[11px] text-slate-400">Immediate Encrypted Settlement</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileSearch className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">2. Instant AI Analysis</span>
                  <span className="text-[11px] text-slate-400">Forensic red-flag deconstruction</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">3. Staff Officer 1 Audit</span>
                  <span className="text-[11px] text-emerald-400">Full report sent in 24–72 hours</span>
                </div>
              </div>
            </div>

            {/* USD 1,000 Expedition Credit Banner */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/50 text-xs text-emerald-200 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Expedition Credit Policy:</strong> USD 1,000 of your verification fee is credited toward any expedition package booked within 90 days.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-xs text-rose-300 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Client Information */}
            <div className="space-y-3">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                1. Client Delivery Coordinates
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Henrik Lindqvist"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nordic Bullion Treasury AB"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email for 24–72 Hour Report Delivery *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="henrik@nordicbullion.se"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+46 8 501 2290"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Document Details & Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold">
                  2. Document & Counterparty Specifications
                </span>
                <button
                  type="button"
                  onClick={handleLoadSampleFraudOffer}
                  className="text-[11px] text-[#D4AF37] hover:underline font-mono-data"
                >
                  Load Sample Suspicious FCO
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Document Category *
                  </label>
                  <select
                    value={documentType}
                    onChange={e => setDocumentType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Full Corporate Offer (FCO)">Full Corporate Offer (FCO)</option>
                    <option value="Sales & Purchase Agreement (SPA)">Sales & Purchase Agreement (SPA)</option>
                    <option value="DGSM Mineral License">DGSM Mineral Dealer / Mining License</option>
                    <option value="URA Customs / Export Permit">URA Customs / Export Permit</option>
                    <option value="ICGLR Certificate">ICGLR Regional Origin Certificate</option>
                    <option value="Refinery Assay Report">Refinery Fire Assay Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Claimed Seller / Mining Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Nile Gold Syndicate Ltd"
                    value={claimedSeller}
                    onChange={e => setClaimedSeller(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Claimed Quantity (kg / bars)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 150 kg Dore Bars"
                    value={claimedQuantityKg}
                    onChange={e => setClaimedQuantityKg(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Offered Price / Discount %
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20% below LBMA spot"
                    value={claimedDiscountPercent}
                    onChange={e => setClaimedDiscountPercent(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* File Upload Box */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Upload Document (PDF, JPG, PNG) or Paste Contract Clauses Below
                </label>
                <label className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#0B0F17] border border-dashed border-slate-700 hover:border-[#D4AF37] cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>{fileName ? `Attached: ${fileName}` : 'Click to attach PDF or image scan of the document'}</span>
                  </div>
                  <span className="text-[10px] font-mono-data text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                    Browse File
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
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Text, Clauses, License Numbers, or Payment Terms *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Paste key clauses from the FCO/SPA, license numbers, bank escrow requests, or customs tax claims for AI forensic deconstruction and Staff Officer 1 registry verification..."
                  value={documentTextOrNotes}
                  onChange={e => setDocumentTextOrNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Fee Summary & Consent */}
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-data text-slate-400 uppercase block">
                  24–72 Hour Forensic Document Verification Fee (USD, inclusive of applicable Ugandan VAT)
                </span>
                <span className="text-xs text-white font-medium">
                  AI Forensic Scan + Staff Officer 1 Registry Audit (24–72h SLA · USD 1,000 credited toward expedition within 90 days)
                </span>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#D4AF37] font-mono-data">
                $2,500 USD
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedTerms}
                onChange={e => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-justify">
                I authorize the one-off <strong className="text-white">USD 2,500 (inclusive of applicable Ugandan VAT)</strong> verification fee. USD 1,000 of my verification fee is credited toward any expedition package booked within 90 days. I understand my document will be analyzed by AI and routed to <strong className="text-[#D4AF37]">Staff Officer 1</strong>, and that <strong className="text-amber-300">no reports (not even AI-generated reports) are accessible or downloadable until the analyst approves</strong> the final audit within 24–72 hours.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Running Internal AI Scan & Routing to Staff Officer 1...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay USD 2,500 (VAT Incl.) & Submit for 24–72 Hour Forensic Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Post-Submission Confirmation — Strictly Embargoed Until Analyst Approval */
          <div className="p-6 sm:p-8 space-y-5 max-h-[82vh] overflow-y-auto">
            
            {/* Status Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono-data text-emerald-400 uppercase font-bold">
                    DISPATCHED TO STAFF OFFICER 1 · CASE {completedVerification.id}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Dossier Queued — Awaiting Analyst Verification & Sign-Off
                  </h4>
                </div>
              </div>
              <span className="text-[11px] font-mono-data text-amber-300 bg-amber-950/80 border border-amber-700 px-2.5 py-1 rounded shrink-0 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>24–72h SLA Active</span>
              </span>
            </div>

            {/* Embargoed Report Notice (No AI or preliminary report shown or downloadable) */}
            <div className="rounded-xl bg-[#0B0F17] border border-amber-700/60 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-data text-amber-400 uppercase font-bold">
                    REPORT EMBARGO PROTOCOL ACTIVE
                  </div>
                  <h5 className="text-sm font-bold text-white mt-0.5">
                    Reports & AI Findings Locked Pending Analyst Approval
                  </h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    The internal AI forensic scan has been completed and transmitted exclusively to{' '}
                    <strong className="text-white">{completedVerification.assignedOfficer}</strong>. In accordance with institutional verification standards,{' '}
                    <strong className="text-amber-300">
                      neither preliminary AI-generated reports nor audit findings are accessible or downloadable
                    </strong>{' '}
                    until the analyst completes physical DGSM/URA registry cross-checks and approves release in your Client Portal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800 text-xs font-mono-data">
                <div className="p-2.5 rounded bg-[#111722] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">CASE REFERENCE</span>
                  <span className="text-[#D4AF37] font-bold">{completedVerification.id}</span>
                </div>
                <div className="p-2.5 rounded bg-[#111722] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PAYMENT REFERENCE ($2,500)</span>
                  <span className="text-emerald-400 font-bold">{completedVerification.paymentRef}</span>
                </div>
                <div className="p-2.5 rounded bg-[#111722] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">ASSIGNED ANALYST</span>
                  <span className="text-white font-bold">{completedVerification.assignedOfficer}</span>
                </div>
                <div className="p-2.5 rounded bg-[#111722] border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">GUARANTEED SLA</span>
                  <span className="text-amber-300 font-bold">{completedVerification.slaDeadline}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              {relworxCheckoutUrl && (
                <a
                  href={relworxCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-200 bg-[#182232] hover:bg-[#222E42] border border-slate-700 rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Payment Receipt ($2,500)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {onOpenClientPortal && (
                  <button
                    type="button"
                    onClick={() => {
                      const submittedEmail = completedVerification.email;
                      setCompletedVerification(null);
                      onClose();
                      onOpenClientPortal(submittedEmail);
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded flex items-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Track Status in Secure Client Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setCompletedVerification(null);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
