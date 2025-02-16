import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import DeleteContactDialogBtn from './DeleteContactDialogBtn';

type Props = {
  id: string;
  onSuccess?: () => void;
};

const DeleteContactDialog = ({ id, onSuccess }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="flex cursor-pointer items-center gap-2">
          <Trash className="h-4 w-4 text-destructive" />
          <span>Delete</span>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contact and remove it from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
          >
            <DeleteContactDialogBtn id={id} onSuccess={onSuccess} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactDialog;
