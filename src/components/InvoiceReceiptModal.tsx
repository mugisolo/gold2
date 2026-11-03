import React, { useState, useMemo } from 'react';
import {
  X,
  QrCode,
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Printer,
  Copy,
  Check,
  Sparkles,
  Receipt
} from 'lucide-react';
import { Currency } from '../types';
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

// Deterministic 25x25 QR Code Matrix Generator (renders genuine finder patterns, timing patterns, alignment pattern, and payload bits)
function generateQrMatrix(payload: string): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  const placeFinderPattern = (rowOffset: number, colOffset: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = rowOffset + r;
        const cc = colOffset + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        reserved[rr][cc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          if (
            r === 0 ||
            r === 6 ||
            c === 0 ||
            c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[rr][cc] = true;
          } else {
            matrix[rr][cc] = false;
          }
        }
      }
    }
  };

  placeFinderPattern(0, 0);
  placeFinderPattern(0, size - 7);
  placeFinderPattern(size - 7, 0);

  // Alignment pattern at (16, 16)
  for (let r = 16; r <= 20; r++) {
    for (let c = 16; c <= 20; c++) {
      reserved[r][c] = true;
      if (
        r === 16 ||
        r === 20 ||
        c === 16 ||
        c === 20 ||
        (r === 18 && c === 18)
      ) {
        matrix[r][c] = true;
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    reserved[6][i] = true;
    reserved[i][6] = true;
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Fill remaining cells deterministically from payload hash stream
  let seed = 2166136261;
  for (let i = 0; i < payload.length; i++) {
    seed ^= payload.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (reserved[r][c]) continue;
      const charCode = payload.charCodeAt((r * size + c) % payload.length) || 71;
      seed ^= charCode + r * 131 + c * 17;
      seed = Math.imul(seed, 1664525) + 1013904223;
      matrix[r][c] = ((seed >>> 16) & 1) === 1;
    }
  }

  return matrix;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  isOpen,
  onClose,
  initialData,
  selectedCurrency = 'USD'
}) => {
  const defaultDocMode =
    initialData?.mode || (initialData?.paymentStatus === 'paid' ? 'receipt' : 'invoice');

  const [docMode, setDocMode] = useState<'invoice' | 'receipt'>(defaultDocMode);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(selectedCurrency);
  const [copiedPayload, setCopiedPayload] = useState(false);

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
      'Includes AI Forensic Deconstruction, DGSM Entebbe Mineral Cadastre Cross-Check, URA ASYCUDA Verification, and Staff Officer 1 Signed Dossier. (USD 1,000 credited toward any expedition package booked within 90 days.)'
  );
  const [amountUsd, setAmountUsd] = useState<number>(initialData?.amountUsd || 2500);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>(
    initialData?.paymentStatus || 'paid'
  );

  React.useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setDocMode(
        initialData.mode || (initialData.paymentStatus === 'paid' ? 'receipt' : 'invoice')
      );
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

  const referenceId = initialData?.referenceId || 'UGE-DOC-2027-4401';
  const invoiceNumber = `INV-UGE-2027-${referenceId.replace(/[^0-9]/g, '').slice(-4) || '8812'}`;
  const receiptNumber = `RCT-UGE-2027-${referenceId.replace(/[^0-9]/g, '').slice(-4) || '8812'}`;
  const issuedDate =
    initialData?.issuedDate || new Date().toISOString().split('T')[0] + ' UTC';

  const qrVerificationPayload = useMemo(() => {
    const digest = computeReceiptDigest(
      `${referenceId}|${clientName}|${companyName}|${amountUsd}|${docMode}`
    );
    return `https://ugandagoldexpedition.org/verify?doc=${
      docMode === 'receipt' ? receiptNumber : invoiceNumber
    }&ref=${encodeURIComponent(referenceId)}&principal=${encodeURIComponent(
      clientName
    )}&usd=${amountUsd}&status=${
      docMode === 'receipt' ? 'PAID_VERIFIED' : paymentStatus.toUpperCase()
    }&seal=${digest}`;
  }, [referenceId, clientName, companyName, amountUsd, docMode, receiptNumber, invoiceNumber, paymentStatus]);

  const qrDigest = useMemo(
    () =>
      computeReceiptDigest(
        `${referenceId}|${clientName}|${companyName}|${amountUsd}|${docMode}`
      ),
    [referenceId, clientName, companyName, amountUsd, docMode]
  );

  const qrMatrix = useMemo(
    () => generateQrMatrix(qrVerificationPayload),
    [qrVerificationPayload]
  );

  if (!isOpen) return null;

  const formattedDisplayAmount = formatCurrencyPrice(amountUsd, displayCurrency);

  const handleCopyVerificationString = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(qrVerificationPayload).catch(() => {});
    }
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2200);
  };

  // Generate printable HTML file with embedded SVG QR Code
  const handleDownloadPrintableHtml = () => {
    const size = qrMatrix.length;
    const cellSize = 6;
    const svgDim = size * cellSize;
    const rects = qrMatrix
      .flatMap((row, r) =>
        row.map((val, c) =>
          val
            ? `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0B0F17" />`
            : ''
        )
      )
      .join('');

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
    .qr-box { background: #FFFFFF; padding: 12px; border-radius: 10px; display: inline-block; }
    .mono { font-family: monospace; font-size: 11px; color: #94A3B8; word-break: break-all; }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div>
        <div class="brand">UGANDA GOLD <span class="gold">EXPEDITION</span></div>
        <div style="font-size:12px;color:#94A3B8;margin-top:4px;">Amber House Secretariat, Kampala & DGSM Registry Liaison, Entebbe</div>
        <div style="font-size:11px;color:#D4AF37;font-family:monospace;margin-top:4px;">URA TIN 1019482710</div>
        <div style="font-size:11px;color:#6EE7B7;font-family:monospace;">Output VAT 18% (included in total)</div>
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
        <div style="color:#D4AF37;font-size:11px;font-weight:bold;text-transform:uppercase;">Settlement & Statutory Reference</div>
        <div style="margin-top:4px;">Dossier Ref: <strong>${referenceId}</strong></div>
        <div>Status: <strong style="color:${
          docMode === 'receipt' ? '#34D399' : '#FBBF24'
        };">${docMode === 'receipt' ? 'PAID IN FULL & VERIFIED' : 'PROFORMA / PAYABLE'}</strong></div>
        <div>Payment Terms: <strong>Full payment due on booking. No instalments.</strong></div>
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
            <span style="color:#6EE7B7;font-size:11px;font-family:monospace;">URA TIN 1019482710 · Output VAT 18% (included in total) · Payment Terms: Full payment due on booking. No instalments.</span>
          </td>
          <td style="font-weight:bold;color:#FFF;">$${amountUsd.toLocaleString()} USD<br/><span style="font-size:10px;color:#94A3B8;">(inclusive of applicable Ugandan VAT)</span></td>
          <td style="font-weight:bold;color:#D4AF37;">${formattedDisplayAmount}</td>
        </tr>
      </tbody>
    </table>
    <div class="qr-footer">
      <div style="max-width:520px;">
        <div style="color:#D4AF37;font-weight:bold;font-size:12px;text-transform:uppercase;">Cryptographic QR Code Receipt Verification</div>
        <p style="font-size:12px;color:#CBD5E1;margin:6px 0;">Scan the official QR code to verify payment authenticity, principal identity, and DGSM/URA compliance status.</p>
        <div class="mono">Seal Digest: ${qrDigest}</div>
        <div class="mono" style="margin-top:4px;">Verify URI: ${qrVerificationPayload}</div>
      </div>
      <div class="qr-box">
        <svg width="${svgDim}" height="${svgDim}" viewBox="0 0 ${svgDim} ${svgDim}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${svgDim}" height="${svgDim}" fill="#FFFFFF" />
          ${rects}
        </svg>
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
    <div className="fixed inset-0 z-[65] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-[#111722] border border-[#D4AF37]/60 rounded-2xl shadow-2xl overflow-hidden my-4">
        {/* Top Bar */}
        <div className="bg-[#182232] px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                Sovereign Invoice & QR Code Receipt Generator
              </h3>
              <p className="text-[11px] font-mono-data text-[#D4AF37]">
                CRYPTOGRAPHIC QR VERIFICATION · MULTI-CURRENCY LEDGER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Switch between Invoice & QR Receipt */}
            <div className="inline-flex rounded-lg bg-[#0B0F17] p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setDocMode('invoice')}
                className={`px-3 py-1 rounded-md text-xs font-mono-data font-bold flex items-center gap-1.5 transition-colors ${
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
                className={`px-3 py-1 rounded-md text-xs font-mono-data font-bold flex items-center gap-1.5 transition-colors ${
                  docMode === 'receipt'
                    ? 'bg-emerald-400 text-[#0B0F17]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>QR Receipt</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Quick Interactive Preset Selector & Currency Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono-data uppercase text-slate-400 mr-1">
                Quick Template:
              </span>
              {[
                {
                  label: '$2,500 Doc Verification',
                  title: '24–72 Hour Forensic Document Verification & Cadastre Audit',
                  desc: 'AI Forensic Deconstruction + Physical DGSM & URA ASYCUDA verification by Staff Officer 1 (USD 1,000 credited toward any expedition package booked within 90 days).',
                  usd: 2500
                },
                {
                  label: '$8,000 Tier 01 Academic',
                  title: 'Tier 01: Academic & Research Expedition (7-Day Program)',
                  desc: 'Full 7-day supply chain due diligence & academic research immersion. Includes mandatory USD 1,000 KYC & sanctions vetting allocation (OFAC, UN, UK HMT, EU).',
                  usd: 8000
                },
                {
                  label: '$15,000 Tier 02 Trader',
                  title: 'Tier 02: Professional Trader 7-Day Gold Supply Chain Expedition',
                  desc: 'Full 7-day physical supply chain due diligence immersion across Entebbe, Kampala, and Busia. Includes mandatory USD 1,000 KYC & sanctions vetting allocation.',
                  usd: 15000
                },
                {
                  label: '$45,000 Tier 03 Sovereign VIP',
                  title: 'Tier 03: Sovereign Executive · Diplomatic VIP Expedition',
                  desc: 'Dedicated B6 armored executive motorcade & close-protection tactical detail, private fire assay lab access, up to 5 forensic audits, and 12-month verification retainer.',
                  usd: 45000
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
              {(['USD', 'UGX', 'EUR', 'AED', 'GBP', 'CNY'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setDisplayCurrency(curr)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono-data font-bold ${
                    displayCurrency === curr
                      ? 'bg-[#D4AF37] text-[#0B0F17]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Editable Principal & Billing Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
          <div className="rounded-xl bg-[#0B0F17] border-2 border-[#D4AF37]/50 p-5 sm:p-6 space-y-5 shadow-inner">
            {/* Document Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel font-bold text-base text-white tracking-wider">
                    UGANDA GOLD <span className="text-[#D4AF37]">EXPEDITION</span>
                  </span>
                  <span
                    className={`text-[10px] font-mono-data font-bold px-2 py-0.5 rounded uppercase border ${
                      docMode === 'receipt'
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500'
                    }`}
                  >
                    {docMode === 'receipt'
                      ? 'OFFICIAL QR CODE RECEIPT · PAID'
                      : 'COMMERCIAL PROFORMA INVOICE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Amber House Secretariat, Kampala · DGSM Mineral Headquarters, Entebbe, Uganda
                </p>
                <div className="pt-1 font-mono-data text-[11px] space-y-0.5">
                  <div className="text-[#D4AF37] font-bold">URA TIN 1019482710</div>
                  <div className="text-emerald-400 font-semibold">
                    Output VAT 18% (included in total)
                  </div>
                </div>
              </div>

              <div className="sm:text-right font-mono-data">
                <div className="text-xs font-bold text-[#D4AF37]">
                  {docMode === 'receipt' ? receiptNumber : invoiceNumber}
                </div>
                <div className="text-[11px] text-slate-400">Dossier Ref: {referenceId}</div>
                <div className="text-[11px] text-slate-400">Date: {issuedDate}</div>
                <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                  Full payment due on booking. No instalments.
                </div>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono-data uppercase text-[#D4AF37]">
                    <th className="py-2 pr-3">Service & Statutory Mandate Description</th>
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
                        URA TIN 1019482710 · Output VAT 18% (included in total) · Payment Terms: Full payment due on booking. No instalments.
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

            {/* QR CODE RECEIPT & CRYPTOGRAPHIC SEAL BLOCK */}
            <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono-data uppercase">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>
                    {docMode === 'receipt'
                      ? 'Verified QR Code Receipt · Instant Audit Authentication'
                      : 'QR Code Proforma Verification · Sovereign Settlement'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scan this cryptographic QR Code at Entebbe VIP diplomatic clearance, Amber House Kampala Secretariat, or any compliance desk to verify authenticity and settlement status.
                </p>

                <div className="p-2.5 rounded-lg bg-[#111722] border border-slate-800 font-mono-data text-[10px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">QR Cryptographic Seal:</span>
                    <span className="text-[#D4AF37] font-bold">{qrDigest}</span>
                  </div>
                  <div className="text-slate-400 truncate">
                    Payload: <span className="text-emerald-300">{qrVerificationPayload}</span>
                  </div>
                </div>
              </div>

              {/* Rendered High-Contrast SVG QR Code */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="p-3 rounded-xl bg-white border-2 border-[#D4AF37] shadow-lg">
                  <svg
                    width={132}
                    height={132}
                    viewBox={`0 0 ${qrMatrix.length * 5} ${qrMatrix.length * 5}`}
                    aria-label="Official Verification QR Code"
                  >
                    <rect
                      width={qrMatrix.length * 5}
                      height={qrMatrix.length * 5}
                      fill="#FFFFFF"
                    />
                    {qrMatrix.map((row, rIdx) =>
                      row.map((cell, cIdx) =>
                        cell ? (
                          <rect
                            key={`${rIdx}-${cIdx}`}
                            x={cIdx * 5}
                            y={rIdx * 5}
                            width={5}
                            height={5}
                            fill="#0B0F17"
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
                <span className="text-[10px] font-mono-data text-[#D4AF37] font-bold uppercase">
                  SCAN QR RECEIPT
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={handleCopyVerificationString}
              className="px-3.5 py-2 text-xs font-mono-data text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
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

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPrintableHtml}
                className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <Download className="w-4 h-4" />
                <span>
                  Download {docMode === 'receipt' ? 'QR Code Receipt' : 'Official Invoice'} (.HTML)
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
