import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DEFAULT_REDIRECT, PUBLIC_PATHS } from './routes';
import { users } from './services/users.service';

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

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
        const user = await users.getByEmail(credentials.email as string);

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
        token.id = user.id!;
        token.name = user.name;
        token.email = user.email!;
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
      const isOnPublicRoute = PUBLIC_PATHS.includes(
        nextUrl.pathname as (typeof PUBLIC_PATHS)[number],
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
