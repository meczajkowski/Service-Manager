import TextField from '@/components/forms/fields/TextField';
import { useFormContext } from 'react-hook-form';

const CustomerFields = () => {
  const { control } = useFormContext();
  return (
    <>
      <TextField
        control={control}
        name="name"
        label="Name"
        placeholder="Enter name"
      />
      <TextField
        control={control}
        name="email"
        label="Email"
        placeholder="Enter email"
      />
      <TextField
        control={control}
        name="phone"
        label="Phone"
        placeholder="Enter phone"
      />
      <TextField
        control={control}
        name="address"
        label="Address"
        placeholder="Enter address"
      />
    </>
  );
};

export default CustomerFields;
