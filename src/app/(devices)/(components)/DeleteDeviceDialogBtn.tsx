'use client';

import { toast } from 'sonner';
import { deleteDeviceAction } from '../actions';

type Props = {
  id: string;
  onSuccess?: () => void;
};

const DeleteDeviceDialogBtn = ({ id, onSuccess }: Props) => {
  const handleClick = async () => {
    try {
      await deleteDeviceAction(id);
      toast.success('Device deleted successfully');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to delete device');
      console.error('Failed to delete device:', error);
    }
  };

  return <span onClick={handleClick}>Delete</span>;
};

export default DeleteDeviceDialogBtn;
