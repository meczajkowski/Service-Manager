'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { Customer } from '@prisma/client';
import { updateCustomerAction } from '../../actions';
import { customerSchema, CustomerSchema } from '../../schema';
import CustomerFields from './CustomerFields';

type Props = {
  customer: Customer;
};

const EditCustomerForm = (props: Props) => {
  const formConfig = {
    schema: customerSchema,
    defaultValues: {
      name: props.customer.name,
      email: props.customer.email ?? '',
      phone: props.customer.phone ?? '',
      address: props.customer.address,
    },
    onSubmit: async (values: CustomerSchema) => {
      await updateCustomerAction(props.customer.id, values);
    },
    onSuccessMessage: 'Customer updated successfully',
    onErrorMessage: 'Failed to update customer',
    redirectTo: routes.customers.list,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <CustomerFields />
      <FormButtons submitLabel="Update Customer" className="flex gap-2" />
    </FormBase>
  );
};

export default EditCustomerForm;
