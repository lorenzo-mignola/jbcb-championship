import type { ServiceAccount } from 'firebase-admin/app';

import { FIREBASE_SERVICE_ACCOUNT } from '$app/env/private';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import type { AllowedUser } from '../types/allowed-user.type';
import type { Category } from '../types/category.type';

export const CATEGORIES_COLLECTION = 'categories';
export const ALLOWED_ACCOUNTS_COLLECTION = 'allowed_accounts';

function getServiceAccount(): ServiceAccount | null {
  if (!FIREBASE_SERVICE_ACCOUNT?.trim()) {
    return null;
  }
  try {
    const parsed = JSON.parse(FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
    if (parsed && typeof parsed === 'object' && 'project_id' in parsed) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

if (getApps().length === 0) {
  const serviceAccount = getServiceAccount();

  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    initializeApp({
      projectId: 'jbcb-championship',
    });
  }
}

export const categoryConverter = {
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>,
  toFirestore: (data: Omit<Category, 'id'>) => data,
};

export const allowedUserConverter = {
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<AllowedUser, 'id'>,
  toFirestore: (data: Omit<AllowedUser, 'id'>) => data,
};

export const db = getFirestore();

try {
  db.settings({ ignoreUndefinedProperties: true });
} catch {
  // Settings may already be locked if Firestore was initialized previously (e.g., during HMR)
}
