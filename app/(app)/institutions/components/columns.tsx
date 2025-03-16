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
import { type Account, AccountStatus } from '@/types/account';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const statusMap = {
  [AccountStatus.ACTIVE]: 'Ativo',
  [AccountStatus.PENDING]: 'Pendente',
  [AccountStatus.SUSPENDED]: 'Suspenso',
  [AccountStatus.BANNED]: 'Banido',
  [AccountStatus.INACTIVE]: 'Inativo',
};

export const columns: ColumnDef<Account>[] = [
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
    cell: ({ row }) => {
      const status = row.getValue('status') as AccountStatus;
      return <div className="text-xs capitalize">{statusMap[status]}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const [action, setAction] = useState<AccountStatus>(AccountStatus.ACTIVE);
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
                value={row.getValue('id') as string}
              />
              <input type="hidden" name="action" value={action} />
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <button
                  type="submit"
                  onClick={() => setAction(AccountStatus.SUSPENDED)}
                >
                  Suspender instituição
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <button
                  type="submit"
                  onClick={() => setAction(AccountStatus.BANNED)}
                >
                  Banir instituição
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <button
                  type="submit"
                  onClick={() => setAction(AccountStatus.PENDING)}
                >
                  Revisar aprovação
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
