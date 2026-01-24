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
          <div className={cn("w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "text-destructive",
                  "font-primary text-13px text-[#4C4C4C] font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="relative flex items-center gap-2">
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
                    "w-full rounded-10 border border-input bg-white px-4 py-[12px] text-[13px] text-muted shadow-sm h-[46px]",
                    errorMessage && "border-destructive focus:ring-1",
                    field.value && "text-black",
                  )}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder={placeholder} />
                  <If
                    isTrue={!!helperText && !field.value && !errorMessage}
                    ifBlock={
                      <span className="ml-auto mr-1 text-11px text-muted whitespace-nowrap">
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
              <p className="text-11px text-destructive mt-1">{errorMessage}</p>
            )}
          </div>
        );
      }}
    />
  );
}
