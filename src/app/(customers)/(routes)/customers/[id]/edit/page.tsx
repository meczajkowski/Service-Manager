import EditCustomerForm from '@/app/(customers)/(components)/(forms)/EditCustomerForm';
import { getCustomerAction } from '@/app/(customers)/actions';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomerAction(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Edit Customer</h1>
      <EditCustomerForm customer={customer} />
    </div>
  );
};

export default page;
