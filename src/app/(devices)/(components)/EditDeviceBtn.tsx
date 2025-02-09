import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  serialNumber: string;
};

const EditBtn = ({ serialNumber }: Props) => {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={`/devices/${serialNumber}/edit`}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export default EditBtn;
