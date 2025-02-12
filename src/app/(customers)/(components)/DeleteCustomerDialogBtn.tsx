'use client';

import { AppRoutes } from '@/routes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteCustomerAction } from '../actions';

type Props = {
  id: string;
};

const DeleteCustomerDialogBtn = ({ id }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await deleteCustomerAction(id);
      toast.success('Customer deleted successfully');
      router.push(AppRoutes.customers);
    } catch (error) {
      toast.error('Failed to delete customer');
      console.error('Failed to delete customer:', error);
    }
  };

  return <span onClick={() => handleDelete(id)}>Delete customer</span>;
};

export default DeleteCustomerDialogBtn;
