import { cookies } from 'next/headers';

type RequestData = {
  duplex: string;
} & RequestInit;

const api = async (path: string, data: RequestData) => {
  const url = process.env.API_URL + path;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...data,
  });
  return response;
};

export async function POST(request: Request) {
  const data = await api('/auth/login', {
    method: 'POST',
    duplex: 'half',
    body: request.body,
  });

  const data_json = await data.json();
  if (data.ok) {
    const cookieStore = await cookies();
    cookieStore.set('token', data_json.token);
    return Response.json({}, { status: 200 });
  }

  return Response.json({}, { status: 400 });
}
