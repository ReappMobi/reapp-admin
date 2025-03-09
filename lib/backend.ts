'use server';
import {
  AccountStatus,
  AccountType,
  type InstitutionAccount,
} from '@/types/account';
import type { GetPendingApprovalInstitution } from '@/types/institution';

import { cookies } from 'next/headers';

const backendUrl = process.env.API_URL || 'http://localhost:3000';

export async function getInstitutions(): Promise<InstitutionAccount[]> {
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
  action: string,
): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const status =
    action === 'suspend' ? AccountStatus.SUSPENDED : AccountStatus.ACTIVE;

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

export async function getPendingInstitutions(
  token: string,
): Promise<GetPendingApprovalInstitution[] | undefined> {
  const response = await fetch(`${backendUrl}/account/institutions/pending`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const institutions = await response.json();
  return institutions;
}

export async function approveInstitution(
  token: string,
  id: number,
): Promise<void> {
  await fetch(`${backendUrl}/account/institution/approve/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function rejectInstitution(
  token: string,
  id: number,
): Promise<void> {
  await fetch(`${backendUrl}/account/institution/reject/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
