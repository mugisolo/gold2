# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Default-Deny Safety Net**: Every unmatched path is strictly denied (`allow read, write: if false;`).
2. **ID Poisoning Guard**: Every single-document target path variable (`{userId}`, `{registrationId}`, `{verificationId}`, `{subscriberId}`, etc.) must satisfy `isValidId(id)` (`id is string && id.size() >= 1 && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`).
3. **Newsletter Subscriber Integrity (`/newsletterSubscribers/{subscriberId}`)**:
   - **Creation**: Must match `isValidNewsletterSubscriber(request.resource.data, subscriberId)` with strict required keys (`id`, `email`, `interestTrack`, `source`, `status`, `subscribedAt`) and allowed keys (`id`, `email`, `fullName`, `organization`, `interestTrack`, `source`, `status`, `subscribedAt`, `userId`).
   - **Identity Binding**: If `userId` is included in the payload, the requester must be signed in and `request.resource.data.userId == request.auth.uid`.
   - **PII Protection**: Reading (`get`, `list`) subscriber emails from `/newsletterSubscribers/{subscriberId}` is strictly restricted to `isStaffOrAdmin()` or the authenticated subscriber who owns the record (`isSignedIn() && resource.data.userId == request.auth.uid`). Public/anonymous scraping is strictly forbidden.
   - **Immutable Core Fields on Update**: Only admins or the authenticated owner can update status (`active` / `unsubscribed`), while `id`, `email`, and `subscribedAt` remain immutable.
4. **Role & Privilege Isolation (`/users/{userId}`)**:
   - Non-admin users cannot self-assign `role: 'admin'` or `role: 'staff'` on creation or update.
   - Admin checks require verified email (`request.auth.token.email == "mugisolo@gmail.com" && request.auth.token.email_verified == true`) or verified `/users/$(request.auth.uid)` document with `role == 'admin'`.
5. **Immutable Audit Logs (`/auditLogs/{logId}`)**:
   - Once created by staff or admin, audit logs can never be updated or deleted (`allow update, delete: if false;`).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Shadow Field Injection on `newsletterSubscribers`**:
   `{ "id": "NEWS-100", "email": "visitor@example.com", "interestTrack": "All Briefings & Field Dispatches", "source": "footer", "status": "active", "subscribedAt": "2026-11-04 12:00 UTC", "isAdmin": true }` -> Rejected by `hasOnlyAllowedFields`.
2. **Invalid Email Format on `newsletterSubscribers`**:
   `{ "id": "NEWS-101", "email": "not-an-email", "interestTrack": "All Briefings & Field Dispatches", "source": "blog", "status": "active", "subscribedAt": "2026-11-04 12:00 UTC" }` -> Rejected by `isValidEmail`.
3. **ID Mismatch / Poisoning on `newsletterSubscribers`**:
   Path `/newsletterSubscribers/NEWS-102` with payload `id: "NEWS-999"` -> Rejected by `data.id == subscriberId`.
4. **Spoofed `userId` on `newsletterSubscribers`**:
   User `uid-attacker` writes `{ "id": "NEWS-103", "userId": "uid-victim", ... }` -> Rejected by `(!('userId' in data) || (isSignedIn() && data.userId == request.auth.uid))`.
5. **Unauthorized PII Scraping (`list` on `newsletterSubscribers`)**:
   Unauthenticated or unrelated client user queries `collection(db, 'newsletterSubscribers')` without owner filter -> Rejected by `allow get, list: if isStaffOrAdmin() || (isSignedIn() && resource.data.userId == request.auth.uid);`.
6. **Privilege Escalation on `users`**:
   Client user `uid-1` creates `/users/uid-1` with `{ "role": "admin" }` -> Rejected because non-admin creation requires `request.resource.data.role == 'client'`.
7. **Unverified Admin Email Spoof**:
   Token with `email: "mugisolo@gmail.com"` and `email_verified: false` attempts admin write -> Rejected by `request.auth.token.email_verified == true`.
8. **Cross-Tenant Registration Read**:
   Client `uid-A` attempts `get` on `/registrations/reg-B` owned by `uid-B` -> Rejected by `resource.data.userId == request.auth.uid || isStaffOrAdmin()`.
9. **Document Verification Fee Tampering**:
   Client creates `/documentVerifications/doc-1` with `feeUsd: 10` -> Rejected by `data.feeUsd == 2500`.
10. **Immutable Audit Log Tampering**:
    Admin attempts `delete` or `update` on `/auditLogs/AUDIT-1` -> Rejected by `allow update, delete: if false;`.
11. **Oversized String Denial-of-Wallet on `newsletterSubscribers`**:
    Payload with 5,000-character `fullName` -> Rejected by `data.fullName.size() <= 120`.
12. **Invalid Enum Value on `newsletterSubscribers.source`**:
    Payload with `source: "malicious_script"` -> Rejected by `data.source in ['footer', 'blog', 'homepage', 'website']`.
