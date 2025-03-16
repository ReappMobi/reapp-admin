import { cookies } from 'next/headers';
export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');

  return Response.redirect(new URL('/', request.url), 302);
}
