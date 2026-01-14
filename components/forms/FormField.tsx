/**
 * Form Field Component
 * Reusable form field with label and error display
 */

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AnimatedInput } from '@/components/ui/animated-input';
import { cn } from '@/common/utils';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helpText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export function FormField({
  label,
  error,
  registration,
  helpText,
  className,
  required,
  startIcon,
  endIcon,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <AnimatedInput
        {...props}
        {...registration}
        label={label}
        error={error}
        startIcon={startIcon}
        endIcon={endIcon}
        className={className}
        aria-invalid={!!error}
      />
      
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}
