/**
 * Record Form Component
 * Form for creating and editing records
 */

import React from 'react';
import { FormWrapper, FormField, FormTextarea, FormSelect } from '@/components/forms';
import { recordFormValidation } from '@/common/validators';
import { CreateRecordInput, UpdateRecordInput } from '@/common/types';
import { formatDateForApi } from '@/common/utils';

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

  return (
    <FormWrapper
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      submitLabel={isEdit ? 'Update Record' : 'Create Record'}
      showReset={!isEdit}
      isLoading={isLoading}
      resetOnSubmit={!isEdit}
    >
      {({ register, formState: { errors } }) => (
        <>
          <FormField
            label="Title"
            placeholder="Enter record title"
            required
            error={errors.title?.message}
            registration={register('title', recordFormValidation.title)}
          />

          <FormTextarea
            label="Description"
            placeholder="Enter description (optional)"
            rows={4}
            error={errors.description?.message}
            registration={register('description', recordFormValidation.description)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.amount?.message}
              registration={register('amount', recordFormValidation.amount)}
            />

            <FormField
              label="Date"
              type="date"
              required
              error={errors.date?.message}
              registration={register('date', recordFormValidation.date)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Category"
              options={categoryOptions}
              placeholder="Select a category"
              error={errors.category?.message}
              registration={register('category', recordFormValidation.category)}
            />

            <FormField
              label="Customer ID"
              placeholder="Enter customer ID (optional)"
              error={errors.customerId?.message}
              registration={register('customerId', recordFormValidation.customerId)}
            />
          </div>
        </>
      )}
    </FormWrapper>
  );
}
