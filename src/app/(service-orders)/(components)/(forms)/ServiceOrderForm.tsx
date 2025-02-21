'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import {
  createServiceOrderAction,
  updateServiceOrderAction,
} from '../../actions';
import { serviceOrderSchema, ServiceOrderSchema } from '../../schema';
import { ServiceOrderWithRelations } from '../../types';
import ServiceOrderFormFields from './ServiceOrderFormFields';

type Props = {
  deviceId: string;
  serviceOrder?: ServiceOrderWithRelations;
};

export const ServiceOrderForm = ({ deviceId, serviceOrder }: Props) => {
  const formConfig = {
    schema: serviceOrderSchema,
    defaultValues: {
      troubleDescription: serviceOrder?.troubleDescription ?? '',
      assignedToId: serviceOrder?.assignedToId ?? '',
      deviceId,
      serviceOrderId: serviceOrder?.id ?? '',
      status: serviceOrder?.status ?? 'PENDING',
    },
    onSubmit: async (values: ServiceOrderSchema) => {
      if (serviceOrder) {
        await updateServiceOrderAction({
          serviceOrderId: serviceOrder.id,
          troubleDescription: values.troubleDescription,
          assignedToId: values.assignedToId,
          status: values.status,
        });
      } else {
        await createServiceOrderAction(values);
      }
    },
    onSuccessMessage: serviceOrder
      ? 'Service order updated successfully'
      : 'Service order created successfully',
    onErrorMessage: serviceOrder
      ? 'Failed to update service order'
      : 'Failed to create service order',
    redirectTo: routes.serviceOrders.list,
  };

  return (
    <FormBase config={formConfig} className="space-y-3">
      <ServiceOrderFormFields />
      <FormButtons
        submitLabel={
          serviceOrder ? 'Update Service Order' : 'Create Service Order'
        }
        className="flex gap-2 pt-4"
      />
    </FormBase>
  );
};
