import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Building2, CheckCircle2, ShieldCheck, Mail, Phone, User, ArrowRight } from 'lucide-react';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    timezone: 'GMT+4 (Dubai / UAE)',
    preferredDate: 'Next Available Tuesday',
    topicFocus: 'Anti-Fraud Contract Review & Expedition Overview'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Request Private B2B Briefing
              </h3>
              <p className="text-[11px] text-slate-400 font-mono-data">
                CONFIDENTIAL 30-MIN VIRTUAL AUDIT
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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Designed for institutional buyers, commodity trading desks, and legal counsel prior to formal delegation submission. Conducted securely via Microsoft Teams or encrypted Zoom.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Company / Organization *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sovereign Bullion Partners Ltd"
                  value={formData.org}
                  onChange={e => setFormData({ ...formData, org: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Corporate Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="elena@sovereign.ch"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Direct Phone / Signal *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+41 22 555 0199"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="GMT+4 (Dubai / UAE)">GMT+4 (Dubai / UAE)</option>
                  <option value="GMT+1 (Geneva / Zurich / London)">GMT+1 (Geneva / Zurich / London)</option>
                  <option value="GMT+8 (Singapore / Hong Kong)">GMT+8 (Singapore / Hong Kong)</option>
                  <option value="GMT-5 (New York / EST)">GMT-5 (New York / EST)</option>
                  <option value="GMT+3 (Kampala / Nairobi)">GMT+3 (Kampala / Nairobi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Briefing Focus
                </label>
                <select
                  value={formData.topicFocus}
                  onChange={e => setFormData({ ...formData, topicFocus: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Anti-Fraud Contract Review & Expedition Overview">Anti-Fraud & Offer Review</option>
                  <option value="Sovereign Executive Tier Details">Sovereign Executive VIP Logistics</option>
                  <option value="Refinery & Escrow Structuring">Refinery & Bank Escrow Mechanics</option>
                  <option value="Corporate Board Delegation">Corporate Board Delegation</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Encrypted Calendar Invitation will be sent
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5"
              >
                <span>Confirm Briefing Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-white">
              Briefing Request Logged
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our Senior Due Diligence Director will dispatch a calendar invite to <strong className="text-white">{formData.email}</strong> within 4 business hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
