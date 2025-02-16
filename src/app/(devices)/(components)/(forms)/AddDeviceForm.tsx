'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { AppRoutes } from '@/routes';
import { DeviceModel } from '@prisma/client';
import { addDeviceAction } from '../../actions';
import { deviceSchema, DeviceSchema } from '../../schema';
import DeviceFormFields from './DeviceFormFields';

const AddDeviceForm = () => {
  const formConfig = {
    schema: deviceSchema,
    defaultValues: {
      model: DeviceModel.C224,
      serialNumber: '',
    },
    onSubmit: async (values: DeviceSchema) => {
      await addDeviceAction(values);
    },
    onSuccessMessage: 'Device added successfully',
    onErrorMessage: 'Failed to add device',
    redirectTo: AppRoutes.devices,
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <DeviceFormFields />
      <FormButtons submitLabel={'Add device'} className="flex gap-2" />
    </FormBase>
  );
};

export default AddDeviceForm;
