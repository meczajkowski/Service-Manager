'use client';

import { toast } from 'sonner';
import { deleteContactAction } from '../actions';

type Props = {
  id: string;
  onSuccess?: () => void;
};

const DeleteContactDialogBtn = ({ id, onSuccess }: Props) => {
  const handleClick = async () => {
    try {
      await deleteContactAction(id);
      toast.success('Contact deleted successfully');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to delete contact');
      console.error('Failed to delete contact:', error);
    }
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteContactDialogBtn;
