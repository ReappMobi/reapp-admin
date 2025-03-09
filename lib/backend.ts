'use server';
import { type Account, AccountStatus, AccountType } from '@/types/account';
import { cookies } from 'next/headers';

const backendUrl = process.env.API_URL || 'http://localhost:3000';

export async function getInstitutions(): Promise<Account[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  try {
    const response = await fetch(
      `${backendUrl}/account?type=${AccountType.INSTITUTION}`,
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
