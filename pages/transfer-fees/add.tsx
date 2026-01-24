import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FeeForm } from "@/components/pages/add-fee";
import { feeService } from "@/lib/api/fees";
import { CreateFeeInput, Fee, UpdateFeeInput } from "@/common/types";
import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { InfoCard } from "@/components/pages/add-fee/InfoCard";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feeSchema } from "@/common/validators/schemas";
import { formatNumber } from "@/common/utils";

export default function AddFee() {
  const [fees, setFees] = useState<Fee[]>([]);

  useEffect(() => {
    feeService.getAll().then(({ transferFees }) => {
      setFees(transferFees);
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<{ fees: Fee[] }>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      fees: fees?.map((fee) => ({
        from: formatNumber(Number(fee.from)),
        to: formatNumber(Number(fee.to)),
        fee: formatNumber(Number(fee.fee)),
      })) || [{ from: "0", to: "0", fee: "0" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });

  useEffect(() => {
    if (fees && fees.length > 0) {
      reset({
        fees: fees.map((fee) => ({
          from: formatNumber(Number(fee.from)),
          to: formatNumber(Number(fee.to)),
          fee: formatNumber(Number(fee.fee)),
        })),
      });
    }
  }, [fees, reset]);

  return (
    <div className="h-screen font-primary flex flex-col">
      <Header
        navLink={ROUTES.HOME}
        navLabel="လွှဲခထည့်မည်"
        enableInstructionModal
        confirmNavigate={isDirty}
      />
      <main className="w-full flex-1 flex flex-col pt-[17px]">
        <InfoCard append={append} />
        <FeeForm
          fields={fields}
          remove={remove}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
          isDirty={isDirty}
        />
      </main>
    </div>
  );
}
