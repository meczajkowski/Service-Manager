import CustomerContactsSection from '@/app/(customers)/(components)/CustomerContactsSection';
import CustomerDevicesSection from '@/app/(customers)/(components)/CustomerDevicesSection';
import DeleteCustomerDialog from '@/app/(customers)/(components)/DeleteCustomerDialog';
import EditCustomerBtn from '@/app/(customers)/(components)/EditCustomerBtn';
import { getCustomerWithRelationsAction } from '@/app/(customers)/actions';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomerWithRelationsAction(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Customer Details</h1>

      <div className="space-y-4">
        {/* Information */}
        <div className="p-4">
          <h2 className="mb-4">
            <div className="flex items-center justify-between">
              {customer.name}
              <div className="flex gap-2">
                <EditCustomerBtn id={customer.id} />
                <DeleteCustomerDialog id={customer.id} />
              </div>
            </div>
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Email: </span>
              {customer.email || '-'}
            </div>
            <div>
              <span className="font-medium">Phone: </span>
              {customer.phone || '-'}
            </div>
            <div>
              <span className="font-medium">Address: </span>
              {customer.address}
            </div>
          </div>
        </div>

        {/* Contacts */}
        <CustomerContactsSection customer={customer} />

        {/* Devices */}
        <CustomerDevicesSection customer={customer} />
      </div>
    </div>
  );
};

export default page;
