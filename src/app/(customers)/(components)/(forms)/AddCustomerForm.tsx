'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { createCustomerAction } from '../../actions';
import { customerSchema } from '../../schema';
import CustomerFields from './CustomerFields';

const AddCustomerForm = () => {
  const formConfig: FormConfig<typeof customerSchema> = {
    schema: customerSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    onSubmit: async (values) => {
      await createCustomerAction(values);
    },
    onSuccessMessage: 'Customer added successfully',
    onErrorMessage: 'Failed to add customer',
    redirectTo: routes.customers.list,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <CustomerFields />
      <FormButtons submitLabel="Add Customer" className="flex gap-2" />
    </FormBase>
  );
};

export default AddCustomerForm;
