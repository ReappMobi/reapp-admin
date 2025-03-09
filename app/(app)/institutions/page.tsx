'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getInstitutions } from '@/lib/backend';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export default async function Page() {
  const institutions = await getInstitutions();

  return (
    <div className="container mx-auto h-screen max-w-screen-lg p-10">
      <Card
        x-chunk="dashboard-06-chunk-0"
        className="h-full w-full flex-1 md:max-w-screen-lg"
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
