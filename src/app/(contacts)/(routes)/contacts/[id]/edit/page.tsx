import EditContactForm from '@/app/(contacts)/(components)/(forms)/EditContactForm';
import { getContactAction } from '@/app/(contacts)/actions';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
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
