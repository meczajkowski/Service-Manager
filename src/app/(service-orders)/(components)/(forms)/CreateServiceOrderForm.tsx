'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { createServiceOrderAction } from '../../actions';
import { serviceOrderSchema, ServiceOrderSchema } from '../../schema';
import ServiceOrderFormFields from './ServiceOrderFormFields';

type Props = {
  deviceId: string;
};

export const CreateServiceOrderForm = ({ deviceId }: Props) => {
  const formConfig = {
    schema: serviceOrderSchema,
    defaultValues: {
      troubleDescription: '',
      assignedToId: '',
      deviceId,
    },
    onSubmit: async (values: ServiceOrderSchema) => {
      await createServiceOrderAction(values);
    },
    onSuccessMessage: 'Service order created successfully',
    onErrorMessage: 'Failed to create service order',
    redirectTo: routes.serviceOrders.list,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <ServiceOrderFormFields />
      <FormButtons submitLabel="Create Service Order" className="flex gap-2" />
    </FormBase>
  );
};
