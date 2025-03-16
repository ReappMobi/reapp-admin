'use server';
import type { AccountStatus } from '@/types/account';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import * as backend from '@/lib/backend';

export async function login(email: string, passowrd: string) {
  const sucess = await backend.login(email, passowrd);
  return sucess;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');
  redirect('/', RedirectType.replace);
}

export async function updateAccountStatus(
  id: number,
  status: AccountStatus,
  redirectUrl?: string,
) {
  await backend.updateAccountStatus(id, status);
  redirectUrl && redirect(redirectUrl, RedirectType.replace);
}
