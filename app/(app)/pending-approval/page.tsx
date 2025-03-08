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
import { MoreHorizontal } from 'lucide-react';
import Form from 'next/form';
import { approveInstitution, loadInstitutions } from './actions/approve';
import { ActionButtons } from './components/action-buttons';

export default async function Page() {
  const institutions = (await loadInstitutions()) || [];

  return (
    <div className="container mx-auto max-w-screen-md p-10">
      <Card
        x-chunk="dashboard-06-chunk-0"
        className="w-full flex-1 md:max-w-screen-lg"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Aprovações</CardTitle>
          <CardDescription className="text-xs">
            Lista de instituições que estão aguardando aprovação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(institutions.length === 0 && (
            <p className="py-4 text-center text-sm">
              Nenhuma instituição para aprovar.
            </p>
          )) || (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
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
                {institutions.map((institution) => (
                  <TableRow key={institution.id}>
                    <TableCell className="font-medium">
                      {institution.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(institution.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {institution.status === 'PENDING'
                          ? 'Pendente'
                          : institution.status === 'APPROVED'
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
                          <Form
                            className="flex flex-col gap-2"
                            action={approveInstitution}
                            formMethod="POST"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={institution.id}
                            />
                            <ActionButtons />
                          </Form>
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
    </div>
  );
}
