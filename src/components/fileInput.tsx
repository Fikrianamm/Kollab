import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "./ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface FileInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  label?: string;
  accept?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  onChange?: (file: File | null) => void;
}

export function FileInput<TFieldValues extends FieldValues>({
  name,
  form,
  label,
  accept,
  className = "w-full max-w-sm",
  disabled = false,
  required = false,
  description,
  onChange,
}: FileInputProps<TFieldValues>) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className={`grid items-center gap-1.5 ${className}`}>
          {label && (
            <Label
              htmlFor={name}
              className="flex items-center gap-1 text-xs md:text-base"
            >
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}
          <Input
            id={name}
            type="file"
            accept={accept}
            disabled={disabled}
            className="cursor-pointer text-xs md:text-base"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file);
              onChange?.(file);
            }}
            onBlur={field.onBlur}
          />
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
