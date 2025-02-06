import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { AppRoutes, DEFAULT_REDIRECT, PUBLIC_ROUTES } from './routes';
import { findUserByEmail } from './services/users.service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
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
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.email = user.email as string;
        token.role = user.role;
      }

      if (trigger === 'update') {
        token.name = session.user.name;
        token.email = session.user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;

      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPublicRoute = PUBLIC_ROUTES.includes(
        nextUrl.pathname as AppRoutes,
      );

      if (!isOnPublicRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
      }

      return true;
    },
  },
});
