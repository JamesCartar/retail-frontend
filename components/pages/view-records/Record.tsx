import { PAYMENT_IMAGES } from "@/common/constants/payment";
import type { RecordItem, ReportRecordItem } from "@/common/types";
import { cn, formatNumber } from "@/common/utils";
import Image from "next/image";

export interface RecordProps {
  record: Partial<RecordItem>;
  className?: string;
}
export interface ReportRecordProps {
  record: ReportRecordItem;
  className?: string;
}

export function Record({ record, className }: RecordProps) {
  const PaymentImage = PAYMENT_IMAGES[record.pay!];

  return (
    <div
      key={record.id}
      className={cn(
        "tr-w-full tr-border-b last:tr-border-0 tr-pb-[15px] tr-px-[15px] hover:tr-bg-gray-50 tr-flex tr-flex-col tr-bg-white",
        PaymentImage ? "tr-pt-[12.75px] tr-gap-[12.75px]" : "tr-pt-5 tr-gap-5",
        className,
      )}
    >
      <div className=" tr-flex tr-justify-between tr-items-center">
        {PaymentImage ? (
          <Image
            src={PaymentImage}
            alt={record.pay!}
            width={27}
            height={27}
            className="tr-rounded-5"
          />
        ) : (
          <span className="tr-font-primary tr-font-medium tr-text-[13px] tr-leading-none">
            {record.description}
          </span>
        )}
        <span className="tr-font-inter tr-text-15px tr-leading-none">
          {formatNumber(record.amount!)} Ks
        </span>
      </div>
      <div className="tr-font-inter tr-text-15px tr-flex tr-justify-between tr-items-center tr-leading-none">
        <span>{record.phoneNo}</span>
        <span className="tr-text-accent">{formatNumber(record.fee!)} Ks</span>
      </div>
    </div>
  );
}

export function ReportRecord({ record, className }: ReportRecordProps) {
  const PaymentImage = PAYMENT_IMAGES[record.Pay!];

  return (
    <div
      key={record.Id}
      className={cn(
        "tr-w-full tr-border-b last:tr-border-0 tr-pb-[15px] tr-px-[15px] hover:tr-bg-gray-50 tr-flex tr-flex-col tr-bg-white",
        PaymentImage ? "tr-pt-[12.75px] tr-gap-[12.75px]" : "tr-pt-5 tr-gap-5",
        className,
      )}
    >
      <div className=" tr-flex tr-justify-between tr-items-center">
        {PaymentImage ? (
          <Image
            src={PaymentImage}
            alt={record.Pay!}
            width={27}
            height={27}
            className="tr-rounded-5"
          />
        ) : (
          <span className="tr-font-primary tr-font-medium tr-text-[13px] tr-leading-none">
            {record.Description}
          </span>
        )}
        <span className="tr-font-inter tr-text-15px tr-leading-none">
          {formatNumber(record.Amount!)} Ks
        </span>
      </div>
      <div className="tr-font-inter tr-text-15px tr-flex tr-justify-between tr-items-center tr-leading-none">
        <span>{record.PhoneNo}</span>
        <span className="tr-text-accent">{formatNumber(record.Fee!)} Ks</span>
      </div>
    </div>
  );
}
