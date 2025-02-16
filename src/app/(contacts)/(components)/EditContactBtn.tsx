import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: string;
};

const EditContactBtn = ({ id }: Props) => {
  return (
    <Link
      href={`/contacts/${id}/edit`}
      className="flex w-full items-center gap-2"
    >
      <Pencil className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

export default EditContactBtn;
