import { getFirestore } from 'firebase-admin/firestore';
import type { Category } from '../types/category.type';

export const db = getFirestore();

db.settings({ ignoreUndefinedProperties: true });

export const categoryConverter = {
  toFirestore: (data: Omit<Category, 'id'>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>
};

export const CATEGORIES_COLLECTION = 'categories';
export const categoriesCollection = db
  .collection(CATEGORIES_COLLECTION)
  .withConverter(categoryConverter);
