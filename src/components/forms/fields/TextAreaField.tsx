import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

const TextAreaField = <T extends FieldValues>(props: Props<T>) => {
  return (
    <FormField
      control={props.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Trouble Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TextAreaField;
