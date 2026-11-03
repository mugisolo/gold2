import React, { useState } from 'react';
import { X, Lock, Shield, UserCheck, ArrowRight, KeyRound } from 'lucide-react';

interface PortalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
  onOpenStaff: () => void;
  onOpenClientPortal: () => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  onOpenStaff,
  onOpenClientPortal
}) => {
  const [selectedRole, setSelectedRole] = useState<'client' | 'staff' | 'admin'>('client');

  if (!isOpen) return null;

  const handleInstantEnter = (role: 'client' | 'admin' | 'staff') => {
    if (role === 'client') {
      onOpenClientPortal();
    } else if (role === 'admin') {
      onOpenAdmin();
    } else {
      onOpenStaff();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#111722] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#182232] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Institutional Portal Access
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono-data">
                CLIENT · STAFF OFFICER 1 · EXECUTIVE ADMIN
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

        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-300 leading-relaxed">
            Select your portal to track submitted document verifications and booked expeditions, or manage analyst approvals and CMS dispatches.
          </p>

          {/* Role Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedRole('client')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedRole === 'client'
                  ? 'bg-[#182232] border-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-data text-emerald-400 font-bold">CLIENT DESK</span>
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white">Client Portal</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Doc Status & Expedition</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('staff')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedRole === 'staff'
                  ? 'bg-[#182232] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                  : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-data text-[#D4AF37] font-bold">OFFICER 1</span>
                <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-xs font-bold text-white">Staff Officer</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Approve Reports & KYC</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedRole === 'admin'
                  ? 'bg-[#182232] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                  : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-data text-[#D4AF37] font-bold">ADMIN L1</span>
                <Lock className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="text-xs font-bold text-white">Administrator</div>
              <div className="text-[10px] text-slate-400 mt-0.5">CMS, Photos & Payments</div>
            </button>
          </div>

          {/* Quick Access Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <button
              onClick={() => handleInstantEnter('client')}
              className="w-full py-2.5 text-xs font-bold text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Enter Secure Client Portal (Track Audits & Expedition)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleInstantEnter('staff')}
              className="w-full py-2.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enter Staff Officer 1 Portal (Approve & Release Reports)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleInstantEnter('admin')}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#182232] hover:bg-[#202c40] border border-slate-700 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Enter Administrator Panel (Full CMS & Oversight)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[10px] text-slate-500 text-center font-mono-data">
            Protected under Uganda National Information Security Standards.
          </div>
        </div>

      </div>
    </div>
  );
};
