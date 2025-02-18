import { routes } from '@/routes';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  serialNumber: string;
};

const EditDeviceBtn = ({ serialNumber }: Props) => {
  return (
    <Link
      href={routes.devices.edit(serialNumber)}
      className="flex w-full items-center gap-2"
    >
      <Pencil className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

export default EditDeviceBtn;
