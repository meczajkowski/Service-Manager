import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  serialNumber: string;
};

const EditBtn = ({ serialNumber }: Props) => {
  return (
    <Link
      href={`/devices/${serialNumber}/edit`}
      className="flex w-full items-center gap-2"
    >
      <Pencil className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

export default EditBtn;
