import Link from "next/link";
import LeftArrowIcon from "@/components/icons/left-arrow.svg";
import CrossIcon from "@/components/icons/cross.svg";
import If from "./If";
import { Button } from "./ui/button";
import { cn } from "@/common/utils";
import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ConfirmDialog } from "./ui/confirm-dialog";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import DownloadIcon from "@/components/icons/download.svg";
import { useRouter } from "next/router";

interface Props {
  navLabel: string;
  boldLabel?: boolean;
  navLink: string;
  enableDownload?: boolean;
  onDownload?: () => void;
  enableInstructionModal?: boolean;
  longHeader?: boolean;
  confirmNavigate?: boolean;
}

const Header = ({
  navLabel,
  boldLabel = false,
  navLink,
  enableDownload = false,
  onDownload,
  enableInstructionModal = false,
  longHeader = false,
  confirmNavigate = false,
}: Props) => {
  const router = useRouter();
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showConfirmNavigateDialog, setShowConfirmNavigateDialog] =
    useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (confirmNavigate) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [confirmNavigate]);

  return (
    <header
      className={cn(
        "tr-bg-primary tr-text-white tr-border-b tr-px-[19px] tr-pt-4 tr-pb-4 tr-relative",
        boldLabel ? "tr-font-bold tr-font-secondary" : "tr-font-medium tr-font-primary",
        longHeader ? "tr-h-[185px]" : "tr-h-[65px]",
      )}
    >
      <div className="tr-flex tr-justify-between tr-items-center">
        <Link
          href={navLink}
          className="tr-flex tr-items-center"
          onClick={(e) => {
            if (confirmNavigate) {
              e.preventDefault();
              setShowConfirmNavigateDialog(true);
            } else {
              router.push(navLink);
            }
          }}
        >
          <LeftArrowIcon className="tr-w-9 tr-h-9" />
          <p className="tr-text-17px">{navLabel}</p>
        </Link>
        <If
          isTrue={enableDownload}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="tr-flex tr-items-center tr-gap-[5px] "
              onClick={onDownload}
            >
              <DownloadIcon />
              <span className="tr-font-bold tr-text-12px tr-mt-[6px]">
                ဒေါင်းလုပ်ဆွဲမည်
              </span>
            </Button>
          }
        />
        <If
          isTrue={enableInstructionModal}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="tr-flex tr-items-center tr-gap-[5px] [&_svg]:tr-w-4 [&_svg]:tr-h-4"
              onClick={() => setShowInstructionModal((state) => !state)}
            >
              <Info />
              <span className="tr-font-bold tr-text-12px tr-mt-1">လွှဲခထည့်နည်း</span>
            </Button>
          }
        />
      </div>
      <If
        isTrue={showInstructionModal}
        ifBlock={
          <Card className="tr-absolute tr-left-1/2 -tr-bottom-[218px] -tr-translate-x-1/2 -tr-translate-y-1/2 tr-w-11/12 tr-bg-primary tr-text-white tr-rounded-5 tr-shadow-none tr-border-0 tr-z-10 tr-p-0 tr-font-primary">
            <CardHeader className="tr-px-[15px] tr-py-[10px] tr-flex tr-flex-row tr-items-center tr-justify-between">
              <CardTitle className="tr-text-16px tr-font-bold tr-flex tr-items-center tr-gap-[10px]">
                <Info className="tr-w-5 tr-h-5" />
                <span className="tr-font-bold tr-text-13px tr-mt-[6px] tr-mb-1">
                  လွှဲခထည့်နည်း
                </span>
              </CardTitle>
              <Button
                variant="plain"
                size="plain"
                onClick={() => setShowInstructionModal(false)}
                className="!tr-m-0"
              >
                <CrossIcon className="tr-text-white" />
              </Button>
            </CardHeader>
            <CardContent className="tr-px-[15px] tr-pb-[15px] tr-mt-[1px]">
              <p className="tr-text-13px tr-font-normal">
                ၁၀၀၀ မှ ၁၀၀၀၀ အတွင်းကို လွှဲခ ၅၀၀ ကောက်လိုပါက ၁၀၀၀ ကို “မှ”
                တွင်ထည့်၍ ၁၀၀၀၀ ကို “သို့” တွင်ထည့်ပါ။ ၅၀၀ ကို “လွှဲခ”
                တွင်ထည့်ပါ။
              </p>
            </CardContent>
          </Card>
        }
      />

      <ConfirmDialog
        open={showConfirmNavigateDialog}
        onOpenChange={setShowConfirmNavigateDialog}
        icon={<QuestionMarkIcon />}
        title="ပင်မစာမျက်နှာသို့သွားမည်။"
        subtitle="လက်ရှိပြင်ဆင်ထားသော အချက်အလက်များ ပျောက်ဆုံးနိုင်ပါသည်။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={() => {
          router.push(navLink);
        }}
        onSecondaryClick={() => setShowConfirmNavigateDialog(false)}
        showCloseButton
      />
    </header>
  );
};

export default Header;
