import { createAuthClient } from 'better-auth/svelte';

export const { signIn, signOut, signUp, useSession } = createAuthClient();
