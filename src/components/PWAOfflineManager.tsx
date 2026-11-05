import React, { useEffect, useState } from 'react';
import { Download, WifiOff, CheckCircle2, Smartphone, X, Database, RefreshCw } from 'lucide-react';
import { registerSW } from 'virtual:pwa-register';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const OFFLINE_EXPEDITION_CACHE_KEY = 'uge_offline_expedition_snapshot_v1';

export interface OfflineExpeditionSnapshot {
  savedAtUtc: string;
  posts?: unknown[];
  photos?: unknown[];
  aboutContent?: unknown;
  boardMembers?: unknown[];
  registrations?: unknown[];
  fieldLogs?: unknown[];
  payments?: unknown[];
  documentVerifications?: unknown[];
  auditLogs?: unknown[];
}

export function saveOfflineExpeditionSnapshot(partial: Partial<OfflineExpeditionSnapshot>): void {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = window.localStorage.getItem(OFFLINE_EXPEDITION_CACHE_KEY);
    const existing: OfflineExpeditionSnapshot = existingRaw
      ? JSON.parse(existingRaw)
      : { savedAtUtc: new Date().toISOString() };
    const merged: OfflineExpeditionSnapshot = {
      ...existing,
      ...partial,
      savedAtUtc: new Date().toISOString(),
    };
    window.localStorage.setItem(OFFLINE_EXPEDITION_CACHE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadOfflineExpeditionSnapshot(): OfflineExpeditionSnapshot | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(OFFLINE_EXPEDITION_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OfflineExpeditionSnapshot;
  } catch {
    return null;
  }
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install,
  };
}

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        title="Install Offline Field App"
        className={
          compact
            ? 'inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg bg-[#182232] hover:bg-slate-800 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#182232] hover:bg-slate-800 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        }
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>{compact ? 'Field App' : 'Install Field App (Offline Ready)'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg bg-[#182232] hover:bg-slate-800 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" />
          <span>{compact ? 'iOS App' : 'Install on iOS for Field Use'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#111722] border border-[#D4AF37]/50 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-base font-bold text-white">
                  Install for Offline Field Access
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Install Uganda Gold Expedition on your iPhone or iPad to access your verification
                dossiers, 7-day itinerary, and QR receipts in remote mining corridors (Mubende,
                Kassanda, Busia) without cellular signal:
              </p>
              <ol className="text-xs text-slate-200 space-y-2 list-decimal list-inside bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800">
                <li>
                  Tap the <strong>Share</strong> icon in the Safari toolbar.
                </li>
                <li>
                  Scroll down and select <strong>Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong>Add</strong> to cache field assets and dossiers on your device.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full min-h-[44px] rounded-lg bg-[#D4AF37] text-[#0B0F17] font-bold text-xs hover:bg-[#FEF3C7] transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineFieldStatusBanner: React.FC<{
  onOpenClientPortal?: () => void;
}> = ({ onOpenClientPortal }) => {
  const isOnline = useOnlineStatus();
  const [swReady, setSwReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateSWFn, setUpdateSWFn] = useState<((reloadPage?: boolean) => Promise<void>) | null>(
    null
  );
  const [dismissedReadyToast, setDismissedReadyToast] = useState(false);

  useEffect(() => {
    try {
      const updateSW = registerSW({
        immediate: true,
        onOfflineReady() {
          setSwReady(true);
        },
        onNeedRefresh() {
          setNeedRefresh(true);
        },
      });
      setUpdateSWFn(() => updateSW);
    } catch {
      // Fallback if virtual:pwa-register is unavailable
    }
  }, []);

  const snapshot = loadOfflineExpeditionSnapshot();
  const formattedSyncTime = snapshot?.savedAtUtc
    ? new Date(snapshot.savedAtUtc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Recently';

  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-amber-950/95 border-b border-amber-500/60 px-4 py-2 text-xs text-amber-100 print:hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Offline Field Mode Active:</strong> Serving cached static assets &amp;
              expedition dossiers (last synced {formattedSyncTime}). All verification reports,
              itineraries, and QR receipts remain accessible.
            </span>
          </div>
          {onOpenClientPortal && (
            <button
              type="button"
              onClick={onOpenClientPortal}
              className="px-3 py-1 min-h-[32px] rounded-md bg-amber-400 text-[#0B0F17] font-bold text-[11px] hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
            >
              Open Cached Client Dossiers →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (needRefresh && updateSWFn) {
    return (
      <div className="fixed bottom-16 lg:bottom-4 right-4 z-50 max-w-sm rounded-xl bg-[#111722] border border-[#D4AF37]/60 p-3.5 shadow-2xl flex items-center justify-between gap-3 text-xs text-slate-200 print:hidden">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>Updated expedition data &amp; field assets available.</span>
        </div>
        <button
          type="button"
          onClick={() => updateSWFn(true)}
          className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-bold text-[11px] shrink-0 cursor-pointer"
        >
          Update
        </button>
      </div>
    );
  }

  if (swReady && !dismissedReadyToast) {
    return (
      <div className="fixed bottom-16 lg:bottom-4 left-4 z-40 max-w-sm rounded-xl bg-[#111722]/95 backdrop-blur-md border border-emerald-500/40 px-3.5 py-2.5 shadow-xl flex items-center justify-between gap-3 text-xs text-slate-200 print:hidden">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Offline Field Cache Ready:</strong> Dossiers &amp;
            itineraries saved for remote areas.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDismissedReadyToast(true)}
          aria-label="Dismiss offline ready notification"
          className="p-1 text-slate-400 hover:text-white rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return null;
};
