import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Users,
  CreditCard,
  Settings,
  Plus,
  Trash2,
  Edit3,
  X,
  Lock,
  FileSearch,
  Award,
  Upload,
  Check,
  TrendingUp,
  Download,
  History,
  Search
} from 'lucide-react';
import {
  ContentPost,
  PhotoItem,
  ExpeditionRegistration,
  StaffMember,
  PaymentRecord,
  DocumentVerification,
  BoardMember,
  AboutContent,
  Currency,
  AdminAuditLog
} from '../types';
import { GoldPriceTrendsChart } from './GoldPriceTrendsChart';
import { DEFAULT_UI_CONFIG, type UiConfigDoc } from '../services/firebase';

interface AdminPortalProps {
  posts: ContentPost[];
  photos: PhotoItem[];
  boardMembers: BoardMember[];
  aboutContent: AboutContent;
  registrations: ExpeditionRegistration[];
  documentVerifications: DocumentVerification[];
  staff: StaffMember[];
  payments: PaymentRecord[];
  auditLogs?: AdminAuditLog[];
  selectedCurrency?: Currency;
  uiConfig?: UiConfigDoc;
  onUpdateUiConfig?: (updates: Partial<UiConfigDoc>) => void;
  initialTab?:
    | 'content'
    | 'photos'
    | 'about-board'
    | 'registrations'
    | 'doc-verifications'
    | 'payments'
    | 'staff'
    | 'audit-logs'
    | 'gateway'
    | 'gold-trends';
  onAddPost: (post: Omit<ContentPost, 'id' | 'date'>) => void;
  onUpdatePost: (id: string, updates: Partial<ContentPost>) => void;
  onDeletePost: (id: string) => void;
  onAddPhoto: (photo: Omit<PhotoItem, 'id' | 'dateAdded'>) => void;
  onUpdatePhoto: (id: string, updates: Partial<PhotoItem>) => void;
  onDeletePhoto: (id: string) => void;
  onUpdateAboutContent: (updates: Partial<AboutContent>) => void;
  onAddBoardMember: (member: Omit<BoardMember, 'id'>) => void;
  onUpdateBoardMember: (id: string, updates: Partial<BoardMember>) => void;
  onDeleteBoardMember: (id: string) => void;
  onUpdateRegistration: (id: string, updates: Partial<ExpeditionRegistration>) => void;
  onUpdateDocumentVerification: (id: string, updates: Partial<DocumentVerification>) => void;
  onUpdateStaffRole?: (
    staffId: string,
    updates: Partial<StaffMember>
  ) => void;
  onRecordAuditLog?: (entry: {
    category: AdminAuditLog['category'];
    action: string;
    targetId: string;
    details: string;
  }) => void;
  onClose: () => void;
  onSwitchToStaff: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  posts,
  photos,
  boardMembers,
  aboutContent,
  registrations,
  documentVerifications,
  staff,
  payments,
  auditLogs = [],
  selectedCurrency = 'USD',
  uiConfig = DEFAULT_UI_CONFIG,
  onUpdateUiConfig,
  initialTab = 'content',
  onAddPost,
  onUpdatePost,
  onDeletePost,
  onAddPhoto,
  onUpdatePhoto,
  onDeletePhoto,
  onUpdateAboutContent,
  onAddBoardMember,
  onUpdateBoardMember,
  onDeleteBoardMember,
  onUpdateRegistration,
  onUpdateDocumentVerification,
  onUpdateStaffRole,
  onRecordAuditLog,
  onClose,
  onSwitchToStaff
}) => {
  const [activeTab, setActiveTab] = useState<
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
  >(initialTab);

  // Filter states for Registrations, Document Verifications, Payments, and Audit Logs
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState<'all' | 'approved' | 'under_review' | 'pending_kyc' | 'flagged'>('all');

  const [docSearch, setDocSearch] = useState('');
  const [docStatusFilter, setDocStatusFilter] = useState<'all' | 'dispatched_to_client' | 'assigned_to_staff_1' | 'analyzing'>('all');

  const [paySearch, setPaySearch] = useState('');
  const [payTypeFilter, setPayTypeFilter] = useState<'all' | 'full_payment' | 'doc_verification'>('all');

  const [auditSearch, setAuditSearch] = useState('');
  const [auditCategoryFilter, setAuditCategoryFilter] = useState<'all' | AdminAuditLog['category']>('all');

  // Helper to download RFC-4180 compliant CSV files
  const downloadCsvFile = (filename: string, headers: string[], rows: (string | number | boolean | undefined)[][]) => {
    const escapeCell = (val: string | number | boolean | undefined) => {
      const str = val === undefined || val === null ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };
    const csvLines = [
      headers.map(escapeCell).join(','),
      ...rows.map((r) => r.map(escapeCell).join(','))
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesStatus = regStatusFilter === 'all' || r.status === regStatusFilter;
    const q = regSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.fullName.toLowerCase().includes(q) ||
      r.companyName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.country.toLowerCase().includes(q) ||
      r.requestedTier.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredDocVerifications = documentVerifications.filter((d) => {
    const matchesStatus = docStatusFilter === 'all' || d.status === docStatusFilter;
    const q = docSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      d.id.toLowerCase().includes(q) ||
      d.clientName.toLowerCase().includes(q) ||
      d.companyName.toLowerCase().includes(q) ||
      d.email.toLowerCase().includes(q) ||
      d.documentType.toLowerCase().includes(q) ||
      d.claimedSeller.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const filteredPayments = payments.filter((p) => {
    const matchesType = payTypeFilter === 'all' || p.type === payTypeFilter;
    const q = paySearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.reference.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.tier.toLowerCase().includes(q) ||
      p.status.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesCategory = auditCategoryFilter === 'all' || log.category === auditCategoryFilter;
    const q = auditSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      log.id.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.actorEmail.toLowerCase().includes(q) ||
      log.targetId.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleExportRegistrationsCsv = () => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const filename = `uge-registrations-${dateStamp}.csv`;
    downloadCsvFile(
      filename,
      [
        'Registration ID',
        'Registered Date',
        'Full Name',
        'Executive Title',
        'Company Name',
        'Country',
        'Email',
        'Phone',
        'Tier',
        'Delegates',
        'Cohort Date',
        'Payment Status',
        'Clearance Status',
        'Passport Verified',
        'Sanctions/PEP Clear',
        'DGSM Clearance',
        'Assigned Staff'
      ],
      filteredRegistrations.map((r) => [
        r.id,
        r.registeredAt,
        r.fullName,
        r.executiveTitle,
        r.companyName,
        r.country,
        r.email,
        r.phone,
        r.requestedTier,
        r.delegatesCount,
        r.cohortDate,
        r.kycPaymentStatus,
        r.status,
        r.passportVerified ? 'Yes' : 'No',
        r.sanctionsPepClear ? 'Yes' : 'No',
        r.dgsmClearance ? 'Yes' : 'No',
        r.assignedStaff || 'Unassigned'
      ])
    );
    onRecordAuditLog?.({
      category: 'data_export',
      action: 'Exported Registrations to CSV',
      targetId: filename,
      details: `Exported ${filteredRegistrations.length} filtered registration record(s) (status filter: ${regStatusFilter}) to ${filename}.`
    });
    triggerSavedBanner(`Exported ${filteredRegistrations.length} registrations to ${filename}`);
  };

  const handleExportDocVerificationsCsv = () => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const filename = `uge-document-verifications-${dateStamp}.csv`;
    downloadCsvFile(
      filename,
      [
        'Verification ID',
        'Submitted At',
        'Client Name',
        'Company Name',
        'Email',
        'Phone',
        'Document Type',
        'Claimed Seller',
        'Claimed Quantity',
        'Claimed Discount',
        'Fee (USD)',
        'Payment Status',
        'Payment Ref',
        'Status',
        'Assigned Officer',
        'AI Risk Score',
        'AI Verdict',
        'SLA Deadline'
      ],
      filteredDocVerifications.map((d) => [
        d.id,
        d.submittedAt,
        d.clientName,
        d.companyName,
        d.email,
        d.phone,
        d.documentType,
        d.claimedSeller,
        d.claimedQuantityKg,
        d.claimedDiscountPercent,
        d.feeUsd,
        d.paymentStatus,
        d.paymentRef,
        d.status,
        d.assignedOfficer,
        d.aiAnalysis?.riskScore ?? 'N/A',
        d.aiAnalysis?.verdict ?? 'Pending',
        d.slaDeadline
      ])
    );
    onRecordAuditLog?.({
      category: 'data_export',
      action: 'Exported Document Verifications to CSV',
      targetId: filename,
      details: `Exported ${filteredDocVerifications.length} filtered document verification dossier(s) (status filter: ${docStatusFilter}) to ${filename}.`
    });
    triggerSavedBanner(`Exported ${filteredDocVerifications.length} document verifications to ${filename}`);
  };

  const handleExportPaymentsCsv = () => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const filename = `uge-payments-${dateStamp}.csv`;
    downloadCsvFile(
      filename,
      [
        'Payment ID',
        'Tx Reference',
        'Customer Name',
        'Email',
        'Type',
        'Tier / Service',
        'Amount',
        'Currency',
        'Method',
        'Timestamp',
        'Status'
      ],
      filteredPayments.map((p) => [
        p.id,
        p.reference,
        p.customerName,
        p.email,
        p.type,
        p.tier,
        p.amount,
        p.currency,
        p.cardBrand,
        p.date,
        p.status
      ])
    );
    onRecordAuditLog?.({
      category: 'data_export',
      action: 'Exported Payment Transactions to CSV',
      targetId: filename,
      details: `Exported ${filteredPayments.length} filtered payment transaction record(s) (type filter: ${payTypeFilter}) to ${filename}.`
    });
    triggerSavedBanner(`Exported ${filteredPayments.length} payment records to ${filename}`);
  };

  const [saveBanner, setSaveBanner] = useState<string | null>(null);
  const [copiedRules, setCopiedRules] = useState(false);

  const triggerSavedBanner = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 3000);
  };

  // --- POST ADD / EDIT MODAL STATE ---
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<
    'Field Dispatch' | 'Regulatory Alert' | 'Intelligence Briefing' | 'Market Update'
  >('Intelligence Briefing');
  const [postSummary, setPostSummary] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postAuthor, setPostAuthor] = useState('Mugisa Solomon Byakutaaga');
  const [postAuthorRole, setPostAuthorRole] = useState('Director · Lead Forensics Expert');
  const [postImageUrl, setPostImageUrl] = useState('/src/assets/images/scam_academy_forensics_1793632189342.jpg');
  const [postReadTime, setPostReadTime] = useState('5 min read');
  const [postPublished, setPostPublished] = useState(true);

  const openNewPostModal = () => {
    setEditingPostId(null);
    setPostTitle('');
    setPostCategory('Intelligence Briefing');
    setPostSummary('');
    setPostBody('');
    setPostAuthor('Mugisa Solomon Byakutaaga');
    setPostAuthorRole('Director · Lead Forensics Expert');
    setPostImageUrl('/src/assets/images/scam_academy_forensics_1793632189342.jpg');
    setPostReadTime('5 min read');
    setPostPublished(true);
    setShowPostModal(true);
  };

  const openEditPostModal = (post: ContentPost) => {
    setEditingPostId(post.id);
    setPostTitle(post.title);
    setPostCategory(post.category);
    setPostSummary(post.summary);
    setPostBody(post.body);
    setPostAuthor(post.author);
    setPostAuthorRole(post.authorRole || 'Directorate Editorial');
    setPostImageUrl(post.imageUrl || '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg');
    setPostReadTime(post.readTime || '5 min read');
    setPostPublished(post.published !== false);
    setShowPostModal(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postBody) return;

    if (editingPostId) {
      onUpdatePost(editingPostId, {
        title: postTitle,
        category: postCategory,
        summary: postSummary || postTitle,
        body: postBody,
        author: postAuthor,
        authorRole: postAuthorRole,
        imageUrl: postImageUrl,
        readTime: postReadTime,
        published: postPublished
      });
      triggerSavedBanner('Blog article updated successfully.');
    } else {
      onAddPost({
        title: postTitle,
        category: postCategory,
        summary: postSummary || postTitle,
        body: postBody,
        author: postAuthor,
        authorRole: postAuthorRole,
        imageUrl: postImageUrl,
        readTime: postReadTime,
        published: postPublished
      });
      triggerSavedBanner('New blog article published.');
    }
    setShowPostModal(false);
  };

  // --- PHOTO ADD / EDIT MODAL STATE ---
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCategory, setPhotoCategory] = useState<
    'Field Operations' | 'Assay Lab' | 'VIP Transport' | 'Refinery' | 'Concessions'
  >('Field Operations');

  const openNewPhotoModal = () => {
    setEditingPhotoId(null);
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
    setPhotoCategory('Field Operations');
    setShowPhotoModal(true);
  };

  const openEditPhotoModal = (photo: PhotoItem) => {
    setEditingPhotoId(photo.id);
    setPhotoTitle(photo.title);
    setPhotoCaption(photo.caption);
    setPhotoUrl(photo.imageUrl);
    setPhotoCategory(photo.category);
    setShowPhotoModal(true);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoUrl) return;

    if (editingPhotoId) {
      onUpdatePhoto(editingPhotoId, {
        title: photoTitle,
        caption: photoCaption || photoTitle,
        imageUrl: photoUrl,
        category: photoCategory
      });
      triggerSavedBanner('Photo asset updated.');
    } else {
      onAddPhoto({
        title: photoTitle,
        caption: photoCaption || photoTitle,
        imageUrl: photoUrl,
        category: photoCategory
      });
      triggerSavedBanner('New photo added to gallery.');
    }
    setShowPhotoModal(false);
  };

  // --- ABOUT US & BOARD MEMBER EDIT STATE ---
  const [aboutHeadline, setAboutHeadline] = useState(aboutContent.headline);
  const [aboutSubheadline, setAboutSubheadline] = useState(aboutContent.subheadline);
  const [aboutMission, setAboutMission] = useState(aboutContent.missionStatement);
  const [aboutStatutory, setAboutStatutory] = useState(aboutContent.statutoryMandate);
  const [aboutHeadquarters, setAboutHeadquarters] = useState(aboutContent.headquarters);
  const [aboutOverviewText, setAboutOverviewText] = useState(
    aboutContent.overviewParagraphs.join('\n\n')
  );

  const handleSaveAboutUs = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAboutContent({
      headline: aboutHeadline,
      subheadline: aboutSubheadline,
      missionStatement: aboutMission,
      statutoryMandate: aboutStatutory,
      headquarters: aboutHeadquarters,
      overviewParagraphs: aboutOverviewText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    });
    triggerSavedBanner('About Us page content saved.');
  };

  const [showBoardModal, setShowBoardModal] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberDesignation, setMemberDesignation] = useState<
    'Board of Directors' | 'Executive Directorate' | 'Advisory Council'
  >('Board of Directors');
  const [memberSpecialty, setMemberSpecialty] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberCredentialsText, setMemberCredentialsText] = useState('');
  const [memberImageUrl, setMemberImageUrl] = useState('');
  const [memberLinkedinUrl, setMemberLinkedinUrl] = useState('https://www.linkedin.com/');

  const openNewBoardModal = () => {
    setEditingBoardId(null);
    setMemberName('');
    setMemberRole('');
    setMemberDesignation('Board of Directors');
    setMemberSpecialty('');
    setMemberBio('');
    setMemberCredentialsText('');
    setMemberImageUrl('/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg');
    setMemberLinkedinUrl('https://www.linkedin.com/');
    setShowBoardModal(true);
  };

  const openEditBoardModal = (member: BoardMember) => {
    setEditingBoardId(member.id);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberDesignation(member.designation);
    setMemberSpecialty(member.specialty);
    setMemberBio(member.bio);
    setMemberCredentialsText((member.credentials || []).join('\n'));
    setMemberImageUrl(member.imageUrl || '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg');
    setMemberLinkedinUrl(member.linkedinUrl || 'https://www.linkedin.com/');
    setShowBoardModal(true);
  };

  const handleSaveBoardMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName || !memberRole) return;
    const creds = memberCredentialsText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    if (editingBoardId) {
      onUpdateBoardMember(editingBoardId, {
        name: memberName,
        role: memberRole,
        designation: memberDesignation,
        specialty: memberSpecialty,
        bio: memberBio,
        credentials: creds,
        imageUrl: memberImageUrl,
        linkedinUrl: memberLinkedinUrl
      });
      triggerSavedBanner(`Updated director profile: ${memberName}`);
    } else {
      onAddBoardMember({
        name: memberName,
        role: memberRole,
        designation: memberDesignation,
        specialty: memberSpecialty,
        bio: memberBio,
        credentials: creds,
        imageUrl: memberImageUrl,
        linkedinUrl: memberLinkedinUrl
      });
      triggerSavedBanner(`Added new board member: ${memberName}`);
    }
    setShowBoardModal(false);
  };

  // Helper to convert uploaded image file to base64 data URL
  const handleFileUploadToDataUrl = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080B11]/95 backdrop-blur-md flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#111722] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base font-bold text-white">
                UGANDA GOLD EXPEDITION
              </span>
              <span className="text-xs font-mono-data text-[#D4AF37]">
                · Administrator CMS & KYC Console
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Add, Modify & Edit Blog Content, Photos, Board of Directors & KYC Clearances
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveBanner && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs">
              <Check className="w-3.5 h-3.5" />
              <span>{saveBanner}</span>
            </div>
          )}

          <button
            onClick={onSwitchToStaff}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#182232] border border-slate-700 rounded transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Switch to Staff Portal</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-[#0B0F17] border-b border-slate-800/80 px-4 sm:px-8 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'content'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Blog & Content ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'photos'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Photos & Media ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('about-board')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'about-board'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>About Us & Board ({boardMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'registrations'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Registrations & KYC ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('doc-verifications')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'doc-verifications'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <FileSearch className="w-4 h-4" />
          <span>$2,500 AI Audits ({documentVerifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payments'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Logs ({payments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'staff'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff &amp; Roles ({staff.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit-logs')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit-logs'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <History className="w-4 h-4 text-[#D4AF37]" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gateway')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gateway'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Setup, UX/UI &amp; Firestore Rules</span>
        </button>

        <button
          onClick={() => setActiveTab('gold-trends')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gold-trends'
              ? 'bg-[#182232] text-[#D4AF37] border border-[#D4AF37]/40'
              : 'text-slate-400 hover:text-white hover:bg-[#111722]'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
          <span>Gold Price Trends (Multi-Currency)</span>
        </button>
      </div>

      {/* Panel Content Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* TAB 1: BLOG & CONTENT ARTICLES (ADD, MODIFY, EDIT, DELETE) */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Blog Articles, Field Dispatches & Intelligence Content
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add, modify, edit, or unpublish articles on the public Blog & Intelligence page.
                </p>
              </div>

              <button
                onClick={openNewPostModal}
                className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Blog Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 bg-[#0B0F17] border-b border-slate-800 overflow-hidden">
                      <img
                        src={
                          post.imageUrl ||
                          '/src/assets/images/hero_uganda_gold_expedition_1793632188698.jpg'
                        }
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono-data text-slate-400">
                        <span className="text-[#D4AF37] font-semibold">{post.category}</span>
                        <span>
                          {post.date} · {post.published !== false ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                      <div className="text-[11px] text-slate-400 pt-1">
                        Author: <strong className="text-slate-200">{post.author}</strong>
                        {post.authorRole ? ` (${post.authorRole})` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-[#0B0F17]/60 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => openEditPostModal(post)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit / Modify Article</span>
                    </button>

                    <button
                      onClick={() => {
                        onDeletePost(post.id);
                        triggerSavedBanner('Article deleted.');
                      }}
                      className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded hover:bg-rose-950/40 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PHOTO GALLERY MANAGEMENT (ADD, MODIFY, EDIT, DELETE) */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Photo Asset & Vault Media Manager
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add new photos (via image file upload or URL), modify captions/categories, or replace existing imagery.
                </p>
              </div>

              <button
                onClick={openNewPhotoModal}
                className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Upload New Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl overflow-hidden bg-[#111722] border border-slate-800 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0F17] border-b border-slate-800">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400">
                        <span className="text-[#D4AF37]">{photo.category}</span>
                        <span>{photo.dateAdded}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-[#0B0F17]/60 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => openEditPhotoModal(photo)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit / Modify</span>
                    </button>

                    <button
                      onClick={() => {
                        onDeletePhoto(photo.id);
                        triggerSavedBanner('Photo deleted.');
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-950/40"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT US & BOARD OF DIRECTORS (ADD, MODIFY, EDIT) */}
        {activeTab === 'about-board' && (
          <div className="space-y-10">
            {/* Board Members & Directors Manager */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    Board of Directors & Executive Leadership
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add, modify, or edit Board Members and Directors displayed on the About Us page.
                  </p>
                </div>

                <button
                  onClick={openNewBoardModal}
                  className="px-4 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Board Member / Director</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {boardMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-[#0B0F17] border-b border-slate-800 overflow-hidden">
                        {member.imageUrl && (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-80"
                          />
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="text-[11px] font-mono-data text-[#D4AF37]">
                          {member.designation}
                        </div>
                        <h4 className="font-cinzel text-base font-bold text-white">
                          {member.name}
                        </h4>
                        <div className="text-xs font-semibold text-slate-200">
                          {member.role}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-[#0B0F17]/60 border-t border-slate-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => openEditBoardModal(member)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Director</span>
                      </button>

                      <button
                        onClick={() => {
                          onDeleteBoardMember(member.id);
                          triggerSavedBanner('Board member removed.');
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-950/40"
                        title="Remove Board Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Us Page Content Editor */}
            <div className="rounded-xl bg-[#111722] border border-slate-800 p-6 space-y-5">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="font-cinzel text-lg font-bold text-white">
                  Edit About Us Page Copy & Institutional Mandate
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Modify the headline, mission statement, and institutional overview paragraphs shown on the About Us page.
                </p>
              </div>

              <form onSubmit={handleSaveAboutUs} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">
                      Primary Headline
                    </label>
                    <input
                      type="text"
                      value={aboutHeadline}
                      onChange={(e) => setAboutHeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">
                      Operational Secretariats / Headquarters
                    </label>
                    <input
                      type="text"
                      value={aboutHeadquarters}
                      onChange={(e) => setAboutHeadquarters(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={aboutSubheadline}
                    onChange={(e) => setAboutSubheadline(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Sovereign Mission Statement
                  </label>
                  <textarea
                    rows={2}
                    value={aboutMission}
                    onChange={(e) => setAboutMission(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Institutional Overview Paragraphs (Separate paragraphs with a blank line)
                  </label>
                  <textarea
                    rows={6}
                    value={aboutOverviewText}
                    onChange={(e) => setAboutOverviewText(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">
                    Statutory Alignment Notice
                  </label>
                  <textarea
                    rows={2}
                    value={aboutStatutory}
                    onChange={(e) => setAboutStatutory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
                  >
                    Save About Us Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: REGISTRATIONS & KYC */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Delegate Registrations &amp; KYC Clearances
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audited under Uganda Mining Act 2022. Statutory OFAC, UN, UK HMT, EU sanctions and PEP screening is included with each delegate&apos;s selected package.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-data">
                <span className="text-emerald-400">
                  {registrations.filter((r) => r.kycPaymentStatus === 'paid').length} Paid in Full
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">
                  {registrations.filter((r) => r.kycPaymentStatus === 'pending').length} Pending
                </span>
                <button
                  type="button"
                  onClick={handleExportRegistrationsCsv}
                  className="px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-sans font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV ({filteredRegistrations.length})</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar for Registrations */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111722] p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  placeholder="Filter registrations by ID, name, company, email, country, or tier..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono-data text-[11px]">Status:</span>
                <select
                  value={regStatusFilter}
                  onChange={(e) => setRegStatusFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="all">All Statuses ({registrations.length})</option>
                  <option value="approved">Approved</option>
                  <option value="under_review">Under Review</option>
                  <option value="pending_kyc">Pending KYC</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 hover:border-slate-700 p-5 space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-data">
                        <span className="font-bold text-[#D4AF37]">{reg.id}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{reg.registeredAt}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-200 uppercase">{reg.status.replace('_', ' ')}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {reg.fullName} <span className="text-xs text-slate-400 font-normal">({reg.executiveTitle})</span>
                      </h4>
                      <div className="text-xs text-slate-300">
                        {reg.companyName} · <span className="text-slate-400">{reg.country}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                      <div className="p-2.5 rounded bg-[#0B0F17] border border-slate-800 text-right">
                        <div className="text-[10px] font-mono-data text-slate-400 uppercase">
                          PACKAGE PAYMENT STATUS
                        </div>
                        <div
                          className={`text-xs font-mono-data font-bold ${
                            reg.kycPaymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {reg.kycPaymentStatus === 'paid' ? 'PAID IN FULL (VAT INCL.)' : 'PENDING'}
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#0B0F17] border border-slate-800 text-right">
                        <div className="text-[10px] font-mono-data text-slate-400 uppercase">
                          EXPEDITION TIER
                        </div>
                        <div className="text-xs font-mono-data text-[#D4AF37] font-bold uppercase">
                          {reg.requestedTier} ({reg.delegatesCount} PAX)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-[#0B0F17] p-3 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Contact Info:</span>
                      <span className="text-slate-300">{reg.email}</span>
                      <span className="text-slate-400 block font-mono-data">{reg.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Target Cohort:</span>
                      <span className="text-white font-medium">{reg.cohortDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Assigned Staff Lead:</span>
                      <span className="text-[#D4AF37]">{reg.assignedStaff || 'Unassigned'}</span>
                    </div>
                  </div>

                  {reg.activeProposalDetails && (
                    <div className="p-2.5 rounded bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200">
                      <span className="font-bold text-amber-400">Target Offer Submitted for Audit: </span>
                      {reg.activeProposalDetails}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.passportVerified}
                          onChange={(e) =>
                            onUpdateRegistration(reg.id, { passportVerified: e.target.checked })
                          }
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">Passport Verified</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.sanctionsPepClear}
                          onChange={(e) =>
                            onUpdateRegistration(reg.id, { sanctionsPepClear: e.target.checked })
                          }
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">OFAC, UN, UK HMT, EU &amp; PEP Clear</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reg.dgsmClearance}
                          onChange={(e) =>
                            onUpdateRegistration(reg.id, { dgsmClearance: e.target.checked })
                          }
                          className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-slate-300">DGSM Security Seal</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { kycPaymentStatus: 'paid' })}
                        className="px-2.5 py-1 text-xs text-emerald-400 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800 rounded transition-colors"
                      >
                        Confirm Paid in Full
                      </button>
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { status: 'approved' })}
                        className="px-3 py-1 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded transition-colors"
                      >
                        Approve Clearance
                      </button>
                      <button
                        onClick={() => onUpdateRegistration(reg.id, { status: 'flagged' })}
                        className="px-2.5 py-1 text-xs text-rose-400 hover:text-white bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800 rounded transition-colors"
                      >
                        Flag Case
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: $2,500 AI DOCUMENT VERIFICATIONS */}
        {activeTab === 'doc-verifications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  24–72 Hour Forensic Document Verifications (USD 2,500, VAT Incl. · Routed to Staff Officer 1)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Admin oversight of client documents analyzed by Gemini AI and assigned to <strong>Staff Officer 1</strong> under a 24–72 hour delivery SLA.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleExportDocVerificationsCsv}
                  className="px-3.5 py-2 rounded-lg bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV ({filteredDocVerifications.length})</span>
                </button>
                <button
                  onClick={onSwitchToStaff}
                  className="px-3.5 py-2 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded-lg transition-colors shrink-0"
                >
                  Open Staff Officer 1 Terminal →
                </button>
              </div>
            </div>

            {/* Filter & Search Bar for Document Verifications */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111722] p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  placeholder="Filter document verifications by ID, client, company, seller, or document type..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono-data text-[11px]">Status:</span>
                <select
                  value={docStatusFilter}
                  onChange={(e) => setDocStatusFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="all">All Dossiers ({documentVerifications.length})</option>
                  <option value="dispatched_to_client">Dispatched to Client</option>
                  <option value="assigned_to_staff_1">Assigned to Staff Officer 1</option>
                  <option value="analyzing">Analyzing</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredDocVerifications.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl bg-[#111722] border border-slate-800 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div>
                      <span className="font-mono-data text-xs font-bold text-[#D4AF37]">
                        {doc.id}
                      </span>
                      <span className="text-slate-600 mx-2">·</span>
                      <span className="text-xs text-white font-bold">
                        {doc.clientName} ({doc.companyName})
                      </span>
                      <span className="text-slate-600 mx-2">·</span>
                      <span className="text-xs text-slate-400">{doc.documentType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono-data">
                      <span className="text-emerald-400">$2,500 Paid ({doc.paymentRef})</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-300">
                        {doc.status === 'dispatched_to_client'
                          ? '24–72h Report Sent'
                          : 'Assigned: Staff Officer 1'}
                      </span>
                    </div>
                  </div>

                  {doc.aiAnalysis && (
                    <div className="p-3 rounded bg-[#0B0F17] border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-data font-bold text-rose-400">
                          AI Verdict: {doc.aiAnalysis.verdict} (Risk Score: {doc.aiAnalysis.riskScore}%)
                        </span>
                        <span className="text-[11px] font-mono-data text-slate-400">
                          SLA: {doc.slaDeadline}
                        </span>
                      </div>
                      <p className="text-slate-300">{doc.aiAnalysis.executiveSummary}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>
                      Assigned Lead: <strong className="text-emerald-400">{doc.assignedOfficer}</strong>
                    </span>
                    <button
                      onClick={() =>
                        onUpdateDocumentVerification(doc.id, { status: 'dispatched_to_client' })
                      }
                      className="text-[#D4AF37] hover:underline font-semibold"
                    >
                      Mark 24–72h Report Dispatched
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PAYMENT LOGS */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Online Payment Gateway Transactions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time API log of all online settlement transactions.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportPaymentsCsv}
                className="px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#FEF3C7] text-[#0B0F17] font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to CSV ({filteredPayments.length})</span>
              </button>
            </div>

            {/* Filter & Search Bar for Payments */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111722] p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={paySearch}
                  onChange={(e) => setPaySearch(e.target.value)}
                  placeholder="Filter payments by reference, customer name, email, or tier..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono-data text-[11px]">Type:</span>
                <select
                  value={payTypeFilter}
                  onChange={(e) => setPayTypeFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="all">All Payment Types ({payments.length})</option>
                  <option value="full_payment">Expedition Packages</option>
                  <option value="doc_verification">24–72h Document Verifications ($2,500)</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#182232] text-slate-400 font-mono-data border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Tx Reference</th>
                    <th className="py-3 px-4">Delegate</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono-data text-slate-300">
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-[#141C2B] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#D4AF37]">{p.reference}</td>
                      <td className="py-3 px-4 font-sans text-white">{p.customerName}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {p.type === 'doc_verification'
                          ? '24–72h Doc Verification ($2,500)'
                          : 'Full Package (Paid in Full)'}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        ${p.amount.toLocaleString()} {p.currency}
                      </td>
                      <td className="py-3 px-4">{p.cardBrand}</td>
                      <td className="py-3 px-4 text-slate-400 text-[11px]">{p.date}</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: STAFF DIRECTORY & ROLE MANAGEMENT */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="font-cinzel text-xl font-bold text-white">
                Due Diligence Staff Directory &amp; Role Access Control
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Accredited field logistics leads, forensic metallurgists, and legal counsel. Role updates are automatically recorded in the immutable Audit Log.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((s) => (
                <div key={s.id} className="p-5 rounded-xl bg-[#111722] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{s.name}</h4>
                    <span className="text-xs font-mono-data text-emerald-400">
                      {s.activeCasesCount} Active Cases
                    </span>
                  </div>
                  <div className="text-xs text-[#D4AF37] font-medium">{s.role}</div>
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 space-y-1 font-mono-data">
                    <div>
                      Email: <span className="text-slate-200">{s.email}</span>
                    </div>
                    <div>
                      Phone: <span className="text-slate-200">{s.phone}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-mono-data text-slate-400 uppercase mb-1">
                        Operational Role
                      </label>
                      <select
                        value={s.role}
                        onChange={(e) => {
                          const nextRole = e.target.value as StaffMember['role'];
                          onUpdateStaffRole?.(s.id, { role: nextRole });
                          triggerSavedBanner(`Updated role for ${s.name} (logged to Audit Trail)`);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#0B0F17] border border-slate-700 text-white text-xs"
                      >
                        <option value="Senior Due Diligence Officer">Senior Due Diligence Officer</option>
                        <option value="Metallurgical Forensic Lead">Metallurgical Forensic Lead</option>
                        <option value="Legal Compliance Counsel">Legal Compliance Counsel</option>
                        <option value="Field Logistics Lead">Field Logistics Lead</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono-data text-slate-400 uppercase mb-1">
                        System Access Level (RBAC)
                      </label>
                      <select
                        value={s.accessLevel || 'staff'}
                        onChange={(e) => {
                          const nextLevel = e.target.value as 'admin' | 'staff' | 'client';
                          onUpdateStaffRole?.(s.id, { accessLevel: nextLevel });
                          triggerSavedBanner(`Updated RBAC level for ${s.name} to ${nextLevel.toUpperCase()}`);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#0B0F17] border border-slate-700 text-white text-xs font-mono-data"
                      >
                        <option value="staff">STAFF (Assigned Dossiers &amp; KYC)</option>
                        <option value="admin">ADMIN (Full Directorate Control)</option>
                        <option value="client">CLIENT (Restricted Own-File View)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: AUTOMATED READ-ONLY AUDIT LOGS */}
        {activeTab === 'audit-logs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-[#D4AF37]" />
                  <span>Automated Administrative Audit Log</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Immutable, read-only ledger of all administrative actions including content updates, user role changes, KYC clearances, document verification approvals, and CSV exports.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-data">
                <span className="px-2.5 py-1 rounded bg-[#182232] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold">
                  READ-ONLY · APPEND-ONLY LEDGER ({filteredAuditLogs.length})
                </span>
              </div>
            </div>

            {/* Search & Category Filter for Read-Only Audit Logs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111722] p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  placeholder="Search audit trail by action, actor email, target ID, or details..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono-data text-[11px]">Category:</span>
                <select
                  value={auditCategoryFilter}
                  onChange={(e) => setAuditCategoryFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="all">All Categories ({auditLogs.length})</option>
                  <option value="content_update">Content &amp; Media Updates</option>
                  <option value="user_role_change">User &amp; Staff Role Changes</option>
                  <option value="document_approval">Document Verification Approvals</option>
                  <option value="kyc_clearance">Registration &amp; KYC Clearances</option>
                  <option value="ux_config">UX/UI &amp; Security Rules</option>
                  <option value="data_export">CSV Data Exports</option>
                </select>
              </div>
            </div>

            {/* Read-Only Audit Log List */}
            <div className="rounded-xl bg-[#111722] border border-slate-800 overflow-hidden divide-y divide-slate-800/80">
              {filteredAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 hover:bg-[#141C2B] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-data font-bold text-[#D4AF37]">{log.id}</span>
                      <span className="text-slate-600">·</span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono-data text-[10px] font-bold uppercase border ${
                          log.category === 'document_approval' || log.category === 'kyc_clearance'
                            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60'
                            : log.category === 'user_role_change'
                            ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
                            : log.category === 'data_export'
                            ? 'bg-blue-950/70 text-blue-300 border-blue-700/60'
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        {log.category.replace(/_/g, ' ')}
                      </span>
                      <span className="font-semibold text-white">{log.action}</span>
                      <span className="font-mono-data text-[11px] text-slate-400">
                        [Target: {log.targetId}]
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{log.details}</p>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-1 shrink-0 font-mono-data text-[11px] text-slate-400 border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-800/60">
                    <div>
                      Actor: <strong className="text-slate-200">{log.actorEmail}</strong>{' '}
                      <span className="uppercase text-[#D4AF37]">({log.actorRole})</span>
                    </div>
                    <div className="text-slate-500">{log.timestamp}</div>
                  </div>
                </div>
              ))}
              {filteredAuditLogs.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400 font-mono-data">
                  No audit log entries match the current filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: SETUP, UX/UI & FIRESTORE SECURITY RULES + GATEWAY SETTINGS */}
        {activeTab === 'gateway' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Setup: UX/UI Firestore Security Rules &amp; Gateway Configuration
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Zero-Trust Firestore Security Rules governing per-user UX/UI preferences (<code className="font-mono text-[#D4AF37]">/uxPreferences/&#123;userId&#125;</code>), Global UI Layout Config (<code className="font-mono text-[#D4AF37]">/uiConfig/&#123;configId&#125;</code>), CMS presentation, and KYC dossiers.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-data">
                <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-700/70 text-emerald-300 font-semibold">
                  rules_version = &apos;2&apos; · Zero-Trust Active
                </span>
              </div>
            </div>

            {/* Live UX/UI Global Configuration Controls (Synced to /uiConfig/global in Firestore) */}
            <div className="p-6 rounded-xl bg-[#111722] border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">
                    Live UX / IX Interface Configuration (<code className="font-mono text-xs text-[#D4AF37]">/uiConfig/global</code>)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Protected by <code className="font-mono text-slate-300">isValidUiConfig(request.resource.data, configId)</code> — authenticated read, strict Admin-only write.
                  </p>
                </div>
                <span className="text-[11px] font-mono-data text-slate-400">
                  Last Sync: {uiConfig.updatedAt?.slice(0, 19).replace('T', ' ')} UTC
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <label className="flex items-start justify-between gap-3 p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-semibold text-white">Sovereign Hero &amp; Dispatch Bar Visibility</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Controls <code className="font-mono text-[#D4AF37]">heroBannerVisible</code> boolean rule in Firestore
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uiConfig.heroBannerVisible}
                    onChange={(e) => {
                      onUpdateUiConfig?.({ heroBannerVisible: e.target.checked });
                      triggerSavedBanner('UX Config synced to Firestore (/uiConfig/global)');
                    }}
                    className="mt-1 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </label>

                <label className="flex items-start justify-between gap-3 p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-semibold text-white">Live Multi-Currency Gold Price Ticker</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Controls <code className="font-mono text-[#D4AF37]">goldTickerEnabled</code> boolean rule in Firestore
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uiConfig.goldTickerEnabled}
                    onChange={(e) => {
                      onUpdateUiConfig?.({ goldTickerEnabled: e.target.checked });
                      triggerSavedBanner('UX Config synced to Firestore (/uiConfig/global)');
                    }}
                    className="mt-1 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </label>

                <label className="flex items-start justify-between gap-3 p-3.5 rounded-lg bg-[#0B0F17] border border-slate-800 cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-semibold text-white">Scam Immunity Diagnostic Auto-Expand</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Controls <code className="font-mono text-[#D4AF37]">scamDiagnosticExpanded</code> boolean rule in Firestore
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={uiConfig.scamDiagnosticExpanded}
                    onChange={(e) => {
                      onUpdateUiConfig?.({ scamDiagnosticExpanded: e.target.checked });
                      triggerSavedBanner('UX Config synced to Firestore (/uiConfig/global)');
                    }}
                    className="mt-1 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </label>
              </div>
            </div>

            {/* UX/UI & Collection Security Rules Matrix */}
            <div className="p-6 rounded-xl bg-[#111722] border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">
                    Firestore UX / IX &amp; Data Security Matrix (<code className="font-mono text-xs text-[#D4AF37]">firestore.rules</code>)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Enforces strict schema validation (<code className="font-mono text-slate-300">hasRequiredFields</code>, <code className="font-mono text-slate-300">hasOnlyAllowedFields</code>, string size bounds, and UID ownership).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const rulesSnippet = `match /uxPreferences/{userId} {\n  allow get, list: if isOwner(userId) || isAdmin();\n  allow create, update: if isOwner(userId) && isValidId(userId) && isValidUxPreferences(request.resource.data, userId);\n  allow delete: if isOwner(userId) || isAdmin();\n}\n\nmatch /uiConfig/{configId} {\n  allow get, list: if isSignedIn();\n  allow create, update: if isAdmin() && isValidId(configId) && isValidUiConfig(request.resource.data, configId);\n  allow delete: if isAdmin();\n}`;
                    navigator.clipboard?.writeText(rulesSnippet);
                    setCopiedRules(true);
                    setTimeout(() => setCopiedRules(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded bg-[#182232] hover:bg-[#222E42] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold transition-colors self-start sm:self-auto"
                >
                  {copiedRules ? 'Copied UX/UI Rules!' : 'Copy UX/UI Rules Snippet'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-[#182232] text-slate-300 font-mono-data uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Firestore Path</th>
                      <th className="py-2.5 px-3">UX / IX Domain Purpose</th>
                      <th className="py-2.5 px-3">Read (get / list)</th>
                      <th className="py-2.5 px-3">Write (create / update)</th>
                      <th className="py-2.5 px-3">Validator Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono-data text-[11px] text-slate-300">
                    <tr className="bg-[#0B0F17]/60">
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/uxPreferences/&#123;userId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">Per-User Language, Currency, RTL &amp; Density</td>
                      <td className="py-2.5 px-3 text-emerald-400">isOwner(userId) || isAdmin()</td>
                      <td className="py-2.5 px-3 text-amber-300">isOwner(userId)</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidUxPreferences()</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/uiConfig/&#123;configId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">Global UX Layout &amp; Ticker Toggles</td>
                      <td className="py-2.5 px-3 text-emerald-400">isSignedIn()</td>
                      <td className="py-2.5 px-3 text-amber-300">isAdmin()</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidUiConfig()</td>
                    </tr>
                    <tr className="bg-[#0B0F17]/60">
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/aboutContent/&#123;docId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">About Us Headline, Mandate &amp; Copy UX</td>
                      <td className="py-2.5 px-3 text-emerald-400">isSignedIn()</td>
                      <td className="py-2.5 px-3 text-amber-300">isAdmin()</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidAboutContent()</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/boardMembers/&#123;memberId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">Board of Directors UX Cards</td>
                      <td className="py-2.5 px-3 text-emerald-400">isSignedIn()</td>
                      <td className="py-2.5 px-3 text-amber-300">isAdmin()</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidBoardMember()</td>
                    </tr>
                    <tr className="bg-[#0B0F17]/60">
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/posts/&#123;postId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">Blog Dispatches &amp; Social Share UX</td>
                      <td className="py-2.5 px-3 text-emerald-400">published == true || isStaffOrAdmin()</td>
                      <td className="py-2.5 px-3 text-amber-300">isAdmin()</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidPost()</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/photos/&#123;photoId&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">Field &amp; Assay Vault Media Gallery UX</td>
                      <td className="py-2.5 px-3 text-emerald-400">isSignedIn()</td>
                      <td className="py-2.5 px-3 text-amber-300">isAdmin()</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidPhoto()</td>
                    </tr>
                    <tr className="bg-[#0B0F17]/60">
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/registrations/&#123;id&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">7-Day Expedition Dossiers &amp; Charter</td>
                      <td className="py-2.5 px-3 text-emerald-400">userId == auth.uid || isStaffOrAdmin()</td>
                      <td className="py-2.5 px-3 text-amber-300">Owner Create / Staff &amp; Admin Review</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidRegistration()</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-[#D4AF37] font-bold">/documentVerifications/&#123;id&#125;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">24–72h Forensic Audit Dossiers ($2,500)</td>
                      <td className="py-2.5 px-3 text-emerald-400">userId == auth.uid || isStaffOrAdmin()</td>
                      <td className="py-2.5 px-3 text-amber-300">Owner Create / Staff Officer 1 Update</td>
                      <td className="py-2.5 px-3 text-slate-400">isValidDocumentVerification()</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Online Payment Gateway Configuration */}
            <div className="p-6 rounded-xl bg-[#111722] border border-slate-800 space-y-4 text-xs max-w-3xl">
              <div className="pb-2 border-b border-slate-800">
                <h4 className="font-cinzel text-base font-bold text-white">
                  Online Payment Gateway Configuration
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configured for encrypted online payment session requests.
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-mono-data block mb-1">API Endpoint URL:</span>
                <input
                  type="text"
                  readOnly
                  value="https://payments.relworx.com/api/visa/request-session"
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-slate-200 font-mono-data text-xs"
                />
              </div>

              <div>
                <span className="text-slate-400 font-mono-data block mb-1">
                  Environment Variable Keys:
                </span>
                <div className="p-3 bg-[#0B0F17] rounded border border-slate-800 font-mono-data text-[11px] text-slate-300 space-y-1">
                  <div>RELWORX_API_KEY=&quot;YOUR_API_KEY&quot;</div>
                  <div>RELWORX_ACCOUNT_NO=&quot;YOUR_ACCOUNT_NUMBER&quot;</div>
                </div>
              </div>

              <div className="p-3 rounded bg-[#0B0F17] border border-emerald-800/50 text-emerald-300">
                <span className="font-bold">Settings Status: </span>
                Proxy router <code className="font-mono text-white">/api/payments/relworx-session</code> is active with automatic fallback simulation and seamless live activation once keys are set.
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: HISTORICAL GOLD PRICE TRENDS (MULTI-CURRENCY RECHARTS) */}
        {activeTab === 'gold-trends' && (
          <div className="space-y-6">
            <GoldPriceTrendsChart initialCurrency={selectedCurrency} portalContext="admin" />
          </div>
        )}

        {/* Persistent Multi-Currency Gold Price Trends Overview in Admin Dashboard */}
        {activeTab !== 'gold-trends' && (
          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <GoldPriceTrendsChart initialCurrency={selectedCurrency} portalContext="admin" />
          </div>
        )}
      </div>

      {/* MODAL: ADD OR EDIT BLOG / CONTENT POST */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-2xl w-full space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {editingPostId ? 'Edit / Modify Blog Article' : 'Create New Blog Article / Dispatch'}
              </h4>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. Busia Gold Corridor Production Update"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e: any) => setPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  >
                    <option value="Intelligence Briefing">Intelligence Briefing</option>
                    <option value="Regulatory Alert">Regulatory Alert</option>
                    <option value="Field Dispatch">Field Dispatch</option>
                    <option value="Market Update">Market Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Author Role / Title</label>
                  <input
                    type="text"
                    value={postAuthorRole}
                    onChange={(e) => setPostAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={postImageUrl}
                    onChange={(e) => setPostImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Or Upload Cover Photo From Device
                  </label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0B0F17] hover:bg-[#182232] border border-dashed border-slate-600 rounded text-slate-300 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Choose Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUploadToDataUrl(e, setPostImageUrl)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Executive Summary</label>
                <input
                  type="text"
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Brief 1-2 sentence teaser summary"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Full Article Body *</label>
                <textarea
                  rows={6}
                  required
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white leading-relaxed"
                  placeholder="Detailed findings and forensic recommendations..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postPublished}
                    onChange={(e) => setPostPublished(e.target.checked)}
                    className="rounded text-[#D4AF37]"
                  />
                  <span className="text-slate-300">Published on Public Blog</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
                  >
                    {editingPostId ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT PHOTO */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {editingPhotoId ? 'Edit / Modify Photo Asset' : 'Upload / Add New Photo Asset'}
              </h4>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSavePhoto} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="e.g. Entebbe Bonded Vault Smelting Unit"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Image URL or Data Path *</label>
                <input
                  type="text"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="/src/assets/images/... or https://..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Or Upload Photo Directly From Computer
                </label>
                <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0B0F17] hover:bg-[#182232] border border-dashed border-slate-600 rounded text-slate-300 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Select Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUploadToDataUrl(e, setPhotoUrl)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={photoCategory}
                  onChange={(e: any) => setPhotoCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                >
                  <option value="Field Operations">Field Operations</option>
                  <option value="Assay Lab">Assay Lab</option>
                  <option value="VIP Transport">VIP Transport</option>
                  <option value="Refinery">Refinery</option>
                  <option value="Concessions">Concessions</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Caption</label>
                <textarea
                  rows={3}
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  placeholder="Technical description of equipment or site coordinates"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
                >
                  {editingPhotoId ? 'Save Photo Changes' : 'Add Photo to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT BOARD MEMBER / DIRECTOR */}
      {showBoardModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111722] border border-slate-700 rounded-xl p-6 max-w-xl w-full space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {editingBoardId
                  ? 'Edit / Modify Board Director Profile'
                  : 'Add Board Member / Director'}
              </h4>
              <button
                onClick={() => setShowBoardModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBoardMember} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                    placeholder="e.g. Mugisa Solomon Byakutaaga"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Role / Executive Title *</label>
                  <input
                    type="text"
                    required
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                    placeholder="e.g. Lead Forensics Expert"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Board Designation</label>
                  <select
                    value={memberDesignation}
                    onChange={(e: any) => setMemberDesignation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  >
                    <option value="Board of Directors">Board of Directors</option>
                    <option value="Executive Directorate">Executive Directorate</option>
                    <option value="Advisory Council">Advisory Council</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Specialty / Mandate</label>
                  <input
                    type="text"
                    value={memberSpecialty}
                    onChange={(e) => setMemberSpecialty(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={memberImageUrl}
                    onChange={(e) => setMemberImageUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Upload Director Portrait</label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0B0F17] hover:bg-[#182232] border border-dashed border-slate-600 rounded text-slate-300 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUploadToDataUrl(e, setMemberImageUrl)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Executive Biography</label>
                <textarea
                  rows={4}
                  value={memberBio}
                  onChange={(e) => setMemberBio(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Key Credentials (One per line)
                </label>
                <textarea
                  rows={3}
                  value={memberCredentialsText}
                  onChange={(e) => setMemberCredentialsText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0B0F17] border border-slate-700 rounded text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBoardModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-[#0B0F17] bg-[#D4AF37] hover:bg-[#FEF3C7] rounded"
                >
                  {editingBoardId ? 'Save Director Changes' : 'Add to Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
