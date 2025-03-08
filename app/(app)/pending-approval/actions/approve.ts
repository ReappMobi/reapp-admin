'use server';

import backend from '@/lib/backend';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { act } from 'react';

export async function loadInstitutions() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const res = await backend.getPendingInstitutions(token);
  const institutions = await res.json();
  return institutions;
}

export async function approveInstitution(formData: FormData) {
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
