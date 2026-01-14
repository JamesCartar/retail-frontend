/**
 * Reusable Form Wrapper Component
 * Base form component with built-in validation and error handling
 */

import React from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues, Resolver } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/common/utils';

export interface FormWrapperProps<T extends FieldValues> {
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: DefaultValues<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  className?: string;
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  isLoading?: boolean;
  resetOnSubmit?: boolean;
  resolver?: Resolver<T>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
}

export function FormWrapper<T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  className,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  showReset = false,
  isLoading = false,
  resetOnSubmit = false,
  resolver,
  mode = 'onSubmit',
}: FormWrapperProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver,
    mode,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        methods.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form
      onSubmit={methods.handleSubmit(handleSubmit)}
      className={cn('space-y-6', className)}
    >
      {children(methods)}
      
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Submitting...' : submitLabel}
        </Button>
        
        {showReset && (
          <Button
            type="button"
            variant="outline"
            onClick={() => methods.reset()}
            disabled={isLoading}
          >
            {resetLabel}
          </Button>
        )}
      </div>
    </form>
  );
}
