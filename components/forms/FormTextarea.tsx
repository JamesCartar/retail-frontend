/**
 * Form Textarea Component
 * Reusable textarea field with label and error display
 */

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/common/utils';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  helpText?: string;
}

export function FormTextarea({
  label,
  error,
  registration,
  helpText,
  className,
  required,
  ...props
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <textarea
        {...props}
        {...registration}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
