import { Button } from '@/components/ui/button';
import { routes } from '@/routes';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: string;
};

const EditCustomerBtn = ({ id }: Props) => {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={routes.customers.edit(id)}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export default EditCustomerBtn;
