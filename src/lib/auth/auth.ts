import { BETTER_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { betterAuth } from 'better-auth';
import { firestoreAdapter } from 'better-auth-firestore';

import { db } from '../db/firebase';

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  database: firestoreAdapter({
    firestore: db,
    namingStrategy: 'default',
  }),
  socialProviders: {
    google: {
      accessType: 'offline',
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      prompt: 'select_account consent',
    },
  },
});
