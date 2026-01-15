import { ROUTES } from "@/common/constants";
import { RecordItem } from "@/common/types";
import GearSixIcon from "@/components/icons/gear-six.svg";
import LeftArrowIcon from "@/components/icons/left-arrow.svg";
import NoRecordIcon from "@/components/icons/no-record.svg";
import NoteBookIcon from "@/components/icons/note-book.svg";
import NotePencilIcon from "@/components/icons/note-pencil.svg";
import RightArrowIcon from "@/components/icons/right-arrow.svg";
import IfElse from "@/components/IfElse";
import EnvelopeCard from "@/components/pages/view-records/envelope/EnvelopeCard";
import { RecordsList } from "@/components/pages/view-records/RecordsList";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const records: RecordItem[] = [
  {
    id: "1",
    phoneNo: "09791234567",
    amount: 1000000,
    fee: 10000,
    pay: "kbz",
    type: "pay",
    description: null,
    entryPerson: "Dave Mustaine",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "2",
    phoneNo: "09797654321",
    amount: 500000,
    fee: 5000,
    pay: "uab",
    type: "pay",
    description: null,
    entryPerson: "James Hetfield",
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "3",
    phoneNo: "09790001111",
    amount: 200000,
    fee: 2000,
    pay: "aya",
    type: "pay",
    description: null,
    entryPerson: "Lars Ulrich",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "4",
    phoneNo: "09795552222",
    amount: 750000,
    fee: 7500,
    pay: "uab",
    type: "pay",
    description: null,
    entryPerson: "Kirk Hammett",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "5",
    phoneNo: "09795552222",
    amount: 300000,
    fee: 3000,
    pay: "kbz",
    type: "pay",
    description: null,
    entryPerson: "Robert Trujillo",
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
  },
  {
    id: "6",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "pay",
    description: "စိုင်းစိုင်းပေး",
    entryPerson: "Jason Newsted",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
  {
    id: "7",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "bank",
    description: "ဘဏ်ငွေလွှဲ",
    entryPerson: "Cliff Burton",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: "8",
    phoneNo: "09793334444",
    amount: 450000,
    fee: 4500,
    pay: "other",
    type: "pay",
    description: "မင်းမင်းပေး",
    entryPerson: "Dave Lombardo",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
  },
  {
    id: "9",
    phoneNo: "09793322234",
    amount: 390000,
    fee: 3200,
    pay: "other",
    type: "bank",
    description: "ဘဏ်ငွေလွှဲ",
    entryPerson: "Tom Araya",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
];

export const totals = {
  amount: 20459759,
  fee: 20459759,
};

export default function Home() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-white border-b font-bold font-secondary px-[19px] pt-4 pb-4 h-[185px]">
        <Link href={ROUTES.HOME} className="flex items-center">
          <LeftArrowIcon className="w-9 h-9" />
          <p className="text-17px">Kpay စာရင်းမှတ်တမ်း</p>
        </Link>
      </header>

      <EnvelopeCard />

      <main className="w-full flex flex-col flex-1 pt-7 gap-[25px]">
        <div className="w-[360px] mx-auto flex justify-between font-primary px-[15px] py-[13px] bg-white rounded-10">
          <Link
            href={ROUTES.ADD_RECORD}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[52px] h-[52px] bg-primary-light flex items-center justify-center rounded-full">
              <NotePencilIcon className="w-6 text-primary-muted" />
            </div>
            <span className="text-12px">စာရင်းမှတ်မည်</span>
          </Link>
          <Link
            href={ROUTES.VIEW_RECORDS}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[52px] h-[52px] bg-primary-light flex items-center justify-center rounded-full">
              <NoteBookIcon className="w-6 text-primary-muted" />
            </div>
            <span className="text-12px">စာရင်းကြည့်မည်</span>
          </Link>
          <Link
            href={ROUTES.ADD_FEE}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[52px] h-[52px] bg-primary-light flex items-center justify-center rounded-full">
              <GearSixIcon className="w-6 text-primary-muted" />
            </div>
            <span className="text-12px">လွှဲခထည့်မည်</span>
          </Link>
        </div>
        <div className="w-full flex-1 bg-white py-[14px] px-[19px] rounded-t-20 flex flex-col">
          <div className="flex items justify-between font-secondary">
            <p className="font-bold text-primary text-17px">
              နောက်ဆုံးစာရင်းမှတ်တမ်း
            </p>
            <Link
              href={ROUTES.VIEW_RECORDS}
              className="flex items-center font-bold"
            >
              <span>အားလုံးကြည့်ရန်</span>{" "}
              <RightArrowIcon className="w-6 h-6 text-[#686868]" />
            </Link>
          </div>
          <div className="w-full flex items-center justify-center flex-1 mt-[18px]">
            <IfElse
              isTrue={records.length > 0}
              ifBlock={<RecordsList records={records} />}
              elseBlock={
                <div className="flex flex-col items-center justify-center">
                  <NoRecordIcon className="text-[#F7F7F7]" />
                  <span className="text-[#D7D7D7]">
                    စာရင်းမှတ်တမ်းမရှိသေးပါ
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
