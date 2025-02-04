import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByEmail } from './services/users.service';

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await findUserByEmail(credentials.email as string);

        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid credentials.');
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
