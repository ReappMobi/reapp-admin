'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

type ActionValue = 'approve' | 'reject';

export function ActionButtons() {
  const [value, setValue] = useState<ActionValue>('approve');
  return (
    <>
      <input type="hidden" name="action" value={value} />
      <DropdownMenuItem className="cursor-pointer" asChild>
        <Button variant={'ghost'} onClick={() => setValue('approve')}>
          Aprovar
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" asChild>
        <Button variant="ghost" onClick={() => setValue('reject')}>
          Recusar
        </Button>
      </DropdownMenuItem>
    </>
  );
}
