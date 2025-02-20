'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { AppRoutes } from '@/routes';
import { Customer } from '@prisma/client';
import { updateCustomerAction } from '../../actions';
import { customerSchema } from '../../schema';
import CustomerFields from './CustomerFields';

type Props = {
  customer: Customer;
};

const EditCustomerForm = ({ customer }: Props) => {
  const formConfig: FormConfig<typeof customerSchema> = {
    schema: customerSchema,
    defaultValues: {
      name: customer.name,
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      address: customer.address,
    },
    onSubmit: async (values) => {
      await updateCustomerAction(customer.id, values);
    },
    onSuccessMessage: 'Customer updated successfully',
    onErrorMessage: 'Failed to update customer',
    redirectTo: AppRoutes.customers,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <CustomerFields />
      <FormButtons submitLabel="Update Customer" className="flex gap-2" />
    </FormBase>
  );
};

export default EditCustomerForm;
