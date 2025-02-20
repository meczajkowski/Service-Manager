import EditContactForm from '@/app/(contacts)/(components)/(forms)/EditContactForm';
import { getContactAction } from '@/app/(contacts)/actions';
import { Contact } from '@prisma/client';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: Contact['id'];
  };
};

const page = async ({ params }: Props) => {
  const contact = await getContactAction(params.id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1>Edit Contact</h1>
      <EditContactForm contact={contact} />
    </div>
  );
};

export default page;
