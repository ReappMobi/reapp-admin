'use server';

import backend from '@/lib/backend';
import type { GetPendingApprovalInstitution } from '@/types/institution';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loadInstitutions(): Promise<
  GetPendingApprovalInstitution[] | undefined
> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const institutions = await backend.getPendingInstitutions(token);
  return institutions;
}

export async function approveInstitution(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const action = formData.get('action') as string;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';

  if (action === 'approve') {
    await backend.approveInstitution(token, +id);
  } else if (action === 'reject') {
    await backend.rejectInstitution(token, +id);
  }

  redirect('/pending');
}
