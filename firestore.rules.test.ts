/**
 * Firestore Security Rules Test Suite (Dirty Dozen Adversarial Verification)
 * Validates schema invariants, PII protection, and role isolation for
 * `/newsletterSubscribers/{subscriberId}` and core collections.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'create' | 'update' | 'delete' | 'get' | 'list';
  authUid: string | null;
  payload?: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_PAYLOADS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on newsletterSubscribers',
    collectionPath: '/newsletterSubscribers/NEWS-100',
    operation: 'create',
    authUid: null,
    payload: {
      id: 'NEWS-100',
      email: 'visitor@example.com',
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'footer',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC',
      isAdmin: true
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Invalid Email Format on newsletterSubscribers',
    collectionPath: '/newsletterSubscribers/NEWS-101',
    operation: 'create',
    authUid: null,
    payload: {
      id: 'NEWS-101',
      email: 'not-an-email',
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'blog',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'ID Mismatch / Poisoning on newsletterSubscribers',
    collectionPath: '/newsletterSubscribers/NEWS-102',
    operation: 'create',
    authUid: null,
    payload: {
      id: 'NEWS-999',
      email: 'valid@example.com',
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'footer',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Spoofed userId on newsletterSubscribers',
    collectionPath: '/newsletterSubscribers/NEWS-103',
    operation: 'create',
    authUid: 'uid-attacker',
    payload: {
      id: 'NEWS-103',
      userId: 'uid-victim',
      email: 'attacker@example.com',
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'blog',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Unauthorized PII Scraping (list on newsletterSubscribers)',
    collectionPath: '/newsletterSubscribers',
    operation: 'list',
    authUid: null,
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Privilege Escalation on users',
    collectionPath: '/users/uid-1',
    operation: 'create',
    authUid: 'uid-1',
    payload: {
      uid: 'uid-1',
      email: 'client@example.com',
      role: 'admin',
      createdAt: '2026-11-04T12:00:00Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Unverified Admin Email Spoof on posts',
    collectionPath: '/posts/post-99',
    operation: 'create',
    authUid: 'uid-spoof',
    payload: {
      id: 'post-99',
      title: 'Fake Post',
      category: 'Field Dispatch',
      summary: 'Summary text',
      body: 'Body text minimum length satisfied.',
      author: 'Spoofer',
      date: '2026-11-04',
      published: true
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Cross-Tenant Registration Read',
    collectionPath: '/registrations/reg-B',
    operation: 'get',
    authUid: 'uid-A',
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Document Verification Fee Tampering',
    collectionPath: '/documentVerifications/doc-1',
    operation: 'create',
    authUid: 'uid-client',
    payload: {
      id: 'doc-1',
      userId: 'uid-client',
      clientName: 'John Doe',
      email: 'john@example.com',
      documentType: 'FCO',
      feeUsd: 10,
      paymentStatus: 'paid',
      status: 'analyzing',
      submittedAt: '2026-11-04T12:00:00Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Immutable Audit Log Deletion Attempt',
    collectionPath: '/auditLogs/AUDIT-1',
    operation: 'delete',
    authUid: 'uid-admin',
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Oversized String Denial-of-Wallet on newsletterSubscribers',
    collectionPath: '/newsletterSubscribers/NEWS-111',
    operation: 'create',
    authUid: null,
    payload: {
      id: 'NEWS-111',
      email: 'visitor@example.com',
      fullName: 'A'.repeat(500),
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'footer',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Invalid Enum Value on newsletterSubscribers.source',
    collectionPath: '/newsletterSubscribers/NEWS-112',
    operation: 'create',
    authUid: null,
    payload: {
      id: 'NEWS-112',
      email: 'visitor@example.com',
      interestTrack: 'All Briefings & Field Dispatches',
      source: 'malicious_script',
      status: 'active',
      subscribedAt: '2026-11-04 12:00 UTC'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  }
];
