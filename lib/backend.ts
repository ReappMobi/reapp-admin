const backendUrl = process.env.API_URL || 'http://localhost:3000';

async function getPendingInstitutions(token: string) {
  const data = await fetch(`${backendUrl}/account/institutions/pending`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function approveInstitution(token: string, id: number) {
  const data = await fetch(`${backendUrl}/account/institution/approve/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function rejectInstitution(token: string, id: number) {
  const data = await fetch(`${backendUrl}/account/institution/reject/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export default {
  getPendingInstitutions,
  approveInstitution,
  rejectInstitution,
};
