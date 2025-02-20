'use client';

import FormBase from '@/components/forms/FormBase';
import FormButtons from '@/components/forms/FormButtons';
import { Contact } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { updateContactAction } from '../../actions';
import { ContactSchema, contactSchema } from '../../schema';
import ContactFields from './ContactFields';

type Props = {
  contact: Contact;
};

const EditContactForm = ({ contact }: Props) => {
  const router = useRouter();
  const formConfig = {
    schema: contactSchema,
    defaultValues: {
      ...contact,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    } as ContactSchema,
    onSubmit: async (values: ContactSchema) => {
      await updateContactAction(contact.id, values);
    },
    onSuccessMessage: 'Contact updated successfully',
    onErrorMessage: 'Failed to update contact',
    onSuccess: () => {
      router.back();
    },
  };

  return (
    <FormBase config={formConfig} className="space-y-8">
      <ContactFields />
      <FormButtons submitLabel="Update contact" className="flex gap-2" />
    </FormBase>
  );
};

export default EditContactForm;
