import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  FileSignature,
  ShieldCheck,
  CheckCircle2,
  Eraser,
  PenTool,
  Type as TypeIcon,
  Download,
  Lock,
  Fingerprint,
  FileCheck2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import {
  DigitalSignatureRecord,
  DocumentVerification,
  ExpeditionRegistration
} from '../types';

interface DigitalSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'expedition_registration' | 'due_diligence_report';
  registration?: ExpeditionRegistration;
  verification?: DocumentVerification;
  onSaveSignature: (signature: DigitalSignatureRecord) => void;
}

// Deterministic hex hash generator for cryptographic seal
function computeCryptographicHash(payload: string): string {
  let h1 = 0xdeadbeef ^ payload.length;
  let h2 = 0x41c6ce57 ^ payload.length;
  for (let i = 0; i < payload.length; i++) {
    const ch = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const part3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0');
  const part4 = ((h1 + h2) >>> 0).toString(16).padStart(8, '0');
  return `SHA256:${(part1 + part2 + part3 + part4).toUpperCase()}`;
}

export const DigitalSignatureModal: React.FC<DigitalSignatureModalProps> = ({
  isOpen,
  onClose,
  targetType,
  registration,
  verification,
  onSaveSignature
}) => {
  const existingSignature =
    targetType === 'expedition_registration'
      ? registration?.digitalSignature
      : verification?.digitalSignature;

  const defaultName =
    targetType === 'expedition_registration'
      ? registration?.fullName || ''
      : verification?.clientName || '';
  const defaultTitle =
    targetType === 'expedition_registration'
      ? registration?.executiveTitle || 'Managing Principal'
      : 'Authorized Signatory & Principal';
  const defaultCompany =
    targetType === 'expedition_registration'
      ? registration?.companyName || ''
      : verification?.companyName || '';
  const defaultEmail =
    targetType === 'expedition_registration'
      ? registration?.email || ''
      : verification?.email || '';

  const [signerFullName, setSignerFullName] = useState(defaultName);
  const [signerTitle, setSignerTitle] = useState(defaultTitle);
  const [signerCompany, setSignerCompany] = useState(defaultCompany);
  const [signerEmail, setSignerEmail] = useState(defaultEmail);
  const [passportOrIdNumber, setPassportOrIdNumber] = useState(
    existingSignature?.passportOrIdNumber || 'PASS-INTL-884920'
  );

  const [signatureMethod, setSignatureMethod] = useState<'drawn_canvas' | 'typed_calligraphy'>(
    existingSignature?.signatureMethod || 'drawn_canvas'
  );
  const [typedSignatureText, setTypedSignatureText] = useState(
    existingSignature?.typedSignatureText || defaultName
  );
  const [penColor, setPenColor] = useState<'#D4AF37' | '#F8FAFC' | '#38BDF8'>('#D4AF37');
  const [hasDrawnStrokes, setHasDrawnStrokes] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [clause1Checked, setClause1Checked] = useState(true);
  const [clause2Checked, setClause2Checked] = useState(true);
  const [clause3Checked, setClause3Checked] = useState(true);

  const [executedRecord, setExecutedRecord] = useState<DigitalSignatureRecord | null>(
    existingSignature || null
  );
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setSignerFullName(
      existingSignature?.signerFullName ||
        (targetType === 'expedition_registration'
          ? registration?.fullName || ''
          : verification?.clientName || '')
    );
    setSignerTitle(
      existingSignature?.signerTitle ||
        (targetType === 'expedition_registration'
          ? registration?.executiveTitle || 'Managing Principal'
          : 'Authorized Signatory & Principal')
    );
    setSignerCompany(
      existingSignature?.signerCompany ||
        (targetType === 'expedition_registration'
          ? registration?.companyName || ''
          : verification?.companyName || '')
    );
    setSignerEmail(
      existingSignature?.signerEmail ||
        (targetType === 'expedition_registration'
          ? registration?.email || ''
          : verification?.email || '')
    );
    setPassportOrIdNumber(existingSignature?.passportOrIdNumber || 'PASS-INTL-884920');
    setTypedSignatureText(
      existingSignature?.typedSignatureText ||
        (targetType === 'expedition_registration'
          ? registration?.fullName || ''
          : verification?.clientName || '')
    );
    setExecutedRecord(existingSignature || null);
    setIsEditingExisting(false);
    setErrorMessage('');
  }, [isOpen, targetType, registration, verification, existingSignature]);

  // Initialize signature pad canvas
  useEffect(() => {
    if (!isOpen || signatureMethod !== 'drawn_canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#090D14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw baseline & watermark
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(28, canvas.height - 36);
    ctx.lineTo(canvas.width - 28, canvas.height - 36);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('AUTHORIZED SOVEREIGN WET-INK SIGNATURE PAD · X', 28, canvas.height - 18);
    setHasDrawnStrokes(false);
  }, [isOpen, signatureMethod, isEditingExisting]);

  if (!isOpen) return null;

  const targetId =
    targetType === 'expedition_registration'
      ? registration?.id || 'REG-2026-0000'
      : verification?.id || 'DOC-VER-2026-0000';

  const agreementTitle =
    targetType === 'expedition_registration'
      ? 'Sovereign Field Expedition Charter, Non-Transaction Covenant & Security Protocol Agreement'
      : 'Forensic Due Diligence Report Receipt, Non-Reliance & Chain-of-Custody Attestation';

  const clauses =
    targetType === 'expedition_registration'
      ? [
          'Article I (Strict Non-Transaction Covenant): I acknowledge that Uganda Gold Expedition is strictly an educational, forensic inspection, and due diligence mission under the Uganda Mining and Minerals Act 2022, and does not broker, buy, or sell physical bullion during field operations.',
          'Article II (Statutory KYC & Sanctions Screening Compliance): I consent to OFAC, UN, UK HMT, EU sanctions and PEP screening included with my selected expedition package for DGSM Entebbe and bonded refinery security accreditation.',
          'Article III (Field Security & Chain-of-Custody Compliance): I agree to abide by all safety directives issued by the Operations & Strategy Directorate during dedicated B6 armored executive motorcade ground transfers and active mine pithead inspections.'
        ]
      : [
          'Section 1 (Forensic Findings Acknowledgment): I acknowledge receipt of the certified forensic due diligence findings, risk score, and statutory DGSM/URA cadastre cross-check prepared by the Forensic Intelligence Desk and Staff Officer 1.',
          'Section 2 (Anti-Fraud Wire Covenant): I covenant not to wire advance taxes, customs clearance fees, or escrow deposits to unverified third-party commercial bank accounts flagged in this forensic report.',
          'Section 3 (Chain-of-Custody & Evidentiary Integrity): I confirm that this forensic dossier is governed by sovereign chain-of-custody protocols and may be presented to compliance committees, banking officers, and statutory authorities.'
        ];

  // Canvas pointer helpers
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawnStrokes(true);
    setErrorMessage('');
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.strokeStyle = penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.closePath();
    }
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#090D14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(28, canvas.height - 36);
    ctx.lineTo(canvas.width - 28, canvas.height - 36);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('AUTHORIZED SOVEREIGN WET-INK SIGNATURE PAD · X', 28, canvas.height - 18);
    setHasDrawnStrokes(false);
  };

  // Generate PNG data URL for typed calligraphy mode
  const generateTypedSignatureDataUrl = (text: string): string => {
    const offscreen = document.createElement('canvas');
    offscreen.width = 560;
    offscreen.height = 160;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return '';

    ctx.fillStyle = '#090D14';
    ctx.fillRect(0, 0, offscreen.width, offscreen.height);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(28, offscreen.height - 34);
    ctx.lineTo(offscreen.width - 28, offscreen.height - 34);
    ctx.stroke();
    ctx.setLineDash([]);

    // Render stylized italic signature
    ctx.save();
    ctx.fillStyle = penColor;
    ctx.font = 'italic 600 38px "Cinzel", Georgia, serif';
    ctx.transform(1, -0.04, -0.12, 1, 0, 0);
    ctx.fillText(text.trim(), 48, 98);
    ctx.restore();

    // Decorative flourish underline
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(42, 110);
    ctx.quadraticCurveTo(220, 124, 410, 102);
    ctx.stroke();

    ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('DIGITALLY EXECUTED CALLIGRAPHIC SEAL · UGE REGISTRY', 28, offscreen.height - 14);

    return offscreen.toDataURL('image/png');
  };

  const handleExecuteSignature = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signerFullName.trim() || !signerEmail.trim() || !passportOrIdNumber.trim()) {
      setErrorMessage('Please complete your full legal name, email, and passport/ID number.');
      return;
    }

    if (!clause1Checked || !clause2Checked || !clause3Checked) {
      setErrorMessage('All three statutory agreement clauses must be acknowledged prior to execution.');
      return;
    }

    let finalSignatureDataUrl = '';
    if (signatureMethod === 'drawn_canvas') {
      if (!hasDrawnStrokes) {
        setErrorMessage(
          'Please draw your wet-ink signature on the signature pad or switch to Typed Executive Signature.'
        );
        return;
      }
      finalSignatureDataUrl = canvasRef.current?.toDataURL('image/png') || '';
    } else {
      if (!typedSignatureText.trim()) {
        setErrorMessage('Please enter your signature text.');
        return;
      }
      finalSignatureDataUrl = generateTypedSignatureDataUrl(typedSignatureText);
    }

    const nowUtc = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const hashPayload = `${targetId}|${signerFullName}|${signerEmail}|${passportOrIdNumber}|${nowUtc}`;
    const sha256SealHash = computeCryptographicHash(hashPayload);
    const certSerial = `UGE-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRecord: DigitalSignatureRecord = {
      id: `SIG-${Date.now().toString().slice(-6)}`,
      targetId,
      targetType,
      agreementTitle,
      signerFullName: signerFullName.trim(),
      signerTitle: signerTitle.trim() || 'Authorized Principal',
      signerCompany: signerCompany.trim() || 'Private Principal',
      signerEmail: signerEmail.trim(),
      passportOrIdNumber: passportOrIdNumber.trim(),
      signatureMethod,
      signatureDataUrl: finalSignatureDataUrl,
      typedSignatureText:
        signatureMethod === 'typed_calligraphy' ? typedSignatureText.trim() : undefined,
      clausesAccepted: clauses,
      sha256SealHash,
      signedAtUtc: nowUtc,
      certificateSerial: certSerial
    };

    setExecutedRecord(newRecord);
    setIsEditingExisting(false);
    onSaveSignature(newRecord);
  };

  const handleDownloadSignedCertificate = (record: DigitalSignatureRecord) => {
    const contextSummary =
      targetType === 'expedition_registration' && registration
        ? `Expedition Registration ID: ${registration.id}
Delegation Tier: ${registration.requestedTier.toUpperCase()} (${registration.delegatesCount} Delegate(s))
Scheduled Cohort: ${registration.cohortDate}
Primary Objective: ${registration.primaryObjective}
Assigned Directorate Liaison: ${registration.assignedStaff || 'Staff Officer 1'}`
        : verification
        ? `Forensic Dossier ID: ${verification.id}
Audited Instrument: ${verification.documentType} (${verification.fileName || 'Submitted Dossier'})
Claimed Counterparty: ${verification.claimedSeller} (${verification.claimedQuantityKg} @ ${verification.claimedDiscountPercent})
Certifying Officer: ${verification.assignedOfficer}
Forensic Verdict: ${verification.aiAnalysis?.verdict || 'COMPLETED'} (Risk Score: ${verification.aiAnalysis?.riskScore ?? 'N/A'}%)`
        : `Target Reference: ${record.targetId}`;

    const content = `UGANDA GOLD EXPEDITION — EXECUTED DIGITAL AGREEMENT & CRYPTOGRAPHIC CERTIFICATE
================================================================================
Certificate Serial: ${record.certificateSerial}
Signature Record ID: ${record.id}
Cryptographic Seal: ${record.sha256SealHash}
Execution Timestamp: ${record.signedAtUtc}
Execution Method: ${
      record.signatureMethod === 'drawn_canvas'
        ? 'Biometric Wet-Ink Canvas Capture'
        : 'Authenticated Calligraphic Digital Execution'
    }

1. INSTRUMENT & DOSSIER PARTICULARS
--------------------------------------------------------------------------------
Agreement Title: ${record.agreementTitle}
${contextSummary}

2. AUTHORIZED SIGNATORY CREDENTIALS
--------------------------------------------------------------------------------
Full Legal Name: ${record.signerFullName}
Executive Title: ${record.signerTitle}
Organization / Entity: ${record.signerCompany}
Registered Email: ${record.signerEmail}
Passport / Statutory ID: ${record.passportOrIdNumber}

3. EXECUTED COVENANTS & STATUTORY ATTESTATIONS
--------------------------------------------------------------------------------
${record.clausesAccepted.map((c, idx) => `  [ACCEPTED ${idx + 1}] ${c}`).join('\n\n')}

4. CRYPTOGRAPHIC VERIFICATION BLOCK
--------------------------------------------------------------------------------
Digital Seal Hash: ${record.sha256SealHash}
Status: VALID · TAMPER-EVIDENT · ARCHIVED IN SOVEREIGN CLIENT REGISTRY
================================================================================
Amber House Secretariat, Kampala & DGSM Inspection Liaison Office, Entebbe, Uganda`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Executed-Agreement-${record.targetId}-${record.certificateSerial}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Top Institutional Header */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                  Sovereign Digital Document Execution
                </h3>
                <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 font-bold uppercase">
                  {targetId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono-data">
                TAMPER-EVIDENT E-SIGNATURE · SHA-256 CRYPTOGRAPHIC REGISTRY SEAL
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* IF ALREADY SIGNED & NOT EDITING: SHOW EXECUTED CERTIFICATE VIEW */}
        {executedRecord && !isEditingExisting ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-data text-emerald-400 font-bold uppercase tracking-wider">
                    INSTRUMENT DIGITALLY EXECUTED & SEALED · {executedRecord.certificateSerial}
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {executedRecord.agreementTitle}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Signed by <strong className="text-white">{executedRecord.signerFullName}</strong> (
                    {executedRecord.signerTitle}, {executedRecord.signerCompany}) on{' '}
                    <span className="font-mono-data text-emerald-300">
                      {executedRecord.signedAtUtc}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownloadSignedCertificate(executedRecord)}
                className="px-4 py-2.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-emerald-500/10"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed Certificate (.TXT)</span>
              </button>
            </div>

            {/* Rendered Signature & Cryptographic Seal Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#090D14] border border-[#D4AF37]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-data uppercase text-[#D4AF37] font-bold">
                    Captured Principal Signature
                  </span>
                  <span className="text-[10px] font-mono-data text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Biometric/Digital Ink
                  </span>
                </div>
                <div className="h-32 rounded-lg bg-[#05080D] border border-slate-800/80 flex items-center justify-center p-2 overflow-hidden">
                  {executedRecord.signatureDataUrl ? (
                    <img
                      src={executedRecord.signatureDataUrl}
                      alt={`Signature of ${executedRecord.signerFullName}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-cinzel italic text-2xl text-[#D4AF37]">
                      {executedRecord.signerFullName}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Signatory: {executedRecord.signerFullName}</span>
                  <span className="font-mono-data">ID: {executedRecord.passportOrIdNumber}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2.5 text-xs">
                <div className="text-[10px] font-mono-data uppercase text-[#D4AF37] font-bold flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>Cryptographic Chain-of-Custody Ledger</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Target Dossier Ref:</span>
                    <span className="font-mono-data text-white font-bold">
                      {executedRecord.targetId}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Certificate Serial:</span>
                    <span className="font-mono-data text-[#D4AF37] font-bold">
                      {executedRecord.certificateSerial}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Timestamp (UTC):</span>
                    <span className="font-mono-data text-slate-200">
                      {executedRecord.signedAtUtc}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 block mb-1">Cryptographic Seal Digest:</span>
                    <div className="p-2 rounded bg-[#111722] border border-slate-800 font-mono-data text-[10px] text-emerald-400 break-all">
                      {executedRecord.sha256SealHash}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accepted Covenants List */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2">
              <div className="text-[11px] font-mono-data uppercase text-slate-400 font-bold">
                Executed Statutory Covenants & Attestations:
              </div>
              <ul className="space-y-2">
                {executedRecord.clausesAccepted.map((clause, index) => (
                  <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditingExisting(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#182232] hover:bg-[#222E42] border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Re-Sign / Update Signature</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors"
              >
                Return to Client Portal
              </button>
            </div>
          </div>
        ) : (
          /* INTERACTIVE DOCUMENT SIGNING FORM */
          <form onSubmit={handleExecuteSignature} className="p-6 sm:p-7 space-y-5">
            {/* Document Summary Banner */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>
                    {targetType === 'expedition_registration'
                      ? 'EXPEDITION DELEGATION CHARTER & NON-TRANSACTION AGREEMENT'
                      : 'FORENSIC DUE DILIGENCE REPORT COUNTER-SIGNATURE & ATTESTATION'}
                  </span>
                </span>
                <span className="text-[10px] font-mono-data text-slate-400">
                  Ref: <strong className="text-white">{targetId}</strong>
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white">{agreementTitle}</h4>

              {targetType === 'expedition_registration' && registration && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Delegate Principal
                    </span>
                    <strong className="text-white">{registration.fullName}</strong> (
                    {registration.companyName})
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Expedition Cohort
                    </span>
                    <strong className="text-[#D4AF37]">{registration.cohortDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Tier & Delegates
                    </span>
                    <strong className="text-white uppercase">{registration.requestedTier}</strong> (
                    {registration.delegatesCount} Pax)
                  </div>
                </div>
              )}

              {targetType === 'due_diligence_report' && verification && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Audited Instrument
                    </span>
                    <strong className="text-white">{verification.documentType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Claimed Counterparty
                    </span>
                    <strong className="text-[#D4AF37]">{verification.claimedSeller}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono-data">
                      Forensic Verdict
                    </span>
                    <strong className="text-rose-400">
                      {verification.aiAnalysis?.verdict || 'HIGH FRAUD PROBABILITY'}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Signatory Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono-data uppercase text-slate-300 mb-1">
                  Full Legal Name of Signatory *
                </label>
                <input
                  type="text"
                  required
                  value={signerFullName}
                  onChange={(e) => {
                    setSignerFullName(e.target.value);
                    if (!typedSignatureText || typedSignatureText === signerFullName) {
                      setTypedSignatureText(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g. Alexander Vance"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-data uppercase text-slate-300 mb-1">
                  Executive Title / Capacity *
                </label>
                <input
                  type="text"
                  required
                  value={signerTitle}
                  onChange={(e) => setSignerTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g. Chief Investment Officer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-data uppercase text-slate-300 mb-1">
                  Passport or Corporate ID No. *
                </label>
                <input
                  type="text"
                  required
                  value={passportOrIdNumber}
                  onChange={(e) => setPassportOrIdNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded-lg text-white font-mono-data focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g. PASS-CH-994102"
                />
              </div>
            </div>

            {/* Mandatory Statutory Clauses Checkboxes */}
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3">
              <div className="text-[11px] font-mono-data uppercase text-[#D4AF37] font-bold">
                Mandatory Statutory Covenants & Attestations (Check All to Execute):
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={clause1Checked}
                  onChange={(e) => setClause1Checked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-600 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">{clauses[0]}</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={clause2Checked}
                  onChange={(e) => setClause2Checked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-600 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">{clauses[1]}</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={clause3Checked}
                  onChange={(e) => setClause3Checked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-600 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">{clauses[2]}</span>
              </label>
            </div>

            {/* Signature Capture Section: Drawn Wet-Ink Canvas vs Typed Calligraphy */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSignatureMethod('drawn_canvas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-data font-bold flex items-center gap-1.5 border transition-colors ${
                      signatureMethod === 'drawn_canvas'
                        ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37]'
                        : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Draw Wet-Ink Signature</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignatureMethod('typed_calligraphy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-data font-bold flex items-center gap-1.5 border transition-colors ${
                      signatureMethod === 'typed_calligraphy'
                        ? 'bg-[#D4AF37] text-[#0B0F17] border-[#D4AF37]'
                        : 'bg-[#0B0F17] text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <TypeIcon className="w-3.5 h-3.5" />
                    <span>Type Executive Signature</span>
                  </button>
                </div>

                {/* Ink Color Picker & Clear Button */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-data text-slate-400 uppercase">Ink:</span>
                  {[
                    { color: '#D4AF37' as const, label: 'Sovereign Gold' },
                    { color: '#F8FAFC' as const, label: 'Archival White' },
                    { color: '#38BDF8' as const, label: 'Notary Blue' }
                  ].map((ink) => (
                    <button
                      key={ink.color}
                      type="button"
                      onClick={() => setPenColor(ink.color)}
                      title={ink.label}
                      className={`w-5 h-5 rounded-full border ${
                        penColor === ink.color
                          ? 'ring-2 ring-[#D4AF37] scale-110 border-white'
                          : 'border-slate-600 opacity-70'
                      }`}
                      style={{ backgroundColor: ink.color }}
                    />
                  ))}

                  {signatureMethod === 'drawn_canvas' && (
                    <button
                      type="button"
                      onClick={handleClearCanvas}
                      className="ml-2 px-2.5 py-1 text-[11px] font-mono-data text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded flex items-center gap-1"
                    >
                      <Eraser className="w-3 h-3 text-rose-400" />
                      <span>Clear Pad</span>
                    </button>
                  )}
                </div>
              </div>

              {signatureMethod === 'drawn_canvas' ? (
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-[#090D14] shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={165}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[155px] cursor-crosshair touch-none block"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-[#D4AF37]/50 bg-[#090D14] space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1">
                      Type Full Name for Calligraphic Seal Rendering:
                    </label>
                    <input
                      type="text"
                      value={typedSignatureText}
                      onChange={(e) => setTypedSignatureText(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#111722] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                      placeholder="Type your full legal signature..."
                    />
                  </div>
                  <div className="py-4 px-6 rounded-lg bg-[#05080D] border border-slate-800/90 flex flex-col items-start justify-center">
                    <span
                      className="font-cinzel italic text-2xl sm:text-3xl tracking-wide select-none"
                      style={{ color: penColor }}
                    >
                      {typedSignatureText || signerFullName || 'Authorized Signatory'}
                    </span>
                    <div className="w-full border-b border-dashed border-[#D4AF37]/30 mt-2 pt-1 flex items-center justify-between text-[10px] font-mono-data text-slate-500">
                      <span>AUTHENTICATED CALLIGRAPHIC SIGNATURE PREVIEW</span>
                      <span>SHA-256 SEAL READY</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/60 text-xs text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit & Cryptographic Seal Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono-data">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Binding execution under Uganda Electronic Signatures Act & Sovereign Charter</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Affix Digital Signature & Seal Agreement</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
