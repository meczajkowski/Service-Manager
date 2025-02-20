'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { cn } from '@/lib/utils';
import { addContactAction } from '../../actions';
import { ContactSchema, contactSchema } from '../../schema';
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
  const formConfig: FormConfig<typeof contactSchema> = {
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      customers: [...(values?.customers ?? [])],
      ...values,
    },
    onSubmit: async (values) => {
      await addContactAction(values);
      onSuccess?.();
    },
    onSuccessMessage: 'Contact added successfully',
    onErrorMessage: 'Failed to add contact',
    redirectTo: redirectTo ?? undefined,
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
