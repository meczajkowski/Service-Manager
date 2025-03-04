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
  config: FormConfig<T>;
};

export type FormConfig<T extends z.ZodTypeAny> = {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  onSuccessMessage?: string;
  onErrorMessage: string;
  redirectTo?: string;
  onSuccess?: () => void;
};

const FormBase = <T extends z.ZodTypeAny>({
  className,
  children,
  config,
}: Props<T>) => {
  const router = useRouter();
  const { schema, defaultValues } = config;
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<T>) => {
    try {
      await config.onSubmit(values);
      toast.success(config.onSuccessMessage ?? 'Operation successful');
      config.onSuccess?.();
      if (config.redirectTo) {
        router.push(config.redirectTo);
      }
    } catch (error) {
      console.error(error);
      toast.error(config.onErrorMessage ?? 'Operation failed');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(className)}
      >
        {children}
      </form>
    </Form>
  );
};

export default FormBase;
