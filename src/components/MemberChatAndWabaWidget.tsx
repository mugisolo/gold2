import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  X,
  ShieldCheck,
  Lock,
  Sparkles,
  PhoneCall,
  ExternalLink,
  CheckCircle2,
  UserCheck,
  Award,
  Zap,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, ExpeditionRegistration, WabaDispatchLog, Language, Currency } from '../types';

interface MemberChatAndWabaWidgetProps {
  currentLang?: Language;
  selectedCurrency?: Currency;
  registrations: ExpeditionRegistration[];
  isOpen: boolean;
  activeTab: 'chat' | 'waba';
  onToggleOpen: (open: boolean, tab?: 'chat' | 'waba') => void;
  onOpenRegistration: () => void;
  onOpenDocVerification: () => void;
}

export const MemberChatAndWabaWidget: React.FC<MemberChatAndWabaWidgetProps> = ({
  currentLang = 'EN',
  selectedCurrency = 'USD',
  registrations,
  isOpen,
  activeTab,
  onToggleOpen,
  onOpenRegistration,
  onOpenDocVerification
}) => {
  const [currentTab, setCurrentTab] = useState<'chat' | 'waba'>(activeTab);

  // Sync tab prop when parent changes it
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Registered Member Verification State
  const [verifiedMember, setVerifiedMember] = useState<ExpeditionRegistration | null>(
    registrations[0] || null
  );
  const [memberLookupInput, setMemberLookupInput] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Keep verifiedMember synced if a new registration is added
  useEffect(() => {
    if (!verifiedMember && registrations.length > 0) {
      setVerifiedMember(registrations[0]);
    }
  }, [registrations, verifiedMember]);

  // Multi-Turn Gemini Chat State
  const [persona, setPersona] = useState<'forensics' | 'trade' | 'logistics'>('forensics');
  const [speedMode, setSpeedMode] = useState<'standard' | 'fast'>('standard');
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: 'Welcome to the Uganda Gold Expedition Sovereign AI Advisory Desk. Choose a specialist role above (Forensics Desk under Mugisa Solomon Byakutaaga, Minerals Trade under Kamanzai Kaijuka, or Operations & Logistics under Ronnie Mugarura) and ask any question regarding East African gold contracts, assay protocols, or expedition logistics.',
      timestamp: 'Now',
      persona: 'forensics',
      modelUsed: 'gemini-3.8-flash'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && currentTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, currentTab]);

  // WABA State for Registered Members
  const [wabaLogs, setWabaLogs] = useState<WabaDispatchLog[]>([]);
  const [wabaConciergeNumber, setWabaConciergeNumber] = useState('256772400119');
  const [recipientDesk, setRecipientDesk] = useState(
    'Forensics Desk — Mugisa Solomon Byakutaaga'
  );
  const [templateType, setTemplateType] = useState<
    'urgent_assay_escort' | 'audit_status_ping' | 'tarmac_arrival' | 'custom_dispatch'
  >('audit_status_ping');
  const [wabaMessage, setWabaMessage] = useState(
    'Requesting priority update on our DGSM Mineral Cadastre & URA customs verification dossier.'
  );
  const [isDispatchingWaba, setIsDispatchingWaba] = useState(false);
  const [lastWaDirectUrl, setLastWaDirectUrl] = useState<string | null>(null);
  const [wabaSuccessNotice, setWabaSuccessNotice] = useState<string | null>(null);

  // Fetch initial WABA logs
  useEffect(() => {
    fetch('/api/waba/logs')
      .then((res) => res.json())
      .then((data) => {
        if (data.logs) setWabaLogs(data.logs);
        if (data.conciergeNumber) setWabaConciergeNumber(data.conciergeNumber);
      })
      .catch(() => {});
  }, []);

  // Update default WABA message when template changes
  const handleTemplateChange = (
    t: 'urgent_assay_escort' | 'audit_status_ping' | 'tarmac_arrival' | 'custom_dispatch'
  ) => {
    setTemplateType(t);
    if (t === 'urgent_assay_escort') {
      setWabaMessage(
        'Requesting accredited metallurgist & security escort for homogeneous induction melting and 1050°C Fire Assay Cupellation in Kampala.'
      );
    } else if (t === 'audit_status_ping') {
      setWabaMessage(
        'Requesting priority update on our DGSM Mineral Cadastre & URA customs verification dossier.'
      );
    } else if (t === 'tarmac_arrival') {
      setWabaMessage(
        'Confirming flight manifest arrival at Entebbe International Airport (EBB) for VIP diplomatic clearance and B6 convoy pickup.'
      );
    } else {
      setWabaMessage('');
    }
  };

  const handleVerifyMemberByInput = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const q = memberLookupInput.trim().toLowerCase();
    if (!q) return;

    const found = registrations.find(
      (r) =>
        r.id.toLowerCase() === q ||
        r.email.toLowerCase() === q ||
        r.fullName.toLowerCase().includes(q)
    );
    if (found) {
      setVerifiedMember(found);
      setMemberLookupInput('');
    } else {
      setLookupError(
        'No registered delegate found matching that ID or email. Select a verified member below or register now.'
      );
    }
  };

  const handleSendChatMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt ?? chatInput).trim();
    if (!textToSend || isSendingChat) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      persona
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!customPrompt) setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: updatedHistory.map((m) => ({ role: m.role, text: m.text })),
          persona,
          speedMode,
          memberProfile: verifiedMember,
          language: currentLang,
          currency: selectedCurrency
        })
      });

      const data = await res.json();
      const replyMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text:
          data.reply ||
          data.message ||
          'Unable to retrieve response at this moment. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        persona,
        modelUsed: data.modelUsed || (speedMode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash')
      };
      setMessages((prev) => [...prev, replyMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `model-err-${Date.now()}`,
        role: 'model',
        text: 'Connection interrupted. Please retry your forensic inquiry or use the WABA WhatsApp tab for direct officer dispatch.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        persona
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleDispatchWaba = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedMember || !wabaMessage.trim() || isDispatchingWaba) return;

    setIsDispatchingWaba(true);
    setWabaSuccessNotice(null);

    try {
      const res = await fetch('/api/waba/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId: verifiedMember.id,
          memberName: verifiedMember.fullName,
          memberPhone: verifiedMember.phone,
          recipientDesk,
          templateType,
          messageBody: wabaMessage.trim()
        })
      });

      const data = await res.json();
      if (data.success && data.dispatch) {
        setWabaLogs((prev) => [data.dispatch, ...prev]);
        setLastWaDirectUrl(data.waDirectUrl || null);
        setWabaSuccessNotice(
          `WABA Dispatch ${data.dispatch.id} routed to ${recipientDesk}.`
        );
      }
    } catch {
      const fallbackUrl = `https://wa.me/${wabaConciergeNumber}?text=${encodeURIComponent(
        `[VERIFIED MEMBER ${verifiedMember.id} — ${verifiedMember.fullName}] To ${recipientDesk}: ${wabaMessage}`
      )}`;
      setLastWaDirectUrl(fallbackUrl);
      setWabaSuccessNotice('WABA Dispatch prepared for encrypted WhatsApp transmission.');
    } finally {
      setIsDispatchingWaba(false);
    }
  };

  const quickPrompts = [
    'Why is a 20% LBMA gold discount always a scam?',
    'How does tungsten-core Dore bar detection work?',
    'How are URA 5% export taxes legally paid?',
    'What is included in the $20k Sovereign VIP Helicopter tier?'
  ];

  return (
    <>
      {/* Floating Action Dock (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
          {/* Registered Member WhatsApp (WABA) Quick Button */}
          <button
            onClick={() => onToggleOpen(true, 'waba')}
            className="px-4 py-3 rounded-xl bg-[#111722] hover:bg-[#182232] text-emerald-300 border border-emerald-500/60 shadow-2xl flex items-center gap-2 text-xs font-bold transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Member WhatsApp (WABA)</span>
          </button>

          {/* Multi-Turn Gemini AI Chatbot Launcher */}
          <button
            onClick={() => onToggleOpen(true, 'chat')}
            className="px-4 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] shadow-2xl flex items-center gap-2 text-xs font-bold transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Forensic & Trade Advisor</span>
          </button>
        </div>
      )}

      {/* Main Drawer / Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 w-full sm:w-[480px] md:w-[540px] sm:max-h-[86vh] h-full sm:h-[700px] bg-[#0E141F] border border-[#D4AF37]/40 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="bg-[#111722] border-b border-slate-800 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-sm font-bold text-white">
                  SOVEREIGN MEMBER DESK
                </span>
                <span className="text-[11px] font-mono-data text-[#D4AF37]">
                  · Gemini AI & WABA
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Multi-Turn AI Forensic Advisor & Registered Member WhatsApp Business API
              </p>
            </div>

            <button
              onClick={() => onToggleOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close Member Desk"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Registered Member Identity Bar */}
          <div className="bg-[#0B0F17] border-b border-slate-800 px-4 py-2.5 shrink-0 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-slate-400">Active Member:</span>
                {verifiedMember ? (
                  <span className="font-semibold text-white">
                    {verifiedMember.fullName} ({verifiedMember.id})
                  </span>
                ) : (
                  <span className="text-amber-400">Guest Mode (Unverified)</span>
                )}
              </div>

              <select
                value={verifiedMember?.id || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) {
                    setVerifiedMember(null);
                  } else {
                    const found = registrations.find((r) => r.id === val) || null;
                    setVerifiedMember(found);
                  }
                }}
                className="px-2 py-1 text-[11px] bg-[#111722] border border-slate-700 rounded text-slate-200 outline-none"
                title="Switch Registered Member Profile"
              >
                <option value="">Guest (Not Registered)</option>
                {registrations.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.fullName} ({reg.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Switcher Tabs: AI Chatbot vs WhatsApp Business (WABA) */}
          <div className="grid grid-cols-2 bg-[#111722] border-b border-slate-800 p-1.5 gap-1.5 shrink-0">
            <button
              onClick={() => setCurrentTab('chat')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
                currentTab === 'chat'
                  ? 'bg-[#D4AF37] text-[#0B0F17]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini AI Chatbot</span>
            </button>

            <button
              onClick={() => setCurrentTab('waba')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
                currentTab === 'waba'
                  ? 'bg-emerald-500 text-[#0B0F17]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp (WABA)</span>
            </button>
          </div>

          {/* TAB 1: MULTI-TURN GEMINI AI CHATBOT */}
          {currentTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Role / System Instruction Persona & Speed Controls */}
              <div className="bg-[#0B0F17]/90 border-b border-slate-800 px-4 py-2.5 space-y-2 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono-data text-slate-400">
                    Specialist Role:
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSpeedMode(speedMode === 'standard' ? 'fast' : 'standard')
                      }
                      className="px-2 py-0.5 rounded bg-[#111722] border border-slate-700 text-[10px] font-mono-data text-[#D4AF37] flex items-center gap-1"
                      title="Toggle between Standard (gemini-3.8-flash) and Fast (gemini-3.1-flash-lite)"
                    >
                      <Zap className="w-3 h-3" />
                      <span>
                        {speedMode === 'fast'
                          ? 'Fast · gemini-3.1-flash-lite'
                          : 'Standard · gemini-3.8-flash'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setMessages([
                          {
                            id: `reset-${Date.now()}`,
                            role: 'model',
                            text: 'Conversation reset. Select a directorate persona and ask your question.',
                            timestamp: 'Now',
                            persona
                          }
                        ])
                      }
                      className="p-1 text-slate-400 hover:text-white"
                      title="Reset Conversation History"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3 Director Persona Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    {
                      id: 'forensics',
                      label: 'Forensics Desk',
                      sub: 'M. S. Byakutaaga'
                    },
                    {
                      id: 'trade',
                      label: 'Minerals Trade',
                      sub: 'Kamanzai Kaijuka'
                    },
                    {
                      id: 'logistics',
                      label: 'Logistics & VIP',
                      sub: 'Ronnie Mugarura'
                    }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPersona(p.id as any)}
                      className={`p-1.5 rounded border text-left transition-colors ${
                        persona === p.id
                          ? 'bg-[#182232] border-[#D4AF37] text-white'
                          : 'bg-[#111722] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[11px] font-bold leading-tight truncate">
                        {p.label}
                      </div>
                      <div className="text-[10px] text-[#D4AF37] truncate">{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Multi-Turn Message Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0B0F17]/60">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-[#D4AF37] text-[#0B0F17] font-medium'
                          : 'bg-[#111722] border border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] font-mono-data text-slate-500">
                      <span>{msg.role === 'user' ? 'You' : 'Directorate AI'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{msg.timestamp}</span>
                      {msg.modelUsed && msg.role === 'model' && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-600">{msg.modelUsed}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {isSendingChat && (
                  <div className="flex items-start">
                    <div className="bg-[#111722] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-[#D4AF37] font-mono-data">
                      Analyzing against DGSM & metallurgical protocols...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Strip */}
              <div className="px-3 py-2 bg-[#0B0F17] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto shrink-0">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendChatMessage(qp)}
                    className="px-2.5 py-1 rounded bg-[#111722] hover:bg-[#182232] border border-slate-800 text-[11px] text-slate-300 hover:text-[#D4AF37] whitespace-nowrap shrink-0 transition-colors"
                  >
                    {qp}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChatMessage();
                }}
                className="p-3 bg-[#111722] border-t border-slate-800 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about gold FCOs, XRF vs Fire Assay, URA taxes, or KYC..."
                  className="flex-1 px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 focus:border-[#D4AF37] rounded-lg text-white placeholder-slate-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={isSendingChat || !chatInput.trim()}
                  className="px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] disabled:opacity-50 text-[#0B0F17] text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: WHATSAPP BUSINESS API (WABA) FOR REGISTERED MEMBERS */}
          {currentTab === 'waba' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#0B0F17]/80">
              {!verifiedMember ? (
                /* Unverified / Guest Gate for WABA */
                <div className="rounded-xl bg-[#111722] border border-amber-700/50 p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400 shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono-data text-amber-400 font-bold">
                        REGISTERED DELEGATE ACCESS ONLY
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-white">
                        Verify Your Expedition Membership to Unlock WABA
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Direct WhatsApp Business API (WABA) dispatches to our Board of Directors and Field Officers are reserved for registered members. Enter your Registration ID or corporate email below, or select a demo member from the top bar.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyMemberByInput} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={memberLookupInput}
                        onChange={(e) => setMemberLookupInput(e.target.value)}
                        placeholder="Enter Registration ID (e.g. REG-2026-8812) or Email..."
                        className="flex-1 px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] rounded whitespace-nowrap"
                      >
                        Verify Member
                      </button>
                    </div>
                    {lookupError && (
                      <p className="text-[11px] text-rose-400">{lookupError}</p>
                    )}
                  </form>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (registrations[0]) setVerifiedMember(registrations[0]);
                      }}
                      className="text-xs text-[#D4AF37] hover:underline font-medium"
                    >
                      Quick Demo: Sign in as {registrations[0]?.fullName || 'Registered Delegate'} →
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onToggleOpen(false);
                        onOpenRegistration();
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Register Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Verified Registered Member WABA Console */
                <div className="space-y-5">
                  <div className="rounded-xl bg-[#111722] border border-emerald-700/50 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-mono-data font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>WABA CHANNEL AUTHENTICATED</span>
                      </span>
                      <span className="font-mono-data text-[11px] text-slate-400">
                        ID: {verifiedMember.id}
                      </span>
                    </div>
                    <div className="text-xs text-white font-semibold">
                      {verifiedMember.fullName} · {verifiedMember.companyName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono-data">
                      Registered WhatsApp Phone: {verifiedMember.phone} · Tier:{' '}
                      <span className="text-[#D4AF37] uppercase">
                        {verifiedMember.requestedTier}
                      </span>
                    </div>
                  </div>

                  {/* WABA Dispatch Form */}
                  <form
                    onSubmit={handleDispatchWaba}
                    className="rounded-xl bg-[#111722] border border-slate-800 p-4 space-y-3 text-xs"
                  >
                    <div className="font-cinzel text-sm font-bold text-white">
                      Send Encrypted WhatsApp Business (WABA) Dispatch
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">
                        Target Directorate / Field Officer Desk
                      </label>
                      <select
                        value={recipientDesk}
                        onChange={(e) => setRecipientDesk(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                      >
                        <option value="Forensics Desk — Mugisa Solomon Byakutaaga">
                          Forensics Desk — Mugisa Solomon Byakutaaga (Lead Forensics Expert)
                        </option>
                        <option value="Minerals Trade — Kamanzai Kaijuka">
                          Minerals Trade — Kamanzai Kaijuka (Minerals Trade Expert)
                        </option>
                        <option value="Operations & Air-Bridge — Ronnie Mugarura">
                          Operations & Air-Bridge — Ronnie Mugarura (Operations & Strategy)
                        </option>
                        <option value="Staff Officer 1 — Lt. Col. (Rtd) Arthur Mwesigye">
                          Staff Officer 1 — Lt. Col. (Rtd) Arthur Mwesigye (24h Audit Desk)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">
                        WABA Dispatch Template
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'audit_status_ping', label: '24h Audit Status Ping' },
                          { id: 'urgent_assay_escort', label: 'Urgent Assay Escort' },
                          { id: 'tarmac_arrival', label: 'Entebbe VIP Arrival' },
                          { id: 'custom_dispatch', label: 'Custom Member Message' }
                        ].map((tpl) => (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() => handleTemplateChange(tpl.id as any)}
                            className={`px-2.5 py-1.5 rounded border text-left text-[11px] font-medium transition-colors ${
                              templateType === tpl.id
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {tpl.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">
                        Dispatch Message Payload
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={wabaMessage}
                        onChange={(e) => setWabaMessage(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white leading-relaxed"
                        placeholder="Enter your priority message for WhatsApp Business API transmission..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={isDispatchingWaba}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0B0F17] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>
                          {isDispatchingWaba
                            ? 'Transmitting via WABA...'
                            : 'Dispatch via WhatsApp Business API'}
                        </span>
                      </button>

                      <a
                        href={
                          lastWaDirectUrl ||
                          `https://wa.me/${wabaConciergeNumber}?text=${encodeURIComponent(
                            `[VERIFIED MEMBER ${verifiedMember.id} — ${verifiedMember.fullName}] To ${recipientDesk}: ${wabaMessage}`
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3.5 rounded-lg bg-[#0B0F17] hover:bg-[#182232] border border-emerald-600/50 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <span>Open WhatsApp App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {wabaSuccessNotice && (
                      <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-[11px] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{wabaSuccessNotice}</span>
                      </div>
                    )}
                  </form>

                  {/* Recent Member WABA Dispatches */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono-data text-slate-400">
                      Recent Registered Member WABA Dispatches ({wabaLogs.length})
                    </div>
                    <div className="space-y-2">
                      {wabaLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-lg bg-[#111722] border border-slate-800 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-mono-data text-[11px]">
                            <span className="text-emerald-400 font-bold">{log.id}</span>
                            <span className="text-slate-500">{log.timestamp}</span>
                          </div>
                          <div className="text-white font-medium text-[11px]">
                            {log.memberName} → <span className="text-[#D4AF37]">{log.recipientDesk}</span>
                          </div>
                          <p className="text-slate-300 text-xs leading-relaxed">
                            {log.messageBody}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
