import { ServiceOrderForm } from '@/app/(service-orders)/(components)/(forms)/ServiceOrderForm';
import { getServiceOrderWithRelationsAction } from '@/app/(service-orders)/actions';
import CustomerDetails from '@/components/CustomerDetails';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const serviceOrder = await getServiceOrderWithRelationsAction(params.id);
  if (!serviceOrder) {
    return notFound();
  }
  return (
    <div className="space-y-8">
      <h1>Service Order Details</h1>

      <div className="space-y-4">
        <CustomerDetails customer={serviceOrder.device.customer} />

        <div className="space-y-4 rounded-lg border p-4">
          <h3>Konica Minolta Bizhub {serviceOrder.device.model}</h3>
          <span className="text-sm text-muted-foreground">
            S/N: {serviceOrder.device.serialNumber}
          </span>
          <ServiceOrderForm
            deviceId={serviceOrder.device.id}
            serviceOrder={serviceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
