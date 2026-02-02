import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { Envelope, QuickActions, RecentRecord } from "@/components/pages/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        navLabel="ငွေလွှဲမှတ်တမ်း"
        boldLabel
        navLink={ROUTES.HOME}
        longHeader
      />
      <Envelope />
      <main className="w-full flex flex-col flex-1 pt-4 gap-[25px]">
        <QuickActions />
        <RecentRecord />
      </main>
    </div>
  );
}
