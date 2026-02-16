import { ALLOWED_ACCOUNTS_COLLECTION, allowedUserConverter, db } from './firebase';

export const allowedAccountCollection = db
  .collection(ALLOWED_ACCOUNTS_COLLECTION)
  .withConverter(allowedUserConverter);

export async function isEmailAllowed(email: string): Promise<boolean> {
  if (!email) {
    return false;
  }

  const allowedUser = await allowedAccountCollection
    .where('email', '==', email)
    .where('enabled', '==', true)
    .get();

  return !allowedUser.empty;
}
