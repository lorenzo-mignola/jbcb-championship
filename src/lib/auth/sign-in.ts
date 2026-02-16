import { signIn } from './auth-client'; // import the auth client

export async function signInWithGoogle() {
  await signIn.social({
    errorCallbackURL: '/error',
    newUserCallbackURL: '/',
    provider: 'google',
  });
}
