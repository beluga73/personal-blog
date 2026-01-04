import { cookies } from 'next/headers';

import { api } from '@/lib/api';

import { AuthButtons } from './AuthButtons';
import { UserMenu } from './UserMenu';

export async function UserMenuWrapper() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('Auth')?.value;
  const authSig = cookieStore.get('Auth.sig')?.value;

  const headers = {
    Cookie: `Auth=${auth}; Auth.sig=${authSig}`,
  };

  try {
    const user = await api.getCurrentUser(headers);
    return <UserMenu user={user} />;
  } catch {
    return <AuthButtons />;
  }
}
