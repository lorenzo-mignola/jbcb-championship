import type { ServiceAccount } from 'firebase-admin/app';

import { FIREBASE_CERT_PATH } from '$env/static/private';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import type { Category } from '../types/category.type';

const rootDir = process.cwd();
const certPath = path.join(rootDir, FIREBASE_CERT_PATH);
const serviceAccount = JSON.parse(fs.readFileSync(certPath, 'utf-8')) as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount),
});

export const categoryConverter = {
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as Omit<Category, 'id'>,
  toFirestore: (data: Omit<Category, 'id'>) => data,
};

export const db = getFirestore();
export const CATEGORIES_COLLECTION = 'categories';
