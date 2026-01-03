import type { ServiceAccount } from 'firebase-admin/app';

import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import type { Category } from '../types/category.type';

import serviceAccount from '../../../cert/firebase.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const categoryConverter = {
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>,
  toFirestore: (data: Omit<Category, 'id'>) => data,
};

export const db = getFirestore();
export const CATEGORIES_COLLECTION = 'categories';
