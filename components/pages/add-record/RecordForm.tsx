import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/ui/animated-input";
import { DatePicker } from "@/components/ui/date-picker";
import { FormTextarea, FormSelect } from "@/components/forms";
import { recordSchema } from "@/common/validators/schemas";
import { CreateRecordInput, UpdateRecordInput } from "@/common/types";
import { DollarSign, User } from "lucide-react";
import CalendarIcon from "@/components/icons/calendar.svg";
import { format, formatDate } from "date-fns";

import PhoneIcon from "@/components/icons/phone.svg";
import { formatCalendarDate } from "@/common/utils";

export interface RecordFormProps {
  onSubmit: (
    data: CreateRecordInput | UpdateRecordInput
  ) => void | Promise<void>;
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
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateRecordInput>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...defaultValues,
      date: defaultValues?.date || format(new Date(), "yyyy-MM-dd"),
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: CreateRecordInput) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-5">
      <div className="w-full h-28 border-2">
        {/* // @copilot  don't touch this div for now, just do whatever you have to in the div below this dev */}
      </div>
      <div className="flex flex-col gap-7">
        <AnimatedInput
          label="ဖုန်းနံပါတ်"
          placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
          startIcon={<PhoneIcon className="w-[19px] h-[19px] text-muted" />}
          error={errors.title?.message}
          {...register("title", {
            onChange: (e) => {
              register("title").onChange(e);
            },
          })}
        />

        {/* Date - using date picker */}
        <Controller
          control={control}
          name="date"
          render={({ field: { value, ...restField } }) => (
            <AnimatedInput
              label="ရက်စွဲ"
              type="date"
              startIcon={<CalendarIcon className="h-4 w-4 mb-1" />}
              value={
                value
                  ? formatCalendarDate(value)
                  : formatCalendarDate(new Date())
              }
              error={errors.date?.message}
              {...restField}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer ID - validates onChange */}
          <AnimatedInput
            label="Customer ID"
            placeholder="Enter customer ID (optional)"
            startIcon={<User className="h-4 w-4" />}
            error={errors.customerId?.message}
            {...register("customerId", {
              onChange: (e) => {
                // Trigger validation on change for customerId
                register("customerId").onChange(e);
              },
            })}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading
              ? "Submitting..."
              : isEdit
              ? "Update Record"
              : "Create Record"}
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
      </div>
    </form>
  );
}
