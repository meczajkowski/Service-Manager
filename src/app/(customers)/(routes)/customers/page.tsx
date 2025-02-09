import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/routes';
import Link from 'next/link';
import CustomersList from '../../(components)/CustomersList';
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
        <CustomersList customers={customers} />
      ) : (
        <p>No customers found</p>
      )}
    </div>
  );
};

export default page;
