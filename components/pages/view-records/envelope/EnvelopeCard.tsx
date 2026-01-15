import Image from "next/image";

import { formatCurrency } from "@/common/utils";
import EyeClosedIcon from "@/components/icons/eye-closed.svg";
import EyeOpenedIcon from "@/components/icons/eye-opened.svg";
import IfElse from "@/components/IfElse";
import { Button } from "@/components/ui/button";
import { totals } from "@/pages";
import { useState } from "react";

export default function EnvelopeCard() {
  const [showAmount, setShowAmount] = useState(true);
  const [showFee, setShowFee] = useState(true);

  return (
    <div className="mx-auto relative w-[378px] h-[233px] bg-[url('/images/envelope-bg.png')] bg-cover bg-no-repeat flex items-center justify-center -mt-[116px]">
      <div className="mx-auto relative w-[355px] h-[206px] bg-[url('/images/envelope-card-bg.png')] bg-cover bg-no-repeat flex items-center justify-center">
        <div className="absolute top-3 lef-0 w-10/12 flex justify-between items-center">
          <Image
            src="/images/logo.png"
            alt="page logo"
            width={84}
            height={42}
          />
          <span className="font-primary font-bold text-13 text-white">
            ငွေသွင်း/ထုတ်စာရင်း
          </span>
        </div>
        <div className="mx-auto relative w-[380px] h-[235px] bg-[url('/images/envelope-front-bg.png')] bg-contain bg-no-repeat bg-[position:0px_75px]">
          <div className="absolute bottom-12 left-7 w-10/12 gap-[5px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <Button
                  onClick={() => setShowAmount(!showAmount)}
                  variant="plain"
                  size="plain"
                >
                  <IfElse
                    isTrue={showAmount}
                    ifBlock={<EyeOpenedIcon />}
                    elseBlock={<EyeClosedIcon />}
                  />
                </Button>
                <span className="font-primary text-15px text-[#313131]">
                  ငွေသွင်း/ထုတ်
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <Button
                  onClick={() => setShowFee(!showFee)}
                  variant="plain"
                  size="plain"
                >
                  <IfElse
                    isTrue={showFee}
                    ifBlock={<EyeOpenedIcon />}
                    elseBlock={<EyeClosedIcon />}
                  />
                </Button>
                <span className="font-primary text-15px text-[#313131]">
                  လွှဲခ/အမြတ်
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-inter font-semibold text-21px">
                  {showAmount ? formatCurrency(totals.amount) : "* * * * * *"}
                </span>
                <span className="text-15px ml-1"> Ks</span>
              </div>
              <div className="flex items-center font-inter">
                <span className="font-semibold text-21px">
                  {showFee ? formatCurrency(totals.fee) : "* * * * * *"}
                </span>
                <span className="text-15px ml-1">Ks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
