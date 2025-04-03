import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FormField,FormItem,FormLabel,FormControl,FormMessage } from "../form";
import { Input } from "../input";

interface FormInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  autoFocus?: boolean
  disabled?:boolean
}

export function FormInputField<T extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  autoFocus,
  disabled
}: FormInputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                form.clearErrors("root");
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}