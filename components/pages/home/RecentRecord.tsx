import { ROUTES } from "@/common/constants";
import NoRecordIcon from "@/components/icons/no-record.svg";
import RightArrowIcon from "@/components/icons/right-arrow.svg";
import IfElse from "@/components/IfElse";
import { RecordsList } from "@/components/pages/home";
import { recordService } from "@/lib/api/records";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { RecordItem } from "@/common/types";

export function RecentRecord() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchRecords = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await recordService.getRecents({
        page,
        limit: 10,
      });

      setRecords((prev) => [...prev, ...data.transferRecords]);

      const { totalCount, limit } = data.pagination;
      const loaded = page * limit;

      if (loaded >= totalCount) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchRecords();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchRecords]);

  return (
    <div className="tr-w-full tr-flex-1 tr-bg-white tr-py-[14px] tr-px-[19px] tr-rounded-t-20 tr-flex tr-flex-col">
      <div className="tr-flex tr-items tr-justify-between tr-font-secondary">
        <p className="tr-font-bold tr-text-primary tr-text-17px">
          နောက်ဆုံးစာရင်းမှတ်တမ်း
        </p>
        <Link
          href={ROUTES.VIEW_RECORDS}
          className="tr-flex tr-items-center tr-font-bold"
        >
          <span>အားလုံးကြည့်ရန်</span>{" "}
          <RightArrowIcon className="tr-w-6 tr-h-6 tr-text-[#686868]" />
        </Link>
      </div>
      <div className="tr-w-full tr-flex tr-items-center tr-justify-center tr-flex-1 tr-mt-[13px]">
        <IfElse
          isTrue={records.length > 0}
          ifBlock={
            <>
              <RecordsList records={records} />
              <div ref={observerRef} />
            </>
          }
          elseBlock={
            <div className="tr-flex tr-flex-col tr-gap-3 tr-items-center tr-justify-center">
              <NoRecordIcon className="tr-text-[#F7F7F7]" />
              <span className="tr-text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
