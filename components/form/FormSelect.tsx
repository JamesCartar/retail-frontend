"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import If from "../If";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  options: FormSelectOption[];
  required?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  className,
  error,
  options,
  required = false,
  helperText,
  onChange,
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        return (
          <div className={cn("tr-w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "tr-text-destructive",
                  "tr-font-primary tr-text-13px tr-text-[#4C4C4C] tr-font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="tr-relative tr-flex tr-items-center tr-gap-2">
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onChange) {
                    onChange(value);
                  }
                }}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    "tr-w-full tr-rounded-10 tr-border tr-border-input tr-bg-white tr-px-4 tr-py-[12px] tr-text-[13px] tr-text-muted tr-shadow-sm tr-h-[46px]",
                    errorMessage && "tr-border-destructive focus:tr-ring-1",
                    field.value && "tr-text-black",
                  )}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder={placeholder} />
                  <If
                    isTrue={!!helperText && !field.value && !errorMessage}
                    ifBlock={
                      <span className="tr-ml-auto tr-mr-1 tr-text-11px tr-text-muted tr-whitespace-nowrap">
                        {helperText}
                      </span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="tr-text-11px tr-text-destructive tr-mt-1">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
