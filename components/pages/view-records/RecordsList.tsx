import { RecordItem } from "@/common/types";

import { formatCalendarDate, formatCurrency } from "@/common/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NoRecordIcon from "@/components/icons/no-record.svg";
import { ReportRecord } from "@/components/pages/view-records";
import { transferRecordReport } from "@/lib/api/records";
import IfElse from "@/components/IfElse";
import { useEffect, useState } from "react";

export interface RecordsListProps {
  records?: transferRecordReport[];
  observerRef?: (node: HTMLDivElement) => void;
  loading?: boolean;
}

export function RecordsList({
  records,
  observerRef,
  loading,
}: RecordsListProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  // When records load, open all by default
  useEffect(() => {
    if (records) {
      setOpenItems(records.map((_, i) => i.toString()));
    }
  }, [records]);

  return (
    <div className="tr-px-5 tr-pt-[17px] tr-flex-1">
      <IfElse
        isTrue={records?.length === 0 && !loading}
        ifBlock={
          <div className="tr-h-full">
            <div className="tr-flex tr-flex-col tr-gap-3 tr-items-center tr-justify-center tr-h-full">
              <NoRecordIcon className="tr-text-[#EAEAEA] tr-mt-3!" />
              <span className="tr-text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          </div>
        }
        elseBlock={
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="tr-space-y-[10px]"
          >
            {records?.map((record, index) => (
              <AccordionItem
                value={index.toString()}
                className="tr-border-0 tr-rounded-10  [&_svg]:tr-size-6 [&_svg]:tr-text-primary"
                key={index}
              >
                <AccordionTrigger
                  className="hover:tr-no-underline tr-border-0 tr-items-start tr-overflow-hidden tr-bg-primary-lighter tr-rounded-10 data-[state=open]:tr-rounded-b-none"
                  chevronClassName=" tr-absolute tr-top-3 tr-right-4"
                >
                  <div className="tr-w-full tr-px-[15px]">
                    <span className="tr-font-inter tr-text-14px tr-font-bold tr-text-primary tr-mb-[18px]">
                      {formatCalendarDate(record.date)}
                    </span>
                    <div className="tr-flex tr-items-center tr-justify-between tr-mt-3">
                      <div className="tr-flex tr-flex-col">
                        <span className="tr-text-muted-light tr-text-13px tr-font-secondary">
                          စုစုပေါင်း ငွေသွင်း/ထုတ်
                        </span>
                        <span className="tr-font-secondary tr-font-bold tr-text-17px">
                          {formatCurrency(record.totalAmount)} Ks
                        </span>
                      </div>
                      <div className="tr-flex tr-flex-col tr-items-end">
                        <span className="tr-text-muted-light tr-text-13px tr-font-secondary">
                          စုစုပေါင်း လွှဲခ/ အမြတ်
                        </span>
                        <span className="tr-font-secondary tr-font-bold tr-text-17px tr-text-accent tr-z-50">
                          {formatCurrency(record.totalFee)} Ks
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tr-absolute -tr-bottom-[70px] -tr-right-[112px] tr-w-36 tr-h-36 tr-bg-primary-light tr-rounded-full"></div>
                </AccordionTrigger>
                <AccordionContent>
                  {record.records.map((recordItem, index) => (
                    <ReportRecord
                      className="last:tr-rounded-b-10"
                      key={index}
                      record={recordItem}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
            <div ref={observerRef} className="tr-h-1" />
          </Accordion>
        }
      />
    </div>
  );
}
