import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";

export default function ViewRecords() {
  return (
    <div className="h-screen font-primary flex flex-col">
      <Header navLink={ROUTES.HOME} navLabel="စာရင်းကြည့်မည်" enableDownload />
      <main className="w-full pt-4 flex-1 flex flex-col"></main>
    </div>
  );
}
