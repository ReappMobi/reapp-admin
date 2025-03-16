'use client';

import { updateAccountStatus } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
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
      return (
        <Badge variant={'outline'} className="text-xs capitalize">
          {statusMap[status]}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="w-full cursor-pointer text-left"
              asChild
            >
              <Button
                variant={'ghost'}
                onClick={() =>
                  updateAccountStatus(
                    id,
                    AccountStatus.SUSPENDED,
                    '/institutions',
                  )
                }
              >
                Suspender instituição
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full cursor-pointer text-left"
              asChild
            >
              <Button
                variant={'ghost'}
                onClick={() =>
                  updateAccountStatus(id, AccountStatus.BANNED, '/institutions')
                }
              >
                Banir instituição
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full cursor-pointer text-left"
              asChild
            >
              <Button
                variant={'ghost'}
                onClick={() =>
                  updateAccountStatus(
                    id,
                    AccountStatus.PENDING,
                    '/institutions',
                  )
                }
              >
                Revogar aprovação
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
