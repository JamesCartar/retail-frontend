import Link from "next/link";
import LeftArrowIcon from "@/components/icons/left-arrow.svg";
import DownloadIcon from "@/components/icons/download.svg";
import If from "./If";
import { Button } from "./ui/button";
import { cn } from "@/common/utils";

interface Props {
  navLabel: string;
  navLink: string;
  enableDownload?: boolean;
  longHeader?: boolean;
  onDownload?: () => void;
}

const Header = ({
  navLabel,
  navLink,
  enableDownload = false,
  longHeader = false,
  onDownload,
}: Props) => {
  return (
    <header
      className={cn(
        "bg-primary text-white border-b font-bold font-secondary px-[19px] pt-4 pb-4",
        longHeader ? "h-[185px]" : "h-[65px]"
      )}
    >
      <div className="flex justify-between items-center">
        <Link href={navLink} className="flex items-center">
          <LeftArrowIcon className="w-9 h-9" />
          <p className="text-17px">{navLabel}</p>
        </Link>
        <If
          isTrue={enableDownload}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="flex items-center gap-[5px]"
              onClick={onDownload}
            >
              <DownloadIcon className="text-white p-0!" />
              <span className="font-bold text-12px mt-[6px]">
                ဒေါင်းလုပ်ဆွဲမည်
              </span>
            </Button>
          }
        />
      </div>
    </header>
  );
};

export default Header;
