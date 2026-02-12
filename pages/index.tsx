import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { Envelope, QuickActions, RecentRecord } from "@/components/pages/home";

export default function Home() {
  return (
    <div className="tr-min-h-screen tr-bg-background tr-flex tr-flex-col">
      <Header
        navLabel="ငွေလွှဲမှတ်တမ်း"
        boldLabel
        navLink={ROUTES.HOME}
        longHeader
      />
      <Envelope />
      <main className="tr-w-full tr-flex tr-flex-col tr-flex-1 tr-pt-4 tr-gap-[25px]">
        <QuickActions />
        <RecentRecord />
      </main>
    </div>
  );
}
