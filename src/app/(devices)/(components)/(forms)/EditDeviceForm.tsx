'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { AppRoutes } from '@/routes';
import { Device } from '@prisma/client';
import { updateDeviceAction } from '../../actions';
import { deviceSchema } from '../../schema';
import DeviceFormFields from './DeviceFormFields';

type Props = {
  device: Device;
};

const EditDeviceForm = ({ device }: Props) => {
  const formConfig: FormConfig<typeof deviceSchema> = {
    schema: deviceSchema,
    defaultValues: {
      model: device.model,
      serialNumber: device.serialNumber,
      customerId: device.customerId ?? '',
    },
    onSubmit: async (values) => {
      await updateDeviceAction(device.id, values);
    },
    onSuccessMessage: 'Device updated successfully',
    onErrorMessage: 'Failed to update device',
    redirectTo: AppRoutes.devices,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <DeviceFormFields />
      <FormButtons submitLabel="Update device" className="flex gap-2" />
    </FormBase>
  );
};

export default EditDeviceForm;
