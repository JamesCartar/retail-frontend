import { Card, CardContent } from "@/components/ui/card";
import InfoIcon from "@/components/icons/info.svg";

export function InfoCard() {
  return (
    <Card className="tr-px-5 tr-border-0 tr-shadow-none">
      <CardContent className="tr-px-[15px] tr-py-[10px] tr-rounded-5  tr-bg-[#DCEBFF] tr-text-primary tr-flex tr-gap-[19px]">
        <div className="tr-mt-[2px]">
          <InfoIcon className="tr-w-5 tr-h-5" />
        </div>
        <p className="tr-font-bold tr-text-13px tr-leading-8">
          မိမိကြိုက်နှစ်သက်ရာငွေလွှဲပုံစံဖြင့်မှတ်လိုပါက “အခြားအမျိုးအစား”
          ကိုနှိပ်ပါ။
        </p>
      </CardContent>
    </Card>
  );
}
