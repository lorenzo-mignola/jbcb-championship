import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  BETTER_AUTH_SECRET: {
    schema: (value: string | undefined) => value ?? '',
  },
  BETTER_AUTH_URL: {
    schema: (value: string | undefined) => value ?? 'http://localhost:5173',
  },
  FIREBASE_SERVICE_ACCOUNT: {
    schema: (value: string | undefined) => value ?? '',
  },
  GOOGLE_CLIENT_ID: {
    schema: (value: string | undefined) => value ?? '',
  },
  GOOGLE_CLIENT_SECRET: {
    schema: (value: string | undefined) => value ?? '',
  },
  PUBLIC_AUTO_PRINT: {
    public: true,
    schema: (value: string | undefined) => value ?? 'false',
  },
});
