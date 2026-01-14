/**
 * Form Field Component
 * Reusable form field with label and error display
 */

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/common/utils';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helpText?: string;
}

export function FormField({
  label,
  error,
  registration,
  helpText,
  className,
  required,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Input
        {...props}
        {...registration}
        className={cn(
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        aria-invalid={!!error}
      />
      
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
