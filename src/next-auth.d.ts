import { Role } from '@prisma/client';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: Role;
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      image?: string | null;
      role: Role;
    };
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    role: Role;
  }
}
