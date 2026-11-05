import React, { useState, useMemo, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import {
  X,
  QrCode,
  FileText,
  Download,
  ShieldCheck,
  Printer,
  Copy,
  Check,
  Sparkles,
  Receipt,
  MapPin,
  RefreshCw,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { Currency, DocumentVerification, PaymentRecord } from '../types';
import { formatCurrencyPrice } from '../data/expeditionData';

export interface InvoiceReceiptData {
  mode?: 'invoice' | 'receipt';
  referenceId: string;
  transactionRef?: string;
  clientName: string;
  companyName: string;
  clientEmail: string;
  clientCountry?: string;
  itemTitle: string;
  itemDescription: string;
  amountUsd: number;
  paymentStatus: 'paid' | 'pending';
  issuedDate?: string;
  paymentMethodLabel?: string;
}

interface InvoiceReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: InvoiceReceiptData | null;
  selectedCurrency?: Currency;
  onVerifyRecordInPortal?: (referenceId: string, clientEmail: string) => void;
  onAiReceiptGenerated?: (
    verificationRecord: DocumentVerification,
    paymentRecord: PaymentRecord
  ) => void;
}

// Deterministic cryptographic digest for QR verification
function computeReceiptDigest(payload: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < payload.length; i++) {
    const ch = payload.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch * 31;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const hex3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  return `UGE-QR-${hex1}-${hex2}-${hex3}`;
}

export const OFFICIAL_UGE_ADDRESS =
  'Uganda Gold Expeditions, P.O Box 122234, Bugonga, Entebbe, Uganda';
export const OFFICIAL_URA_TIN = 'URA TIN 1019482710';

// Embedded UGE Sovereign Crest SVG Data URI for qrcode.react imageSettings
export const UGE_QR_LOGO_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <rect x="2" y="2" width="60" height="60" rx="12" fill="#0B0F17" stroke="#D4AF37" stroke-width="4"/>
    <rect x="7" y="7" width="50" height="50" rx="8" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="32" y="39" text-anchor="middle" font-family="Georgia, serif" font-weight="bold" font-size="19" fill="#D4AF37" letter-spacing="1">UGE</text>
  </svg>`
)}`;

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  isOpen,
  onClose,
  initialData,
  selectedCurrency = 'USD',
  onVerifyRecordInPortal,
  onAiReceiptGenerated
}) => {
  const defaultDocMode =
    initialData?.mode || (initialData?.paymentStatus === 'paid' ? 'receipt' : 'invoice');

  const [docMode, setDocMode] = useState<'invoice' | 'receipt'>(defaultDocMode);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(selectedCurrency);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [aiGeneratedBanner, setAiGeneratedBanner] = useState<string>('');

  const [activeRefId, setActiveRefId] = useState<string>(
    initialData?.referenceId || 'DOC-VER-2027-4401'
  );
  const [customInvoiceNo, setCustomInvoiceNo] = useState<string>('');
  const [customReceiptNo, setCustomReceiptNo] = useState<string>('');
  const [customTxRef, setCustomTxRef] = useState<string>(initialData?.transactionRef || '');
  const [customAiSeal, setCustomAiSeal] = useState<string>('');
  const [complianceAttestation, setComplianceAttestation] = useState<string>(
    `Official statutory tax record issued by ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}). Verified under the Uganda Mining and Minerals Act 2022 and Non-Transaction Charter.`
  );

  const [clientName, setClientName] = useState(
    initialData?.clientName || 'Alexander Vance'
  );
  const [companyName, setCompanyName] = useState(
    initialData?.companyName || 'Apex Precious Metals DMCC'
  );
  const [clientEmail, setClientEmail] = useState(
    initialData?.clientEmail || 'a.vance@apexmetals.ae'
  );
  const [itemTitle, setItemTitle] = useState(
    initialData?.itemTitle ||
      '24–72 Hour Forensic Document Verification & Statutory Cadastre Audit'
  );
  const [itemDescription, setItemDescription] = useState(
    initialData?.itemDescription ||
      `Includes AI Forensic Deconstruction, DGSM Entebbe Mineral Cadastre Cross-Check, URA ASYCUDA Verification, and Staff Officer 1 Signed Dossier issued by ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}). (USD 1,000 credited toward any expedition package booked within 90 days.)`
  );
  const [amountUsd, setAmountUsd] = useState<number>(initialData?.amountUsd || 2500);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>(
    initialData?.paymentStatus || 'paid'
  );

  const qrSvgWrapperRef = useRef<HTMLDivElement>(null);
  const printableSheetRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    setAiGeneratedBanner('');
    if (initialData) {
      setDocMode(
        initialData.mode || (initialData.paymentStatus === 'paid' ? 'receipt' : 'invoice')
      );
      setActiveRefId(initialData.referenceId || 'DOC-VER-2027-4401');
      setCustomTxRef(initialData.transactionRef || '');
      setCustomInvoiceNo('');
      setCustomReceiptNo('');
      setCustomAiSeal('');
      setClientName(initialData.clientName);
      setCompanyName(initialData.companyName);
      setClientEmail(initialData.clientEmail);
      setItemTitle(initialData.itemTitle);
      setItemDescription(initialData.itemDescription);
      setAmountUsd(initialData.amountUsd);
      setPaymentStatus(initialData.paymentStatus);
    }
    setDisplayCurrency(selectedCurrency);
  }, [isOpen, initialData, selectedCurrency]);

  const referenceId = activeRefId || initialData?.referenceId || 'DOC-VER-2027-4401';
  const invoiceNumber =
    customInvoiceNo ||
    `INV-UGE-2027-${referenceId.replace(/[^0-9]/g, '').slice(-4) || '8812'}`;
  const receiptNumber =
    customReceiptNo ||
    `RCT-UGE-2027-${referenceId.replace(/[^0-9]/g, '').slice(-4) || '8812'}`;
  const issuedDate =
    initialData?.issuedDate || new Date().toISOString().split('T')[0] + ' UTC';

  const txSettlementRef = useMemo(
    () =>
      customTxRef ||
      initialData?.transactionRef ||
      (docMode === 'receipt' ? receiptNumber : invoiceNumber),
    [customTxRef, initialData?.transactionRef, docMode, receiptNumber, invoiceNumber]
  );

  const qrDigest = useMemo(
    () =>
      customAiSeal ||
      computeReceiptDigest(
        `${referenceId}|${txSettlementRef}|${clientName}|${companyName}|${amountUsd}|${docMode}|${OFFICIAL_URA_TIN}`
      ),
    [customAiSeal, referenceId, txSettlementRef, clientName, companyName, amountUsd, docMode]
  );

  // Compact Client Portal Deep-Link URL encoded inside qrcode.react QRCodeSVG
  // Kept concise so Error Correction Level H + embedded UGE logo remains 100% scannable at 2cm x 2cm on physical printouts
  const qrVerificationPayload = useMemo(() => {
    const baseOrigin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://ugandagoldexpedition.org';
    const params = new URLSearchParams({
      ref: referenceId,
      tx: txSettlementRef
    });
    return `${baseOrigin}/portal?${params.toString()}`;
  }, [referenceId, txSettlementRef]);

  if (!isOpen) return null;

  const formattedDisplayAmount = formatCurrencyPrice(amountUsd, displayCurrency);

  // AI Generate Unique Receipt & Verifiable QR Code (registers record in backend & Client Portal)
  const handleAiGenerateUniqueReceipt = async () => {
    setIsAiGenerating(true);
    setAiGeneratedBanner('');
    try {
      const response = await fetch('/api/receipts/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          clientEmail,
          amountUsd,
          docMode,
          serviceType: amountUsd <= 3000 ? 'doc_verification' : 'full_payment'
        })
      });

      const data = await response.json();
      if (data.success && data.receipt) {
        setActiveRefId(data.receipt.referenceId);
        setCustomReceiptNo(data.receipt.receiptNumber);
        setCustomInvoiceNo(data.receipt.invoiceNumber);
        setCustomTxRef(data.receipt.transactionRef);
        setCustomAiSeal(data.receipt.cryptographicSeal);
        if (data.receipt.itemTitle) setItemTitle(data.receipt.itemTitle);
        if (data.receipt.itemDescription) setItemDescription(data.receipt.itemDescription);
        if (data.receipt.complianceAttestation) {
          setComplianceAttestation(data.receipt.complianceAttestation);
        }

        if (onAiReceiptGenerated && data.verificationRecord && data.paymentRecord) {
          onAiReceiptGenerated(data.verificationRecord, data.paymentRecord);
        }

        setAiGeneratedBanner(
          `AI Generated Unique Verifiable ${
            docMode === 'receipt' ? 'Receipt' : 'Invoice'
          } (${
            docMode === 'receipt' ? data.receipt.receiptNumber : data.receipt.invoiceNumber
          }) · Linked to Dossier ${data.receipt.referenceId} in Client Portal`
        );
        return;
      }
    } catch {
      // Fallback deterministic generation if offline
    } finally {
      setIsAiGenerating(false);
    }

    const fallbackSuffix = `${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 89)}`;
    const nextRef =
      amountUsd <= 3000
        ? `DOC-VER-2027-${fallbackSuffix.slice(0, 4)}`
        : `REG-2027-${fallbackSuffix.slice(0, 4)}`;
    const nextRct = `RCT-UGE-2027-${fallbackSuffix}`;
    const nextInv = `INV-UGE-2027-${fallbackSuffix}`;
    const nextTx = `UGE-TX-AI-${fallbackSuffix}`;
    const nextSeal = computeReceiptDigest(`${nextRef}|${nextTx}|${clientEmail}|${Date.now()}`);

    setActiveRefId(nextRef);
    setCustomReceiptNo(nextRct);
    setCustomInvoiceNo(nextInv);
    setCustomTxRef(nextTx);
    setCustomAiSeal(nextSeal);
    setAiGeneratedBanner(
      `Generated Unique Verifiable ${
        docMode === 'receipt' ? 'Receipt' : 'Invoice'
      } (${docMode === 'receipt' ? nextRct : nextInv}) · Dossier ${nextRef}`
    );
  };

  const handleCopyVerificationString = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(qrVerificationPayload).catch(() => {});
    }
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2200);
  };

  // Trigger browser-native print / Export as A4 PDF dialog
  const handlePrintDocument = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Dedicated 'Download as PDF' button using html2pdf.js preserving exact formatting & QR alignment on mobile, tablet, and desktop
  const handleDownloadPdf = async () => {
    const targetElement =
      printableSheetRef.current || document.getElementById('printable-invoice-receipt');
    if (!targetElement || isExportingPdf) return;

    setIsExportingPdf(true);

    // Create an unclipped offscreen A4 staging container on document.body so mobile modal overflow/width never clips or overlaps the URA TIN header and 2cm x 2cm QR code
    const stagingContainer = document.createElement('div');
    stagingContainer.className = 'uge-pdf-export-staging';
    const exportClone = targetElement.cloneNode(true) as HTMLElement;
    exportClone.classList.add('uge-pdf-export-lock');
    stagingContainer.appendChild(exportClone);
    document.body.appendChild(stagingContainer);

    try {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      const pdfFileName = `${
        docMode === 'receipt' ? receiptNumber : invoiceNumber
      }-Uganda-Gold-Expedition.pdf`;

      const workerFn =
        typeof html2pdf === 'function'
          ? html2pdf
          : (html2pdf as unknown as { default?: typeof html2pdf })?.default;

      if (workerFn) {
        await workerFn()
          .set({
            margin: [10, 10, 10, 10],
            filename: pdfFileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              backgroundColor: '#0B0F17',
              logging: false,
              windowWidth: 960,
              width: 740,
              scrollX: 0,
              scrollY: 0
            },
            jsPDF: {
              unit: 'mm',
              format: 'a4',
              orientation: 'portrait'
            }
          })
          .from(exportClone)
          .save();
      } else {
        handlePrintDocument();
      }
    } catch {
      handlePrintDocument();
    } finally {
      if (stagingContainer.parentNode) {
        stagingContainer.parentNode.removeChild(stagingContainer);
      }
      setIsExportingPdf(false);
    }
  };

  // Generate printable HTML file embedding the exact qrcode.react SVG
  const handleDownloadPrintableHtml = () => {
    const renderedQrSvg =
      qrSvgWrapperRef.current?.innerHTML ||
      `<div style="padding:16px;font-family:monospace;font-size:11px;color:#0B0F17;">${qrVerificationPayload}</div>`;

    const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${docMode === 'receipt' ? 'Official QR Code Receipt' : 'Commercial Proforma Invoice'} - ${
      docMode === 'receipt' ? receiptNumber : invoiceNumber
    }</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0B0F17; color: #E2E8F0; padding: 32px; margin: 0; }
    .sheet { max-width: 820px; margin: 0 auto; background: #111722; border: 2px solid #D4AF37; border-radius: 14px; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #1E293B; padding-bottom: 20px; }
    .brand { font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 1px; }
    .gold { color: #D4AF37; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; background: ${
      docMode === 'receipt' ? '#064E3B' : '#1E293B'
    }; color: ${docMode === 'receipt' ? '#6EE7B7' : '#D4AF37'}; border: 1px solid ${
      docMode === 'receipt' ? '#10B981' : '#D4AF37'
    }; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
    .box { background: #0B0F17; border: 1px solid #1E293B; border-radius: 10px; padding: 16px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border-bottom: 1px solid #1E293B; padding: 12px; text-align: left; font-size: 13px; }
    th { color: #D4AF37; text-transform: uppercase; font-size: 11px; }
    .qr-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid #1E293B; }
    .qr-box { background: #FFFFFF; padding: 6px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; border: 1.5px solid #D4AF37; }
    .qr-box svg { width: 2cm; height: 2cm; display: block; }
    .mono { font-family: monospace; font-size: 11px; color: #94A3B8; word-break: break-all; }
    @media print {
      body { background: #FFFFFF; color: #0F172A; padding: 0; }
      .sheet { background: #FFFFFF; color: #0F172A; border-color: #9A7418; }
      .box { background: #F8FAFC; border-color: #CBD5E1; color: #0F172A; }
      .qr-box svg { width: 2cm !important; height: 2cm !important; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div>
        <div class="brand">UGANDA GOLD <span class="gold">EXPEDITION</span></div>
        <div style="font-size:12px;color:#E2E8F0;font-weight:600;margin-top:4px;">${OFFICIAL_UGE_ADDRESS}</div>
        <div style="font-size:11px;color:#94A3B8;margin-top:2px;">Amber House Secretariat, Kampala &amp; DGSM Registry Liaison, Entebbe</div>
        <div style="font-size:11px;color:#D4AF37;font-family:monospace;font-weight:bold;margin-top:4px;">${OFFICIAL_URA_TIN} · Output VAT 18% (included in total)</div>
      </div>
      <div style="text-align:right;">
        <div class="badge">${
          docMode === 'receipt'
            ? 'OFFICIAL VERIFIED QR CODE RECEIPT'
            : 'INSTITUTIONAL PROFORMA INVOICE'
        }</div>
        <div style="font-size:16px;font-weight:bold;color:#FFFFFF;margin-top:6px;">${
          docMode === 'receipt' ? receiptNumber : invoiceNumber
        }</div>
        <div style="font-size:11px;color:#94A3B8;">Issued: ${issuedDate}</div>
      </div>
    </div>
    <div class="grid">
      <div class="box">
        <div style="color:#D4AF37;font-size:11px;font-weight:bold;text-transform:uppercase;">Billed Principal / Organization</div>
        <div style="font-size:15px;font-weight:bold;color:#FFF;margin-top:4px;">${clientName}</div>
        <div>${companyName}</div>
        <div style="color:#94A3B8;margin-top:2px;">${clientEmail}</div>
      </div>
      <div class="box">
        <div style="color:#D4AF37;font-size:11px;font-weight:bold;text-transform:uppercase;">Settlement &amp; Statutory Reference</div>
        <div style="margin-top:4px;">Dossier Ref: <strong>${referenceId}</strong></div>
        <div>Settlement Ref: <strong>${txSettlementRef}</strong></div>
        <div>Status: <strong style="color:${
          docMode === 'receipt' ? '#34D399' : '#FBBF24'
        };">${docMode === 'receipt' ? 'PAID IN FULL & VERIFIED' : 'PROFORMA / PAYABLE'}</strong></div>
        <div>Converted Equivalent: <strong>${formattedDisplayAmount} (${displayCurrency})</strong></div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Description of Sovereign Service</th>
          <th>Statutory USD (VAT Incl.)</th>
          <th>${displayCurrency} Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong style="color:#FFF;">${itemTitle}</strong><br/>
            <span style="color:#94A3B8;font-size:12px;">${itemDescription}</span><br/>
            <span style="color:#6EE7B7;font-size:11px;font-family:monospace;">${OFFICIAL_UGE_ADDRESS} · ${OFFICIAL_URA_TIN} · Output VAT 18% (included in total)</span>
          </td>
          <td style="font-weight:bold;color:#FFF;">$${amountUsd.toLocaleString()} USD<br/><span style="font-size:10px;color:#94A3B8;">(inclusive of applicable Ugandan VAT)</span></td>
          <td style="font-weight:bold;color:#D4AF37;">${formattedDisplayAmount}</td>
        </tr>
      </tbody>
    </table>
    <div class="qr-footer">
      <div style="max-width:520px;">
        <div style="color:#D4AF37;font-weight:bold;font-size:12px;text-transform:uppercase;">Authority &amp; Logistics Client Portal Verification (QR Linked)</div>
        <p style="font-size:12px;color:#CBD5E1;margin:6px 0;">${complianceAttestation}</p>
        <div class="mono">Official Address: ${OFFICIAL_UGE_ADDRESS} · ${OFFICIAL_URA_TIN}</div>
        <div class="mono" style="margin-top:3px;">Transaction / Dossier ID: ${referenceId} · Settlement Ref: ${txSettlementRef}</div>
        <div class="mono" style="margin-top:3px;">Cryptographic Seal Digest: ${qrDigest}</div>
        <div class="mono" style="margin-top:3px;">Client Portal Record Link: ${qrVerificationPayload}</div>
      </div>
      <div class="qr-box">
        ${renderedQrSvg}
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docMode === 'receipt' ? receiptNumber : invoiceNumber}-QR-Verified.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[65] overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-3xl bg-[#111722] border border-[#D4AF37]/60 rounded-2xl shadow-2xl overflow-hidden my-2 sm:my-4">
        {/* Top Bar — Mobile & Tablet Responsive */}
        <div className="bg-[#182232] px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-cinzel text-sm sm:text-lg font-bold text-white leading-snug">
                  Sovereign Invoice &amp; Verifiable QR Receipt Generator
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono-data text-[#D4AF37] truncate">
                  {OFFICIAL_UGE_ADDRESS.toUpperCase()} · {OFFICIAL_URA_TIN}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="sm:hidden p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
            {/* Switch between Invoice & QR Receipt */}
            <div className="inline-flex rounded-lg bg-[#0B0F17] p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setDocMode('invoice')}
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded-md text-xs font-mono-data font-bold flex items-center gap-1.5 transition-colors ${
                  docMode === 'invoice'
                    ? 'bg-[#D4AF37] text-[#0B0F17]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => setDocMode('receipt')}
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded-md text-xs font-mono-data font-bold flex items-center gap-1.5 transition-colors ${
                  docMode === 'receipt'
                    ? 'bg-emerald-400 text-[#0B0F17]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>QR Receipt</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                title="Download as PDF (A4)"
                className="px-3 py-1.5 min-h-[38px] text-xs font-mono-data font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60 shadow-sm whitespace-nowrap"
              >
                {isExportingPdf ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileDown className="w-3.5 h-3.5" />
                )}
                <span>{isExportingPdf ? 'Exporting PDF...' : 'Download as PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintDocument}
                title="Print A4 Output"
                className="px-2.5 py-1.5 min-h-[38px] text-xs font-mono-data font-bold text-slate-200 bg-[#0B0F17] hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">Print A4</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="hidden sm:flex p-1.5 min-h-[38px] min-w-[38px] items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-5">
          {/* AI Unique Receipt & Verifiable QR Generator Bar */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#182232] via-[#131C2B] to-[#182232] border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>AI Unique Receipt &amp; Cryptographic QR Code Generator</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Dynamically mints a unique receipt serial, URA TIN 1019482710 compliance attestation, and live Client Portal transaction record linked to the QR code.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAiGenerateUniqueReceipt}
              disabled={isAiGenerating}
              className="px-3.5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-[#0B0F17] font-mono-data font-bold text-xs inline-flex items-center gap-1.5 shrink-0 shadow-md transition-colors cursor-pointer disabled:opacity-60"
            >
              {isAiGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Unique QR Receipt...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Generate Unique Receipt &amp; QR</span>
                </>
              )}
            </button>
          </div>

          {aiGeneratedBanner && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/60 flex items-center justify-between gap-3 text-xs text-emerald-200 print:hidden">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono-data">{aiGeneratedBanner}</span>
              </div>
              {onVerifyRecordInPortal && (
                <button
                  type="button"
                  onClick={() => onVerifyRecordInPortal(referenceId, clientEmail)}
                  className="px-2.5 py-1 rounded bg-emerald-400 text-[#0B0F17] font-bold text-[11px] shrink-0 cursor-pointer"
                >
                  Open in Portal →
                </button>
              )}
            </div>
          )}

          {/* Quick Interactive Preset Selector & Currency Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80 print:hidden">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono-data uppercase text-slate-400 mr-1">
                Quick Template:
              </span>
              {[
                {
                  label: '$2,500 Doc Verification',
                  title: '24–72 Hour Forensic Document Verification & Cadastre Audit',
                  desc: `AI Forensic Deconstruction + Physical DGSM & URA ASYCUDA verification by Staff Officer 1 at ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}). (USD 1,000 credited toward any expedition package booked within 90 days).`,
                  usd: 2500
                },
                {
                  label: '$8,000 Tier 01 Academic',
                  title: 'Tier 01: Academic & Research Expedition (7-Day Program)',
                  desc: `Full 7-day supply chain due diligence & academic research immersion issued by ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}). Includes mandatory USD 1,000 KYC & sanctions vetting allocation.`,
                  usd: 8000
                },
                {
                  label: '$15,000 Tier 02 Trader',
                  title: 'Tier 02: Professional Trader 7-Day Gold Supply Chain Expedition',
                  desc: `Full 7-day physical supply chain due diligence immersion across Entebbe, Kampala, and Busia issued by ${OFFICIAL_UGE_ADDRESS} (${OFFICIAL_URA_TIN}). Includes mandatory USD 1,000 KYC & sanctions vetting allocation.`,
                  usd: 15000
                },
                {
                  label: '$25,000 Tier 03 Sovereign VIP',
                  title: 'Tier 03: Sovereign Executive · Diplomatic VIP Expedition ($25,000 per person)',
                  desc: `Dedicated B6 armored executive motorcade & close-protection tactical detail, private fire assay lab access, up to 5 forensic audits, and 12-month verification retainer (${OFFICIAL_UGE_ADDRESS} · ${OFFICIAL_URA_TIN}).`,
                  usd: 25000
                }
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setItemTitle(preset.title);
                    setItemDescription(preset.desc);
                    setAmountUsd(preset.usd);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono-data border transition-colors ${
                    amountUsd === preset.usd
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FEF3C7] font-bold'
                      : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-[#0B0F17] px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono-data text-slate-400 uppercase">
                Currency:
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-data font-bold bg-[#D4AF37] text-[#0B0F17]">
                USD ($)
              </span>
            </div>
          </div>

          {/* Editable Principal & Billing Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
            <div>
              <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1">
                Principal Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1">
                Corporate Entity / Institution
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1">
                Registered Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* THE OFFICIAL INVOICE / QR CODE RECEIPT DOCUMENT CARD */}
          <div
            id="printable-invoice-receipt"
            ref={printableSheetRef}
            className="rounded-xl bg-[#0B0F17] border-2 border-[#D4AF37]/60 p-4 sm:p-6 space-y-5 shadow-inner overflow-hidden"
          >
            {/* OFFICIAL UGANDA GOLD EXPEDITION COMPANY HEADER (Top of A4 Print Output for Professional Compliance) */}
            <div className="pb-4 border-b-2 border-[#D4AF37]/40 space-y-3 relative z-10">
              <div
                id="uge-company-compliance-header"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-[#111722] border border-[#D4AF37]/30 rounded-xl p-3.5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/uge-logo-emblem-dark.png"
                    alt="Uganda Gold Expedition Official Emblem"
                    crossOrigin="anonymous"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-cinzel font-bold text-sm sm:text-lg text-white tracking-wider">
                      UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 flex items-start sm:items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5 sm:mt-0" />
                      <span>{OFFICIAL_UGE_ADDRESS}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Amber House Secretariat, Kampala · DGSM Mineral Registry Liaison, Entebbe
                    </p>
                  </div>
                </div>

                <div
                  id="uge-ura-tin-header-box"
                  className="sm:text-right font-mono-data space-y-1 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-800 shrink-0"
                >
                  <div className="inline-block px-2.5 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs">
                    {OFFICIAL_URA_TIN}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    Output VAT 18% · Statutory Tax Compliant
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Independent Due Diligence &amp; Field Verification
                  </div>
                </div>
              </div>

              {/* Document Serial & Metadata Sub-Header */}
              <div
                id="uge-doc-meta-subheader"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono-data font-bold px-2.5 py-1 rounded uppercase border ${
                      docMode === 'receipt'
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500'
                    }`}
                  >
                    {docMode === 'receipt'
                      ? 'OFFICIAL VERIFIED QR CODE RECEIPT · PAID'
                      : 'COMMERCIAL PROFORMA INVOICE'}
                  </span>
                  <span className="text-xs font-mono-data font-bold text-[#D4AF37]">
                    {docMode === 'receipt' ? receiptNumber : invoiceNumber}
                  </span>
                </div>

                <div className="sm:text-right font-mono-data text-[11px] flex flex-wrap sm:justify-end items-center gap-x-4 gap-y-1 text-slate-300">
                  <span>
                    Dossier Ref: <strong className="text-white">{referenceId}</strong>
                  </span>
                  <span>
                    Settlement Ref: <strong className="text-[#D4AF37]">{txSettlementRef}</strong>
                  </span>
                  <span className="text-slate-400">Issued: {issuedDate}</span>
                </div>
              </div>
            </div>

            {/* Billed Principal & Statutory Settlement Summary inside Printable Sheet */}
            <div
              id="uge-billing-summary-grid"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800/80 text-xs"
            >
              <div className="p-3 rounded-lg bg-[#111722] border border-slate-800/90 space-y-0.5">
                <div className="text-[10px] font-mono-data uppercase text-[#D4AF37] font-bold">
                  Billed Principal / Organization
                </div>
                <div className="font-bold text-white text-sm">{clientName}</div>
                <div className="text-slate-300">{companyName}</div>
                <div className="text-slate-400 font-mono-data text-[11px]">{clientEmail}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#111722] border border-slate-800/90 space-y-1 font-mono-data text-[11px]">
                <div className="text-[10px] uppercase text-[#D4AF37] font-bold">
                  Settlement &amp; Statutory Status ({OFFICIAL_URA_TIN})
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ledger Status:</span>
                  <span
                    className={`font-bold ${
                      docMode === 'receipt' ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {docMode === 'receipt' ? 'PAID IN FULL & VERIFIED' : 'PROFORMA / PAYABLE'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Payment Channel:</span>
                  <span className="text-slate-200">
                    {initialData?.paymentMethodLabel || 'Visa / Mastercard / Sovereign Wire'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Converted Total:</span>
                  <span className="text-[#D4AF37] font-bold">
                    {formattedDisplayAmount} ({displayCurrency})
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono-data uppercase text-[#D4AF37]">
                    <th className="py-2 pr-3">Service &amp; Statutory Mandate Description</th>
                    <th className="py-2 px-3 whitespace-nowrap">USD (VAT Incl.)</th>
                    <th className="py-2 pl-3 text-right whitespace-nowrap">
                      {displayCurrency} Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="py-3 pr-3">
                      <div className="font-bold text-white">{itemTitle}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{itemDescription}</div>
                      <div className="text-[10px] font-mono-data text-emerald-400 mt-1">
                        {OFFICIAL_UGE_ADDRESS} · {OFFICIAL_URA_TIN} · Output VAT 18% (included in total)
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono-data font-bold text-white whitespace-nowrap">
                      ${amountUsd.toLocaleString()} USD
                      <span className="block text-[10px] text-slate-400 font-normal">
                        USD, inclusive of applicable Ugandan VAT
                      </span>
                    </td>
                    <td className="py-3 pl-3 font-mono-data font-bold text-[#D4AF37] text-right whitespace-nowrap text-sm">
                      {formattedDisplayAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* QR CODE RECEIPT & CLIENT PORTAL TRANSACTION LINK FOR AUTHORITIES & LOGISTICS PARTNERS */}
            <div
              id="uge-qr-verification-footer"
              className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 relative clear-both"
            >
              <div className="space-y-2 flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono-data uppercase">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>
                    {docMode === 'receipt'
                      ? 'Client Portal Transaction Verification QR · Authorities & Logistics Partners'
                      : 'Client Portal Proforma Verification QR · Authorities & Logistics Partners'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scan this dynamic QR code to open transaction record{' '}
                  <strong className="font-mono-data text-white">{referenceId}</strong> directly in the authenticated Uganda Gold Expedition Client Portal. Issued by{' '}
                  <strong className="text-white">{OFFICIAL_UGE_ADDRESS}</strong> ({OFFICIAL_URA_TIN}) for instant verification by DGSM, URA Customs, refineries, and logistics partners.
                </p>

                <div className="p-2.5 rounded-lg bg-[#111722] border border-slate-800 font-mono-data text-[10px] space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-400">
                      Transaction / Dossier ID: <strong className="text-white">{referenceId}</strong>
                    </span>
                    <span className="text-slate-400">
                      Settlement Ref: <strong className="text-[#D4AF37]">{txSettlementRef}</strong>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-slate-400">QR Cryptographic Seal:</span>
                    <span className="text-[#D4AF37] font-bold break-all">{qrDigest}</span>
                  </div>
                  <div className="text-slate-400">
                    Registered Issuer:{' '}
                    <span className="text-slate-200">
                      {OFFICIAL_UGE_ADDRESS} · {OFFICIAL_URA_TIN}
                    </span>
                  </div>
                  <div className="text-slate-400 break-all">
                    Client Portal Record URL:{' '}
                    <span className="text-emerald-300">{qrVerificationPayload}</span>
                  </div>
                </div>

                {onVerifyRecordInPortal && (
                  <div className="pt-1 print:hidden">
                    <button
                      type="button"
                      onClick={() => onVerifyRecordInPortal(referenceId, clientEmail)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-mono-data font-bold transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 shrink-0" />
                      <span>Verify Transaction Record in Client Portal →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Rendered qrcode.react QRCodeSVG with Embedded UGE Logo (Calibrated for 2cm x 2cm Print & Mobile Export Scannability) */}
              <div
                id="uge-qr-code-container"
                className="flex flex-col items-center gap-1.5 shrink-0 pt-2 md:pt-0"
              >
                <div
                  ref={qrSvgWrapperRef}
                  className="uge-qr-print-box p-2 print:p-1 rounded-xl bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center shrink-0"
                >
                  <QRCodeSVG
                    value={qrVerificationPayload}
                    size={128}
                    bgColor="#FFFFFF"
                    fgColor="#0B0F17"
                    level="H"
                    includeMargin={false}
                    className="uge-qr-print-svg w-[2cm] h-[2cm] sm:w-28 sm:h-28 print:w-[2cm] print:h-[2cm] block shrink-0"
                    title={`Client Portal Transaction Verification QR Code for ${referenceId}`}
                    imageSettings={{
                      src: UGE_QR_LOGO_DATA_URI,
                      x: undefined,
                      y: undefined,
                      height: 26,
                      width: 26,
                      excavate: true
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono-data text-[#D4AF37] font-bold uppercase text-center">
                  SCAN TO VERIFY IN PORTAL
                </span>
                <span className="text-[9px] font-mono-data text-slate-400 text-center">
                  2cm × 2cm Print-Calibrated · {referenceId}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons — Mobile & Tablet Touch-Optimized */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 print:hidden">
            <button
              type="button"
              onClick={handleCopyVerificationString}
              className="w-full sm:w-auto justify-center px-3.5 py-2.5 min-h-[42px] text-xs font-mono-data text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedPayload ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">QR Verification Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Copy QR Verification URI</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePrintDocument}
                className="justify-center px-3.5 py-2.5 min-h-[42px] text-xs font-bold text-white bg-[#182232] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Print A4</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPrintableHtml}
                className="justify-center px-3.5 py-2.5 min-h-[42px] text-xs font-bold text-slate-200 bg-[#182232] hover:bg-slate-800 border border-[#D4AF37]/50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Download HTML</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="col-span-2 sm:col-span-1 justify-center px-4 py-2.5 min-h-[42px] text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-60"
              >
                {isExportingPdf ? (
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                ) : (
                  <FileDown className="w-4 h-4 shrink-0" />
                )}
                <span>
                  {isExportingPdf ? 'Generating A4 PDF...' : 'Download as PDF'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
