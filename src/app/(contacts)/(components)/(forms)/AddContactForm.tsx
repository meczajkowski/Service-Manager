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

const AddContactForm = (props: Props) => {
  const formConfig = {
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      customers: [...(props.values?.customers ?? [])],
      ...props.values,
    } as ContactSchema,
    onSubmit: async (values: ContactSchema) => {
      await addContactAction(values);
      props.onSuccess?.();
    },
    onSuccessMessage: 'Contact added successfully',
    onErrorMessage: 'Failed to add contact',
    redirect: props.redirectTo ?? null,
  };

  return (
    <FormBase config={formConfig} className={cn(props.formStyles)}>
      <ContactFields />
      <FormButtons
        onCancel={props.onCancel}
        submitLabel={'Add contact'}
        className={cn(props.btnStyles)}
      />
    </FormBase>
  );
};

export default AddContactForm;
