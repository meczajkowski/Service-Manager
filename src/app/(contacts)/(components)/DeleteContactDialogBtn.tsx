'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { deleteContactAction } from '../actions';

type Props = {
  id: string;
  onSuccess?: () => void;
};

const DeleteContactDialogBtn = ({ id, onSuccess }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <button
      onClick={async () => {
        setIsDeleting(true);
        await handleClick();
        setIsDeleting(false);
      }}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteContactDialogBtn;
