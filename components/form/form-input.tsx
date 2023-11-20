"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErros from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      disabled,
      required,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label ? (
            <Label
              className='text-xs font-semibold text-netural-700'
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}
          <Input
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
            disabled={pending || disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            type={type}
            name={id}
            id={id}
          />
        </div>
        <FormErros errors={errors} id={id} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
