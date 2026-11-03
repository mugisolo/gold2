import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ClipboardList, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  X, 
  Lock, 
  FileSearch,
  UserCheck,
  Clock,
  Send
} from 'lucide-react';
import { ExpeditionRegistration, FieldLog, StaffMember, DocumentVerification } from '../types';

interface StaffPortalProps {
  registrations: ExpeditionRegistration[];
  documentVerifications: DocumentVerification[];
  fieldLogs: FieldLog[];
  staff: StaffMember[];
  onUpdateRegistration: (id: string, updates: Partial<ExpeditionRegistration>) => void;
  onUpdateDocumentVerification: (id: string, updates: Partial<DocumentVerification>) => void;
  onAddFieldLog: (log: Omit<FieldLog, 'id' | 'logDate'>) => void;
  onClose: () => void;
  onSwitchToAdmin: () => void;
}

export const StaffPortal: React.FC<StaffPortalProps> = ({
  registrations,
  documentVerifications,
  fieldLogs,
  staff,
  onUpdateRegistration,
  onUpdateDocumentVerification,
  onAddFieldLog,
  onClose,
  onSwitchToAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'doc-verifications' | 'kyc-queue' | 'field-logs' | 'manifest'>('doc-verifications');
  const [activeStaffMember, setActiveStaffMember] = useState<string>(staff[0]?.name || 'Staff Officer 1: Lt. Col. (Rtd) Arthur Mwesigye');
  
  // Field Log Form State
  const [logTitle, setLogTitle] = useState('');
  const [logLocation, setLogLocation] = useState('');
  const [logObservations, setLogObservations] = useState('');
  const [logRisk, setLogRisk] = useState<'Low' | 'Medium' | 'High' | 'Severe'>('Low');
  const [logTestResults, setLogTestResults] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logLocation || !logObservations) return;
    onAddFieldLog({
      staffName: activeStaffMember,
      location: logLocation,
      title: logTitle || 'Field Inspection Update',
      observations: logObservations,
      riskAssessment: logRisk,
      testResults: logTestResults || 'No laboratory sample taken.'
    });
    setLogTitle('');
    setLogLocation('');
    setLogObservations('');
    setLogTestResults('');
    setShowLogModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#111722] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base font-bold text-white">
                UGANDA GOLD EXPEDITION
              </span>
              <span className="text-[10px] font-mono-data bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                Staff Due Diligence Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Staff Officer 1 AI Document Verification Terminal & Sovereign KYC Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Staff Picker */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#0B0F17] px-2.5 py-1 rounded border border-slate-800 text-xs">
            <span className="text-slate-500">Active Officer:</span>
            <select
              value={activeStaffMember}
              onChange={(e) => setActiveStaffMember(e.target.value)}
              className="bg-transparent text-[#D4AF37] font-semibold focus:outline-none"
            >
              {staff.map((s) => (
                <option key={s.id} value={s.name} className="bg-[#111722] text-white">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onSwitchToAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Switch to Admin Panel</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Staff Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0B0F17] border-b border-slate-800/80 px-4 sm:px-8 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
        <button
          onClick={() => setActiveTab('doc-verifications')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'doc-verifications'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/50'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <FileSearch className="w-4 h-4" />
          <span>Staff Officer 1: AI Document Audits ($2,500) ({documentVerifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc-queue')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'kyc-queue'
              ? 'bg-[#182232] text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Assigned KYC Queue ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('field-logs')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'field-logs'
              ? 'bg-[#182232] text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Field Inspection Logs ({fieldLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('manifest')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'manifest'
              ? 'bg-[#182232] text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Expedition Cohort Manifest</span>
        </button>
      </div>

      {/* Body Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TAB 0: STAFF OFFICER 1 - AI DOCUMENT VERIFICATION QUEUE ($2,500 SERVICE) */}
        {activeTab === 'doc-verifications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono-data text-[#D4AF37] uppercase mb-1">
                  <span>ROUTED DIRECTLY FROM AI FORENSIC ENGINE TO STAFF OFFICER 1</span>
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Staff Officer 1: 24–72 Hour Forensic Document Verification Desk
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  One-off <strong className="text-[#D4AF37]">USD 2,500 (inclusive of applicable Ugandan VAT)</strong> client document submissions analyzed by AI and assigned to <strong>Staff Officer 1 (Lt. Col. Rtd. Arthur Mwesigye)</strong> for DGSM & URA registry follow-up within 24–72 hours.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono-data text-amber-300 bg-amber-950/60 border border-amber-800 px-3 py-1.5 rounded flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24–72 Hour Report SLA</span>
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {documentVerifications.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl bg-[#111722] border border-[#D4AF37]/40 p-5 sm:p-6 space-y-4 shadow-xl"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-data text-xs font-bold text-[#D4AF37]">{doc.id}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-semibold text-white bg-slate-800 px-2 py-0.5 rounded">
                          {doc.documentType}
                        </span>
                        <span className="text-[11px] font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                          Paid: ${doc.feeUsd.toLocaleString()} USD ({doc.paymentRef})
                        </span>
                        <span className={`text-[10px] font-mono-data px-2 py-0.5 rounded font-bold uppercase ${
                          doc.status === 'dispatched_to_client'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}>
                          {doc.status === 'dispatched_to_client' ? 'FINAL REPORT SENT TO CLIENT' : 'ASSIGNED TO STAFF OFFICER 1'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mt-2">
                        Client: {doc.clientName} <span className="text-xs text-slate-400 font-normal">({doc.companyName} · {doc.email})</span>
                      </h4>
                      <div className="text-xs text-slate-300 mt-0.5">
                        Claimed Seller: <strong className="text-[#D4AF37]">{doc.claimedSeller}</strong> · Claimed Offer: <span className="text-white">{doc.claimedQuantityKg} @ {doc.claimedDiscountPercent}</span>
                      </div>
                    </div>

                    <div className="text-xs font-mono-data bg-[#0B0F17] p-3 rounded-lg border border-slate-800 shrink-0">
                      <div className="text-slate-400">Assigned Officer: <span className="text-emerald-400 font-bold">{doc.assignedOfficer}</span></div>
                      <div className="text-amber-300 mt-0.5">SLA Deadline: {doc.slaDeadline}</div>
                    </div>
                  </div>

                  {/* Submitted Clauses */}
                  <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 text-xs">
                    <span className="text-[10px] font-mono-data text-slate-400 uppercase block mb-1">
                      Submitted Document Text & Attachment ({doc.fileName}):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{doc.documentTextOrNotes}</p>
                  </div>

                  {/* AI Forensic Analysis Report */}
                  {doc.aiAnalysis && (
                    <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-900/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono-data font-bold text-rose-400 uppercase">
                          AI Forensic Deconstruction — Verdict: {doc.aiAnalysis.verdict}
                        </span>
                        <span className="text-sm font-mono-data font-bold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-800">
                          Fraud Risk: {doc.aiAnalysis.riskScore}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">
                        {doc.aiAnalysis.executiveSummary}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div>
                          <div className="text-[11px] font-mono-data text-rose-300 uppercase font-bold mb-1">
                            Detected Red Flags:
                          </div>
                          <ul className="space-y-1">
                            {doc.aiAnalysis.redFlags.map((rf, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                                <span>{rf}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-[11px] font-mono-data text-emerald-400 uppercase font-bold mb-1">
                            Staff Officer 1 Action Plan (24–72h Follow-Up):
                          </div>
                          <ul className="space-y-1">
                            {doc.aiAnalysis.staffActionPlan.map((step, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-rose-900/40 text-[11px] text-amber-200 font-mono-data">
                        <strong>Mandatory Released Report Disclaimer:</strong> Verification confirms registry status of referenced documents as at the date of check; it is not a guarantee of counterparty performance or deal quality.
                      </div>
                    </div>
                  )}

                  {/* Staff Officer 1 Follow-Up & Client Portal Approval Controls */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      value={doc.staffFollowUpNotes || ''}
                      onChange={(e) => onUpdateDocumentVerification(doc.id, { staffFollowUpNotes: e.target.value })}
                      placeholder="Enter Staff Officer 1 physical registry findings before approving for Client Portal..."
                      className="flex-1 px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                    />

                    {doc.status === 'dispatched_to_client' ? (
                      <button
                        onClick={() => onUpdateDocumentVerification(doc.id, {
                          status: 'assigned_to_staff_1'
                        })}
                        className="px-4 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600 rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
                        title="Click to re-lock report in Client Portal"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Approved & Unlocked in Client Portal (Click to Re-Lock)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdateDocumentVerification(doc.id, {
                          status: 'dispatched_to_client',
                          staffFollowUpNotes: `${doc.staffFollowUpNotes || 'Physical DGSM & URA registry cross-check completed.'} [Approved & Released to Client Portal by Staff Officer 1]`
                        })}
                        className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Approve & Unlock Report in Client Portal</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: KYC QUEUE */}
        {activeTab === 'kyc-queue' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Assigned KYC Dossiers & Government Protocol Audits
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Execute OFAC, UN, UK HMT, EU sanctions and PEP screening, corporate trade license authentication, and DGSM mineral clearance. Every package includes the mandatory <strong className="text-[#D4AF37]">USD 1,000 KYC & Client Vetting Allocation</strong> (strictly non-refundable once vetting commences).
              </p>
            </div>

            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 p-5 space-y-4 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-xs font-bold text-white">{reg.id}</span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-[#D4AF37] font-semibold uppercase">{reg.requestedTier} Tier</span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-400">{reg.country}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {reg.fullName} <span className="text-xs text-slate-400 font-normal">({reg.companyName})</span>
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono-data px-2.5 py-1 rounded font-bold uppercase ${
                        reg.kycPaymentStatus === 'paid'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        Payment Status: {reg.kycPaymentStatus === 'paid' ? 'Paid in Full' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Vetting Checklist for Staff */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#0B0F17] rounded-lg border border-slate-800 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reg.passportVerified}
                        onChange={(e) => onUpdateRegistration(reg.id, { passportVerified: e.target.checked })}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300">1. Passport Security Audit</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reg.sanctionsPepClear}
                        onChange={(e) => onUpdateRegistration(reg.id, { sanctionsPepClear: e.target.checked })}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300">2. OFAC, UN, UK HMT, EU & PEP Check</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reg.dgsmClearance}
                        onChange={(e) => onUpdateRegistration(reg.id, { dgsmClearance: e.target.checked })}
                        className="rounded text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-slate-300">3. DGSM Registry Match</span>
                    </label>
                  </div>

                  {/* Notes & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs">
                    <div className="text-slate-400">
                      Internal Notes: <span className="text-slate-200">{reg.internalNotes || 'No notes logged yet.'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { 
                          status: 'approved',
                          passportVerified: true,
                          sanctionsPepClear: true,
                          dgsmClearance: true
                        })}
                        className="px-3 py-1.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded transition-colors"
                      >
                        Complete Staff Verification
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FIELD INSPECTION LOGS */}
        {activeTab === 'field-logs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Field Inspection & Metallurgical Logbook
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Boots-on-the-ground observations from mining belts, customs corridors, and Entebbe assay benches.
                </p>
              </div>

              <button
                onClick={() => setShowLogModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Log Field Observation</span>
              </button>
            </div>

            <div className="space-y-4">
              {fieldLogs.map((log) => (
                <div key={log.id} className="p-5 rounded-xl bg-[#111722] border border-slate-800 space-y-3 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-data text-xs text-[#D4AF37] font-bold">{log.id}</span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {log.location}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{log.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono-data px-2 py-0.5 rounded font-bold uppercase ${
                        log.riskAssessment === 'Severe' 
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : log.riskAssessment === 'High'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        Risk: {log.riskAssessment}
                      </span>
                      <span className="text-[11px] font-mono-data text-slate-400">{log.logDate}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {log.observations}
                  </p>

                  {log.testResults && (
                    <div className="p-2.5 rounded bg-[#0B0F17] border border-slate-800 text-[11px] font-mono-data text-emerald-300">
                      <span className="text-slate-400">Assay / Field Test Result: </span>
                      {log.testResults}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 pt-1">
                    Logged by {log.staffName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COHORT MANIFEST */}
        {activeTab === 'manifest' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Upcoming 2027 Cohort Manifest & VIP Protocols
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Approved delegates cleared for dedicated B6 armored executive motorcade transfers and DGSM Entebbe tarmac access.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#111722] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-white">Cohort 01: Jan 17–23, 2027</span>
                <span className="text-xs font-mono-data text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Confirmed: 4 / 12 Seats
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold">Alexander Vance (Apex Precious Metals DMCC)</span>
                    <span className="text-slate-400 block text-[11px]">Sovereign Executive · Diplomatic VIP (USD 45,000) · Entebbe VIP Fast-Track & B6 Motorcade · 2 PAX</span>
                  </div>
                  <span className="text-emerald-400 font-mono-data">Cleared by DGSM · Paid in Full</span>
                </div>

                <div className="p-3 rounded bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold">Elena Rostova (Helvetic Bullion Partners SA)</span>
                    <span className="text-slate-400 block text-[11px]">Professional Trader Tier (USD 15,000) · Kampala Serena Deluxe · 1 PAX</span>
                  </div>
                  <span className="text-blue-400 font-mono-data">Under Review · Paid in Full</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: New Field Log */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Log Field Inspection Report</h4>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Inspection Title *</label>
                <input
                  type="text"
                  required
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. Mubende Pithead Panning Yield Cross-Check"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Location / Mine Concession *</label>
                  <input
                    type="text"
                    required
                    value={logLocation}
                    onChange={(e) => setLogLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                    placeholder="e.g. Kassanda Belt, Central Uganda"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Risk Assessment</label>
                  <select
                    value={logRisk}
                    onChange={(e: any) => setLogRisk(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  >
                    <option value="Low">Low (Legitimate Concession)</option>
                    <option value="Medium">Medium (Discrepancies Observed)</option>
                    <option value="High">High (Suspected Synthetic Papers)</option>
                    <option value="Severe">Severe (Active Fraud Syndicate)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Observations & Chain-of-Custody Findings *</label>
                <textarea
                  rows={3}
                  required
                  value={logObservations}
                  onChange={(e) => setLogObservations(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Note equipment condition, local cash settlements, and intermediary involvement..."
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Metallurgical / Assay Test Data</label>
                <input
                  type="text"
                  value={logTestResults}
                  onChange={(e) => setLogTestResults(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. XRF Reading: 92.4% Au, Specific gravity: 18.2 g/cm³"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded"
                >
                  Submit Field Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
