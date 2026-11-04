import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2, AlertCircle, ExternalLink, Loader2, QrCode } from 'lucide-react';
import { PackageTier, PaymentRecord } from '../types';
import { EXPEDITION_PACKAGES } from '../data/expeditionData';
import { InvoiceReceiptData } from './InvoiceReceiptModal';

interface CardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: 'academic' | 'trader' | 'sovereign';
  defaultPaymentType?: 'full' | 'doc_verification';
  onOpenInvoiceReceipt?: (data: InvoiceReceiptData) => void;
  onPaymentRecorded?: (payment: PaymentRecord) => void;
}

export const CardPaymentModal: React.FC<CardPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedTier = 'trader',
  defaultPaymentType = 'full',
  onOpenInvoiceReceipt,
  onPaymentRecorded
}) => {
  const [tier, setTier] = useState<'academic' | 'trader' | 'sovereign'>(selectedTier);
  const [paymentType, setPaymentType] = useState<'full' | 'doc_verification' | 'custom'>(defaultPaymentType);
  const [customServiceTitle, setCustomServiceTitle] = useState('Custom Forensic Advisory / Counterparty Audit');
  const [customAmountUsd, setCustomAmountUsd] = useState<number>(1500);
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentPkg = EXPEDITION_PACKAGES.find(p => p.id === tier) || EXPEDITION_PACKAGES[1];
  
  const DOC_VERIFICATION_AMOUNT = 2500;
  const totalAmount =
    paymentType === 'doc_verification'
      ? DOC_VERIFICATION_AMOUNT
      : paymentType === 'custom'
      ? Math.max(100, Number(customAmountUsd) || 0)
      : currentPkg.priceUsd;

  const handleInitiateCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardholderName || !email) {
      setErrorMsg('Please enter cardholder name and billing email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/payments/relworx-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'USD',
          payment_type: paymentType,
          description:
            paymentType === 'doc_verification'
              ? '24–72 Hour Forensic Document Verification (USD 2,500, inclusive of applicable Ugandan VAT)'
              : paymentType === 'custom'
              ? `${customServiceTitle} (USD ${totalAmount.toLocaleString()}, inclusive of applicable Ugandan VAT)`
              : `Uganda Gold Expedition: ${currentPkg.name} (USD ${currentPkg.priceUsd.toLocaleString()}, inclusive of applicable Ugandan VAT)`,
          customer_email: email,
          customer_name: cardholderName,
          package_tier:
            paymentType === 'doc_verification'
              ? '24–72 Hour Forensic Document Verification ($2,500)'
              : paymentType === 'custom'
              ? customServiceTitle
              : currentPkg.name
        })
      });

      const data = await res.json();
      if (data.success) {
        setPaymentResult(data);
        const newPayment: PaymentRecord = {
          id: `PAY-${Date.now().toString().slice(-6)}`,
          reference: data.reference || `UGE-CARD-${Date.now().toString().slice(-6)}`,
          customerName: cardholderName,
          email,
          amount: totalAmount,
          currency: 'USD',
          type: paymentType === 'doc_verification' ? 'doc_verification' : 'full_payment',
          status: 'Completed',
          cardBrand: 'Visa',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          tier:
            paymentType === 'doc_verification'
              ? '24–72 Hour Forensic Document Verification ($2,500, VAT Incl.)'
              : paymentType === 'custom'
              ? customServiceTitle
              : `${currentPkg.name} (Paid in Full, VAT Incl.)`
        };
        onPaymentRecorded?.(newPayment);
      } else {
        setErrorMsg(data.message || 'Payment session generation failed.');
      }
    } catch (err: any) {
      setErrorMsg('Could not connect to payment gateway service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Online Payment Settlement
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono-data">
                USD, INCLUSIVE OF APPLICABLE UGANDAN VAT · FULL PAYMENT ONLY
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

        {!paymentResult ? (
          <form onSubmit={handleInitiateCardPayment} className="p-6 space-y-4">
            
            {/* FLEXIBLE SERVICE SELECTION NOTICE */}
            <div className="p-3.5 rounded-lg bg-[#182232]/80 border border-[#D4AF37]/40 text-xs text-slate-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="leading-relaxed text-justify">
                <strong className="text-white">Select & Pay for Your Chosen Service: </strong>
                All prices in <strong className="text-white">USD, inclusive of applicable Ugandan VAT</strong>. Choose any expedition tier, standalone <strong className="text-emerald-300 font-bold">24–72 Hour Forensic Document Verification (USD 2,500, with USD 1,000 credited toward any expedition booked within 90 days)</strong>, or enter a custom service below.
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Payment Service Selector: Expedition Package vs 24-72 Hour Doc Verification vs Custom Service */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Choose What You Want to Pay For
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'full'
                      ? 'bg-[#182232] border-[#D4AF37]'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">7-Day Expedition</span>
                    <span className="text-xs font-mono-data text-[#D4AF37] font-bold">
                      ${currentPkg.priceUsd.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Full Package · KYC Included
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('doc_verification')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'doc_verification'
                      ? 'bg-emerald-950/50 border-emerald-400'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">24–72h Doc Audit</span>
                    <span className="text-xs font-mono-data text-emerald-400 font-bold">$2,500</span>
                  </div>
                  <p className="text-[10px] text-emerald-300/90 mt-1 font-mono-data">
                    $1,000 credited w/in 90d
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('custom')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentType === 'custom'
                      ? 'bg-[#182232] border-sky-400'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Custom Service</span>
                    <span className="text-xs font-mono-data text-sky-400 font-bold">
                      ${(Number(customAmountUsd) || 0).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Pay for Custom Audit / Retainer
                  </p>
                </button>
              </div>
            </div>

            {/* Tier Selector */}
            {paymentType === 'full' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Expedition Package Tier (USD, inclusive of applicable Ugandan VAT)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EXPEDITION_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setTier(pkg.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        tier === pkg.id
                          ? 'bg-[#182232] border-[#D4AF37] text-white'
                          : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-mono-data text-[#D4AF37]">{pkg.tierNumber}</div>
                      <div className="text-xs font-bold truncate">{pkg.name}</div>
                      <div className="text-[11px] font-mono-data text-slate-200 mt-0.5">
                        USD {pkg.priceUsd.toLocaleString()} / person
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Service Amount & Description */}
            {paymentType === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Service Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={customServiceTitle}
                    onChange={(e) => setCustomServiceTitle(e.target.value)}
                    placeholder="e.g. Additional Counterparty Verification ($1,500)"
                    className="w-full px-3 py-2 text-xs bg-[#111722] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Amount (USD) *
                  </label>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    required
                    value={customAmountUsd}
                    onChange={(e) => setCustomAmountUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono-data bg-[#111722] border border-slate-700 rounded text-[#D4AF37] font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            {/* Cardholder Information */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Account / Principal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MARCUS CHEN"
                  value={cardholderName}
                  onChange={e => setCardholderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Receipt Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@chencapital.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Total Due Summary */}
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-data text-slate-400 uppercase">
                  Total Billed (USD, inclusive of applicable Ugandan VAT)
                </span>
                <div className="text-xs text-slate-300 font-medium">
                  {paymentType === 'doc_verification'
                    ? '24–72 Hour Forensic Document Verification'
                    : paymentType === 'custom'
                    ? customServiceTitle
                    : `${currentPkg.name} (Full Package · KYC Included)`}
                </div>
              </div>
              <div className="font-cinzel text-2xl font-bold text-[#D4AF37] font-mono-data">
                ${totalAmount.toLocaleString()} USD
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 active:scale-[0.99] rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Encrypted Payment Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Apply & Pay (USD {totalAmount.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted Institutional Settlement Protocol · Full Payment Due on Booking</span>
            </div>

          </form>
        ) : (
          /* Payment Session Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono-data text-emerald-400 uppercase tracking-wider font-semibold">
                PAYMENT SESSION GENERATED
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                Secure Payment Session Ready
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto text-justify">
                Your checkout session has been initialized in USD, inclusive of applicable Ugandan VAT, for your selected service.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 text-left space-y-2 text-xs font-mono-data max-w-sm mx-auto">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Payment Reference:</span>
                <span className="text-[#D4AF37] font-bold">{paymentResult.reference}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Total Charged:</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()} USD (VAT Incl.)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Payment Terms:</span>
                <span className="text-amber-400 font-bold">Full Payment Due on Booking</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Channel:</span>
                <span className="text-emerald-400 font-bold">Encrypted Online Settlement</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={paymentResult.payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-xs font-bold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Authorize Online Payment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {onOpenInvoiceReceipt && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenInvoiceReceipt({
                      mode: 'receipt',
                      referenceId: paymentResult.reference || 'UGE-PAY-2027',
                      clientName: cardholderName || 'Authorized Principal',
                      companyName: 'Institutional Delegate',
                      clientEmail: email || 'principal@institution.org',
                      itemTitle:
                        paymentType === 'doc_verification'
                          ? '24–72 Hour Forensic Document Verification & Cadastre Audit'
                          : `Uganda Gold Expedition: ${currentPkg.name} (Full Package Settlement)`,
                      itemDescription:
                        'Official verified settlement receipt (USD, inclusive of applicable Ugandan VAT) with embedded cryptographic QR Code verification.',
                      amountUsd: totalAmount,
                      paymentStatus: 'paid'
                    });
                  }}
                  className="w-full py-2.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/60 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Generate QR Code Receipt & Invoice</span>
                </button>
              )}

              <button
                onClick={() => {
                  setPaymentResult(null);
                  onClose();
                }}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
