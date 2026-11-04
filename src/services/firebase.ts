import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocFromServer,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  type Firestore
} from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';
import type { Language, Currency } from '../types';

// Read Firebase configuration from VITE_ environment variables first (Cloud Run production standard),
// falling back to provisioned firebase-applet-config.json in the AI Studio preview environment.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    appletConfig.measurementId ||
    'G-J9707KXYQY'
};

const firestoreDatabaseId =
  import.meta.env.VITE_FIREBASE_DATABASE_ID ||
  appletConfig.firestoreDatabaseId ||
  '(default)';

// Initialize Firebase App, Auth, Firestore, and Analytics (singleton pattern)
export const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth = getAuth(app);

export const db: Firestore = getFirestore(app, firestoreDatabaseId);

export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics is optional in restricted iframe contexts
    });
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: Array<{
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }>;
  };
}

export interface UxPreferencesDoc {
  userId: string;
  language: Language;
  currency: Currency;
  defaultPage?: string;
  compactMode?: boolean;
  rtlEnabled?: boolean;
  geoAutoDetect?: boolean;
  updatedAt: string;
}

export interface UiConfigDoc {
  id: string;
  heroBannerVisible: boolean;
  goldTickerEnabled: boolean;
  wabaConciergeEnabled: boolean;
  scamDiagnosticExpanded: boolean;
  defaultThemeAccent: 'gold' | 'emerald' | 'slate';
  updatedBy?: string;
  updatedAt: string;
}

export const DEFAULT_UI_CONFIG: UiConfigDoc = {
  id: 'global',
  heroBannerVisible: true,
  goldTickerEnabled: true,
  wabaConciergeEnabled: true,
  scamDiagnosticExpanded: true,
  defaultThemeAccent: 'gold',
  updatedAt: new Date().toISOString()
};

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): FirestoreErrorInfo {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  return errInfo;
}

// Validate connectivity to Firestore on boot
export async function testFirestoreConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration. The client is offline.');
    }
  }
}

// Resolve a user's institutional role ('admin' | 'staff' | 'client') from Firestore /users/{uid} and verified email rules
export async function resolveUserRole(
  user: User | null
): Promise<'admin' | 'staff' | 'client'> {
  if (!user) return 'client';
  const email = (user.email || '').trim().toLowerCase();
  if (email === 'mugisolo@gmail.com' || email.startsWith('admin@')) {
    return 'admin';
  }
  if (email.startsWith('staff@') || email.startsWith('officer@') || email.includes('mwesigye')) {
    return 'staff';
  }
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const role = snap.data()?.role;
      if (role === 'admin' || role === 'staff' || role === 'client') {
        return role;
      }
    }
  } catch {
    // Fallback to client if offline or restricted
  }
  return 'client';
}

// Sign in with Google Provider and bootstrap /users/{uid} profile in Firestore
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    const nowIso = new Date().toISOString();
    const defaultRole =
      (user.email || '').toLowerCase() === 'mugisolo@gmail.com' ? 'admin' : 'client';

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email || 'principal@ugandagoldexpedition.org',
        displayName: user.displayName || 'Institutional Principal',
        role: defaultRole,
        createdAt: nowIso,
        updatedAt: nowIso
      });
    } else {
      const existing = snap.data();
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email || existing.email,
          displayName: user.displayName || existing.displayName || 'Institutional Principal',
          role: existing.role || defaultRole,
          createdAt: existing.createdAt || nowIso,
          updatedAt: nowIso
        },
        { merge: true }
      );
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
  }

  return user;
}

export async function signOutFirebaseUser(): Promise<void> {
  await signOut(auth);
}

// Helper to persist a per-user document to Firestore when signed in
export async function saveDocumentToFirestore<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  payload: T
): Promise<void> {
  if (!auth.currentUser) return;
  const path = `${collectionName}/${docId}`;
  try {
    await setDoc(
      doc(db, collectionName, docId),
      {
        ...payload,
        userId: payload.userId || auth.currentUser.uid
      },
      { merge: true }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Helper to persist per-user UX/UI preferences (/uxPreferences/{uid})
export async function saveUxPreferencesToFirestore(
  prefs: Omit<UxPreferencesDoc, 'userId' | 'updatedAt'>
): Promise<void> {
  if (!auth.currentUser) return;
  const uid = auth.currentUser.uid;
  const path = `uxPreferences/${uid}`;
  try {
    const payload: UxPreferencesDoc = {
      userId: uid,
      language: prefs.language,
      currency: prefs.currency,
      defaultPage: prefs.defaultPage || 'home',
      compactMode: Boolean(prefs.compactMode),
      rtlEnabled: prefs.language === 'AR' || Boolean(prefs.rtlEnabled),
      geoAutoDetect: prefs.geoAutoDetect !== false,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'uxPreferences', uid), payload, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Helper to persist global UX/UI & CMS documents (uiConfig, aboutContent, boardMembers, posts, photos)
export async function saveGlobalDocToFirestore<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  payload: T
): Promise<void> {
  if (!auth.currentUser) return;
  const path = `${collectionName}/${docId}`;
  try {
    await setDoc(doc(db, collectionName, docId), payload, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Helper to delete a global CMS document when signed in as admin
export async function deleteGlobalDocFromFirestore(
  collectionName: string,
  docId: string
): Promise<void> {
  if (!auth.currentUser) return;
  const path = `${collectionName}/${docId}`;
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export {
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  type User
};
