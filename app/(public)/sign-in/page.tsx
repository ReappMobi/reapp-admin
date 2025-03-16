import { Toaster } from 'sonner';
import { LoginForm } from './components/login-form';

export default function Page() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <section className="w-full max-w-sm">
        <LoginForm />
        <Toaster />
      </section>
    </main>
  );
}
