'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { DeviceDto } from '@/types/device.dto';
import {
  ServiceOrderStatus,
  ServiceOrderWithRelationsDto,
} from '@/types/service-order.dto';
import {
  createServiceOrderAction,
  updateServiceOrderAction,
} from '../../actions';
import { serviceOrderSchema } from '../../schema';
import ServiceOrderFormFields from './ServiceOrderFormFields';

type Props = {
  deviceId: DeviceDto['id'];
  serviceOrder?: ServiceOrderWithRelationsDto;
};

export const ServiceOrderForm = ({ deviceId, serviceOrder }: Props) => {
  const formConfig: FormConfig<typeof serviceOrderSchema> = {
    schema: serviceOrderSchema,
    defaultValues: {
      troubleDescription: serviceOrder?.troubleDescription ?? '',
      assignedToId: serviceOrder?.assignedTo?.id ?? '',
      deviceId,
      serviceOrderId: serviceOrder?.id ?? '',
      status: serviceOrder?.status ?? ServiceOrderStatus.PENDING,
    },
    onSubmit: async (values) => {
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
