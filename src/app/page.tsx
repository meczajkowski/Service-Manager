import { auth } from '@/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div>
        Not logged in
        <Link href="/api/auth/signin">Sign in</Link>
      </div>
    );
  }

  return (
    <div>
      Logged in
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Link href="/api/auth/signout">Sign out</Link>
    </div>
  );
}
