import type { Session, User } from 'better-auth';

declare global {
  namespace App {
    interface Locals {
      isAllowed?: boolean;
      session?: Session;
      user?: User;
    }
  }
}

export {};
