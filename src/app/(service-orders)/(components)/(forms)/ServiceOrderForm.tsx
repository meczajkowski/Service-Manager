'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import {
  ServiceOrderDto,
  serviceOrderSchema,
  ServiceOrderStatus,
} from '@/types/service-order.dto';
import {
  createServiceOrderAction,
  updateServiceOrderAction,
} from '../../actions';
import ServiceOrderFormFields from './ServiceOrderFormFields';

type Props = {
  deviceId: string;
  serviceOrder?: ServiceOrderDto;
};

export const ServiceOrderForm = ({ deviceId, serviceOrder }: Props) => {
  const formConfig: FormConfig<typeof serviceOrderSchema> = {
    schema: serviceOrderSchema,
    defaultValues: {
      troubleDescription: serviceOrder?.troubleDescription ?? '',
      assignedToId: serviceOrder?.assignedToId ?? null,
      deviceId,
      status: serviceOrder?.status ?? ServiceOrderStatus.PENDING,
    },
    onSubmit: async (values) => {
      if (serviceOrder) {
        await updateServiceOrderAction({
          serviceOrderId: serviceOrder.id,
          deviceId,
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
