/**
 * Form Select Component
 * Reusable select field with label and error display
 */

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/common/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  registration?: UseFormRegisterReturn;
  helpText?: string;
  placeholder?: string;
}

export function FormSelect({
  label,
  options,
  error,
  registration,
  helpText,
  placeholder = 'Select an option',
  className,
  required,
  ...props
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <select
        {...props}
        {...registration}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        aria-invalid={!!error}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
