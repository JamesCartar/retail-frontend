"use client";

import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { InfoCard, RecordForm } from "@/components/pages/add-record";

export default function AddRecord() {
  return (
    <div className="tr-h-screen tr-font-primary tr-flex tr-flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းမှတ်မည်" />
      <main className="tr-w-full tr-pt-4 tr-flex-1 tr-flex tr-flex-col">
        <InfoCard />
        <RecordForm />
      </main>
    </div>
  );
}
