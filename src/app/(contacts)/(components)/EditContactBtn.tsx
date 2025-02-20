import { AppRoutes } from '@/routes';
import { Contact } from '@prisma/client';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: Contact['id'];
};

const EditContactBtn = ({ id }: Props) => {
  return (
    <Link
      href={`${AppRoutes.contacts}/${id}/edit`}
      className="flex w-full items-center gap-2"
    >
      <Pencil className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

export default EditContactBtn;
