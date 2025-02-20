'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { cn } from '@/lib/utils';
import { DeviceModel } from '@prisma/client';
import { addDeviceAction } from '../../actions';
import { deviceSchema, DeviceSchema } from '../../schema';
import DeviceFormFields from './DeviceFormFields';

type Props = {
  values?: Partial<DeviceSchema>;
  formStyles?: string;
  btnStyles?: string;
  redirectTo?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const AddDeviceForm = ({
  values,
  formStyles,
  btnStyles,
  redirectTo,
  onCancel,
  onSuccess,
}: Props) => {
  const formConfig = {
    schema: deviceSchema,
    defaultValues: {
      model: DeviceModel.C224,
      serialNumber: '',
      customerId: '',
      ...values,
    } as DeviceSchema,
    onSubmit: async (values: DeviceSchema) => {
      await addDeviceAction(values);
      onSuccess?.();
    },
    onSuccessMessage: 'Device added successfully',
    onErrorMessage: 'Failed to add device',
    redirect: redirectTo ?? null,
  };

  return (
    <FormBase config={formConfig} className={cn(formStyles)}>
      <DeviceFormFields />
      <FormButtons
        onCancel={onCancel}
        submitLabel={'Add device'}
        className={cn(btnStyles)}
      />
    </FormBase>
  );
};

export default AddDeviceForm;
