import type { RecordItem } from "@/common/types";
import { Record } from "../view-records";

export interface RecordsListProps {
  records?: RecordItem[];
}

export function RecordsList({ records }: RecordsListProps) {
  return (
    <div className="tr-w-full tr-border-b last:tr-border-0 tr-flex tr-flex-col">
      {records?.map((record) => {
        return <Record key={record.id} record={record} />;
      })}
    </div>
  );
}
