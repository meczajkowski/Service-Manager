'use client';

import { deleteDeviceAction } from '../actions';

type Props = {
  id: string;
};

const DeleteDeviceDialogBtn = ({ id }: Props) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteDeviceAction(id);
    } catch (error) {
      console.error('Failed to delete device:', error);
    }
  };

  return <span onClick={() => handleDelete(id)}>Delete device</span>;
};

export default DeleteDeviceDialogBtn;
