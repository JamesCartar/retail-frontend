"use client";

import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { InfoCard, RecordForm } from "@/components/pages/add-record";

export default function AddRecord() {
  return (
    <div className="h-screen font-primary flex flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းမှတ်မည်" />
      <main className="w-full pt-4 flex-1 flex flex-col">
        <InfoCard />
        <RecordForm />
      </main>
    </div>
  );
}
