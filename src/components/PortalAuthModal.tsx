import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Shield,
  UserCheck,
  ArrowRight,
  KeyRound,
  Mail,
  AlertCircle,
  LogIn,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import {
  auth,
  signInWithGoogle,
  signOutFirebaseUser,
  onAuthStateChanged,
  type User
} from '../services/firebase';

interface PortalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'client' | 'staff' | 'admin';
  onOpenAdmin: () => void;
  onOpenStaff: () => void;
  onOpenClientPortal: (email?: string) => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'client',
  onOpenAdmin,
  onOpenStaff,
  onOpenClientPortal
}) => {
  const [selectedRole, setSelectedRole] = useState<'client' | 'staff' | 'admin'>(initialRole);
  const [emailInput, setEmailInput] = useState('');
  const [credentialInput, setCredentialInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.email && !emailInput) {
        setEmailInput(user.email);
      }
    });
    return () => unsubscribe();
  }, [emailInput]);

  useEffect(() => {
    if (isOpen && initialRole) {
      setSelectedRole(initialRole);
      setAuthError('');
      if (auth.currentUser?.email) {
        setEmailInput(auth.currentUser.email);
      }
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      const userEmail = user.email || '';
      setEmailInput(userEmail);

      if (selectedRole === 'client') {
        onOpenClientPortal(userEmail);
        onClose();
      } else if (selectedRole === 'admin' && userEmail.toLowerCase() === 'mugisolo@gmail.com') {
        onOpenAdmin();
        onClose();
      } else if (selectedRole === 'staff' && userEmail.toLowerCase() === 'mugisolo@gmail.com') {
        onOpenStaff();
        onClose();
      }
    } catch (err: any) {
      setAuthError(
        err?.message || 'Google Sign-In was cancelled or blocked by browser popup settings.'
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOutFirebaseUser();
      setFirebaseUser(null);
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to sign out.');
    }
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (selectedRole === 'client') {
      onOpenClientPortal(emailInput.trim() || firebaseUser?.email || '');
      onClose();
      return;
    }

    if (!emailInput.trim() || !credentialInput.trim()) {
      setAuthError('Please enter your authorized institutional email and security credential.');
      return;
    }

    if (selectedRole === 'staff') {
      onOpenStaff();
    } else {
      onOpenAdmin();
    }
    setCredentialInput('');
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
                Institutional Portal Authentication
              </h3>
              <p className="text-[11px] text-[#D4AF37] font-mono-data">
                FIREBASE AUTH · CLIENT DESK · STAFF OFFICER 1 · EXECUTIVE ADMIN
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

        <form onSubmit={handleAuthenticate} className="p-6 space-y-5">
          <p className="text-xs text-slate-300 leading-relaxed text-justify">
            Select your institutional role and authenticate via Google Sign-In (Firebase Authentication) or directorate credentials to access your client dossier, Staff Officer 1 verification desk, or executive administration console.
          </p>

          {/* Firebase Auth Status / Google Sign-In Card */}
          <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#D4AF37]/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-data uppercase tracking-wider text-[#D4AF37] font-bold">
                Firebase Identity & Firestore Session
              </span>
              {firebaseUser ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  Authenticated
                </span>
              ) : (
                <span className="text-[10px] font-mono-data text-slate-400">
                  Unauthenticated
                </span>
              )}
            </div>

            {firebaseUser ? (
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="text-xs text-slate-200 truncate">
                  <div className="font-semibold text-white truncate">
                    {firebaseUser.displayName || 'Verified Principal'}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono-data truncate">
                    {firebaseUser.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleSignOut}
                  className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium inline-flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 text-[#0B0F17] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow cursor-pointer disabled:opacity-60"
              >
                <LogIn className="w-4 h-4 text-[#0B0F17]" />
                <span>
                  {isGoogleLoading
                    ? 'Connecting to Google Identity...'
                    : 'Sign in with Google (Recommended)'}
                </span>
              </button>
            )}
          </div>

          {/* Role Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('client');
                setAuthError('');
              }}
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
              onClick={() => {
                setSelectedRole('staff');
                setAuthError('');
              }}
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
              onClick={() => {
                setSelectedRole('admin');
                setAuthError('');
              }}
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

          {authError && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Authentication Fields */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {selectedRole === 'client'
                  ? 'Registered Client Email or Reference (Optional Filter)'
                  : 'Institutional Officer Email *'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required={selectedRole !== 'client'}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={
                    selectedRole === 'client'
                      ? 'Enter corporate email to filter your dossiers'
                      : 'officer@ugandagoldexpedition.org'
                  }
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {selectedRole !== 'client' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Directorate Security Passcode *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={credentialInput}
                    onChange={(e) => setCredentialInput(e.target.value)}
                    placeholder="Enter encrypted security credential"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#0B0F17] border border-slate-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 text-xs font-bold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'client'
                  ? 'text-[#0B0F17] bg-emerald-400 hover:bg-emerald-300'
                  : 'text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {selectedRole === 'client'
                  ? 'Enter Secure Client Portal'
                  : selectedRole === 'staff'
                  ? 'Authenticate & Enter Staff Officer 1 Portal'
                  : 'Authenticate & Enter Executive Admin Console'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[10px] text-slate-500 text-center font-mono-data">
            Protected under Firebase Zero-Trust Security Rules & Uganda National Information Security Standards.
          </div>
        </form>
      </div>
    </div>
  );
};
