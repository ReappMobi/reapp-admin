'use server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPendingInstitutions } from '@/lib/backend';
import { AccountStatus } from '@/types/account';
import { MoreHorizontal } from 'lucide-react';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { ActionButtons } from './components/action-buttons';

export default async function Page() {
  const institutions = await getPendingInstitutions();

  return (
    <div className="container mx-auto h-full max-w-screen-lg">
      <Suspense fallback={<div>Loading...</div>}>
        <Card
          x-chunk="dashboard-06-chunk-0"
          className="h-full w-full flex-1 border-0 shadow-none"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Aprovações</CardTitle>
            <CardDescription className="text-xs">
              Lista de instituições que estão aguardando aprovação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(institutions.length === 0 && (
              <p className="py-32 text-center text-sm">
                Nenhuma instituição para aprovar.
              </p>
            )) || (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Criado em
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span>Ações</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {institutions.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        {account.name}
                      </TableCell>
                      <TableCell>{account.institution?.cnpj}</TableCell>
                      <TableCell>{account.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(account.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {account.status === AccountStatus.PENDING
                            ? 'Pendente'
                            : account.status === AccountStatus.ACTIVE
                              ? 'Aprovado'
                              : 'Recusado'}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ActionButtons id={account.id} />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Suspense>
      <Toaster />
    </div>
  );
}
