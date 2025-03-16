import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { AvatarOptions } from './components/avatar-options';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const user = userCookie ? JSON.parse(userCookie.value || '{}') : {};
  return (
    <>
      <header>
        <div className="flex items-center justify-between border-b px-10 py-2">
          <div className="flex items-center space-x-10">
            <Link className="flex items-center space-x-2" href="/">
              <Image
                src="/images/logo.png"
                alt="Reapp"
                width={32}
                height={32}
              />
              <h1 className="font-semibold text-xl">Reapp</h1>
            </Link>
            <nav className="mt-1 flex items-center space-x-6 text-sm">
              <Link href="/" className="cursor-pointer">
                Início
              </Link>
              <Link href="/pending-approval" className="cursor-pointer">
                Aprovações
              </Link>
              <Link href="/institutions" className="cursor-pointer">
                Instituições
              </Link>
              <Link href="/" className="cursor-pointer">
                Campanhas
              </Link>
            </nav>
          </div>
          <AvatarOptions name={user.name} />
        </div>
      </header>
      <main className="flex-1 py-4">{children}</main>
    </>
  );
}
