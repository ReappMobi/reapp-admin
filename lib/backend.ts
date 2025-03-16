'use server';
import { type Account, AccountStatus, AccountType } from '@/types/account';
import { cookies } from 'next/headers';

const backendUrl = process.env.API_URL || 'http://localhost:3000';

export async function login(email: string, password: string): Promise<boolean> {
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const cookieStore = await cookies();

    const user = {
      name: data.user.name,
      email: data.user.email,
    };

    cookieStore.set('token', data.token);
    cookieStore.set('user', JSON.stringify(user));
    return true;
  }

  return false;
}

export async function getInstitutions(): Promise<Account[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  try {
    const response = await fetch(
      `${backendUrl}/account?type=${AccountType.INSTITUTION}`,
      {
        cache: 'default',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const institutions = await response.json();
    return institutions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateAccountStatus(
  id: number,
  status: AccountStatus,
): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  await fetch(`${backendUrl}/account/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });
}

export async function getPendingInstitutions(): Promise<Account[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  try {
    const response = await fetch(
      `${backendUrl}/account?type=${AccountType.INSTITUTION}&status=${AccountStatus.PENDING}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const institutions = await response.json();
    return institutions;
  } catch {
    return [];
  }
}
