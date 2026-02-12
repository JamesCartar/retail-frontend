/**
 * Quick Actions Component
 * Displays quick action buttons for common tasks
 */

import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/common/constants";
import NoteBookIcon from "@/components/icons/note-book.svg";
import NotePencilIcon from "@/components/icons/note-pencil.svg";
import GearSixIcon from "@/components/icons/gear-six.svg";
import Link from "next/link";

const actions = [
  {
    label: "စာရင်းမှတ်မည်",
    route: ROUTES.ADD_RECORD,
    icon: NotePencilIcon,
  },
  {
    label: "စာရင်းကြည့်မည်",
    route: ROUTES.VIEW_RECORDS,
    icon: NoteBookIcon,
  },
  {
    label: "လွှဲခထည့်မည်",
    route: ROUTES.ADD_FEE,
    icon: GearSixIcon,
  },
];

export function QuickActions() {
  return (
    <Card className="tr-w-[360px] tr-mx-auto tr-border-0 tr-shadow-none tr-rounded-10">
      <CardContent className="tr-flex tr-justify-between tr-font-primary tr-px-[15px] tr-py-[13px]">
        {actions.map((action) => (
          <Link
            key={action.route}
            href={action.route}
            className="tr-flex tr-flex-col tr-items-center tr-gap-2"
          >
            <div className="tr-w-[52px] tr-h-[52px] tr-bg-primary-light tr-flex tr-items-center tr-justify-center tr-rounded-full">
              <action.icon className="tr-w-6 tr-text-primary-muted" />
            </div>
            <span className="tr-text-12px">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
