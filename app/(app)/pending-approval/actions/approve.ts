'use server';

import { updateAccountStatus } from '@/lib/backend';
import { AccountStatus } from '@/types/account';
import { redirect } from 'next/navigation';

export async function handleInstitutionApproval(
  formData: FormData,
): Promise<void> {
  const id = formData.get('id') as string;
  const action = formData.get('action') as string;
  if (action === 'approve') {
    await updateAccountStatus(+id, AccountStatus.ACTIVE);
  } else if (action === 'reject') {
    await updateAccountStatus(+id, AccountStatus.SUSPENDED);
  }

  redirect('/pending-approval');
}
