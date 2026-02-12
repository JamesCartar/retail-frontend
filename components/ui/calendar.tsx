// @ts-nocheck
import * as React from "react";
import { DayPicker, getDefaultClassNames, PropsSingle } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date | undefined>(
    props.selected instanceof Date
      ? props.selected
      : Array.isArray(props.selected)
      ? props.selected[0]
      : new Date()
  );

  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={setMonth}
      month={month}
      reverseYears
      className={cn("tr-p-3", className)}
      classNames={{
        selected: `${getDefaultClassNames().selected} tr-bg-[#DCEBFF]`,
        day: `${
          getDefaultClassNames().day
        } hover:tr-bg-primary-light tr-rounded-full`,
        day_button: `${
          getDefaultClassNames().day_button
        } tr-w-9 tr-h-9 tr-p-0 tr-font-medium`,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
