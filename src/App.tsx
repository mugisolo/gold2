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
  AboutContent
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketReality } from './components/MarketReality';
import { SupplyChainPipeline } from './components/SupplyChainPipeline';
import { Itinerary } from './components/Itinerary';
import { ScamImmunityTool } from './components/ScamImmunityTool';
import { PricingPackages } from './components/PricingPackages';
import { AboutUsPage } from './components/AboutUsPage';
import { BlogPage } from './components/BlogPage';
import { FaqSection } from './components/FaqSection';
import { MemberChatAndWabaWidget } from './components/MemberChatAndWabaWidget';
import { LegalCharter } from './components/LegalCharter';
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
  INITIAL_BOARD_MEMBERS
} from './data/portalData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [activePage, setActivePage] = useState<'home' | 'about' | 'blog'>('home');

  // Modal states
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isCardPaymentOpen, setIsCardPaymentOpen] = useState(false);
  const [isDocVerificationOpen, setIsDocVerificationOpen] = useState(false);
  const [isPortalAuthOpen, setIsPortalAuthOpen] = useState(false);
  const [portalAuthInitialRole, setPortalAuthInitialRole] = useState<'client' | 'staff' | 'admin'>('client');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isInvoiceReceiptOpen, setIsInvoiceReceiptOpen] = useState(false);
  const [invoiceReceiptData, setInvoiceReceiptData] = useState<InvoiceReceiptData | null>(null);

  // Portal Fullscreen Views
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [clientPortalEmailFilter, setClientPortalEmailFilter] = useState<string>('');
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<
    'content' | 'photos' | 'about-board' | 'registrations' | 'doc-verifications' | 'payments' | 'staff' | 'gateway'
  >('content');
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);

  // Member AI Chatbot & WhatsApp Business (WABA) Drawer State
  const [isChatWabaOpen, setIsChatWabaOpen] = useState(false);
  const [chatWabaTab, setChatWabaTab] = useState<'chat' | 'waba'>('chat');

  const handleOpenChatAndWaba = (defaultMode: 'chat' | 'waba' = 'chat') => {
    setChatWabaTab(defaultMode);
    setIsChatWabaOpen(true);
  };

  // Selected parameters
  const [selectedTier, setSelectedTier] = useState<'academic' | 'trader' | 'sovereign'>('trader');
  const [paymentType, setPaymentType] = useState<'full' | 'doc_verification'>('full');
  const [preloadedScamNotes, setPreloadedScamNotes] = useState<string>('');

  // Portal Data States
  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [aboutContent, setAboutContent] = useState<AboutContent>(INITIAL_ABOUT_CONTENT);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(INITIAL_BOARD_MEMBERS);
  const [registrations, setRegistrations] = useState<ExpeditionRegistration[]>(INITIAL_REGISTRATIONS);
  const [staff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [fieldLogs, setFieldLogs] = useState<FieldLog[]>(INITIAL_FIELD_LOGS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [documentVerifications, setDocumentVerifications] = useState<DocumentVerification[]>(
    INITIAL_DOCUMENT_VERIFICATIONS
  );

  // Fetch initial portal data from backend if available
  useEffect(() => {
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
      })
      .catch(() => {
        // Fallback to local state if offline or initial load
      });
  }, []);

  const handleApplyGeoProposal = (lang: Language, currency: Currency) => {
    setCurrentLang(lang);
    setSelectedCurrency(currency);
  };

  const handleNavigatePage = (page: 'home' | 'about' | 'blog', sectionId?: string) => {
    setActivePage(page);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdminWithTab = (
    tab: 'content' | 'photos' | 'about-board' | 'registrations' | 'doc-verifications' | 'payments' | 'staff' | 'gateway' = 'content'
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

  const handleOpenRegistrationForTier = (tier: 'academic' | 'trader' | 'sovereign') => {
    setSelectedTier(tier);
    setIsRegistrationOpen(true);
  };

  const handleOpenCardPayment = (
    tier?: 'academic' | 'trader' | 'sovereign',
    type: 'full' | 'doc_verification' = 'full'
  ) => {
    if (tier) setSelectedTier(tier);
    setPaymentType(type);
    setIsCardPaymentOpen(true);
  };

  const handleOpenClientPortal = (email: string = '') => {
    setClientPortalEmailFilter(email);
    setIsClientPortalOpen(true);
  };

  const handleApplyWithScamData = (score: number, flaggedIds: string[]) => {
    const notes = `Diagnosed Risk Score: ${score.toFixed(
      0
    )}%. Flagged Red Flags: ${flaggedIds.join(
      ', '
    )}. Requested for confidential forensic audit. Note: Full package payment includes mandatory USD 1,000 KYC & Client Vetting Allocation.`;
    setPreloadedScamNotes(notes);
    setIsRegistrationOpen(true);
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
        return;
      }
    } catch {}
    const localPost: ContentPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setPosts((prev) => [localPost, ...prev]);
  };

  const handleUpdatePost = async (id: string, updates: Partial<ContentPost>) => {
    try {
      await fetch(`/api/portal/post/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleDeletePost = async (id: string) => {
    try {
      await fetch(`/api/portal/post/${id}`, { method: 'DELETE' });
    } catch {}
    setPosts((prev) => prev.filter((p) => p.id !== id));
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
        return;
      }
    } catch {}
    const localPhoto: PhotoItem = {
      ...newPhotoData,
      id: `photo-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setPhotos((prev) => [localPhoto, ...prev]);
  };

  const handleUpdatePhoto = async (id: string, updates: Partial<PhotoItem>) => {
    try {
      await fetch(`/api/portal/photo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setPhotos((prev) => prev.map((ph) => (ph.id === id ? { ...ph, ...updates } : ph)));
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      await fetch(`/api/portal/photo/${id}`, { method: 'DELETE' });
    } catch {}
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateAboutContent = async (updates: Partial<AboutContent>) => {
    try {
      await fetch('/api/portal/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setAboutContent((prev) => ({ ...prev, ...updates }));
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
        return;
      }
    } catch {}
    const localMember: BoardMember = {
      ...newMemberData,
      id: `board-${Date.now()}`
    };
    setBoardMembers((prev) => [...prev, localMember]);
  };

  const handleUpdateBoardMember = async (id: string, updates: Partial<BoardMember>) => {
    try {
      await fetch(`/api/portal/board/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setBoardMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const handleDeleteBoardMember = async (id: string) => {
    try {
      await fetch(`/api/portal/board/${id}`, { method: 'DELETE' });
    } catch {}
    setBoardMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateRegistration = async (
    id: string,
    updates: Partial<ExpeditionRegistration>
  ) => {
    try {
      await fetch(`/api/portal/registration/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleUpdateDocumentVerification = async (
    id: string,
    updates: Partial<DocumentVerification>
  ) => {
    try {
      await fetch(`/api/verification/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    setDocumentVerifications((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc))
    );
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
        return;
      }
    } catch {}
    const localLog: FieldLog = {
      ...logData,
      id: `LOG-${Date.now().toString().slice(-3)}`,
      logDate: new Date().toISOString().split('T')[0]
    };
    setFieldLogs((prev) => [localLog, ...prev]);
  };

  const handleSubmitRegistration = async (regData: any) => {
    try {
      await fetch('/api/portal/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
    } catch {}
    setRegistrations((prev) => [regData, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={currentLang === 'AR' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0B0F17] text-slate-300 font-sans-ui selection:bg-[#D4AF37]/30 selection:text-white"
    >
      {/* Top Navigation with Global Language & Currency Switcher + Guided Process Flow */}
      <Navbar
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        onLanguageChange={setCurrentLang}
        onCurrencyChange={setSelectedCurrency}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenCardPayment={() => handleOpenCardPayment()}
        onOpenDocVerification={() => setIsDocVerificationOpen(true)}
        onOpenClientPortal={() => handleOpenClientPortal('')}
        onOpenPortalAuth={() => setIsPortalAuthOpen(true)}
        onOpenAdminPanel={() => handleOpenAdminWithTab('content')}
        onOpenInvoiceReceipt={() => {
          setInvoiceReceiptData(null);
          setIsInvoiceReceiptOpen(true);
        }}
      />

      {/* Main Page Layout */}
      <main>
        {activePage === 'about' ? (
          <AboutUsPage
            currentLang={currentLang}
            selectedCurrency={selectedCurrency}
            aboutContent={aboutContent}
            boardMembers={boardMembers}
            photos={photos}
            isFullPage={true}
            onBackToHome={() => handleNavigatePage('home')}
            onOpenRegistration={() => setIsRegistrationOpen(true)}
            onOpenDocVerification={() => setIsDocVerificationOpen(true)}
            onOpenAdminPanel={() => handleOpenAdminWithTab('about-board')}
            onNavigateToBlog={() => handleNavigatePage('blog')}
          />
        ) : activePage === 'blog' ? (
          <BlogPage
            currentLang={currentLang}
            selectedCurrency={selectedCurrency}
            posts={posts}
            isFullPage={true}
            onBackToHome={() => handleNavigatePage('home')}
            onOpenAdminPanel={() => handleOpenAdminWithTab('content')}
            onOpenDocVerification={() => setIsDocVerificationOpen(true)}
            onOpenRegistration={() => setIsRegistrationOpen(true)}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              onOpenBriefing={() => setIsBriefingOpen(true)}
              onViewPackages={() => scrollToSection('packages')}
              onOpenCardPayment={() => handleOpenCardPayment()}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
              onOpenDocVerification={() => setIsDocVerificationOpen(true)}
            />

            {/* About Us & Board of Directors Section */}
            <AboutUsPage
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              aboutContent={aboutContent}
              boardMembers={boardMembers}
              photos={photos}
              isFullPage={false}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
              onOpenDocVerification={() => setIsDocVerificationOpen(true)}
              onOpenAdminPanel={() => handleOpenAdminWithTab('about-board')}
              onNavigateToBlog={() => handleNavigatePage('blog')}
            />

            {/* Market Reality & Discrepancies */}
            <MarketReality
              currentLang={currentLang}
              onOpenScamDiagnostic={() => scrollToSection('scam-immunity')}
            />

            {/* The Food Chain: Supply Chain Architecture */}
            <SupplyChainPipeline currentLang={currentLang} />

            {/* 7-Day Immersion Itinerary */}
            <Itinerary
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              onRegisterForTier={handleOpenRegistrationForTier}
            />

            {/* Scam Immunity Matrix & Diagnostic Tool */}
            <ScamImmunityTool
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              onApplyForVettingWithData={handleApplyWithScamData}
              onOpenDocVerification={() => setIsDocVerificationOpen(true)}
            />

            {/* Three-Tier Pricing Packages */}
            <PricingPackages
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              onSelectTier={handleOpenRegistrationForTier}
              onPayByCard={handleOpenCardPayment}
            />

            {/* Public Blog & Forensic Dispatches */}
            <BlogPage
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              posts={posts}
              isFullPage={false}
              onOpenAdminPanel={() => handleOpenAdminWithTab('content')}
              onOpenDocVerification={() => setIsDocVerificationOpen(true)}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
            />

            {/* FAQ Section: Gold Supply Chain, Due Diligence Process & Travel Logistics */}
            <FaqSection
              currentLang={currentLang}
              selectedCurrency={selectedCurrency}
              onOpenChatAndWaba={(mode) => handleOpenChatAndWaba(mode || 'chat')}
              onOpenDocVerification={() => setIsDocVerificationOpen(true)}
              onOpenRegistration={() => setIsRegistrationOpen(true)}
            />

            {/* Legal & Governance Charter */}
            <LegalCharter currentLang={currentLang} />
          </>
        )}
      </main>

      {/* Footer (Includes Geolocation Detection & Proposed Language/Currency Banner) */}
      <Footer
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        onLanguageChange={setCurrentLang}
        onCurrencyChange={setSelectedCurrency}
        onApplyGeoSettings={handleApplyGeoProposal}
        onNavigatePage={handleNavigatePage}
        onOpenCharter={() => handleNavigatePage('home', 'charter')}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenPortalAuth={() => setIsPortalAuthOpen(true)}
        onOpenAdminPanel={() => handleOpenAdminWithTab('content')}
        onOpenInvoiceReceipt={() => {
          setInvoiceReceiptData(null);
          setIsInvoiceReceiptOpen(true);
        }}
      />

      {/* MODALS */}
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
      />

      <DocumentVerificationModal
        isOpen={isDocVerificationOpen}
        onClose={() => setIsDocVerificationOpen(false)}
        onVerificationCreated={(newVerification: DocumentVerification) => {
          setDocumentVerifications((prev) => [newVerification, ...prev]);
        }}
        onOpenClientPortal={(clientEmail: string) => handleOpenClientPortal(clientEmail)}
      />

      <BriefingModal isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />

      <PortalAuthModal
        isOpen={isPortalAuthOpen}
        initialRole={portalAuthInitialRole}
        onClose={() => setIsPortalAuthOpen(false)}
        onOpenAdmin={() => {
          setIsAdminAuthenticated(true);
          setIsAdminPortalOpen(true);
        }}
        onOpenStaff={() => {
          setIsStaffAuthenticated(true);
          setIsStaffPortalOpen(true);
        }}
        onOpenClientPortal={(email?: string) => handleOpenClientPortal(email || '')}
      />

      {/* FULLSCREEN CLIENT, ADMIN & STAFF PORTALS */}
      {isClientPortalOpen && (
        <ClientPortal
          documentVerifications={documentVerifications}
          registrations={registrations}
          initialClientEmail={clientPortalEmailFilter}
          selectedCurrency={selectedCurrency}
          onClose={() => setIsClientPortalOpen(false)}
          onOpenDocVerification={() => {
            setIsClientPortalOpen(false);
            setIsDocVerificationOpen(true);
          }}
          onOpenRegistration={() => {
            setIsClientPortalOpen(false);
            setIsRegistrationOpen(true);
          }}
          onOpenCardPayment={(tier, type) => {
            setIsClientPortalOpen(false);
            handleOpenCardPayment(tier, type);
          }}
          onOpenStaffPortal={() => {
            setIsClientPortalOpen(false);
            handleRequestStaffPortal();
          }}
          onOpenChatAndWaba={(mode) => handleOpenChatAndWaba(mode)}
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
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
          selectedCurrency={selectedCurrency}
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
          onUpdateRegistration={handleUpdateRegistration}
          onUpdateDocumentVerification={handleUpdateDocumentVerification}
          onAddFieldLog={handleAddFieldLog}
          onClose={() => setIsStaffPortalOpen(false)}
          onSwitchToAdmin={() => {
            setIsStaffPortalOpen(false);
            handleOpenAdminWithTab('content');
          }}
        />
      )}

      {/* Multi-Turn Gemini AI Chatbot & Registered Member WhatsApp Business (WABA) Concierge */}
      <MemberChatAndWabaWidget
        currentLang={currentLang}
        selectedCurrency={selectedCurrency}
        registrations={registrations}
        isOpen={isChatWabaOpen}
        activeTab={chatWabaTab}
        onToggleOpen={(open, tab) => {
          if (tab) setChatWabaTab(tab);
          setIsChatWabaOpen(open);
        }}
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenDocVerification={() => setIsDocVerificationOpen(true)}
      />
    </div>
  );
}
