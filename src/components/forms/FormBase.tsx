import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassValue } from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form } from '../ui/form';

type Props<T extends z.ZodTypeAny> = {
  className?: ClassValue;
  children: React.ReactNode;
  config: {
    schema: T;
    defaultValues: z.infer<T>;
    onSubmit: (values: z.infer<T>) => Promise<void>;
    onSuccessMessage?: string;
    onErrorMessage: string;
    redirectTo?: string;
  };
};

const FormBase = <T extends z.ZodTypeAny>(props: Props<T>) => {
  const router = useRouter();
  const { schema, defaultValues } = props.config;
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<T>) => {
    try {
      await props.config.onSubmit(values);
      toast.success(props.config.onSuccessMessage ?? 'Operation successful');
      if (props.config.redirectTo) {
        router.push(props.config.redirectTo);
      }
    } catch (error) {
      console.error(error);
      toast.error(props.config.onErrorMessage ?? 'Operation failed');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(props.className)}
      >
        {props.children}
      </form>
    </Form>
  );
};

export default FormBase;
