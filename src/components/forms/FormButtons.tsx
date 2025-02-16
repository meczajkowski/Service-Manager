import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

type Props = {
  submitLabel: string;
  onCancel?: () => void;
  className?: ClassValue;
};

const FormButtons = (props: Props) => {
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className={cn(props.className)}>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : props.submitLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={props.onCancel ?? (() => router.back())}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormButtons;
