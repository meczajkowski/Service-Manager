'use client';

import FormBase, { FormConfig } from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { cn } from '@/lib/utils';
import { contactSchema, ContactSchema } from '@/types/contact.dto';
import { CustomerDto } from '@/types/customer.dto';
import { addContactAction } from '../../actions';
import ContactFields from './ContactFields';

type Props = {
  values?: Partial<ContactSchema> & { customers: CustomerDto[] };
  formStyles?: string;
  btnStyles?: string;
  redirectTo?: string;
  customerId?: string;
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
  customerId,
}: Props) => {
  const formConfig: FormConfig<typeof contactSchema> = {
    schema: contactSchema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      ...values,
    },
    onSubmit: async (values) => {
      await addContactAction({
        ...values,
        customerId: customerId ?? null,
      });
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
