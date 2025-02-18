'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { Device } from '@prisma/client';
import { updateDeviceAction } from '../../actions';
import { deviceSchema, DeviceSchema } from '../../schema';
import DeviceFormFields from './DeviceFormFields';

type Props = {
  device: Device;
};

const EditDeviceForm = (props: Props) => {
  const formConfig = {
    schema: deviceSchema,
    defaultValues: {
      model: props.device.model,
      serialNumber: props.device.serialNumber,
      customerId: props.device.customerId ?? '',
    } as DeviceSchema,
    onSubmit: async (values: DeviceSchema) => {
      await updateDeviceAction(props.device.id, values);
    },
    onSuccessMessage: 'Device updated successfully',
    onErrorMessage: 'Failed to update device',
    redirectTo: routes.devices.list,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <DeviceFormFields />
      <FormButtons submitLabel="Update device" className="flex gap-2" />
    </FormBase>
  );
};

export default EditDeviceForm;
