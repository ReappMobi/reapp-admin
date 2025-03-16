'use server';

import { updateAccountStatus } from '@/lib/backend';
import { AccountStatus } from '@/types/account';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const institutionId = formData.get('institutionId');
  if (!institutionId) {
    return Response.redirect(
      new URL('/institutions?error=missing-id', request.url),
      303,
    );
  }

  const action = formData.get('action') as AccountStatus;
  if (!action) {
    return Response.redirect(
      new URL('/institutions?error=missing-action', request.url),
      303,
    );
  }

  if (!Object.values(AccountStatus).includes(action as AccountStatus)) {
    return Response.redirect(
      new URL('/institutions?error=invalid-action', request.url),
      303,
    );
  }

  await updateAccountStatus(+institutionId, action);

  return Response.redirect(new URL('/institutions', request.url), 303);
}
