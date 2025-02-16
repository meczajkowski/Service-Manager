import TextField from '@/components/forms/fields/TextField';
import { useFormContext } from 'react-hook-form';

const ContactFields = () => {
  const form = useFormContext();
  return (
    <>
      <TextField control={form.control} label="Name" name="name" />
      <TextField control={form.control} label="Email" name="email" />
      <TextField control={form.control} label="Phone" name="phone" />
    </>
  );
};

export default ContactFields;
