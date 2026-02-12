import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/plus.svg";
import Image from "next/image";
import { UseFieldArrayAppend } from "react-hook-form";
import { Fee } from "@/common/types";

export interface InfoCardProps {
  append: UseFieldArrayAppend<{ fees: Fee[] }>;
}

export function InfoCard({ append }: InfoCardProps) {
  return (
    <div className="tr-px-5 tr-border-0 tr-shadow-none tr-flex tr-flex-col tr-items-center tr-justify-center tr-gap-6 tr-font-primary">
      <div>
        <Image
          src="/images/add-fee-logo.png"
          alt="Info"
          width={105}
          height={106.54}
        />
      </div>
      <p className="tr-text-17px tr-font-medium">ငွေလွှဲငွေထုတ်အတွက် လွှဲခထည့်ရန်</p>
      <Button
        variant="secondary"
        className="tr-bg-secondary-light tr-py-3 tr-px-[25px] tr-rounded-full tr-text-13px tr-font-medium"
        onClick={() =>
          append({ id: `temp-id-${Date.now()}`, fee: "0", from: "0", to: "0" })
        }
      >
        <PlusIcon />
        လွှဲခထပ်ထည့်မည်
      </Button>
    </div>
  );
}
