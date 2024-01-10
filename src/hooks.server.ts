import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID
} from '$env/static/private';
import { cert, initializeApp } from 'firebase-admin/app';

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY
  })
});
