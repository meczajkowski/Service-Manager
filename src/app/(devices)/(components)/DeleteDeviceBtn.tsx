'use client';

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { deleteDeviceAction } from '../actions';

type Props = {
  id: string;
};

const DeleteBtn = ({ id }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteDeviceAction(id);
    } catch (error) {
      console.error('Failed to delete device:', error);
    }
  };
  return (
    <Button variant="ghost" size="icon" onClick={() => handleDelete(id)}>
      <Trash className="h-4 w-4 text-red-500" />
    </Button>
  );
};

export default DeleteBtn;
