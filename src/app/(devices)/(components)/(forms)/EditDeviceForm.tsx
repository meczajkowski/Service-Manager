'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { routes } from '@/routes';
import { DeviceDto, deviceSchema } from '@/types/device.dto';
import { updateDeviceAction } from '../../actions';
import DeviceFormFields from './DeviceFormFields';

type Props = {
  device: DeviceDto;
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
      await updateDeviceAction({
        id: device.id,
        ...values,
      });
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
