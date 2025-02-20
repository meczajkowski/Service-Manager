import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { AppRoutes } from '@/routes';
import Link from 'next/link';
import { customerTableColumns } from '../../(components)/(tables)/customer-table-columns.const';
import { getCustomersAction } from '../../actions';

const page = async () => {
  const customers = await getCustomersAction();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1>Customers</h1>
        <Button asChild>
          <Link href={AppRoutes.customersNew}>Add Customer</Link>
        </Button>
      </div>
      {customers.length > 0 ? (
        <DataTable columns={customerTableColumns} data={customers} />
      ) : (
        <p>No customers found</p>
      )}
    </div>
  );
};

export default page;
