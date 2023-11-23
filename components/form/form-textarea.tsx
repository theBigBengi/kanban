import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

export interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  value?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onChange?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      disabled,
      required,
      errors,
      className,
      defaultValue = "",
      onBlur,
      onClick,
      onKeyDown,
      value,
      onChange,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className='space-y-2 w-full'>
        <div className='space-y-1 w-full'>
          {label ? (
            <Label
              className='text-xs font-semibold text-neutral-700'
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}

          <Textarea
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            required={required}
            disabled={pending || disabled}
            onClick={onClick}
            onBlur={onBlur}
            ref={ref}
            name={id}
            id={id}
          />
        </div>

        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
