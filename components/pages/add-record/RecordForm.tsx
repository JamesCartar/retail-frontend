/**
 * Record Form Component
 * Form for creating and editing records
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { DatePicker } from '@/components/ui/date-picker';
import { FormTextarea, FormSelect } from '@/components/forms';
import { recordSchema } from '@/common/validators/schemas';
import { CreateRecordInput, UpdateRecordInput } from '@/common/types';
import { Calendar, DollarSign, Tag, User } from 'lucide-react';
import { format } from 'date-fns';

export interface RecordFormProps {
  onSubmit: (data: CreateRecordInput | UpdateRecordInput) => void | Promise<void>;
  defaultValues?: Partial<CreateRecordInput>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function RecordForm({
  onSubmit,
  defaultValues,
  isLoading,
  isEdit = false,
}: RecordFormProps) {
  const categoryOptions = [
    { value: 'sale', label: 'Sale' },
    { value: 'purchase', label: 'Purchase' },
    { value: 'service', label: 'Service' },
    { value: 'return', label: 'Return' },
    { value: 'other', label: 'Other' },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateRecordInput>({
    resolver: zodResolver(recordSchema) as any,
    defaultValues: {
      ...defaultValues,
      date: defaultValues?.date || format(new Date(), 'yyyy-MM-dd'),
    },
    mode: 'onSubmit', // Validate on submit by default
  });

  const handleFormSubmit = async (data: CreateRecordInput) => {
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
      {/* Title - validates onChange */}
      <AnimatedInput
        label="Title"
        placeholder="Enter record title"
        startIcon={<Tag className="h-4 w-4" />}
        error={errors.title?.message}
        {...register('title', {
          onChange: (e) => {
            // Trigger validation on change for title
            register('title').onChange(e);
          },
        })}
      />

      {/* Description */}
      <FormTextarea
        label="Description"
        placeholder="Enter description (optional)"
        rows={4}
        error={errors.description?.message}
        registration={register('description')}
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

        {/* Date - using date picker */}
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <AnimatedInput
              label="Date"
              type="date"
              startIcon={<Calendar className="h-4 w-4" />}
              error={errors.date?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <FormSelect
          label="Category"
          options={categoryOptions}
          placeholder="Select a category"
          error={errors.category?.message}
          registration={register('category')}
        />

        {/* Customer ID - validates onChange */}
        <AnimatedInput
          label="Customer ID"
          placeholder="Enter customer ID (optional)"
          startIcon={<User className="h-4 w-4" />}
          error={errors.customerId?.message}
          {...register('customerId', {
            onChange: (e) => {
              // Trigger validation on change for customerId
              register('customerId').onChange(e);
            },
          })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Submitting...' : isEdit ? 'Update Record' : 'Create Record'}
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
