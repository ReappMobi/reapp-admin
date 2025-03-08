import type {
  GetInstitution,
  GetPendingApprovalInstitution,
} from '@/types/institution';

const backendUrl = process.env.API_URL || 'http://localhost:3000';

async function getInstitutions(token: string): Promise<GetInstitution[]> {
  try {
    const response = await fetch(`${backendUrl}/account/institution`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const institutions = await response.json();
    return institutions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getPendingInstitutions(
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

async function approveInstitution(token: string, id: number): Promise<void> {
  await fetch(`${backendUrl}/account/institution/approve/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

async function rejectInstitution(token: string, id: number): Promise<void> {
  await fetch(`${backendUrl}/account/institution/reject/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export default {
  getPendingInstitutions,
  approveInstitution,
  rejectInstitution,
  getInstitutions,
};
