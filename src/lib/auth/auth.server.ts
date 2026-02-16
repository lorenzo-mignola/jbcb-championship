import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth';
import { firestoreAdapter } from 'better-auth-firestore';

import { db } from '../db/firebase';

const { BETTER_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

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
