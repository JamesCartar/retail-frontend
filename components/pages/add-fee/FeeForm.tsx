/**
 * Fee Form Component
 * Form for creating and editing fees
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { FormTextarea, FormSelect } from '@/components/forms';
import { feeSchema } from '@/common/validators/schemas';
import { CreateFeeInput, UpdateFeeInput, FeeType } from '@/common/types';
import { DollarSign, Calendar, FileText, Tag } from 'lucide-react';

export interface FeeFormProps {
  onSubmit: (data: CreateFeeInput | UpdateFeeInput) => void | Promise<void>;
  defaultValues?: Partial<CreateFeeInput>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function FeeForm({
  onSubmit,
  defaultValues,
  isLoading,
  isEdit = false,
}: FeeFormProps) {
  const feeTypeOptions = [
    { value: FeeType.SERVICE, label: 'Service Fee' },
    { value: FeeType.LATE, label: 'Late Fee' },
    { value: FeeType.PROCESSING, label: 'Processing Fee' },
    { value: FeeType.OTHER, label: 'Other' },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateFeeInput>({
    resolver: zodResolver(feeSchema) as any,
    defaultValues,
    mode: 'onSubmit', // Validate on submit by default
  });

  const handleFormSubmit = async (data: CreateFeeInput) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Fee Name - validates onChange */}
      <AnimatedInput
        label="Fee Name"
        placeholder="Enter fee name"
        startIcon={<Tag className="h-4 w-4" />}
        error={errors.name?.message}
        {...register('name', {
          onChange: (e) => {
            // Trigger validation on change for name
            register('name').onChange(e);
          },
        })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Amount - validates onChange */}
        <AnimatedInput
          label="Amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          startIcon={<DollarSign className="h-4 w-4" />}
          error={errors.amount?.message}
          {...register('amount', {
            valueAsNumber: true,
            onChange: (e) => {
              // Trigger validation on change for amount
              register('amount').onChange(e);
            },
          })}
        />

        {/* Fee Type */}
        <FormSelect
          label="Fee Type"
          options={feeTypeOptions}
          error={errors.type?.message}
          registration={register('type')}
        />
      </div>

      {/* Description */}
      <FormTextarea
        label="Description"
        placeholder="Enter fee description (optional)"
        rows={4}
        error={errors.description?.message}
        registration={register('description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Due Date */}
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <AnimatedInput
              label="Due Date"
              type="date"
              startIcon={<Calendar className="h-4 w-4" />}
              error={errors.dueDate?.message}
              {...field}
            />
          )}
        />

        {/* Related Record ID */}
        <AnimatedInput
          label="Related Record ID"
          placeholder="Enter record ID (optional)"
          startIcon={<FileText className="h-4 w-4" />}
          error={errors.recordId?.message}
          {...register('recordId')}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Submitting...' : isEdit ? 'Update Fee' : 'Add Fee'}
        </Button>

        {!isEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isLoading}
          >
            Reset
          </Button>
        )}
      </div>
    </form>
  );
}
