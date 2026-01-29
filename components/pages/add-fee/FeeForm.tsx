"use client";

import { CreateFeeApiInput, Fee } from "@/common/types";
import { toast } from "sonner";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  useForm,
  UseFormReset,
} from "react-hook-form";
import ArrowCircleRightIcon from "@/components/icons/arrow-circle-right.svg";
import CircleXIcon from "@/components/icons/circle-x.svg";
import WarningIcon from "@/components/icons/warning.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import { useRouter } from "next/router";
import { cn, removeNumberComma } from "@/common/utils";
import { feeService } from "@/lib/api/fees";
import { ROUTES } from "@/common/constants";

export interface FeeInputsProps {
  fields: Fee[];
  remove: UseFieldArrayRemove;
  control: Control<{ fees: Fee[] }>;
  handleSubmit: ReturnType<typeof useForm<{ fees: Fee[] }>>["handleSubmit"];
  isDirty: boolean;
  errors: FieldErrors<{ fees: Fee[] }>;
  reset: UseFormReset<{
    fees: Fee[];
  }>;
}

export function FeeForm({
  fields,
  remove,
  control,
  handleSubmit,
  errors,
  isDirty,
  reset,
}: FeeInputsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [pendingData, setPendingData] = useState<CreateFeeApiInput[]>([]);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentSelectedFeeIndex, setCurrentSelectedFeeIndex] = useState<
    number | null
  >(null);

  const handleDeleteConfirm = () => {
    if (currentSelectedFeeIndex !== null) {
      remove(currentSelectedFeeIndex);

      toast.success("လွှဲခကို ဖျက်ပြီးပါပြီ။");
      setShowDeleteConfirmDialog(false);
      setCurrentSelectedFeeIndex(null);
    }
  };

  const handleCancel = () => {
    setShowSaveConfirmDialog(false);
    setShowDeleteConfirmDialog(false);
    setCurrentSelectedFeeIndex(null);
  };

  const handleConfirmSubmit = async () => {
    if (pendingData.length === 0) return;
    setIsLoading(true);
    try {
      await feeService.create({ data: pendingData });

      setIsLoading(false);
      setShowSaveConfirmDialog(false);
      setShowSuccessDialog(true);
    } catch (error) {
      setIsLoading(false);
      setShowSaveConfirmDialog(false);
      toast.error(
        "လွှဲခအသစ် ထည့်ရာတွင် အမှားတစ်ခုခု ဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ နောက်မှ ထပ်မံကြိုးစားပါ။",
      );
    }
  };

  const handleFormSubmit = async (data: { fees: Fee[] }) => {
    setPendingData(
      data.fees.map((fee) => ({
        from: Number(removeNumberComma(fee.from)),
        to: Number(removeNumberComma(fee.to)),
        fee: Number(removeNumberComma(fee.fee)),
      })),
    );
    setShowSaveConfirmDialog(true);
  };

  return (
    <div className="mt-[15px] relative flex-1 flex flex-col">
      <form
        className="flex-1 flex flex-col"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="pl-5 pr-3 last:border-0">
          {fields.map((fee, index) => (
            <div className="border-b last:border-0 py-[15px]" key={fee.id}>
              <div className="grid grid-cols-[188fr_132fr_30fr] gap-[10px] w-full">
                <FormInput
                  name={`fees.${index}.from`}
                  control={control}
                  label="ငွေသွင်း/ထုတ်ပမာဏ"
                  placeholder="ငွေသွင်း/ထုတ်ပမာဏထည့်ပါ"
                  startIcon={
                    <span className="font-primary text-14px text-muted">
                      မှ
                    </span>
                  }
                  endIcon={
                    <span className="font-inter text-14px text-muted">Ks</span>
                  }
                  floatingLabel={false}
                  error={errors?.fees?.[index]?.from?.message}
                  isCurrency
                />
                <FormInput
                  name={`fees.${index}.fee`}
                  control={control}
                  label="လွှဲခ/အမြတ်"
                  placeholder="လွှဲခ/အမြတ်ထည့်ပါ"
                  endIcon={
                    <span className="font-inter text-14px text-muted">Ks</span>
                  }
                  floatingLabel={false}
                  isCurrency
                  error={errors?.fees?.[index]?.fee?.message}
                />
                {index > 0 && (
                  <Button
                    variant="plain"
                    size="plain"
                    type="button"
                    className={cn(
                      "self-center rounded-full",
                      errors.fees?.[index]?.from
                        ? "self-center"
                        : "self-end mb-[10px]",
                    )}
                    onClick={() => {
                      setCurrentSelectedFeeIndex(index);
                      setShowDeleteConfirmDialog(true);
                    }}
                  >
                    <CircleXIcon className="rounded-full" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-[188fr_132fr_30fr] gap-[10px] w-full mt-4">
                <FormInput
                  name={`fees.${index}.to`}
                  control={control}
                  startIcon={
                    <span className="font-primary text-14px text-muted">
                      သို့
                    </span>
                  }
                  endIcon={
                    <span className="font-inter text-14px text-muted">Ks</span>
                  }
                  floatingLabel={false}
                  error={errors?.fees?.[index]?.to?.message}
                  isCurrency
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 w-full h-[94px] shadow-[0px_-2px_15px_0px_rgba(0,0,0,0.1)] sticky bottom-0 left-0 bg-white mt-auto z-50">
          <Button
            type="submit"
            className="text-white w-11/12"
            disabled={!isDirty}
          >
            <span className="font-primary text-15px mr-[7px] font-medium">
              လွှဲခ အသစ် ထပ်ထည့်မည်
            </span>
            <ArrowCircleRightIcon />
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={showDeleteConfirmDialog}
        onOpenChange={setShowDeleteConfirmDialog}
        icon={<WarningIcon />}
        title="လွှဲခဖျက်ရန် သေချာပါသလား။"
        subtitle="ယခုလွှဲခကို ဖျက်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={handleDeleteConfirm}
        onSecondaryClick={handleCancel}
        showCloseButton
      />

      <ConfirmDialog
        open={showSaveConfirmDialog}
        onOpenChange={setShowSaveConfirmDialog}
        icon={<QuestionMarkIcon />}
        title="လွှဲခအသစ် ထည့်ရန် သေချာပါသလား။"
        subtitle="ယခုလွှဲခကို ထည့်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        primaryButtonDisabled={isLoading}
        onPrimaryClick={handleConfirmSubmit}
        onSecondaryClick={handleCancel}
        showCloseButton
      />

      <ConfirmDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        icon={<CheckCircleIcon />}
        title="လွှဲခအသစ် ထည့်ပြီးပါပြီ။"
        primaryButtonText="ပင်မစာမျက်မှာသို့သွားမည်"
        onPrimaryClick={() => router.push("/")}
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onSecondaryClick={() => {
          setShowSuccessDialog(false);
          reset();
        }}
      />
    </div>
  );
}
