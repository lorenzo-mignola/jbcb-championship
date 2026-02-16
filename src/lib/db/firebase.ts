import type { ServiceAccount } from 'firebase-admin/app';

import { FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import type { Category } from '../types/category.type';

if (getApps().length === 0) {
  const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const categoryConverter = {
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>,
  toFirestore: (data: Omit<Category, 'id'>) => data,
};

export const db = getFirestore();

db.settings({ ignoreUndefinedProperties: true });
export const CATEGORIES_COLLECTION = 'categories';
