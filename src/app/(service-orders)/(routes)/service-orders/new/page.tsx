import { getCustomerAction } from '@/app/(customers)/actions';
import { getDeviceAction } from '@/app/(devices)/actions';
import { ServiceOrderForm } from '@/app/(service-orders)/(components)/(forms)/ServiceOrderForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import Link from 'next/link';

type Props = {
  searchParams: {
    deviceId?: string;
  };
};

const page = async ({ searchParams }: Props) => {
  if (!searchParams.deviceId) {
    return <div>Device ID is required to create a service order</div>;
  }

  // TODO: refactor
  const device = await getDeviceAction(searchParams.deviceId);
  if (!device.customerId) {
    return <div>Device has no customer</div>;
  }
  const customer = await getCustomerAction(device.customerId);

  return (
    <div className="space-y-8">
      <h1>Create Service Order</h1>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex flex-col gap-2">
            <h3>Konica Minolta Bizhub {device.model}</h3>
            <span className="text-sm text-muted-foreground">
              S/N: {device.serialNumber}
            </span>
            {customer ? (
              <div className="my-8 space-y-3">
                <div>
                  <span className="font-bold">Customer: </span>
                  {customer.name}
                </div>
                <div>
                  <span className="font-bold">Email: </span>
                  {customer.email}
                </div>
                <div>
                  <span className="font-bold">Phone: </span>
                  {customer.phone}
                </div>
                <div>
                  <span className="font-bold">Address: </span>
                  {customer.address}
                </div>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'max-w-[200px]',
                  )}
                  href={routes.customers.view(customer.id)}
                >
                  View customer
                </Link>
              </div>
            ) : (
              <div className="my-8">No customer assigned</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <ServiceOrderForm deviceId={searchParams.deviceId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
