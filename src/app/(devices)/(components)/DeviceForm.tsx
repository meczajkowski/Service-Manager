'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Device, DeviceModel } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { addDeviceAction, updateDeviceAction } from '../actions';
import { deviceSchema, DeviceSchema } from '../schema';

type Props = {
  device?: Device;
};

const DeviceForm = ({ device }: Props) => {
  const router = useRouter();
  const isEditMode = !!device;

  const form = useForm<DeviceSchema>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      model: device?.model ?? DeviceModel.C224,
      serialNumber: device?.serialNumber ?? '',
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: DeviceSchema) => {
    try {
      if (isEditMode && device) {
        await updateDeviceAction(device.id, values);
      } else {
        await addDeviceAction(values);
      }
      router.push('/devices');
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? 'update' : 'add'} device:`,
        error,
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(DeviceModel).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter serial number"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditMode
                ? 'Save changes'
                : 'Add device'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DeviceForm;
