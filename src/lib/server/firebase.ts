import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID
} from '$env/static/private';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { Category } from '../types/category.type';

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY
    })
  });
}

export const db = getFirestore();

let settingsCalled = false;

// eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- fix for vite reload
if (!settingsCalled) {
  db.settings({ ignoreUndefinedProperties: true });
  settingsCalled = true;
}

export const categoryConverter = {
  toFirestore: (data: Omit<Category, 'id'>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>
};

export const CATEGORIES_COLLECTION = 'categories';
export const categoriesCollection = db
  .collection(CATEGORIES_COLLECTION)
  .withConverter(categoryConverter);
