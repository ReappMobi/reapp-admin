'use client';
import { updateAccountStatus } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { AccountStatus } from '@/types/account';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { toast } from 'sonner';

type ActionButtonsProps = {
  id: number;
};

export function ActionButtons({ id }: ActionButtonsProps) {
  async function handleActionClick(action: string) {
    const message = action === 'approve' ? 'aprovar' : 'recusar';
    const status =
      action === 'approve' ? AccountStatus.ACTIVE : AccountStatus.SUSPENDED;

    try {
      await updateAccountStatus(id, status, '/pending-approval');
      toast.success(`Instiuição ${message} com sucesso`);
    } catch (error) {
      if (isRedirectError(error)) {
        return toast.success(`Instiuição ${message} com sucesso`);
      }
      toast.error('Erro ao processar a ação');
    }
  }

  return (
    <>
      <DropdownMenuItem className="cursor-pointer" asChild>
        <Button variant={'ghost'} onClick={() => handleActionClick('approve')}>
          Aprovar
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" asChild>
        <Button variant="ghost" onClick={() => handleActionClick('reject')}>
          Recusar
        </Button>
      </DropdownMenuItem>
    </>
  );
}
