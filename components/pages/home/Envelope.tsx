import Image from "next/image";

import { formatNumber } from "@/common/utils";
import EyeClosedIcon from "@/components/icons/eye-closed.svg";
import EyeOpenedIcon from "@/components/icons/eye-opened.svg";
import IfElse from "@/components/IfElse";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { totalService } from "@/lib/api/total";
import { toast } from "sonner";

export function Envelope() {
  const [showAmount, setShowAmount] = useState(true);
  const [showFee, setShowFee] = useState(true);

  const [total, setTotal] = useState({ total: 0, fee: 0 });
  useEffect(() => {
    totalService
      .getOne()
      .then(({ transferTotal }) => {
        if (transferTotal) {
          setTotal({ total: transferTotal.total, fee: transferTotal.fee });
        } else {
          setTotal({ total: 0, fee: 0 });
        }
      })
      .catch((_error) => {
        setTotal({ total: 0, fee: 0 });
      });
  }, []);

  return (
    <div className="tr-mx-auto tr-relative tr-w-[378px] tr-h-[233px] tr-bg-[url('/images/envelope-bg.png')] tr-bg-cover tr-bg-no-repeat tr-flex tr-items-center tr-justify-center -tr-mt-[116px]">
      <div className="tr-mx-auto tr-relative tr-w-[355px] tr-h-[206px] tr-bg-[url('/images/envelope-card-bg.png')] tr-bg-cover tr-bg-no-repeat tr-flex tr-items-center tr-justify-center">
        <div className="tr-absolute tr-top-3 lef-0 tr-w-10/12 tr-flex tr-justify-between tr-items-center">
          <Image
            src="/images/logo.png"
            alt="page logo"
            width={84}
            height={42}
          />
          <span className="tr-font-primary tr-font-bold tr-text-13 tr-text-white">
            ငွေသွင်း/ထုတ်စာရင်း
          </span>
        </div>
        <div className="tr-mx-auto tr-relative tr-w-[380px] tr-h-[235px] tr-bg-[url('/images/envelope-front-bg.png')] tr-bg-contain tr-bg-no-repeat tr-bg-[position:0px_75px]">
          <div className="tr-absolute tr-bottom-12 tr-left-7 tr-w-10/12 tr-gap-8 tr-flex tr-justify-between">
            <div className="tr-flex tr-flex-col tr-basis-1/2 tr-gap-[2px]">
              <div className="tr-flex tr-items-center tr-gap-[5px]">
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
                <span className="tr-font-primary tr-text-15px tr-text-[#313131]">
                  ငွေသွင်း/ထုတ်
                </span>
              </div>
              <div className="tr-flex tr-items-center">
                <span className="tr-font-inter tr-font-semibold tr-text-21px">
                  {showAmount ? formatNumber(total.total) : "* * * * * *"}
                </span>
                <span className="tr-text-15px tr-ml-1"> Ks</span>
              </div>
            </div>
            <div className="tr-flex tr-flex-col tr-basis-1/2 tr-gap-[2px]">
              <div className="tr-flex tr-items-center tr-gap-[5px]">
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
                <span className="tr-font-primary tr-text-15px tr-text-[#313131]">
                  လွှဲခ/အမြတ်
                </span>
              </div>
              <div className="tr-flex tr-items-center tr-font-inter">
                <span className="tr-font-semibold tr-text-21px">
                  {showFee ? formatNumber(total.fee) : "* * * * * *"}
                </span>
                <span className="tr-text-15px tr-ml-1">Ks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
