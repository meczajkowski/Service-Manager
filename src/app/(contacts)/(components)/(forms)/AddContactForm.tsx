'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { cn } from '@/lib/utils';
import { addContactAction } from '../../actions';
import { contactSchema, ContactSchema } from '../../schema';
import ContactFields from './ContactFields';

type Props = {
  values?: Partial<ContactSchema>;
  formStyles?: string;
  btnStyles?: string;
  redirectTo?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const AddContactForm = ({
  values,
  formStyles,
  btnStyles,
  redirectTo,
  onCancel,
  onSuccess,
}: Props) => {
  const formConfig = {
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      customers: [...(values?.customers ?? [])],
      ...values,
    } as ContactSchema,
    onSubmit: async (values: ContactSchema) => {
      await addContactAction(values);
      onSuccess?.();
    },
    onSuccessMessage: 'Contact added successfully',
    onErrorMessage: 'Failed to add contact',
    redirect: redirectTo ?? null,
  };

  return (
    <FormBase config={formConfig}>
      <div className={cn(formStyles)}>
        <ContactFields />
      </div>
      <FormButtons
        onCancel={onCancel}
        submitLabel={'Add contact'}
        className={cn(btnStyles)}
      />
    </FormBase>
  );
};

export default AddContactForm;
