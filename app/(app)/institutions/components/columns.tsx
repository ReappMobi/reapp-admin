'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Account, InstitutionAccount } from '@/types/account';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<Account & InstitutionAccount>[] = [
  {
    accessorKey: 'id',
    id: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'institution.category.name',
    header: 'Categoria',
  },
  {
    accessorKey: 'institution.cnpj',
    header: 'CNPJ',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="text-xs">{value}</span>;
    },
  },
  {
    accessorKey: 'followersCount',
    header: 'Seguidores',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-xs capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    id: 'actions',
    accessorFn: () => null,
    accessorKey: 'id',
    enableHiding: false,
    cell: ({ row }) => {
      const [action, setAction] = useState('');
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <form action="institutions/mute" method="POST">
              <input
                type="hidden"
                name="institutionId"
                value={row.getValue('id')}
              />
              <input type="hidden" name="action" value={action} />
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <button type="submit" onClick={() => setAction('mute')}>
                  Mutar instituição
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <button type="submit" onClick={() => setAction('suspend')}>
                  Suspender instituição
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
