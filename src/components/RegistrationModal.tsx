import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Building, Globe2, User, Mail, Phone, ArrowRight, Download, CreditCard, AlertCircle } from 'lucide-react';
import { ExpeditionRegistration } from '../types';
import { EXPEDITION_PACKAGES, UPCOMING_COHORTS } from '../data/expeditionData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: 'academic' | 'trader' | 'sovereign';
  preloadedOfferNotes?: string;
  onProceedToCardPayment: (tier: 'academic' | 'trader' | 'sovereign', paymentType?: 'full') => void;
  onSubmitRegistration: (data: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedTier = 'trader',
  preloadedOfferNotes = '',
  onProceedToCardPayment,
  onSubmitRegistration
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    executiveTitle: '',
    country: 'United Arab Emirates',
    email: '',
    phone: '',
    requestedTier: preselectedTier,
    delegatesCount: 1,
    cohortDate: UPCOMING_COHORTS[0].dates,
    primaryObjective: 'Anti-Fraud & Scam Immunity',
    activeProposalDetails: preloadedOfferNotes,
    nonTransactionAgreed: false,
    kycAcknowledged: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedTier) {
      setFormData(prev => ({ ...prev, requestedTier: preselectedTier }));
    }
  }, [preselectedTier]);

  useEffect(() => {
    if (preloadedOfferNotes) {
      setFormData(prev => ({ ...prev, activeProposalDetails: preloadedOfferNotes }));
    }
  }, [preloadedOfferNotes]);

  if (!isOpen) return null;

  const selectedPackage = EXPEDITION_PACKAGES.find(p => p.id === formData.requestedTier) || EXPEDITION_PACKAGES[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.companyName) {
      setErrorMsg('Please complete all required identity and corporate fields.');
      return;
    }
    if (!formData.nonTransactionAgreed) {
      setErrorMsg('You must agree to the Non-Transaction Guarantee.');
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refCode = `REG-2027-${randomCode}`;
    setApplicationRef(refCode);

    onSubmitRegistration({
      ...formData,
      id: refCode,
      status: 'pending_kyc',
      kycPaymentStatus: 'pending',
      registeredAt: new Date().toISOString().split('T')[0]
    });

    setIsSubmitted(true);
    setErrorMsg('');
  };

  const handleDownloadDossier = () => {
    const textContent = `UGANDA GOLD EXPEDITION — OFFICIAL REGISTRATION DOSSIER
=====================================================
Registration Reference: ${applicationRef}
Date of Registration: ${new Date().toISOString()}
Status: PENDING FULL PACKAGE SETTLEMENT (USD ${selectedPackage.priceUsd.toLocaleString()}, INCLUSIVE OF APPLICABLE UGANDAN VAT)

APPLICANT PROFILE:
- Full Legal Name: ${formData.fullName}
- Corporate Entity: ${formData.companyName}
- Executive Title: ${formData.executiveTitle}
- Jurisdiction: ${formData.country}
- Direct Email: ${formData.email}
- Contact Phone: ${formData.phone}

EXPEDITION PARAMETERS:
- Requested Tier: ${selectedPackage.name} (USD ${selectedPackage.priceUsd.toLocaleString()}, inclusive of applicable Ugandan VAT)
- Number of Delegates: ${formData.delegatesCount}
- Target Cohort: ${formData.cohortDate}
- Primary Objective: ${formData.primaryObjective}

STATUTORY DECLARATIONS & TERMS:
- Non-Transaction Guarantee Confirmed: YES
- OFAC, UN, UK HMT, EU Sanctions & PEP Screening Included: YES

ACTIVE PROPOSAL NOTES:
${formData.activeProposalDetails || 'None submitted.'}

PAYMENT METHODS ACCEPTED:
- Encrypted Online Settlement & Institutional Treasury Clearance (Pay for your selected package or service)
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Expedition-Registration-${applicationRef}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Expedition Application & Full Payment Settlement
              </h3>
              <p className="text-[11px] text-slate-400 font-mono-data">
                OFFICIAL PARTICIPATION & SECURITY CLEARANCE DOSSIER (USD, INCLUSIVE OF APPLICABLE UGANDAN VAT)
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

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* TRANSPARENT PRICING & SANCTIONS SCREENING NOTICE */}
            <div className="p-4 rounded-xl bg-[#182232]/80 border border-[#D4AF37]/40 text-xs text-slate-200 flex items-start gap-3 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white uppercase tracking-wider block font-mono-data">
                  Transparent Package Selection — Pay Only for What You Choose:
                </span>
                <p className="leading-relaxed text-justify">
                  All prices are in <strong className="text-white">USD, inclusive of applicable Ugandan VAT</strong>. There is no separate standalone KYC fee—statutory <strong className="text-[#D4AF37]">OFAC, UN, UK HMT, EU sanctions and PEP screening</strong> and government liaison accreditation are included in every expedition package. Select the exact tier or service you wish to book and proceed at your convenience.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-xs text-rose-300 font-medium">
                {errorMsg}
              </div>
            )}

            {/* Section 1: Executive Profile */}
            <div className="space-y-4">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                1. Executive & Corporate Profile
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Chen"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Entity / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Precious Metals DMCC"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Executive Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing Director / Partner"
                    value={formData.executiveTitle}
                    onChange={e => setFormData({ ...formData, executiveTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country / Jurisdiction *
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <select
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
                      <option value="Switzerland">Switzerland (Geneva / Zurich)</option>
                      <option value="United Kingdom">United Kingdom (London)</option>
                      <option value="United States">United States</option>
                      <option value="China">China / Hong Kong</option>
                      <option value="Singapore">Singapore</option>
                      <option value="India">India (Mumbai)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Other">Other Sovereign Jurisdiction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="marcus@apexpm.ae"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Direct Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Package Tier */}
            <div className="space-y-4">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                2. Select Expedition Tier (KYC Included · Full Payment Only)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EXPEDITION_PACKAGES.map((pkg) => {
                  const isSelected = formData.requestedTier === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setFormData({ ...formData, requestedTier: pkg.id })}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#182232] border-[#D4AF37] shadow'
                          : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono-data font-bold text-[#D4AF37]">
                        {pkg.tierNumber}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                        {pkg.name}
                      </div>
                      <div className="text-xs font-mono-data text-slate-200 font-semibold mt-1">
                        USD {pkg.priceUsd.toLocaleString()} / person
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        USD, inclusive of applicable Ugandan VAT
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        KYC & Sanctions Vetting Included
                      </div>
                    </div>
                  );
                })}
              </div>

              {formData.requestedTier === 'academic' && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-700/50 text-[11px] text-emerald-200">
                  <strong>Group & Academic Rate:</strong> book 6+ paying delegates and one accompanying lecturer/staff member joins complimentary (full program access, board and field days). Minimum cohort: 6 paying delegates.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target 2027 Cohort
                  </label>
                  <select
                    value={formData.cohortDate}
                    onChange={e => setFormData({ ...formData, cohortDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {UPCOMING_COHORTS.map((c) => (
                      <option key={c.id} value={c.dates}>{c.dates} ({c.status})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Number of Paying Delegates
                  </label>
                  <select
                    value={formData.delegatesCount}
                    onChange={e => setFormData({ ...formData, delegatesCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1}>1 Principal Delegate</option>
                    <option value={2}>2 Delegates (Principal + Legal Counsel)</option>
                    <option value={3}>3 Delegates (Executive Delegation)</option>
                    <option value={4}>4 Delegates (Corporate Delegation)</option>
                    <option value={6}>6 Paying Delegates (+1 Complimentary Lecturer for Tier 01)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Statutory Checkboxes */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold border-b border-slate-800 pb-1">
                3. Statutory Confirmations
              </div>

              <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.nonTransactionAgreed}
                  onChange={e => setFormData({ ...formData, nonTransactionAgreed: e.target.checked, kycAcknowledged: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>
                  <strong>Strict Non-Transaction & Sanctions Compliance Agreement:</strong> I acknowledge that the Uganda Gold Expedition is exclusively an independent due diligence, metallurgical verification, and anti-fraud mission (which does NOT sell gold or broker mineral sales), and I consent to standard OFAC, UN, UK HMT, EU sanctions and PEP screening included with my selected package.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400">
                Total Due: USD {selectedPackage.priceUsd.toLocaleString()} (inclusive of applicable Ugandan VAT)
              </span>
              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] rounded transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Apply & Pay (USD {selectedPackage.priceUsd.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono-data text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                REGISTRATION RECORDED IN SOVEREIGN SYSTEM
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Registration Dossier Recorded
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Your dossier has been registered under reference <strong className="text-[#D4AF37] font-mono">{applicationRef}</strong>. Complete your <strong className="text-white">full package payment of USD {selectedPackage.priceUsd.toLocaleString()} (inclusive of applicable Ugandan VAT)</strong> to confirm your seat and initiate OFAC, UN, UK HMT, EU sanctions and PEP screening.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs font-mono-data">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Reference:</span>
                <span className="text-[#D4AF37] font-bold">{applicationRef}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Principal:</span>
                <span className="text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Selected Tier:</span>
                <span className="text-[#D4AF37] uppercase">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Status:</span>
                <span className="text-amber-400">Pending (USD {selectedPackage.priceUsd.toLocaleString()} Full Payment)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCardPayment(formData.requestedTier as any, 'full');
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Apply & Pay (USD {selectedPackage.priceUsd.toLocaleString()})</span>
              </button>

              <button
                onClick={handleDownloadDossier}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#D4AF37]" />
                <span>Download Dossier</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              Proforma invoice and full-payment settlement instructions sent to {formData.email}.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
