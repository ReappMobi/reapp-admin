'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getInstitutions } from '@/lib/backend';
import { AccountStatus } from '@/types/account';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default async function Page() {
  const institutions = (await getInstitutions()).filter(
    (account) => account.status !== AccountStatus.PENDING,
  );

  return (
    <div className="container mx-auto h-full max-w-screen-lg">
      <Card
        x-chunk="dashboard-06-chunk-0"
        className="h-full w-full flex-1 border-0 shadow-none"
      >
        <CardHeader>
          <CardTitle className="text-2xl">Instituições</CardTitle>
          <CardDescription className="text-xs">
            Lista de instituições cadastradas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={institutions} />
        </CardContent>
      </Card>
    </div>
  );
}
