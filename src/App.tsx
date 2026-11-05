import React, { useState, useEffect } from 'react';
import {
  Language,
  Currency,
  ContentPost,
  PhotoItem,
  ExpeditionRegistration,
  StaffMember,
  FieldLog,
  PaymentRecord,
  DocumentVerification,
  BoardMember,
  AboutContent,
  AdminAuditLog
} from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { VerificationPage } from './components/VerificationPage';
import {
  ExpeditionsOverviewPage,
  ProfessionalExpeditionPage,
  AcademicExpeditionPage,
  InstitutionalExpeditionPage,
  ItineraryPage,
  DatesPackagesPage
} from './components/ExpeditionsPages';
import {
  RiskComplianceHubPage,
  SupplyChainPage,
  ScamCheckPage,
  ContactBriefingPage,
  LegalGovernancePage
} from './components/RiskCompliancePages';
import { ApplicationWorkflowPage } from './components/ApplicationWorkflowPage';
import { AboutUsPage } from './components/AboutUsPage';
import { BlogPage } from './components/BlogPage';
import { FaqSection } from './components/FaqSection';
import { RegistrationModal } from './components/RegistrationModal';
import { CardPaymentModal } from './components/CardPaymentModal';
import { DocumentVerificationModal } from './components/DocumentVerificationModal';
import { BriefingModal } from './components/BriefingModal';
import { PortalAuthModal } from './components/PortalAuthModal';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { StaffPortal } from './components/StaffPortal';
import { Footer } from './components/Footer';
import { InvoiceReceiptModal, InvoiceReceiptData } from './components/InvoiceReceiptModal';
import {
  INITIAL_POSTS,
  INITIAL_PHOTOS,
  INITIAL_REGISTRATIONS,
  INITIAL_STAFF,
  INITIAL_FIELD_LOGS,
  INITIAL_PAYMENTS,
  INITIAL_DOCUMENT_VERIFICATIONS,
  INITIAL_ABOUT_CONTENT,
  INITIAL_BOARD_MEMBERS,
  INITIAL_AUDIT_LOGS
} from './data/portalData';
import {
  auth,
  db,
  doc,
  onAuthStateChanged,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  testFirestoreConnection,
  saveDocumentToFirestore,
  saveUxPreferencesToFirestore,
  saveGlobalDocToFirestore,
  deleteGlobalDocFromFirestore,
  handleFirestoreError,
  resolveUserRole,
  OperationType,
  DEFAULT_UI_CONFIG,
  type UiConfigDoc,
  type UxPreferencesDoc
} from './services/firebase';
import { SiteAutoTranslator } from './services/autoTranslate';
import {
  OfflineFieldStatusBanner,
  loadOfflineExpeditionSnapshot,
  saveOfflineExpeditionSnapshot
} from './components/PWAOfflineManager';
import { ArrowRight, ShieldCheck, Lock, UserCheck, Globe, AlertTriangle } from 'lucide-react';
import {
  resolveSeoMetadata,
  getRedirectDestination
} from './data/seoRoutes';

function normalizePathname(rawPath: string): string {
  if (!rawPath) return '/';
  const withoutQuery = rawPath.split('?')[0].split('#')[0];
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery || '/';
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('uge_preferred_language') as Language | null;
      if (saved && ['EN', 'AR', 'ZH', 'FR'].includes(saved)) {
        return saved;
      }
      const navLang = (navigator.language || '').toLowerCase();
      if (navLang.startsWith('ar')) return 'AR';
      if (navLang.startsWith('zh')) return 'ZH';
      if (navLang.startsWith('fr')) return 'FR';
    }
    return 'EN';
  });
  const [isAutoTranslating, setIsAutoTranslating] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );
  const [uiConfig, setUiConfig] = useState<UiConfigDoc>(DEFAULT_UI_CONFIG);

  // Modal states
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isCardPaymentOpen, setIsCardPaymentOpen] = useState(false);
  const [isDocVerificationOpen, setIsDocVerificationOpen] = useState(false);
  const [isPortalAuthOpen, setIsPortalAuthOpen] = useState(false);
  const [portalAuthInitialRole, setPortalAuthInitialRole] = useState<'client' | 'staff' | 'admin'>(
    'client'
  );
  const [activeUserRole, setActiveUserRole] = useState<'client' | 'staff' | 'admin'>('client');
  const [hasLoggedInSession, setHasLoggedInSession] = useState<boolean>(false);
  const [authenticatedIdentity, setAuthenticatedIdentity] = useState<string>('');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isInvoiceReceiptOpen, setIsInvoiceReceiptOpen] = useState(false);
  const [invoiceReceiptData, setInvoiceReceiptData] = useState<InvoiceReceiptData | null>(null);

  // Portal Fullscreen Views
  const [isClientPortalOpen, setIsClientPortalOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const norm = normalizePathname(window.location.pathname);
    const params = new URLSearchParams(window.location.search);
    return norm === '/portal' || Boolean(params.get('ref') || params.get('tx'));
  });
  const [clientPortalEmailFilter, setClientPortalEmailFilter] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('email') || '';
  });
  const [clientPortalRefFilter, setClientPortalRefFilter] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || params.get('tx') || '';
  });
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<
    | 'content'
    | 'photos'
    | 'about-board'
    | 'registrations'
    | 'doc-verifications'
    | 'payments'
    | 'staff'
    | 'audit-logs'
    | 'gateway'
    | 'gold-trends'
  >('content');
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);

  // Selected parameters for /apply and payment modals
  const [selectedTier, setSelectedTier] = useState<'academic' | 'trader' | 'sovereign'>('trader');
  const [selectedCohortForApply, setSelectedCohortForApply] = useState<string | undefined>(
    undefined
  );
  const [paymentType, setPaymentType] = useState<'full' | 'doc_verification'>('full');
  const [preloadedScamNotes, setPreloadedScamNotes] = useState<string>('');

  // Portal Data States (Initialized from latest cached offline expedition snapshot if available)
  const cachedOfflineSnapshot = loadOfflineExpeditionSnapshot();
  const [posts, setPosts] = useState<ContentPost[]>(
    () => (cachedOfflineSnapshot?.posts as ContentPost[]) || INITIAL_POSTS
  );
  const [photos, setPhotos] = useState<PhotoItem[]>(
    () => (cachedOfflineSnapshot?.photos as PhotoItem[]) || INITIAL_PHOTOS
  );
  const [aboutContent, setAboutContent] = useState<AboutContent>(
    () => (cachedOfflineSnapshot?.aboutContent as AboutContent) || INITIAL_ABOUT_CONTENT
  );
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(
    () => (cachedOfflineSnapshot?.boardMembers as BoardMember[]) || INITIAL_BOARD_MEMBERS
  );
  const [registrations, setRegistrations] = useState<ExpeditionRegistration[]>(
    () =>
      (cachedOfflineSnapshot?.registrations as ExpeditionRegistration[]) || INITIAL_REGISTRATIONS
  );
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [fieldLogs, setFieldLogs] = useState<FieldLog[]>(
    () => (cachedOfflineSnapshot?.fieldLogs as FieldLog[]) || INITIAL_FIELD_LOGS
  );
  const [payments, setPayments] = useState<PaymentRecord[]>(
    () => (cachedOfflineSnapshot?.payments as PaymentRecord[]) || INITIAL_PAYMENTS
  );
  const [documentVerifications, setDocumentVerifications] = useState<DocumentVerification[]>(
    () =>
      (cachedOfflineSnapshot?.documentVerifications as DocumentVerification[]) ||
      INITIAL_DOCUMENT_VERIFICATIONS
  );
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(
    () => (cachedOfflineSnapshot?.auditLogs as AdminAuditLog[]) || INITIAL_AUDIT_LOGS
  );

  // Sync latest expedition & dossier state into local offline snapshot for remote field access
  useEffect(() => {
    saveOfflineExpeditionSnapshot({
      posts,
      photos,
      aboutContent,
      boardMembers,
      registrations,
      fieldLogs,
      payments,
      documentVerifications,
      auditLogs
    });
  }, [
    posts,
    photos,
    aboutContent,
    boardMembers,
    registrations,
    fieldLogs,
    payments,
    documentVerifications,
    auditLogs
  ]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update page title, meta description, canonical, robots, OpenGraph, and JSON-LD per route
  useEffect(() => {
    const redirectTarget = getRedirectDestination(currentPath);
    if (redirectTarget) {
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', redirectTarget);
      }
      setCurrentPath(redirectTarget);
      return;
    }

    const meta = resolveSeoMetadata(currentPath);
    document.title = meta.title;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="robots"]', meta.robots);
    setMetaContent('meta[property="og:type"]', meta.ogType);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', meta.canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', meta.canonicalUrl);
    }

    const ldScript =
      document.getElementById('uge-json-ld') ||
      document.getElementById('seo-structured-data');
    if (ldScript) {
      ldScript.textContent = JSON.stringify(meta.jsonLd);
    }
  }, [currentPath]);

  const handleNavigate = (targetUrl: string) => {
    // Parse query params if navigating to /apply?tier=... or /portal?ref=...
    if (targetUrl.includes('?')) {
      const [base, queryStr] = targetUrl.split('?');
      const params = new URLSearchParams(queryStr);
      const tierParam = params.get('tier');
      if (tierParam === 'academic' || tierParam === 'trader' || tierParam === 'sovereign') {
        setSelectedTier(tierParam);
      }
      const refParam = params.get('ref') || params.get('tx');
      const emailParam = params.get('email');
      const rawNorm = normalizePathname(base);
      const norm = getRedirectDestination(rawNorm) || rawNorm;
      const finalTargetUrl = `${norm}?${queryStr}`;
      if (norm === '/portal') {
        if (refParam) setClientPortalRefFilter(refParam);
        if (emailParam) setClientPortalEmailFilter(emailParam);
        setIsClientPortalOpen(true);
      }
      if (
        typeof window !== 'undefined' &&
        window.location.pathname + window.location.search !== finalTargetUrl
      ) {
        window.history.pushState({}, '', finalTargetUrl);
      }
      setCurrentPath(norm);
    } else {
      const rawNorm = normalizePathname(targetUrl);
      const norm = getRedirectDestination(rawNorm) || rawNorm;
      if (norm === '/portal') {
        setIsClientPortalOpen(true);
      }
      if (typeof window !== 'undefined' && window.location.pathname !== norm) {
        window.history.pushState({}, '', norm);
      }
      setCurrentPath(norm);
    }

    const savedPage = normalizePathname(targetUrl);
    saveUxPreferencesToFirestore({
      language: currentLang,
      currency: selectedCurrency,
      defaultPage: getRedirectDestination(savedPage) || savedPage
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch initial portal data from backend if available & initialize Firestore connection check
  useEffect(() => {
    testFirestoreConnection();

    fetch('/api/portal/data')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
        if (data.photos) setPhotos(data.photos);
        if (data.aboutContent) setAboutContent(data.aboutContent);
        if (data.boardMembers) setBoardMembers(data.boardMembers);
        if (data.registrations) setRegistrations(data.registrations);
        if (data.fieldLogs) setFieldLogs(data.fieldLogs);
        if (data.payments) setPayments(data.payments);
        if (data.documentVerifications) setDocumentVerifications(data.documentVerifications);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
      })
      .catch(() => {
        // Fallback to local state if offline or initial load
      });

    // Auto-detect visitor locale & currency if no manual language preference is stored yet
    if (typeof window !== 'undefined' && !window.localStorage.getItem('uge_preferred_language')) {
      fetch('/api/geo/detect')
        .then((res) => res.json())
        .then((geo) => {
          if (
            geo?.proposedLang &&
            ['EN', 'AR', 'ZH', 'FR'].includes(geo.proposedLang) &&
            !window.localStorage.getItem('uge_preferred_language')
          ) {
            setCurrentLang(geo.proposedLang as Language);
          }
          setSelectedCurrency('USD');
        })
        .catch(() => {});
    }
  }, []);

  // Subscribe to per-user Firestore collections and UX/UI preferences when authenticated
  useEffect(() => {
    let unsubRegs: (() => void) | null = null;
    let unsubDocs: (() => void) | null = null;
    let unsubUxPrefs: (() => void) | null = null;
    let unsubUiConfig: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (unsubRegs) {
        unsubRegs();
        unsubRegs = null;
      }
      if (unsubDocs) {
        unsubDocs();
        unsubDocs = null;
      }
      if (unsubUxPrefs) {
        unsubUxPrefs();
        unsubUxPrefs = null;
      }
      if (unsubUiConfig) {
        unsubUiConfig();
        unsubUiConfig = null;
      }

      if (!user) return;

      // Sync Firestore subscriptions for the current Firebase user without auto-opening the top role bar until explicit portal login
      resolveUserRole(user).catch(() => {});

      unsubUxPrefs = onSnapshot(
        doc(db, 'uxPreferences', user.uid),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as UxPreferencesDoc;
            if (data.language) setCurrentLang(data.language);
            setSelectedCurrency('USD');
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.GET, `uxPreferences/${user.uid}`);
        }
      );

      unsubUiConfig = onSnapshot(
        doc(db, 'uiConfig', 'global'),
        (snap) => {
          if (snap.exists()) {
            setUiConfig(snap.data() as UiConfigDoc);
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.GET, 'uiConfig/global');
        }
      );

      const unsubAbout = onSnapshot(
        doc(db, 'aboutContent', 'main'),
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as AboutContent;
            if (data.headline) setAboutContent((prev) => ({ ...prev, ...data }));
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.GET, 'aboutContent/main');
        }
      );

      const unsubBoard = onSnapshot(
        collection(db, 'boardMembers'),
        (snapshot) => {
          const firestoreBoard = snapshot.docs.map((d) => d.data() as BoardMember);
          if (firestoreBoard.length > 0) {
            setBoardMembers((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestoreBoard.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'boardMembers');
        }
      );

      const postsQuery = query(collection(db, 'posts'), where('published', '==', true));
      const unsubPosts = onSnapshot(
        postsQuery,
        (snapshot) => {
          const firestorePosts = snapshot.docs.map((d) => d.data() as ContentPost);
          if (firestorePosts.length > 0) {
            setPosts((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestorePosts.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'posts');
        }
      );

      const unsubPhotos = onSnapshot(
        collection(db, 'photos'),
        (snapshot) => {
          const firestorePhotos = snapshot.docs.map((d) => d.data() as PhotoItem);
          if (firestorePhotos.length > 0) {
            setPhotos((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestorePhotos.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'photos');
        }
      );

      const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
      const unsubPayments = onSnapshot(
        paymentsQuery,
        (snapshot) => {
          const firestorePayments = snapshot.docs.map((d) => d.data() as PaymentRecord);
          if (firestorePayments.length > 0) {
            setPayments((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestorePayments.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'payments');
        }
      );

      const regsQuery = query(
        collection(db, 'registrations'),
        where('userId', '==', user.uid)
      );
      unsubRegs = onSnapshot(
        regsQuery,
        (snapshot) => {
          const firestoreRegs = snapshot.docs.map((d) => d.data() as ExpeditionRegistration);
          if (firestoreRegs.length > 0) {
            setRegistrations((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestoreRegs.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'registrations');
        }
      );

      const docsQuery = query(
        collection(db, 'documentVerifications'),
        where('userId', '==', user.uid)
      );
      unsubDocs = onSnapshot(
        docsQuery,
        (snapshot) => {
          const firestoreDocs = snapshot.docs.map((d) => d.data() as DocumentVerification);
          if (firestoreDocs.length > 0) {
            setDocumentVerifications((prev) => {
              const map = new Map(prev.map((item) => [item.id, item]));
              firestoreDocs.forEach((item) => map.set(item.id, item));
              return Array.from(map.values());
            });
          }
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, 'documentVerifications');
        }
      );

      const prevCleanup = unsubUiConfig;
      unsubUiConfig = () => {
        if (prevCleanup) prevCleanup();
        unsubAbout();
        unsubBoard();
        unsubPosts();
        unsubPhotos();
        unsubPayments();
      };
    });

    return () => {
      unsubAuth();
      if (unsubRegs) unsubRegs();
      if (unsubDocs) unsubDocs();
      if (unsubUxPrefs) unsubUxPrefs();
      if (unsubUiConfig) unsubUiConfig();
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('uge_preferred_language', lang);
      } catch {
        // Ignore storage write errors
      }
    }
    saveUxPreferencesToFirestore({
      language: lang,
      currency: selectedCurrency,
      defaultPage: currentPath
    });
  };

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    saveUxPreferencesToFirestore({
      language: currentLang,
      currency,
      defaultPage: currentPath
    });
  };

  const recordAdminAuditLog = async (entry: {
    category: AdminAuditLog['category'];
    action: string;
    targetId: string;
    details: string;
  }) => {
    const actorEmail =
      auth.currentUser?.email ||
      authenticatedIdentity ||
      (activeUserRole === 'staff' ? 'mwesigye@ugandagold.org' : 'mugisolo@gmail.com');
    const actorRole: 'admin' | 'staff' = activeUserRole === 'staff' ? 'staff' : 'admin';
    const newLog: AdminAuditLog = {
      id: `AUDIT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actorEmail,
      actorRole,
      category: entry.category,
      action: entry.action,
      targetId: entry.targetId || 'portal',
      details: entry.details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    try {
      await fetch('/api/portal/audit-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      });
    } catch {}
    saveGlobalDocToFirestore('auditLogs', newLog.id, newLog);
  };

  const handleUpdateUiConfig = async (updates: Partial<UiConfigDoc>) => {
    const nextConfig: UiConfigDoc = {
      ...uiConfig,
      ...updates,
      id: 'global',
      updatedBy: auth.currentUser?.email || 'mugisolo@gmail.com',
      updatedAt: new Date().toISOString()
    };
    setUiConfig(nextConfig);
    await saveGlobalDocToFirestore('uiConfig', 'global', nextConfig);
    recordAdminAuditLog({
      category: 'ux_config',
      action: 'Updated Global UX/UI Configuration',
      targetId: 'uiConfig/global',
      details: `Updated global UX/UI configuration keys: ${Object.keys(updates).join(', ')}.`
    });
  };

  const handleRecordPayment = (newPayment: PaymentRecord) => {
    setPayments((prev) => [newPayment, ...prev]);
    if (newPayment?.id) {
      saveDocumentToFirestore('payments', newPayment.id, newPayment);
    }
  };

  const handleOpenAdminWithTab = (
    tab:
      | 'content'
      | 'photos'
      | 'about-board'
      | 'registrations'
      | 'doc-verifications'
      | 'payments'
      | 'staff'
      | 'audit-logs'
      | 'gateway'
      | 'gold-trends' = 'content'
  ) => {
    setAdminInitialTab(tab);
    if (isAdminAuthenticated) {
      setIsAdminPortalOpen(true);
    } else {
      setPortalAuthInitialRole('admin');
      setIsPortalAuthOpen(true);
    }
  };

  const handleRequestStaffPortal = () => {
    if (isStaffAuthenticated) {
      setIsStaffPortalOpen(true);
    } else {
      setPortalAuthInitialRole('staff');
      setIsPortalAuthOpen(true);
    }
  };

  const handleSelectTierForApply = (
    tier: 'academic' | 'trader' | 'sovereign',
    cohort?: string
  ) => {
    setSelectedTier(tier);
    if (cohort) setSelectedCohortForApply(cohort);
    handleNavigate(`/apply?tier=${tier}`);
  };

  const handleOpenCardPayment = (
    tier?: 'academic' | 'trader' | 'sovereign',
    type: 'full' | 'doc_verification' = 'full'
  ) => {
    if (tier) setSelectedTier(tier);
    setPaymentType(type);
    setIsCardPaymentOpen(true);
  };

  const handleOpenClientPortal = (email: string = '', refId: string = '') => {
    setClientPortalEmailFilter(email);
    setClientPortalRefFilter(refId);
    setIsClientPortalOpen(true);
  };

  const handleVerificationCreated = (newVerification: DocumentVerification) => {
    setDocumentVerifications((prev) => [newVerification, ...prev]);
    if (newVerification?.id) {
      saveDocumentToFirestore('documentVerifications', newVerification.id, newVerification);
      handleRecordPayment({
        id: `PAY-${Date.now().toString().slice(-6)}`,
        reference:
          newVerification.paymentRef || `UGE-CARD-DOC-${Date.now().toString().slice(-4)}`,
        customerName: newVerification.clientName,
        email: newVerification.email,
        amount: 2500,
        currency: 'USD',
        type: 'doc_verification',
        status: 'Completed',
        cardBrand: 'Visa',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        tier: '24–72 Hour Offer Verification ($2,500, VAT Incl.)'
      });
    }
  };

  // --- ADMIN CMS & PORTAL CRUD HANDLERS ---
  const handleAddPost = async (newPostData: Omit<ContentPost, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/portal/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostData)
      });
      const data = await res.json();
      if (data.success && data.post) {
        setPosts((prev) => [data.post, ...prev]);
        saveGlobalDocToFirestore('posts', data.post.id, data.post);
        recordAdminAuditLog({
          category: 'content_update',
          action: 'Created Blog Article',
          targetId: data.post.id,
          details: `Published article "${data.post.title}" (${data.post.category}) by ${data.post.author}.`
        });
        return;
      }
    } catch {}
    const localPost: ContentPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setPosts((prev) => [localPost, ...prev]);
    saveGlobalDocToFirestore('posts', localPost.id, localPost);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Created Blog Article',
      targetId: localPost.id,
      details: `Published article "${localPost.title}" (${localPost.category}) by ${localPost.author}.`
    });
  };

  const handleUpdatePost = async (id: string, updates: Partial<ContentPost>) => {
    try {
      await fetch(`/api/portal/post/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          saveGlobalDocToFirestore('posts', id, updated);
          return updated;
        }
        return p;
      })
    );
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Updated Blog Article',
      targetId: id,
      details: `Modified article "${updates.title || id}" (${Object.keys(updates).join(', ')}).`
    });
  };

  const handleDeletePost = async (id: string) => {
    const target = posts.find((p) => p.id === id);
    try {
      await fetch(`/api/portal/post/${id}`, { method: 'DELETE' });
    } catch {}
    setPosts((prev) => prev.filter((p) => p.id !== id));
    deleteGlobalDocFromFirestore('posts', id);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Deleted Blog Article',
      targetId: id,
      details: `Deleted article "${target?.title || id}" from Insights library.`
    });
  };

  const handleAddPhoto = async (newPhotoData: Omit<PhotoItem, 'id' | 'dateAdded'>) => {
    try {
      const res = await fetch('/api/portal/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhotoData)
      });
      const data = await res.json();
      if (data.success && data.photo) {
        setPhotos((prev) => [data.photo, ...prev]);
        saveGlobalDocToFirestore('photos', data.photo.id, data.photo);
        recordAdminAuditLog({
          category: 'content_update',
          action: 'Added Gallery Photo Asset',
          targetId: data.photo.id,
          details: `Uploaded photo "${data.photo.title}" under category "${data.photo.category}".`
        });
        return;
      }
    } catch {}
    const localPhoto: PhotoItem = {
      ...newPhotoData,
      id: `photo-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setPhotos((prev) => [localPhoto, ...prev]);
    saveGlobalDocToFirestore('photos', localPhoto.id, localPhoto);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Added Gallery Photo Asset',
      targetId: localPhoto.id,
      details: `Uploaded photo "${localPhoto.title}" under category "${localPhoto.category}".`
    });
  };

  const handleUpdatePhoto = async (id: string, updates: Partial<PhotoItem>) => {
    try {
      await fetch(`/api/portal/photo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setPhotos((prev) =>
      prev.map((ph) => {
        if (ph.id === id) {
          const updated = { ...ph, ...updates };
          saveGlobalDocToFirestore('photos', id, updated);
          return updated;
        }
        return ph;
      })
    );
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Updated Gallery Photo Asset',
      targetId: id,
      details: `Updated photo asset "${updates.title || id}" (${Object.keys(updates).join(', ')}).`
    });
  };

  const handleDeletePhoto = async (id: string) => {
    const target = photos.find((p) => p.id === id);
    try {
      await fetch(`/api/portal/photo/${id}`, { method: 'DELETE' });
    } catch {}
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    deleteGlobalDocFromFirestore('photos', id);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Deleted Gallery Photo Asset',
      targetId: id,
      details: `Removed photo "${target?.title || id}" from media vault.`
    });
  };

  const handleUpdateAboutContent = async (updates: Partial<AboutContent>) => {
    try {
      await fetch('/api/portal/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setAboutContent((prev) => {
      const updated = { ...prev, ...updates };
      saveGlobalDocToFirestore('aboutContent', 'main', {
        id: 'main',
        ...updated,
        updatedAt: new Date().toISOString()
      });
      return updated;
    });
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Updated About Us Institutional Copy',
      targetId: 'aboutContent/main',
      details: `Updated About Us copy and mandate fields (${Object.keys(updates).join(', ')}).`
    });
  };

  const handleAddBoardMember = async (newMemberData: Omit<BoardMember, 'id'>) => {
    try {
      const res = await fetch('/api/portal/board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMemberData)
      });
      const data = await res.json();
      if (data.success && data.member) {
        setBoardMembers((prev) => [...prev, data.member]);
        saveGlobalDocToFirestore('boardMembers', data.member.id, data.member);
        recordAdminAuditLog({
          category: 'content_update',
          action: 'Added Board Director Profile',
          targetId: data.member.id,
          details: `Added ${data.member.name} (${data.member.role}) to ${data.member.designation}.`
        });
        return;
      }
    } catch {}
    const localMember: BoardMember = {
      ...newMemberData,
      id: `board-${Date.now()}`
    };
    setBoardMembers((prev) => [...prev, localMember]);
    saveGlobalDocToFirestore('boardMembers', localMember.id, localMember);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Added Board Director Profile',
      targetId: localMember.id,
      details: `Added ${localMember.name} (${localMember.role}) to ${localMember.designation}.`
    });
  };

  const handleUpdateBoardMember = async (id: string, updates: Partial<BoardMember>) => {
    try {
      await fetch(`/api/portal/board/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setBoardMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const updated = { ...m, ...updates };
          saveGlobalDocToFirestore('boardMembers', id, updated);
          return updated;
        }
        return m;
      })
    );
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Updated Board Director Profile',
      targetId: id,
      details: `Updated Board profile for ${updates.name || id} (${Object.keys(updates).join(', ')}).`
    });
  };

  const handleDeleteBoardMember = async (id: string) => {
    const target = boardMembers.find((m) => m.id === id);
    try {
      await fetch(`/api/portal/board/${id}`, { method: 'DELETE' });
    } catch {}
    setBoardMembers((prev) => prev.filter((m) => m.id !== id));
    deleteGlobalDocFromFirestore('boardMembers', id);
    recordAdminAuditLog({
      category: 'content_update',
      action: 'Removed Board Director Profile',
      targetId: id,
      details: `Removed ${target?.name || id} from Board of Directors directory.`
    });
  };

  const handleUpdateRegistration = async (
    id: string,
    updates: Partial<ExpeditionRegistration>
  ) => {
    const target = registrations.find((r) => r.id === id);
    try {
      await fetch(`/api/portal/registration/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setRegistrations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ...updates };
          saveDocumentToFirestore('registrations', id, updated);
          return updated;
        }
        return r;
      })
    );
    recordAdminAuditLog({
      category: 'kyc_clearance',
      action: updates.status
        ? `Updated Registration Status to ${updates.status.toUpperCase()}`
        : 'Updated Delegate KYC Clearance',
      targetId: id,
      details: `Updated registration ${id} (${target?.fullName || 'Delegate'}): ${Object.entries(updates)
        .map(([k, v]) => `${k}=${String(v)}`)
        .join(', ')}.`
    });
  };

  const handleUpdateDocumentVerification = async (
    id: string,
    updates: Partial<DocumentVerification>
  ) => {
    const target = documentVerifications.find((d) => d.id === id);
    try {
      await fetch(`/api/verification/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setDocumentVerifications((prev) =>
      prev.map((docItem) => {
        if (docItem.id === id) {
          const updated = { ...docItem, ...updates };
          saveDocumentToFirestore('documentVerifications', id, updated);
          return updated;
        }
        return docItem;
      })
    );
    recordAdminAuditLog({
      category: 'document_approval',
      action:
        updates.status === 'dispatched_to_client'
          ? 'Approved & Dispatched 24–72h Verification Report'
          : 'Updated Document Verification Dossier',
      targetId: id,
      details: `Updated verification dossier ${id} (${target?.clientName || 'Client'} · ${target?.documentType || 'Offer'}): ${Object.entries(updates)
        .map(([k, v]) => `${k}=${String(v)}`)
        .join(', ')}.`
    });
  };

  const handleUpdateStaffRole = (staffId: string, updates: Partial<StaffMember>) => {
    const target = staff.find((s) => s.id === staffId);
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, ...updates } : s))
    );
    recordAdminAuditLog({
      category: 'user_role_change',
      action: updates.accessLevel
        ? `Changed System Access Level to ${updates.accessLevel.toUpperCase()}`
        : `Updated Operational Role Designation`,
      targetId: staffId,
      details: `Updated role/access permissions for ${target?.name || staffId} (${target?.email || ''}): ${Object.entries(updates)
        .map(([k, v]) => `${k}=${String(v)}`)
        .join(', ')}.`
    });
  };

  const handleAddFieldLog = async (logData: Omit<FieldLog, 'id' | 'logDate'>) => {
    try {
      const res = await fetch('/api/portal/field-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
      const data = await res.json();
      if (data.success && data.log) {
        setFieldLogs((prev) => [data.log, ...prev]);
        saveDocumentToFirestore('fieldLogs', data.log.id, data.log);
        return;
      }
    } catch {}
    const localLog: FieldLog = {
      ...logData,
      id: `LOG-${Date.now().toString().slice(-3)}`,
      logDate: new Date().toISOString().split('T')[0]
    };
    setFieldLogs((prev) => [localLog, ...prev]);
    saveDocumentToFirestore('fieldLogs', localLog.id, localLog);
  };

  const handleSubmitRegistration = async (regData: ExpeditionRegistration) => {
    try {
      await fetch('/api/portal/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
    } catch {}
    setRegistrations((prev) => [regData, ...prev]);
    if (regData?.id) {
      saveDocumentToFirestore('registrations', regData.id, regData);
    }
  };

  // Render active route page
  const renderRouteContent = () => {
    if (currentPath === '/' || currentPath === '/portal') {
      return (
        <HomePage
          currency={selectedCurrency}
          onNavigate={handleNavigate}
          onOpenDocVerifyModal={() => setIsDocVerificationOpen(true)}
          onOpenRegistrationModal={(tier) => {
            if (tier === 'academic' || tier === 'trader' || tier === 'sovereign') {
              setSelectedTier(tier);
            }
            setIsRegistrationOpen(true);
          }}
          posts={posts}
        />
      );
    }

    if (currentPath === '/offer-verification' || currentPath === '/verification') {
      return (
        <VerificationPage
          currency={selectedCurrency}
          onOpenDocVerifyModal={() => setIsDocVerificationOpen(true)}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/expeditions') {
      return (
        <ExpeditionsOverviewPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (
      currentPath === '/expeditions/professional-traders' ||
      currentPath === '/expeditions/professional'
    ) {
      return (
        <ProfessionalExpeditionPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (
      currentPath === '/expeditions/academic-research' ||
      currentPath === '/expeditions/academic'
    ) {
      return (
        <AcademicExpeditionPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (
      currentPath === '/expeditions/institutional-vip' ||
      currentPath === '/expeditions/institutional'
    ) {
      return (
        <InstitutionalExpeditionPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (currentPath === '/expeditions/itinerary') {
      return (
        <ItineraryPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (
      currentPath === '/expeditions/dates-packages' ||
      currentPath === '/expeditions/dates' ||
      currentPath === '/packages'
    ) {
      return (
        <DatesPackagesPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
          onSelectTierForApply={handleSelectTierForApply}
        />
      );
    }

    if (currentPath === '/risk-compliance') {
      return (
        <RiskComplianceHubPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/risk-compliance/supply-chain') {
      return (
        <SupplyChainPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/risk-compliance/scam-check') {
      return (
        <ScamCheckPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <AboutUsPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          aboutContent={aboutContent}
          boardMembers={boardMembers}
          photos={photos}
          isFullPage={true}
          showAdminControls={isAdminAuthenticated}
          onBackToHome={() => handleNavigate('/')}
          onNavigate={handleNavigate}
          onOpenRegistration={() => handleNavigate('/apply')}
          onOpenDocVerification={() => handleNavigate('/offer-verification')}
          onOpenAdminPanel={() => handleOpenAdminWithTab('about-board')}
          onNavigateToBlog={() => handleNavigate('/insights')}
        />
      );
    }

    if (
      currentPath === '/insights' ||
      currentPath.startsWith('/insights/') ||
      currentPath === '/blog' ||
      currentPath.startsWith('/blog/')
    ) {
      const slug = currentPath.startsWith('/insights/')
        ? currentPath.replace('/insights/', '').trim()
        : currentPath.startsWith('/blog/')
        ? currentPath.replace('/blog/', '').trim()
        : undefined;
      return (
        <BlogPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          posts={posts}
          activePostId={slug}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/faq') {
      return (
        <div className="min-h-screen bg-[#0B0F17] pb-20">
          <div className="bg-[#080B11] border-b border-slate-800/80 py-2.5 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <p className="font-medium text-slate-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                Independent due diligence and field verification. We do not buy, sell, or broker gold.
              </p>
              <span className="text-[11px] font-mono text-slate-400">
                Frequently Asked Questions
              </span>
            </div>
          </div>
          <FaqSection
            currentLang={currentLang}
            selectedCurrency={selectedCurrency}
            onOpenDocVerification={() => handleNavigate('/offer-verification')}
            onOpenRegistration={() => handleNavigate('/apply')}
          />
        </div>
      );
    }

    if (currentPath === '/contact') {
      return (
        <ContactBriefingPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/apply') {
      return (
        <ApplicationWorkflowPage
          currentLang={currentLang}
          selectedCurrency={selectedCurrency}
          initialTier={selectedTier}
          initialCohort={selectedCohortForApply}
          initialNotes={preloadedScamNotes}
          onNavigate={handleNavigate}
          onSubmitRegistration={handleSubmitRegistration}
          onUpdateRegistration={handleUpdateRegistration}
          onRecordPayment={handleRecordPayment}
          onOpenClientPortal={(email) => handleOpenClientPortal(email)}
        />
      );
    }

    if (currentPath === '/charter') {
      return <LegalGovernancePage activeTab="charter" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/privacy') {
      return <LegalGovernancePage activeTab="privacy" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalGovernancePage activeTab="terms" onNavigate={handleNavigate} />;
    }

    // Unknown route: Dedicated 404 Not Found view
    return (
      <section className="min-h-[70vh] bg-[#0B0F17] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full bg-[#111722] border border-slate-800 rounded-2xl p-8 sm:p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
            HTTP 404 · Route Not Found
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            Page not found
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-8">
            The requested path (<code className="text-[#D4AF37] font-mono">{currentPath}</code>) does
            not match an active public briefing, verification desk, or field expedition page.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigate('/offer-verification')}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59f2d] text-slate-950 font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify an Offer</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/expeditions')}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              Explore Expeditions
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/risk-compliance')}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              Risk &amp; Compliance
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/insights')}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              Field Insights
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div
      dir={currentLang === 'AR' ? 'rtl' : 'ltr'}
      data-theme-accent={uiConfig.defaultThemeAccent}
      className="min-h-screen bg-[#0B0F17] text-slate-300 font-sans-ui selection:bg-[#D4AF37]/30 selection:text-white flex flex-col"
    >
      {/* Sitewide Automatic Page Translator */}
      <SiteAutoTranslator
        currentLang={currentLang}
        currentPath={currentPath}
        onStatusChange={setIsAutoTranslating}
      />

      {/* Public Navigation Header */}
      <Navbar
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        currentPath={currentPath}
        posts={posts}
        onNavigate={handleNavigate}
        onLanguageChange={handleLanguageChange}
        onOpenClientPortal={() => {
          if (hasLoggedInSession && activeUserRole === 'client') {
            handleOpenClientPortal(authenticatedIdentity);
          } else {
            setPortalAuthInitialRole('client');
            setIsPortalAuthOpen(true);
          }
        }}
      />

      {/* Offline Field Mode Connectivity & Service Worker Cache Banner */}
      <OfflineFieldStatusBanner
        onOpenClientPortal={() => handleOpenClientPortal(authenticatedIdentity)}
      />

      {/* Subtle Auto-Translation Progress Indicator when translating uncached page content */}
      {currentLang !== 'EN' && isAutoTranslating && (
        <div
          data-no-translate="true"
          className="bg-[#111722] border-b border-[#D4AF37]/30 px-4 py-1 text-[11px] font-mono-data text-[#D4AF37] flex items-center justify-center gap-2 print:hidden"
        >
          <Globe className="w-3.5 h-3.5 animate-pulse" />
          <span>
            Auto-translating page content ({currentLang})...
          </span>
        </div>
      )}

      {/* Role-Based Access Bar: Shown ONLY after the user has explicitly logged in, displaying ONLY the workspace permitted for their role */}
      {hasLoggedInSession && (
        <div className="bg-[#0E141F] border-b border-[#D4AF37]/30 px-4 sm:px-6 lg:px-8 py-2 print:hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded font-mono-data text-[10px] font-bold uppercase border ${
                  activeUserRole === 'admin'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50'
                    : activeUserRole === 'staff'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-500/50'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                }`}
              >
                {activeUserRole === 'admin'
                  ? 'Access Level: Administrator (Full Directorate Rights)'
                  : activeUserRole === 'staff'
                  ? 'Access Level: Staff Officer 1 (Assigned Dossiers & KYC)'
                  : 'Access Level: Client (Strictly Scoped to Your Files)'}
              </span>
              {authenticatedIdentity && (
                <span className="text-[11px] font-mono-data text-slate-400">
                  Signed in as <strong className="text-slate-200">{authenticatedIdentity}</strong>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activeUserRole === 'client' && (
                <button
                  type="button"
                  onClick={() => handleOpenClientPortal(authenticatedIdentity)}
                  className="px-2.5 py-1 rounded bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-600/50 text-emerald-300 font-mono-data text-[11px] font-bold transition-colors cursor-pointer"
                >
                  My Client Files
                </button>
              )}

              {activeUserRole === 'staff' && isStaffAuthenticated && (
                <button
                  type="button"
                  onClick={() => setIsStaffPortalOpen(true)}
                  className="px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-600/50 text-emerald-300 font-mono-data text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Staff Officer 1 Desk</span>
                </button>
              )}

              {activeUserRole === 'admin' && isAdminAuthenticated && (
                <button
                  type="button"
                  onClick={() => setIsAdminPortalOpen(true)}
                  className="px-2.5 py-1 rounded bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-mono-data text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Console</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setHasLoggedInSession(false);
                  setIsAdminAuthenticated(false);
                  setIsStaffAuthenticated(false);
                  setAuthenticatedIdentity('');
                  setIsAdminPortalOpen(false);
                  setIsStaffPortalOpen(false);
                  setIsClientPortalOpen(false);
                }}
                className="px-2.5 py-1 rounded bg-[#111722] hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700/60 text-slate-400 hover:text-rose-300 font-mono-data text-[11px] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Route View */}
      <main className="flex-1">{renderRouteContent()}</main>

      {/* Global Footer with Utility Links, Language & Currency Selectors, and Discreet Staff/Admin Sign-In */}
      <Footer
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        onLanguageChange={handleLanguageChange}
        onCurrencyChange={handleCurrencyChange}
        onNavigate={handleNavigate}
        onOpenStaffAuth={() => {
          setPortalAuthInitialRole('staff');
          setIsPortalAuthOpen(true);
        }}
        onOpenAdminAuth={() => handleOpenAdminWithTab('content')}
        onOpenInvoiceReceipt={() => {
          setInvoiceReceiptData(null);
          setIsInvoiceReceiptOpen(true);
        }}
      />

      {/* Sticky Mobile Primary Action Bar (Shown on mobile viewports when not already inside /offer-verification or /apply) */}
      {currentPath !== '/offer-verification' &&
        currentPath !== '/verification' &&
        currentPath !== '/apply' && (
          <div className="lg:hidden sticky bottom-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-semibold text-white block">Active gold offer or visit?</span>
              <span className="text-[11px] text-slate-400">24–72h Verification · 7-Day Expedition</span>
            </div>
            <button
              type="button"
              onClick={() =>
                handleNavigate(
                  currentPath.startsWith('/expeditions') ? '/apply' : '/offer-verification'
                )
              }
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-slate-950 font-semibold text-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {currentPath.startsWith('/expeditions') ? 'Start Application' : 'Verify an Offer'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MODALS (Preserved for Portal & Operational Workflows) */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        preselectedTier={selectedTier}
        preloadedOfferNotes={preloadedScamNotes}
        onProceedToCardPayment={(tier, type) => handleOpenCardPayment(tier, type)}
        onSubmitRegistration={handleSubmitRegistration}
      />

      <CardPaymentModal
        isOpen={isCardPaymentOpen}
        onClose={() => setIsCardPaymentOpen(false)}
        selectedTier={selectedTier}
        defaultPaymentType={paymentType}
        onPaymentRecorded={handleRecordPayment}
        onOpenInvoiceReceipt={(data) => {
          setIsCardPaymentOpen(false);
          setInvoiceReceiptData(data);
          setIsInvoiceReceiptOpen(true);
        }}
      />

      <InvoiceReceiptModal
        isOpen={isInvoiceReceiptOpen}
        onClose={() => setIsInvoiceReceiptOpen(false)}
        initialData={invoiceReceiptData}
        selectedCurrency={selectedCurrency}
        onAiReceiptGenerated={(verRecord, payRecord) => {
          setDocumentVerifications((prev) => [verRecord, ...prev]);
          if (verRecord?.id) {
            saveDocumentToFirestore('documentVerifications', verRecord.id, verRecord);
          }
          handleRecordPayment(payRecord);
        }}
        onVerifyRecordInPortal={(refId, email) => {
          setIsInvoiceReceiptOpen(false);
          handleOpenClientPortal(email, refId);
        }}
      />

      <DocumentVerificationModal
        isOpen={isDocVerificationOpen}
        onClose={() => setIsDocVerificationOpen(false)}
        onVerificationCreated={handleVerificationCreated}
        onOpenClientPortal={(clientEmail: string) => handleOpenClientPortal(clientEmail)}
      />

      <BriefingModal isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />

      <PortalAuthModal
        isOpen={isPortalAuthOpen}
        initialRole={portalAuthInitialRole}
        onClose={() => setIsPortalAuthOpen(false)}
        onOpenAdmin={() => {
          setHasLoggedInSession(true);
          setActiveUserRole('admin');
          setAuthenticatedIdentity(auth.currentUser?.email || 'mugisolo@gmail.com');
          setIsAdminAuthenticated(true);
          setIsStaffAuthenticated(false);
          setIsAdminPortalOpen(true);
        }}
        onOpenStaff={() => {
          setHasLoggedInSession(true);
          setActiveUserRole('staff');
          setAuthenticatedIdentity('mwesigye@ugandagold.org');
          setIsStaffAuthenticated(true);
          setIsAdminAuthenticated(false);
          setIsStaffPortalOpen(true);
        }}
        onOpenClientPortal={(email?: string) => {
          setHasLoggedInSession(true);
          setActiveUserRole('client');
          setIsAdminAuthenticated(false);
          setIsStaffAuthenticated(false);
          const resolvedEmail = email || auth.currentUser?.email || 'h.lindqvist@nordicbullion.se';
          setAuthenticatedIdentity(resolvedEmail);
          handleOpenClientPortal(resolvedEmail);
        }}
      />

      {/* AUTHENTICATED CLIENT, ADMIN & STAFF PORTALS */}
      {isClientPortalOpen && (
        <ClientPortal
          documentVerifications={documentVerifications}
          registrations={registrations}
          initialClientEmail={clientPortalEmailFilter}
          initialReferenceId={clientPortalRefFilter}
          selectedCurrency={selectedCurrency}
          userRole={activeUserRole}
          onClose={() => {
            setIsClientPortalOpen(false);
            setClientPortalRefFilter('');
            if (currentPath === '/portal') {
              handleNavigate('/');
            }
          }}
          onOpenDocVerification={() => {
            setIsClientPortalOpen(false);
            handleNavigate('/offer-verification');
          }}
          onOpenRegistration={() => {
            setIsClientPortalOpen(false);
            handleNavigate('/apply');
          }}
          onOpenCardPayment={(tier, type) => {
            setIsClientPortalOpen(false);
            handleOpenCardPayment(tier, type);
          }}
          onOpenStaffPortal={() => {
            setIsClientPortalOpen(false);
            handleRequestStaffPortal();
          }}
          onOpenAdminPortal={() => {
            setIsClientPortalOpen(false);
            handleOpenAdminWithTab('content');
          }}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onAiReceiptGenerated={(verRecord, payRecord) => {
            setDocumentVerifications((prev) => [verRecord, ...prev]);
            if (verRecord?.id) {
              saveDocumentToFirestore('documentVerifications', verRecord.id, verRecord);
            }
            handleRecordPayment(payRecord);
          }}
        />
      )}

      {isAdminPortalOpen && isAdminAuthenticated && (
        <AdminPortal
          posts={posts}
          photos={photos}
          boardMembers={boardMembers}
          aboutContent={aboutContent}
          registrations={registrations}
          documentVerifications={documentVerifications}
          staff={staff}
          payments={payments}
          auditLogs={auditLogs}
          selectedCurrency={selectedCurrency}
          uiConfig={uiConfig}
          onUpdateUiConfig={handleUpdateUiConfig}
          initialTab={adminInitialTab}
          onAddPost={handleAddPost}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          onAddPhoto={handleAddPhoto}
          onUpdatePhoto={handleUpdatePhoto}
          onDeletePhoto={handleDeletePhoto}
          onUpdateAboutContent={handleUpdateAboutContent}
          onAddBoardMember={handleAddBoardMember}
          onUpdateBoardMember={handleUpdateBoardMember}
          onDeleteBoardMember={handleDeleteBoardMember}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onUpdateStaffRole={handleUpdateStaffRole}
          onRecordAuditLog={recordAdminAuditLog}
          onClose={() => setIsAdminPortalOpen(false)}
          onSwitchToStaff={() => {
            setIsAdminPortalOpen(false);
            handleRequestStaffPortal();
          }}
        />
      )}

      {isStaffPortalOpen && isStaffAuthenticated && (
        <StaffPortal
          registrations={registrations}
          documentVerifications={documentVerifications}
          fieldLogs={fieldLogs}
          staff={staff}
          canAccessAdmin={isAdminAuthenticated || activeUserRole === 'admin'}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onAddFieldLog={handleAddFieldLog}
          onClose={() => setIsStaffPortalOpen(false)}
          onSwitchToAdmin={() => {
            setIsStaffPortalOpen(false);
            handleOpenAdminWithTab('content');
          }}
          onSwitchToClientPortal={() => {
            setIsStaffPortalOpen(false);
            setIsClientPortalOpen(true);
          }}
        />
      )}
    </div>
  );
}
