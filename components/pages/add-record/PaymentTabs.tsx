import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import If from "@/components/If";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import ThreeLineIcon from "@/components/icons/three-line.svg";
import { CreateRecordInput, PayType, RecordType } from "@/common/types";
import { PAY_OPTIONS } from "@/common/constants/payment";

export interface PaymentTabsProps {
  selectedTab: RecordType;
  selectedPay: PayType;
  control: Control<CreateRecordInput>;
  errors: FieldErrors<CreateRecordInput>;
  onTabChange: (value: RecordType) => void;
  onPayChange: (value: PayType) => void;
}

export function PaymentTabs({
  selectedTab,
  selectedPay,
  control,
  errors,
  onTabChange,
  onPayChange,
}: PaymentTabsProps) {
  return (
    <div className="tr-w-full tr-px-5">
      <Tabs
        defaultValue={selectedTab}
        className="tr-w-full tr-p-[10px] tr-bg-[#F7F7F7] tr-rounded-8"
        onValueChange={onTabChange as (value: string) => void}
      >
        <TabsList className="tr-w-full tr-mb-[9.48px]">
          <TabsTrigger value="pay" className="tr-w-1/2">
            ငွေလွှဲအမျိုးအစား
          </TabsTrigger>
          <TabsTrigger value="bank" className="tr-w-1/2">
            အခြားအမျိုးအစား
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pay">
          <div className="tr-flex tr-items-center tr-gap-[14px]">
            {PAY_OPTIONS.map((pay) => (
              <Button
                type="button"
                variant="plain"
                size="plain"
                onClick={() => onPayChange(pay.value as PayType)}
                key={pay.value}
                className="tr-relative"
              >
                <Image
                  src={pay.image}
                  width={46.02}
                  height={46.02}
                  alt={pay.value}
                  className="tr-rounded-5"
                />
                <If
                  isTrue={selectedPay === (pay.value as PayType)}
                  ifBlock={
                    <CheckCircleSmIcon className="tr-w-[5px]! tr-h-[5px]! tr-absolute -tr-right-2 -tr-top-2" />
                  }
                />
              </Button>
            ))}
            <Button
              type="button"
              variant="plain"
              size="plain"
              onClick={() => onPayChange("other")}
              className="tr-relative"
            >
              <span className="tr-px-[4.1px] tr-py-[12.5px] tr-text-center tr-bg-primary tr-text-white tr-rounded-5">
                အခြား
              </span>
              <If
                isTrue={selectedPay === "other"}
                ifBlock={
                  <CheckCircleSmIcon className="tr-w-[5px]! tr-h-[5px]! tr-absolute -tr-right-2 -tr-top-2" />
                }
              />
            </Button>
          </div>
          <If
            isTrue={selectedPay === "other"}
            ifBlock={
              <FormInput
                name="description"
                control={control}
                placeholder="အခြားပေး"
                className="tr-mt-[15px]"
                startIcon={
                  <ThreeLineIcon className="tr-w-[19px] tr-h-[19px] tr-text-muted" />
                }
                floatingLabel={false}
                error={errors.description?.message}
              />
            }
          />
        </TabsContent>
        <TabsContent value="bank">
          <FormInput
            name="description"
            control={control}
            placeholder="အခြားအမျိုးအစား"
            startIcon={
              <ThreeLineIcon className="tr-w-[19px] tr-h-[19px] tr-text-muted" />
            }
            floatingLabel={false}
            error={errors.description?.message}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
