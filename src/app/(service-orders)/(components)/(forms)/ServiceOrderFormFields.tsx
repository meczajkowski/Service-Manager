import { getAllUsers } from '@/app/(users)/actions';
import SelectField, {
  SelectFormFieldOption,
} from '@/components/forms/fields/SelectField';
import TextAreaField from '@/components/forms/fields/TextAreaField';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ServiceOrderSchema } from '../../schema';

const ServiceOrderFormFields = () => {
  const { control } = useFormContext<ServiceOrderSchema>();

  // async/await is not supported here
  const [users, setUsers] = useState<SelectFormFieldOption[]>([]);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(
        users.map((user) => ({
          label: user.name ?? '',
          value: user.id,
        })),
      );
    });
  }, []);

  return (
    <>
      <TextAreaField
        control={control}
        name="troubleDescription"
        label="Trouble Description"
        placeholder="Please describe the issue with the device..."
      />
      <SelectField
        control={control}
        label="Assign To"
        name="assignedToId"
        options={users}
      />
    </>
  );
};

export default ServiceOrderFormFields;
