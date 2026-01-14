/**
 * Fee Form Component
 * Form for creating and editing fees
 */

import React from 'react';
import { FormWrapper, FormField, FormTextarea, FormSelect } from '@/components/forms';
import { feeFormValidation } from '@/common/validators';
import { CreateFeeInput, UpdateFeeInput, FeeType } from '@/common/types';

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

  return (
    <FormWrapper
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      submitLabel={isEdit ? 'Update Fee' : 'Add Fee'}
      showReset={!isEdit}
      isLoading={isLoading}
      resetOnSubmit={!isEdit}
    >
      {({ register, formState: { errors } }) => (
        <>
          <FormField
            label="Fee Name"
            placeholder="Enter fee name"
            required
            error={errors.name?.message}
            registration={register('name', feeFormValidation.name)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              error={errors.amount?.message}
              registration={register('amount', feeFormValidation.amount)}
              helpText="Enter the fee amount in dollars"
            />

            <FormSelect
              label="Fee Type"
              options={feeTypeOptions}
              required
              error={errors.type?.message}
              registration={register('type', feeFormValidation.type)}
            />
          </div>

          <FormTextarea
            label="Description"
            placeholder="Enter fee description (optional)"
            rows={4}
            error={errors.description?.message}
            registration={register('description', feeFormValidation.description)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Due Date"
              type="date"
              error={errors.dueDate?.message}
              registration={register('dueDate', feeFormValidation.dueDate)}
              helpText="Optional due date for this fee"
            />

            <FormField
              label="Related Record ID"
              placeholder="Enter record ID (optional)"
              error={errors.recordId?.message}
              registration={register('recordId', feeFormValidation.recordId)}
              helpText="Link this fee to an existing record"
            />
          </div>
        </>
      )}
    </FormWrapper>
  );
}
