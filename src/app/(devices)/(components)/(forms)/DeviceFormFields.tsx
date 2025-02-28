import SelectField from '@/components/forms/fields/SelectField';
import TextField from '@/components/forms/fields/TextField';
import { DeviceSchema } from '@/types/device.dto';
import { DeviceModel } from '@prisma/client';
import { useFormContext } from 'react-hook-form';

const DeviceFormFields = () => {
  const {
    formState: { isSubmitting },
    control,
  } = useFormContext<DeviceSchema>();

  return (
    <>
      <SelectField
        control={control}
        name="model"
        label="Model Number"
        placeholder="Select a model"
        options={Object.values(DeviceModel).map((model) => ({
          label: model,
          value: model,
        }))}
        disabled={isSubmitting}
      />

      <TextField
        control={control}
        name="serialNumber"
        label="Serial Number"
        placeholder="Enter serial number"
        disabled={isSubmitting}
      />
    </>
  );
};

export default DeviceFormFields;
