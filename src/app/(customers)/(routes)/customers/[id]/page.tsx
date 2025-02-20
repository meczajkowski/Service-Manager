import CustomerContactsSection from '@/app/(customers)/(components)/CustomerContactsSection';
import CustomerDevicesSection from '@/app/(customers)/(components)/CustomerDevicesSection';
import { getCustomerWithRelationsAction } from '@/app/(customers)/actions';
import CustomerDetails from '@/components/CustomerDetails';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const customer = await getCustomerWithRelationsAction(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Customer Details</h1>

      <div className="space-y-4">
        <CustomerDetails customer={customer} />
        <CustomerContactsSection customer={customer} />
        <CustomerDevicesSection customer={customer} />
      </div>
    </div>
  );
};

export default page;
