/**
 * Date Picker Component
 * Date picker with floating label animation
 */

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  label?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  error,
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isFloating = isOpen || !!value;

  return (
    <div className={cn("tr-w-full", className)}>
      <div className="tr-relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "tr-w-full tr-justify-start tr-text-left tr-font-normal tr-px-3 tr-py-6 tr-h-auto",
                !value && "tr-text-muted-foreground",
                error && "tr-border-destructive"
              )}
            >
              <CalendarIcon className="tr-mr-2 tr-h-4 tr-w-4" />
              {value ? format(value, "PPP") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="tr-w-auto tr-p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date) => {
                onChange?.(date);
                setIsOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Floating Label */}
        {label && (
          <label
            className={cn(
              "tr-absolute tr-left-3 tr-top-1/2 -tr-translate-y-1/2",
              "tr-text-muted-foreground tr-pointer-events-none",
              "tr-transition-all tr-duration-200 tr-ease-linear",
              "tr-bg-background tr-px-1",
              isFloating && "tr-top-0 tr-text-xs",
              error && isFloating && "tr-text-destructive"
            )}
          >
            {label}
          </label>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="tr-text-sm tr-text-destructive tr-mt-1.5">{error}</p>}
    </div>
  );
}
